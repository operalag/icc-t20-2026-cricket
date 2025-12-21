# Cricket Prediction Market Components

Beautiful, conversion-optimized React components for the 2026 ICC T20 World Cup prediction market on TON blockchain.

## Overview

This component library implements best-in-class sports betting UX patterns, specifically tailored for cricket prediction markets. Every component is designed with three core principles:

1. **Conversion Optimization** - Minimal friction from discovery to bet placement
2. **Responsible Gambling** - Proactive user protection built into the UI
3. **Blockchain Transparency** - TON integration that hides complexity while showcasing fairness

## Components

### Betting Interface

#### `BetSlip`
The heart of the betting experience. Persistent, mobile-optimized bet slip with support for single bets and parlays.

**Features:**
- Quick stake buttons ($10, $25, $50, $100)
- Real-time return calculations
- Parlay builder for multiple selections
- Gas fee transparency
- Insufficient balance warnings
- Optimistic UI updates

**Props:**
```typescript
interface BetSlipProps {
  bets: Bet[];
  onRemoveBet: (betId: string) => void;
  onClearAll: () => void;
  onPlaceBet: (bets: Bet[]) => Promise<void>;
  balance: number;
  gasEstimate: number;
}
```

**Usage:**
```tsx
<BetSlip
  bets={userBets}
  onRemoveBet={handleRemove}
  onClearAll={handleClear}
  onPlaceBet={handlePlaceBet}
  balance={userBalance}
  gasEstimate={0.15}
/>
```

#### `OddsButton`
Highly polished odds display component with real-time movement indicators.

**Features:**
- Multiple odds formats (decimal, American, fractional)
- Implied probability display
- Movement arrows (trending up/down)
- Suspended market states
- Accessible touch targets (44px minimum)
- Smooth animations for odds changes

**Variants:**
- `OddsButton` - Full button with label and probability
- `OddsGroup` - Multi-option group (e.g., match winner)
- `CompactOdds` - Minimal version for lists

**Usage:**
```tsx
<OddsButton
  odds={2.15}
  format="decimal"
  label="India to win"
  previousOdds={2.25}
  onClick={handleSelect}
  showProbability={true}
  size="md"
/>
```

### Market Browsing

#### `MatchCard`
Feature-rich match cards for browsing upcoming fixtures.

**Features:**
- Team flags and names
- Venue and time information
- Inline odds with compact display
- Live score integration
- Favorite toggle
- Quick access to all markets
- Tournament stage indicator

**Variants:**
- `MatchCard` - Full card with all details
- `CompactMatchCard` - Condensed list view
- `FeaturedMatchCard` - Hero-style for marquee matches

**Usage:**
```tsx
<MatchCard
  team1={{ name: 'India', code: 'IND', flag: '🇮🇳' }}
  team2={{ name: 'Pakistan', code: 'PAK', flag: '🇵🇰' }}
  venue="R. Premadasa Stadium, Colombo"
  date="Feb 15, 2026"
  time="7:30 PM IST"
  tournamentStage="Group A"
  odds={{ team1: 1.65, team2: 2.20 }}
  totalMarkets={47}
  onSelectOdds={handleOddsSelect}
  onViewMarkets={handleViewMarkets}
/>
```

### TON Wallet Integration

#### `WalletConnect`
Seamless TON wallet connection with TonConnect protocol support.

**Features:**
- One-click connection
- Multiple wallet support
- Address display with copy/explorer links
- Disconnect functionality
- Connection state management
- Error handling

**Usage:**
```tsx
<WalletConnect
  onConnect={handleConnect}
  onDisconnect={handleDisconnect}
  isConnected={isConnected}
  address={walletAddress}
  balance={{ ton: 127.45, usd: 382.35 }}
/>
```

#### `BalanceDisplay`
Comprehensive balance widget with deposit/withdraw actions.

**Features:**
- Total balance display
- Available vs. locked in bets breakdown
- USD conversion
- Quick deposit/withdraw buttons
- Transaction history link

#### `DepositModal`
User-friendly deposit flow with blockchain transaction handling.

**Features:**
- Quick amount selection
- Custom amount input
- Min/max validation
- Gas fee estimation
- Transaction status tracking
- Error recovery

### Live Betting

#### `LiveMatch`
Complete live match center with real-time updates and betting markets.

**Features:**
- Live score display
- Current partnership details
- Ball-by-ball commentary
- Recent overs visualization
- Required run rate (for chases)
- Live odds with movement indicators
- Multiple market tabs (Overview, Scorecard, Markets)
- Responsive to match events

**Usage:**
```tsx
<LiveMatch
  matchId="ind-pak-2026"
  team1="India"
  team2="Pakistan"
  currentInnings={2}
  battingTeam="India"
  bowlingTeam="Pakistan"
  score={{ runs: 127, wickets: 3, overs: 14.2, runRate: 8.8 }}
  target={156}
  required={{ runs: 29, balls: 34, runRate: 9.2 }}
  batsmen={[...]}
  currentBowler={...}
  recentOvers={['1 2 4 W . 1', '6 . 1 1 2 .', ...]}
  liveOdds={{ team1: 1.45, team2: 2.85 }}
  onPlaceBet={handleLiveBet}
/>
```

### Responsible Gambling

#### `ResponsibleGambling`
Comprehensive responsible gambling dashboard.

**Features:**
- Deposit limits (daily/weekly/monthly)
- Loss limits with visual indicators
- Session time tracking
- Self-exclusion options (24h to permanent)
- Reality check settings
- Limit edit with cooling period warnings

**Usage:**
```tsx
<ResponsibleGambling
  depositLimits={{ daily: 100, weekly: 500, monthly: 1500 }}
  lossLimits={{ daily: 50, weekly: 200, monthly: 500 }}
  currentUsage={{ dailyDeposit: 85, ... }}
  sessionDuration={123}
  onUpdateLimits={handleUpdateLimits}
  onSelfExclude={handleSelfExclude}
/>
```

#### `RealityCheckModal`
Periodic check-in during betting sessions.

**Features:**
- Session duration display
- Total staked vs. won comparison
- Net result calculation
- Continue or take break options
- Non-patronizing tone

### Layout

#### `ResponsiveLayout`
Adaptive layout that switches between mobile and desktop patterns.

**Mobile Layout:**
- Bottom tab navigation (thumb-zone optimized)
- Collapsible search
- Side menu drawer
- Floating bet slip
- Safe area insets

**Desktop Layout:**
- Top navigation bar
- Three-column grid (sidebar, content, bet slip)
- Persistent search
- Sticky bet slip

**Usage:**
```tsx
<ResponsiveLayout
  walletComponent={<WalletConnect {...walletProps} />}
  showBetSlip={bets.length > 0}
  betSlipComponent={<BetSlip {...betSlipProps} />}
>
  {/* Your content */}
</ResponsiveLayout>
```

## Design System

### Colors

**Primary Palette:**
- Blue: `#0088FE` (TON-inspired)
- Green: `#00D665` (success)
- Amber: `#FFB020` (warning)
- Red: `#FF4D4D` (error)

**Semantic Colors:**
- Odds Increase: Green with upward arrow
- Odds Decrease: Red with downward arrow
- Live Indicator: Red pulsing dot
- Suspended: Amber with lock icon

### Typography

**Font Family:** Inter (primary), SF Mono/Roboto Mono (odds)

**Type Scale:**
- Heading 1: 32px / 600
- Heading 2: 24px / 600
- Body: 16px / 400
- Odds: 20px / 700 (tabular figures enabled)

### Spacing

**8px base unit:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Touch Targets

All interactive elements meet minimum accessibility standards:
- Primary buttons: 48px height
- Odds buttons: 44x60px
- List items: 56px height
- Bottom navigation: 56px height

## Animation Principles

**Performance First:**
- GPU-accelerated properties only (transform, opacity)
- 60fps minimum on mobile
- Reduced motion support

**Timing:**
- Micro (100ms): Button feedback
- Short (200ms): Transitions
- Medium (300ms): Modals
- Long (500ms): Celebrations

**Key Animations:**
- Odds change: Highlight flash + number count
- Bet placement: Confetti + checkmark
- Live score: Run increment + wicket shake

## Accessibility

**WCAG 2.1 AA Compliant:**
- Color contrast 4.5:1 minimum
- Keyboard navigation support
- Screen reader labels
- Focus indicators
- No time-limited actions (except live betting)

**Inclusive Features:**
- Dyslexia-friendly font option
- High contrast mode
- Colorblind-safe indicators (arrows, not just color)
- Large touch targets

## Performance

**Optimization Strategies:**
- Code splitting by route
- Lazy loading for non-critical components
- Image optimization (WebP with fallbacks)
- Prefetching on hover
- Optimistic UI updates

**Metrics:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Navigation: <200ms

## Best Practices

### Conversion Optimization

1. **Minimize Clicks:** Maximum 2 taps from market to confirmed bet
2. **Smart Defaults:** Pre-populate based on user history
3. **Clear Feedback:** Every action has visual confirmation
4. **Error Prevention:** Validate before submission, not after

### Responsible Gambling

1. **Always Visible:** Limits accessible from main navigation
2. **Non-Judgmental:** Encouraging language, not scolding
3. **Required Checkpoints:** Reality checks every 60 minutes
4. **Transparent Risk:** Show stake amount and implied probability

### Blockchain UX

1. **Hide Complexity:** Users don't need to understand gas
2. **Show Transparency:** Transaction hashes visible but optional
3. **Fast Feedback:** Optimistic updates, confirm in background
4. **Error Recovery:** Clear messaging when blockchain fails

## Development

### Prerequisites

```bash
npm install react@18 react-dom@18 lucide-react
npm install -D tailwindcss@3
```

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: { 600: '#0088FE' },
        green: { 600: '#00D665' },
        amber: { 600: '#FFB020' },
        red: { 600: '#FF4D4D' }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Roboto Mono', 'monospace']
      }
    }
  }
}
```

### TypeScript

All components are fully typed. Import types from:

```typescript
import type { OddsFormat } from './components';
```

## Testing

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { OddsButton } from './components';

test('displays odds and handles click', () => {
  const handleClick = jest.fn();

  render(
    <OddsButton
      odds={2.15}
      label="India"
      onClick={handleClick}
    />
  );

  expect(screen.getByText('2.15')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Accessibility Testing

```tsx
import { axe } from 'jest-axe';

test('has no accessibility violations', async () => {
  const { container } = render(<MatchCard {...props} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

## License

Proprietary - All rights reserved

## Support

For technical questions or bug reports, contact the development team.

---

Built with expertise in sports betting UX, blockchain integration, and responsible gambling design.
