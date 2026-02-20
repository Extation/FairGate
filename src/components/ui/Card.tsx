"use client";

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  hover = false,
  glow = false,
}) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-dark-800/80 backdrop-blur-sm border border-gray-200 dark:border-dark-700/50 rounded-2xl p-6",
        hover && "hover:border-fair-500/30 hover:shadow-lg hover:shadow-fair-500/5 transition-all duration-300",
        glow && "animate-glow",
        className
      )}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: FC<CardHeaderProps> = ({ children, className }) => {
  return (
    <div className={cn("mb-4", className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export const CardTitle: FC<CardTitleProps> = ({ children, className }) => {
  return (
    <h3 className={cn("text-lg font-bold text-gray-900 dark:text-white", className)}>
      {children}
    </h3>
  );
};

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const CardDescription: FC<CardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-sm text-gray-600 dark:text-gray-400 mt-1", className)}>{children}</p>
  );
};

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: FC<CardContentProps> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};
