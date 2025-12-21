# Cricket Prediction Market Platform Architecture
## TON Blockchain-Based 2026 ICC T20 World Cup Prediction Markets

**Version:** 1.0
**Date:** December 17, 2025
**Status:** Design & Implementation Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture Overview](#system-architecture-overview)
3. [TON Blockchain Integration](#ton-blockchain-integration)
4. [Smart Contract Architecture](#smart-contract-architecture)
5. [Backend Services](#backend-services)
6. [Frontend Application](#frontend-application)
7. [Odds Calculation Engine](#odds-calculation-engine)
8. [Data Flow Architecture](#data-flow-architecture)
9. [Security & Compliance](#security-compliance)
10. [Scalability & Performance](#scalability-performance)

---

## Executive Summary

This document outlines the technical architecture for a decentralized prediction market platform built on the TON blockchain, specifically designed for the 2026 ICC T20 World Cup. The platform leverages TON's fast finality (5 seconds) and sharding capabilities to enable real-time in-play betting, tournament outrights, and complex player performance markets.

### Key Design Decisions

1. **TON Blockchain**: Selected for sub-second transaction finality, horizontal scalability via sharding, and low gas fees
2. **AMM Model**: Automated Market Maker for continuous liquidity without traditional order books
3. **Jetton Standard**: Custom betting tokens for efficient market operations
4. **Hybrid Architecture**: On-chain settlement with off-chain odds calculation for performance
5. **Microservices Backend**: Decoupled services for market management, odds calculation, and data feeds

### Target Metrics

- **Transaction Finality**: <5 seconds (TON native)
- **Market Update Latency**: <500ms for odds recalculation
- **Concurrent Users**: 100,000+ during peak matches
- **Markets Supported**: 55 matches × 15+ markets = 800+ active markets
- **In-Play Updates**: Ball-by-ball (every 20-30 seconds during match)

---

## System Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Next.js UI  │  │ TON Connect  │  │   WebSocket  │          │
│  │   React +    │◄─┤   Wallet     │  │   Client     │          │
│  │  Tailwind    │  │  Integration │  │              │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
└─────────┼──────────────────┼──────────────────┼─────────────────┘
          │                  │                  │
          │ HTTP/REST        │ TON RPC          │ WSS
          │                  │                  │
┌─────────▼──────────────────▼──────────────────▼─────────────────┐
│                      Application Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Market     │  │    Odds      │  │   Real-Time  │          │
│  │  Management  │  │  Calculation │  │   Updates    │          │
│  │   Service    │◄─┤    Engine    │◄─┤   Service    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│  ┌──────▼───────┐  ┌──────▼───────┐  ┌──────▼───────┐          │
│  │   Cricket    │  │   User       │  │  Settlement  │          │
│  │  Data Feed   │  │  Management  │  │   Service    │          │
│  │   Adapter    │  │   Service    │  │              │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────┬────────────────────────────────────┬─────────────────┘
          │                                    │
          │ Event Listeners                    │ Transactions
          │                                    │
┌─────────▼────────────────────────────────────▼─────────────────┐
│                      TON Blockchain Layer                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Smart Contract Architecture                  │  │
│  │                                                            │  │
│  │  ┌───────────┐  ┌───────────┐  ┌──────────┐             │  │
│  │  │  Market   │  │    AMM    │  │  Jetton  │             │  │
│  │  │ Contract  │◄─┤   Pool    │◄─┤  Token   │             │  │
│  │  │           │  │ Contract  │  │ Contract │             │  │
│  │  └─────┬─────┘  └─────┬─────┘  └────┬─────┘             │  │
│  │        │              │              │                    │  │
│  │  ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼─────┐             │  │
│  │  │ Settlement│  │  Oracle   │  │  Access  │             │  │
│  │  │  Manager  │  │ Adapter   │  │  Control │             │  │
│  │  └───────────┘  └───────────┘  └──────────┘             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
          │
          │ External Data
          │
┌─────────▼─────────────────────────────────────────────────────┐
│                      External Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │  Cricket API │  │   IPFS for   │  │   Payment    │         │
│  │ (Sportradar) │  │   Metadata   │  │   Gateway    │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand + React Query
- **TON Integration**: @tonconnect/ui-react
- **Charts**: Recharts for odds visualization
- **Real-time**: Socket.io-client for live updates

#### Backend Services
- **API Gateway**: Node.js + Express or Fastify
- **Odds Engine**: Python 3.11+ (NumPy, Pandas for calculations)
- **Real-time Updates**: Socket.io + Redis Pub/Sub
- **Database**: PostgreSQL 15 (transactional), Redis 7 (caching)
- **Time-Series**: TimescaleDB extension for historical odds
- **Message Queue**: RabbitMQ for async processing

#### Blockchain
- **Blockchain**: TON (The Open Network)
- **Smart Contracts**: FunC language
- **Wallet Integration**: TON Connect 2.0
- **RPC Provider**: TON API or self-hosted node
- **Token Standard**: Jetton (TEP-74)

#### Infrastructure
- **Container Orchestration**: Docker + Kubernetes
- **Load Balancing**: NGINX or Traefik
- **CDN**: Cloudflare for static assets
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana)

---

## TON Blockchain Integration

### Why TON?

1. **Fast Finality**: 5-second block time enables near-instant bet settlement
2. **High Throughput**: Sharding architecture supports 100,000+ TPS
3. **Low Fees**: Gas costs <$0.01 per transaction
4. **Native Scalability**: Horizontal scaling without Layer 2 complexity
5. **Growing Ecosystem**: Telegram integration = 900M+ potential users

### TON Connect Wallet Integration

```typescript
// TON Connect Implementation Pattern
import { TonConnectUI } from '@tonconnect/ui-react';

const tonConnectUI = new TonConnectUI({
  manifestUrl: 'https://cricket.markets/tonconnect-manifest.json',
  buttonRootId: 'ton-connect-button'
});

// Connect wallet
await tonConnectUI.connectWallet();

// Send transaction (place bet)
const transaction = {
  validUntil: Math.floor(Date.now() / 1000) + 600,
  messages: [
    {
      address: MARKET_CONTRACT_ADDRESS,
      amount: toBetAmount.toString(),
      payload: beginCell()
        .storeUint(0x7362d09c, 32) // op::place_bet
        .storeUint(marketId, 64)
        .storeUint(outcomeIndex, 8)
        .storeCoins(betAmount)
        .endCell()
        .toBoc()
        .toString('base64')
    }
  ]
};

await tonConnectUI.sendTransaction(transaction);
```

### Wallet Connection Flow

```
1. User clicks "Connect Wallet"
   └─> TonConnect modal displays supported wallets
       (Tonkeeper, OpenMask, MyTonWallet, etc.)

2. User selects wallet
   └─> QR code generated (desktop) or deep link (mobile)

3. User approves connection
   └─> Wallet address stored in app state
   └─> Backend fetches user balance and bet history

4. User places bet
   └─> Transaction payload constructed
   └─> User signs in wallet
   └─> Transaction broadcast to TON network
   └─> Confirmation received in 5-10 seconds
```

---

## Smart Contract Architecture

### Contract Overview

#### 1. Market Contract (Primary)

**Purpose**: Manages individual prediction markets (e.g., "India vs Pakistan Match Winner")

**State Variables**:
```func
(slice admin,
 int market_id,
 int market_type,    ;; 1=binary, 2=multi-outcome, 3=scalar
 int market_status,  ;; 0=pending, 1=active, 2=suspended, 3=settled
 int total_liquidity,
 cell outcomes,      ;; hashmap of outcome_id -> outcome_data
 int resolution_time,
 int settlement_value) data
```

**Key Operations**:
- `place_bet(outcome_id, amount)`: User places bet on specific outcome
- `remove_liquidity()`: Cancel bet before market resolution (with fee)
- `resolve_market(winning_outcome)`: Admin/Oracle resolves market
- `claim_winnings()`: Users claim payouts after settlement
- `update_odds()`: Recalculate implied odds based on pool sizes

**Access Control**:
- Only authorized oracle can resolve markets
- Only admin can pause/resume markets
- Any user can place bets when market is active
- ACID-compliant: Bets either fully succeed or fully revert

#### 2. AMM Pool Contract

**Purpose**: Automated Market Maker for continuous liquidity

**Mathematical Model**: Logarithmic Market Scoring Rule (LMSR)

```
Cost Function: C(q) = b * ln(Σ e^(q_i / b))

Where:
- q_i = quantity of outcome i purchased
- b = liquidity parameter (determines price sensitivity)
- Price of outcome i = e^(q_i / b) / Σ e^(q_j / b)
```

**Implementation**:
```func
() calculate_price(int outcome_id, int quantity) method_id {
  var (total_quantity, outcome_quantities) = load_pool_state();

  ;; Calculate marginal price using LMSR
  int numerator = outcome_quantities.at(outcome_id) + quantity;
  int denominator = 0;

  repeat (outcomes_count) {
    denominator += exp_approx(outcome_quantities.at(i) / liquidity_param);
  }

  int price = exp_approx(numerator / liquidity_param) / denominator;
  return price;
}
```

**Why LMSR over Constant Product (x*y=k)?**
- Better for multi-outcome markets (>2 outcomes)
- Configurable liquidity depth via parameter `b`
- No impermanent loss for market makers
- Self-adjusting odds based on bet volume

#### 3. Jetton Token Contract

**Purpose**: Custom betting token for platform (e.g., CRICKET token)

**Standard**: TEP-74 (Jetton Standard)

**Features**:
- Minting controlled by admin (for promotional bonuses)
- Burning enabled (for token economics)
- Transfer restrictions (KYC compliance if needed)
- Decimal precision: 9 decimals (matches TON)

**Integration with Markets**:
```
User deposits TON -> Wrapped into CRICKET Jetton
User places bet -> CRICKET tokens locked in Market Contract
Market settles -> Winning users receive CRICKET tokens
User withdraws -> CRICKET unwrapped back to TON
```

**Benefits**:
- Reduced gas fees (batch operations)
- Easier accounting and analytics
- Promotional token distribution
- Future staking/governance capabilities

#### 4. Settlement Manager Contract

**Purpose**: Coordinates market resolution and payout distribution

**Resolution Flow**:
```
1. Match completes in real world
   └─> Cricket data feed confirms result

2. Oracle submits resolution transaction
   └─> Multiple oracle signatures required (3-of-5 multisig)

3. Settlement Manager validates
   └─> Checks oracle authority
   └─> Verifies no disputes filed
   └─> Marks market as resolved

4. Winnings calculation
   └─> Winning pool = Total pool - Platform fee
   └─> Payout ratio = Winning pool / Total bets on winning outcome
   └─> User payout = User bet × Payout ratio

5. Users claim
   └─> Pull-based pattern (users initiate withdrawal)
   └─> Gas costs covered by platform (optional)
```

**Dispute Mechanism**:
- 24-hour dispute window after resolution
- Requires staking CRICKET tokens to file dispute
- Escalates to DAO governance if disputed
- Incorrect oracle resolutions result in slashing

#### 5. Oracle Adapter Contract

**Purpose**: Secure bridge between off-chain data and on-chain contracts

**Design Pattern**: Decentralized Oracle Network (DON)

**Architecture**:
```
┌─────────────────────────────────────────────────────┐
│  Multiple independent oracle nodes                  │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │
│  │Node 1│  │Node 2│  │Node 3│  │Node 4│  │Node 5│  │
│  └───┬──┘  └───┬──┘  └───┬──┘  └───┬──┘  └───┬──┘  │
│      │         │         │         │         │      │
│      └─────────┼─────────┼─────────┼─────────┘      │
│                │         │         │                 │
│                ▼         ▼         ▼                 │
│         ┌─────────────────────────────┐              │
│         │  Oracle Aggregator Contract │              │
│         │  (3-of-5 consensus required)│              │
│         └─────────────┬───────────────┘              │
│                       │                              │
│                       ▼                              │
│         ┌─────────────────────────────┐              │
│         │   Settlement Manager        │              │
│         └─────────────────────────────┘              │
└─────────────────────────────────────────────────────┘
```

**Data Sources**:
- Primary: Sportradar Cricket API
- Secondary: ESPNcricinfo API
- Tertiary: ICC Official Feed
- Consensus: 3-of-5 oracles must agree

**Security Measures**:
- Each oracle node operated by different entity
- Slashing for incorrect or delayed reports
- Economic incentive alignment via staking
- Automatic failover if nodes unavailable

---

## Backend Services

### Service Architecture: Microservices Pattern

#### 1. Market Management Service

**Responsibilities**:
- Create and configure new markets
- Update market metadata
- Monitor market health
- Archive completed markets

**API Endpoints**:
```typescript
POST   /api/markets              // Create new market
GET    /api/markets              // List all markets (with filters)
GET    /api/markets/:id          // Get specific market details
PATCH  /api/markets/:id          // Update market configuration
DELETE /api/markets/:id          // Archive market (admin only)
GET    /api/markets/:id/bets     // Get all bets for market
```

**Database Schema**:
```sql
CREATE TABLE markets (
  id BIGSERIAL PRIMARY KEY,
  contract_address VARCHAR(48) NOT NULL,
  market_type VARCHAR(50) NOT NULL, -- 'match_winner', 'top_batsman', etc.
  match_id INTEGER,
  tournament_id INTEGER NOT NULL DEFAULT 1, -- 2026 T20 World Cup
  title VARCHAR(255) NOT NULL,
  description TEXT,
  outcomes JSONB NOT NULL,  -- Array of outcome objects
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  start_time TIMESTAMP NOT NULL,
  resolution_time TIMESTAMP,
  total_volume NUMERIC(20,9) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_markets_status ON markets(status);
CREATE INDEX idx_markets_match_id ON markets(match_id);
CREATE INDEX idx_markets_start_time ON markets(start_time);
```

**Market Creation Flow**:
```
1. Admin triggers market creation
   └─> POST /api/markets with match_id and market_type

2. Service validates parameters
   └─> Check match exists
   └─> Verify market type supported
   └─> Ensure no duplicate market

3. Deploy smart contract
   └─> Generate contract code with parameters
   └─> Deploy to TON blockchain
   └─> Wait for confirmation

4. Store market in database
   └─> Save contract address
   └─> Index for quick retrieval
   └─> Emit event to real-time service

5. Return market details to admin
```

#### 2. Odds Calculation Engine

**Responsibilities**:
- Calculate real-time odds for all markets
- Recalculate on every new bet placement
- Provide fair odds based on AMM formula
- Historical odds tracking

**Architecture**: Python service with Redis caching

**Core Algorithm**:
```python
import numpy as np
from typing import List, Dict

class LMSRCalculator:
    def __init__(self, liquidity_param: float = 100.0):
        """
        LMSR-based odds calculator

        Args:
            liquidity_param: Controls price sensitivity (higher = less volatile)
        """
        self.b = liquidity_param

    def calculate_odds(self, quantities: List[float]) -> List[float]:
        """
        Calculate implied probabilities for each outcome

        Args:
            quantities: List of quantities purchased for each outcome

        Returns:
            List of implied probabilities (sum = 1.0)
        """
        exp_terms = np.exp(np.array(quantities) / self.b)
        probabilities = exp_terms / np.sum(exp_terms)
        return probabilities.tolist()

    def calculate_cost(self,
                      current_quantities: List[float],
                      outcome_index: int,
                      bet_amount: float) -> float:
        """
        Calculate cost to buy bet_amount of outcome

        Returns actual cost in tokens
        """
        new_quantities = current_quantities.copy()
        new_quantities[outcome_index] += bet_amount

        cost_before = self.b * np.log(np.sum(np.exp(np.array(current_quantities) / self.b)))
        cost_after = self.b * np.log(np.sum(np.exp(np.array(new_quantities) / self.b)))

        return cost_after - cost_before

    def calculate_marginal_price(self,
                                quantities: List[float],
                                outcome_index: int) -> float:
        """
        Calculate current marginal price for infinitesimal bet

        Returns price (0.0 to 1.0)
        """
        probabilities = self.calculate_odds(quantities)
        return probabilities[outcome_index]
```

**Performance Optimization**:
- Odds cached in Redis with 1-second TTL
- Batch updates every 5 seconds during high volume
- Precomputed odds for common bet sizes
- Approximate calculations for display (exact on-chain)

**API Endpoints**:
```typescript
GET    /api/odds/:market_id              // Current odds
POST   /api/odds/:market_id/simulate     // Simulate bet impact
GET    /api/odds/:market_id/history      // Historical odds (chart)
```

#### 3. Real-Time Updates Service

**Responsibilities**:
- Broadcast market updates to connected clients
- Push odds changes in real-time
- Notify users of bet confirmations
- Live match score integration

**Technology**: Socket.io + Redis Pub/Sub

**Event Types**:
```typescript
// Client subscribes to events
socket.on('market:odds_update', (data) => {
  // { marketId, outcomes: [{ id, odds, volume }] }
});

socket.on('market:new_bet', (data) => {
  // { marketId, outcomeId, amount, bettor: '0x...' }
});

socket.on('match:score_update', (data) => {
  // { matchId, score, wickets, overs, lastBall }
});

socket.on('market:status_change', (data) => {
  // { marketId, newStatus: 'suspended' | 'active' | 'settled' }
});
```

**Scalability Pattern**: Redis Pub/Sub for horizontal scaling

```
┌─────────┐    ┌─────────┐    ┌─────────┐
│ Socket  │    │ Socket  │    │ Socket  │
│ Server 1│    │ Server 2│    │ Server 3│
└────┬────┘    └────┬────┘    └────┬────┘
     │              │              │
     └──────────┬───┴──────────────┘
                │
           ┌────▼─────┐
           │  Redis   │
           │  Pub/Sub │
           └──────────┘
```

Each socket server subscribes to Redis channels. When market updates occur, publish to Redis, and all servers broadcast to their connected clients.

#### 4. Cricket Data Feed Adapter

**Responsibilities**:
- Fetch live match data from external APIs
- Normalize data format
- Detect market-relevant events
- Trigger oracle submissions

**Data Sources**:
```typescript
interface DataProvider {
  name: string;
  priority: number;
  fetchLiveScore(matchId: string): Promise<MatchScore>;
  fetchMatchResult(matchId: string): Promise<MatchResult>;
}

const providers: DataProvider[] = [
  { name: 'Sportradar', priority: 1, ... },
  { name: 'CricketAPI', priority: 2, ... },
  { name: 'ESPNcricinfo', priority: 3, ... }
];
```

**Event Detection**:
```typescript
// Continuously monitor match events
async function monitorMatch(matchId: string) {
  const previousState = await getMatchState(matchId);
  const currentState = await fetchLiveScore(matchId);

  // Detect significant events
  if (currentState.wickets > previousState.wickets) {
    await emitEvent('wicket_fallen', { matchId, ...details });
    await updateInPlayMarkets(matchId);
  }

  if (currentState.status === 'completed') {
    await emitEvent('match_completed', { matchId, result });
    await triggerOracleSettlement(matchId);
  }

  // Update every 5 seconds during live matches
  setTimeout(() => monitorMatch(matchId), 5000);
}
```

#### 5. Settlement Service

**Responsibilities**:
- Coordinate market resolution
- Validate oracle submissions
- Calculate payouts
- Handle disputes

**Settlement Workflow**:
```typescript
async function settleMarket(marketId: string, result: MarketResult) {
  // 1. Validate oracle consensus
  const oracleSubmissions = await getOracleSubmissions(marketId);
  if (oracleSubmissions.length < 3) {
    throw new Error('Insufficient oracle consensus');
  }

  const consensusResult = calculateConsensus(oracleSubmissions);
  if (consensusResult.confidence < 0.67) {
    await escalateDispute(marketId);
    return;
  }

  // 2. Submit resolution to smart contract
  const tx = await submitSettlement(marketId, consensusResult.winnerId);
  await waitForConfirmation(tx);

  // 3. Calculate all payouts
  const bets = await getAllBets(marketId);
  const winningBets = bets.filter(b => b.outcomeId === consensusResult.winnerId);

  const totalPool = bets.reduce((sum, b) => sum + b.amount, 0);
  const winningPool = winningBets.reduce((sum, b) => sum + b.amount, 0);
  const platformFee = totalPool * 0.03; // 3% platform fee
  const payoutPool = totalPool - platformFee;

  const payoutRatio = payoutPool / winningPool;

  // 4. Store payout calculations
  for (const bet of winningBets) {
    await storePayout({
      betId: bet.id,
      userId: bet.userId,
      payout: bet.amount * payoutRatio,
      claimed: false
    });
  }

  // 5. Notify users
  await notifyWinners(marketId, winningBets);
  await updateMarketStatus(marketId, 'settled');
}
```

---

## Frontend Application

### Next.js Architecture

**Directory Structure**:
```
/cricket
  /app
    /layout.tsx                 # Root layout with providers
    /page.tsx                   # Homepage
    /markets
      /page.tsx                 # Market browser
      /[id]
        /page.tsx               # Market detail and bet placement
    /tournaments
      /page.tsx                 # Tournament list
      /[id]
        /page.tsx               # Tournament details
    /matches
      /[id]
        /page.tsx               # Match details with live updates
    /portfolio
      /page.tsx                 # User's bets and balance
  /components
    /markets
      /MarketCard.tsx
      /MarketList.tsx
      /BetSlip.tsx
      /OddsChart.tsx
    /wallet
      /WalletConnect.tsx
      /BalanceDisplay.tsx
    /ui
      /Button.tsx
      /Card.tsx
      /Modal.tsx
  /lib
    /ton
      /client.ts              # TON client setup
      /contracts.ts           # Contract interaction wrappers
    /api
      /markets.ts
      /bets.ts
    /hooks
      /useMarket.ts
      /useBets.ts
      /useWallet.ts
  /types
    /markets.ts
    /bets.ts
    /matches.ts
```

### Key Components

#### 1. Wallet Connection

```typescript
// components/wallet/WalletConnect.tsx
'use client';

import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect } from 'react';

export function WalletConnect() {
  const address = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    if (address) {
      // Fetch user data when wallet connected
      fetchUserBalance(address);
      fetchUserBets(address);
    }
  }, [address]);

  return (
    <div className="flex items-center gap-4">
      <TonConnectButton />
      {address && (
        <div className="text-sm">
          <span className="text-gray-600">Connected:</span>
          <span className="font-mono ml-2">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
      )}
    </div>
  );
}
```

#### 2. Market Card

```typescript
// components/markets/MarketCard.tsx
interface MarketCardProps {
  market: Market;
  onBetClick: (market: Market, outcomeId: string) => void;
}

export function MarketCard({ market, onBetClick }: MarketCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{market.title}</h3>
          <p className="text-sm text-gray-600">{market.description}</p>
        </div>
        <MarketBadge status={market.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {market.outcomes.map((outcome) => (
          <button
            key={outcome.id}
            onClick={() => onBetClick(market, outcome.id)}
            className="border rounded px-4 py-3 hover:bg-blue-50 transition"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{outcome.name}</span>
              <span className="text-blue-600 font-bold">
                {outcome.odds.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {outcome.impliedProbability.toFixed(1)}%
            </div>
          </button>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t flex justify-between text-sm text-gray-600">
        <span>Volume: {formatVolume(market.totalVolume)}</span>
        <span>Closes: {formatTime(market.closingTime)}</span>
      </div>
    </div>
  );
}
```

#### 3. Bet Slip

```typescript
// components/markets/BetSlip.tsx
export function BetSlip() {
  const { selectedBets, updateBetAmount, placeBets, clearBets } = useBetSlip();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();

  const totalStake = selectedBets.reduce((sum, bet) => sum + bet.amount, 0);
  const potentialReturn = selectedBets.reduce(
    (sum, bet) => sum + bet.amount * bet.odds,
    0
  );

  const handlePlaceBets = async () => {
    if (!address) {
      await tonConnectUI.connectWallet();
      return;
    }

    // Construct transaction messages for each bet
    const messages = selectedBets.map(bet => ({
      address: bet.marketContract,
      amount: toNano(bet.amount).toString(),
      payload: createBetPayload(bet.marketId, bet.outcomeId, bet.amount)
    }));

    try {
      const result = await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages
      });

      // Wait for confirmation
      await waitForTransaction(result.boc);

      // Clear bet slip
      clearBets();

      // Show success notification
      toast.success('Bets placed successfully!');
    } catch (error) {
      toast.error('Transaction failed');
      console.error(error);
    }
  };

  return (
    <div className="fixed right-4 top-20 w-80 border rounded-lg bg-white shadow-lg p-4">
      <h3 className="font-bold text-lg mb-4">Bet Slip</h3>

      {selectedBets.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          Select markets to bet
        </p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {selectedBets.map((bet) => (
              <BetSlipItem
                key={bet.id}
                bet={bet}
                onAmountChange={(amount) => updateBetAmount(bet.id, amount)}
                onRemove={() => removeBet(bet.id)}
              />
            ))}
          </div>

          <div className="border-t pt-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total Stake:</span>
              <span className="font-bold">{totalStake.toFixed(2)} TON</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Potential Return:</span>
              <span className="font-bold text-green-600">
                {potentialReturn.toFixed(2)} TON
              </span>
            </div>
          </div>

          <button
            onClick={handlePlaceBets}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 transition"
          >
            {address ? 'Place Bets' : 'Connect Wallet'}
          </button>
        </>
      )}
    </div>
  );
}
```

### State Management

**Zustand Store Pattern**:

```typescript
// lib/store/market-store.ts
import create from 'zustand';
import { Market, MarketStatus } from '@/types/markets';

interface MarketState {
  markets: Market[];
  selectedMarket: Market | null;
  filters: {
    status: MarketStatus[];
    matchId: number | null;
    marketType: string | null;
  };

  // Actions
  setMarkets: (markets: Market[]) => void;
  updateMarket: (id: string, updates: Partial<Market>) => void;
  selectMarket: (id: string) => void;
  setFilters: (filters: Partial<MarketState['filters']>) => void;
}

export const useMarketStore = create<MarketState>((set, get) => ({
  markets: [],
  selectedMarket: null,
  filters: {
    status: ['active'],
    matchId: null,
    marketType: null
  },

  setMarkets: (markets) => set({ markets }),

  updateMarket: (id, updates) => set((state) => ({
    markets: state.markets.map(m =>
      m.id === id ? { ...m, ...updates } : m
    )
  })),

  selectMarket: (id) => set((state) => ({
    selectedMarket: state.markets.find(m => m.id === id) || null
  })),

  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  }))
}));
```

---

## Odds Calculation Engine

### Mathematical Foundation

#### LMSR (Logarithmic Market Scoring Rule)

**Cost Function**:
```
C(q) = b × ln(Σᵢ e^(qᵢ/b))

Where:
- qᵢ = cumulative shares purchased for outcome i
- b = liquidity parameter
- C(q) = total cost to reach state q
```

**Price Calculation**:
```
Price(i) = ∂C/∂qᵢ = e^(qᵢ/b) / Σⱼ e^(qⱼ/b)

This gives the marginal price (implied probability) for outcome i
```

**Example**:
```python
# Match: India vs Pakistan
# Liquidity parameter b = 100

# Initial state: No bets placed
q = [0, 0]  # [India, Pakistan]

# Calculate initial prices
prices = calculate_odds(q)  # [0.50, 0.50] - equal odds

# User bets 50 TON on India
q_new = [50, 0]
prices_new = calculate_odds(q_new)  # [0.62, 0.38]

# India now favored, odds reflect this
```

**Advantages**:
1. **Continuous Liquidity**: Always possible to buy/sell shares
2. **Bounded Loss**: Market maker loss capped at `b × ln(n)` where n = outcomes
3. **Incentive Compatible**: Profitable to bet true beliefs
4. **Self-Adjusting**: Popular outcomes become more expensive

### Implementation

```python
# odds_engine/calculator.py
import numpy as np
from decimal import Decimal, ROUND_DOWN
from typing import List, Tuple

class OddsEngine:
    def __init__(self, liquidity_param: float = 100.0, fee_rate: float = 0.03):
        self.b = liquidity_param
        self.fee_rate = fee_rate

    def get_market_state(self, market_id: str) -> List[Decimal]:
        """Fetch current quantity shares from database"""
        # Redis cache first, fallback to PostgreSQL
        cached = redis.get(f"market:{market_id}:quantities")
        if cached:
            return json.loads(cached)

        result = db.query(
            "SELECT outcome_id, total_quantity FROM market_outcomes WHERE market_id = %s",
            [market_id]
        )
        quantities = [row['total_quantity'] for row in result]

        # Cache for 1 second
        redis.setex(f"market:{market_id}:quantities", 1, json.dumps(quantities))
        return quantities

    def calculate_odds_with_fee(self,
                                quantities: List[float]) -> List[Tuple[float, float]]:
        """
        Calculate display odds including platform fee

        Returns:
            List of (backing_odds, laying_odds) tuples
        """
        probabilities = self.calculate_implied_probabilities(quantities)

        # Adjust for fee (overround)
        total_prob = sum(probabilities)
        adjusted_probs = [p * (1 + self.fee_rate) / total_prob
                         for p in probabilities]

        # Convert to decimal odds
        backing_odds = [1.0 / p if p > 0 else 999.0
                       for p in adjusted_probs]

        # Laying odds (for market maker)
        laying_odds = [1.0 / (p * 0.97) if p > 0 else 999.0
                      for p in probabilities]

        return list(zip(backing_odds, laying_odds))

    def calculate_bet_cost(self,
                          market_id: str,
                          outcome_index: int,
                          desired_shares: float) -> float:
        """
        Calculate exact cost for purchasing desired shares
        """
        quantities = self.get_market_state(market_id)

        cost_before = self._cost_function(quantities)

        quantities[outcome_index] += desired_shares
        cost_after = self._cost_function(quantities)

        cost = cost_after - cost_before

        # Add platform fee
        return cost * (1 + self.fee_rate)

    def _cost_function(self, quantities: List[float]) -> float:
        """LMSR cost function"""
        return self.b * np.log(np.sum(np.exp(np.array(quantities) / self.b)))

    def calculate_implied_probabilities(self,
                                       quantities: List[float]) -> List[float]:
        """Calculate fair implied probabilities"""
        exp_terms = np.exp(np.array(quantities) / self.b)
        return (exp_terms / np.sum(exp_terms)).tolist()
```

### Calibration

**Liquidity Parameter Selection**:
```
Small b (e.g., 50): More volatile, prices change quickly
Medium b (e.g., 100-200): Balanced, suitable for most markets
Large b (e.g., 500+): Stable, requires large bets to move odds
```

**Rule of Thumb**: `b ≈ expected total market volume / 10`

For a match expected to have 1000 TON total volume, use `b = 100`.

---

## Data Flow Architecture

### Bet Placement Flow

```
User Action                Frontend              Backend                 Blockchain
────────────────────────────────────────────────────────────────────────────────
1. Click "Bet 10 TON
   on India"
                           │
2. Open bet slip          │
   Validate amount        │
                           │
3. Click "Place Bet"      │
                           │
4. Request odds quote     ├──GET /api/odds/123──→ Calculate
                          │                        current odds
                          │←────{odds: 1.85}──────
                           │
5. Construct TX           │
   Sign in wallet         │
                           │
6. Broadcast TX           ├──────────────────────→ Submit to
                          │                        TON network
                          │                           │
7. Monitor TX             │                           │
                          │                           ▼
                          │                        Confirm in
                          │                        blockchain
                          │←──────event────────────  │
                           │                           │
8. Update UI              │                           │
   "Bet confirmed"        │                           │
                           │                           │
9. Backend receives       │◄──────event─────────── Smart contract
   event                  │                        emits event
                           │                           │
10. Update database       │──Update quantities────→ PostgreSQL
    Recalculate odds      │                           │
                           │                           │
11. Broadcast update      │──Emit via Socket.IO────→ All clients
    to all users          │                           │
                           │                           │
12. Other users see       │◄─────new odds──────────  │
    updated odds          │
```

### Settlement Flow

```
Real World               Data Feed           Oracle          Smart Contract
────────────────────────────────────────────────────────────────────────────
1. Match completes
   India wins by 20 runs
                          │
2. API detects           │
   completion            │
                          │
3. Fetch final result    │
   Multiple sources      │
                          │
4. Validate consensus    ├─Submit result────→ Aggregate
                         │                    submissions
                         │                       │
5.                       │                       │
                         │                    3-of-5 oracles
                         │                    agree: India wins
                         │                       │
6.                       │                       ▼
                         │                    Sign resolution TX
                         │                       │
7.                       │                       ▼
                         │                    Submit to contract
                         │                       │
8.                       │                       ▼
                         │                    Contract validates
                         │                    oracle authority
                         │                       │
9.                       │                       ▼
                         │                    Mark market as
                         │                    SETTLED
                         │                       │
10.                      │                      ▼
                         │                    Calculate payouts
                         │                    Store in contract
                         │                       │
11.                      │◄───event: settled────
                         │
12. Backend receives     │
    settlement event     │
                          │
13. Update database      │
    Notify users         │
                          │
14. Users claim          │                       │
    winnings             ├───claim_payout()─────→
                         │                       │
15.                      │                       ▼
                         │                    Transfer tokens
                         │                    to user wallet
```

---

## Security & Compliance

### Smart Contract Security

#### 1. Access Control

```func
;; Role-based permissions
const role::admin = 1;
const role::oracle = 2;
const role::operator = 3;

() authorize_action(int required_role) impure {
  var (sender_addr, sender_role) = load_sender_info();
  throw_unless(403, sender_role >= required_role);
}

() place_bet(int market_id, int outcome_id, int amount) impure {
  ;; Anyone can place bet
  validate_market_active(market_id);
  process_bet(market_id, outcome_id, amount);
}

() resolve_market(int market_id, int winner_id) impure {
  ;; Only oracles can resolve
  authorize_action(role::oracle);
  validate_resolution(market_id, winner_id);
  execute_settlement(market_id, winner_id);
}
```

#### 2. Reentrancy Protection

```func
;; Use checks-effects-interactions pattern
() claim_payout(int bet_id) impure {
  var (user_addr, payout_amount, claimed) = load_payout_data(bet_id);

  ;; Checks
  throw_unless(400, claimed == false);
  throw_unless(401, user_addr == get_sender_address());

  ;; Effects (update state before external call)
  mark_payout_claimed(bet_id);

  ;; Interactions (external call last)
  send_tokens(user_addr, payout_amount);
}
```

#### 3. Integer Overflow Protection

```func
;; Use safe math operations
int safe_add(int a, int b) {
  int result = a + b;
  throw_if(500, result < a);  ;; Overflow check
  return result;
}

int safe_mul(int a, int b) {
  int result = a * b;
  throw_if(500, (b != 0) & (result / b != a));  ;; Overflow check
  return result;
}
```

### Backend Security

#### 1. Authentication & Authorization

```typescript
// JWT-based auth
import jwt from 'jsonwebtoken';

interface AuthToken {
  userId: string;
  walletAddress: string;
  role: 'user' | 'admin' | 'oracle';
  exp: number;
}

async function authenticate(req: Request): Promise<AuthToken> {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) throw new UnauthorizedError();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthToken;

    // Verify wallet ownership
    await verifyWalletSignature(decoded.walletAddress);

    return decoded;
  } catch (error) {
    throw new UnauthorizedError();
  }
}

// Middleware for protected routes
function requireAuth(req: Request, res: Response, next: NextFunction) {
  authenticate(req)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
}

function requireRole(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}
```

#### 2. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

// Global rate limit
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per window
  message: 'Too many requests from this IP'
});

// Strict limit for bet placement
const betLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 bets per minute
  keyGenerator: (req) => req.user.walletAddress,
  message: 'Bet rate limit exceeded'
});

app.use('/api', globalLimiter);
app.use('/api/bets', betLimiter);
```

#### 3. Input Validation

```typescript
import { z } from 'zod';

const PlaceBetSchema = z.object({
  marketId: z.string().uuid(),
  outcomeId: z.string(),
  amount: z.number()
    .positive()
    .max(10000, 'Maximum bet is 10,000 TON')
    .multipleOf(0.01, 'Minimum denomination is 0.01 TON')
});

app.post('/api/bets', async (req, res) => {
  try {
    const validated = PlaceBetSchema.parse(req.body);

    // Process bet
    const result = await placeBet(req.user, validated);
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});
```

### Compliance Features

#### 1. KYC/AML Integration

```typescript
// Integration with Jumio or similar provider
interface KYCProvider {
  initiateVerification(userId: string): Promise<{ verificationUrl: string }>;
  checkStatus(userId: string): Promise<KYCStatus>;
}

enum KYCStatus {
  NOT_STARTED = 'not_started',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

async function enforceKYCLimits(userId: string, betAmount: number) {
  const user = await getUser(userId);
  const kycStatus = await kycProvider.checkStatus(userId);

  // Limits based on KYC status
  if (kycStatus === KYCStatus.NOT_STARTED && betAmount > 100) {
    throw new Error('KYC required for bets over 100 TON');
  }

  if (kycStatus === KYCStatus.APPROVED) {
    // Full limits (e.g., 10,000 TON)
    return;
  }

  // Reject if KYC rejected
  if (kycStatus === KYCStatus.REJECTED) {
    throw new Error('Account restricted');
  }
}
```

#### 2. Responsible Gambling

```typescript
interface UserLimits {
  dailyDepositLimit: number;
  weeklyLossLimit: number;
  sessionTimeLimit: number; // minutes
  selfExclusionUntil: Date | null;
}

async function checkGamblingLimits(userId: string, betAmount: number) {
  const limits = await getUserLimits(userId);

  // Check self-exclusion
  if (limits.selfExclusionUntil && limits.selfExclusionUntil > new Date()) {
    throw new Error('Account self-excluded');
  }

  // Check daily deposit
  const todayDeposits = await getTodayDeposits(userId);
  if (todayDeposits + betAmount > limits.dailyDepositLimit) {
    throw new Error('Daily deposit limit exceeded');
  }

  // Check weekly loss
  const weeklyLoss = await getWeeklyLoss(userId);
  if (weeklyLoss >= limits.weeklyLossLimit) {
    throw new Error('Weekly loss limit reached');
  }

  // Session timeout warning
  const sessionDuration = await getSessionDuration(userId);
  if (sessionDuration > limits.sessionTimeLimit) {
    await sendRealityCheckNotification(userId);
  }
}
```

#### 3. Audit Logging

```typescript
interface AuditLog {
  timestamp: Date;
  userId: string;
  action: string;
  details: any;
  ipAddress: string;
  userAgent: string;
}

async function logAuditEvent(
  userId: string,
  action: string,
  details: any,
  req: Request
) {
  const log: AuditLog = {
    timestamp: new Date(),
    userId,
    action,
    details,
    ipAddress: req.ip,
    userAgent: req.headers['user-agent']
  };

  // Store in immutable audit table
  await db.query(
    `INSERT INTO audit_logs
     (timestamp, user_id, action, details, ip_address, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [log.timestamp, log.userId, log.action, JSON.stringify(log.details),
     log.ipAddress, log.userAgent]
  );

  // Also stream to external SIEM (e.g., Splunk)
  await siemClient.send(log);
}

// Usage
app.post('/api/bets', async (req, res) => {
  // ... place bet logic

  await logAuditEvent(
    req.user.userId,
    'BET_PLACED',
    { marketId, outcomeId, amount, odds },
    req
  );
});
```

---

## Scalability & Performance

### Database Optimization

#### 1. Schema Design

```sql
-- Optimized for read-heavy workload
CREATE TABLE markets (
  id BIGSERIAL PRIMARY KEY,
  contract_address VARCHAR(48) NOT NULL UNIQUE,
  market_type VARCHAR(50) NOT NULL,
  match_id INTEGER,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_volume NUMERIC(20,9) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_markets_status ON markets(status) WHERE status = 'active';
CREATE INDEX idx_markets_match ON markets(match_id) WHERE match_id IS NOT NULL;

-- Partitioned by time for historical data
CREATE TABLE bets (
  id BIGSERIAL,
  user_id VARCHAR(66) NOT NULL,
  market_id BIGINT NOT NULL REFERENCES markets(id),
  outcome_id VARCHAR(50) NOT NULL,
  amount NUMERIC(20,9) NOT NULL,
  odds NUMERIC(10,4) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  placed_at TIMESTAMP NOT NULL DEFAULT NOW(),
  settled_at TIMESTAMP,
  payout NUMERIC(20,9),
  PRIMARY KEY (id, placed_at)
) PARTITION BY RANGE (placed_at);

-- Create partitions
CREATE TABLE bets_2026_02 PARTITION OF bets
  FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
CREATE TABLE bets_2026_03 PARTITION OF bets
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');

CREATE INDEX idx_bets_user ON bets(user_id, placed_at DESC);
CREATE INDEX idx_bets_market ON bets(market_id, status);
```

#### 2. Caching Strategy

```typescript
// Multi-layer caching
class CacheManager {
  private l1Cache: NodeCache; // In-memory
  private l2Cache: Redis;     // Distributed

  async get<T>(key: string): Promise<T | null> {
    // Try L1 (in-memory) first
    const l1Value = this.l1Cache.get<T>(key);
    if (l1Value) return l1Value;

    // Try L2 (Redis) next
    const l2Value = await this.l2Cache.get(key);
    if (l2Value) {
      const parsed = JSON.parse(l2Value) as T;
      this.l1Cache.set(key, parsed, 60); // Cache in L1 for 1 minute
      return parsed;
    }

    return null;
  }

  async set<T>(key: string, value: T, ttl: number = 300) {
    // Set in both layers
    this.l1Cache.set(key, value, Math.min(ttl, 60));
    await this.l2Cache.setex(key, ttl, JSON.stringify(value));
  }
}

// Usage for market data
async function getMarket(marketId: string): Promise<Market> {
  const cacheKey = `market:${marketId}`;

  // Check cache
  const cached = await cache.get<Market>(cacheKey);
  if (cached) return cached;

  // Fetch from database
  const market = await db.query('SELECT * FROM markets WHERE id = $1', [marketId]);

  // Cache for 5 minutes
  await cache.set(cacheKey, market, 300);

  return market;
}
```

### Horizontal Scaling

#### 1. Stateless API Servers

```yaml
# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cricket-api
spec:
  replicas: 5
  selector:
    matchLabels:
      app: cricket-api
  template:
    metadata:
      labels:
        app: cricket-api
    spec:
      containers:
      - name: api
        image: cricket-markets/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
        - name: REDIS_URL
          valueFrom:
            secretKeyRef:
              name: redis-secret
              key: url
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: cricket-api
spec:
  selector:
    app: cricket-api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

#### 2. Database Connection Pooling

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 20,                    // Maximum pool size
  min: 5,                     // Minimum pool size
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000
});

// Use connection pooling for all queries
export async function query(text: string, params: any[]) {
  const start = Date.now();
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    const duration = Date.now() - start;

    // Log slow queries
    if (duration > 1000) {
      console.warn(`Slow query (${duration}ms): ${text}`);
    }

    return result;
  } finally {
    client.release();
  }
}
```

### Performance Monitoring

```typescript
// Metrics collection with Prometheus
import { register, Counter, Histogram } from 'prom-client';

// Request metrics
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

// Bet placement metrics
const betsPlaced = new Counter({
  name: 'bets_placed_total',
  help: 'Total number of bets placed',
  labelNames: ['market_type', 'outcome']
});

const betAmount = new Histogram({
  name: 'bet_amount_tons',
  help: 'Distribution of bet amounts in TON',
  buckets: [1, 5, 10, 50, 100, 500, 1000]
});

// Middleware to track metrics
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;

    httpRequestDuration.observe(
      { method: req.method, route: req.route?.path, status_code: res.statusCode },
      duration
    );

    httpRequestTotal.inc(
      { method: req.method, route: req.route?.path, status_code: res.statusCode }
    );
  });

  next();
});

// Expose metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
```

---

## Deployment Architecture

### Production Infrastructure

```
┌─────────────────────────────────────────────────────────┐
│                     Cloudflare CDN                      │
│              (Static Assets, DDoS Protection)           │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Load Balancer                          │
│                    (NGINX)                              │
└─────┬──────────────┬──────────────┬─────────────────────┘
      │              │              │
┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
│  Next.js  │  │  Next.js  │  │  Next.js  │
│  Server 1 │  │  Server 2 │  │  Server 3 │
└─────┬─────┘  └─────┬─────┘  └─────┬─────┘
      │              │              │
      └──────────────┼──────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  API Gateway                            │
│                  (Express/Fastify)                      │
└─────┬──────────┬──────────┬──────────┬──────────────────┘
      │          │          │          │
  ┌───▼───┐  ┌──▼───┐  ┌───▼───┐  ┌──▼───┐
  │Market │  │Odds  │  │Socket │  │User  │
  │Service│  │Engine│  │Server │  │ Svc  │
  └───┬───┘  └──┬───┘  └───┬───┘  └──┬───┘
      │         │          │          │
      └─────────┼──────────┼──────────┘
                │          │
        ┌───────▼──────────▼───────┐
        │      PostgreSQL          │
        │    (Primary + Replica)   │
        └──────────────────────────┘
                │
        ┌───────▼──────────┐
        │  Redis Cluster   │
        │  (Cache + Pub/Sub)│
        └──────────────────┘
```

### Environment Configuration

```typescript
// config/environment.ts
export const config = {
  production: {
    ton: {
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: process.env.TON_API_KEY
    },
    database: {
      host: process.env.DB_HOST,
      port: 5432,
      name: 'cricket_markets_prod',
      ssl: true,
      poolSize: 20
    },
    redis: {
      cluster: [
        { host: 'redis-1.internal', port: 6379 },
        { host: 'redis-2.internal', port: 6379 },
        { host: 'redis-3.internal', port: 6379 }
      ]
    },
    monitoring: {
      sentryDsn: process.env.SENTRY_DSN,
      datadogApiKey: process.env.DATADOG_API_KEY
    }
  },
  development: {
    ton: {
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC'
    },
    database: {
      host: 'localhost',
      port: 5432,
      name: 'cricket_markets_dev',
      ssl: false,
      poolSize: 5
    },
    redis: {
      host: 'localhost',
      port: 6379
    }
  }
};
```

---

## Conclusion

This architecture provides a robust, scalable foundation for a TON blockchain-based prediction market platform targeting the 2026 ICC T20 World Cup. Key architectural principles:

1. **Decentralization**: Smart contracts on TON ensure transparent, trustless betting
2. **Performance**: Sub-5-second finality enables real-time in-play betting
3. **Scalability**: Microservices and horizontal scaling support 100K+ concurrent users
4. **Security**: Multi-layer security from smart contracts to API endpoints
5. **Compliance**: Built-in KYC/AML and responsible gambling features

The platform is designed to handle the massive scale and complexity of cricket prediction markets while maintaining the security and transparency benefits of blockchain technology.

### Next Steps

1. Deploy MVP smart contracts to TON testnet
2. Build frontend demo with mock data
3. Integrate cricket data feeds
4. Launch private beta with limited users
5. Full production launch before tournament start (January 2026)

---

**Document Status**: Architecture design complete. Implementation proceeding.
