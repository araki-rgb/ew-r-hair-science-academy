import { getDiagramPrompt } from "../content/diagram-prompts";
import { getDiagramImageUrl } from "../content/diagram-images";
import { missionSceneOverrides } from "../content/mission-scenes";
import type {
  Lesson,
  LessonQuestion,
  Mission,
  MissionQuestion,
  SceneContext,
} from "../types";

const sceneTemplates: Record<string, Partial<SceneContext>> = {
  "hair-basic": {
    location: "都内美容室 · カラーカウンセリング",
    role: "hairdresser",
    clientProfile: "30代女性 · ダメージ毛 · リターンカラー",
  },
  "scalp-basic": {
    location: "都内美容室 · 頭皮診断ブース",
    role: "hairdresser",
    clientProfile: "40代女性 · ふけ・かゆみが気になる · ホームケア相談",
  },
  "color-theory": {
    location: "都内美容室 · カラーメニュー設計",
    role: "hairdresser",
    clientProfile: "20代女性 · トーンアップ希望 · ブリーチ歴あり",
  },
  "developer-science": {
    location: "サロン商談 · 薬剤棚前",
    role: "dealer",
    clientProfile: "オーナー兼スタイリスト · 2剤使い分けに課題",
  },
  "treatment-aftercare": {
    location: "都内美容室 · シャンプー台",
    role: "hairdresser",
    clientProfile: "30代女性 · カラー直後 · 仕上がりと持続性を重視",
  },
  "ewr-products": {
    location: "代理店研修 · 製品説明会",
    role: "dealer",
    clientProfile: "新規導入検討サロン · 3店舗チェーン",
  },
  "sales-training": {
    location: "ディーラー営業 · サロン訪問",
    role: "dealer",
    clientProfile: "地方サロン · ダメージ毛のお客様が多い",
  },
  "customer-explanation": {
    location: "都内美容室 · カウンセリングチェア",
    role: "hairdresser",
    clientProfile: "50代女性 · 白髪比率50% · エイジングケア相談",
  },
};

function buildScene(lesson: Lesson, question: LessonQuestion, index: number): SceneContext {
  const override = missionSceneOverrides[question.id];
  if (override?.scene) return override.scene;
  if (question.scene) return question.scene;

  const template = sceneTemplates[lesson.slug] ?? {
    location: "EW-R Hair Science Academy · 学習シミュレーション",
    role: "both" as const,
  };

  return {
    title: `Mission ${lesson.missionNumber} · Scene ${index + 1}`,
    location: template.location ?? "サロン現場",
    role: template.role ?? "both",
    situation: `「${question.question.slice(0, 20)}${question.question.length > 20 ? "…" : ""}」に関する場面です。${lesson.title}の知識が現場で求められています。`,
    clientProfile: template.clientProfile,
    challenge: question.question,
  };
}

function buildAiExplanation(question: LessonQuestion): string {
  const override = missionSceneOverrides[question.id];
  if (override?.aiExplanation) return override.aiExplanation;
  if (question.aiExplanation) return question.aiExplanation;
  return `【AI解説】${question.explanation}\n\n科学的な視点から整理すると、この知識は施術設計と提案の両方に直結します。断定表現を避け、髪と頭皮の状態に合わせた説明を心がけましょう。`;
}

function buildSummaryPoints(question: LessonQuestion): string[] {
  const override = missionSceneOverrides[question.id];
  if (override?.summaryPoints?.length) return override.summaryPoints;
  if (question.summaryPoints?.length) return question.summaryPoints;

  const correct = question.choices[question.answerIndex];
  return [
    `正解は「${correct}」— ${question.explanation.slice(0, 60)}…`,
    `美容師向け: ${question.hairdresserTalk.replace(/[「」]/g, "")}`,
    `ディーラー向け: ${question.dealerTalk.replace(/[「」]/g, "")}`,
    "効能効果の断定表現は避け、施術設計・ケア提案の観点で伝える",
  ];
}

function resolveQuestion(
  lesson: Lesson,
  question: LessonQuestion,
  index: number,
): MissionQuestion {
  const promptMeta = getDiagramPrompt(question.diagramType);
  const generatedUrl = getDiagramImageUrl(question.diagramType);
  const imageUrl = question.diagram?.imageUrl ?? generatedUrl ?? null;
  const status: "placeholder" | "generated" | "uploaded" = question.diagram?.imageUrl
    ? "uploaded"
    : imageUrl
      ? "generated"
      : "placeholder";

  return {
    ...question,
    scene: buildScene(lesson, question, index),
    aiExplanation: buildAiExplanation(question),
    summaryPoints: buildSummaryPoints(question),
    diagram: {
      type: question.diagram?.type ?? question.diagramType,
      title: question.diagram?.title ?? question.diagramTitle,
      alt: question.diagram?.alt ?? promptMeta.alt,
      grokPrompt: question.diagram?.grokPrompt ?? promptMeta.grokPrompt,
      imageUrl,
      status,
    },
    video: {
      id: question.video?.id ?? `${question.id}-video`,
      title: question.video?.title ?? `${question.diagramTitle} — 施術解説`,
      description:
        question.video?.description ??
        "施術手順と科学的背景を解説する動画教材（準備中）",
      url: question.video?.url ?? null,
      thumbnailUrl: question.video?.thumbnailUrl ?? null,
      status: question.video?.url ? "ready" : "pending",
      duration: question.video?.duration,
    },
  };
}

/** Lesson → 完全なMissionコンテンツへ変換（CMS未入力分は自動補完） */
export function resolveMission(lesson: Lesson): Mission {
  return {
    ...lesson,
    questions: lesson.questions.map((q, i) => resolveQuestion(lesson, q, i)),
  };
}

export function getNextMission(slug: string, lessons: Lesson[]): Mission | null {
  const lesson = lessons.find((l) => l.slug === slug);
  if (!lesson?.nextMissionSlug) return null;
  const next = lessons.find((l) => l.slug === lesson.nextMissionSlug);
  return next ? resolveMission(next) : null;
}