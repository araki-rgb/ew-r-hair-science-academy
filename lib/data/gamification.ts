import type { UserProgress } from "../types";

export const XP_REWARDS = {
  sceneComplete: 5,
  questionCorrect: 15,
  questionWrong: 5,
  stepComplete: 3,
  missionComplete: 100,
  streakDay: 20,
  quizPass: 150,
  badgeEarned: 50,
} as const;

export const LEVELS = [
  { level: 1, title: "ビギナー", minXp: 0 },
  { level: 2, title: "アシスタント", minXp: 100 },
  { level: 3, title: "スタイリスト", minXp: 250 },
  { level: 4, title: "カラーリスト", minXp: 500 },
  { level: 5, title: "トップスタイリスト", minXp: 800 },
  { level: 6, title: "サイエンスアドバイザー", minXp: 1200 },
  { level: 7, title: "エデュケーター", minXp: 1700 },
  { level: 8, title: "マスタートレーナー", minXp: 2300 },
  { level: 9, title: "プロフェッショナル", minXp: 3000 },
  { level: 10, title: "Hair Science Expert", minXp: 4000 },
] as const;

export function getLevelFromXp(xp: number) {
  let current: (typeof LEVELS)[number] = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXp) current = lvl;
  }
  const next = LEVELS.find((l) => l.minXp > xp);
  return {
    level: current.level,
    title: current.title,
    currentXp: xp - current.minXp,
    nextLevelXp: next ? next.minXp - current.minXp : 0,
    progress: next
      ? Math.round(((xp - current.minXp) / (next.minXp - current.minXp)) * 100)
      : 100,
    isMax: !next,
  };
}

export function getDailyGoalProgress(progress: UserProgress) {
  return Math.min(100, Math.round((progress.todayXp / progress.dailyGoalXp) * 100));
}