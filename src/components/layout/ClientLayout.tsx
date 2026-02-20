"use client";

import { FC, ReactNode } from "react";
import { CursorGlow, BackgroundEffects } from "@/components/ui/CursorGlow";

interface ClientLayoutProps {
  children: ReactNode;
}

export const ClientLayout: FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <BackgroundEffects />
      <CursorGlow />
      {children}
    </>
  );
};
