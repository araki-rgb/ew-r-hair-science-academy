import type { UserProgress } from "../types";
import { XP_REWARDS } from "../data/gamification";
import { getLessonBySlug } from "../data/lessons";

export function applyMissionComplete(
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

  return {
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
}

export function applyQuizComplete(
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
  return {
    ...progress,
    quizBestScore: Math.max(progress.quizBestScore, score),
    quizPassed: progress.quizPassed || passed,
    badges,
    xp: progress.xp + xpGain,
    todayXp: progress.todayXp + xpGain,
    totalQuestionsAnswered: progress.totalQuestionsAnswered + total,
    correctAnswers: progress.correctAnswers + correct,
  };
}