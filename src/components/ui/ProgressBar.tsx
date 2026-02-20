"use client";

import { FC } from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  size = "md",
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
          <span className="text-xs text-gray-700 dark:text-gray-300 font-medium">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden",
          sizes[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-fair-500 to-fair-400",
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
