# Ethical Design Checklist for Development Team

**Quick Reference for Architects, UX Experts, and Developers**
**Version:** 1.0 | **Date:** December 17, 2025

---

## How to Use This Checklist

Before implementing ANY feature, review this checklist. Every checkbox must be ticked "Yes" or "N/A" with justification. If any item is "No", the feature requires redesign before proceeding.

**Accountability:** Feature owner signs off on completed checklist before code review.

---

## Part 1: Universal Requirements (ALL Features)

### A. User Autonomy
- [ ] Users can easily undo or reverse this action
- [ ] This feature is opt-in by default (not opt-out)
- [ ] No psychological pressure to take immediate action
- [ ] Users receive clear information to make informed decisions
- [ ] Consent is explicit and specific (not bundled)

### B. Transparency
- [ ] All costs disclosed before final confirmation
- [ ] No hidden fees or surprise charges
- [ ] Terms and conditions are concise (<3 pages) and clear (8th-grade reading level)
- [ ] If crypto transaction: gas fees shown in USD + crypto
- [ ] If betting market: house edge/margin displayed prominently
- [ ] If betting market: probability shown alongside odds

### C. Accessibility
- [ ] Keyboard navigable (no mouse required)
- [ ] Screen reader compatible
- [ ] Colorblind-safe design (+ icons, not just color)
- [ ] Mobile responsive (majority of users on mobile)
- [ ] Works on low-bandwidth connections

### D. No Dark Patterns
- [ ] No fake urgency (countdown timers to artificial deadlines)
- [ ] No confirmshaming ("No thanks, I don't want free money")
- [ ] No hidden/obscured controls (self-exclusion easy to find)
- [ ] No misdirection (emphasizing wins, hiding losses)
- [ ] No nagging (excessive notifications or reminders)
- [ ] No fake social proof ("1,847 people betting now!")
- [ ] Visual weight: responsible gambling tools = betting actions

---

## Part 2: Betting-Specific Requirements

### E. Responsible Gambling Integration
- [ ] Loss tracker visible on this page/flow
- [ ] Self-exclusion link accessible (<3 clicks away)
- [ ] Reality check system will interrupt if session >30 min
- [ ] Feature respects user-set limits (doesn't encourage circumvention)
- [ ] If high-risk feature: extra safeguards implemented (see Part 3)

### F. Odds & Risk Communication
- [ ] Odds displayed in user's preferred format (decimal/fractional/American)
- [ ] Implied probability shown (e.g., "3.00 odds = 33.3% probability")
- [ ] House margin disclosed (e.g., "Platform margin: 5.2%")
- [ ] If parlay/accumulator: combined probability shown
- [ ] If low probability (<5%): warning displayed
- [ ] Potential profit vs. total return clearly differentiated
- [ ] Stake amount more prominent than potential winnings

### G. Limit & Control Enforcement
- [ ] Feature checks user limits before allowing action
- [ ] Feature respects self-exclusion (excluded users blocked)
- [ ] Feature respects cooling-off periods (limit increases, post-loss)
- [ ] Feature does NOT encourage raising limits
- [ ] Limit decrease: instant. Limit increase: 24-48 hour wait enforced

---

## Part 3: High-Risk Feature Safeguards

### If Implementing IN-PLAY BETTING:
- [ ] 5-second delay on bet placement (anti-impulse)
- [ ] Reality checks every 15 minutes (not 30)
- [ ] Separate in-play loss limits available
- [ ] "Pause In-Play for 24 Hours" button prominent
- [ ] In-play betting disabled during cooling-off periods

### If Implementing PARLAYS/ACCUMULATORS:
- [ ] Combined probability displayed prominently
- [ ] Warning when probability <5% ("This has a 1 in 31 chance")
- [ ] Suggest safer alternatives (individual bets)
- [ ] Show house edge on parlays (typically higher)
- [ ] Each-way options explained clearly

### If Implementing LIVE STREAMING:
- [ ] Picture-in-picture only (no fullscreen)
- [ ] Betting interface does NOT overlay stream
- [ ] Reality checks every 15 minutes during stream
- [ ] Session time tracking includes streaming time
- [ ] Stream auto-pauses during reality checks

### If Implementing SOCIAL FEATURES:
- [ ] Opt-in only (default: private profile)
- [ ] Leaderboards based on profit/ROI, NOT volume
- [ ] No shaming language for low activity
- [ ] Option to hide leaderboard entirely
- [ ] Cannot see others' loss amounts (privacy)
- [ ] Bet sharing: no pressure, clear opt-out

### If Implementing BONUSES/PROMOTIONS:
- [ ] Rollover requirements displayed BEFORE acceptance
- [ ] "Accept Bonus" and "Decline Bonus" equally prominent
- [ ] Bonus does NOT lock user funds without clear warning
- [ ] Terms fit on single screen (no 20-page T&Cs)
- [ ] Self-excluded users automatically excluded from promotions
- [ ] High-risk behavior flagged users excluded from promotions
- [ ] No loss-back bonuses (rewarding losses)

---

## Part 4: Crypto-Specific Requirements (TON Blockchain)

### H. Transaction Transparency
- [ ] Gas fee estimate shown BEFORE transaction submission
- [ ] Fee shown in both TON and USD
- [ ] Gas fee estimate updates with network congestion
- [ ] Warning if gas fee unusually high (>$1)
- [ ] Total cost breakdown: deposit + gas fee = total

### I. Wallet Connection
- [ ] User must explicitly approve wallet connection
- [ ] Permission scope clearly explained (what we can/cannot access)
- [ ] Each transaction requires wallet approval (no auto-sign)
- [ ] Wallet disconnect option prominent
- [ ] No broad permissions requested (only what's needed)

### J. Smart Contract Transparency
- [ ] Contract address displayed and linkable (TONScan)
- [ ] Contract code published and verifiable
- [ ] Third-party audit report linked
- [ ] Plain-language explanation of contract logic
- [ ] Oracle source disclosed (match result data source)

### K. Crypto Risk Education
- [ ] First-time crypto users see educational modal
- [ ] Volatility risk explained (crypto value fluctuates)
- [ ] Irreversibility warning ("Transactions cannot be undone")
- [ ] Address verification encouraged ("Double-check wallet address")
- [ ] Wrong network warning (TON, not ETH/BTC)

---

## Part 5: Withdrawal Process

### L. Withdrawal Simplicity (Must Equal Deposit)
- [ ] Withdrawal requires same number of steps as deposit (no more)
- [ ] Verification requirements same for withdrawal and deposit
- [ ] No additional documents required for withdrawal
- [ ] Processing timeline clearly stated (e.g., "24-48 hours")
- [ ] No "pending review" beyond stated timeline
- [ ] No artificial friction (confirmation dialogs, surveys)
- [ ] Withdrawal button as prominent as deposit button

### M. Fee Transparency
- [ ] Platform fee disclosed (ideally $0)
- [ ] Network gas fee estimated
- [ ] Total "You Will Receive" amount calculated
- [ ] No hidden conversion fees
- [ ] Currency conversion rate shown if applicable

---

## Part 6: Notification & Communication

### N. Notification Standards
- [ ] User controls notification frequency (default: minimal)
- [ ] Marketing notifications opt-in, not opt-out
- [ ] Quiet hours respected (user-configurable, default 10 PM-8 AM)
- [ ] Self-excluded users receive ZERO marketing (instant stop)
- [ ] Win and loss notifications have equal prominence
- [ ] No "we miss you" emails to inactive users
- [ ] Responsible gambling notifications cannot be permanently disabled

### O. Copywriting Standards
- [ ] No emotional manipulation ("Win big!", "Don't miss out!")
- [ ] Factual, neutral tone
- [ ] No false promises ("Guaranteed wins")
- [ ] Risk acknowledgment in promotional copy
- [ ] Plain language (8th-grade reading level)
- [ ] No excessive exclamation points or urgency language

---

## Part 7: Data & Privacy (GDPR Compliance)

### P. User Data Rights
- [ ] Users can export all data (Subject Access Request)
- [ ] Users can delete account and data
- [ ] Consent for data collection is clear and specific
- [ ] Users can opt out of marketing (one click)
- [ ] Privacy policy concise and accessible
- [ ] Data minimization: collect only what's necessary
- [ ] User notified of data breaches within 72 hours

---

## Part 8: Testing & Validation

### Q. Pre-Launch Testing
- [ ] Tested with diverse user groups (age, experience, income)
- [ ] Tested with colorblind users
- [ ] Tested with screen readers
- [ ] Tested on slow internet connections
- [ ] Tested on various devices (iOS, Android, desktop)
- [ ] User comprehension tested (can users explain fees, odds, risks?)
- [ ] Edge cases tested (limit breaches, excluded users, cooling-off periods)

### R. Monitoring & Analytics
- [ ] Feature tracks harm indicators (if betting-related)
- [ ] Error rates monitored
- [ ] User feedback collection implemented
- [ ] Accessibility compliance tested (WCAG 2.1 AA minimum)
- [ ] Performance metrics acceptable (load time <3 seconds)

---

## Part 9: Documentation & Compliance

### S. Documentation
- [ ] Feature documented in codebase (comments, README)
- [ ] Ethical design decisions documented (why choices made)
- [ ] Compliance requirements documented (UKGC, MGA, etc.)
- [ ] User-facing help documentation created
- [ ] Support team trained on feature

### T. Regulatory Compliance
- [ ] UKGC compliant (if targeting UK users)
- [ ] MGA compliant (if Malta-licensed)
- [ ] Indian state regulations checked (geo-blocking if needed)
- [ ] GDPR compliant (if EU users)
- [ ] FATF guidelines followed (crypto AML/KYC)
- [ ] Age verification enforced (18+ or 21+ depending on jurisdiction)

---

## Part 10: Sign-Off

### Feature Information
- **Feature Name:** _________________________________
- **Feature Owner:** _________________________________
- **Implementation Date:** _________________________________

### Checklist Completion
- **Total Items:** 90+
- **Applicable Items:** _____ (some may be N/A)
- **Items Checked "Yes":** _____
- **Items Checked "No":** _____ (if >0, explain below)
- **Items "N/A":** _____ (justify below)

### Justifications for "No" or "N/A" Responses
(Attach additional pages if needed)

_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________

### Approvals

**Feature Owner Signature:** _______________________ Date: _____________
> I confirm this feature meets ethical design standards and is ready for code review.

**UX Lead Approval:** _______________________ Date: _____________
> I confirm UI/UX meets accessibility and dark pattern prevention standards.

**Compliance Officer Approval:** _______________________ Date: _____________
> I confirm feature meets all regulatory requirements for target jurisdictions.

**Ethics Board Review (if high-risk feature):** _______________________ Date: _____________
> I confirm high-risk feature safeguards are adequate.

---

## Quick Reference: Prohibited Features

**NEVER IMPLEMENT:**
- ❌ Betting on credit / negative balances
- ❌ Auto-play / auto-bet without confirmation
- ❌ Marketing to self-excluded users
- ❌ VIP tiers based on wagering volume
- ❌ Loss-back bonuses (cashback on losses)
- ❌ Fake urgency (countdown to artificial deadline)
- ❌ Confirmshaming opt-out language
- ❌ Hidden fees (revealed only at final step)
- ❌ Difficult withdrawals (harder than deposits)
- ❌ Spot-fix markets (runs in over X, etc.)
- ❌ Reverse withdrawals (canceling user requests)

**If you encounter a request to implement any of the above, escalate to Ethics Board immediately.**

---

## Quick Reference: Always Required

**ALWAYS IMPLEMENT:**
- ✅ Pre-play limit setting (mandatory onboarding)
- ✅ Reality checks (every 30 min maximum)
- ✅ Always-visible loss tracker
- ✅ Self-exclusion (<2 clicks from any page)
- ✅ Transparent fees (before confirmation)
- ✅ House edge disclosure (on all markets)
- ✅ Probability display (alongside odds)
- ✅ Cooling-off periods (24-48h for limit increases)
- ✅ Equal visual weight (RG tools = betting actions)
- ✅ Behavioral monitoring (8 red-flag indicators)

---

## Need Help?

**Questions about this checklist?**
- Slack: #ethical-design
- Email: ethics@[platform-name].com
- Documentation: `/docs/ethical-design-guidelines.md` (full guidelines)
- Analysis: `/docs/dark-pattern-analysis-summary.md` (detailed findings)

**Unsure if feature is ethical?**
1. Review full guidelines document
2. Consult with UX Lead and Compliance Officer
3. If still uncertain, escalate to Ethics Board
4. When in doubt, choose the more protective option

**Remember:** It's easier to add features later than to rebuild trust after harm.

---

**END OF CHECKLIST**

Print this checklist and keep it visible during development sprints. Ethical design is everyone's responsibility.
