// FairScale API Types
export interface FairScaleBadge {
  id: string;
  label: string;
  description: string;
  tier: "bronze" | "silver" | "gold" | "platinum";
}

export interface FairScaleFeatures {
  lst_percentile_score: number;
  major_percentile_score: number;
  native_sol_percentile: number;
  stable_percentile_score: number;
  tx_count: number;
  active_days: number;
  median_gap_hours: number;
  wallet_age_days: number;
  [key: string]: number;
}

export interface FairScaleScore {
  wallet: string;
  fairscore_base: number;
  social_score: number;
  fairscore: number;
  tier: "bronze" | "silver" | "gold" | "platinum";
  badges: FairScaleBadge[];
  actions: any[];
  timestamp: string;
  features: FairScaleFeatures;
}

export interface FairScoreResponse {
  fair_score: number;
}

export interface WalletScoreResponse {
  wallet_score: number;
}

// Application Types
export type Tier = "bronze" | "silver" | "gold" | "platinum";

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

export interface LaunchProject {
  id: string;
  name: string;
  symbol: string;
  description: string;
  logo: string;
  website: string;
  twitter: string;
  minTier: Tier;
  totalRaise: number;
  tokenPrice: number;
  totalTokens: number;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed" | "cancelled";
  participants: number;
  raised: number;
  chain: string;
  tags: string[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  type: "airdrop" | "multiplier" | "access" | "nft";
  minTier: Tier;
  minScore: number;
  value: string;
  claimed: boolean;
  expiresAt: string;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  wallet: string;
  fairscore: number;
  tier: Tier;
  badges: number;
  change: number;
  streak?: number;
}
