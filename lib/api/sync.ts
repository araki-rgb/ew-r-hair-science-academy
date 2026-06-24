import type { UserProgress } from "../types";
import { saveProgress } from "../storage/progress-store";

export async function fetchServerProgress(): Promise<UserProgress | null> {
  try {
    const res = await fetch("/api/progress", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.progress as UserProgress;
  } catch {
    return null;
  }
}

export async function syncMissionComplete(slug: string, xpEarned: number, accuracy: number) {
  try {
    const res = await fetch("/api/progress/mission", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, xpEarned, accuracy }),
    });
    if (res.ok) {
      const data = await res.json();
      saveProgress(data.progress);
      window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: data.progress }));
      return data.progress as UserProgress;
    }
  } catch {
    /* local only */
  }
  return null;
}

export async function syncQuizComplete(score: number, correct: number, total: number) {
  try {
    const res = await fetch("/api/progress/quiz", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score, correct, total }),
    });
    if (res.ok) {
      const data = await res.json();
      saveProgress(data.progress);
      window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: data.progress }));
      return data.progress as UserProgress;
    }
  } catch {
    /* local only */
  }
  return null;
}