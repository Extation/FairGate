# 🏛️ FairGate — Reputation-Gated Token Launchpad

<div align="center">

![Built with FairScale](https://img.shields.io/badge/Built%20with-FairScale-0ea5e9?style=for-the-badge)
![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Blockchain-9945FF?style=for-the-badge&logo=solana)

**A fair, bot-resistant token launchpad on Solana — powered by FairScale reputation scores.**

[Live Demo](https://fairgate.xyz) • [Documentation](./docs) • [Report Bug](https://github.com/yourusername/fairgate/issues)

</div>

---

## 📖 Overview

**FairGate** is a next-generation token launchpad built on Solana that revolutionizes fair token distribution. Unlike traditional launchpads that favor large capital holders, FairGate gates participation based on **on-chain reputation** through deep integration with [FairScale](https://fairscale.xyz)'s reputation API.

### Why FairGate?

- **🛡️ Bot-Resistant:** New wallets with no history cannot participate in premium launches
- **⚖️ Fair Distribution:** Allocations based on reputation, not just wallet balance
- **🎯 Tiered Access:** Bronze → Silver → Gold → Platinum tiers unlock progressive benefits
- **📊 Transparent Scoring:** Every user can see exactly how their score is calculated
- **🎁 Reward System:** Earn multipliers, airdrops, NFTs, and exclusive access

---

## ✨ Features

| Feature | Description |
|---|---|
| **Dashboard** | Personal reputation dashboard showing FairScore, tier badge, feature breakdown, and earned badges |
| **Launchpad** | Browse token launches with tier-gated access and score-weighted allocations |
| **Rewards** | Claim tier-based rewards including airdrops, multipliers, NFTs, and access passes |
| **Leaderboard** | Global real-time ranking of wallets by FairScore |
| **Wallet Integration** | Seamless connection via Phantom, Solflare, or any Solana wallet adapter |
| **Theme Support** | Dark/light mode toggle with persistent user preference |
| **Responsive Design** | Mobile-first UI built with Tailwind CSS |
| **Interactive Effects** | Ambient cursor glow and smooth animations |

---

## 🚀 Quick Start

Get FairGate running locally in 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/fairgate.git
cd fairgate

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your FairScale API key

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For detailed setup instructions, see **[docs/SETUP.md](./docs/SETUP.md)**.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 11](https://www.framer.com/motion/) |
| **Charts** | [Recharts 2.15](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Blockchain** | [Solana Web3.js 1.95](https://solana-labs.github.io/solana-web3.js/) |
| **Wallet** | [@solana/wallet-adapter-react](https://github.com/anza-xyz/wallet-adapter) |
| **Reputation** | [FairScale API](https://fairscale.xyz) |

---

## 📁 Project Structure

```
fairgate/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # Server-side API proxy routes
│   │   ├── dashboard/         # User reputation dashboard
│   │   ├── launchpad/         # Token launch listings
│   │   ├── leaderboard/       # Score rankings
│   │   └── rewards/           # Tier-based rewards
│   ├── components/            # React components
│   │   ├── dashboard/         # ScoreCard, FeatureBreakdown, BadgeGrid
│   │   ├── launchpad/         # LaunchCard, ReputationGate
│   │   ├── wallet/            # WalletProvider, WalletButton
│   │   └── ui/                # Button, Card, ProgressBar, etc.
│   ├── hooks/                 # Custom React hooks
│   │   ├── useFairScore.ts   # Fetch & manage FairScore state
│   │   └── useReputationGate.ts  # Tier-based access control
│   ├── lib/                   # Core utilities
│   │   ├── fairscale.ts      # FairScale API client wrapper
│   │   ├── constants.ts      # Tier configs, mock data
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript definitions
├── docs/                      # Documentation
│   ├── SETUP.md              # Setup instructions
│   └── INTEGRATION.md        # FairScale integration guide
└── public/                    # Static assets
```

---

## 🎯 Tier System

FairGate uses a four-tier reputation system:

| Tier | Score Range | Multiplier | Benefits |
|---|---|---|---|
| 🥉 **Bronze** | 0 – 24 | 1.0x | Basic access, view all listings |
| 🥈 **Silver** | 25 – 49 | 1.25x | Early access to select launches, priority support |
| 🥇 **Gold** | 50 – 74 | 1.75x | Access to all launches, exclusive airdrops, governance voting |
| 💎 **Platinum** | 75 – 100 | 2.5x | Guaranteed allocations, VIP rewards, advisory access |

Your tier determines:
- Which token launches you can participate in
- Your allocation size multiplier
- Reward eligibility and multipliers
- Leaderboard ranking weight

---

## 📚 Documentation

- **[Setup Guide](./docs/SETUP.md)** — Complete installation and configuration instructions
- **[Integration Guide](./docs/INTEGRATION.md)** — Detailed FairScale API integration documentation
- **[API Reference](#)** — Coming soon
- **[Contributing Guide](#contributing)** — How to contribute to FairGate

---

## 🔑 Key Features Explained

### Reputation-Based Access
Every wallet receives a **FairScore** (0-100) based on on-chain activity including transaction history, DeFi participation, token holdings, and wallet age. Higher scores unlock better tiers and benefits.

### Bot Prevention
New wallets and bots with no transaction history receive low scores, effectively preventing sybil attacks and ensuring fair distribution to genuine users.

### Transparent Scoring
Users can see exactly how their score is calculated through the feature breakdown chart showing metrics like:
- LST (Liquid Staking Token) holdings percentile
- Major token holdings percentile
- Native SOL balance percentile
- Transaction count and frequency
- Wallet age and activity patterns

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `http://localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint to check code quality |

---

## 🐛 Troubleshooting

**API key errors?** Ensure `FAIRSCALE_API_KEY` is set in `.env.local` and restart the dev server.

**Wallet not connecting?** Install [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/) browser extension.

**Build failures?** Clear cache with `rm -rf .next && npm run build`

See [docs/SETUP.md](./docs/SETUP.md#troubleshooting) for more solutions.

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit: `git commit -m "feat: add amazing feature"`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

Please follow existing code style and TypeScript conventions.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 📞 Contact & Community

- **Website:** [fairgate.xyz](https://fairgate.xyz)
- **Twitter:** [@FairScale](https://x.com/fairscalexyz)
- **Discord:** [Join Community](https://discord.com/invite/EeHKStrxHN)
- **Email:** contact@fairgate.xyz

---

## 🙏 Acknowledgments

Built with love using:
- [FairScale](https://fairscale.xyz) — Reputation infrastructure
- [Solana](https://solana.org/) — High-performance blockchain
- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS

---

<div align="center">

Made with ❤️ by the FairGate Team

**[⭐ Star this repo](https://github.com/yourusername/fairgate)** if you find it helpful!

</div>

---

## Getting Started

### 1. Clone the Repository

bash
git clone https://github.com/yourusername/fairgate.git
cd fairgate


### 2. Install Dependencies

bash
npm install


This installs all production and development dependencies defined in `package.json`, including Next.js, React, Solana wallet adapters, Framer Motion, Recharts, and Tailwind CSS.

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

bash
cp .env.example .env.local


Then populate it with the following values:

env
# ============================================
# FairScale API Configuration (Required)
# ============================================
# Your FairScale API key - obtain from https://fairscale.xyz
# This is used server-side only and never exposed to the client
FAIRSCALE_API_KEY=your_fairscale_api_key_here

# ============================================
# Solana Configuration (Optional)
# ============================================
# Solana network to connect to
# Options: mainnet-beta | devnet | testnet
# Default: mainnet-beta
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# Solana RPC endpoint URL
# Default: Uses Solana's public RPC for the selected network
# For production, consider using a dedicated RPC provider like:
# - Helius: https://helius.dev
# - QuickNode: https://quicknode.com
# - Alchemy: https://alchemy.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com


> Important: `FAIRSCALE_API_KEY` is a server-side secret. It is read only inside Next.js API routes (`src/app/api/*`) and is never sent to the browser. Do not prefix it with `NEXT_PUBLIC_`.

### 4. Run the Development Server

bash
npm run dev


Open [http://localhost:3000](http://localhost:3000) in your browser. The app supports hot-reload — changes to source files are reflected instantly.

### 5. Build for Production

bash
# Create an optimized production build
npm run build

# Start the production server
npm start


The production build outputs to `.next/` and can be deployed to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any Node.js hosting provider.

---

## Project Structure


fairgate/
├── public/
│   └── images/
│       └── fairscale_logo.jpg        # Brand logo asset
├── src/
│   ├── app/                           # Next.js 14 App Router
│   │   ├── layout.tsx                 # Root layout (providers, fonts, metadata)
│   │   ├── page.tsx                   # Landing / home page
│   │   ├── globals.css                # Global styles & Tailwind directives
│   │   ├── api/                       # Server-side API proxy routes
│   │   │   ├── score/route.ts         # GET /api/score?wallet=...
│   │   │   ├── fairscore/route.ts     # GET /api/fairscore?wallet=...
│   │   │   └── walletscore/route.ts   # GET /api/walletscore?wallet=...
│   │   ├── dashboard/page.tsx         # User reputation dashboard
│   │   ├── launchpad/page.tsx         # Token launch listings
│   │   ├── leaderboard/page.tsx       # FairScore leaderboard
│   │   └── rewards/page.tsx           # Tier-based rewards
│   ├── components/
│   │   ├── dashboard/                 # Dashboard-specific components
│   │   │   ├── ScoreCard.tsx          # Main FairScore display card
│   │   │   ├── FeatureBreakdown.tsx   # Score feature analysis chart
│   │   │   ├── BadgeGrid.tsx          # Achievement badges grid
│   │   │   └── TierBadge.tsx          # Tier indicator badge
│   │   ├── launchpad/
│   │   │   ├── LaunchCard.tsx         # Individual launch project card
│   │   │   └── ReputationGate.tsx     # Access gate based on tier
│   │   ├── rewards/
│   │   │   └── RewardCard.tsx         # Individual reward card
│   │   ├── wallet/
│   │   │   ├── WalletProvider.tsx     # Solana wallet context provider
│   │   │   └── WalletButton.tsx       # Connect/disconnect wallet button
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Top navigation bar
│   │   │   ├── Footer.tsx             # Page footer
│   │   │   └── ClientLayout.tsx       # Client-side layout wrapper
│   │   └── ui/                        # Reusable UI primitives
│   │       ├── Button.tsx             # Styled button component
│   │       ├── Card.tsx               # Styled card container
│   │       ├── ProgressBar.tsx        # Animated progress bar
│   │       ├── ThemeToggle.tsx        # Dark/light mode toggle
│   │       ├── CursorGlow.tsx         # Ambient cursor glow effect
│   │       └── Logo.tsx               # FairGate logo component
│   ├── hooks/                         # Custom React hooks
│   │   ├── useFairScore.ts           # Fetch & manage FairScore state
│   │   └── useReputationGate.ts      # Check tier-based access
│   ├── lib/                           # Core utilities & configuration
│   │   ├── fairscale.ts              # FairScale API client wrapper
│   │   ├── constants.ts              # Tier configs, mock data, nav links
│   │   └── utils.ts                  # Helper functions (formatting, scoring)
│   └── types/
│       └── index.ts                   # TypeScript type definitions
├── .env.local                         # Environment variables (not committed)
├── .env.example                       # Example environment variables
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── package.json
└── README.md


---

## FairScale Integration

FairGate integrates with FairScale's reputation API at multiple layers. This section documents the full integration architecture.

### Architecture Overview


┌─────────────────────────────────────────────────────────┐
│                      Browser (Client)                   │
│                                                         │
│  WalletButton ──► useFairScore() hook                   │
│                      │                                  │
│                      ▼                                  │
│              fairscale.ts (client SDK)                  │
│              fetch("/api/score?wallet=...")             │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTP GET
                       ▼
┌────────────────────────────────────────────────────────────┐
│                Next.js API Routes (Server)                 │
│                                                            │
│  /api/score        → https://api.fairscale.xyz/score       │
│  /api/fairscore    → https://api.fairscale.xyz/fairScore   │
│  /api/walletscore  → https://api.fairscale.xyz/walletScore │
│                                                            │
│  Headers: { fairkey: process.env.FAIRSCALE_API_KEY }       │
└──────────────────────┬─────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  FairScale External API                 │
│                  https://api.fairscale.xyz              │
└─────────────────────────────────────────────────────────┘


The API key is never exposed to the client. All FairScale requests are proxied through Next.js server-side API routes.

### API Proxy Routes

All routes are located in `src/app/api/` and follow the same pattern:

#### `GET /api/score?wallet=<address>`

Returns the full reputation profile for a wallet.

Upstream: `https://api.fairscale.xyz/score?wallet=<address>`

Response shape (`FairScaleScore`):
json
{
  "wallet": "ABC...XYZ",
  "fairscore_base": 62.5,
  "social_score": 8.3,
  "fairscore": 70.8,
  "tier": "gold",
  "badges": [
    {
      "id": "defi-veteran",
      "label": "DeFi Veteran",
      "description": "Participated in 10+ DeFi protocols",
      "tier": "gold"
    }
  ],
  "actions": [],
  "timestamp": "2025-01-15T12:00:00Z",
  "features": {
    "lst_percentile_score": 0.75,
    "major_percentile_score": 0.82,
    "native_sol_percentile": 0.60,
    "stable_percentile_score": 0.45,
    "tx_count": 1523,
    "active_days": 245,
    "median_gap_hours": 12.5,
    "wallet_age_days": 730
  }
}


#### `GET /api/fairscore?wallet=<address>`

Returns only the numeric FairScore.

Upstream: `https://api.fairscale.xyz/fairScore?wallet=<address>`

Response shape (`FairScoreResponse`):
json
{
  "fair_score": 70.8
}


#### `GET /api/walletscore?wallet=<address>`

Returns the wallet-specific score.

Upstream: `https://api.fairscale.xyz/walletScore?wallet=<address>`

Response shape (`WalletScoreResponse`):
json
{
  "wallet_score": 65.2
}


#### Error Responses

All endpoints return consistent error responses:

json
// 400 — Missing wallet parameter
{ "error": "Wallet address is required" }

// 500 — Missing API key
{ "error": "API key not configured" }

// 4xx/5xx — Upstream FairScale error
{ "error": "FairScale API error: <details>" }


### Client-Side SDK Wrapper

File: `src/lib/fairscale.ts`

This module provides typed functions that call the local API proxy routes:

typescript
import { getFullScore, getFairScore, getWalletScore } from "@/lib/fairscale";

// Get complete reputation profile
const fullScore: FairScaleScore = await getFullScore("WALLET_ADDRESS");

// Get just the numeric FairScore
const fairScore: FairScoreResponse = await getFairScore("WALLET_ADDRESS");

// Get wallet-specific score
const walletScore: WalletScoreResponse = await getWalletScore("WALLET_ADDRESS");


All functions throw on non-OK HTTP responses with descriptive error messages.

### React Hooks

#### `useFairScore()`

File: `src/hooks/useFairScore.ts`

Manages the full lifecycle of fetching and storing a wallet's FairScore.

typescript
import { useFairScore } from "@/hooks/useFairScore";

function MyComponent() {
  const { score, loading, error, fetchScore, reset } = useFairScore();

  // Trigger a fetch
  await fetchScore("WALLET_ADDRESS");

  // Access the data
  score.fairscore;    // number — the composite score
  score.tier;         // "bronze" | "silver" | "gold" | "platinum"
  score.badges;       // FairScaleBadge[]
  score.features;     // FairScaleFeatures (on-chain metrics)

  // Reset state
  reset();
}


Return type:

| Property | Type | Description |
|---|---|---|
| `score` | `FairScaleScore \| null` | Full score data or null if not yet fetched |
| `loading` | `boolean` | True while the API request is in flight |
| `error` | `string \| null` | Error message if the request failed |
| `fetchScore` | `(wallet: string) => Promise<void>` | Triggers a score fetch |
| `reset` | `() => void` | Resets score, loading, and error to initial state |

#### `useReputationGate()`

File: `src/hooks/useReputationGate.ts`

Determines whether a user's tier meets a required tier threshold.

typescript
import { useReputationGate } from "@/hooks/useReputationGate";

function LaunchDetail({ requiredTier }: { requiredTier: Tier }) {
  const { hasAccess, message, userTierLevel, requiredTierLevel } =
    useReputationGate(userTier, requiredTier);

  if (!hasAccess) {
    return <p>{message}</p>; // "Requires Gold tier or above. You are currently Silver."
  }

  return <ParticipateButton />;
}


Return type:

| Property | Type | Description |
|---|---|---|
| `hasAccess` | `boolean` | Whether the user meets the tier requirement |
| `userTierLevel` | `number` | Numeric level of the user's tier (0–3) |
| `requiredTierLevel` | `number` | Numeric level of the required tier (0–3) |
| `tierConfig` | `TierConfig \| null` | Configuration object for the required tier |
| `message` | `string` | Human-readable access status message |

### Tier System & Reputation Gating

FairGate maps FairScores to four tiers, each with distinct benefits:

| Tier | Score Range | Multiplier | Key Benefits |
|---|---|---|---|
| 🥉 Bronze | 0 – 24 | 1.0x | Basic access, view listings |
| 🥈 Silver | 25 – 49 | 1.25x | Early access to select launches, priority support |
| 🥇 Gold | 50 – 74 | 1.75x | All launches, exclusive airdrops, governance voting |
| 💎 Platinum | 75 – 100 | 2.5x | Guaranteed allocation, VIP rewards, advisory access |

Tier resolution is handled by `getTierFromScore()` in `src/lib/utils.ts`:

typescript
function getTierFromScore(score: number): Tier {
  if (score >= 75) return "platinum";
  if (score >= 50) return "gold";
  if (score >= 25) return "silver";
  return "bronze";
}


Allocation calculation factors in both the tier multiplier and the raw score:

typescript
function calculateAllocation(fairscore: number, tier: Tier, baseAllocation: number): number {
  const tierConfig = getTierConfig(tier);
  const scoreMultiplier = 1 + (fairscore / 100) * 0.5;
  return Math.floor(baseAllocation * tierConfig.multiplier * scoreMultiplier);
}


### Integration Flow Diagram


User connects wallet
        │
        ▼
WalletButton triggers fetchScore(walletAddress)
        │
        ▼
useFairScore hook → fairscale.ts → /api/score → FairScale API
        │
        ▼
Score returned → tier computed via getTierFromScore()
        │
        ├──► Dashboard: displays score, badges, feature breakdown
        ├──► Launchpad: useReputationGate() checks tier access per launch
        ├──► Rewards: filters claimable rewards by tier & score
        └──► Leaderboard: ranks wallet among all users


---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Landing page with project overview and call-to-action |
| `/dashboard` | Dashboard | Personal FairScore dashboard with score card, feature breakdown, badges |
| `/launchpad` | Launchpad | Browse active, upcoming, and completed token launches |
| `/rewards` | Rewards | View and claim tier-gated rewards |
| `/leaderboard` | Leaderboard | Global FairScore rankings |

---

## Component Architecture

### Layout Components
- `ClientLayout` — Wraps the app with WalletProvider, theme context, Navbar, Footer, and CursorGlow
- `Navbar` — Top navigation with links and wallet connect button
- `Footer` — Site footer with links and branding

### Dashboard Components
- `ScoreCard` — Displays the user's FairScore with animated circular progress
- `FeatureBreakdown` — Radar/bar chart of on-chain feature scores
- `BadgeGrid` — Grid of earned achievement badges
- `TierBadge` — Visual tier indicator with gradient styling

### Launchpad Components
- `LaunchCard` — Project card showing raise progress, tier requirement, and status
- `ReputationGate` — Conditional renderer that blocks access below required tier

### Wallet Components
- `WalletProvider` — Configures Solana wallet adapter context
- `WalletButton` — Connect/disconnect button with address display

### UI Primitives
- `Button` — Styled button with variants
- `Card` — Container with glass-morphism styling
- `ProgressBar` — Animated progress indicator
- `ThemeToggle` — Dark/light mode switch
- `CursorGlow` — Ambient glow effect following cursor
- `Logo` — FairGate brand logo

---

## Type Definitions

All types are defined in `src/types/index.ts`:

typescript
// Core FairScale types
FairScaleScore        // Full score response from /api/score
FairScaleFeatures     // On-chain metric breakdown
FairScaleBadge        // Achievement badge
FairScoreResponse     // Response from /api/fairscore
WalletScoreResponse   // Response from /api/walletscore

// Application types
Tier                  // "bronze" | "silver" | "gold" | "platinum"
TierConfig            // Tier display & logic configuration
LaunchProject         // Token launch project data
Reward                // Claimable reward data
LeaderboardEntry      // Leaderboard row data


---

## Configuration Reference

### Tier Configuration

Defined in `src/lib/constants.ts` as `TIER_CONFIGS`. Each tier includes:

- `name`, `minScore`, `maxScore` — Tier boundaries
- `color`, `bgColor`, `borderColor`, `textColor` — Styling tokens
- `gradientFrom`, `gradientTo` — Gradient classes
- `icon` — Emoji icon
- `multiplier` — Reward/allocation multiplier
- `benefits` — Array of benefit descriptions

### Navigation Links

Defined in `src/lib/constants.ts` as `NAV_LINKS`:

typescript
[
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/launchpad", label: "Launchpad" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Leaderboard" },
]


---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with hot-reload on `http://localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server (requires `npm run build` first) |
| `npm run lint` | Run ESLint across the codebase |

---

## Troubleshooting

### "API key not configured" error

Ensure `FAIRSCALE_API_KEY` is set in your `.env.local` file. Restart the dev server after adding or changing environment variables.

### Wallet not connecting

- Make sure you have a Solana wallet extension installed (Phantom, Solflare)
- Check that your browser allows the extension to run on localhost
- Try refreshing the page after installing the extension

### FairScale API returning errors

- Verify your API key is valid and active
- Check that the wallet address is a valid Solana public key
- The FairScale API may have rate limits — wait and retry if you receive 429 responses

### Build failures

bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build


### Port 3000 already in use

bash
# Use a different port
npm run dev -- -p 3001


---

## Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and ensure `npm run lint` passes
4. Commit with a descriptive message: `git commit -m "feat: add my feature"`
5. Push to your fork: `git push origin feature/my-feature`
6. Open a Pull Request

Please follow the existing code style and TypeScript conventions.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

- Website: [fairgate.xyz](https://fairgate.xyz)
- Twitter: [@FairScale](https://x.com/fairscalexyz)
- Discord: [Join the community](https://discord.com/invite/EeHKStrxHN)
- Email: contact@fairgate.xyz

---

## Acknowledgments

- [FairScale](https://fairscale.xyz) — Reputation infrastructure powering the tier and gating system
- [Solana Foundation](https://solana.org/) — Blockchain platform
- [Next.js](https://nextjs.org/) — React framework
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
