"use client";

import { FC } from "react";
import { LaunchProject, Tier } from "@/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { TierBadge } from "@/components/dashboard/TierBadge";
import {
  formatCurrency,
  formatNumber,
  getTimeRemaining,
  getProgressPercentage,
  canAccessTier,
  cn,
} from "@/lib/utils";

interface LaunchCardProps {
  project: LaunchProject;
  userTier: Tier | null;
  onParticipate?: (projectId: string) => void;
}

export const LaunchCard: FC<LaunchCardProps> = ({
  project,
  userTier,
  onParticipate,
}) => {
  const hasAccess = userTier ? canAccessTier(userTier, project.minTier) : false;
  const progress = getProgressPercentage(project.raised, project.totalRaise);
  const timeRemaining = getTimeRemaining(project.endDate);

  const statusColors = {
    upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    active: "bg-green-500/20 text-green-400 border-green-500/30",
    completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Card hover className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-xl flex items-center justify-center text-2xl">
            {project.logo}
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold">{project.name}</h3>
            <span className="text-gray-600 dark:text-gray-400 text-sm">${project.symbol}</span>
          </div>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium border",
            statusColors[project.status]
          )}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-100 dark:bg-dark-700 rounded-full text-xs text-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-gray-500 dark:text-gray-500 text-xs">Total Raise</span>
          <p className="text-gray-900 dark:text-white font-semibold">
            {formatCurrency(project.totalRaise)}
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-500 text-xs">Token Price</span>
          <p className="text-gray-900 dark:text-white font-semibold">${project.tokenPrice}</p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-500 text-xs">Participants</span>
          <p className="text-gray-900 dark:text-white font-semibold">
            {formatNumber(project.participants)}
          </p>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-500 text-xs">Time Left</span>
          <p className="text-gray-900 dark:text-white font-semibold">{timeRemaining}</p>
        </div>
      </div>

      {/* Progress */}
      {project.status === "active" && (
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatCurrency(project.raised)} / {formatCurrency(project.totalRaise)}
            </span>
          </div>
          <ProgressBar value={progress} size="md" />
        </div>
      )}

      {/* Access Requirement */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-dark-700">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600 dark:text-gray-400 text-xs">Min Tier:</span>
          <TierBadge tier={project.minTier} size="sm" />
        </div>
        {project.status === "active" && (
          <Button
            size="sm"
            variant={hasAccess ? "primary" : "secondary"}
            disabled={!hasAccess}
            onClick={() => onParticipate?.(project.id)}
          >
            {hasAccess ? "Participate" : "🔒 Locked"}
          </Button>
        )}
        {project.status === "upcoming" && (
          <span className="text-gray-600 dark:text-gray-400 text-xs">Coming Soon</span>
        )}
        {project.status === "completed" && (
          <span className="text-green-400 text-xs">✓ Completed</span>
        )}
      </div>
    </Card>
  );
};
