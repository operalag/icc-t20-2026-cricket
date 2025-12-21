# UX Design Document: ICC T20 World Cup 2026 Prediction Market

**Platform:** TON Blockchain
**Target Launch:** January 2026
**Tournament Dates:** February 7 - March 8, 2026

---

## Executive Summary

This document outlines the UX/UI strategy for a mobile-first, conversion-optimized prediction market platform focused on the 2026 ICC T20 World Cup. The design balances three critical objectives:

1. **Conversion optimization** - Minimize friction from market discovery to bet placement
2. **Responsible gambling** - Proactive user protection without patronizing design
3. **Blockchain transparency** - Leverage TON's capabilities while hiding technical complexity

---

## 1. Design Philosophy

### 1.1 Core Principles

**Speed Over Beauty**
In live T20 betting, every second matters. Our design prioritizes:
- One-tap bet placement for quick markets
- Skeleton states that match actual content structure
- Optimistic UI updates with graceful failure handling
- Maximum of 2 taps from any market to confirmed bet

**Clarity Over Density**
Cricket attracts diverse numeracy levels. We will:
- Always show implied probability alongside odds
- Use progressive disclosure for complex bet types (parlays, system bets)
- Provide contextual help without cluttering the interface
- Design for the 60th percentile user (moderate cricket knowledge, some betting experience)

**Trust Through Transparency**
Blockchain enables provable fairness. We showcase:
- Transaction hashes visible on confirmation
- Real-time blockchain confirmation status
- Clear gas fee disclosure before bet submission
- Immutable bet history with on-chain verification

**Mobile-First, Always**
With 75%+ traffic expected on mobile:
- Thumb-zone optimization for primary actions
- Single-handed operation for core flows
- Progressive enhancement for desktop (not separate experiences)
- Touch targets minimum 44x44px

### 1.2 Conversion Funnel Strategy

```
Market Discovery → Odds Assessment → Stake Input → Bet Confirmation → Settlement
     95%               90%              85%            95%              100%
```

**Target conversion rates above.** Our design interventions:

1. **Market Discovery (95% → next step)**
   - Featured markets above the fold
   - Smart defaults (show India matches first for Indian users)
   - Search with type-ahead for player names

2. **Odds Assessment (90% → stake input)**
   - Show recent odds movement with visual indicators
   - Display implied probability in %
   - Provide context: "India wins 68% of home T20Is"

3. **Stake Input (85% → confirmation)**
   - Smart stake suggestions based on user history
   - Clear potential return calculation
   - One-tap quick bet amounts ($10, $25, $50, $100)

4. **Bet Confirmation (95% → success)**
   - Persistent bet slip (doesn't disappear on misclick)
   - Odds change handling with user consent
   - Gas fee transparency with estimated confirmation time

---

## 2. Odds Display Strategy

### 2.1 Format Support

**Primary Display:** Decimal (default for most markets)
**Rationale:** Simplest for calculating returns (stake × odds = total return)

**Secondary Formats:**
- American: For US users and familiar bettors
- Fractional: Traditional UK preference
- Implied Probability: Educational tool, builds trust

**Format Toggle:** Persistent user preference (saved to account)

**Visual Hierarchy:**
```
┌─────────────────────────────┐
│ India vs Pakistan           │
│                             │
│ India        [  2.15  ] ←── Large, bold, primary action
│              68% win probability ← Smaller, gray
│                             │
│ Pakistan     [  3.40  ]     │
│              29% win probability
└─────────────────────────────┘
```

### 2.2 Odds Movement Indicators

**Real-time Updates:**
- Green upward arrow (▲): Odds lengthening (team less favored)
- Red downward arrow (▼): Odds shortening (team more favored)
- Pulse animation on rapid movement (3+ changes in 60 seconds)
- "Suspended" badge with reason when market closed

**Color Accessibility:**
- Never use red/green alone
- Arrows provide redundant encoding
- Option for colorblind mode (blue/orange palette)

### 2.3 Market States

1. **Active:** Standard display, clickable
2. **Suspended:** Grayed out, "SUSPENDED" badge, reason provided
3. **Odds Changed:** Yellow highlight, "Odds changed - Accept new odds?" prompt
4. **Closed:** Removed from interface or "Market Closed" state

---

## 3. Bet Slip Design

### 3.1 Persistent Bet Slip (Mobile)

**Bottom Sheet Pattern:**
- Floats above content, accessible via bottom tab
- Badge shows number of selections (visual feedback)
- Swipe up to expand, swipe down to minimize
- Never disappears accidentally (explicit clear action required)

**States:**
1. **Empty:** Minimized, shows "Tap odds to build your bet"
2. **Single Selection:** Expanded, shows stake input
3. **Multiple Selections:** Shows parlay builder option
4. **Submitting:** Loading state with blockchain confirmation
5. **Confirmed:** Success animation, transaction hash, option to share

### 3.2 Stake Input Patterns

**Quick Stakes (One-Tap):**
```
┌──────────────────────────────────┐
│  $10    $25    $50    $100       │ ← Horizontally scrollable
└──────────────────────────────────┘
```

**Custom Stake:**
- Numeric keypad overlay (mobile)
- Decimal support for precise amounts
- Min/max stake validation with inline error
- Balance check before submission

**Smart Suggestions:**
- "Your average stake: $32" (if user has history)
- "Recommended unit: $25 (2% of bankroll)" (optional feature)
- Deposit limits remaining indicator

### 3.3 Potential Returns

**Always Visible:**
```
┌─────────────────────────────────┐
│ Stake:        $50.00            │
│ Odds:         2.15              │
│ Potential Return: $107.50       │ ← Bold, green
│ Potential Profit:  $57.50       │ ← Regular weight
│                                 │
│ Gas Fee: ~0.05 TON ($0.15)     │ ← Gray, smaller
└─────────────────────────────────┘
```

**Interactive Calculation:**
- Updates in real-time as user types stake
- Shows multiple currency equivalents (TON, USD, local)
- Breakdown for parlays (shows if 1/3 legs wins, if 2/3 legs win, etc.)

### 3.4 Parlay Builder

**Progressive Disclosure:**
1. Add first selection → Bet slip shows single bet
2. Add second selection → "Build a Parlay?" prompt appears
3. User accepts → Interface transforms to parlay mode
4. Clear visual separator between single bets and parlay

**Parlay Display:**
```
┌─────────────────────────────────┐
│ PARLAY (3 legs)                 │
│                                 │
│ ✓ India to win      @ 2.15     │ ← Checkmark for visual clarity
│ ✓ Kohli 30+ runs    @ 2.00     │
│ ✓ Bumrah 2+ wickets @ 3.50     │
│                                 │
│ Combined Odds:      15.05       │ ← Prominent
│ Stake:              $20.00      │
│ Potential Return:   $301.00     │
└─────────────────────────────────┘
```

**Remove Functionality:**
- Swipe left on individual leg to remove
- "Clear All" option with confirmation dialog

---

## 4. Market Browsing UX

### 4.1 Information Architecture

```
Home
├── Featured Markets (Algorithmic + Editorial)
├── Matches (Chronological)
│   ├── Today
│   ├── Tomorrow
│   └── Upcoming
├── Outrights
│   ├── Tournament Winner
│   ├── Top Batsman
│   ├── Top Bowler
│   └── Special Markets
├── Live Now (Real-time matches)
└── My Bets
```

### 4.2 Match Card Design

**Core Information Hierarchy:**
1. Teams (largest text)
2. Match context (venue, date, tournament stage)
3. Primary market (match winner odds)
4. Quick access to more markets

**Visual Design:**
```
┌─────────────────────────────────────────┐
│ Group A • Feb 15 • 7:30 PM IST         │ ← Context bar
│                                         │
│ 🇮🇳 INDIA                              │ ← Flag + Team
│           vs                            │
│ 🇵🇰 PAKISTAN                           │
│                                         │
│ R. Premadasa Stadium, Colombo          │
│                                         │
│ ┌──────────┬──────────┐               │
│ │ India    │ Pakistan │               │ ← Odds pills
│ │  1.65    │  2.20    │               │   (tappable)
│ └──────────┴──────────┘               │
│                                         │
│ +47 More Markets →                     │ ← Entry point
└─────────────────────────────────────────┘
```

**Interaction:**
- Tap team name → Team statistics overlay
- Tap odds → Add to bet slip
- Tap "More Markets" → Expand to full market list
- Long press → Add to favorites

### 4.3 Market Categories Within Match

**Tabbed Interface:**
```
[ Main ] [ Totals ] [ Players ] [ Specials ]
   ↑
 Default active
```

**Main Tab:**
- Match Winner (3-way with tie)
- Total Match Runs O/U
- Team Totals
- Winning Margin bands

**Players Tab:**
- Top Team Batsman (both teams)
- Top Team Bowler
- Player Runs O/U (featured players)
- Player Wickets O/U
- Player to score 50+

**Specials Tab:**
- Powerplay runs O/U
- Death overs runs O/U
- Total sixes O/U
- Method of first dismissal
- Toss winner

### 4.4 Search & Filter

**Search Features:**
- Type-ahead suggestions
- Recent searches (stored locally)
- Popular searches (contextual to tournament phase)
- Search by: Team, Player, Match, Market type

**Filters:**
- Tournament stage (Group, Super 8, Knockouts)
- Date range
- Market type
- Minimum odds threshold
- Teams (multi-select)

**Applied Filters Display:**
```
┌─────────────────────────────────┐
│ Filters: India matches • Today  │ ← Chips, tap to remove
│          ×             ×        │
└─────────────────────────────────┘
```

---

## 5. TON Wallet Integration UX

### 5.1 Connection Flow

**Initial State (Not Connected):**
```
┌─────────────────────────────────┐
│                                 │
│    [Icon] Connect TON Wallet    │ ← Prominent CTA
│                                 │
│    Secure • Fast • Decentralized│
└─────────────────────────────────┘
```

**Connection Methods:**
1. TonConnect (preferred)
2. TonKeeper deep link
3. QR code for desktop users

**Progress States:**
1. "Connecting..." (loading spinner)
2. "Sign message in wallet" (waiting for user action)
3. "Connected!" (success, auto-dismiss after 2s)

**Error Handling:**
- "Connection failed - Try again" (with retry button)
- "Wallet not found - Install TonKeeper" (with link)
- "Connection rejected - Please approve in wallet"

### 5.2 Balance Display

**Header Component:**
```
┌─────────────────────────────────┐
│ [Wallet Icon] 127.45 TON       │ ← Always visible
│               ≈ $382.35 USD     │   (header)
└─────────────────────────────────┘
```

**Tap to Expand:**
```
┌─────────────────────────────────┐
│ Total Balance:    127.45 TON    │
│                                 │
│ Available:        127.45 TON    │ ← Free to bet
│ In Open Bets:       0.00 TON    │ ← Locked in bets
│                                 │
│ [Deposit] [Withdraw] [History] │
└─────────────────────────────────┘
```

### 5.3 Deposit Flow

**Amount Selection:**
```
┌─────────────────────────────────┐
│ Deposit TON                     │
│                                 │
│ Quick amounts:                  │
│  [10 TON] [25 TON] [50 TON]    │
│                                 │
│ Or enter amount:                │
│  [____________] TON             │
│                                 │
│ ≈ $XXX.XX USD                   │
│                                 │
│          [Confirm]              │
└─────────────────────────────────┘
```

**Blockchain Transaction:**
1. User confirms amount
2. Wallet opens with pre-filled transaction
3. User signs in wallet
4. Loading state: "Confirming on blockchain..."
5. Success: "Deposited 50 TON" with transaction hash link

**Confirmation Time:**
- Show estimated time: "Usually takes 5-10 seconds"
- Progress indicator during wait
- Option to "Continue Browsing" (doesn't block UX)

### 5.4 Withdrawal Flow

**Security Layers:**
1. Amount confirmation
2. 2FA if enabled (optional feature)
3. Wallet signature required

**Withdrawal Screen:**
```
┌─────────────────────────────────┐
│ Withdraw TON                    │
│                                 │
│ Available: 127.45 TON           │
│                                 │
│ Amount:                         │
│  [____________] TON             │
│                                 │
│ To: 0xEQ...abc123 (Your wallet)│ ← Read-only
│                                 │
│ Network Fee: ~0.02 TON          │
│                                 │
│ You will receive: XXX.XX TON    │
│                                 │
│          [Withdraw]             │
└─────────────────────────────────┘
```

**Responsible Gambling Integration:**
- Show deposit limit status: "Daily limit: $50 remaining"
- Withdrawal cooling period indicator (if applicable)
- Link to responsible gambling settings

### 5.5 Transaction History

**List View:**
```
┌─────────────────────────────────────┐
│ Today                               │
│                                     │
│ ↓ Deposit    +50.00 TON   10:23 AM│ ← Green for incoming
│   [View on TONScan]                 │
│                                     │
│ ⚡ Bet Placed  -5.00 TON   10:45 AM│ ← Blue for bets
│   India vs Pakistan                 │
│                                     │
│ Yesterday                           │
│                                     │
│ ✓ Bet Won    +10.75 TON   Yesterday│ ← Green for wins
│   Australia vs England              │
└─────────────────────────────────────┘
```

**Transaction Detail:**
- Full transaction hash (truncated with copy button)
- Block height
- Timestamp
- Status (Confirmed, Pending, Failed)
- Link to block explorer
- Receipt download (PDF)

---

## 6. Live Betting UX

### 6.1 Live Match Center

**Critical Design Goal:** Display enough context to bet intelligently without overwhelming the user.

**Layout Structure:**
```
┌─────────────────────────────────────┐
│ 🔴 LIVE                            │ ← Pulsing indicator
│                                     │
│ India 127/3 (14.2 overs)           │ ← Score (largest)
│ vs Pakistan                         │
│                                     │
│ Current: Kohli 47* (31)            │ ← Active batsman
│         Pandya 12* (8)              │
│                                     │
│ Required: 156 in 34 balls          │ ← Chase context
│ RRR: 9.2 | CRR: 8.8                │
│                                     │
│ ┌─────────────────────────────┐   │
│ │ Live Markets ▼              │   │
│ ├─────────────────────────────┤   │
│ │ Match Winner                 │   │
│ │ India  1.45  ↓              │   │ ← Real-time odds
│ │ Pakistan 2.85 ↑             │   │
│ │                              │   │
│ │ Next Over Runs (O/U 7.5)    │   │
│ │ Over 1.90  |  Under 1.90    │   │
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 6.2 Real-Time Odds Animation

**Update Frequency:** After every ball (120 updates per innings)

**Visual Treatment:**
- Smooth number transitions (avoid jarring jumps)
- Brief highlight (200ms yellow glow) on change
- Direction arrow for 3 seconds after change
- Fade-in for new markets appearing

**Suspended Markets:**
```
┌─────────────────────────────┐
│ Match Winner                │
│                             │
│    ⏸️  SUSPENDED            │ ← Pause icon
│    Updating after wicket    │   Clear reason
│                             │
└─────────────────────────────┘
```

**Auto-Resume:**
- Markets automatically reactive when event processed
- No user action required
- Smooth transition back to active state

### 6.3 Quick Bet Functionality

**One-Tap Betting (Opt-In Feature):**

User enables in settings:
- "Enable Quick Bet: Tap odds to instantly place $X bet"
- Configurable stake amount
- Confirmation sound/haptic feedback
- Can disable anytime

**Without Quick Bet (Default):**
- Tap odds → Add to bet slip → Enter stake → Confirm
- Standard flow maintains control

**Quick Bet Interface:**
```
┌─────────────────────────────┐
│ Quick Bet: $25              │ ← Enabled indicator
│                             │
│ [Tap odds to bet $25]       │
│                             │
│ India to win @ 1.45         │
│    [  1.45  ]  ← Tap here  │
│                             │
│ ✓ Bet placed! (haptic)     │ ← Instant feedback
└─────────────────────────────┘
```

### 6.4 Match Visualization

**Ball-by-Ball Tracker:**
```
Recent overs:
Over 14: • 1 2 4 W . 1  (8 runs)
Over 13: 1 . . 2 4 1  (8 runs)
Over 12: 6 . 1 1 2 .  (10 runs)

Legend: • = dot, W = wicket, numbers = runs
```

**Worm Chart (Run Rate):**
- Visual graph showing run rate progression
- Toggle between: CRR, RRR, Projected total
- Switchable via tabs

**Manhattan (Runs Per Over):**
- Bar chart showing scoring rate by over
- Color-coded: Powerplay (green), Middle (gray), Death (red)
- Tap bar to see detailed over summary

### 6.5 Cash-Out Interface

**Availability:**
- Only for pre-match bets (in-play)
- Algorithmic calculation based on current match state
- Updates every over

**Cash-Out Display:**
```
┌─────────────────────────────────┐
│ Your Bet: India to win          │
│ Stake: $50 @ 2.15               │
│ Potential Win: $107.50          │
│                                 │
│ Current Cash-Out: $78.40        │ ← Bold, green
│                                 │
│ [Cash Out Now]                  │ ← Prominent button
│                                 │
│ Profit if cashed out: +$28.40   │
└─────────────────────────────────┘
```

**Partial Cash-Out:**
```
┌─────────────────────────────────┐
│ Cash out amount:                │
│                                 │
│ [•──────────────○────] $78.40  │ ← Slider
│ 0%            50%          100% │
│                                 │
│ Keep riding:    $28.60          │
│ Secure profit:  +$14.20         │
│                                 │
│          [Confirm]              │
└─────────────────────────────────┘
```

---

## 7. Responsible Gambling Features

### 7.1 Design Philosophy

**Proactive Without Patronizing:**
- Don't hide gambling controls in obscure settings
- Use encouraging language, not scolding
- Provide tools, not judgments
- Default to protection, allow opt-out

**Visibility Without Shame:**
- Limits visible but not constantly in face
- Reality checks appear at natural break points
- Self-exclusion easy to access but requires confirmation

### 7.2 Deposit Limits UI

**Settings Screen:**
```
┌─────────────────────────────────┐
│ Deposit Limits                  │
│                                 │
│ Daily Limit:   $100             │
│ Weekly Limit:  $500             │
│ Monthly Limit: $1,500           │
│                                 │
│ [Edit Limits]                   │
│                                 │
│ Changes take effect in 24 hours │ ← Cooling period
│ Decreases are immediate         │
└─────────────────────────────────┘
```

**Limit Warning (Contextual):**
```
┌─────────────────────────────────┐
│ ⚠️ Approaching Daily Limit       │
│                                 │
│ Deposited today:    $85/$100    │
│                                 │
│ [Continue] [Review Limits]      │
└─────────────────────────────────┘
```

**Limit Reached:**
```
┌─────────────────────────────────┐
│ Daily Deposit Limit Reached     │
│                                 │
│ You've reached your daily limit │
│ of $100. This limit resets      │
│ tomorrow at midnight.           │
│                                 │
│ [OK] [Review Limits]            │
└─────────────────────────────────┘
```

### 7.3 Session Time Tracking

**Reality Check (Non-Intrusive):**

Every 60 minutes:
```
┌─────────────────────────────────┐
│ ⏰ Time Check                    │
│                                 │
│ You've been playing for 2 hours │
│                                 │
│ Staked:      $125               │
│ Won:         $87                │
│ Net:         -$38               │
│                                 │
│ [Continue] [Take a Break]       │
└─────────────────────────────────┘
```

**Always Visible (Optional Setting):**
```
┌─────────────────────────────────┐
│ Header                          │
│ Session: 1h 23m | -$45  [...]  │ ← Collapsible
└─────────────────────────────────┘
```

### 7.4 Self-Exclusion

**Access Point:**
- Profile → Responsible Gambling → Self-Exclusion
- Prominent but not alarming placement

**Interface:**
```
┌─────────────────────────────────┐
│ Self-Exclusion                  │
│                                 │
│ Take a break from betting:      │
│                                 │
│ [○] 24 hours                    │
│ [○] 1 week                      │
│ [○] 1 month                     │
│ [○] 3 months                    │
│ [○] 6 months                    │
│ [○] Permanent                   │
│                                 │
│ During exclusion:               │
│ • Cannot place bets             │
│ • Cannot deposit funds          │
│ • Can withdraw winnings         │
│                                 │
│ [Exclude Me]                    │
└─────────────────────────────────┘
```

**Confirmation Required:**
```
┌─────────────────────────────────┐
│ Confirm Self-Exclusion          │
│                                 │
│ You're about to exclude yourself│
│ for 1 month. This cannot be     │
│ reversed.                       │
│                                 │
│ Type "EXCLUDE" to confirm:      │
│ [________________]              │
│                                 │
│ [Cancel] [Confirm Exclusion]    │
└─────────────────────────────────┘
```

### 7.5 Loss Limits

**Configurable Thresholds:**
```
┌─────────────────────────────────┐
│ Loss Limits                     │
│                                 │
│ Daily Loss Limit:   $50         │
│ Weekly Loss Limit:  $200        │
│ Monthly Loss Limit: $500        │
│                                 │
│ Current losses:                 │
│ Today:    $12/$50               │
│ This week: $67/$200             │
│                                 │
│ [Edit Limits]                   │
└─────────────────────────────────┘
```

**Limit Triggered:**
```
┌─────────────────────────────────┐
│ Daily Loss Limit Reached        │
│                                 │
│ You've lost $50 today, which is │
│ your daily limit. You can:      │
│                                 │
│ • Browse markets (no betting)   │
│ • Review your bets              │
│ • Withdraw winnings             │
│ • Set lower limits              │
│                                 │
│ Betting resumes tomorrow.       │
│                                 │
│ [OK] [Get Help]                 │
└─────────────────────────────────┘
```

### 7.6 Stake Visibility & Risk Awareness

**Before Every Bet:**
```
┌─────────────────────────────────┐
│ Confirm Bet                     │
│                                 │
│ India to win @ 2.15             │
│                                 │
│ Stake:              $50.00      │
│ Potential Profit:   $57.50      │
│                                 │
│ ⚠️ You are risking $50          │ ← Always shown
│ Win probability: 47% (implied)  │
│                                 │
│ [Cancel] [Place Bet]            │
└─────────────────────────────────┘
```

**High-Stake Warning:**

If stake > 5% of balance:
```
┌─────────────────────────────────┐
│ ⚠️ Large Stake Warning           │
│                                 │
│ This bet is $200, which is 25%  │
│ of your balance. Consider        │
│ betting smaller amounts.        │
│                                 │
│ Recommended: $32 (4% of balance)│
│                                 │
│ [Reduce Stake] [Continue]       │
└─────────────────────────────────┘
```

---

## 8. Mobile-Specific Optimizations

### 8.1 Thumb Zone Strategy

**Reachability Map:**
```
┌─────────────┐
│   ⚠️ Hard   │ ← Top = Hard to reach (one-handed)
│             │
│   ✓ OK      │ ← Middle = Neutral
│             │
│   ✓✓ Easy   │ ← Bottom = Thumb zone (optimal)
└─────────────┘
```

**Action Placement:**
- Primary actions (Place Bet, Add to Slip): Bottom 30% of screen
- Navigation: Bottom tab bar
- Secondary actions (Filters, Search): Top right (two-handed OK)
- Destructive actions (Clear Bet Slip): Require confirmation

### 8.2 Gesture Patterns

**Swipe Gestures:**
- Swipe left on bet slip item → Remove
- Swipe down on modal → Dismiss
- Swipe up from bet slip tab → Expand
- Pull to refresh on match list

**Long Press:**
- Long press match card → Add to favorites
- Long press odds → Quick info (implied probability, recent movement)

**Double Tap:**
- Double tap team logo → Team statistics overlay
- Double tap player name → Player stats overlay

### 8.3 Touch Targets

**Minimum Sizes:**
- Primary buttons: 48px height (Apple HIG standard)
- Odds buttons: 44x60px (wider for number visibility)
- List items: 56px height minimum
- Bottom navigation: 56px height

**Spacing:**
- Minimum 8px between tappable elements
- Generous padding on text inputs (16px vertical)

### 8.4 Keyboard Handling

**Stake Input:**
- Numeric keyboard with decimal
- Auto-focus on bet slip expansion
- "Done" button dismisses keyboard and shows full bet slip

**Search:**
- Standard keyboard
- Dismiss on scroll
- Search executes on enter or after 500ms pause

### 8.5 Offline Resilience

**Network Loss Handling:**
```
┌─────────────────────────────────┐
│ ⚠️ Connection Lost              │
│                                 │
│ You're offline. You can browse  │
│ but cannot place bets.          │
│                                 │
│ [Retry Connection]              │
└─────────────────────────────────┘
```

**Offline Capabilities:**
- Browse cached markets (with staleness warning)
- View bet history (cached)
- Access account settings
- Cannot place bets (blocked with clear message)

**Bet Submission Failure:**
```
┌─────────────────────────────────┐
│ ❌ Bet Failed                    │
│                                 │
│ Could not connect to blockchain.│
│ Your funds were not deducted.   │
│                                 │
│ [Retry] [Cancel]                │
└─────────────────────────────────┘
```

---

## 9. Desktop Enhancements

### 9.1 Layout Differences

**Three-Column Layout:**
```
┌────────┬──────────────────┬────────┐
│Markets │  Main Content    │Bet Slip│
│List    │  (Match Details) │        │
│        │                  │        │
│(25%)   │      (50%)       │ (25%)  │
└────────┴──────────────────┴────────┘
```

**Benefits:**
- Persistent bet slip (always visible)
- Faster market browsing (no navigation needed)
- More context visible simultaneously

### 9.2 Hover States

**Odds Buttons:**
- Hover: Light background, cursor pointer
- Hover tooltip: "Click to add to bet slip"

**Match Cards:**
- Hover: Subtle shadow elevation
- Quick preview of top 3 markets

### 9.3 Keyboard Shortcuts

**Power User Features:**
- `Cmd/Ctrl + K`: Open search
- `Cmd/Ctrl + B`: Focus bet slip
- `Escape`: Close modals/overlays
- `Enter`: Confirm bet (when stake entered)
- `Cmd/Ctrl + /`: Keyboard shortcuts help

---

## 10. Performance Budgets

### 10.1 Load Time Targets

**Initial Page Load:**
- First Contentful Paint: <1.5s
- Time to Interactive: <3.5s
- Total blocking time: <300ms

**Route Transitions:**
- Navigation: <200ms
- Market expansion: <100ms

### 10.2 Optimization Strategies

**Code Splitting:**
- Route-based chunks
- Lazy load player stats components
- Defer non-critical analytics

**Image Optimization:**
- Team logos: SVG (scalable, small)
- Player photos: WebP with JPEG fallback
- Lazy loading below fold

**Data Fetching:**
- Prefetch likely next page on hover
- Cache odds data (5-second TTL)
- Optimistic updates for bet placement

---

## 11. Accessibility Standards

### 11.1 WCAG 2.1 AA Compliance

**Color Contrast:**
- Text: Minimum 4.5:1 ratio
- Large text (18pt+): 3:1 ratio
- UI components: 3:1 ratio

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators (2px outline)
- Logical tab order
- Skip links for main content

**Screen Reader Support:**
- Semantic HTML (proper headings hierarchy)
- ARIA labels for icons
- Live regions for odds updates
- Descriptive link text (no "click here")

### 11.2 Inclusive Design

**Dyslexia-Friendly:**
- Option for OpenDyslexic font
- Increased letter spacing setting
- Line height 1.5 minimum

**Low Vision:**
- Text resize up to 200% without horizontal scroll
- High contrast mode
- No information conveyed by color alone

**Motor Impairments:**
- Large touch targets (44px minimum)
- No time-limited interactions (except live betting, with pause option)
- Single-switch navigation support

---

## 12. Visual Design System

### 12.1 Color Palette

**Primary:**
- Brand Blue: #0088FE (TON-inspired)
- Success Green: #00D665
- Warning Amber: #FFB020
- Error Red: #FF4D4D

**Neutrals:**
- Background: #FFFFFF (light mode), #121212 (dark mode)
- Surface: #F5F5F5 (light), #1E1E1E (dark)
- Text Primary: #1A1A1A (light), #FFFFFF (dark)
- Text Secondary: #666666 (light), #A0A0A0 (dark)

**Semantic:**
- Odds Increase: #00D665 (green)
- Odds Decrease: #FF4D4D (red)
- Live Indicator: #FF4D4D (pulsing)
- Suspended: #FFB020 (amber)

### 12.2 Typography

**Font Family:**
- Primary: Inter (web-optimized, excellent numerals)
- Monospace (for odds): SF Mono / Roboto Mono

**Type Scale:**
- Heading 1: 32px / 600 weight
- Heading 2: 24px / 600
- Heading 3: 20px / 600
- Body: 16px / 400
- Small: 14px / 400
- Caption: 12px / 400

**Odds Display:**
- Size: 20px (mobile), 24px (desktop)
- Weight: 700 (bold)
- Tabular figures enabled (aligned columns)

### 12.3 Spacing System

**8px Base Unit:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Component Padding:**
- Buttons: 12px vertical, 24px horizontal
- Cards: 16px all sides
- Modals: 24px all sides

### 12.4 Elevation (Shadows)

**Levels:**
- Level 1: `0 1px 3px rgba(0,0,0,0.12)`
- Level 2: `0 4px 6px rgba(0,0,0,0.1)`
- Level 3: `0 10px 20px rgba(0,0,0,0.15)`

**Usage:**
- Cards: Level 1
- Bet slip (floating): Level 2
- Modals: Level 3

---

## 13. Animation Principles

### 13.1 Motion Philosophy

**Purpose-Driven:**
- Provide feedback for user actions
- Direct attention to important changes
- Maintain spatial consistency

**Performance:**
- Use transform and opacity only (GPU-accelerated)
- Avoid animating layout properties (width, height, top, left)
- 60fps minimum

### 13.2 Timing Functions

**Easing:**
- Ease-out: User-triggered actions (feels responsive)
- Ease-in-out: System-triggered updates (feels smooth)
- Spring: Playful interactions (bet success celebration)

**Durations:**
- Micro: 100ms (button press feedback)
- Short: 200ms (navigation transitions)
- Medium: 300ms (modal open/close)
- Long: 500ms (success celebrations)

### 13.3 Key Animations

**Bet Placement Success:**
1. Confetti burst (200ms)
2. Checkmark scale-in (150ms)
3. Transaction hash fade-in (200ms)

**Odds Update:**
1. Highlight flash (200ms)
2. Number count-up/down (300ms)
3. Arrow fade-in then fade-out (2s total)

**Live Score Update:**
1. Run count increment (100ms per run)
2. Scoreboard shake on wicket (300ms)
3. Boundary celebration (500ms)

---

## 14. Error Prevention & Handling

### 14.1 Validation Strategy

**Progressive Validation:**
- No validation on first keystroke (wait for blur)
- Inline error messages below input
- Success indicators (green checkmark)

**Common Errors:**

**Insufficient Balance:**
```
┌─────────────────────────────────┐
│ ⚠️ Insufficient Balance          │
│                                 │
│ Bet: $50.00                     │
│ Balance: $32.00                 │
│ Short by: $18.00                │
│                                 │
│ [Reduce Stake] [Deposit]        │
└─────────────────────────────────┘
```

**Odds Changed:**
```
┌─────────────────────────────────┐
│ ⚠️ Odds Changed                  │
│                                 │
│ Your odds: 2.15                 │
│ New odds:  2.05 ↓               │
│                                 │
│ New return: $102.50 (was $107.50)│
│                                 │
│ [Cancel] [Accept New Odds]      │
└─────────────────────────────────┘
```

**Market Suspended:**
```
┌─────────────────────────────────┐
│ ⚠️ Market Suspended              │
│                                 │
│ This market is temporarily      │
│ unavailable (wicket just fell). │
│                                 │
│ Your bet was not placed.        │
│                                 │
│ [Remove from Slip] [Wait]       │
└─────────────────────────────────┘
```

### 14.2 Destructive Action Confirmation

**Clear Bet Slip:**
```
┌─────────────────────────────────┐
│ Clear All Bets?                 │
│                                 │
│ This will remove 3 selections   │
│ from your bet slip.             │
│                                 │
│ [Cancel] [Clear All]            │
└─────────────────────────────────┘
```

**Permanent Self-Exclusion:**
```
┌─────────────────────────────────┐
│ ⚠️ Permanent Exclusion           │
│                                 │
│ This action CANNOT be undone.   │
│ You will be excluded forever.   │
│                                 │
│ Are you absolutely sure?        │
│                                 │
│ Type "PERMANENT" to confirm:    │
│ [________________]              │
│                                 │
│ [Cancel] [Exclude Permanently]  │
└─────────────────────────────────┘
```

---

## 15. Conversion Optimization Techniques

### 15.1 Social Proof

**Popular Bets Widget:**
```
┌─────────────────────────────────┐
│ 🔥 Trending Bets                │
│                                 │
│ 1. India to win - 2,341 bets   │
│ 2. Kohli 30+ runs - 1,876 bets │
│ 3. Total over 340.5 - 1,523 bets│
│                                 │
│ [View All Trends]               │
└─────────────────────────────────┘
```

**Live Bet Feed (Optional):**
```
┌─────────────────────────────────┐
│ Recent Bets                     │
│                                 │
│ User_xyz bet $25 on India       │
│ User_abc bet $100 on Kohli 50+ │
│ User_def bet $50 on Pakistan    │
│                                 │
└─────────────────────────────────┘
```

### 15.2 Urgency Triggers

**Odds Movement Alert:**
```
┌─────────────────────────────────┐
│ ⚡ Odds Moving Fast!             │
│                                 │
│ India's odds have shortened     │
│ from 2.15 to 1.95 in 5 minutes. │
│                                 │
│ [Bet Now]                       │
└─────────────────────────────────┘
```

**Limited Time Promotions:**
```
┌─────────────────────────────────┐
│ ⏰ Ends in 2h 34m                │
│                                 │
│ BOOSTED ODDS: India to win      │
│ Was: 2.15 → Now: 2.50 🚀        │
│                                 │
│ [Claim Boost]                   │
└─────────────────────────────────┘
```

### 15.3 Personalization

**Recommended Bets:**
```
┌─────────────────────────────────┐
│ For You                         │
│                                 │
│ Based on your history, you might│
│ like:                           │
│                                 │
│ • Kohli to score 30+ @ 2.00    │
│   (You've bet on Kohli 8 times)│
│                                 │
│ [Add to Slip]                   │
└─────────────────────────────────┘
```

**Favorite Teams:**
- Quick filter: "Show only India matches"
- Push notifications for favorites
- Personalized tournament bracket

---

## 16. Testing Strategy

### 16.1 User Testing Phases

**Phase 1: Prototype Testing (10 users)**
- Task: Find and place bet on India to win
- Measure: Time to completion, error rate
- Goal: <60 seconds, <10% error rate

**Phase 2: Beta Testing (100 users)**
- Full feature set
- Real money (small stakes)
- Measure: Conversion funnel, NPS score
- Goal: >70 NPS, >80% bet slip completion

**Phase 3: A/B Testing (Launch)**
- Test variations:
  - Bet slip position (bottom vs. side)
  - Odds format default (decimal vs. American)
  - Stake button layout (grid vs. list)

### 16.2 Metrics Dashboard

**Key Metrics:**
- Bet slip abandonment rate (target: <20%)
- Average time to place bet (target: <45s)
- Responsible gambling tool usage (target: >40% set limits)
- Cash-out usage (target: >15% of eligible bets)
- Mobile vs. desktop split (expected: 75/25)

---

## 17. Implementation Priorities

### 17.1 MVP (Launch by January 2026)

**Must-Have:**
1. TON wallet connection
2. Match winner betting
3. Basic bet slip (single bets only)
4. Deposit/withdraw
5. Transaction history
6. Mobile-responsive layout
7. Deposit limits
8. Session time tracking

**Nice-to-Have (can defer):**
- Parlay builder
- Cash-out
- Live betting
- Advanced filters
- Social features

### 17.2 Post-Launch Enhancements

**Week 1-2 (Tournament Start):**
- Monitor performance
- Fix critical bugs
- Add most-requested markets

**Week 3-4 (Mid-Tournament):**
- Launch parlay builder
- Add live betting for select matches
- Introduce cash-out

**Post-Tournament:**
- Retention features (loyalty program)
- Social betting features
- Expand to other cricket tournaments

---

## 18. Competitive Differentiation

### 18.1 How We Win

**vs. Traditional Sportsbooks:**
- Blockchain transparency (provably fair)
- Instant settlements (no withdrawal delays)
- Lower fees (no credit card processing)
- Pseudonymous (privacy-focused)

**vs. Other Crypto Betting:**
- Superior UX (hides blockchain complexity)
- Cricket-specific optimizations
- Best odds (lower margins)
- Responsible gambling focus (rare in crypto)

### 18.2 Unique Value Propositions

1. **Smart Contract Escrow:** "Your funds locked on-chain, not in our bank account"
2. **Instant Payouts:** "Wins paid in seconds, not days"
3. **Transparent Odds:** "See our margin, our model, our fairness"
4. **Cricket Obsessed:** "Built by cricket fans, for cricket fans"

---

## 19. Regulatory Compliance UX

### 19.1 Age Verification

**On First Deposit:**
```
┌─────────────────────────────────┐
│ Age Verification Required       │
│                                 │
│ Upload government-issued ID:    │
│ • Passport                      │
│ • Driver's License              │
│ • National ID Card              │
│                                 │
│ Your photo will be securely     │
│ encrypted and deleted after     │
│ verification (usually 5 minutes)│
│                                 │
│ [Upload ID]                     │
└─────────────────────────────────┘
```

### 19.2 Geo-Blocking

**Restricted Location:**
```
┌─────────────────────────────────┐
│ ⛔ Service Unavailable           │
│                                 │
│ We're unable to offer betting   │
│ services in your location due   │
│ to local regulations.           │
│                                 │
│ Detected location: [Country]    │
│                                 │
│ If this is incorrect, contact   │
│ support.                        │
│                                 │
│ [Contact Support]               │
└─────────────────────────────────┘
```

### 19.3 Terms & Conditions

**First Bet Acknowledgment:**
```
┌─────────────────────────────────┐
│ Before Your First Bet           │
│                                 │
│ ☐ I am 18 years or older        │
│ ☐ I have read the Terms         │
│ ☐ I understand betting involves │
│   risk of loss                  │
│                                 │
│ [Terms & Conditions] [Privacy]  │
│                                 │
│          [Continue]             │
└─────────────────────────────────┘
```

---

## 20. Success Metrics & KPIs

### 20.1 Business Metrics

**Acquisition:**
- Users registered: Target 50,000 by tournament start
- Deposit rate: >60% of registered users
- Average first deposit: $75-100

**Engagement:**
- Bets per user: 15-25 during tournament
- Session duration: 12-18 minutes average
- Return user rate: >65%

**Revenue:**
- Hold percentage: 6-8% (pre-match), 4-6% (live)
- Total handle: $5-10M (realistic for new platform)
- Customer acquisition cost: <$40

### 20.2 UX Metrics

**Conversion:**
- Bet slip completion: >80%
- Average time to first bet: <2 minutes from signup
- Odds click → bet placed: >70%

**Satisfaction:**
- NPS score: >60
- App store rating: >4.3/5
- Support ticket rate: <5% of users

**Responsible Gambling:**
- Users setting limits: >40%
- Self-exclusion rate: <2% (healthy range)
- Problem gambling flags: <1%

---

## Conclusion

This UX design framework prioritizes three pillars:

1. **Conversion**: Every design decision optimized to reduce friction from discovery to bet placement
2. **Trust**: Blockchain transparency and responsible gambling as competitive advantages
3. **Cricket Obsession**: Deep understanding of T20 betting behavior drives interface decisions

The mobile-first approach, combined with TON blockchain's speed, positions this platform to capture market share from traditional sportsbooks while setting new standards for responsible crypto gambling.

**Next Steps:**
1. Component library development (React + Tailwind)
2. Prototype testing with cricket betting enthusiasts
3. Integration testing with TON testnet
4. Phased rollout with limited beta

---

*Last Updated: December 17, 2025*
*Version: 1.0*
