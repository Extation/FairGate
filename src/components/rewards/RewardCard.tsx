"use client";

import { FC } from "react";
import { Reward, Tier } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { canAccessTier, formatDate, cn } from "@/lib/utils";

interface RewardCardProps {
  reward: Reward;
  userTier: Tier | null;
  userScore: number;
  onClaim?: (rewardId: string) => void;
}

export const RewardCard: FC<RewardCardProps> = ({
  reward,
  userTier,
  userScore,
  onClaim,
}) => {
  const hasTierAccess = userTier
    ? canAccessTier(userTier, reward.minTier)
    : false;
  const hasScoreAccess = userScore >= reward.minScore;
  const canClaim = hasTierAccess && hasScoreAccess && !reward.claimed;

  const typeColors = {
    airdrop: "from-purple-500 to-pink-500",
    multiplier: "from-yellow-500 to-orange-500",
    access: "from-blue-500 to-cyan-500",
    nft: "from-green-500 to-emerald-500",
  };

  const typeLabels = {
    airdrop: "Airdrop",
    multiplier: "Multiplier",
    access: "Access",
    nft: "NFT",
  };

  return (
    <Card hover className="flex flex-col h-full relative overflow-hidden">
      {/* Type Badge */}
      <div className="absolute top-4 right-4">
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r text-white",
            typeColors[reward.type]
          )}
        >
          {typeLabels[reward.type]}
        </span>
      </div>

      {/* Icon & Title */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
          {reward.icon}
        </div>
        <div className="pr-16">
          <h3 className="text-gray-900 dark:text-white font-bold text-sm">{reward.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{reward.description}</p>
        </div>
      </div>

      {/* Value */}
      <div className="bg-gray-100 dark:bg-dark-700/50 rounded-xl p-3 mb-4">
        <span className="text-gray-600 dark:text-gray-400 text-xs">Reward Value</span>
        <p className="text-gray-900 dark:text-white font-bold text-lg">{reward.value}</p>
      </div>

      {/* Requirements */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Min Tier</span>
          <TierBadge tier={reward.minTier} size="sm" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Min Score</span>
          <span className="text-gray-900 dark:text-white text-sm font-medium">
            {reward.minScore}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Expires</span>
          <span className="text-gray-700 dark:text-gray-300 text-xs">
            {formatDate(reward.expiresAt)}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="mt-auto">
        {reward.claimed ? (
          <Button variant="secondary" size="sm" disabled className="w-full">
            ✓ Claimed
          </Button>
        ) : canClaim ? (
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => onClaim?.(reward.id)}
          >
            Claim Reward
          </Button>
        ) : (
          <Button variant="secondary" size="sm" disabled className="w-full">
            🔒 {!hasTierAccess ? "Tier Required" : "Score Required"}
          </Button>
        )}
      </div>
    </Card>
  );
};
