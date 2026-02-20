import { FairScaleScore, FairScoreResponse, WalletScoreResponse } from "@/types";

const API_BASE = "/api";

export async function getFullScore(wallet: string): Promise<FairScaleScore> {
  const response = await fetch(`${API_BASE}/score?wallet=${wallet}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch score: ${response.statusText}`);
  }
  return response.json();
}

export async function getFairScore(wallet: string): Promise<FairScoreResponse> {
  const response = await fetch(`${API_BASE}/fairscore?wallet=${wallet}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch fair score: ${response.statusText}`);
  }
  return response.json();
}

export async function getWalletScore(wallet: string): Promise<WalletScoreResponse> {
  const response = await fetch(`${API_BASE}/walletscore?wallet=${wallet}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch wallet score: ${response.statusText}`);
  }
  return response.json();
}
