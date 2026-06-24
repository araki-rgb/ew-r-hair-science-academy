import type { UserProgress } from "../types";
import { demoProgress } from "../data/progress";
import { XP_REWARDS } from "../data/gamification";
import { getLessonBySlug } from "../data/lessons";

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
  const completedMissions = progress.completedMissions.includes(slug)
    ? progress.completedMissions
    : [...progress.completedMissions, slug];
  const completedLessons = progress.completedLessons.includes(slug)
    ? progress.completedLessons
    : [...progress.completedLessons, slug];

  let badges = [...progress.badges];
  if (!badges.find((b) => b.id === "first-lesson")?.earned && completedMissions.length >= 1) {
    badges = badges.map((b) => (b.id === "first-lesson" ? { ...b, earned: true } : b));
  }
  if (slug === "hair-basic") {
    badges = badges.map((b) => (b.id === "hair-master" ? { ...b, earned: true } : b));
  }
  if (completedMissions.length >= 2) {
    badges = badges.map((b) => (b.id === "science-foundation" ? { ...b, earned: true } : b));
  }

  let certifications = [...progress.certifications];
  if (slug === "hair-basic") {
    certifications = certifications.map((c) =>
      c.id === "cert-l1" ? { ...c, earned: true, earnedAt: new Date().toISOString().slice(0, 10).replace(/-/g, ".") } : c,
    );
  }
  if (slug === "scalp-basic") {
    certifications = certifications.map((c) =>
      c.id === "cert-l2" ? { ...c, earned: true, earnedAt: new Date().toISOString().slice(0, 10).replace(/-/g, ".") } : c,
    );
  }

  const lesson = getLessonBySlug(slug);
  const nextSlug = lesson?.nextMissionSlug ?? progress.nextLessonSlug;

  const next: UserProgress = {
    ...progress,
    completedMissions,
    completedLessons,
    badges,
    certifications,
    nextLessonSlug: nextSlug ?? progress.nextLessonSlug,
    xp: progress.xp + xpEarned + XP_REWARDS.missionComplete,
    todayXp: progress.todayXp + xpEarned + XP_REWARDS.missionComplete,
    totalQuestionsAnswered: progress.totalQuestionsAnswered + 5,
    correctAnswers: progress.correctAnswers + Math.round((accuracy / 100) * 5),
    currentStreak: progress.currentStreak + (progress.todayXp === 0 ? 1 : 0),
    longestStreak: Math.max(progress.longestStreak, progress.currentStreak + 1),
  };

  saveProgress(next);
  window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: next }));
  return next;
}

export function completeQuiz(
  progress: UserProgress,
  score: number,
  correct: number,
  total: number,
): UserProgress {
  const passed = score >= 80;
  let badges = [...progress.badges];
  if (passed) {
    badges = badges.map((b) => (b.id === "quiz-pass" ? { ...b, earned: true } : b));
  }

  const xpGain = passed ? XP_REWARDS.quizPass : Math.round(score / 2);
  const next: UserProgress = {
    ...progress,
    quizBestScore: Math.max(progress.quizBestScore, score),
    quizPassed: progress.quizPassed || passed,
    badges,
    xp: progress.xp + xpGain,
    todayXp: progress.todayXp + xpGain,
    totalQuestionsAnswered: progress.totalQuestionsAnswered + total,
    correctAnswers: progress.correctAnswers + correct,
  };

  saveProgress(next);
  window.dispatchEvent(new CustomEvent("ewr-progress-change", { detail: next }));
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