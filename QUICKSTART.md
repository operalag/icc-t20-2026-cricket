# Quick Start Guide - Cricket Prediction Markets

Get the demo running in 5 minutes!

## Prerequisites

- Node.js 18+ ([Download](https://nodejs.org))
- npm (comes with Node.js)

## Installation

### Step 1: Navigate to Project Directory

```bash
cd /Users/tonicaradonna/cricket
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- Next.js 14
- React 18
- TON Connect SDK
- Tailwind CSS
- Zustand (state management)
- TypeScript
- All other dependencies (~60 packages)

**Expected time**: 2-3 minutes

### Step 3: Run Development Server

```bash
npm run dev
```

You should see:
```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in 2.1s
```

### Step 4: Open in Browser

Navigate to: **http://localhost:3000**

## What You'll See

### Homepage

1. **Hero Section**
   - Tournament branding (2026 ICC T20 World Cup)
   - Key features (Instant Settlement, Transparent & Fair, Real-Time Markets)
   - Powered by TON Blockchain

2. **Stats Overview**
   - Active Markets: 6
   - Total Volume: $254K
   - Active Traders: 2.4K

3. **Tournament Outrights**
   - ICC T20 World Cup Winner (6 teams)
   - Tournament Top Batsman (5 players)
   - Tournament Top Bowler (4 bowlers)

4. **Upcoming Matches**
   - India vs Pakistan (Match Winner, Total Runs, Total Sixes)
   - Australia vs England
   - South Africa vs New Zealand

### Navigation

- **Markets**: Homepage (all markets)
- **Tournaments**: Tournament details (placeholder)
- **Matches**: Match listings (placeholder)
- **My Bets**: User portfolio (placeholder)

## Testing the Demo

### 1. Browse Markets

Click on any market card to view outcomes and odds.

Each market shows:
- Market title and description
- Total volume
- Closing time
- All outcomes with odds
- Implied probabilities

### 2. Add Bets to Slip

Click on any outcome (e.g., "India" in Tournament Winner).

The bet slip (right side) will update with:
- Selected outcome
- Current odds
- Stake input (default: 10 TON)
- Potential return

### 3. Adjust Stakes

In the bet slip:
- Modify stake amount (0-10,000 TON)
- See potential return update automatically
- Add multiple bets (accumulator)

### 4. Connect TON Wallet

Click "Connect Wallet" in header or bet slip.

**Note**: This requires:
- TON wallet extension (Tonkeeper, MyTonWallet, etc.)
- Testnet TON for testing

For demo purposes, you can:
- Skip wallet connection
- View bet slip functionality
- See UI/UX without blockchain transactions

### 5. Place Bets (Simulated)

With wallet connected:
1. Click "Place Bets" in bet slip
2. Approve transaction in wallet
3. See confirmation (simulated in demo)

**Demo behavior**:
- 2-second simulated transaction
- Success message
- Bet slip clears
- Odds update (mock)

## Market Examples

### 1. Tournament Winner

**Market ID**: market-1
**Outcomes**: 6 teams
**Volume**: 125,000 TON

Sample odds:
- India: 4.32 (23.1%)
- Australia: 5.21 (19.2%)
- England: 6.18 (16.2%)
- Pakistan: 7.89 (12.7%)
- South Africa: 9.12 (11.0%)
- New Zealand: 10.89 (9.2%)

### 2. India vs Pakistan - Match Winner

**Market ID**: market-2
**Outcomes**: 2 teams
**Volume**: 45,000 TON

Sample odds:
- India: 1.62 (61.7%)
- Pakistan: 2.28 (43.9%)

### 3. Total Match Runs (Over/Under)

**Market ID**: market-3
**Line**: 340.5 runs
**Volume**: 18,000 TON

Sample odds:
- Over 340.5: 1.93 (51.8%)
- Under 340.5: 2.05 (48.8%)

## Features to Explore

### Real-Time Odds

Odds are calculated using LMSR (Logarithmic Market Scoring Rule):
- Fair market pricing
- No house edge (3% platform fee)
- Automatic adjustment based on volume

Try:
1. Add a large bet to one outcome
2. Watch odds change (simulated)
3. See implied probabilities update

### Bet Slip

Multi-bet support:
- Add up to 10 bets
- See total stake
- View potential return
- Calculate profit

Features:
- Persistent across page refreshes
- Remove individual bets
- Clear all bets
- Stake validation (0-10,000 TON)

### Responsive Design

Test on different screen sizes:
- Desktop: Full layout with bet slip
- Tablet: Stacked layout
- Mobile: Optimized for touch

Breakpoints:
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px

## Troubleshooting

### Port Already in Use

If port 3000 is taken:
```bash
npm run dev -- -p 3001
```

Then open: http://localhost:3001

### Dependencies Not Installing

Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### TypeScript Errors

Run type check:
```bash
npm run type-check
```

### Build Errors

Try a clean build:
```bash
rm -rf .next
npm run build
```

## Project Structure Overview

```
/cricket
├── app/                  # Next.js pages
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Homepage
│   └── globals.css      # Styles
├── components/          # React components
│   ├── bet-slip/       # Bet slip UI
│   ├── home/           # Homepage sections
│   ├── layout/         # Header, footer
│   └── markets/        # Market cards, lists
├── lib/
│   ├── data/           # Mock data
│   ├── store/          # State management
│   └── utils/          # Utilities
├── types/              # TypeScript types
├── docs/               # Documentation
└── public/             # Static assets
```

## Key Files

### Mock Data
`/lib/data/mock-data.ts`
- 10 cricket teams
- 4 matches
- 6 markets with realistic odds

### State Management
`/lib/store/market-store.ts` - Market data
`/lib/store/bet-slip-store.ts` - Bet selections
`/lib/store/wallet-store.ts` - Wallet connection

### Components
`/components/markets/MarketCard.tsx` - Market display
`/components/bet-slip/BetSlip.tsx` - Bet slip UI
`/components/layout/Header.tsx` - Navigation

## Next Steps

### For Developers

1. **Review Architecture**: `/docs/architecture.md`
   - Smart contract design
   - Backend services
   - Odds calculation
   - Security features

2. **Market Analysis**: `/docs/2026-icc-worldcup-prediction-markets.md`
   - All market types
   - Liquidity projections
   - Statistical benchmarks

3. **Deployment Guide**: `/docs/DEPLOYMENT.md`
   - Smart contract deployment
   - Backend setup
   - Production launch

### For Testing

1. **Add More Markets**: Edit `/lib/data/mock-data.ts`
2. **Customize Odds**: Adjust shares in mock data
3. **Test Edge Cases**: Try extreme bet amounts
4. **Mobile Testing**: Open on different devices

### For Production

1. **Deploy Smart Contracts**: See `/docs/DEPLOYMENT.md`
2. **Integrate Real Data**: Connect cricket APIs
3. **Enable Wallet**: TON mainnet configuration
4. **Add Analytics**: Integrate tracking

## Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## Support

For questions:
- Check `/docs/architecture.md` for technical details
- Review `/docs/PROJECT-SUMMARY.md` for overview
- See `/docs/2026-icc-worldcup-prediction-markets.md` for markets

## Demo Limitations

This is a **frontend demo** with:
- Mock data (no real blockchain transactions)
- Simulated odds updates
- No backend API
- No real cricket data

For production:
- Smart contracts need deployment
- Backend services required
- Real data feeds needed
- KYC/compliance integration

## Deployment to Vercel (Optional)

To deploy the demo online:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

Your demo will be live at: `https://your-project.vercel.app`

## Success Checklist

- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] Browser open at http://localhost:3000
- [ ] Homepage loads with markets
- [ ] Bet slip functional
- [ ] Odds display correctly
- [ ] Wallet button visible

## What's Working

- Market browsing and display
- Odds calculation (LMSR)
- Bet slip with multi-bet support
- Stake adjustment
- Responsive design
- TON Connect integration (UI only)
- State persistence (bet slip)

## What's Simulated

- Blockchain transactions
- Real-time odds updates
- Cricket match data
- User balance
- Bet confirmation
- Market settlement

---

**Estimated Setup Time**: 5 minutes
**Demo Ready**: Yes
**Production Ready**: Architecture complete, implementation needed

Enjoy exploring the Cricket Prediction Markets demo!
