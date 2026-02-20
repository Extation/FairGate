"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { Card } from "@/components/ui/Card";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { WalletButton } from "@/components/wallet/WalletButton";
import { shortenAddress, cn } from "@/lib/utils";
import { LeaderboardEntry, Tier } from "@/types";

// ── Mock leaderboard data per timeframe ──────────────────────────────

const MOCK_ALL_TIME: LeaderboardEntry[] = [
  { rank: 1, wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", fairscore: 94.2, tier: "platinum", badges: 12, change: 2 },
  { rank: 2, wallet: "DRpbCBMxVnDK7maPMoGQfFiDgAYH9n1JYnMKKPNBs8Rx", fairscore: 91.8, tier: "platinum", badges: 10, change: -1 },
  { rank: 3, wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", fairscore: 88.5, tier: "platinum", badges: 9, change: 1 },
  { rank: 4, wallet: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", fairscore: 82.1, tier: "platinum", badges: 8, change: 0 },
  { rank: 5, wallet: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", fairscore: 76.3, tier: "platinum", badges: 7, change: 3 },
  { rank: 6, wallet: "4Nd1mBQtrMJVYVfKf2PJy9NZUZdTAsp7D4xWLs4gDB4T", fairscore: 71.9, tier: "gold", badges: 7, change: -2 },
  { rank: 7, wallet: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", fairscore: 68.4, tier: "gold", badges: 6, change: 1 },
  { rank: 8, wallet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", fairscore: 65.2, tier: "gold", badges: 5, change: 0 },
  { rank: 9, wallet: "So11111111111111111111111111111111111111112", fairscore: 61.7, tier: "gold", badges: 5, change: -1 },
  { rank: 10, wallet: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", fairscore: 58.3, tier: "gold", badges: 4, change: 2 },
  { rank: 11, wallet: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", fairscore: 52.1, tier: "gold", badges: 4, change: 0 },
  { rank: 12, wallet: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj", fairscore: 48.6, tier: "silver", badges: 3, change: -3 },
  { rank: 13, wallet: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", fairscore: 44.2, tier: "silver", badges: 3, change: 1 },
  { rank: 14, wallet: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", fairscore: 39.8, tier: "silver", badges: 2, change: 0 },
  { rank: 15, wallet: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE", fairscore: 35.1, tier: "silver", badges: 2, change: -1 },
];

const MOCK_MONTHLY: LeaderboardEntry[] = [
  { rank: 1, wallet: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", fairscore: 89.7, tier: "platinum", badges: 9, change: 5, streak: 3 },
  { rank: 2, wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", fairscore: 87.3, tier: "platinum", badges: 11, change: -1, streak: 6 },
  { rank: 3, wallet: "DRpbCBMxVnDK7maPMoGQfFiDgAYH9n1JYnMKKPNBs8Rx", fairscore: 85.1, tier: "platinum", badges: 10, change: 0, streak: 4 },
  { rank: 4, wallet: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", fairscore: 78.4, tier: "platinum", badges: 6, change: 8, streak: 1 },
  { rank: 5, wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", fairscore: 76.9, tier: "platinum", badges: 8, change: -2, streak: 5 },
  { rank: 6, wallet: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", fairscore: 72.3, tier: "gold", badges: 7, change: 3, streak: 2 },
  { rank: 7, wallet: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", fairscore: 69.8, tier: "gold", badges: 7, change: -4, streak: 2 },
  { rank: 8, wallet: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", fairscore: 66.5, tier: "gold", badges: 5, change: 6, streak: 1 },
  { rank: 9, wallet: "4Nd1mBQtrMJVYVfKf2PJy9NZUZdTAsp7D4xWLs4gDB4T", fairscore: 63.1, tier: "gold", badges: 6, change: -3, streak: 1 },
  { rank: 10, wallet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", fairscore: 59.7, tier: "gold", badges: 5, change: 1, streak: 3 },
  { rank: 11, wallet: "So11111111111111111111111111111111111111112", fairscore: 54.2, tier: "gold", badges: 4, change: -2, streak: 1 },
  { rank: 12, wallet: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", fairscore: 49.8, tier: "silver", badges: 4, change: 0, streak: 2 },
  { rank: 13, wallet: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj", fairscore: 45.3, tier: "silver", badges: 3, change: -1, streak: 1 },
  { rank: 14, wallet: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", fairscore: 41.6, tier: "silver", badges: 3, change: 2, streak: 1 },
  { rank: 15, wallet: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE", fairscore: 37.2, tier: "silver", badges: 2, change: -1, streak: 1 },
];

const MOCK_WEEKLY: LeaderboardEntry[] = [
  { rank: 1, wallet: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So", fairscore: 92.1, tier: "platinum", badges: 7, change: 12, streak: 2 },
  { rank: 2, wallet: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", fairscore: 86.4, tier: "platinum", badges: 6, change: 9, streak: 1 },
  { rank: 3, wallet: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", fairscore: 84.8, tier: "platinum", badges: 8, change: 4, streak: 3 },
  { rank: 4, wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", fairscore: 82.5, tier: "platinum", badges: 10, change: -3, streak: 8 },
  { rank: 5, wallet: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL", fairscore: 79.2, tier: "platinum", badges: 7, change: 5, streak: 2 },
  { rank: 6, wallet: "DRpbCBMxVnDK7maPMoGQfFiDgAYH9n1JYnMKKPNBs8Rx", fairscore: 74.6, tier: "gold", badges: 9, change: -4, streak: 3 },
  { rank: 7, wallet: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN", fairscore: 71.3, tier: "gold", badges: 4, change: 10, streak: 1 },
  { rank: 8, wallet: "5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1", fairscore: 68.9, tier: "gold", badges: 7, change: -5, streak: 4 },
  { rank: 9, wallet: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", fairscore: 64.1, tier: "gold", badges: 5, change: 2, streak: 2 },
  { rank: 10, wallet: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", fairscore: 60.7, tier: "gold", badges: 6, change: -6, streak: 1 },
  { rank: 11, wallet: "4Nd1mBQtrMJVYVfKf2PJy9NZUZdTAsp7D4xWLs4gDB4T", fairscore: 55.3, tier: "gold", badges: 5, change: -5, streak: 1 },
  { rank: 12, wallet: "So11111111111111111111111111111111111111112", fairscore: 50.8, tier: "gold", badges: 4, change: -3, streak: 1 },
  { rank: 13, wallet: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", fairscore: 46.4, tier: "silver", badges: 3, change: 0, streak: 1 },
  { rank: 14, wallet: "7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj", fairscore: 42.1, tier: "silver", badges: 3, change: 1, streak: 1 },
  { rank: 15, wallet: "orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE", fairscore: 38.5, tier: "silver", badges: 2, change: -2, streak: 1 },
];

// ── Helper: get data for selected timeframe ──────────────────────────

function getLeaderboardData(timeframe: "all" | "monthly" | "weekly"): LeaderboardEntry[] {
  switch (timeframe) {
    case "monthly":
      return MOCK_MONTHLY;
    case "weekly":
      return MOCK_WEEKLY;
    default:
      return MOCK_ALL_TIME;
  }
}

function getTimeframeLabel(timeframe: "all" | "monthly" | "weekly"): string {
  switch (timeframe) {
    case "monthly":
      return "This Month";
    case "weekly":
      return "This Week";
    default:
      return "All Time";
  }
}

// ── Component ────────────────────────────────────────────────────────

const LeaderboardPage: FC = () => {
  const { publicKey, connected } = useWallet();
  const { score, fetchScore } = useFairScore();
  const [timeframe, setTimeframe] = useState<"all" | "monthly" | "weekly">("all");

  useEffect(() => {
    if (connected && publicKey) {
      fetchScore(publicKey.toBase58());
    }
  }, [connected, publicKey, fetchScore]);

  const leaderboardData = useMemo(() => getLeaderboardData(timeframe), [timeframe]);

  const userRank = connected && score
    ? leaderboardData.findIndex((e) => e.fairscore <= score.fairscore) + 1 || leaderboardData.length + 1
    : null;

  // ── Computed stats ───────────────────────────────────────────────
  const stats = useMemo(() => {
    const topScore = leaderboardData[0]?.fairscore ?? 0;
    const mostImproved = [...leaderboardData].sort((a, b) => b.change - a.change)[0];
    const activeWallets = leaderboardData.length;

    return {
      topScore,
      mostImproved,
      activeWallets,
    };
  }, [leaderboardData]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
          FairGate Leaderboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          See where you rank among the most reputable wallets in the ecosystem
        </p>
      </div>

      {/* Connect Wallet CTA */}
      {!connected && (
        <Card className="p-8 text-center space-y-4 border-purple-500/20">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join the Competition</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Connect your wallet to see your rank and compete for the top position
          </p>
          <WalletButton />
        </Card>
      )}

      {/* Timeframe Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setTimeframe("all")}
          className={cn(
            "px-6 py-2.5 rounded-lg font-medium transition-all duration-200",
            timeframe === "all"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          All Time
        </button>
        <button
          onClick={() => setTimeframe("monthly")}
          className={cn(
            "px-6 py-2.5 rounded-lg font-medium transition-all duration-200",
            timeframe === "monthly"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          Monthly
        </button>
        <button
          onClick={() => setTimeframe("weekly")}
          className={cn(
            "px-6 py-2.5 rounded-lg font-medium transition-all duration-200",
            timeframe === "weekly"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50"
              : "bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-300"
          )}
        >
          Weekly
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 space-y-2 border-purple-500/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Top Score ({getTimeframeLabel(timeframe)})</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.topScore.toFixed(1)}</div>
        </Card>
        <Card className="p-6 space-y-2 border-pink-500/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Most Improved</div>
          <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">
            {stats.mostImproved ? `+${stats.mostImproved.change}` : "N/A"}
          </div>
          {stats.mostImproved && (
            <div className="text-xs text-gray-500 dark:text-gray-500 truncate">
              {shortenAddress(stats.mostImproved.wallet)}
            </div>
          )}
        </Card>
        <Card className="p-6 space-y-2 border-blue-500/20">
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Wallets</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.activeWallets}</div>
        </Card>
      </div>

      {/* User Position (if connected) */}
      {connected && score && userRank && (
        <Card className="p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Position</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">#{userRank}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Score</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{score.fairscore.toFixed(1)}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Tier</div>
              <TierBadge tier={score.tier} size="lg" />
            </div>
          </div>
        </Card>
      )}

      {/* Leaderboard Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-800">
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Rank</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Wallet</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Score</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Tier</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Badges</th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Change</th>
                {timeframe !== "all" && (
                  <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-400">Streak</th>
                )}
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, idx) => {
                const isUser = connected && publicKey && entry.wallet === publicKey.toBase58();
                const isMostImproved = timeframe !== "all" && entry.wallet === stats.mostImproved?.wallet;

                return (
                  <tr
                    key={entry.wallet}
                    className={cn(
                      "border-b border-gray-200 dark:border-gray-800/50 transition-colors",
                      isUser && "bg-purple-100 dark:bg-purple-900/20",
                      isMostImproved && "bg-gradient-to-r from-pink-100/50 dark:from-pink-900/10 to-transparent"
                    )}
                  >
                    {/* Rank */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                        {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                        {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                        <span className={cn(
                          "font-bold text-gray-900 dark:text-white",
                          entry.rank <= 3 ? "text-xl" : "text-base"
                        )}>
                          #{entry.rank}
                        </span>
                        {isMostImproved && (
                          <span className="text-xs bg-pink-200 dark:bg-pink-500/20 text-pink-700 dark:text-pink-400 px-2 py-0.5 rounded-full">
                            Most Improved
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Wallet */}
                    <td className="px-4 py-4 font-mono text-sm">
                      {isUser ? (
                        <span className="text-purple-700 dark:text-purple-400 font-semibold">
                          {shortenAddress(entry.wallet)} (You)
                        </span>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{shortenAddress(entry.wallet)}</span>
                      )}
                    </td>

                    {/* Score */}
                    <td className="px-4 py-4">
                      <span className="font-bold text-lg text-gray-900 dark:text-white">{entry.fairscore.toFixed(1)}</span>
                    </td>

                    {/* Tier */}
                    <td className="px-4 py-4">
                      <TierBadge tier={entry.tier} />
                    </td>

                    {/* Badges */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">🏅</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.badges}</span>
                      </div>
                    </td>

                    {/* Change */}
                    <td className="px-4 py-4">
                      <div className={cn(
                        "flex items-center gap-1 font-semibold",
                        entry.change > 0 && "text-green-600 dark:text-green-400",
                        entry.change < 0 && "text-red-600 dark:text-red-400",
                        entry.change === 0 && "text-gray-500 dark:text-gray-500"
                      )}>
                        {entry.change > 0 && "↑"}
                        {entry.change < 0 && "↓"}
                        {entry.change === 0 && "−"}
                        <span>{Math.abs(entry.change)}</span>
                      </div>
                    </td>

                    {/* Streak (weekly/monthly only) */}
                    {timeframe !== "all" && (
                      <td className="px-4 py-4">
                        {entry.streak ? (
                          <div className="flex items-center gap-1">
                            <span className="text-orange-400">🔥</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{entry.streak}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 dark:text-gray-600">−</span>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Info Footer */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-500 space-y-2">
        <p>Rankings updated every hour</p>
        <p>
          {timeframe === "all" && "Showing all-time reputation scores"}
          {timeframe === "monthly" && "Showing performance for this month"}
          {timeframe === "weekly" && "Showing performance for this week"}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
