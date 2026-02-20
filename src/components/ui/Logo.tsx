"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "navbar" | "hero" | "footer";
  className?: string;
  showText?: boolean;
  linkToHome?: boolean;
}

export const Logo: FC<LogoProps> = ({
  variant = "navbar",
  className,
  showText = true,
  linkToHome = true,
}) => {
  const sizes = {
    navbar: { width: 40, height: 40, textSize: "text-xl" },
    hero: { width: 200, height: 80, textSize: "text-4xl" },
    footer: { width: 32, height: 32, textSize: "text-lg" },
  };

  const { width, height, textSize } = sizes[variant];

  const LogoContent = () => (
    <div className={cn("flex items-center space-x-2 group", className)}>
      {/* Logo Image - will show if image exists, otherwise fallback to icon */}
      <div className="relative">
        <Image
          src="/images/logo-icon.png"
          alt="FairGate Logo"
          width={width}
          height={height}
          className="object-contain transition-transform group-hover:scale-105"
          onError={(e) => {
            // Fallback to gradient icon if image doesn't exist
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        {/* Fallback Icon */}
        <div
          className="w-8 h-8 bg-gradient-to-br from-fair-400 to-fair-600 rounded-lg items-center justify-center shadow-lg shadow-fair-500/25 group-hover:shadow-fair-500/40 transition-shadow hidden"
          style={{ display: "none" }}
        >
          <span className="text-white font-bold text-sm">FG</span>
        </div>
      </div>

      {/* Text Logo */}
      {showText && (
        <span className={cn("text-white font-bold tracking-tight", textSize)}>
          Fair<span className="text-fair-400">Gate</span>
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link href="/" className="flex items-center">
        <LogoContent />
      </Link>
    );
  }

  return <LogoContent />;
};

// Banner Logo Component for Hero sections
interface BannerLogoProps {
  className?: string;
}

export const BannerLogo: FC<BannerLogoProps> = ({ className }) => {
  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <Image
        src="/images/logo-banner.png"
        alt="FairGate Banner"
        width={800}
        height={300}
        className="object-contain w-full h-auto"
        priority
        onError={(e) => {
          // Hide if image doesn't exist
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};

export default Logo;
