"use client";

import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { ScoreCard } from "@/components/dashboard/ScoreCard";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { BadgeGrid } from "@/components/dashboard/BadgeGrid";
import { FeatureBreakdown } from "@/components/dashboard/FeatureBreakdown";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WalletButton } from "@/components/wallet/WalletButton";
import { TIER_CONFIGS } from "@/lib/constants";
import { shortenAddress, formatDateTime } from "@/lib/utils";

const DashboardPage: FC = () => {
  const { publicKey, connected } = useWallet();
  const { score, loading, error, fetchScore } = useFairScore();

  useEffect(() => {
    if (connected && publicKey) {
      fetchScore(publicKey.toBase58());
    }
  }, [connected, publicKey, fetchScore]);

  if (!connected) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
            Connect your Solana wallet to view your FairScore dashboard and
            access reputation-gated features.
          </p>
          <WalletButton />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-6">⏳</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Analyzing Your Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching your FairScore from the blockchain...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Score
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <Button onClick={() => publicKey && fetchScore(publicKey.toBase58())}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!score) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="text-6xl mb-6">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Score Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn&apos;t find score data for your wallet. This might be a new
            wallet with limited on-chain activity.
          </p>
          <Button onClick={() => publicKey && fetchScore(publicKey.toBase58())}>
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  const tierConfig = TIER_CONFIGS[score.tier];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {shortenAddress(score.wallet, 6)}
            </span>
            <TierBadge tier={score.tier} showMultiplier />
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <span className="text-gray-500 dark:text-gray-500 text-xs">
            Last updated: {formatDateTime(score.timestamp)}
          </span>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => publicKey && fetchScore(publicKey.toBase58())}
          >
            ↻ Refresh
          </Button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ScoreCard
          label="FairScore"
          score={score.fairscore}
          icon="🏆"
          description="Combined wallet + social reputation score"
        />
        <ScoreCard
          label="Wallet Score"
          score={score.fairscore_base}
          icon="💼"
          description="Based on on-chain activity and holdings"
        />
        <ScoreCard
          label="Social Score"
          score={score.social_score}
          icon="🌐"
          description="Based on social reputation signals"
        />
      </div>

      {/* Tier Info */}
      <Card className={`mb-8 ${tierConfig.borderColor} border-2`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-5xl">{tierConfig.icon}</div>
            <div>
              <h2 className={`text-2xl font-bold ${tierConfig.textColor}`}>
                {tierConfig.name} Tier
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Score range: {tierConfig.minScore} - {tierConfig.maxScore} |
                Multiplier: {tierConfig.multiplier}x
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex flex-wrap gap-2">
              {tierConfig.benefits.map((benefit: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 dark:bg-dark-700/50 rounded-full text-xs text-gray-700 dark:text-gray-300"
                >
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Feature Breakdown */}
        <FeatureBreakdown features={score.features} />

        {/* Badges */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Earned Badges ({score.badges.length})
          </h2>
          <BadgeGrid badges={score.badges} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
