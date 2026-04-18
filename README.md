# CryptoVault

Brutalist Web3 mobile app prototype for buying and selling crypto and gift cards. Built with Next.js 15, Tailwind CSS, Framer Motion and TypeScript.

The app renders inside a pixel-perfect iPhone 16 Pro mockup on desktop, and as a full-screen native-feeling app on mobile devices.

## Features

- Five fully interactive screens: Home, Markets, Trade, Cards, Wallet
- Animated screen transitions and tab indicator with Framer Motion
- Brutalist design: pure white / pure black, electric green accent, Space Mono and Syne typography, sharp 1px borders, grain overlay
- Real React state for trade chips, BUY/SELL toggle, gift card quote, copy-to-clipboard
- Responsive: iPhone 16 Pro mockup on desktop, full-bleed app on mobile (< 430px)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## One-Command Deploy to Vercel

```bash
npx vercel --prod
```

Or push to GitHub and click **New Project** at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Next.js and uses the included `vercel.json`.

## Build

```bash
npm run build
```

The app builds with zero errors.

## File Structure

```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  IPhoneMockup.tsx
  AppShell.tsx
  screens/
    HomeScreen.tsx
    MarketsScreen.tsx
    TradeScreen.tsx
    CardsScreen.tsx
    WalletScreen.tsx
  ui/
    BottomNav.tsx
    AssetRow.tsx
    QuickAction.tsx
    TransactionRow.tsx
```
