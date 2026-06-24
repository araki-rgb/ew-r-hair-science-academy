"use client";

import { useCallback, useEffect, useState } from "react";
import type { UserProgress } from "@/lib/types";
import { getLevelFromXp } from "@/lib/data/gamification";
import { getDefaultProgress, loadProgress } from "@/lib/storage/progress-store";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getDefaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setProgress((e as CustomEvent<UserProgress>).detail);
    };
    window.addEventListener("ewr-progress-change", handler);
    return () => window.removeEventListener("ewr-progress-change", handler);
  }, []);

  const refresh = useCallback(() => setProgress(loadProgress()), []);

  const level = getLevelFromXp(progress.xp);

  return { progress, hydrated, refresh, level };
}