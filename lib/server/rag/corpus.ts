import { lessons } from "../../data/lessons";
import { products } from "../../data/products";
import { glossaryTerms } from "../../data/glossary";
import { aiPrompts } from "../../data/ai-prompts";
import { missionSceneOverrides } from "../../content/mission-scenes";

export type RagChunk = {
  id: string;
  text: string;
  source: string;
  sourceType: "lesson" | "product" | "glossary" | "ai" | "scene";
  relatedLesson?: string;
  relatedProduct?: string;
  consultationMode?: string;
};

export function buildCorpus(): RagChunk[] {
  const chunks: RagChunk[] = [];

  for (const lesson of lessons) {
    for (const q of lesson.questions) {
      const scene = missionSceneOverrides[q.id];
      chunks.push({
        id: q.id,
        text: [
          `【${lesson.title}】${q.question}`,
          `選択肢: ${q.choices.join(" / ")}`,
          `解説: ${q.explanation}`,
          `美容師向け: ${q.hairdresserTalk}`,
          `ディーラー向け: ${q.dealerTalk}`,
          scene?.aiExplanation ? `AI解説: ${scene.aiExplanation}` : "",
          scene?.scene?.situation ? `現場: ${scene.scene.situation}` : "",
        ].filter(Boolean).join("\n"),
        source: lesson.slug,
        sourceType: "lesson",
        relatedLesson: lesson.slug,
      });
    }
  }

  for (const p of products) {
    chunks.push({
      id: `product-${p.slug}`,
      text: [
        `【製品】${p.name}: ${p.tagline}`,
        `特徴: ${p.features.join("、")}`,
        `使用シーン: ${p.scenes.join("、")}`,
        `美容師説明: ${p.hairdresserExplanation}`,
        `営業トーク: ${p.dealerTalk}`,
        ...p.faq.map((f) => `Q:${f.question} A:${f.answer}`),
      ].join("\n"),
      source: p.slug,
      sourceType: "product",
      relatedProduct: p.slug,
      relatedLesson: p.relatedLessons[0],
    });
  }

  for (const t of glossaryTerms) {
    chunks.push({
      id: `glossary-${t.term}`,
      text: `【用語】${t.term}（${t.reading}）: ${t.definition}${t.fieldTip ? ` 現場T:${t.fieldTip}` : ""}`,
      source: t.term,
      sourceType: "glossary",
      relatedLesson: t.relatedLesson,
    });
  }

  for (const p of aiPrompts) {
    chunks.push({
      id: `ai-${p.id}`,
      text: `【相談】${p.question}\n美容師: ${p.hairdresserAnswer}\nディーラー: ${p.dealerAnswer}`,
      source: p.id,
      sourceType: "ai",
      consultationMode: p.consultationMode,
      relatedLesson: p.relatedLesson,
      relatedProduct: p.relatedProduct,
    });
  }

  return chunks;
}