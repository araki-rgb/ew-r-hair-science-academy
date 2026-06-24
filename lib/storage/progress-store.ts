import type { UserProgress } from "../types";
import { demoProgress } from "../data/progress";
import { XP_REWARDS } from "../data/gamification";
import { applyMissionComplete, applyQuizComplete } from "../progress/logic";

const STORAGE_KEY = "ewr-user-progress";

export function getDefaultProgress(): UserProgress {
  return JSON.parse(JSON.stringify(demoProgress)) as UserProgress;
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    return { ...getDefaultProgress(), ...parsed };
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function addXp(progress: UserProgress, amount: number): UserProgress {
  const next = { ...progress, xp: progress.xp + amount, todayXp: progress.todayXp + amount };
  saveProgress(next);
  window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: next }));
  return next;
}

export function completeMission(
  progress: UserProgress,
  slug: string,
  xpEarned: number,
  accuracy: number,
): UserProgress {
  const next = applyMissionComplete(progress, slug, xpEarned, accuracy);
  saveProgress(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: next }));
  }
  return next;
}

export function completeQuiz(
  progress: UserProgress,
  score: number,
  correct: number,
  total: number,
): UserProgress {
  const next = applyQuizComplete(progress, score, correct, total);
  saveProgress(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: next }));
  }
  return next;
}

export function setOnboardingDone() {
  if (typeof window === "undefined") return;
  localStorage.setItem("ewr-onboarding-done", "1");
}

export function isOnboardingDone(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem("ewr-onboarding-done") === "1";
}