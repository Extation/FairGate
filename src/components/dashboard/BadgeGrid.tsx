"use client";

import { FC } from "react";
import { FairScaleBadge } from "@/types";
import { Card } from "@/components/ui/Card";
import { TIER_CONFIGS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BadgeGridProps {
  badges: FairScaleBadge[];
}

const BADGE_ICONS: Record<string, string> = {
  diamond_hands: "💎",
  whale: "🐋",
  degen: "🎰",
  og: "👑",
  builder: "🔨",
  trader: "📈",
  staker: "🥩",
  governance: "🏛️",
  nft_collector: "🎨",
  defi_native: "🌾",
  default: "⭐",
};

export const BadgeGrid: FC<BadgeGridProps> = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return (
      <Card className="text-center py-8">
        <div className="text-4xl mb-3">🏅</div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">No badges earned yet</p>
        <p className="text-gray-500 text-xs mt-1">
          Keep building your on-chain reputation to earn badges
        </p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {badges.map((badge) => {
        const tierConfig = TIER_CONFIGS[badge.tier];
        const icon = BADGE_ICONS[badge.id] || BADGE_ICONS.default;

        return (
          <Card
            key={badge.id}
            hover
            className={cn(
              "relative overflow-hidden",
              tierConfig?.borderColor
            )}
          >
            <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
              <div className="text-6xl">{icon}</div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-xl",
                    tierConfig?.bgColor || "bg-gray-100 dark:bg-dark-700"
                  )}
                >
                  {icon}
                </div>
                <div>
                  <h4 className="text-gray-900 dark:text-white font-semibold text-sm">
                    {badge.label}
                  </h4>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      tierConfig?.textColor || "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {badge.tier.charAt(0).toUpperCase() + badge.tier.slice(1)}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{badge.description}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
