import { Tier, TierConfig } from "@/types";
import { TIER_CONFIGS, TIER_ORDER } from "./constants";

export function getTierFromScore(score: number): Tier {
  if (score >= 75) return "platinum";
  if (score >= 50) return "gold";
  if (score >= 25) return "silver";
  return "bronze";
}

export function getTierConfig(tier: Tier): TierConfig {
  return TIER_CONFIGS[tier];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function canAccessTier(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}

export function getTimeRemaining(endDate: string): string {
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const diff = end - now;

  if (diff <= 0) return "Ended";

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getProgressPercentage(raised: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((raised / total) * 100, 100);
}

export function calculateAllocation(
  fairscore: number,
  tier: Tier,
  baseAllocation: number
): number {
  const tierConfig = getTierConfig(tier);
  const scoreMultiplier = 1 + (fairscore / 100) * 0.5;
  return Math.floor(baseAllocation * tierConfig.multiplier * scoreMultiplier);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getScoreColor(score: number): string {
  if (score >= 75) return "text-indigo-400";
  if (score >= 50) return "text-yellow-400";
  if (score >= 25) return "text-gray-300";
  return "text-amber-400";
}

export function getScoreGradient(score: number): string {
  if (score >= 75) return "from-indigo-500 to-purple-500";
  if (score >= 50) return "from-yellow-500 to-amber-500";
  if (score >= 25) return "from-gray-400 to-gray-300";
  return "from-amber-600 to-amber-400";
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
