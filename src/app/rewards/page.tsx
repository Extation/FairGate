"use client";

import { FC, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { RewardCard } from "@/components/rewards/RewardCard";
import { Card } from "@/components/ui/Card";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { WalletButton } from "@/components/wallet/WalletButton";
import { MOCK_REWARDS, TIER_CONFIGS } from "@/lib/constants";

const RewardsPage: FC = () => {
  const { publicKey, connected } = useWallet();
  const { score, loading, fetchScore } = useFairScore();

  useEffect(() => {
    if (connected && publicKey) {
      fetchScore(publicKey.toBase58());
    }
  }, [connected, publicKey, fetchScore]);

  const handleClaim = (rewardId: string) => {
    alert(`Claiming reward ${rewardId}. This is a demo.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rewards Hub</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Earn exclusive rewards based on your FairScore and reputation tier.
          </p>
        </div>
        {connected && score && (
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="text-right">
              <span className="text-gray-600 dark:text-gray-400 text-xs block">Your Score</span>
              <span className="text-gray-900 dark:text-white font-bold text-lg">
                {score.fairscore.toFixed(1)}
              </span>
            </div>
            <TierBadge tier={score.tier} showMultiplier />
          </div>
        )}
      </div>

      {/* Wallet Connection */}
      {!connected && (
        <Card className="mb-8 border-fair-500/30 border-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-4xl">🎁</div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-bold">Connect to Claim Rewards</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect your wallet to see which rewards you&apos;re eligible for.
                </p>
              </div>
            </div>
            <WalletButton />
          </div>
        </Card>
      )}

      {/* Multiplier Info */}
      {connected && score && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(TIER_CONFIGS).map(([key, tier]) => (
            <Card
              key={key}
              className={`text-center ${
                score.tier === key ? `${tier.borderColor} border-2` : ""
              }`}
            >
              <div className="text-2xl mb-2">{tier.icon}</div>
              <h4 className={`font-bold ${tier.textColor}`}>{tier.name}</h4>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {tier.multiplier}x
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">Reward Multiplier</p>
              {score.tier === key && (
                <span className="inline-block mt-2 px-2 py-0.5 bg-fair-500/20 text-fair-400 text-xs rounded-full">
                  Your Tier
                </span>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600 dark:text-gray-400">Loading your rewards eligibility...</p>
        </div>
      )}

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_REWARDS.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userTier={score?.tier || null}
            userScore={score?.fairscore || 0}
            onClaim={handleClaim}
          />
        ))}
      </div>

      {/* How It Works */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          How Rewards Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-8">
            <div className="w-12 h-12 bg-fair-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-fair-400 font-bold text-xl">1</span>
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Build Reputation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Use your Solana wallet actively. Trade, stake, hold, and
              participate in DeFi to build your FairScore.
            </p>
          </Card>
          <Card className="text-center p-8">
            <div className="w-12 h-12 bg-fair-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-fair-400 font-bold text-xl">2</span>
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Unlock Tiers</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              As your score grows, you&apos;ll unlock higher tiers with better
              multipliers and exclusive rewards.
            </p>
          </Card>
          <Card className="text-center p-8">
            <div className="w-12 h-12 bg-fair-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-fair-400 font-bold text-xl">3</span>
            </div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-2">Claim Rewards</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Eligible rewards appear here. Claim airdrops, multipliers, NFTs,
              and exclusive access passes.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
