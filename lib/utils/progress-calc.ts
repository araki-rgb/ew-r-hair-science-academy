import type { UserProgress } from "../types";
import { lessons } from "../data/lessons";

export function calcOverallProgress(progress: UserProgress) {
  const total = lessons.length;
  const completed = progress.completedLessons.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const accuracy =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100)
      : 0;
  return { percent, completed, total, accuracy };
}

export function calcMissionProgress(slug: string, progress: UserProgress): number {
  if (progress.completedLessons.includes(slug)) return 100;
  if (progress.nextLessonSlug === slug) return 35;
  return 0;
}

export function getWeeklyActivityFromProgress(progress: UserProgress) {
  const days = ["月", "火", "水", "木", "金", "土", "日"] as const;
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  const baseMinutes = Math.min(40, Math.round(progress.todayXp / 2));

  return days.map((day, i) => {
    const isToday = i === todayIdx;
    const active = isToday ? progress.todayXp > 0 : i < todayIdx && progress.currentStreak > 0;
    const minutes = isToday ? baseMinutes : active ? Math.max(8, baseMinutes - (todayIdx - i) * 3) : 0;
    return { day, active: active || isToday, minutes };
  });
}