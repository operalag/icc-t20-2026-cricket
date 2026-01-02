import { WalletContractV4, TonClient, toNano, internal } from '@ton/ton';
import { mnemonicToPrivateKey } from '@ton/crypto';
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
    const wallet = client.open(WalletContractV4.create({ workchain: 0, publicKey: keyPair.publicKey }));

    const destination = '0QBKrJyuq_NzKniA5hTup10FV1qFCL0ADTiwgpMjIBQ1lOc5';
    
    let balance = 0n;
    let retries = 5;
    while (retries > 0) {
        try {
            balance = await client.getBalance(wallet.address);
            console.log('Current balance:', balance.toString(), 'nanoTON');
            break;
        } catch (e: any) {
            console.warn('Failed to get balance, retrying...', e.message);
            await sleep(3000);
            retries--;
        }
    }

    const amountToSend = toNano('2');
    let finalAmount = amountToSend;
    
    if (balance < amountToSend) {
        console.warn('Balance is less than 2 TON. Sending maximum possible (balance - gas)...');
        finalAmount = balance - toNano('0.05');
        if (finalAmount <= 0n) {
            console.error('Insufficient balance even for gas.');
            return;
        }
    }

    let seqno = 0;
    retries = 5;
    while (retries > 0) {
        try {
            seqno = await wallet.getSeqno();
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
            await wallet.sendTransfer({
                seqno,
                secretKey: keyPair.secretKey,
                messages: [
                    internal({
                        to: destination,
                        value: finalAmount,
                        bounce: false,
                        body: 'Transfer funds',
                    })
                ],
            });
            console.log('Transfer transaction sent for:', finalAmount.toString(), 'nanoTON');
            return;
        } catch (e: any) {
            if (e.message.includes('429')) {
                console.warn('Rate limited (429), waiting 5s...');
                await sleep(5000);
            } else {
                console.error('Transfer failed:', e.message);
                return;
            }
            retries--;
        }
    }
}

main().catch(console.error);
