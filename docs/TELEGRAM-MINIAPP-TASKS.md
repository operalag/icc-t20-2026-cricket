# Telegram Mini App Integration Tasks

This document outlines all tasks required to convert the Cricket Prediction Markets web app into a Telegram Mini App (TWA).

---

## Prerequisites

- [ ] Create Telegram Bot via [@BotFather](https://t.me/BotFather)
- [ ] Get Bot Token (keep secure, never expose to frontend)
- [ ] Create Mini App via `/newapp` command in BotFather
- [ ] Set Web App URL to `https://icc-t20-2026-cricket.vercel.app`

---

## Phase 1: SDK Integration

### 1.1 Install Dependencies
```bash
npm install @twa-dev/sdk
```

### 1.2 Create Telegram SDK Wrapper
**File:** `lib/telegram/sdk.ts`

- [ ] Initialize WebApp SDK
- [ ] Export typed helpers for SDK methods
- [ ] Handle SDK not available (when opened outside Telegram)
- [ ] Create `isTelegramWebApp()` detection function

### 1.3 Create React Hooks
**File:** `hooks/useTelegram.ts`

- [ ] `useTelegram()` - Main hook returning WebApp instance
- [ ] `useTelegramUser()` - Get current user info
- [ ] `useTelegramTheme()` - Get theme colors
- [ ] `useMainButton()` - Control MainButton
- [ ] `useBackButton()` - Control BackButton
- [ ] `useHapticFeedback()` - Haptic feedback helpers

### 1.4 Create Telegram Provider
**File:** `components/TelegramProvider.tsx`

- [ ] Initialize SDK on mount
- [ ] Call `WebApp.ready()` when app is loaded
- [ ] Expand viewport with `WebApp.expand()`
- [ ] Sync theme colors with CSS variables
- [ ] Provide context to child components

---

## Phase 2: UI Adaptations

### 2.1 Update Layout
**File:** `app/layout.tsx`

- [ ] Add viewport meta tag for Telegram
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  ```
- [ ] Disable pull-to-refresh
- [ ] Handle safe area insets (notch, home indicator)

### 2.2 Conditional Header
**File:** `components/layout/Header.tsx`

- [ ] Detect if running in Telegram
- [ ] If in Telegram: Hide header, use native BackButton
- [ ] If in browser: Keep current header
- [ ] Adjust top padding for Telegram status bar

### 2.3 Theme Synchronization
**File:** `app/globals.css` + `lib/telegram/theme.ts`

- [ ] Map Telegram theme params to CSS variables:
  - `--tg-theme-bg-color`
  - `--tg-theme-text-color`
  - `--tg-theme-hint-color`
  - `--tg-theme-link-color`
  - `--tg-theme-button-color`
  - `--tg-theme-button-text-color`
  - `--tg-theme-secondary-bg-color`
- [ ] Update Tailwind config to use these variables
- [ ] Test with light and dark Telegram themes

### 2.4 Main Button Integration
**Files:** Various pages

- [ ] Homepage: "View All Markets" MainButton
- [ ] Match page: "Place Prediction" MainButton
- [ ] Bet slip: "Confirm Bet" MainButton
- [ ] Show/hide MainButton based on context
- [ ] Add loading state to MainButton

### 2.5 Back Button Integration
**File:** `components/TelegramNavigation.tsx`

- [ ] Show BackButton on sub-pages
- [ ] Handle back navigation
- [ ] Hide on homepage

### 2.6 Haptic Feedback
**Files:** Interactive components

- [ ] Add haptic on button clicks (`impactOccurred`)
- [ ] Add haptic on successful actions (`notificationOccurred`)
- [ ] Add haptic on selection changes (`selectionChanged`)
- [ ] Locations to add:
  - [ ] Odds buttons
  - [ ] Bet slip add/remove
  - [ ] Wallet connect
  - [ ] Filter toggles

### 2.7 Safe Area Handling
**File:** `app/globals.css`

- [ ] Add padding for top safe area (status bar)
- [ ] Add padding for bottom safe area (home indicator)
- [ ] Use CSS env variables:
  ```css
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  ```

---

## Phase 3: Authentication

### 3.1 Create Auth Utilities
**File:** `lib/telegram/auth.ts`

- [ ] Parse `initData` string
- [ ] Extract user information
- [ ] Create `getTelegramUser()` function

### 3.2 Backend Verification (API Route)
**File:** `app/api/telegram/verify/route.ts`

- [ ] Receive `initData` from frontend
- [ ] Verify HMAC signature using bot token
- [ ] Validate `auth_date` is recent (prevent replay attacks)
- [ ] Return verified user data or error

### 3.3 User Session
**File:** `lib/store/user-store.ts`

- [ ] Store Telegram user info in Zustand
- [ ] Link Telegram user ID to TON wallet address
- [ ] Persist session across page reloads

---

## Phase 4: TON Connect Adjustments

### 4.1 Update TON Connect Config
**File:** `components/providers.tsx`

- [ ] Detect Telegram environment
- [ ] Use appropriate return URL for Telegram
- [ ] Handle deep links back to Mini App

### 4.2 Update Manifest
**File:** `public/tonconnect-manifest.json`

- [ ] Update URL to include Telegram bot link
- [ ] Ensure icon is accessible

### 4.3 Wallet Connection Flow
**File:** `components/WalletDisplay.tsx`

- [ ] Test wallet connection within Telegram
- [ ] Handle Tonkeeper deep link in Telegram
- [ ] Show appropriate UI for in-app wallet

---

## Phase 5: Testing

### 5.1 Local Testing
- [ ] Use [Telegram Web App Test Environment](https://core.telegram.org/bots/webapps#testing-mini-apps)
- [ ] Test with Bot API test server
- [ ] Use browser dev tools to simulate `initData`

### 5.2 Device Testing
- [ ] Test on iOS Telegram
- [ ] Test on Android Telegram
- [ ] Test on Telegram Desktop
- [ ] Test on Telegram Web

### 5.3 Theme Testing
- [ ] Test with Telegram light theme
- [ ] Test with Telegram dark theme
- [ ] Test with custom Telegram themes

### 5.4 Edge Cases
- [ ] App opened outside Telegram (graceful fallback)
- [ ] Slow network connection
- [ ] User denies wallet connection
- [ ] Session expiry

---

## Phase 6: Bot Features (Optional)

### 6.1 Bot Commands
**File:** `bot/commands.ts` (new)

- [ ] `/start` - Welcome message with Mini App button
- [ ] `/markets` - Show active markets
- [ ] `/mybets` - Show user's bets
- [ ] `/help` - Help and FAQ

### 6.2 Notifications
**File:** `bot/notifications.ts` (new)

- [ ] Bet confirmation notification
- [ ] Match starting soon reminder
- [ ] Bet settlement notification
- [ ] New market alert

### 6.3 Inline Mode (Optional)
- [ ] Share markets via inline query
- [ ] Share bet slips

---

## File Structure After Implementation

```
├── app/
│   ├── api/
│   │   └── telegram/
│   │       └── verify/
│   │           └── route.ts          # initData verification
│   ├── layout.tsx                     # Updated with TWA meta
│   └── ...
├── components/
│   ├── TelegramProvider.tsx          # NEW: SDK initialization
│   ├── TelegramNavigation.tsx        # NEW: BackButton handler
│   ├── layout/
│   │   └── Header.tsx                # Updated: conditional render
│   └── ...
├── hooks/
│   └── useTelegram.ts                # NEW: React hooks for TWA
├── lib/
│   ├── telegram/
│   │   ├── sdk.ts                    # NEW: SDK wrapper
│   │   ├── auth.ts                   # NEW: Auth utilities
│   │   └── theme.ts                  # NEW: Theme sync
│   └── store/
│       └── user-store.ts             # Updated: Telegram user
├── bot/                               # NEW: Bot functionality
│   ├── commands.ts
│   └── notifications.ts
└── public/
    └── tonconnect-manifest.json      # Updated for Telegram
```

---

## Environment Variables Needed

```env
# .env.local
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_BOT_USERNAME=your_bot_username
NEXT_PUBLIC_TELEGRAM_BOT_USERNAME=your_bot_username
```

---

## Resources

- [Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps)
- [TWA Dev SDK](https://github.com/twa-dev/SDK)
- [TON Connect for TWA](https://docs.ton.org/develop/dapps/ton-connect/tg-bot-integration)
- [Telegram Theme Parameters](https://core.telegram.org/bots/webapps#themeparams)
- [Mini Apps Best Practices](https://docs.telegram-mini-apps.com/)

---

## Estimated Timeline

| Phase | Duration |
|-------|----------|
| Phase 1: SDK Integration | 2-3 hours |
| Phase 2: UI Adaptations | 3-4 hours |
| Phase 3: Authentication | 2-3 hours |
| Phase 4: TON Connect | 1-2 hours |
| Phase 5: Testing | 2-3 hours |
| Phase 6: Bot Features | 3-4 hours (optional) |
| **Total (without bot)** | **~10-15 hours** |
| **Total (with bot)** | **~15-20 hours** |

---

## Notes

- The current app already works as a standalone web app
- Telegram Mini App features should be progressive enhancements
- Always provide fallbacks for non-Telegram browsers
- Keep the disclaimer modal for both environments
