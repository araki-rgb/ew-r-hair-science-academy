export type DiagramType =
  | "hair-cross-section"
  | "cuticle"
  | "chemical-reaction"
  | "scalp-environment"
  | "color-residue"
  | "gray-mechanism"
  | "customer-scene"
  | "dealer-scene"
  | "developer"
  | "treatment"
  | "product"
  | "sales"
  | "color-wheel";

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
};

export type Lesson = {
  slug: string;
  categorySlug: string;
  level: number;
  title: string;
  description: string;
  duration: string;
  lessonNumber: number;
  questions: LessonQuestion[];
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

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  features: string[];
  scenes: string[];
  hairdresserExplanation: string;
  dealerTalk: string;
  cautions: string[];
  diagramType: DiagramType;
};

export type AIPrompt = {
  id: string;
  question: string;
  answer: string;
  hairdresserAnswer: string;
  dealerAnswer: string;
  answerVariants: string[];
  category: string;
  relatedLesson?: string;
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
};

export type UserProgress = {
  completedLessons: string[];
  totalQuestionsAnswered: number;
  correctAnswers: number;
  quizBestScore: number;
  quizPassed: boolean;
  currentStreak: number;
  badges: Badge[];
  nextLessonSlug: string;
};