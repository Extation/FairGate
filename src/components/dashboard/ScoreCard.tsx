"use client";

import { FC } from "react";
import { Card } from "@/components/ui/Card";
import { cn, getScoreGradient } from "@/lib/utils";

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  icon: string;
  description?: string;
}

export const ScoreCard: FC<ScoreCardProps> = ({
  label,
  score,
  maxScore = 100,
  icon,
  description,
}) => {
  const percentage = Math.min((score / maxScore) * 100, 100);
  const gradient = getScoreGradient(score);

  return (
    <Card hover className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="text-8xl">{icon}</div>
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</span>
          <span className="text-2xl">{icon}</span>
        </div>
        <div className="flex items-end space-x-2 mb-3">
          <span
            className={cn(
              "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              gradient
            )}
          >
            {score.toFixed(1)}
          </span>
          <span className="text-gray-500 text-sm mb-1">/ {maxScore}</span>
        </div>
        {description && (
          <p className="text-gray-500 text-xs">{description}</p>
        )}
        <div className="mt-3 w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r",
              gradient
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
