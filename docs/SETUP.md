# 🛠️ FairGate — Setup Guide

Complete step-by-step instructions to get FairGate running locally or in production.

---

## 📋 Prerequisites

Before starting, ensure you have:

| Requirement | Version | Download |
|---|---|---|
| Node.js | ≥ 18.0.0 | [nodejs.org](https://nodejs.org/) |
| npm | ≥ 9.0.0 | Ships with Node.js |
| Git | Any recent version | [git-scm.com](https://git-scm.com/) |
| Solana Wallet | Browser extension | [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/) |
| FairScale API Key | — | [fairscale.xyz](https://fairscale.xyz) |

### Verify Installation

Check your installed versions:

bash
node --version  # Should show v18.0.0 or higher
npm --version   # Should show 9.0.0 or higher
git --version   # Any recent version


---

## 🚀 Installation

### Step 1: Clone the Repository

bash
git clone https://github.com/yourusername/fairgate.git
cd fairgate


### Step 2: Install Dependencies

bash
npm install


This installs all required packages including:
- Next.js 14 and React 18
- Solana wallet adapters
- Framer Motion for animations
- Recharts for data visualization
- Tailwind CSS for styling
- TypeScript and type definitions

Installation time: ~2-3 minutes depending on your internet connection.

---

## ⚙️ Configuration

### Step 3: Environment Variables

FairGate uses environment variables to configure API keys and network settings.

#### Create the environment file

bash
cp .env.example .env.local


#### Edit `.env.local` with your configuration

env
# ================================================================
# REQUIRED — FairScale API Configuration
# ================================================================
# Your FairScale API key (obtain from https://fairscale.xyz)
# This is ONLY used server-side and NEVER exposed to the browser
FAIRSCALE_API_KEY=your_fairscale_api_key_here

# ================================================================
# OPTIONAL — Solana Network Configuration
# ================================================================
# Solana network to connect to
# Options: mainnet-beta | devnet | testnet
# Default: mainnet-beta
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta

# Solana RPC endpoint URL
# Default: Public RPC for the selected network
# For production, use a dedicated RPC provider for better performance:
#   - Helius: https://helius.dev
#   - QuickNode: https://quicknode.com
#   - Alchemy: https://alchemy.com
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com


#### Important Notes

- `FAIRSCALE_API_KEY`: Server-side secret, never prefix with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_*`: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Restart required: Always restart the dev server after changing environment variables

#### Alternative RPC Endpoints

For production or development with better rate limits:

env
# Helius (recommended for production)
NEXT_PUBLIC_SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# QuickNode
NEXT_PUBLIC_SOLANA_RPC_URL=https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_TOKEN/

# Alchemy
NEXT_PUBLIC_SOLANA_RPC_URL=https://solana-mainnet.g.alchemy.com/v2/YOUR_KEY


---

## 🏃 Running the Application

### Development Mode

Start the development server with hot-reload:

bash
npm run dev


The application will be available at:
- URL: [http://localhost:3000](http://localhost:3000)
- Hot-reload: Changes reflect instantly
- Console: Check terminal for any errors

### Production Build

Create an optimized production build:

bash
# Build the application
npm run build

# Start the production server
npm start


The build process:
1. Compiles TypeScript to JavaScript
2. Optimizes and minifies code
3. Generates static pages where possible
4. Outputs to `.next/` directory

Build time: ~30-60 seconds

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

FairGate is optimized for Vercel deployment:

1. Push to GitHub
   bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   

2. Import to Vercel
   - Visit [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables from `.env.local`
   - Click "Deploy"

3. Set Environment Variables in Vercel
   - Go to Project Settings → Environment Variables
   - Add `FAIRSCALE_API_KEY` and other variables
   - Redeploy after adding variables

### Deploy to Other Platforms

FairGate can also be deployed to:

- Netlify: Use the Netlify CLI or Git integration
- Railway: Connect your GitHub repo
- DigitalOcean App Platform: Use the web interface
- Custom VPS: Build locally and run with Node.js

For custom deployments, ensure:
- Node.js 18+ is installed
- Environment variables are set
- Run `npm run build` before starting
- Use a process manager like PM2 for production

---

## 🧪 Available Scripts

| Command | Description | Use Case |
|---|---|---|
| `npm run dev` | Start development server on port 3000 | Local development with hot-reload |
| `npm run build` | Create optimized production build | Before deploying to production |
| `npm start` | Start production server | Run production build locally |
| `npm run lint` | Run ESLint to check code quality | Before committing code |

### Custom Port

Run on a different port:

bash
# Development
npm run dev -- -p 3001

# Production
npm start -- -p 3001


---

## 🔍 Verification

### Test the Setup

1. Start the development server
   bash
   npm run dev
   

2. Open your browser
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - You should see the FairGate landing page

3. Connect your wallet
   - Click "Connect Wallet" in the navigation
   - Select your wallet (Phantom/Solflare)
   - Approve the connection

4. View your dashboard
   - Navigate to Dashboard
   - Your FairScore should load within 1-2 seconds
   - Check that your tier badge displays correctly

### Check API Connection

Test the FairScale API proxy:

bash
# Replace with your actual wallet address
curl "http://localhost:3000/api/score?wallet=YOUR_WALLET_ADDRESS"


Expected response:
json
{
  "wallet": "YOUR_WALLET_ADDRESS",
  "fairscore": 65.5,
  "tier": "gold",
  "badges": [...],
  ...
}


---

## 🐛 Troubleshooting

### "API key not configured" Error

Problem: Missing or invalid FairScale API key.

Solution:
1. Verify `FAIRSCALE_API_KEY` is set in `.env.local`
2. Check for typos or extra spaces
3. Ensure no quotes around the API key
4. Restart the dev server: `Ctrl+C` then `npm run dev`

bash
# Verify the file exists
cat .env.local

# Should show:
# FAIRSCALE_API_KEY=your_key_here


### Wallet Not Connecting

Problem: Wallet extension not detected or connection fails.

Solutions:
- Install extension: Install [Phantom](https://phantom.app/) or [Solflare](https://solflare.com/)
- Enable extension: Check browser extension settings
- Refresh page: Hard refresh with `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check console: Open browser DevTools (F12) and check for errors
- Try different wallet: Switch between Phantom and Solflare

### Port 3000 Already in Use

Problem: Another application is using port 3000.

Solution:
bash
# Option 1: Use a different port
npm run dev -- -p 3001

# Option 2: Kill the process using port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Option 2: Kill the process (Mac/Linux)
lsof -ti:3000 | xargs kill -9


### FairScale API Errors

Problem: API returns 4xx or 5xx errors.

Solutions:
- Invalid wallet address: Ensure the address is a valid Solana public key (base58 encoded)
- Rate limits (429): Wait 60 seconds and retry
- Invalid API key: Double-check your API key at [fairscale.xyz](https://fairscale.xyz)
- Network issues: Check your internet connection

### Build Failures

Problem: `npm run build` fails with errors.

Solutions:
bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build


### TypeScript Errors

Problem: Type checking errors during development.

Solution:
bash
# Check for TypeScript errors
npx tsc --noEmit

# Update TypeScript definitions
npm install --save-dev @types/node @types/react @types/react-dom


### Module Not Found Errors

Problem: Import errors for specific modules.

Solution:
bash
# Reinstall dependencies
npm install

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install


---

## 🎯 Next Steps

Now that your setup is complete:

1. 📖 Read the Integration Guide
   - See [INTEGRATION.md](./INTEGRATION.md) for FairScale API details
   - Learn about hooks, components, and architecture

2. 🎨 Customize the UI
   - Edit [tailwind.config.ts](../tailwind.config.ts) for theme colors
   - Modify components in [src/components/](../src/components/)

3. 🔧 Configure Tiers
   - Adjust tier thresholds in [src/lib/constants.ts](../src/lib/constants.ts)
   - Customize benefits and multipliers

4. 🚀 Explore the App
   - Visit [Dashboard](http://localhost:3000/dashboard) to see your score
   - Browse [Launchpad](http://localhost:3000/launchpad) for token launches
   - Check [Rewards](http://localhost:3000/rewards) for claimable benefits
   - View [Leaderboard](http://localhost:3000/leaderboard) rankings

---

## 📞 Need Help?

If you encounter issues not covered here:

- 📚 Documentation: Check [INTEGRATION.md](./INTEGRATION.md) for API details
- 🐛 GitHub Issues: [Report a bug](https://github.com/yourusername/fairgate/issues)
- 💬 Discord: [Join our community](https://discord.com/invite/EeHKStrxHN)
- 📧 Email: contact@fairgate.xyz

---

## ✅ Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created and configured
- [ ] FairScale API key added
- [ ] Development server running
- [ ] Browser opened to localhost:3000
- [ ] Wallet extension installed
- [ ] Wallet successfully connected
- [ ] Dashboard displays FairScore

---

<div align="center">

Setup complete! 🎉

Ready to build the future of fair token launches.

[← Back to README](../README.md) | [Integration Guide →](./INTEGRATION.md)

</div>

## Project Structure


fairgate/
├── public/images/             # Static assets
├── src/
│   ├── app/                   # Next.js 14 App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── globals.css        # Global styles
│   │   ├── api/               # API proxy routes (server-side)
│   │   │   ├── score/         # Full reputation profile
│   │   │   ├── fairscore/     # Numeric FairScore
│   │   │   └── walletscore/   # Wallet-specific score
│   │   ├── dashboard/         # Reputation dashboard
│   │   ├── launchpad/         # Token launches
│   │   ├── leaderboard/       # Score rankings
│   │   └── rewards/           # Tier-based rewards
│   ├── components/            # React components
│   │   ├── dashboard/         # ScoreCard, FeatureBreakdown, BadgeGrid, TierBadge
│   │   ├── launchpad/         # LaunchCard, ReputationGate
│   │   ├── rewards/           # RewardCard
│   │   ├── wallet/            # WalletProvider, WalletButton
│   │   ├── layout/            # Navbar, Footer, ClientLayout
│   │   └── ui/                # Button, Card, ProgressBar, ThemeToggle, etc.
│   ├── hooks/                 # useFairScore, useReputationGate
│   ├── lib/                   # fairscale.ts, constants.ts, utils.ts
│   └── types/                 # TypeScript type definitions
├── docs/                      # Documentation
│   ├── SETUP.md               # This file
│   └── INTEGRATION.md         # FairScale integration docs
├── .env.example               # Example environment variables
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js


---

## Troubleshooting

### "API key not configured" error
Ensure `FAIRSCALE_API_KEY` is set in `.env.local`. Restart the dev server after changing env vars.

### Wallet not connecting
- Install a Solana wallet extension (Phantom or Solflare)
- Allow the extension to run on localhost
- Refresh the page after installing

### FairScale API errors
- Verify your API key is valid
- Check the wallet address is a valid Solana public key
- Wait and retry on 429 (rate limit) responses

### Build failures
bash
rm -rf .next
npm run build


### Port 3000 in use
bash
npm run dev -- -p 3001


---

## Next Steps

- Read the [Integration Documentation](./INTEGRATION.md) for details on FairScale API usage
- Connect your wallet and explore the [Dashboard](http://localhost:3000/dashboard)
- Browse token launches on the [Launchpad](http://localhost:3000/launchpad)
