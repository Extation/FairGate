"use client";

import { FC } from "react";
import { FairScaleFeatures } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPercentage, formatNumber } from "@/lib/utils";

interface FeatureBreakdownProps {
  features: FairScaleFeatures;
}

const FEATURE_LABELS: Record<string, { label: string; icon: string; format: "percent" | "number" | "days" | "hours" }> = {
  lst_percentile_score: { label: "LST Holdings", icon: "🌊", format: "percent" },
  major_percentile_score: { label: "Major Tokens", icon: "💰", format: "percent" },
  native_sol_percentile: { label: "Native SOL", icon: "◎", format: "percent" },
  stable_percentile_score: { label: "Stablecoins", icon: "💵", format: "percent" },
  tx_count: { label: "Transactions", icon: "📊", format: "number" },
  active_days: { label: "Active Days", icon: "📅", format: "days" },
  median_gap_hours: { label: "Median Gap", icon: "⏱️", format: "hours" },
  wallet_age_days: { label: "Wallet Age", icon: "🎂", format: "days" },
};

export const FeatureBreakdown: FC<FeatureBreakdownProps> = ({ features }) => {
  const formatValue = (key: string, value: number): string => {
    const config = FEATURE_LABELS[key];
    if (!config) return value.toString();

    switch (config.format) {
      case "percent":
        // Percentile scores come as 0-100, just add % sign
        return `${value.toFixed(1)}%`;
      case "number":
        return formatNumber(value);
      case "days":
        return `${Math.round(value)} days`;
      case "hours":
        return `${value.toFixed(1)}h`;
      default:
        return value.toString();
    }
  };

  const getBarWidth = (key: string, value: number): number => {
    const config = FEATURE_LABELS[key];
    if (!config) return 0;

    if (config.format === "percent") {
      // Percentile scores are 0-100, so use directly as percentage width
      return Math.min(value, 100);
    }
    // For other formats, normalize to a reasonable scale
    if (key === "tx_count") return Math.min((value / 10000) * 100, 100);
    if (key === "active_days") return Math.min((value / 365) * 100, 100);
    if (key === "wallet_age_days") return Math.min((value / 730) * 100, 100);
    if (key === "median_gap_hours") {
      // Lower median gap is better (more active), so invert the scale
      return Math.max(100 - (value / 48) * 100, 10);
    }
    return 50;
  };

  const featureEntries = Object.entries(features).filter(
    ([key]) => FEATURE_LABELS[key]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-white">Feature Breakdown</CardTitle>
      </CardHeader>
      <div className="space-y-4">
        {featureEntries.map(([key, value]) => {
          const config = FEATURE_LABELS[key];
          const barWidth = getBarWidth(key, value);

          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">{config.icon}</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">{config.label}</span>
                </div>
                <span className="text-gray-900 dark:text-white font-medium text-sm">
                  {formatValue(key, value)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-fair-600 to-fair-400 transition-all duration-1000"
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
