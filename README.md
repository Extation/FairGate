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

**[⭐ Star this repo](https://github.com/Extation/FairGate)** if you find it helpful!

</div>
