# 🔌 FairScale Integration Guide

Complete technical documentation for integrating FairScale's reputation API into FairGate.

---

## 📖 Table of Contents

- [Architecture Overview](#architecture-overview)
- [API Proxy Routes](#api-proxy-routes)
- [Client SDK](#client-sdk)
- [React Hooks](#react-hooks)
- [Tier System](#tier-system)
- [Type Definitions](#type-definitions)
- [Component Architecture](#component-architecture)
- [Integration Flow](#integration-flow)
- [Best Practices](#best-practices)
- [Examples](#examples)

---

## 🏗️ Architecture Overview

FairGate uses a secure proxy architecture to protect your FairScale API key while providing seamless client-side access to reputation data.


┌───────────────────────────────────────────────────────────┐
│                    Browser (Client)                       │
│                                                           │
│  ┌─────────────┐                                         │
│  │WalletButton │──► Connects wallet                      │
│  └─────────────┘                                         │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────┐                                     │
│  │ useFairScore()  │──► React hook for state management  │
│  └─────────────────┘                                     │
│         │                                                 │
│         ▼                                                 │
│  ┌─────────────────┐                                     │
│  │ fairscale.ts    │──► Client SDK wrapper               │
│  │                 │    fetch("/api/score?wallet=...")   │
│  └─────────────────┘                                     │
└─────────────┬───────────────────────────────────────────┘
              │ HTTP GET (no API key in request)
              ▼
┌───────────────────────────────────────────────────────────┐
│             Next.js API Routes (Server-Side)              │
│                                                           │
│  /api/score        → FairScale API /score                 │
│  /api/fairscore    → FairScale API /fairScore             │
│  /api/walletscore  → FairScale API /walletScore           │
│                                                           │
│  Request Headers:                                         │
│    { fairkey: process.env.FAIRSCALE_API_KEY }             │
│                                                           │
│  ✅ API key NEVER exposed to browser                      │
└─────────────┬─────────────────────────────────────────────┘
              │ Authenticated request
              ▼
┌───────────────────────────────────────────────────────────┐
│              FairScale External API                       │
│              https:api.fairscale.xyz                    │
└───────────────────────────────────────────────────────────┘


### Key Security Features

- 🔒 Protected API Key: The FairScale API key is stored as FAIRSCALE_API_KEY in .env.local (server-side only)
- 🛡️ Proxy Pattern: All API requests go through Next.js API routes
- 🚫 No Client Exposure: The API key is never sent to the browser
- ✅ Type Safety: Full TypeScript support with validated responses

---

## 🛤️ API Proxy Routes

All proxy routes are located in src/app/api/ and follow Next.js 14 App Router conventions.

### Route: /api/score

Purpose: Fetch complete reputation profile for a wallet

File: src/app/api/score/route.ts

Request:
http
GET /api/score?wallet=<SOLANA_ADDRESS>


Response Type: FairScaleScore

typescript
{
  wallet: string;                     Solana public key
  fairscore_base: number;             Base score (0-100)
  social_score: number;               Social activity score
  fairscore: number;                  Composite final score (0-100)
  tier: "bronze" | "silver" | "gold" | "platinum";
  badges: FairScaleBadge[];           Earned achievement badges
  actions: any[];                     Recent on-chain actions
  timestamp: string;                  ISO 8601 timestamp
  features: FairScaleFeatures;        Detailed on-chain metrics
}


Example:
typescript
const response = await fetch('/api/score?wallet=ABC123...');
const data: FairScaleScore = await response.json();
console.log(data.fairscore);  72.5
console.log(data.tier);       "gold"


---

### Route: /api/fairscore

Purpose: Fetch only the numeric FairScore

File: src/app/api/fairscore/route.ts

Request:
http
GET /api/fairscore?wallet=<SOLANA_ADDRESS>


Response Type: FairScoreResponse

typescript
{
  fair_score: number;   The composite FairScore (0-100)
}


Example:
typescript
const response = await fetch('/api/fairscore?wallet=ABC123...');
const { fair_score } = await response.json();
console.log(fair_score);  72.5


---

### Route: /api/walletscore

Purpose: Fetch wallet-specific on-chain activity score

File: src/app/api/walletscore/route.ts

Request:
http
GET /api/walletscore?wallet=<SOLANA_ADDRESS>


Response Type: WalletScoreResponse

typescript
{
  wallet_score: number;   Wallet activity score (0-100)
}


---

### Error Handling

All API routes return consistent error responses:

| Status Code | Response Body | Cause |
|---|---|---|
| 400 | { "error": "Wallet address is required" } | Missing wallet query parameter |
| 500 | { "error": "API key not configured" } | Missing FAIRSCALE_API_KEY env var |
| 4xx/5xx | { "error": "FairScale API error: <details>" } | Upstream FairScale API error |

Example Error Handling:
typescript
try {
  const response = await fetch(/api/score?wallet=${address});
  if (!response.ok) {
    const { error } = await response.json();
    throw new Error(error);
  }
  const data = await response.json();
} catch (error) {
  console.error('Failed to fetch score:', error);
}


---

## 📚 Client SDK

File: src/lib/fairscale.ts

The client SDK provides typed functions that wrap the API proxy routes.

### Functions

#### getFullScore(wallet: string): Promise<FairScaleScore>

Fetches complete reputation profile including score, tier, badges, and features.

typescript
import { getFullScore } from "@/lib/fairscale";

const score = await getFullScore("WALLET_ADDRESS");
console.log(score.fairscore);      72.5
console.log(score.tier);           "gold"
console.log(score.badges.length);  5
console.log(score.features);       { lst_percentile_score: 0.75, ... }


#### getFairScore(wallet: string): Promise<FairScoreResponse>

Fetches only the numeric FairScore.

typescript
import { getFairScore } from "@/lib/fairscale";

const { fair_score } = await getFairScore("WALLET_ADDRESS");
console.log(fair_score);  72.5


#### getWalletScore(wallet: string): Promise<WalletScoreResponse>

Fetches wallet activity score.

typescript
import { getWalletScore } from "@/lib/fairscale";

const { wallet_score } = await getWalletScore("WALLET_ADDRESS");
console.log(wallet_score);  68.3


### Error Handling

All SDK functions throw errors for non-OK responses:

typescript
try {
  const score = await getFullScore(wallet);
   Process score
} catch (error) {
  if (error.message.includes('Wallet address is required')) {
     Handle missing wallet
  } else if (error.message.includes('API key not configured')) {
     Handle missing API key
  } else {
     Handle other errors
  }
}


---

## 🎣 React Hooks

### useFairScore()

File: src/hooks/useFairScore.ts

Manages the complete lifecycle of fetching and storing wallet reputation data.

#### Usage

typescript
import { useFairScore } from "@/hooks/useFairScore";

function DashboardComponent() {
  const { score, loading, error, fetchScore, reset } = useFairScore();

   Fetch score when wallet connects
  useEffect(() => {
    if (walletAddress) {
      fetchScore(walletAddress);
    }
  }, [walletAddress]);

  if (loading) return <p>Loading your reputation...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!score) return <p>Connect your wallet to view your score</p>;

  return (
    <div>
      <h2>FairScore: {score.fairscore}</h2>
      <p>Tier: {score.tier}</p>
      <p>Badges: {score.badges.length}</p>
    </div>
  );
}


#### Return Values

| Property | Type | Description |
|---|---|---|
| score | FairScaleScore \| null | Complete score data or null if not fetched |
| loading | boolean | true while API request is in progress |
| error | string \| null | Error message if request failed |
| fetchScore | (wallet: string) => Promise<void> | Function to trigger score fetch |
| reset | () => void | Reset state to initial values |

#### State Management

typescript
 Initial state
score: null
loading: false
error: null

 During fetch
score: null
loading: true
error: null

 Success
score: { fairscore: 72.5, tier: "gold", ... }
loading: false
error: null

 Error
score: null
loading: false
error: "Wallet address is required"


---

### useReputationGate()

File: src/hooks/useReputationGate.ts

Determines whether a user's tier meets a required threshold for accessing gated content.

#### Usage

typescript
import { useReputationGate } from "@/hooks/useReputationGate";

function LaunchCard({ launch }) {
  const userTier = "silver";  From user's score
  const { hasAccess, message, tierConfig } = useReputationGate(
    userTier,
    launch.requiredTier
  );

  return (
    <div>
      <h3>{launch.name}</h3>
      {hasAccess ? (
        <button>Participate</button>
      ) : (
        <div className="text-red-500">
          <p>{message}</p>
          <p>Required: {tierConfig?.name}</p>
        </div>
      )}
    </div>
  );
}


#### Return Values

| Property | Type | Description |
|---|---|---|
| hasAccess | boolean | Whether user meets tier requirement |
| userTierLevel | number | Numeric level of user's tier (0-3) |
| requiredTierLevel | number | Numeric level of required tier (0-3) |
| tierConfig | TierConfig \| null | Configuration for required tier |
| message | string | Human-readable access status |

#### Tier Levels

typescript
bronze   → 0
silver   → 1
gold     → 2
platinum → 3


#### Example Messages

typescript
 User has access
"You have Gold tier access"

 User lacks access
"Requires Gold tier or above. You are currently Silver."

 No user tier
"Connect your wallet to check access"


---

## 🎯 Tier System

FairGate uses a four-tier reputation system defined in src/lib/constants.ts.

### Tier Configuration

typescript
export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  bronze: {
    name: "Bronze",
    minScore: 0,
    maxScore: 24,
    color: "#CD7F32",
    bgColor: "bg-orange-900/20",
    borderColor: "border-orange-600",
    textColor: "text-orange-400",
    icon: "🥉",
    multiplier: 1.0,
    benefits: [
      "Basic platform access",
      "View all token launches",
      "Standard support"
    ]
  },
  silver: {
    name: "Silver",
    minScore: 25,
    maxScore: 49,
    color: "#C0C0C0",
    multiplier: 1.25,
    benefits: [
      "Early access to select launches",
      "Priority customer support",
      "1.25x reward multiplier"
    ]
  },
  gold: {
    name: "Gold",
    minScore: 50,
    maxScore: 74,
    multiplier: 1.75,
    benefits: [
      "Access to all token launches",
      "Exclusive airdrop eligibility",
      "Governance voting rights",
      "1.75x reward multiplier"
    ]
  },
  platinum: {
    name: "Platinum",
    minScore: 75,
    maxScore: 100,
    multiplier: 2.5,
    benefits: [
      "Guaranteed allocations",
      "VIP rewards & perks",
      "Advisory board access",
      "2.5x reward multiplier",
      "Early access to all launches"
    ]
  }
};


### Tier Resolution

Function: getTierFromScore(score: number): Tier

File: src/lib/utils.ts

typescript
export function getTierFromScore(score: number): Tier {
  if (score >= 75) return "platinum";
  if (score >= 50) return "gold";
  if (score >= 25) return "silver";
  return "bronze";
}


Examples:
typescript
getTierFromScore(10);   "bronze"
getTierFromScore(35);   "silver"
getTierFromScore(68);   "gold"
getTierFromScore(92);   "platinum"


### Allocation Calculation

Allocations factor in both tier multiplier and raw score:

typescript
export function calculateAllocation(
  fairscore: number,
  tier: Tier,
  baseAllocation: number
): number {
  const tierConfig = getTierConfig(tier);
  
   Score multiplier: 1.0 to 1.5 based on score
  const scoreMultiplier = 1 + (fairscore / 100) * 0.5;
  
   Final allocation = base × tier multiplier × score multiplier
  return Math.floor(
    baseAllocation * tierConfig.multiplier * scoreMultiplier
  );
}


Example:
typescript
 Gold tier (1.75x), score 65, base allocation 1000 tokens
const allocation = calculateAllocation(65, "gold", 1000);
 1000 × 1.75 × 1.325 = 2318 tokens


---

## 📘 Type Definitions

File: src/types/index.ts

### Core Types

typescript
 Tier enum
export type Tier = "bronze" | "silver" | "gold" | "platinum";

 Complete FairScale score response
export interface FairScaleScore {
  wallet: string;
  fairscore_base: number;
  social_score: number;
  fairscore: number;
  tier: Tier;
  badges: FairScaleBadge[];
  actions: any[];
  timestamp: string;
  features: FairScaleFeatures;
}

 On-chain feature metrics
export interface FairScaleFeatures {
  lst_percentile_score: number;       Liquid staking tokens
  major_percentile_score: number;     Major token holdings
  native_sol_percentile: number;      Native SOL balance
  stable_percentile_score: number;    Stablecoin holdings
  tx_count: number;                   Total transactions
  active_days: number;                Days with activity
  median_gap_hours: number;           Median time between txs
  wallet_age_days: number;            Wallet age in days
}

 Achievement badge
export interface FairScaleBadge {
  id: string;
  label: string;
  description: string;
  tier: Tier;
}

 Simple score responses
export interface FairScoreResponse {
  fair_score: number;
}

export interface WalletScoreResponse {
  wallet_score: number;
}

 Tier configuration
export interface TierConfig {
  name: string;
  minScore: number;
  maxScore: number;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  gradientFrom: string;
  gradientTo: string;
  icon: string;
  multiplier: number;
  benefits: string[];
}

 Application types
export interface LaunchProject {
  id: string;
  name: string;
  description: string;
  totalRaise: number;
  currentRaise: number;
  requiredTier: Tier;
  status: "active" | "upcoming" | "completed";
  participants: number;
  tokenSymbol: string;
  launchDate: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  requiredTier: Tier;
  requiredScore: number;
  type: "airdrop" | "multiplier" | "nft" | "access";
  claimed: boolean;
  value: string;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  fairscore: number;
  tier: Tier;
  badges: number;
}


---

## 🧩 Component Architecture

### Layout Components

ClientLayout — Root layout wrapper
- Provides WalletProvider context
- Includes Navbar, Footer, CursorGlow
- Manages theme state

Navbar — Top navigation
- Navigation links
- WalletButton for connection
- ThemeToggle for dark/light mode

Footer — Site footer
- Branding and links
- Social media icons

### Dashboard Components

ScoreCard — Main score display
- Circular progress animation
- Tier badge
- Score value with animations

FeatureBreakdown — Feature chart
- Radar or bar chart
- Shows percentile scores for each feature
- Interactive tooltips

BadgeGrid — Achievement badges
- Grid layout
- Badge icons with tooltips
- Tier-color coded

TierBadge — Tier indicator
- Visual badge with gradient
- Tier name and icon
- Responsive sizing

### Launchpad Components

LaunchCard — Project card
- Project details
- Progress bar for raise
- Tier requirement badge
- Participate button (gated)

ReputationGate — Access control
- Conditional rendering based on tier
- Shows requirement if access denied
- Props: userTier, requiredTier, children

### Wallet Components

WalletProvider — Context provider
- Configures Solana wallet adapters
- Network selection
- RPC endpoint

WalletButton — Connection button
- Connect/disconnect functionality
- Shows wallet address when connected
- Triggers fetchScore on connection

---

## 🔄 Integration Flow


┌────────────────────────────────────────────────────────┐
│ Step 1: User connects wallet                          │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 2: WalletButton detects connection               │
│         Triggers fetchScore(walletAddress)             │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 3: useFairScore hook makes API request           │
│         Calls fairscale.getFullScore(wallet)           │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 4: Client SDK calls /api/score?wallet=...        │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 5: API route adds FAIRSCALE_API_KEY header       │
│         Forwards request to FairScale API              │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 6: FairScale returns reputation data              │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 7: Score stored in useFairScore state            │
│         Tier computed via getTierFromScore()           │
└────────────────┬───────────────────────────────────────┘
                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│ Step 8: UI updates with score data                    │
│  ├─► Dashboard: ScoreCard, FeatureBreakdown, Badges   │
│  ├─► Launchpad: useReputationGate() checks access     │
│  ├─► Rewards: Filters by tier & score                 │
│  └─► Leaderboard: Displays user rank                  │
└────────────────────────────────────────────────────────┘


---

## ✅ Best Practices

### Security

1. Never expose API key to client
   typescript
    ❌ WRONG - Don't do this
   const apiKey = "your_key";
   fetch(https:api.fairscale.xyz/score?wallet=${wallet}, {
     headers: { fairkey: apiKey }
   });

    ✅ CORRECT - Use proxy route
   fetch(/api/score?wallet=${wallet});
   

2. Validate wallet addresses
   typescript
   import { PublicKey } from "@solana/web3.js";
   
   function isValidWallet(address: string): boolean {
     try {
       new PublicKey(address);
       return true;
     } catch {
       return false;
     }
   }
   

### Performance

1. Cache scores when appropriate
   typescript
   const [scoreCache, setScoreCache] = useState<Map<string, FairScaleScore>>(new Map());
   
   async function fetchScoreWithCache(wallet: string) {
     if (scoreCache.has(wallet)) {
       return scoreCache.get(wallet);
     }
     const score = await getFullScore(wallet);
     setScoreCache(prev => new Map(prev).set(wallet, score));
     return score;
   }
   

2. Debounce API calls
   typescript
   const debouncedFetchScore = useMemo(
     () => debounce(fetchScore, 500),
     [fetchScore]
   );
   

### Error Handling

1. Provide user-friendly error messages
   typescript
   if (error) {
     const userMessage = error.includes('API key')
       ? 'Service temporarily unavailable'
       : error.includes('required')
       ? 'Please connect your wallet'
       : 'Failed to load reputation data';
     
     return <Alert>{userMessage}</Alert>;
   }
   

2. Implement retry logic
   typescript
   async function fetchWithRetry(wallet: string, retries = 3) {
     for (let i = 0; i < retries; i++) {
       try {
         return await getFullScore(wallet);
       } catch (error) {
         if (i === retries - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
       }
     }
   }
   

---

## 💡 Examples

### Complete Dashboard Integration

typescript
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { FeatureBreakdown } from "@/components/dashboard/FeatureBreakdown";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { score, loading, error, fetchScore } = useFairScore();

  useEffect(() => {
    if (publicKey) {
      fetchScore(publicKey.toString());
    }
  }, [publicKey, fetchScore]);

  if (!publicKey) {
    return <ConnectWalletPrompt />;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!score) {
    return null;
  }

  return (
    <div className="space-y-6">
      <ScoreCard score={score} />
      <FeatureBreakdown features={score.features} />
      <BadgeGrid badges={score.badges} />
    </div>
  );
}


### Gated Launch Participation

typescript
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { useReputationGate } from "@/hooks/useReputationGate";
import { LaunchCard } from "@/components/launchpad/LaunchCard";

export default function LaunchpadPage() {
  const { publicKey } = useWallet();
  const { score } = useFairScore();
  
  const launches = [
    {
      id: "1",
      name: "SolanaSwap Token",
      requiredTier: "gold",
      totalRaise: 1000000,
       ...
    },
     ...more launches
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {launches.map(launch => {
        const { hasAccess, message } = useReputationGate(
          score?.tier,
          launch.requiredTier
        );

        return (
          <LaunchCard
            key={launch.id}
            launch={launch}
            hasAccess={hasAccess}
            gateMessage={message}
          />
        );
      })}
    </div>
  );
}


### Dynamic Allocation Display

typescript
import { calculateAllocation } from "@/lib/utils";

function AllocationDisplay({ fairscore, tier, baseAllocation }) {
  const userAllocation = calculateAllocation(fairscore, tier, baseAllocation);
  const tierConfig = getTierConfig(tier);

  return (
    <div>
      <p>Base Allocation: {baseAllocation.toLocaleString()} tokens</p>
      <p>Your Tier: {tierConfig.name} ({tierConfig.multiplier}x)</p>
      <p>Your Score Bonus: {(fairscore / 100 * 0.5 + 1).toFixed(2)}x</p>
      <p className="font-bold text-lg">
        Your Allocation: {userAllocation.toLocaleString()} tokens
      </p>
    </div>
  );
}


---

## 🔗 Additional Resources

- FairScale API Docs: [fairscale.xyz/docs](https:fairscale.xyz/docs)
- Solana Web3.js: [solana-labs.github.io/solana-web3.js](https:solana-labs.github.io/solana-web3.js/)
- Next.js API Routes: [nextjs.org/docs/app/building-your-application/routing/route-handlers](https:nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 📞 Support

Need help with integration?

- 📖 Setup Guide: [SETUP.md](./SETUP.md)
- 🐛 Issues: [github.com/yourusername/fairgate/issues](https:github.com/yourusername/fairgate/issues)
- 💬 Discord: [discord.com/invite/EeHKStrxHN](https:discord.com/invite/EeHKStrxHN)
- 📧 Email: dev@fairgate.xyz

---

<div align="center">

Integration complete! 🎉

[← Setup Guide](./SETUP.md) | [Back to README →](../README.md)

</div>

Response shape (WalletScoreResponse):
json
{
  "wallet_score": 65.2
}


### Error Responses

All endpoints return consistent error responses:

| Status | Body | Cause |
|---|---|---|
| 400 | { "error": "Wallet address is required" } | Missing wallet query param |
| 500 | { "error": "API key not configured" } | Missing FAIRSCALE_API_KEY env var |
| 4xx/5xx | { "error": "FairScale API error: <details>" } | Upstream FairScale error |

---

## Client-Side SDK Wrapper

File: src/lib/fairscale.ts

Typed functions that call the local API proxy routes:

typescript
import { getFullScore, getFairScore, getWalletScore } from "@/lib/fairscale";

 Get complete reputation profile
const fullScore: FairScaleScore = await getFullScore("WALLET_ADDRESS");

 Get just the numeric FairScore
const fairScore: FairScoreResponse = await getFairScore("WALLET_ADDRESS");

 Get wallet-specific score
const walletScore: WalletScoreResponse = await getWalletScore("WALLET_ADDRESS");


All functions throw on non-OK HTTP responses with descriptive error messages.

---

## React Hooks

### useFairScore()

File: src/hooks/useFairScore.ts

Manages the full lifecycle of fetching and storing a wallet's FairScore.

typescript
import { useFairScore } from "@/hooks/useFairScore";

function MyComponent() {
  const { score, loading, error, fetchScore, reset } = useFairScore();

  await fetchScore("WALLET_ADDRESS");

  score.fairscore;     number
  score.tier;          "bronze" | "silver" | "gold" | "platinum"
  score.badges;        FairScaleBadge[]
  score.features;      FairScaleFeatures

  reset();  clear state
}


| Property | Type | Description |
|---|---|---|
| score | FairScaleScore \| null | Full score data or null if not yet fetched |
| loading | boolean | True while the API request is in flight |
| error | string \| null | Error message if the request failed |
| fetchScore | (wallet: string) => Promise<void> | Triggers a score fetch |
| reset | () => void | Resets state to initial values |

### useReputationGate()

File: src/hooks/useReputationGate.ts

Determines whether a user's tier meets a required tier threshold.

typescript
import { useReputationGate } from "@/hooks/useReputationGate";

function LaunchDetail({ requiredTier }: { requiredTier: Tier }) {
  const { hasAccess, message } = useReputationGate(userTier, requiredTier);

  if (!hasAccess) {
    return <p>{message}</p>;
  }
  return <ParticipateButton />;
}


| Property | Type | Description |
|---|---|---|
| hasAccess | boolean | Whether the user meets the tier requirement |
| userTierLevel | number | Numeric level of the user's tier (0–3) |
| requiredTierLevel | number | Numeric level of the required tier (0–3) |
| tierConfig | TierConfig \| null | Configuration object for the required tier |
| message | string | Human-readable access status message |

---

## Tier System

FairGate maps FairScores to four tiers:

| Tier | Score Range | Multiplier | Key Benefits |
|---|---|---|---|
| 🥉 Bronze | 0 – 24 | 1.0x | Basic access, view listings |
| 🥈 Silver | 25 – 49 | 1.25x | Early access to select launches, priority support |
| 🥇 Gold | 50 – 74 | 1.75x | All launches, exclusive airdrops, governance voting |
| 💎 Platinum | 75 – 100 | 2.5x | Guaranteed allocation, VIP rewards, advisory access |

Tier resolution (src/lib/utils.ts):

typescript
function getTierFromScore(score: number): Tier {
  if (score >= 75) return "platinum";
  if (score >= 50) return "gold";
  if (score >= 25) return "silver";
  return "bronze";
}


Allocation calculation:

typescript
function calculateAllocation(fairscore: number, tier: Tier, baseAllocation: number): number {
  const tierConfig = getTierConfig(tier);
  const scoreMultiplier = 1 + (fairscore / 100) * 0.5;
  return Math.floor(baseAllocation * tierConfig.multiplier * scoreMultiplier);
}


---

## Integration Flow


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

## Type Definitions

All types are defined in src/types/index.ts:

typescript
 Core FairScale types
FairScaleScore         Full score response from /api/score
FairScaleFeatures      On-chain metric breakdown
FairScaleBadge         Achievement badge
FairScoreResponse      Response from /api/fairscore
WalletScoreResponse    Response from /api/walletscore

 Application types
Tier                   "bronze" | "silver" | "gold" | "platinum"
TierConfig             Tier display & logic configuration
LaunchProject          Token launch project data
Reward                 Claimable reward data
LeaderboardEntry       Leaderboard row data


---

## Component Architecture

### Layout
- ClientLayout — WalletProvider, theme, Navbar, Footer, CursorGlow
- Navbar — Navigation + wallet connect
- Footer — Site footer

### Dashboard
- ScoreCard — FairScore display with animated progress
- FeatureBreakdown — On-chain feature chart
- BadgeGrid — Achievement badges
- TierBadge — Tier indicator

### Launchpad
- LaunchCard — Project card with raise progress
- ReputationGate — Tier-based access gate

### Wallet
- WalletProvider — Solana wallet adapter context
- WalletButton — Connect/disconnect button

### UI Primitives
- Button, Card, ProgressBar, ThemeToggle, CursorGlow, Logo
