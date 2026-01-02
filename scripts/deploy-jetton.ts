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
    const client = new TonClient({ endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC' });
    const wallet = client.open(WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey }));

    // 1. Compile Wallet Code
    console.log('Compiling Jetton Wallet...');
    const walletCompile = await compileFunc({
        targets: ['jetton-wallet.fc'],
        sources: {
            '../imports/stdlib.fc': fs.readFileSync('contracts/imports/stdlib.fc', 'utf8'),
            '../imports/constants.fc': fs.readFileSync('contracts/imports/constants.fc', 'utf8'),
            '../imports/utils.fc': fs.readFileSync('contracts/imports/utils.fc', 'utf8'),
            'jetton-wallet.fc': fs.readFileSync('contracts/jetton/jetton-wallet.fc', 'utf8'),
        }
    });
    const walletCode = Cell.fromBoc(Buffer.from(walletCompile.codeBoc, 'base64'))[0];

    // 2. Compile Minter
    console.log('Compiling Jetton Minter...');
    const minterCompile = await compileFunc({
        targets: ['jetton-minter.fc'],
        sources: {
            '../imports/stdlib.fc': fs.readFileSync('contracts/imports/stdlib.fc', 'utf8'),
            '../imports/constants.fc': fs.readFileSync('contracts/imports/constants.fc', 'utf8'),
            '../imports/utils.fc': fs.readFileSync('contracts/imports/utils.fc', 'utf8'),
            'jetton-minter.fc': fs.readFileSync('contracts/jetton/jetton-minter.fc', 'utf8'),
        }
    });
    const minterCode = Cell.fromBoc(Buffer.from(minterCompile.codeBoc, 'base64'))[0];

    // 3. Data
    const content = beginCell().storeUint(0x01, 8).storeStringTail("https://cricket.markets/jetton.json").endCell();
    const data = beginCell()
        .storeCoins(0)
        .storeAddress(wallet.address)
        .storeRef(content)
        .storeRef(walletCode)
        .endCell();

    const address = contractAddress(0, { code: minterCode, data });
    console.log('Jetton Minter Target:', address.toString({ testOnly: true }));

    let seqno = 0;
    let retries = 10;
    while (retries > 0) {
        try {
            seqno = await wallet.getSeqno();
            console.log('Current seqno:', seqno);
            break;
        } catch (e: any) {
            console.warn('Retrying seqno...', e.message);
            await sleep(3000);
            retries--;
        }
    }

    retries = 10;
    while (retries > 0) {
        try {
            await wallet.sendTransfer({
                seqno,
                secretKey: keyPair.secretKey,
                messages: [
                    internal({
                        to: address,
                        value: toNano('0.05'),
                        init: { code: minterCode, data },
                        bounce: false,
                        body: beginCell().endCell(),
                    })
                ],
            });
            console.log('Jetton Minter deployment transaction sent!');
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