import type { AdminDashboard } from "../types";

/** 企業管理者向けダッシュボード — 将来の管理画面CMSデータ */
export const adminDashboard: AdminDashboard = {
  overview: {
    totalLearners: 248,
    activeThisWeek: 186,
    avgProgress: 62,
    completionRate: 45,
    avgAccuracy: 78,
    totalXpEarned: 48200,
  },
  stores: [
    { id: "s1", name: "Hair Studio Aoyama", region: "東京", learners: 12, progress: 78, completionRate: 58 },
    { id: "s2", name: "Salon Bloom 渋谷", region: "東京", learners: 8, progress: 65, completionRate: 42 },
    { id: "s3", name: "Grace Hair 大阪", region: "関西", learners: 15, progress: 54, completionRate: 38 },
    { id: "s4", name: "Luxe Cut 名古屋", region: "中部", learners: 6, progress: 41, completionRate: 25 },
    { id: "s5", name: "Natural Style 福岡", region: "九州", learners: 9, progress: 72, completionRate: 50 },
  ],
  salesReps: [
    { id: "r1", name: "田中 健太", region: "東京", salonsManaged: 18, avgProgress: 68, topLesson: "EW-R製品理解" },
    { id: "r2", name: "佐藤 美咲", region: "関西", salonsManaged: 14, avgProgress: 55, topLesson: "2剤・オキシの科学" },
    { id: "r3", name: "鈴木 大輔", region: "中部", salonsManaged: 11, avgProgress: 49, topLesson: "営業トレーニング" },
    { id: "r4", name: "高橋 裕子", region: "九州", salonsManaged: 9, avgProgress: 61, topLesson: "髪の基礎" },
  ],
  popularLessons: [
    { slug: "hair-basic", title: "髪の基礎", completions: 198, avgScore: 82 },
    { slug: "ewr-products", title: "EW-R製品理解", completions: 156, avgScore: 76 },
    { slug: "developer-science", title: "2剤・オキシの科学", completions: 134, avgScore: 74 },
    { slug: "scalp-basic", title: "頭皮の基礎", completions: 121, avgScore: 79 },
    { slug: "sales-training", title: "営業トレーニング", completions: 98, avgScore: 71 },
  ],
  weakAreas: [
    { topic: "カラー理論 · 補色", accuracy: 58, attempts: 412 },
    { topic: "2剤濃度の使い分け", accuracy: 62, attempts: 387 },
    { topic: "白髪ケア · 説明表現", accuracy: 65, attempts: 298 },
    { topic: "処理剤 · 後処理設計", accuracy: 68, attempts: 256 },
  ],
};