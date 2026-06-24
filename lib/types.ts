/** CMS-ready content types — all fields designed for future admin editing */

export type DiagramType =
  | "hair-cross-section"
  | "cuticle"
  | "hair-internal"
  | "chemical-reaction"
  | "oxidation-reaction"
  | "alkaline-reaction"
  | "scalp-environment"
  | "color-residue"
  | "gray-mechanism"
  | "customer-scene"
  | "dealer-scene"
  | "developer"
  | "treatment"
  | "product"
  | "sales"
  | "color-wheel"
  | "salon-scene";

/** Grok画像生成 / CMSアップロード対応の図解アセット */
export type DiagramAsset = {
  type: DiagramType;
  title: string;
  alt: string;
  grokPrompt: string;
  imageUrl: string | null;
  status: "placeholder" | "generated" | "uploaded";
};

/** 動画教材アセット — url差し替えで本番投入可能 */
export type VideoAsset = {
  id: string;
  title: string;
  description: string;
  url: string | null;
  thumbnailUrl: string | null;
  status: "pending" | "ready";
  duration?: string;
};

/** 現場シーン — ストーリー型学習の起点 */
export type SceneContext = {
  title: string;
  location: string;
  role: "hairdresser" | "dealer" | "both";
  situation: string;
  clientProfile?: string;
  challenge: string;
};

export type LessonQuestion = {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
  hairdresserTalk: string;
  dealerTalk: string;
  diagramType: DiagramType;
  diagramTitle: string;
  /** CMS: 個別上書き可能。未設定時はリゾルバーが生成 */
  scene?: SceneContext;
  aiExplanation?: string;
  summaryPoints?: string[];
  diagram?: Partial<DiagramAsset>;
  video?: Partial<VideoAsset>;
};

export type Lesson = {
  slug: string;
  categorySlug: string;
  level: number;
  title: string;
  description: string;
  duration: string;
  lessonNumber: number;
  missionNumber: number;
  xpReward: number;
  nextMissionSlug: string | null;
  questions: LessonQuestion[];
};

/** リゾルバー適用後の完全ミッションコンテンツ */
export type MissionQuestion = LessonQuestion & {
  scene: SceneContext;
  aiExplanation: string;
  summaryPoints: string[];
  diagram: DiagramAsset;
  video: VideoAsset;
};

export type Mission = Omit<Lesson, "questions"> & {
  questions: MissionQuestion[];
};

export type Category = {
  slug: string;
  level: number;
  title: string;
  description: string;
  duration: string;
  lessonCount: number;
  icon: string;
};

export type ProductFAQ = {
  id: string;
  question: string;
  answer: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  features: string[];
  scenes: string[];
  recommendedTargets: string[];
  hairdresserExplanation: string;
  dealerTalk: string;
  cautions: string[];
  faq: ProductFAQ[];
  relatedLessons: string[];
  relatedProducts: string[];
  diagramType: DiagramType;
};

export type AIConsultationMode =
  | "treatment"
  | "chemical"
  | "sales"
  | "product";

export type AIPrompt = {
  id: string;
  question: string;
  answer: string;
  hairdresserAnswer: string;
  dealerAnswer: string;
  answerVariants: string[];
  category: string;
  consultationMode: AIConsultationMode;
  relatedLesson?: string;
  relatedProduct?: string;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  xpBonus: number;
  icon: "star" | "science" | "sales" | "streak" | "cert";
};

export type Certification = {
  id: string;
  title: string;
  level: number;
  description: string;
  earned: boolean;
  earnedAt?: string;
};

export type UserProgress = {
  xp: number;
  level: number;
  completedLessons: string[];
  completedMissions: string[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
  quizBestScore: number;
  quizPassed: boolean;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  certifications: Certification[];
  nextLessonSlug: string;
  dailyGoalXp: number;
  todayXp: number;
};

export type AdminStore = {
  id: string;
  name: string;
  region: string;
  learners: number;
  progress: number;
  completionRate: number;
};

export type AdminSalesRep = {
  id: string;
  name: string;
  region: string;
  salonsManaged: number;
  avgProgress: number;
  topLesson: string;
};

export type AdminWeakArea = {
  topic: string;
  accuracy: number;
  attempts: number;
};

export type AdminPopularLesson = {
  slug: string;
  title: string;
  completions: number;
  avgScore: number;
};

export type AdminDashboard = {
  overview: {
    totalLearners: number;
    activeThisWeek: number;
    avgProgress: number;
    completionRate: number;
    avgAccuracy: number;
    totalXpEarned: number;
  };
  stores: AdminStore[];
  salesReps: AdminSalesRep[];
  popularLessons: AdminPopularLesson[];
  weakAreas: AdminWeakArea[];
};