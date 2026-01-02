# Smart Contract Deployment Guide

The smart contracts for the Prediction Market are located in this directory. To deploy them to the TON Testnet, we recommend using the [Blueprint](https://github.com/ton-org/blueprint) framework.

## 1. Setup Blueprint

Since this is a Next.js project, it is recommended to create a separate folder for contract management to avoid conflict, or initialize blueprint in a subfolder.

```bash
npm create ton@latest contracts-deploy
# Select "an empty project"
```

## 2. Move Contracts

Copy the contents of the `contracts/` folder in this repo to the `contracts/` folder in your new Blueprint project.

```bash
cp -r contracts/* contracts-deploy/contracts/
```

## 3. Compile

In your Blueprint project:

```bash
npx blueprint build
```

This will compile the `.fc` files. You might need to adjust the `scripts/` in the blueprint project to map to the correct files.

## 4. Deploy

Create a deploy script in the Blueprint project (e.g., `scripts/deployMarket.ts`):

```typescript
import { toNano } from '@ton/core';
import { Market } from '../wrappers/Market'; // You will need to copy the wrapper too
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const market = provider.open(Market.createFromConfig({
        admin: provider.sender().address!,
        marketId: 1,
        title: "India vs Pakistan",
    }, await compile('Market')));

    await market.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(market.address);
}
```

Run the deploy script:

```bash
npx blueprint run
```

Follow the prompts to connect your wallet (Tonkeeper, etc.) and switch to **Testnet**.

## 5. Verify

Once deployed, the script will output the address. You can view it on:
`https://testnet.tonscan.org/address/<YOUR_CONTRACT_ADDRESS>`
