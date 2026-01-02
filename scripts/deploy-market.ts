import { compileFunc } from '@ton-community/func-js';
import { Address, Cell, beginCell, contractAddress, WalletContractV4, TonClient, toNano, internal } from '@ton/ton';
import { mnemonicToPrivateKey } from '@ton/crypto';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    const mnemonic = process.env.MNEMONIC;
    if (!mnemonic) throw new Error('MNEMONIC not found in .env');

    const keyPair = await mnemonicToPrivateKey(mnemonic.split(' '));
    
    const client = new TonClient({
        endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
    });

    const wallet = WalletContractV4.create({ 
        workchain: 0, 
        publicKey: keyPair.publicKey 
    });

    const walletContract = client.open(wallet);

    console.log('Deploying from wallet:', wallet.address.toString({ testOnly: true }));

    // 1. Compile
    console.log('Compiling Market contract...');
    const compileResult = await compileFunc({
        targets: ['market.fc'],
        sources: {
            '../imports/stdlib.fc': fs.readFileSync('contracts/imports/stdlib.fc', 'utf8'),
            '../imports/constants.fc': fs.readFileSync('contracts/imports/constants.fc', 'utf8'),
            '../imports/utils.fc': fs.readFileSync('contracts/imports/utils.fc', 'utf8'),
            '../amm/lmsr.fc': fs.readFileSync('contracts/amm/lmsr.fc', 'utf8'),
            'market.fc': fs.readFileSync('contracts/market/market.fc', 'utf8'),
        }
    });

    if (compileResult.status === 'error') {
        throw new Error('Compilation failed: ' + compileResult.message);
    }

    const code = Cell.fromBoc(Buffer.from(compileResult.codeBoc, 'base64'))[0];

    // 2. Prepare Data
    const marketId = 1;
    const data = beginCell()
        .storeAddress(wallet.address) // admin
        .storeUint(marketId, 64)
        .storeDict(null) // outcomes
        .storeCoins(0)   // vol
        .storeUint(100, 64) // b
        .storeAddress(wallet.address) // placeholder jetton wallet
        .storeUint(0, 8) // status
        .storeUint(0, 8) // winner
        .endCell();

    // 3. Deploy
    const stateInit = { code, data };
    const address = contractAddress(0, stateInit);

    console.log('Target Market Address:', address.toString({ testOnly: true }));

    let seqno = 0;
    let retries = 5;
    while (retries > 0) {
        try {
            seqno = await walletContract.getSeqno();
            console.log('Current seqno:', seqno);
            break;
        } catch (e: any) {
            console.warn('Failed to get seqno, retrying...', e.message);
            await sleep(3000);
            retries--;
        }
    }

    retries = 5;
    while (retries > 0) {
        try {
            await walletContract.sendTransfer({
                seqno,
                secretKey: keyPair.secretKey,
                messages: [
                    internal({
                        to: address,
                        value: toNano('0.05'),
                        init: stateInit,
                        bounce: false,
                        body: beginCell().endCell(),
                    })
                ],
            });
            console.log('Deployment transaction sent!');
            console.log('Verify at: https://testnet.tonscan.org/address/' + address.toString({ testOnly: true }));
            return;
        } catch (e: any) {
            if (e.message.includes('429')) {
                console.warn('Rate limited (429), waiting 5s...');
                await sleep(5000);
            } else {
                console.error('Deployment failed:', e.message);
                return;
            }
            retries--;
        }
    }
}

main().catch(console.error);
