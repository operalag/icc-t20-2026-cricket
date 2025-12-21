# Component Library Summary

## Project Overview

A complete React + Tailwind CSS component library for a 2026 ICC T20 World Cup prediction market platform on the TON blockchain. This library implements world-class sports betting UX patterns with a strong emphasis on responsible gambling and blockchain transparency.

**Created:** December 17, 2025
**Platform:** TON Blockchain
**Tournament:** ICC T20 World Cup 2026 (Feb 7 - Mar 8, 2026)

---

## Directory Structure

```
/Users/tonicaradonna/cricket/
├── docs/
│   ├── 2026-icc-worldcup-prediction-markets.md     # Comprehensive market analysis
│   ├── architecture.md                              # Technical architecture (from architect)
│   ├── ux-design.md                                # UX design strategy & decisions
│   ├── dark-pattern-analysis-summary.md            # Dark pattern prevention
│   ├── DEPLOYMENT.md                               # Deployment guidelines
│   ├── ETHICAL-DESIGN-CHECKLIST.md                 # Pre-launch ethical review
│   ├── ethical-design-guidelines.md                # Core ethical principles
│   ├── PROJECT-SUMMARY.md                          # Overall project summary
│   └── README-ETHICAL-REVIEW.md                    # Ethical framework overview
│
└── src/
    └── components/
        ├── BetSlip.tsx                             # Core betting slip component
        ├── OddsButton.tsx                          # Odds display components
        ├── MatchCard.tsx                           # Match browsing cards
        ├── WalletConnect.tsx                       # TON wallet integration
        ├── LiveMatch.tsx                           # Live betting interface
        ├── ResponsibleGambling.tsx                 # RG controls & limits
        ├── Layout.tsx                              # Responsive layouts
        ├── index.ts                                # Component exports
        └── README.md                               # Component documentation
```

---

## Component Overview

### 1. BetSlip.tsx (312 lines)
**Purpose:** Central betting interface for placing single bets and parlays

**Key Features:**
- Quick stake buttons ($10, $25, $50, $100)
- Single bet and parlay modes
- Real-time return calculations
- Gas fee transparency
- Balance validation
- Optimistic UI updates
- Empty state messaging

**Design Highlights:**
- Mobile-first bottom sheet pattern
- Persistent bet slip (doesn't disappear accidentally)
- Clear visual hierarchy (stake → odds → returns)
- Accessible stake input (numeric keypad on mobile)

**File Location:** `/Users/tonicaradonna/cricket/src/components/BetSlip.tsx`

---

### 2. OddsButton.tsx (273 lines)
**Purpose:** Polished odds display with real-time movement indicators

**Components:**
- `OddsButton` - Full odds button with label & probability
- `OddsGroup` - Multi-option odds group (e.g., match winner)
- `CompactOdds` - Minimal odds for lists

**Key Features:**
- Multiple odds formats (decimal, American, fractional)
- Implied probability display
- Movement indicators (green up arrow, red down arrow)
- Suspended market states
- Size variants (sm, md, lg)
- Smooth animations for odds changes

**Design Highlights:**
- 44px minimum touch targets
- Color + arrow redundant encoding (colorblind-safe)
- Tabular numerals for alignment
- 200ms flash on odds change

**File Location:** `/Users/tonicaradonna/cricket/src/components/OddsButton.tsx`

---

### 3. MatchCard.tsx (244 lines)
**Purpose:** Feature-rich match cards for browsing fixtures

**Components:**
- `MatchCard` - Full card with all details
- `CompactMatchCard` - Condensed list view
- `FeaturedMatchCard` - Hero-style for marquee matches

**Key Features:**
- Team flags and names
- Venue and time information
- Inline odds with quick add
- Live score integration
- Favorite toggle
- Tournament stage indicator
- Market count display

**Design Highlights:**
- Gradient backgrounds for featured matches
- Live indicator (pulsing red dot)
- Clear visual hierarchy
- One-tap odds selection

**File Location:** `/Users/tonicaradonna/cricket/src/components/MatchCard.tsx`

---

### 4. WalletConnect.tsx (312 lines)
**Purpose:** Seamless TON wallet integration

**Components:**
- `WalletConnect` - Connection button/widget
- `BalanceDisplay` - Detailed balance view
- `DepositModal` - Deposit flow

**Key Features:**
- TonConnect protocol support
- Multiple wallet support (TonKeeper, etc.)
- Address display with copy/explorer links
- Balance breakdown (available vs. locked)
- Quick deposit/withdraw actions
- Transaction history access
- Gas fee estimation

**Design Highlights:**
- One-click connection flow
- Persistent connection state
- Clear error messaging
- USD conversion display

**File Location:** `/Users/tonicaradonna/cricket/src/components/WalletConnect.tsx`

---

### 5. LiveMatch.tsx (393 lines)
**Purpose:** Comprehensive live match center with real-time updates

**Key Features:**
- Live score display
- Current partnership details
- Ball-by-ball recent overs
- Batsman statistics (runs, balls, SR)
- Bowler figures (overs, runs, wickets, economy)
- Required run rate for chases
- Live odds with movement
- Multiple tabs (Overview, Scorecard, Markets)

**Design Highlights:**
- Pulsing live indicator
- Color-coded over visualization (W=red, 6=green, 4=blue, dot=gray)
- Responsive to match state
- Quick bet integration
- Gradient header for visual impact

**File Location:** `/Users/tonicaradonna/cricket/src/components/LiveMatch.tsx`

---

### 6. ResponsibleGambling.tsx (585 lines)
**Purpose:** Comprehensive responsible gambling controls

**Components:**
- `ResponsibleGambling` - Main RG dashboard
- `RealityCheckModal` - Periodic session check-in
- `EditLimitsModal` - Limit adjustment interface

**Key Features:**
- Deposit limits (daily/weekly/monthly)
- Loss limits with progress bars
- Session time tracking
- Self-exclusion (24h to permanent)
- Reality check settings
- Limit edit with cooling period
- Visual limit indicators

**Design Highlights:**
- Non-patronizing tone
- Clear progress visualization
- Color-coded warnings (green → amber → red)
- Confirmation required for exclusion
- "EXCLUDE" or "PERMANENT" typed confirmation

**File Location:** `/Users/tonicaradonna/cricket/src/components/ResponsibleGambling.tsx`

---

### 7. Layout.tsx (259 lines)
**Purpose:** Responsive layouts for mobile and desktop

**Components:**
- `MobileLayout` - Mobile-optimized with bottom nav
- `DesktopLayout` - Three-column desktop layout
- `ResponsiveLayout` - Automatic switching wrapper

**Key Features:**
- Mobile: Bottom tab navigation (thumb-zone)
- Mobile: Collapsible search
- Mobile: Side menu drawer
- Desktop: Top navigation bar
- Desktop: Three-column grid
- Desktop: Sticky bet slip
- Safe area insets for notched devices

**Design Highlights:**
- Adaptive based on screen width (<768px = mobile)
- Floating bet slip on mobile
- Persistent sidebar on desktop
- Smooth animations for menu

**File Location:** `/Users/tonicaradonna/cricket/src/components/Layout.tsx`

---

## Design System

### Color Palette

**Primary:**
- Blue: `#0088FE` (TON brand)
- Green: `#00D665` (success, wins, odds increase)
- Amber: `#FFB020` (warning, approaching limits)
- Red: `#FF4D4D` (error, losses, odds decrease)

**Neutrals:**
- Background Light: `#FFFFFF`
- Background Dark: `#121212`
- Surface Light: `#F5F5F5`
- Surface Dark: `#1E1E1E`

**Semantic:**
- Live Indicator: Red pulsing
- Suspended Market: Amber with lock icon
- Odds Movement: Green (up) / Red (down) with arrows

### Typography

**Font Families:**
- Primary: Inter (optimized for web, excellent numerals)
- Monospace: SF Mono / Roboto Mono (for odds display)

**Type Scale:**
- H1: 32px / 600 weight
- H2: 24px / 600
- H3: 20px / 600
- Body: 16px / 400
- Small: 14px / 400
- Caption: 12px / 400
- Odds: 20-24px / 700 (tabular figures enabled)

### Spacing (8px base unit)

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Touch Targets

**Minimum Sizes (WCAG 2.1 AA):**
- Primary buttons: 48px height
- Odds buttons: 44x60px
- List items: 56px height
- Bottom navigation: 56px height
- Icon buttons: 44x44px

---

## Key UX Patterns

### 1. Conversion Optimization

**Goal:** Maximum 2 taps from market discovery to confirmed bet

**Implementation:**
- Featured markets on homepage
- Inline odds on match cards
- Quick stake buttons in bet slip
- Optimistic UI updates
- Smart defaults (based on user history)

**Result:** 80%+ bet slip completion rate (target)

### 2. Odds Display Standards

**Always Show:**
- Odds value (large, bold)
- Implied probability (smaller, gray)
- Movement indicator (if changed recently)
- Market state (active/suspended)

**Format Support:**
- Decimal (default): 2.15
- American: +115 or -110
- Fractional: 23/20
- User preference persisted

### 3. Responsible Gambling Integration

**Not Hidden, Not Intrusive:**
- Limits accessible from main menu
- Reality checks every 60 minutes
- Visual progress bars for limits
- Non-judgmental language
- "Take a Break" encouraged, not forced

**Key Metrics:**
- Daily/weekly/monthly deposit limits
- Daily/weekly/monthly loss limits
- Session duration tracking
- Self-exclusion options

### 4. Blockchain Transparency

**Hide Complexity, Show Fairness:**
- Users don't see gas calculation
- But gas fee is clearly disclosed
- Transaction hash visible after bet
- Link to block explorer optional
- Optimistic UI (don't wait for blockchain)

### 5. Mobile-First Design

**Thumb Zone Optimization:**
- Primary actions in bottom 30% of screen
- Bottom tab navigation
- Floating bet slip
- Large touch targets (44px minimum)
- One-handed operation support

**Performance:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Route transitions: <200ms

---

## Component API Examples

### BetSlip

```tsx
<BetSlip
  bets={[
    {
      id: '1',
      market: 'Match Winner',
      selection: 'India to win',
      odds: 2.15,
      oddsFormat: 'decimal',
      matchInfo: 'India vs Pakistan'
    }
  ]}
  onRemoveBet={(id) => console.log('Remove', id)}
  onClearAll={() => console.log('Clear all')}
  onPlaceBet={async (bets) => {
    // Submit to blockchain
    await submitBets(bets);
  }}
  balance={127.45}
  gasEstimate={0.15}
/>
```

### MatchCard

```tsx
<MatchCard
  team1={{ name: 'India', code: 'IND', flag: '🇮🇳' }}
  team2={{ name: 'Pakistan', code: 'PAK', flag: '🇵🇰' }}
  venue="R. Premadasa Stadium, Colombo"
  date="Feb 15, 2026"
  time="7:30 PM IST"
  tournamentStage="Group A"
  odds={{
    team1: 1.65,
    team2: 2.20,
    previousTeam1: 1.75,
    previousTeam2: 2.10
  }}
  totalMarkets={47}
  onSelectOdds={(team) => addToBetSlip(team)}
  onViewMarkets={() => navigate('/match/ind-vs-pak')}
  isFavorite={false}
  onToggleFavorite={() => toggleFavorite()}
/>
```

### LiveMatch

```tsx
<LiveMatch
  matchId="ind-pak-2026"
  team1="India"
  team2="Pakistan"
  currentInnings={2}
  battingTeam="India"
  bowlingTeam="Pakistan"
  score={{
    runs: 127,
    wickets: 3,
    overs: 14.2,
    runRate: 8.8
  }}
  target={156}
  required={{
    runs: 29,
    balls: 34,
    runRate: 9.2
  }}
  batsmen={[
    { name: 'Kohli', runs: 47, balls: 31, fours: 5, sixes: 1, strikeRate: 151.6 },
    { name: 'Pandya', runs: 12, balls: 8, fours: 1, sixes: 1, strikeRate: 150.0 }
  ]}
  currentBowler={{
    name: 'Shaheen Afridi',
    overs: 2.2,
    runs: 23,
    wickets: 1,
    economy: 9.86
  }}
  recentOvers={['1 2 4 W . 1', '6 . 1 1 2 .', '• • 1 2 4 .']}
  liveOdds={{
    team1: 1.45,
    team2: 2.85,
    previousTeam1: 1.55,
    previousTeam2: 2.65
  }}
  onPlaceBet={(selection, odds) => addLiveBet(selection, odds)}
/>
```

### ResponsibleGambling

```tsx
<ResponsibleGambling
  depositLimits={{
    daily: 100,
    weekly: 500,
    monthly: 1500
  }}
  lossLimits={{
    daily: 50,
    weekly: 200,
    monthly: 500
  }}
  currentUsage={{
    dailyDeposit: 85,
    weeklyDeposit: 320,
    monthlyDeposit: 890,
    dailyLoss: 12,
    weeklyLoss: 67,
    monthlyLoss: 234
  }}
  sessionDuration={123} // minutes
  onUpdateLimits={async (type, limits) => {
    await updateUserLimits(type, limits);
  }}
  onSelfExclude={async (duration) => {
    await excludeUser(duration);
  }}
/>
```

---

## Technical Stack

### Dependencies

**Required:**
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "lucide-react": "latest",
  "tailwindcss": "^3.0.0"
}
```

**Recommended:**
```json
{
  "@ton/ton": "latest",
  "@tonconnect/ui-react": "latest",
  "date-fns": "^2.30.0",
  "zustand": "^4.0.0"
}
```

### TypeScript

All components are fully typed with TypeScript. No `any` types used.

**Import Types:**
```typescript
import type { OddsFormat } from './components/OddsButton';
import type { Bet } from './components/BetSlip';
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
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
      },
      fontVariantNumeric: {
        'tabular-nums': 'tabular-nums'
      }
    }
  }
}
```

---

## Accessibility Compliance

### WCAG 2.1 AA Standards

**Color Contrast:**
- Text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators (2px outline)
- Logical tab order
- Skip links for main content

**Screen Reader Support:**
- Semantic HTML (proper heading hierarchy)
- ARIA labels for icons
- Live regions for odds updates
- Descriptive link text

**Inclusive Features:**
- Colorblind-safe indicators (arrows + color)
- Large touch targets (44px minimum)
- Dyslexia-friendly font option
- High contrast mode
- Reduced motion support

---

## Performance Optimization

### Load Time Targets

- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3.5s
- **Total Blocking Time:** <300ms

### Strategies Implemented

**Code Splitting:**
- Route-based chunks
- Lazy load player stats
- Defer non-critical analytics

**Image Optimization:**
- Team logos: SVG (scalable, small)
- Player photos: WebP with JPEG fallback
- Lazy loading below fold

**Data Fetching:**
- Prefetch on hover
- Cache odds data (5s TTL)
- Optimistic UI updates

---

## Testing Guidelines

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { BetSlip } from './components';

test('calculates returns correctly', () => {
  render(
    <BetSlip
      bets={[{ id: '1', odds: 2.15, ... }]}
      balance={100}
      gasEstimate={0.15}
      {...handlers}
    />
  );

  // Enter stake
  const stakeInput = screen.getByPlaceholderText('0.00');
  fireEvent.change(stakeInput, { target: { value: '50' } });

  // Check calculated return
  expect(screen.getByText('$107.50')).toBeInTheDocument();
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

---

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

---

## Implementation Timeline

### Phase 1: MVP (4-6 weeks)
- ✅ Core betting components (BetSlip, OddsButton)
- ✅ Match browsing (MatchCard)
- ✅ TON wallet integration
- ✅ Responsible gambling UI
- ✅ Responsive layouts

### Phase 2: Live Betting (2-3 weeks)
- ✅ Live match center
- ⏳ Real-time data integration
- ⏳ WebSocket connection handling

### Phase 3: Advanced Features (3-4 weeks)
- ⏳ Cash-out functionality
- ⏳ Bet builder
- ⏳ Social features
- ⏳ Push notifications

### Phase 4: Polish & Testing (2-3 weeks)
- ⏳ Performance optimization
- ⏳ Accessibility audit
- ⏳ User testing
- ⏳ A/B testing setup

**Total Estimated Time:** 11-16 weeks to production

---

## Success Metrics

### Conversion Metrics

**Target:**
- Bet slip completion: >80%
- Average time to first bet: <2 minutes
- Odds click → bet placed: >70%

**Measure:**
- Track funnel drop-off points
- A/B test stake input patterns
- Monitor abandoned bet slips

### UX Metrics

**Target:**
- NPS score: >60
- App store rating: >4.3/5
- Support ticket rate: <5% of users

**Measure:**
- In-app surveys
- User session recordings
- Heatmaps on key pages

### Responsible Gambling

**Target:**
- Users setting limits: >40%
- Self-exclusion rate: <2%
- Reality check acknowledgment: >95%

**Measure:**
- RG dashboard usage
- Limit edit frequency
- Problem gambling flags (<1%)

---

## Known Limitations

1. **Live Betting Latency:** Requires sub-second data feed. WebSocket or Server-Sent Events recommended.

2. **Blockchain Transaction Time:** TON is fast (~5s) but still creates UX friction. Optimistic UI critical.

3. **Mobile Browser Variations:** iOS Safari has quirks with bottom safe area. Test extensively.

4. **Odds Format Conversion:** Fractional odds can create rounding issues. Use precise calculations.

5. **Dark Mode:** Implemented but needs extensive testing for color contrast in all states.

---

## Next Steps

### For Implementation Team

1. **Review UX Design Document:** `/Users/tonicaradonna/cricket/docs/ux-design.md`

2. **Read Component Documentation:** `/Users/tonicaradonna/cricket/src/components/README.md`

3. **Set Up Development Environment:**
   ```bash
   npm install react@18 react-dom@18 lucide-react tailwindcss@3
   npm install @ton/ton @tonconnect/ui-react
   ```

4. **Start with Core Components:**
   - BetSlip (most complex)
   - OddsButton (most reused)
   - Layout (foundation)

5. **Integrate with Backend:**
   - Connect to odds data API
   - Implement TON smart contract calls
   - Set up WebSocket for live updates

6. **Test Thoroughly:**
   - Unit tests for calculations
   - Integration tests for bet flow
   - Accessibility audit
   - Mobile device testing

### For Product Team

1. **Review Ethical Guidelines:** `/Users/tonicaradonna/cricket/docs/ethical-design-guidelines.md`

2. **Complete Pre-Launch Checklist:** `/Users/tonicaradonna/cricket/docs/ETHICAL-DESIGN-CHECKLIST.md`

3. **Plan A/B Tests:**
   - Stake button amounts ($10/$25 vs $20/$50)
   - Odds format defaults
   - Bet slip position (bottom vs side on mobile)

4. **Prepare User Onboarding:**
   - First-time user tutorial
   - Responsible gambling education
   - TON wallet setup guide

---

## Support & Contact

For technical questions about components:
- Read component READMEs
- Check UX design document for rationale
- Review ethical guidelines for RG features

For architectural questions:
- Consult architecture.md
- Review deployment guide

---

## License

Proprietary - All rights reserved

---

**Built with expertise in:**
- Sports betting UX (15+ years)
- Prediction markets
- Blockchain integration
- Responsible gambling design
- Mobile-first development
- Accessibility standards

**Component Library Version:** 1.0.0
**Last Updated:** December 17, 2025
**Total Components:** 8 major + 3 variants
**Total Lines of Code:** ~2,700+ (TypeScript/TSX)
**Documentation Pages:** 9 comprehensive docs
