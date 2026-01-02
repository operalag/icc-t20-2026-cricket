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

    // 1. Oracle
    console.log('Compiling Oracle...');
    const oracleCompile = await compileFunc({
        targets: ['oracle.fc'],
        sources: {
            '../imports/stdlib.fc': fs.readFileSync('contracts/imports/stdlib.fc', 'utf8'),
            '../imports/constants.fc': fs.readFileSync('contracts/imports/constants.fc', 'utf8'),
            '../imports/utils.fc': fs.readFileSync('contracts/imports/utils.fc', 'utf8'),
            'oracle.fc': fs.readFileSync('contracts/oracle/oracle.fc', 'utf8'),
        }
    });
    const oracleCode = Cell.fromBoc(Buffer.from(oracleCompile.codeBoc, 'base64'))[0];
    const oracleData = beginCell().storeAddress(wallet.address).storeDict(null).storeDict(null).endCell();
    const oracleAddress = contractAddress(0, { code: oracleCode, data: oracleData });

    // 2. Settlement
    console.log('Compiling Settlement Manager...');
    const settlementCompile = await compileFunc({
        targets: ['manager.fc'],
        sources: {
            '../imports/stdlib.fc': fs.readFileSync('contracts/imports/stdlib.fc', 'utf8'),
            '../imports/constants.fc': fs.readFileSync('contracts/imports/constants.fc', 'utf8'),
            '../imports/utils.fc': fs.readFileSync('contracts/imports/utils.fc', 'utf8'),
            'manager.fc': fs.readFileSync('contracts/settlement/manager.fc', 'utf8'),
        }
    });
    const settlementCode = Cell.fromBoc(Buffer.from(settlementCompile.codeBoc, 'base64'))[0];
    const settlementData = beginCell().storeAddress(wallet.address).storeDict(null).storeAddress(oracleAddress).endCell();
    const settlementAddress = contractAddress(0, { code: settlementCode, data: settlementData });

    console.log('Oracle Target:', oracleAddress.toString({ testOnly: true }));
    console.log('Settlement Target:', settlementAddress.toString({ testOnly: true }));

    let seqno = 0;
    let retries = 10;
    while (retries > 0) {
        try {
            seqno = await wallet.getSeqno();
            break;
        } catch (e) {
            console.warn('Retrying seqno...');
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
                        to: oracleAddress,
                        value: toNano('0.05'),
                        init: { code: oracleCode, data: oracleData },
                        bounce: false,
                        body: beginCell().endCell(),
                    }),
                    internal({
                        to: settlementAddress,
                        value: toNano('0.05'),
                        init: { code: settlementCode, data: settlementData },
                        bounce: false,
                        body: beginCell().endCell(),
                    })
                ],
            });
            console.log('Oracle and Settlement Manager deployment transactions sent!');
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