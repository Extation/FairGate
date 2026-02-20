"use client";

import { FC } from "react";
import { Tier } from "@/types";
import { TIER_CONFIGS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: Tier;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showMultiplier?: boolean;
}

export const TierBadge: FC<TierBadgeProps> = ({
  tier,
  size = "md",
  showLabel = true,
  showMultiplier = false,
}) => {
  const config = TIER_CONFIGS[tier];

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-1.5 rounded-full font-semibold border",
        config.bgColor,
        config.borderColor,
        sizes[size]
      )}
    >
      <span className={iconSizes[size]}>{config.icon}</span>
      {showLabel && (
        <span className={config.textColor}>{config.name}</span>
      )}
      {showMultiplier && (
        <span className="text-gray-700 dark:text-gray-400 text-xs ml-1">
          {config.multiplier}x
        </span>
      )}
    </div>
  );
};
