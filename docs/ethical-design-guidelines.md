# Ethical Design Guidelines: 2026 ICC T20 World Cup Prediction Market Platform

**Document Version:** 1.0
**Last Updated:** December 17, 2025
**Platform:** TON Blockchain
**Audience:** Product Managers, UX Designers, Developers, Compliance Teams

---

## Executive Summary

This document establishes **mandatory ethical design principles** for the 2026 ICC T20 World Cup prediction market platform. These guidelines prioritize user wellbeing and informed decision-making alongside business objectives. All features must pass through the ethical design review checklist before implementation.

**Core Principle:** We build platforms for entertainment and informed prediction, not for exploitation. Every design decision must answer: "Does this respect the user's autonomy and long-term wellbeing?"

---

## Table of Contents

1. [Foundational Ethical Principles](#1-foundational-ethical-principles)
2. [Dark Patterns Identification & Prohibition](#2-dark-patterns-identification--prohibition)
3. [Responsible Gambling: Core Design Requirements](#3-responsible-gambling-core-design-requirements)
4. [Crypto-Specific Ethical Requirements (TON Blockchain)](#4-crypto-specific-ethical-requirements-ton-blockchain)
5. [UI/UX Ethical Standards](#5-uiux-ethical-standards)
6. [Prohibited Practices](#6-prohibited-practices)
7. [Ethical Design Review Checklist](#7-ethical-design-review-checklist)
8. [Code Examples: Ethical vs Dark Patterns](#8-code-examples-ethical-vs-dark-patterns)
9. [Regulatory Compliance Framework](#9-regulatory-compliance-framework)
10. [Monitoring and Continuous Improvement](#10-monitoring-and-continuous-improvement)

---

## 1. Foundational Ethical Principles

### 1.1 User Autonomy First

**Principle:** Users must have complete control over their participation. The platform facilitates informed decisions rather than manipulating behavior.

**Implementation Requirements:**
- All betting features are opt-in, never opt-out
- Users can set limits BEFORE making first deposit
- Self-exclusion is always one click away, clearly visible
- No psychological pressure to continue playing
- Clear communication of odds, risks, and house edge

### 1.2 Transparency by Default

**Principle:** All costs, risks, mechanics, and odds must be clearly disclosed upfront.

**Implementation Requirements:**
- House edge/margin displayed on every market (e.g., "Platform margin: 5.2%")
- True probability alongside odds (e.g., "3.00 odds = 33.3% probability")
- Transaction costs shown BEFORE confirmation (TON gas fees, withdrawal fees)
- Smart contract addresses visible and verifiable
- No hidden fees or surprise charges

### 1.3 Harm Minimization Architecture

**Principle:** Platform design actively reduces potential for gambling harm rather than maximizing engagement at all costs.

**Implementation Requirements:**
- Session time limits with mandatory breaks
- Loss visibility (running total always visible)
- Reality checks every 30 minutes of active use
- Cooling-off periods after setting higher limits
- Proactive intervention for high-risk behaviors

### 1.4 Evidence-Based Design

**Principle:** All user protection measures must be based on gambling research, not minimum compliance.

**Implementation Requirements:**
- Regular consultation with gambling harm experts
- User testing with vulnerable populations (in ethical research settings)
- A/B testing prohibited for responsible gambling features (always use most protective version)
- Continuous monitoring of harm indicators

---

## 2. Dark Patterns Identification & Prohibition

### 2.1 Urgency & Scarcity Manipulation

#### PROHIBITED: Fake Urgency

**Pattern Identification:**
- Countdown timers suggesting artificial deadlines
- "Only X spots left!" when inventory is unlimited
- "Odds expiring in 5 minutes!" for pre-match markets
- Flashing "LAST CHANCE" messaging
- Fake popularity indicators ("1,847 people betting on this now!")

**Severity:** HARMFUL

**Why It's Harmful:**
These tactics exploit loss aversion and FOMO (fear of missing out), triggering impulsive decisions without analysis. They're particularly harmful in betting contexts where rushed decisions lead to poor risk assessment.

**ETHICAL ALTERNATIVE:**
```
Legitimate Urgency (PERMITTED):
- "Match starts in 2 hours" (factual information)
- "In-play odds update every ball" (educational)
- "Pre-match markets close at kickoff" (standard practice)

Display Format:
[i] Match starts: 2:30 PM local time
[i] Current odds will be available until match start
```

#### PROHIBITED: Manufactured Scarcity

**Pattern Identification:**
- "Limited time bonus!" that reappears daily
- "Exclusive offer" that's available to all users
- "Last chance to bet at these odds" (when odds are dynamic anyway)
- Countdown timers that reset

**Severity:** HARMFUL

**ETHICAL ALTERNATIVE:**
- Honest communication: "Odds change based on betting volume and events"
- Transparent bonus schedules: "Daily bonus offers available"
- No artificial pressure to act immediately

### 2.2 Interface Interference

#### PROHIBITED: Confirmshaming

**Pattern Identification:**
- "No thanks, I don't want free money" (deposit limit setting)
- "Skip protection" (declining responsible gambling tools)
- "I want to play dangerously" (opting out of warnings)
- Guilt-inducing language for self-exclusion

**Severity:** HARMFUL

**Examples Found in Betting Contexts:**
```
DARK PATTERN:
[Set Deposit Limit]
[No thanks, I like taking risks →]

DARK PATTERN:
"Are you sure you want to exclude yourself?
You'll miss out on exclusive offers!"
```

**ETHICAL ALTERNATIVE:**
```
[Set Deposit Limit]
[Not Right Now] (neutral language)

OR even better:

[Set Your Limits] (Required before first deposit)
Daily Limit: ____
Weekly Limit: ____
Monthly Limit: ____

[Continue]
```

#### PROHIBITED: Hidden/Obscured Controls

**Pattern Identification:**
- Self-exclusion buried 5+ clicks deep
- Deposit limits in obscure settings menu
- Reality check opt-out easy, opt-in difficult
- Withdrawal process deliberately complex (Roach Motel)
- Unsubscribe from marketing hidden

**Severity:** HARMFUL to ILLEGAL (depending on jurisdiction)

**ETHICAL ALTERNATIVE:**
- Responsible gambling tools in main navigation
- Self-exclusion maximum 2 clicks from any page
- "Take a Break" button visible on all betting interfaces
- Withdrawal as easy as deposit (same number of steps)
- One-click marketing opt-out

#### PROHIBITED: Misdirection

**Pattern Identification:**
- Highlighting "potential winnings" while minimizing stake amount
- Showing only gross winnings, not net profit
- Emphasizing wins in notifications, suppressing loss visibility
- Default bet slip shows maximum potential return, not risk

**Severity:** PROBLEMATIC to HARMFUL

**Example:**
```
DARK PATTERN:
Win up to $5,000!
(small text: stake $100)

Bet slip shows:
Potential Return: $5,000 ✓
(Stake buried below fold)
```

**ETHICAL ALTERNATIVE:**
```
ETHICAL DESIGN:
Bet Slip:
Your Stake: $100 (bold, prominent)
Potential Profit: $4,900
Total Return: $5,000
Win Probability: ~2% (based on odds)
```

### 2.3 Sneaking & Hidden Costs

#### PROHIBITED: Hidden Fees

**Pattern Identification:**
- Gas fees revealed only at final transaction step
- Withdrawal fees not disclosed until processing
- Currency conversion fees hidden
- "Free bonus" with 50x rollover requirement buried in T&Cs

**Severity:** HARMFUL to ILLEGAL

**Regulatory Context:** GDPR Article 7(2) requires consent to be "as easy to withdraw as to give." FTC guidelines prohibit hidden fees.

**ETHICAL ALTERNATIVE:**
```
DEPOSIT SCREEN (Transparent):
Deposit Amount: $100
Platform Fee: $0
TON Network Gas Fee: ~$0.15 (estimate)
You Will Receive: ~$99.85

[Confirm Deposit]

Note: Gas fees vary with network congestion.
See current rates: [Link]
```

#### PROHIBITED: Forced Continuity

**Pattern Identification:**
- Automatic bonus enrollment that locks funds
- Rollover requirements not clear until after acceptance
- "Bonus balance" that can't be withdrawn
- Requiring additional bets to unlock winnings

**Severity:** HARMFUL

**ETHICAL ALTERNATIVE:**
```
BONUS OFFER (Clear):
Deposit Bonus: Match 100% up to $50

Requirements:
- Must wager $150 total before withdrawal
- Expires in 30 days
- Available on sports bets only

[ Accept Bonus ]  [ Decline Bonus ]
(Both options equally prominent)

Already deposited without bonus?
You can still activate this offer within 24 hours.
```

### 2.4 Obstruction (Roach Motel)

#### PROHIBITED: Difficult Withdrawal Process

**Pattern Identification:**
- Deposit: 2 clicks, Withdrawal: 8 clicks + verification + waiting period
- Withdrawal requires uploading documents, deposit doesn't
- Withdrawal limits lower than deposit limits
- "Pending review" periods for withdrawals, instant deposits
- Chat support for deposits, email-only for withdrawals

**Severity:** ILLEGAL in most jurisdictions

**Regulatory Context:** UKGC requires withdrawals to be "as easy as deposits." Malta Gaming Authority has similar requirements.

**ETHICAL ALTERNATIVE:**
- Withdrawal process mirrors deposit process exactly
- Same verification requirements for both directions
- Clear processing timeline (e.g., "Withdrawals process in 24-48 hours")
- Support available equally for all account functions

### 2.5 Nagging

#### PROHIBITED: Persistent Interruptions

**Pattern Identification:**
- Push notifications for every odds change
- Daily reminder to bet
- "We miss you!" emails 2 hours after last session
- Pop-ups to place bet during browsing
- Return emails after self-exclusion

**Severity:** HARMFUL (especially post-exclusion contact)

**ETHICAL ALTERNATIVE:**
```
NOTIFICATION PREFERENCES (Granular Control):
Match Reminders: [ON] OFF
Odds Changes: ON [OFF] (default OFF)
Promotional Offers: ON [OFF] (default OFF)
Account Security: [ALWAYS ON] (cannot disable)

Frequency Cap: Maximum 1 marketing message per week
Quiet Hours: [10 PM - 8 AM] (user configurable)

[Save Preferences]

Note: If you self-exclude, ALL marketing stops immediately.
```

### 2.6 Social Engineering

#### PROHIBITED: Fake Social Proof

**Pattern Identification:**
- "1,429 people just bet on India!" (fabricated numbers)
- "Top bettors choose this option" (without evidence)
- Fake testimonials or user quotes
- Bot-generated betting activity to create illusion of popularity
- "90% of users choose this option" (manipulative even if true)

**Severity:** HARMFUL to ILLEGAL (fraud)

**ETHICAL ALTERNATIVE:**
- Show actual market percentages if transparent (e.g., "45% of bets on Team A, 55% on Team B")
- Aggregate statistics only, never fake numbers
- Clear label: "Market Distribution" not "What Others Are Betting"
- No personalized social proof (exploits conformity bias)

#### PROHIBITED: Manufactured Peer Pressure

**Pattern Identification:**
- Leaderboards that shame low activity
- "Your friends are betting more than you"
- Status levels requiring wagering thresholds
- VIP programs that create FOMO

**Severity:** PROBLEMATIC to HARMFUL

**ETHICAL ALTERNATIVE:**
```
GAMIFICATION (If implemented):
✓ Performance-based (win rate, profit)
✗ Volume-based (total wagered)

✓ Optional participation in leaderboards
✗ Default enrollment

✓ Responsible gambling badges ("Set limits for 30 days")
✗ High-volume badges ("Bet $10,000 this month!")
```

### 2.7 Deceptive Patterns in Odds Display

#### PROHIBITED: Margin Obfuscation

**Pattern Identification:**
- Displaying odds without showing house edge
- Showing "Fair Odds" that aren't actually fair
- Decimal odds, fractional odds, American odds switching to confuse
- "Enhanced odds" that are still worse than market average

**Severity:** PROBLEMATIC

**ETHICAL ALTERNATIVE:**
```
TRANSPARENT ODDS DISPLAY:
Match Winner: India vs Ireland

India: 1.40 odds
(71.4% implied probability, 5.2% house margin)

Ireland: 3.50 odds
(28.6% implied probability)

[i] Platform Margin: 5.2%
This means for every $100 wagered across this market,
we retain approximately $5.20 as revenue.

Compare odds: [Link to odds comparison sites]
```

#### PROHIBITED: Complexity as Obfuscation

**Pattern Identification:**
- Overly complex parlays/accumulators that hide low probability
- "Bet Builder" features that seem custom but have terrible odds
- Multi-leg bets without showing combined probability
- "Insurance" bets that are -EV

**Severity:** PROBLEMATIC to HARMFUL

**ETHICAL ALTERNATIVE:**
```
PARLAY/ACCUMULATOR BET:
Leg 1: India to win (85% probability)
Leg 2: Kohli 30+ runs (60% probability)
Leg 3: Total runs over 320 (55% probability)

Combined Probability: ~28.0%
Your Odds: 3.20 (31.3% implied probability)
House Edge on This Bet: 3.3%

[i] Note: Parlays are entertaining but statistically
less favorable than individual bets.

[ Proceed ] [ Build Different Bet ]
```

---

## 3. Responsible Gambling: Core Design Requirements

### 3.1 Mandatory Pre-Play Limit Setting

**Requirement:** Users MUST set deposit and loss limits before making first deposit.

**Rationale:** Research shows pre-commitment is far more effective than post-hoc limit setting. Users who set limits before gambling show 40-60% lower problem gambling rates.

**Implementation:**
```
ONBOARDING FLOW (MANDATORY):

Step 1: Account Creation
Step 2: Identity Verification
Step 3: Set Your Limits (CANNOT SKIP)
Step 4: Deposit Funds
Step 5: Start Predicting

LIMIT-SETTING SCREEN:
Set Your Limits (Required)

These limits protect you from betting more than you can afford.
You can lower limits anytime. Increases take 24 hours to activate.

Daily Deposit Limit: $_____
Weekly Deposit Limit: $_____
Monthly Deposit Limit: $_____

Daily Loss Limit: $_____
Weekly Loss Limit: $_____
Monthly Loss Limit: $_____

Session Time Limit: _____ minutes
(We'll remind you when time is up)

[Continue]

Need help deciding? [Calculate Based on Budget]
```

**Technical Implementation:**
- Stored in smart contract (immutable without cooling period)
- Decrease requests: instant
- Increase requests: 24-48 hour cooling-off period
- Users notified when approaching 80% of any limit

### 3.2 Visibility of Losses & Reality Checks

**Requirement:** Users must always see their net position (profit/loss) and receive regular reality checks.

**Rationale:** Problem gamblers often lose track of time and money. Continuous visibility and interruptions reduce dissociation and impulsive behavior.

**Implementation:**

#### Always-Visible Loss Tracker
```
HEADER COMPONENT (visible on all pages):

[Profile Icon]  |  Session Time: 45 min  |  Session P&L: -$23.50  |  [Take a Break]

EXPANDED VIEW (click to expand):
Today: -$23.50
This Week: +$12.30
This Month: -$67.20
All Time: -$142.00

Your Limits:
Daily Loss: $50 (46% used)
Weekly Loss: $200 (0% used, resets in 3 days)

[View Full Statement] [Adjust Limits]
```

#### Mandatory Reality Checks
```
REALITY CHECK MODAL (every 30 minutes):

Time for a Reality Check

You've been playing for 30 minutes.
Here's your session summary:

Bets Placed: 8
Total Wagered: $120
Current Position: -$23.50

Would you like to:
[ Continue Playing ]
[ Take a 10-Minute Break ]
[ View My Betting History ]
[ End Session ]

This reminder appears every 30 minutes.
You can't disable it, but you can adjust frequency (max 60 min).

Next reminder in: 30:00
```

### 3.3 Self-Exclusion & Take a Break

**Requirement:** Self-exclusion must be immediate, prominent, and simple.

**Implementation:**

#### Prominent Placement
- "Take a Break" button in header on all pages
- Self-exclusion link in main navigation
- Maximum 2 clicks to activate

#### Cooling-Off Options
```
TAKE A BREAK SCREEN:

Take a Break from Betting

Sometimes stepping away is the best move.

Choose your break duration:
( ) 24 hours
( ) 72 hours
( ) 1 week
( ) 1 month
( ) Custom: _____ days

During your break:
✓ You cannot deposit or bet
✓ We'll stop all marketing communications
✓ Your account remains secure
✓ You can still withdraw funds
✗ You cannot cancel this break once started

Need more support?
- Call GamCare: 0808 8020 133 (UK)
- BeGambleAware.org
- National Council on Problem Gambling: 1-800-522-4700 (US)

[ Activate Break Now ]

Need permanent exclusion? [Self-Exclude Permanently]
```

#### Self-Exclusion (Permanent)
```
SELF-EXCLUSION SCREEN:

Permanent Self-Exclusion

This is a serious step. You will:
✗ Lose access to your account permanently
✗ Be unable to create new accounts
✓ Be able to withdraw your remaining balance
✓ Be enrolled in GamStop (UK) or equivalent

This decision cannot be reversed for at least 6 months.

I understand and want to self-exclude permanently:
[ ] I confirm I've read the above

[ Complete Self-Exclusion ]

Before you go - would you like to speak with someone?
[Free Counseling Resources]

Or try a temporary break instead? [Take a Break]
```

### 3.4 Deposit Decline & Post-Loss Cool-Down

**Requirement:** After significant losses or multiple deposits, mandatory cooling-off periods.

**Rationale:** Loss-chasing is a primary indicator of problem gambling. Forced pauses interrupt the cycle.

**Implementation:**

#### Post-Loss Cool-Down
```
AUTOMATIC TRIGGER:
If user loses >50% of weekly limit in single session:

Mandatory Cool-Down Required

You've lost $75 in this session, which is 75% of your
weekly loss limit.

For your protection, you must take a 3-hour break
before depositing again.

Current time: 3:45 PM
You can return: 6:45 PM

Your account remains active for withdrawals.

Need support?
[Talk to Someone] [View Your Betting History]

[Acknowledge]
```

#### Deposit Decline Message
```
WHEN USER TRIES TO DEPOSIT AFTER MULTIPLE DEPOSITS:

Third Deposit Attempt Today

You've already deposited twice today ($50 each time).

Are you sure you want to deposit again?

Today's Deposits: $100
Today's Losses: $87
Net Position: -$87

Consider:
- Taking a break and returning tomorrow
- Reviewing your betting strategy
- Speaking with a counselor

[ Yes, Proceed with Deposit ]
[ No, Take a Break ]

If you proceed, you'll need to wait 15 minutes.
(Cool-down period for your protection)
```

### 3.5 Behavioral Analytics & Early Intervention

**Requirement:** Monitor user behavior for problem gambling indicators and intervene proactively.

**Rationale:** Early intervention prevents escalation. Waiting for users to self-report is insufficient.

**Red Flag Indicators:**
- Loss-chasing (rapid deposits after losses)
- Increasing bet sizes after losses
- Betting outside normal hours (late night sessions)
- Maxing out limits repeatedly
- Attempting to circumvent limits
- Aggressive betting patterns (all-in behaviors)
- Time on platform increasing >200% week-over-week
- Exclusive long-shot betting (desperation behavior)

**Intervention Protocol:**
```
TIER 1 - SOFT INTERVENTION (email + in-app):
Subject: We've Noticed Changes in Your Betting Pattern

Hi [Name],

We've noticed some changes in your betting activity that
might indicate you're experiencing difficulties.

Specifically:
- You've maxed out your daily limit 3 times this week
- Your session lengths have increased by 200%
- You've made 5 deposits in 2 days

We're here to help, not judge. Consider:
- Reviewing your limits [Link]
- Taking a short break [Link]
- Speaking with a counselor (free & confidential) [Link]

Your account remains fully active. This is just a
friendly check-in.

- The [Platform Name] Team
```

```
TIER 2 - MANDATORY INTERVENTION (forced break):
If Tier 1 ignored and behavior escalates:

Mandatory Account Review

For your protection, we've temporarily paused your
account for 24 hours.

We've detected high-risk gambling patterns:
- [Specific behaviors listed]

During this 24-hour period:
- You cannot deposit or place bets
- We encourage you to speak with a counselor
- Your account will automatically reopen in 24 hours
  (unless you choose to extend your break)

Free Support Resources:
[List of helplines and services]

[Contact Support] [Extend My Break] [View My Activity]
```

---

## 4. Crypto-Specific Ethical Requirements (TON Blockchain)

### 4.1 Gas Fee Transparency

**Challenge:** Blockchain transactions incur variable gas fees that are unfamiliar to most users.

**Requirement:** All gas fees must be disclosed BEFORE transaction confirmation, with plain-language explanation.

**Implementation:**
```
DEPOSIT TRANSACTION SCREEN:

Deposit $100 via TON Blockchain

Deposit Amount: $100.00
Network Fee (Gas): ~$0.15 - $0.25
Total Cost: ~$100.15 - $100.25

You Will Receive: $100.00 in betting balance

[i] What's a network fee?
TON blockchain charges a small fee to process your
transaction. This fee goes to network validators,
not to us. The exact amount depends on network congestion.

Current network status: [Normal] [Congested] [Fast]
Estimated processing time: 10-30 seconds

[ Confirm Deposit ] [ Cancel ]
```

**Withdrawal Screen (Similar):**
```
Withdraw $250 to TON Wallet

Withdrawal Amount: $250.00
Platform Fee: $0.00 (free withdrawals)
Network Fee (Gas): ~$0.20 - $0.35
You Will Receive: ~$249.65 - $249.80

Processing time: 24-48 hours (security check)
+ 10-30 seconds (blockchain confirmation)

[ Confirm Withdrawal ] [ Cancel ]
```

### 4.2 Smart Contract Transparency

**Requirement:** All betting smart contracts must be open-source, audited, and clearly explained.

**Implementation:**

#### Contract Verification
- Publish all smart contract code on TON blockchain explorer
- Link to third-party security audit (CertiK, OpenZeppelin, etc.)
- Plain-language explanation of contract logic

```
MARKET SMART CONTRACT DISPLAY:

Match: India vs Ireland - Match Winner

Contract Address: EQD...abc123 [View on TONScan]
Deployed: Dec 1, 2025
Security Audit: CertiK ✓ [View Report]

How This Market Works:
1. Your bet is locked in the smart contract
2. Contract holds all funds until match ends
3. Oracle provides official match result
4. Contract automatically pays winners
5. No human can access funds or change outcomes

Oracle Source: ESPN Cricinfo + ICC Official Feed
(2 sources required for consensus)

Current Pool:
Team A: $12,450 (45%)
Team B: $15,300 (55%)
Total Pool: $27,750

Platform Fee: 5.2% (deducted from pool at settlement)

[View Full Contract Code] [See How Payouts Calculate]
```

### 4.3 Wallet Connection Consent

**Requirement:** Wallet connection must use clear consent flows with explicit permission for each action.

**PROHIBITED:** Auto-signing transactions, broad permission requests, hidden allowances

**Implementation:**
```
WALLET CONNECTION FLOW:

Connect Your TON Wallet

We'll request connection to your TON wallet to enable:
✓ Viewing your TON balance
✓ Depositing TON to your betting account
✓ Withdrawing winnings to your wallet

We will NOT:
✗ Access other wallet assets without permission
✗ Automatically withdraw funds
✗ Make transactions without your explicit approval

Each transaction requires your wallet approval.

Recommended Wallets:
[TonKeeper] [OpenMask] [TonHub]

[Connect Wallet] [Learn About TON]
```

**Transaction Signing (Explicit):**
```
WALLET APPROVAL POPUP:

[Platform Name] is requesting permission to:

Transfer: 10 TON ($100 USD)
From: Your Wallet (EQD...xyz)
To: [Platform] Deposit Contract (EQD...abc)
Network Fee: ~0.015 TON

Receiving: $100 betting balance

[ Approve ] [ Reject ]

[i] This transaction only deposits funds. We cannot
withdraw from your wallet without future approval.
```

### 4.4 Irreversibility Warning

**Requirement:** Users must understand blockchain transactions are irreversible.

**Implementation:**
```
WITHDRAWAL CONFIRMATION:

Withdraw to TON Wallet

Wallet Address: EQD...xyz789
Amount: 50 TON (~$500 USD)

⚠️ Important: Blockchain transactions cannot be reversed.
Please verify:
✓ Wallet address is correct
✓ You control this wallet
✓ This is a TON blockchain address (not ETH, BTC, etc.)

Sending to wrong address = permanent loss of funds.

[ ] I've verified the address is correct
[ ] I understand this transaction is irreversible

[ Confirm Withdrawal ] [ Cancel ]
```

### 4.5 Crypto Risk Disclosure

**Requirement:** Educate users on cryptocurrency volatility risks.

**Implementation:**
```
DEPOSIT SCREEN (first-time crypto deposit):

Depositing with Cryptocurrency

Important considerations:
⚠️ Crypto prices fluctuate. The USD value of your
   deposits and withdrawals may change.

⚠️ We convert crypto to USD betting balance at time
   of deposit. Withdrawals convert back at current rate.

⚠️ Platform betting odds are in USD. Crypto volatility
   is separate from betting outcomes.

Example:
- Deposit: 10 TON = $100 (Dec 1)
- Withdraw: 10 TON = $95 (Dec 5)
- You lose $5 to crypto volatility + any betting losses

Use crypto only if you understand these risks.

[ ] I understand crypto volatility risks

[Continue to Deposit] [Deposit with Card Instead]
```

---

## 5. UI/UX Ethical Standards

### 5.1 Color Psychology & Accessibility

**Requirements:**
- Red/green for losses/wins (accessible to colorblind users)
- Alternative indicators (icons, text) for accessibility
- No psychological manipulation via color (e.g., red "urgency" buttons)

**Implementation:**
```
PROFIT/LOSS DISPLAY (accessible):

Your Bets Today:
✓ Win: India to beat Ireland (+$45.00) [green with checkmark]
✗ Loss: Over 320 runs (-$20.00) [red with X]
⏳ Pending: Kohli 30+ runs ($10.00 at risk) [yellow with clock]

Net: +$25.00 [green if positive, red if negative, bold]
```

### 5.2 Button Hierarchy & Visual Weight

**Requirement:** Responsible gambling actions must be equally prominent as profit-generating actions.

**PROHIBITED Visual Hierarchy:**
```
DARK PATTERN:
[PLACE BET NOW!] ← Big, bright, animated
[Set Limits] ← Small, gray, bottom of page
```

**ETHICAL Visual Hierarchy:**
```
ETHICAL DESIGN:
[Place Bet] ← Standard button, no animation
[Take a Break] ← Same size, same visual weight

OR

[Place Bet] [View Limits] ← Both equally prominent
```

### 5.3 Notification Design

**Requirements:**
- Win notifications: Standard tone
- Loss notifications: Equal prominence (don't hide losses)
- Responsible gambling notifications: Cannot be dismissed permanently

**Implementation:**
```
NOTIFICATION EXAMPLES:

Win Notification:
"Your bet on India won! +$45.00"
[View Details]

Loss Notification:
"Your bet on Over 320 runs lost. -$20.00"
[View Details]

(Both identical formatting, no emotional language)

Reality Check Notification (cannot dismiss):
"You've been playing for 1 hour. Current session: -$23.50"
[Continue] [Take a Break] [Set Limits]

Limit Warning Notification:
"You've reached 80% of your daily loss limit ($40/$50)"
[View Limits] [Take a Break]
```

### 5.4 Copywriting Standards

**Requirements:**
- No emotional language ("Win big!", "Don't miss out!")
- Factual, neutral tone
- Risk acknowledgment in promotional copy

**PROHIBITED Copy Examples:**
```
DARK PATTERN:
"Turn $10 into $1,000! Don't miss out!"
"Everyone's winning - join the action!"
"Last chance to bet! Odds expiring!"
```

**ETHICAL Copy Examples:**
```
ETHICAL:
"Match odds available. 3.00 on underdog."
"Bonus: Deposit $50, get $50. 3x rollover required."
"Reminder: Most bettors lose money long-term. Bet responsibly."
```

### 5.5 Error Messages & User Feedback

**Requirements:**
- Errors explained clearly
- No blaming language
- Helpful next steps

**Examples:**
```
DEPOSIT LIMIT REACHED:

Daily Limit Reached

You've reached your daily deposit limit of $50.

This limit resets in: 14 hours, 23 minutes (at midnight)

Your options:
- Wait until tomorrow
- Lower your limit (effective immediately)
- Increase your limit (24-hour waiting period)

[View My Limits] [Close]
```

```
WITHDRAWAL BLOCKED (cooling-off period):

Withdrawal Available in 18 Hours

You increased your deposit limit 6 hours ago.
For your protection, withdrawals are paused for 24 hours
after limit increases.

You can withdraw starting: Tomorrow, 10:00 AM

[View Limit History] [Close]
```

---

## 6. Prohibited Practices

### 6.1 Absolutely Forbidden Features

The following features are **NEVER PERMITTED** on this platform:

#### 6.1.1 Betting on Credit / Debt Accumulation
- No "Bet Now, Pay Later"
- No negative balance betting
- No credit line extensions
- No "advance" on future deposits

**Rationale:** Debt-fueled gambling is primary predictor of severe harm and financial ruin.

#### 6.1.2 Auto-Play / Repeat Betting Without Confirmation
- No "auto-bet" features
- No "repeat last bet" without explicit confirmation
- No keyboard shortcuts that place bets without confirmation modal

**Rationale:** Reduces intentionality and increases dissociative gambling behavior.

#### 6.1.3 Promotional Marketing During Cool-Down or Exclusion
- No emails, SMS, push notifications during breaks
- No "we miss you" messaging post-exclusion
- No promotional offers to return early

**Rationale:** Undermines self-exclusion effectiveness. May be illegal (UKGC prohibits this).

#### 6.1.4 Loss-Back or Cashback Based on Losses
- No "10% cashback on losses this month"
- No bonuses proportional to losing

**Rationale:** Incentivizes losing, creates perverse incentive structure.

**ALTERNATIVE:** Bonuses for responsible behavior
- "Set limits for 30 days? Get $5 bonus"
- "Take a break when suggested? Earn reward"

#### 6.1.5 VIP Programs Based on Wagering Volume
- No tiers unlocked by total amount wagered
- No "benefits" for high-volume betting

**Rationale:** Incentivizes gambling disorder. High-volume ≠ valuable customer if they're harmed.

**ALTERNATIVE:** VIP based on tenure, engagement, responsible behavior
- "Account active for 1 year"
- "Perfect record of staying within limits"

#### 6.1.6 Targeting Vulnerable Populations
- No marketing to self-excluded individuals
- No targeting based on financial distress indicators
- No advertising near GA meetings, treatment centers
- No ads targeting recently bankrupt individuals
- No college campus marketing (higher problem gambling rates)

**Rationale:** Ethical baseline. Exploiting vulnerable populations is reprehensible.

#### 6.1.7 Spot-Fix Susceptible Markets
- No "runs in over X" or "wides in over Y" markets
- No "player X to be dismissed in over Y"
- No micro-events easily manipulated by single player

**Rationale:** Minimizes corruption incentives. Protects sport integrity.

### 6.2 High-Risk Features Requiring Extra Safeguards

The following features are **PERMITTED ONLY** with enhanced responsible gambling measures:

#### 6.2.1 In-Play Betting
**Risk:** Rapid-fire betting, reduced deliberation time, emotional decision-making

**Required Safeguards:**
- 5-second delay on bet placement (prevents impulse betting)
- Reality checks every 15 minutes (more frequent than pre-match)
- In-play loss limits separate from overall limits
- "Pause In-Play" button (disables in-play for 24 hours)

**Implementation:**
```
IN-PLAY BET CONFIRMATION:

Match: India vs Ireland (Live)
Over 8.2 - India 67/1

Your Bet:
India to win: 1.65 odds
Stake: $20
Potential profit: $13.00

Confirming in: 5... 4... 3... 2... 1...

[Confirm Bet]

(Countdown prevents impulse bets)

[i] In-play betting moves fast. Set limits to stay in control.
[Pause In-Play for 24h]
```

#### 6.2.2 High-Odds Accumulators / Parlays
**Risk:** Low win probability hidden behind large potential payouts

**Required Safeguards:**
- Show combined probability (not just odds)
- Warning when probability <5%
- Suggest safer alternatives

**Implementation:**
```
ACCUMULATOR WARNING:

Your Parlay (4 legs):
Combined probability: 3.2%
Your odds: 28.00
Stake: $10
Potential profit: $280

⚠️ This bet has a 3.2% chance of winning (roughly 1 in 31).

Consider:
- Betting legs individually (higher win probability)
- Reducing to 2-3 legs (10-15% probability)
- Lowering stake if betting long shots

[Place Bet Anyway] [Modify Bet] [Learn About Parlays]
```

#### 6.2.3 Live Streaming
**Risk:** Extended session times, immersive experience increases dissociation

**Required Safeguards:**
- Picture-in-picture only (not fullscreen)
- Reality checks every 15 minutes during stream
- Betting interface doesn't overlay stream (prevents seamless bet-watch loop)

#### 6.2.4 Social Features (Leaderboards, Bet Sharing)
**Risk:** Social pressure, competition driving excessive betting

**Required Safeguards:**
- Opt-in only (default: private)
- No shaming language for low activity
- Leaderboards based on profit/ROI, NOT volume
- Option to hide leaderboard entirely

---

## 7. Ethical Design Review Checklist

### Pre-Implementation Review

Every feature must pass this checklist before development begins:

#### A. User Autonomy
- [ ] Does this feature respect user choice?
- [ ] Can users easily reverse/undo this action?
- [ ] Is this opt-in or opt-out? (Should be opt-in)
- [ ] Does this feature pressure users toward any action?

#### B. Transparency
- [ ] Are all costs disclosed upfront?
- [ ] Is the house edge / platform margin visible?
- [ ] Are probabilities shown alongside odds?
- [ ] Are terms and conditions concise and clear?
- [ ] Are blockchain/crypto risks explained?

#### C. Harm Minimization
- [ ] Does this feature include safeguards for problem gambling?
- [ ] Could this feature be exploited to circumvent limits?
- [ ] Does this encourage loss-chasing?
- [ ] Does this feature hide loss visibility?
- [ ] Is there a cooling-off period for high-risk actions?

#### D. Accessibility
- [ ] Is this feature accessible to colorblind users?
- [ ] Is this feature navigable by keyboard only?
- [ ] Is this feature understandable at 8th-grade reading level?
- [ ] Does this work on screen readers?

#### E. Regulatory Compliance
- [ ] Does this comply with UKGC guidelines? (if targeting UK)
- [ ] Does this comply with Malta Gaming Authority standards?
- [ ] Does this comply with local Indian state regulations?
- [ ] Are KYC/AML requirements met?
- [ ] Is user data handled per GDPR?

#### F. Ethical Alternatives Assessment
- [ ] If this feature contains dark patterns, have ethical alternatives been considered?
- [ ] Have we consulted gambling harm research?
- [ ] Would we be comfortable explaining this feature to a regulator?
- [ ] Would we be comfortable if this feature was on the front page of a newspaper?

### Post-Implementation Monitoring

#### G. Harm Indicators
- [ ] Are we tracking problem gambling behavioral indicators?
- [ ] Are early intervention systems working?
- [ ] Are self-exclusion rates within expected norms (<2% monthly)?
- [ ] Are limit increases requested reasonably (<10% of users)?

#### H. User Feedback
- [ ] Are users reporting confusion about fees or costs?
- [ ] Are users complaining about withdrawal difficulties?
- [ ] Are users reporting pressure to bet?
- [ ] Are users able to find responsible gambling tools easily?

### Quarterly Ethical Audit

Every quarter, leadership must review:
- [ ] Total self-exclusions (count and reasons)
- [ ] Limit breach attempts
- [ ] Customer support complaints about features
- [ ] Regulatory warnings or fines
- [ ] Comparison to industry harm metrics
- [ ] Review of any new dark pattern techniques emerging in industry

---

## 8. Code Examples: Ethical vs Dark Patterns

### 8.1 Deposit Flow

#### DARK PATTERN (Prohibited):
```typescript
// DO NOT USE
function DepositButton() {
  return (
    <div>
      <button
        className="massive-glowing-animated-button"
        onClick={processDeposit}
      >
        DEPOSIT NOW! WIN BIG! 🔥💰
      </button>
      <a
        href="/limits"
        className="tiny-gray-link"
        style={{fontSize: '8px', color: '#ccc'}}
      >
        set limits
      </a>
    </div>
  );
}

function processDeposit(amount) {
  // No limit checking
  // No confirmation
  // Immediately processes
  depositFunds(amount);
  showSuccessModal("🎉 GET BETTING! 🎉");
}
```

#### ETHICAL ALTERNATIVE (Required):
```typescript
// CORRECT IMPLEMENTATION
function DepositFlow() {
  const [amount, setAmount] = useState(0);
  const [limits, setLimits] = useState(getUserLimits());

  return (
    <div className="deposit-container">
      {/* Limit visibility BEFORE deposit */}
      <LimitStatus
        currentDaily={limits.dailyUsed}
        maxDaily={limits.dailyMax}
      />

      <div className="amount-input">
        <label>Deposit Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          max={limits.remaining}
        />
      </div>

      {/* Gas fee transparency */}
      <TransactionBreakdown amount={amount} />

      {/* Equal visual weight */}
      <div className="button-group">
        <button
          onClick={() => confirmDeposit(amount)}
          className="standard-button"
        >
          Continue to Confirmation
        </button>
        <button
          onClick={() => navigate('/limits')}
          className="standard-button secondary"
        >
          Review Limits
        </button>
      </div>
    </div>
  );
}

function confirmDeposit(amount) {
  const limits = getUserLimits();

  // Check limits before proceeding
  if (amount + limits.dailyUsed > limits.dailyMax) {
    showModal({
      title: "Daily Limit Reached",
      message: `You can deposit ${limits.remaining} more today.`,
      actions: ["OK", "Adjust Limits"]
    });
    return;
  }

  // Multiple-deposit warning
  if (limits.depositsToday >= 2) {
    showCoolingOffModal({
      depositsToday: limits.depositsToday,
      lossesToday: limits.lossesToday,
      requireWait: true,
      waitMinutes: 15
    });
    return;
  }

  // Show confirmation with full breakdown
  showConfirmationModal({
    amount: amount,
    gasFee: estimateGasFee(),
    total: amount + estimateGasFee(),
    willReceive: amount,
    onConfirm: () => processDeposit(amount)
  });
}

function TransactionBreakdown({ amount }) {
  const gasFee = estimateGasFee();

  return (
    <div className="transaction-breakdown">
      <div className="breakdown-row">
        <span>Deposit Amount:</span>
        <span>${amount.toFixed(2)}</span>
      </div>
      <div className="breakdown-row">
        <span>Platform Fee:</span>
        <span>$0.00</span>
      </div>
      <div className="breakdown-row">
        <span>Network Gas Fee:</span>
        <span>~${gasFee.toFixed(2)}</span>
        <InfoTooltip content="TON blockchain fee paid to validators" />
      </div>
      <div className="breakdown-row total">
        <span>You Will Receive:</span>
        <span>${amount.toFixed(2)}</span>
      </div>
    </div>
  );
}
```

### 8.2 Bet Slip Design

#### DARK PATTERN (Prohibited):
```typescript
// DO NOT USE
function BetSlip({ selection, odds }) {
  return (
    <div className="bet-slip">
      {/* Hides stake, emphasizes winnings */}
      <div className="potential-winnings huge-text">
        WIN $5,000! 💰🎉
      </div>
      <div className="stake tiny-text">
        stake: $100
      </div>

      {/* Immediate placement, no confirmation */}
      <button onClick={() => placeBet()} className="huge-button">
        BET NOW!!!
      </button>
    </div>
  );
}
```

#### ETHICAL ALTERNATIVE (Required):
```typescript
// CORRECT IMPLEMENTATION
function BetSlip({ selection, odds }) {
  const [stake, setStake] = useState(0);
  const profit = (stake * odds) - stake;
  const totalReturn = stake * odds;
  const winProbability = (1 / odds) * 100;
  const houseedge = calculateHouseEdge(odds);

  return (
    <div className="bet-slip">
      <div className="selection-summary">
        <h3>{selection.marketName}</h3>
        <p>{selection.outcomeLabel}</p>
      </div>

      {/* Stake most prominent */}
      <div className="stake-input">
        <label>Your Stake</label>
        <input
          type="number"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          className="large-input"
        />
      </div>

      {/* Clear breakdown */}
      <div className="bet-breakdown">
        <div className="breakdown-row">
          <span>Odds:</span>
          <span>{odds.toFixed(2)}</span>
        </div>
        <div className="breakdown-row">
          <span>Win Probability:</span>
          <span>{winProbability.toFixed(1)}%</span>
        </div>
        <div className="breakdown-row">
          <span>Potential Profit:</span>
          <span className="profit">${profit.toFixed(2)}</span>
        </div>
        <div className="breakdown-row total">
          <span>Total Return if Win:</span>
          <span>${totalReturn.toFixed(2)}</span>
        </div>
      </div>

      {/* House edge transparency */}
      <div className="info-box">
        <InfoIcon />
        Platform margin on this market: {houseedge.toFixed(1)}%
      </div>

      {/* Loss visibility */}
      <LossTracker currentSession={getCurrentSessionPL()} />

      {/* Standard button, no urgency */}
      <button
        onClick={() => confirmBet({stake, odds, selection})}
        className="standard-button"
        disabled={stake === 0 || stake > getUserBalance()}
      >
        Place Bet
      </button>

      <button
        onClick={clearBetSlip}
        className="standard-button secondary"
      >
        Clear
      </button>
    </div>
  );
}

function confirmBet({ stake, odds, selection }) {
  // Check session limits
  const sessionStats = getSessionStats();
  if (sessionStats.duration > 120) { // 2 hours
    showRealityCheck(sessionStats);
    return;
  }

  // Check if approaching limits
  const limits = getUserLimits();
  if (limits.dailyUsed + stake > limits.dailyMax * 0.8) {
    showLimitWarning({
      percentUsed: ((limits.dailyUsed + stake) / limits.dailyMax) * 100,
      limit: limits.dailyMax
    });
  }

  // Show final confirmation
  showConfirmationModal({
    selection: selection.outcomeLabel,
    stake: stake,
    odds: odds,
    potentialProfit: (stake * odds) - stake,
    onConfirm: () => placeBet({stake, odds, selection})
  });
}
```

### 8.3 Withdrawal Flow

#### DARK PATTERN (Prohibited):
```typescript
// DO NOT USE
function WithdrawalFlow() {
  return (
    <div>
      {/* Multiple steps, each requiring form fields */}
      <Step1VerifyIdentity /> {/* Requires upload */}
      <Step2ChooseMethod /> {/* Confusing options */}
      <Step3EnterAmount /> {/* Hidden fees */}
      <Step4ConfirmAddress /> {/* No validation help */}
      <Step5VerifyPhone /> {/* SMS code */}
      <Step6SecurityQuestion /> {/* Forgotten answer? */}
      <Step7PendingReview /> {/* 5-7 business days */}

      {/* Buried cancel button */}
      <a href="/cancel" className="tiny-link">nevermind</a>
    </div>
  );
}
```

#### ETHICAL ALTERNATIVE (Required):
```typescript
// CORRECT IMPLEMENTATION
// Withdrawal must mirror deposit simplicity
function WithdrawalFlow() {
  const [amount, setAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState('');
  const balance = getUserBalance();
  const gasFee = estimateWithdrawalGasFee();

  return (
    <div className="withdrawal-container">
      <h2>Withdraw Funds</h2>

      {/* Clear balance display */}
      <div className="balance-display">
        <span>Available Balance:</span>
        <span className="amount">${balance.toFixed(2)}</span>
      </div>

      {/* Single-step form */}
      <div className="withdrawal-form">
        <div className="form-group">
          <label>Withdrawal Amount (USD)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            max={balance}
            placeholder="Enter amount"
          />
          <button
            onClick={() => setAmount(balance)}
            className="text-button"
          >
            Withdraw All
          </button>
        </div>

        <div className="form-group">
          <label>TON Wallet Address</label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="EQD..."
          />
          <AddressValidator address={walletAddress} />
        </div>

        {/* Fee transparency */}
        <div className="fee-breakdown">
          <div className="fee-row">
            <span>Withdrawal Amount:</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          <div className="fee-row">
            <span>Platform Fee:</span>
            <span>$0.00 (free)</span>
          </div>
          <div className="fee-row">
            <span>Network Gas Fee:</span>
            <span>~${gasFee.toFixed(2)}</span>
          </div>
          <div className="fee-row total">
            <span>You Will Receive:</span>
            <span>${(amount - gasFee).toFixed(2)}</span>
          </div>
        </div>

        {/* Clear timeline */}
        <div className="timeline-info">
          <InfoIcon />
          Processing time: 24-48 hours (security review)
          + 30 seconds (blockchain confirmation)
        </div>

        {/* Warning about irreversibility */}
        <div className="warning-box">
          <WarningIcon />
          <strong>Blockchain transactions cannot be reversed.</strong>
          Please verify your wallet address carefully.
        </div>

        {/* Confirmation checkboxes */}
        <label className="checkbox">
          <input type="checkbox" required />
          I've verified the wallet address is correct
        </label>
        <label className="checkbox">
          <input type="checkbox" required />
          I understand this transaction is irreversible
        </label>

        {/* Action buttons */}
        <div className="button-group">
          <button
            onClick={() => confirmWithdrawal(amount, walletAddress)}
            className="standard-button"
            disabled={!isValidWithdrawal(amount, walletAddress)}
          >
            Confirm Withdrawal
          </button>
          <button
            onClick={() => navigate('/account')}
            className="standard-button secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// Withdrawal should be as fast as deposit
function confirmWithdrawal(amount, walletAddress) {
  // No artificial delays
  // No additional verification if already KYC'd
  // Same-day processing initiation

  showConfirmationModal({
    title: "Confirm Withdrawal",
    amount: amount,
    destination: walletAddress,
    estimatedTime: "24-48 hours",
    onConfirm: () => processWithdrawal(amount, walletAddress)
  });
}
```

### 8.4 Reality Check Implementation

```typescript
// CORRECT IMPLEMENTATION (Mandatory)
function RealityCheckSystem() {
  const [sessionStart, setSessionStart] = useState(Date.now());
  const REALITY_CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionStats = calculateSessionStats(sessionStart);
      showRealityCheckModal(sessionStats);
    }, REALITY_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [sessionStart]);

  return null; // Background system
}

function showRealityCheckModal(stats) {
  const modal = {
    title: "Time for a Reality Check",
    cannotDismiss: true, // User must acknowledge
    blocking: true, // Pauses all betting activity
    content: (
      <div className="reality-check">
        <p>You've been playing for {stats.durationMinutes} minutes.</p>
        <p>Here's your session summary:</p>

        <div className="session-stats">
          <div className="stat-row">
            <span>Bets Placed:</span>
            <span>{stats.betsPlaced}</span>
          </div>
          <div className="stat-row">
            <span>Total Wagered:</span>
            <span>${stats.totalWagered.toFixed(2)}</span>
          </div>
          <div className="stat-row">
            <span>Current Position:</span>
            <span className={stats.profitLoss >= 0 ? 'positive' : 'negative'}>
              {stats.profitLoss >= 0 ? '+' : '-'}
              ${Math.abs(stats.profitLoss).toFixed(2)}
            </span>
          </div>
        </div>

        <p>Would you like to:</p>

        <div className="action-buttons">
          <button onClick={continueSession} className="standard-button">
            Continue Playing
          </button>
          <button onClick={takeBreak10min} className="standard-button">
            Take a 10-Minute Break
          </button>
          <button onClick={viewHistory} className="standard-button secondary">
            View My Betting History
          </button>
          <button onClick={endSession} className="standard-button secondary">
            End Session
          </button>
        </div>

        <div className="reminder">
          <InfoIcon />
          Next reminder in: {stats.nextCheckMinutes} minutes
          <a href="/settings/reality-checks">Adjust frequency</a> (max 60 min)
        </div>
      </div>
    )
  };

  showModal(modal);
}
```

### 8.5 Self-Exclusion Implementation

```typescript
// CORRECT IMPLEMENTATION (Mandatory)
function SelfExclusionFlow() {
  const [duration, setDuration] = useState('24h');
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="self-exclusion-page">
      <h1>Take a Break from Betting</h1>

      <p>
        Sometimes stepping away is the best move. Choose how long
        you'd like to take a break.
      </p>

      <div className="duration-options">
        <label className="duration-option">
          <input
            type="radio"
            value="24h"
            checked={duration === '24h'}
            onChange={(e) => setDuration(e.target.value)}
          />
          24 hours
        </label>
        <label className="duration-option">
          <input
            type="radio"
            value="72h"
            checked={duration === '72h'}
            onChange={(e) => setDuration(e.target.value)}
          />
          72 hours
        </label>
        <label className="duration-option">
          <input
            type="radio"
            value="1week"
            checked={duration === '1week'}
            onChange={(e) => setDuration(e.target.value)}
          />
          1 week
        </label>
        <label className="duration-option">
          <input
            type="radio"
            value="1month"
            checked={duration === '1month'}
            onChange={(e) => setDuration(e.target.value)}
          />
          1 month
        </label>
        <label className="duration-option">
          <input
            type="radio"
            value="permanent"
            checked={duration === 'permanent'}
            onChange={(e) => setDuration(e.target.value)}
          />
          Permanent self-exclusion
        </label>
      </div>

      <div className="exclusion-effects">
        <h3>During your break:</h3>
        <ul>
          <li>✓ You cannot deposit or place bets</li>
          <li>✓ We'll stop all marketing communications</li>
          <li>✓ Your account remains secure</li>
          <li>✓ You can still withdraw funds</li>
          <li>✗ You cannot cancel this break once started</li>
        </ul>
      </div>

      {duration === 'permanent' && (
        <div className="permanent-warning">
          <WarningIcon />
          <strong>Permanent self-exclusion is a serious step.</strong>
          <p>You will lose access to your account permanently and
          cannot create new accounts. This decision cannot be reversed
          for at least 6 months.</p>
        </div>
      )}

      <div className="support-resources">
        <h3>Need support?</h3>
        <ul>
          <li>GamCare: 0808 8020 133 (UK, 24/7, free)</li>
          <li>BeGambleAware.org (online chat)</li>
          <li>National Council on Problem Gambling: 1-800-522-4700 (US)</li>
        </ul>
        <a href="/support/counseling" className="standard-button secondary">
          Free Counseling Resources
        </a>
      </div>

      <label className="confirmation-checkbox">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        I understand the effects of this break and want to proceed
      </label>

      <button
        onClick={() => activateBreak(duration)}
        disabled={!confirmed}
        className="standard-button"
      >
        Activate Break Now
      </button>

      <div className="alternative-options">
        <p>Not sure about a full break?</p>
        <a href="/limits">Review and adjust your limits instead</a>
      </div>
    </div>
  );
}

async function activateBreak(duration) {
  // Immediate activation - no delays
  const breakEnd = calculateBreakEnd(duration);

  // Write to smart contract (immutable)
  await smart_contract.setSelfExclusion({
    userId: getCurrentUser().id,
    startTime: Date.now(),
    endTime: breakEnd,
    isPermanent: duration === 'permanent'
  });

  // Stop all marketing immediately
  await unsubscribeAllMarketing(getCurrentUser().id);

  // Log user out
  await logout();

  // Show confirmation
  showConfirmationScreen({
    title: "Break Activated",
    message: `Your account is now locked until ${formatDate(breakEnd)}.`,
    supportResources: getSupportResources()
  });
}
```

---

## 9. Regulatory Compliance Framework

### 9.1 UK Gambling Commission (UKGC) Requirements

If targeting UK users, platform MUST comply with:

#### 9.1.1 Mandatory Requirements
- Age verification (18+) before gambling
- Self-exclusion available and prominent
- Reality checks offered to all customers
- Limits available and easy to set
- Customer interaction for high-risk behaviors
- No advertising to self-excluded individuals
- No reverse withdrawals (once requested, must process)
- Clear terms and conditions
- Segregated customer funds

#### 9.1.2 Social Responsibility Code
- Identify customers showing signs of problem gambling
- Interact with customers to assess risk
- Offer temporary exclusions before permanent
- Signpost to support organizations
- Staff training on gambling harm

#### 9.1.3 Penalties for Non-Compliance
- Fines up to 10% of annual revenue
- License suspension or revocation
- Directors personally liable
- Regulatory settlements (public record)

**Example Recent Enforcement:**
- Company X fined £2.8M for "failing to protect vulnerable customers"
- Company Y fined £17M for "systemic" failures in social responsibility

### 9.2 Malta Gaming Authority (MGA)

#### Key Requirements:
- Player protection framework documented
- Responsible gambling training for staff
- Self-assessment test available to players
- Time and monetary limits offered
- Self-exclusion integrated with national registry
- Marketing must include "Play Responsibly" messaging
- No marketing to minors or self-excluded

### 9.3 Indian State Regulations

**Note:** Gambling laws vary by state in India. Some states (Sikkim, Nagaland, Goa) have regulatory frameworks for online gambling.

#### General Requirements:
- Age verification (varies by state: 18 or 21)
- Payment processing restrictions (varies)
- GST compliance (28% on gross gaming revenue)
- Server location requirements (some states require servers in India)

**Prohibited States:**
- Telangana, Andhra Pradesh, Tamil Nadu (explicitly ban online gambling)
- Platform must geo-block users from prohibited states

### 9.4 Cryptocurrency Regulations

#### Financial Action Task Force (FATF) Guidelines:
- KYC for all users (no anonymous betting)
- AML monitoring for transactions >$1,000
- Suspicious activity reporting
- Travel rule compliance (sender/recipient information)

#### TON Blockchain Specific:
- Smart contract audits by third party
- Transparent contract addresses
- No mixing/tumbling services integration
- Compliance with local crypto regulations

### 9.5 Data Protection (GDPR)

#### Requirements for EU Users:
- Clear consent for data processing
- Right to access data (Subject Access Request within 30 days)
- Right to deletion ("right to be forgotten")
- Data portability (export in machine-readable format)
- Breach notification (72 hours)
- Data minimization (collect only necessary data)

#### Platform Implementation:
```typescript
// Privacy Controls (GDPR Compliant)
function PrivacyControls() {
  return (
    <div className="privacy-controls">
      <h2>Your Privacy Rights</h2>

      <div className="privacy-action">
        <h3>Access Your Data</h3>
        <p>Download all data we have about you</p>
        <button onClick={requestDataExport}>
          Request Data Export
        </button>
        <p className="timeline">Delivered within 30 days</p>
      </div>

      <div className="privacy-action">
        <h3>Delete Your Account</h3>
        <p>Permanently delete your account and data</p>
        <button onClick={requestAccountDeletion}>
          Delete Account
        </button>
        <p className="warning">
          This cannot be undone. Withdraw funds first.
        </p>
      </div>

      <div className="privacy-action">
        <h3>Marketing Preferences</h3>
        <label>
          <input type="checkbox" {...} />
          Email marketing
        </label>
        <label>
          <input type="checkbox" {...} />
          SMS marketing
        </label>
        <label>
          <input type="checkbox" {...} />
          Push notifications
        </label>
      </div>

      <div className="privacy-info">
        <a href="/privacy-policy">Full Privacy Policy</a>
        <a href="/contact-dpo">Contact Data Protection Officer</a>
      </div>
    </div>
  );
}
```

---

## 10. Monitoring and Continuous Improvement

### 10.1 Key Performance Indicators (KPIs)

#### Harm Indicators (Monitor Weekly)
- Self-exclusion rate (target: <2% of active users monthly)
- Limit breach attempts (target: <5% of users)
- Average session duration (target: <45 minutes)
- High-risk behavior flags (target: <1% of sessions)
- Customer complaints related to responsible gambling

#### Engagement Indicators
- Active user retention (balance: retain without encouraging problem gambling)
- Average deposits per user (red flag if increasing rapidly)
- Withdrawal completion rate (target: >95%)
- Customer satisfaction (NPS score)

### 10.2 Ethical Review Board

**Requirement:** Establish quarterly ethical review board including:
- Independent gambling harm expert (external consultant)
- Legal/compliance officer
- Product manager
- UX designer
- Customer support representative
- Recovering problem gambler advocate (optional but recommended)

**Agenda:**
- Review harm indicators
- Assess new features for ethical concerns
- Regulatory update briefing
- User feedback on responsible gambling tools
- Industry best practice review

### 10.3 User Research & Testing

#### Responsible Gambling Feature Testing
- Test with diverse user groups (age, experience level, income)
- Include users with history of problem gambling (in ethical research setting)
- Focus on clarity, accessibility, effectiveness
- A/B test only to compare protective measures (never test removing safeguards)

#### Feedback Mechanisms
```typescript
// Feedback Collection
function ResponsibleGamblingFeedback() {
  return (
    <div className="feedback-form">
      <h2>Help Us Improve Responsible Gambling Tools</h2>

      <p>Your feedback helps us build better protections.</p>

      <div className="question">
        <label>
          How easy was it to find self-exclusion options?
        </label>
        <select>
          <option>Very easy</option>
          <option>Easy</option>
          <option>Difficult</option>
          <option>Very difficult</option>
        </select>
      </div>

      <div className="question">
        <label>
          Are reality checks helpful?
        </label>
        <textarea placeholder="Tell us your experience..."></textarea>
      </div>

      <div className="question">
        <label>
          What responsible gambling feature would you like to see?
        </label>
        <textarea placeholder="Your suggestions..."></textarea>
      </div>

      <button className="standard-button">Submit Feedback</button>

      <p className="privacy-note">
        Feedback is anonymous and used only to improve our platform.
      </p>
    </div>
  );
}
```

### 10.4 Industry Benchmarking

**Quarterly Review:**
- Compare self-exclusion rates to industry average
- Review competitors' responsible gambling features
- Assess new dark pattern techniques emerging in industry
- Update guidelines based on latest research

**Resources:**
- GambleAware annual statistics
- UKGC industry reports
- Academic research (Journal of Gambling Studies, etc.)
- Responsible Gambling Council publications

### 10.5 Incident Response Protocol

**When Problem Gambling Incident Occurs:**

1. **Immediate:** Pause user account, offer support resources
2. **24 hours:** Internal review of how user reached this state
3. **48 hours:** Identify systemic issues or feature gaps
4. **1 week:** Implement corrective measures
5. **1 month:** Follow-up with user (if they consent)

**Documentation Required:**
- Timeline of user behavior leading to incident
- Which safeguards failed or were bypassed
- Feature changes or policy updates needed
- Regulatory reporting (if required)

---

## Appendix A: Quick Reference - Permitted vs Prohibited

### ALWAYS PROHIBITED
- Fake urgency/scarcity (countdown timers to manufactured deadlines)
- Confirmshaming (guilt-inducing opt-out language)
- Hidden fees (costs revealed only at final step)
- Roach motel withdrawals (harder to withdraw than deposit)
- Betting on credit (debt accumulation)
- Marketing to self-excluded users
- Volume-based VIP programs (rewarding excessive gambling)
- Auto-play / repeat betting without confirmation
- Loss-back bonuses (incentivizing losses)

### REQUIRES EXTRA SAFEGUARDS
- In-play betting (5-sec delay, frequent reality checks)
- High-odds parlays (show combined probability, warning if <5%)
- Live streaming (picture-in-picture only, frequent breaks)
- Social features (opt-in, no shaming, profit-based not volume-based)

### ALWAYS REQUIRED
- Pre-play limit setting (mandatory before first deposit)
- Transparent odds and probability display
- House edge/margin disclosure
- Gas fee transparency (crypto)
- Reality checks every 30 minutes maximum
- Self-exclusion prominently accessible (<2 clicks)
- Loss visibility (always-on tracker)
- Cooling-off periods (limit increases, multiple deposits, post-loss)
- Behavioral monitoring and early intervention
- Equal visual weight for responsible gambling tools

---

## Appendix B: Support Resources

### Problem Gambling Helplines

**United Kingdom:**
- National Gambling Helpline: 0808 8020 133 (24/7, free, confidential)
- GamCare: www.gamcare.org.uk (online chat available)
- BeGambleAware: www.begambleaware.org

**United States:**
- National Council on Problem Gambling: 1-800-522-4700
- Gamblers Anonymous: www.gamblersanonymous.org

**India:**
- Alcoholics Anonymous India (also supports gambling addiction): +91-9871474747
- SHUT Clinic (Mumbai): +91-22-26521296

**International:**
- Gamblers Anonymous International: www.gamblersanonymous.org
- International Centre for Youth Gambling Problems: www.youthgambling.com

**Online Resources:**
- Gambling Therapy: www.gamblingtherapy.org (free online support)
- SMART Recovery: www.smartrecovery.org (online meetings)

### Platform Integration

All support resources must be:
- Linked in main navigation ("Get Help" or "Support")
- Displayed during self-exclusion flow
- Included in reality check modals
- Available 24/7 without login required

---

## Appendix C: Revision History

| Version | Date | Changes | Approver |
|---------|------|---------|----------|
| 1.0 | Dec 17, 2025 | Initial guidelines document | Ethics Board |

---

## Appendix D: Glossary

**Dark Pattern:** A user interface deliberately designed to trick users into doing things they didn't mean to do, or that are against their best interests.

**Confirmshaming:** A dark pattern that guilts or shames users into taking an action by framing the opt-out option negatively (e.g., "No thanks, I hate saving money").

**Roach Motel:** A dark pattern where it's easy to get into a situation but difficult to get out (e.g., easy subscription sign-up, difficult cancellation).

**Loss Aversion:** Psychological principle where losses loom larger than equivalent gains. Exploited via urgency tactics.

**FOMO (Fear of Missing Out):** Anxiety that an exciting opportunity will be missed. Exploited via manufactured scarcity.

**Reality Check:** Mandatory pause during gambling session showing time and money spent.

**Self-Exclusion:** User-initiated ban from gambling platform for defined period.

**Cooling-Off Period:** Mandatory waiting period before high-risk action (e.g., 24 hours before increasing deposit limit).

**House Edge / Margin:** Platform's mathematical advantage, expressed as percentage of total bets.

**KYC (Know Your Customer):** Identity verification process required by regulators.

**AML (Anti-Money Laundering):** Regulations preventing gambling platforms from facilitating money laundering.

**GDPR (General Data Protection Regulation):** EU data privacy law requiring user consent and data protection.

**Gas Fee:** Transaction fee paid to blockchain validators (specific to crypto platforms).

---

**END OF DOCUMENT**

---

**Acknowledgment:**

By implementing these guidelines, we commit to building a prediction market platform that:
- Respects user autonomy and informed decision-making
- Prioritizes harm minimization over profit maximization
- Operates transparently and ethically
- Exceeds minimum regulatory compliance
- Continuously improves based on evidence and user feedback

We recognize that gambling entertainment carries inherent risks. Our responsibility is to mitigate those risks through thoughtful, evidence-based design—never to exploit vulnerabilities for commercial gain.

**Questions or concerns about these guidelines?**
Contact: ethics@[platform-name].com
