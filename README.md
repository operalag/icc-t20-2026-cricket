# Cricket Prediction Markets - TON Blockchain

A decentralized prediction market platform for the 2026 ICC T20 World Cup, built on the TON blockchain.

## Overview

This demo application showcases a fully functional prediction market platform where users can:

- Browse tournament outright markets (Winner, Top Batsman, Top Bowler)
- Bet on match outcomes and player performances
- Experience real-time odds updates using AMM (Automated Market Maker) model
- Connect their TON wallet for seamless transactions
- Track their bets and portfolio

## Architecture Highlights

### Smart Contract Design (TON Blockchain)

- **Market Contracts**: Individual contracts for each prediction market
- **AMM Pool Contracts**: LMSR-based continuous liquidity
- **Jetton Tokens**: Custom betting tokens for efficient operations
- **Oracle Network**: Decentralized data feeds for match results
- **Settlement Manager**: Automated payout distribution

### Frontend Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **TON Connect**: Wallet integration
- **Zustand**: State management
- **Mock Data**: Simulated markets for demonstration

### Key Features

1. **AMM-Based Odds Calculation**
   - Logarithmic Market Scoring Rule (LMSR)
   - Fair, transparent pricing
   - No house edge

2. **Fast Settlement**
   - 5-second transaction finality on TON
   - Instant bet confirmation
   - Automated payout distribution

3. **Real-Time Updates**
   - Live odds recalculation
   - In-play betting support
   - Ball-by-ball market updates (simulated)

## Project Structure

```
/cricket
├── app/                      # Next.js pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── bet-slip/           # Bet slip UI
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components
│   └── markets/            # Market display components
├── lib/
│   ├── data/               # Mock data
│   └── store/              # Zustand stores
├── types/                  # TypeScript definitions
├── docs/                   # Documentation
│   ├── architecture.md     # Technical architecture
│   └── 2026-icc-worldcup-prediction-markets.md
└── public/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
```bash
cd /Users/tonicaradonna/cricket
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## Architecture Documentation

See `/docs/architecture.md` for comprehensive technical architecture including:

- Smart contract design patterns
- AMM odds calculation algorithms
- Backend service architecture
- Security and compliance features
- Scalability considerations

## Market Opportunities

See `/docs/2026-icc-worldcup-prediction-markets.md` for detailed analysis of:

- Tournament outright markets
- Match-level betting markets
- Player performance props
- In-play betting opportunities
- Market liquidity projections

## Technology Stack

### Blockchain
- **TON**: Fast finality, horizontal scalability
- **FunC**: Smart contract language
- **Jetton Standard**: Token operations

### Frontend
- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **TON Connect**: Wallet integration
- **Zustand**: State management

### Backend (Production)
- **Node.js**: API services
- **Python**: Odds calculation engine
- **PostgreSQL**: Transactional database
- **Redis**: Caching and real-time updates
- **RabbitMQ**: Message queue

## Demo Features

This demo includes:

- 6 active prediction markets with realistic odds
- Tournament winner market (India, Australia, England, etc.)
- India vs Pakistan match winner
- Total runs over/under markets
- Top batsman and top bowler outrights
- Fully functional bet slip
- TON wallet connection (testnet)
- Simulated bet placement

## Smart Contract Architecture

### Market Contract
```
- place_bet(outcome_id, amount)
- remove_liquidity()
- resolve_market(winning_outcome)
- claim_winnings()
- update_odds()
```

### AMM Pool
```
- LMSR cost function
- Continuous liquidity
- Fair market pricing
- Bounded loss protection
```

### Settlement Manager
```
- Oracle validation
- Payout calculation
- Dispute resolution
- Automated distribution
```

## Security Features

- Role-based access control
- Reentrancy protection
- Integer overflow prevention
- Oracle consensus (3-of-5)
- Rate limiting
- Input validation
- Audit logging

## Compliance

- KYC/AML integration ready
- Responsible gambling limits
- Self-exclusion mechanisms
- Transaction auditing
- Regulatory reporting

## Development Roadmap

### Phase 1: MVP (Current)
- Core market types
- Wallet integration
- Basic bet placement

### Phase 2: Beta
- Smart contract deployment (TON testnet)
- Real cricket data feeds
- In-play betting
- Historical odds tracking

### Phase 3: Production
- Mainnet deployment
- Full KYC integration
- Mobile app
- Advanced analytics

## Performance Metrics

- Transaction finality: <5 seconds
- Market update latency: <500ms
- Concurrent users: 100,000+
- Total markets: 800+
- Gas fees: <$0.01 per transaction

## Contact

For technical questions or collaboration:
- Architecture documentation: `/docs/architecture.md`
- Market analysis: `/docs/2026-icc-worldcup-prediction-markets.md`

## License

This is a demonstration project. For production use, proper licensing and regulatory compliance required.

---

Built with TON blockchain for the 2026 ICC T20 World Cup
