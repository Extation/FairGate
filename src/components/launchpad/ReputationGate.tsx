"use client";

import { FC, ReactNode } from "react";
import { Tier } from "@/types";
import { useReputationGate } from "@/hooks/useReputationGate";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { cn } from "@/lib/utils";

interface ReputationGateProps {
  userTier: Tier | null;
  requiredTier: Tier;
  children: ReactNode;
  fallback?: ReactNode;
}

export const ReputationGate: FC<ReputationGateProps> = ({
  userTier,
  requiredTier,
  children,
  fallback,
}) => {
  const { hasAccess, message } = useReputationGate(userTier, requiredTier);

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm rounded-2xl z-10 flex flex-col items-center justify-center p-6">
        <div className="text-4xl mb-4">🔒</div>
        <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">Access Restricted</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-4 max-w-sm">
          {message}
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-sm">Required:</span>
          <TierBadge tier={requiredTier} size="sm" />
        </div>
        {userTier && (
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Your tier:</span>
            <TierBadge tier={userTier} size="sm" />
          </div>
        )}
      </div>
      <div className="opacity-20 pointer-events-none">{children}</div>
    </div>
  );
};
