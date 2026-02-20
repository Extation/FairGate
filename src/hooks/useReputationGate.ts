"use client";

import { useMemo } from "react";
import { Tier } from "@/types";
import { canAccessTier } from "@/lib/utils";
import { TIER_CONFIGS } from "@/lib/constants";

interface UseReputationGateReturn {
  hasAccess: boolean;
  userTierLevel: number;
  requiredTierLevel: number;
  tierConfig: typeof TIER_CONFIGS[string] | null;
  message: string;
}

export function useReputationGate(
  userTier: Tier | null,
  requiredTier: Tier
): UseReputationGateReturn {
  return useMemo(() => {
    if (!userTier) {
      return {
        hasAccess: false,
        userTierLevel: -1,
        requiredTierLevel: 0,
        tierConfig: null,
        message: "Connect your wallet to check access",
      };
    }

    const hasAccess = canAccessTier(userTier, requiredTier);
    const tierConfig = TIER_CONFIGS[requiredTier];
    const tierOrder: Record<string, number> = {
      bronze: 0,
      silver: 1,
      gold: 2,
      platinum: 3,
    };

    return {
      hasAccess,
      userTierLevel: tierOrder[userTier],
      requiredTierLevel: tierOrder[requiredTier],
      tierConfig,
      message: hasAccess
        ? `You have ${TIER_CONFIGS[userTier].name} tier access`
        : `Requires ${tierConfig.name} tier or above. You are currently ${TIER_CONFIGS[userTier].name}.`,
    };
  }, [userTier, requiredTier]);
}
