"use client";

import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-fair-500 to-fair-600 hover:from-fair-600 hover:to-fair-700 text-white focus:ring-fair-500 shadow-lg shadow-fair-500/25",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-dark-700 dark:hover:bg-dark-600 dark:text-white focus:ring-gray-400 dark:focus:ring-dark-500 border border-gray-300 dark:border-dark-600",
    outline:
      "border-2 border-fair-500 text-fair-500 dark:text-fair-400 hover:bg-fair-500/10 focus:ring-fair-500",
    ghost:
      "text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-dark-700/50 focus:ring-gray-400 dark:focus:ring-dark-500",
    danger:
      "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg shadow-red-500/25",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
