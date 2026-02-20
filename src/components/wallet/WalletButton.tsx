"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const WalletButton: FC = () => {
  return (
    <WalletMultiButtonDynamic
      style={{
        backgroundColor: "rgba(12, 147, 233, 0.8)",
        borderRadius: "0.75rem",
        fontSize: "0.875rem",
        fontWeight: "600",
        padding: "0.5rem 1.25rem",
        height: "auto",
        lineHeight: "1.5",
        transition: "all 0.2s ease",
      }}
    />
  );
};
