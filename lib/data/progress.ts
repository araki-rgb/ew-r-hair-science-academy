import type { UserProgress } from "../types";
import { lessons } from "./lessons";

export const demoProgress: UserProgress = {
  xp: 385,
  level: 3,
  completedLessons: ["hair-basic"],
  completedMissions: ["hair-basic"],
  totalQuestionsAnswered: 28,
  correctAnswers: 24,
  quizBestScore: 70,
  quizPassed: false,
  currentStreak: 3,
  longestStreak: 5,
  dailyGoalXp: 80,
  todayXp: 52,
  badges: [
    { id: "first-lesson", title: "ファーストステップ", description: "初めてのMissionを完了", earned: true, xpBonus: 50, icon: "star" },
    { id: "hair-master", title: "髪の基礎マスター", description: "Mission 1を修了", earned: true, xpBonus: 50, icon: "science" },
    { id: "science-foundation", title: "サイエンス基礎認定", description: "Mission 1〜2を修了", earned: false, xpBonus: 100, icon: "cert" },
    { id: "quiz-pass", title: "理解度テスト合格", description: "Quizで80点以上", earned: false, xpBonus: 150, icon: "star" },
    { id: "product-pro", title: "製品プロフェッショナル", description: "製品理解Mission修了", earned: false, xpBonus: 100, icon: "sales" },
    { id: "streak-7", title: "7日連続学習", description: "7日間連続で学習", earned: false, xpBonus: 80, icon: "streak" },
  ],
  certifications: [
    { id: "cert-l1", title: "Level 1 修了認定", level: 1, description: "髪の基礎 Mission修了", earned: true, earnedAt: "2026.06.20" },
    { id: "cert-l2", title: "Level 2 修了認定", level: 2, description: "頭皮の基礎 Mission修了", earned: false },
    { id: "cert-pro", title: "Hair Science Professional", level: 8, description: "全Mission修了 + Quiz合格", earned: false },
  ],
  nextLessonSlug: "scalp-basic",
};

export const weeklyActivity = [
  { day: "月", active: true, minutes: 25 },
  { day: "火", active: true, minutes: 18 },
  { day: "水", active: true, minutes: 32 },
  { day: "木", active: false, minutes: 0 },
  { day: "金", active: false, minutes: 0 },
  { day: "土", active: false, minutes: 0 },
  { day: "日", active: false, minutes: 0 },
];

export function getOverallProgress() {
  const totalLessons = lessons.length;
  const completed = demoProgress.completedLessons.length;
  return {
    percent: Math.round((completed / totalLessons) * 100),
    completed,
    total: totalLessons,
    accuracy:
      demoProgress.totalQuestionsAnswered > 0
        ? Math.round(
            (demoProgress.correctAnswers / demoProgress.totalQuestionsAnswered) * 100,
          )
        : 0,
  };
}