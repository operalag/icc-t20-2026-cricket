import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV4 } from '@ton/ton';

async function main() {
    // Generate new mnemonic
    const mnemonic = await mnemonicNew();
    const keyPair = await mnemonicToPrivateKey(mnemonic);

    // Create wallet contract (V4R2 is standard now)
    const wallet = WalletContractV4.create({ 
        workchain: 0, 
        publicKey: keyPair.publicKey 
    });

    const address = wallet.address.toString({ testOnly: true });

    console.log('MNEMONIC="' + mnemonic.join(' ') + '"');
    console.log('WALLET_ADDRESS="' + address + '"');
    console.log('WALLET_PUBLIC_KEY="' + keyPair.publicKey.toString('hex') + '"');
    console.log('WALLET_PRIVATE_KEY="' + keyPair.secretKey.toString('hex') + '"');
}

main();
