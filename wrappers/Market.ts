import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type MarketConfig = {
    admin: Address;
    marketId: number;
    title: string; // Stored as ref or slice? For simple demo, we put it in data
};

export function marketConfigToCell(config: MarketConfig): Cell {
    return beginCell()
        .storeAddress(config.admin)
        .storeUint(config.marketId, 64)
        .storeDict(null) // Outcomes
        .storeCoins(0)   // Total Volume
        .storeUint(100, 64) // Liquidity Param b
        .storeAddress(config.admin) // Placeholder for Jetton Wallet (set later)
        .storeUint(0, 8) // Status: Active
        .storeUint(0, 8) // Winner: None
        .endCell();
}

export class Market implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Market(address);
    }

    static createFromConfig(config: MarketConfig, code: Cell, workchain = 0) {
        const data = marketConfigToCell(config);
        const init = { code, data };
        return new Market(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async getData(provider: ContractProvider) {
        const { stack } = await provider.get('get_market_data', []);
        return {
            admin: stack.readAddress(),
            marketId: stack.readNumber(),
            volume: stack.readBigNumber(),
            status: stack.readNumber(),
        };
    }
}
