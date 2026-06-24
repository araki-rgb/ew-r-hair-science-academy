export type UserMode = "hairdresser" | "dealer";

export type RoadmapStep = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "in-progress" | "locked" | "available";
  badge?: string;
};

export type RecommendedLesson = {
  slug: string;
  title: string;
  reason: string;
  duration: string;
  level: number;
  tag: string;
};

export const hairdresserRoadmap: RoadmapStep[] = [
  {
    slug: "hair-basic",
    title: "髪の基礎",
    description: "構造・ケラチン・ダメージメカニズムを理解",
    duration: "45分",
    status: "completed",
    badge: "修了",
  },
  {
    slug: "scalp-basic",
    title: "頭皮の基礎",
    description: "頭皮環境の見極めとホームケア提案",
    duration: "35分",
    status: "in-progress",
    badge: "学習中",
  },
  {
    slug: "color-theory",
    title: "カラー理論",
    description: "色の原理と薬剤選択の考え方",
    duration: "55分",
    status: "available",
  },
  {
    slug: "treatment-aftercare",
    title: "処理剤・後処理",
    description: "施術後ケアとダメージ抑制の設計",
    duration: "30分",
    status: "locked",
  },
  {
    slug: "customer-explanation",
    title: "お客様説明トレーニング",
    description: "専門用語をやさしく伝えるカウンセリング",
    duration: "35分",
    status: "locked",
  },
];

export const dealerRoadmap: RoadmapStep[] = [
  {
    slug: "developer-science",
    title: "2剤・オキシの科学",
    description: "濃度設計と施術品質の説明ロジック",
    duration: "40分",
    status: "available",
    badge: "推奨",
  },
  {
    slug: "ewr-products",
    title: "EW-R製品理解",
    description: "OXLONラインの特徴と提案ストーリー",
    duration: "50分",
    status: "available",
  },
  {
    slug: "sales-training",
    title: "営業トレーニング",
    description: "科学的根拠に基づく提案トーク",
    duration: "40分",
    status: "locked",
  },
  {
    slug: "color-theory",
    title: "カラー理論",
    description: "サロンへの技術説明の補強教材",
    duration: "55分",
    status: "locked",
  },
  {
    slug: "customer-explanation",
    title: "お客様説明トレーニング",
    description: "サロンスタッフへの説明支援",
    duration: "35分",
    status: "locked",
  },
];

export const hairdresserRecommendations: RecommendedLesson[] = [
  {
    slug: "scalp-basic",
    title: "頭皮の基礎",
    reason: "ホームケア提案の説得力を高める次のステップ",
    duration: "35分",
    level: 2,
    tag: "続きから",
  },
  {
    slug: "customer-explanation",
    title: "お客様説明トレーニング",
    reason: "カウンセリング品質を底上げする実践教材",
    duration: "35分",
    level: 8,
    tag: "おすすめ",
  },
  {
    slug: "treatment-aftercare",
    title: "処理剤・後処理",
    reason: "施術後のフォロー提案に直結する知識",
    duration: "30分",
    level: 5,
    tag: "人気",
  },
];

export const dealerRecommendations: RecommendedLesson[] = [
  {
    slug: "ewr-products",
    title: "EW-R製品理解",
    reason: "OXLONラインの提案ストーリーを体系化",
    duration: "50分",
    level: 6,
    tag: "必須",
  },
  {
    slug: "developer-science",
    title: "2剤・オキシの科学",
    reason: "濃度使い分けの営業トークを強化",
    duration: "40分",
    level: 4,
    tag: "推奨",
  },
  {
    slug: "sales-training",
    title: "営業トレーニング",
    reason: "サロン訪問前のロールプレイ教材",
    duration: "40分",
    level: 7,
    tag: "実践",
  },
];

const ROADMAP_TEMPLATES: Record<UserMode, RoadmapStep[]> = {
  hairdresser: hairdresserRoadmap,
  dealer: dealerRoadmap,
};

export function getRoadmap(mode: UserMode) {
  return ROADMAP_TEMPLATES[mode];
}

export function applyProgressToRoadmap(
  mode: UserMode,
  completedMissions: string[],
  nextLessonSlug?: string,
): RoadmapStep[] {
  const template = ROADMAP_TEMPLATES[mode];
  return template.map((step, i) => {
    if (completedMissions.includes(step.slug)) {
      return { ...step, status: "completed" as const, badge: "修了" };
    }
    const prevDone = i === 0 || completedMissions.includes(template[i - 1].slug);
    if (!prevDone) {
      return { ...step, status: "locked" as const, badge: undefined };
    }
    if (step.slug === nextLessonSlug) {
      return { ...step, status: "in-progress" as const, badge: "学習中" };
    }
    return { ...step, status: "available" as const, badge: step.badge ?? undefined };
  });
}

export function getRecommendations(mode: UserMode, completedMissions: string[] = []) {
  const base = mode === "hairdresser" ? hairdresserRecommendations : dealerRecommendations;
  return base.filter((l) => !completedMissions.includes(l.slug));
}