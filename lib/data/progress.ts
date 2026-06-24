import type { UserProgress } from "../types";
import { lessons } from "./lessons";

export const demoProgress: UserProgress = {
  completedLessons: ["hair-basic"],
  totalQuestionsAnswered: 28,
  correctAnswers: 24,
  quizBestScore: 70,
  quizPassed: false,
  currentStreak: 3,
  badges: [
    {
      id: "first-lesson",
      title: "ファーストステップ",
      description: "初めてのLessonを完了",
      earned: true,
    },
    {
      id: "hair-master",
      title: "髪の基礎マスター",
      description: "髪の基礎を完了",
      earned: true,
    },
    {
      id: "science-foundation",
      title: "サイエンス基礎認定",
      description: "Level 1〜2を修了",
      earned: false,
    },
    {
      id: "quiz-pass",
      title: "理解度テスト合格",
      description: "Quizで80点以上を達成",
      earned: false,
    },
    {
      id: "product-pro",
      title: "製品プロフェッショナル",
      description: "EW-R製品理解を完了",
      earned: false,
    },
    {
      id: "streak-7",
      title: "7日連続学習",
      description: "7日間連続で学習",
      earned: false,
    },
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

export const teamStats = {
  totalLearners: 24,
  activeThisWeek: 18,
  avgProgress: 62,
  completionRate: 45,
};

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
            (demoProgress.correctAnswers / demoProgress.totalQuestionsAnswered) *
              100,
          )
        : 0,
  };
}