"use client";

import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useFairScore } from "@/hooks/useFairScore";
import { LaunchCard } from "@/components/launchpad/LaunchCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TierBadge } from "@/components/dashboard/TierBadge";
import { WalletButton } from "@/components/wallet/WalletButton";
import { MOCK_LAUNCHES, TIER_CONFIGS } from "@/lib/constants";
import { Tier } from "@/types";

const LaunchpadPage: FC = () => {
  const { publicKey, connected } = useWallet();
  const { score, loading, fetchScore } = useFairScore();
  const [filter, setFilter] = useState<"all" | "upcoming" | "active" | "completed">("all");
  const [tierFilter, setTierFilter] = useState<Tier | "all">("all");

  useEffect(() => {
    if (connected && publicKey) {
      fetchScore(publicKey.toBase58());
    }
  }, [connected, publicKey, fetchScore]);

  const filteredLaunches = MOCK_LAUNCHES.filter((launch) => {
    if (filter !== "all" && launch.status !== filter) return false;
    if (tierFilter !== "all" && launch.minTier !== tierFilter) return false;
    return true;
  });

  const handleParticipate = (projectId: string) => {
    alert(`Participation in project ${projectId} would be processed here. This is a demo.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Launchpad</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and participate in reputation-gated token launches on Solana.
          </p>
        </div>
        {connected && score && (
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <span className="text-gray-600 dark:text-gray-400 text-sm">Your tier:</span>
            <TierBadge tier={score.tier} showMultiplier />
          </div>
        )}
      </div>

      {/* Wallet Connection Banner */}
      {!connected && (
        <Card className="mb-8 border-fair-500/30 border-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-4xl">🔗</div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-bold">Connect to Participate</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect your wallet to check your tier and participate in launches.
                </p>
              </div>
            </div>
            <WalletButton />
          </div>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {(["all", "active", "upcoming", "completed"] as const).map((status) => (
            <Button
              key={status}
              size="sm"
              variant={filter === status ? "primary" : "ghost"}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={tierFilter === "all" ? "secondary" : "ghost"}
            onClick={() => setTierFilter("all")}
          >
            All Tiers
          </Button>
          {(Object.keys(TIER_CONFIGS) as Tier[]).map((tier) => (
            <Button
              key={tier}
              size="sm"
              variant={tierFilter === tier ? "secondary" : "ghost"}
              onClick={() => setTierFilter(tier)}
            >
              {TIER_CONFIGS[tier].icon} {TIER_CONFIGS[tier].name}
            </Button>
          ))}
        </div>
      </div>

      {/* Launch Grid */}
      {filteredLaunches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaunches.map((launch) => (
            <LaunchCard
              key={launch.id}
              project={launch}
              userTier={score?.tier || null}
              onParticipate={handleParticipate}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2">No Launches Found</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No launches match your current filters. Try adjusting your criteria.
          </p>
        </Card>
      )}

      {/* Info Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center p-8">
          <div className="text-3xl mb-3">🛡️</div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-2">Sybil Protected</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            All participants are verified through FairScale reputation scoring.
            No bots, no fake accounts.
          </p>
        </Card>
        <Card className="text-center p-8">
          <div className="text-3xl mb-3">⚖️</div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-2">Fair Allocation</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Allocations are weighted by FairScore. Higher reputation means
            larger share of the token sale.
          </p>
        </Card>
        <Card className="text-center p-8">
          <div className="text-3xl mb-3">🔒</div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-2">Tier Gated</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Premium launches require minimum reputation tiers. Build your
            score to unlock the best opportunities.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LaunchpadPage;
