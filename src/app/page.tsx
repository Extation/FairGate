"use client";

import { FC } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WalletButton } from "@/components/wallet/WalletButton";
import { TIER_CONFIGS } from "@/lib/constants";

const HomePage: FC = () => {
  const { connected } = useWallet();

  const features = [
    {
      icon: "🛡️",
      title: "Reputation-Gated Access",
      description:
        "Only verified, high-reputation wallets can access premium launches. Say goodbye to bots and sybil attacks.",
    },
    {
      icon: "⚖️",
      title: "Fair Allocation",
      description:
        "Your FairScore determines your allocation size. Higher reputation = larger share of the token sale.",
    },
    {
      icon: "🎁",
      title: "Dynamic Rewards",
      description:
        "Earn multiplied rewards based on your tier. Platinum members get up to 2.5x reward multipliers.",
    },
    {
      icon: "📊",
      title: "On-Chain Verification",
      description:
        "All reputation scores are derived from real on-chain activity. No gaming, no shortcuts.",
    },
  ];

  const stats = [
    { label: "Total Value Locked", value: "$2.4M" },
    { label: "Launches Completed", value: "12" },
    { label: "Active Users", value: "8,500+" },
    { label: "Avg. ROI", value: "340%" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">

            <div className="inline-flex items-center px-4 py-2 bg-fair-500/10 border border-fair-500/30 rounded-full mb-6">
              <span className="text-fair-400 text-sm font-medium">
                Powered by FairScale Reputation Infrastructure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              The{" "}
              <span className="bg-gradient-to-r from-fair-400 to-fair-600 bg-clip-text text-transparent">
                Reputation-Gated
              </span>
              <br />
              Token Launchpad
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Access exclusive token launches, earn dynamic rewards, and build
              your on-chain reputation. Your FairScore is your key to the best
              opportunities in Solana DeFi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {connected ? (
                <Link href="/dashboard">
                  <Button size="lg">View Dashboard</Button>
                </Link>
              ) : (
                <WalletButton />
              )}
              <Link href="/launchpad">
                <Button variant="outline" size="lg">
                  Explore Launches
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-200 dark:border-dark-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why FairGate?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We&apos;re building the fairest launchpad in DeFi, where your
              reputation speaks louder than your wallet size.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="p-8">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers Section */}
      <section className="py-24 bg-gray-50 dark:bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Reputation Tiers
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Your FairScore determines your tier. Higher tiers unlock better
              benefits and exclusive access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(TIER_CONFIGS).map(([key, tier]) => (
              <Card
                key={key}
                hover
                className={`relative overflow-hidden ${tier.borderColor} border-2`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div className="text-7xl">{tier.icon}</div>
                </div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{tier.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${tier.textColor}`}>
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Score: {tier.minScore} - {tier.maxScore}
                  </p>
                  <div className="space-y-2">
                    {tier.benefits.slice(0, 3).map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-green-400 mr-2">✓</span>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <span className="text-gray-600 dark:text-gray-400 text-xs">Multiplier</span>
                    <p className={`text-2xl font-bold ${tier.textColor}`}>
                      {tier.multiplier}x
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-fair-600/20 to-purple-600/20 border border-fair-500/30 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Build Your Reputation?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Connect your wallet to see your FairScore and start accessing
              exclusive opportunities on FairGate.
            </p>
            {connected ? (
              <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            ) : (
              <WalletButton />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
