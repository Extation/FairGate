"use client";

import { useState, useCallback } from "react";
import { FairScaleScore } from "@/types";
import { getFullScore } from "@/lib/fairscale";

interface UseFairScoreReturn {
  score: FairScaleScore | null;
  loading: boolean;
  error: string | null;
  fetchScore: (wallet: string) => Promise<void>;
  reset: () => void;
}

export function useFairScore(): UseFairScoreReturn {
  const [score, setScore] = useState<FairScaleScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchScore = useCallback(async (wallet: string) => {
    if (!wallet) {
      setError("Wallet address is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getFullScore(wallet);
      setScore(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch score";
      setError(message);
      setScore(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setScore(null);
    setLoading(false);
    setError(null);
  }, []);

  return { score, loading, error, fetchScore, reset };
}
