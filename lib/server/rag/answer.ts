import type { AIConsultationMode } from "../../types";
import { retrieveChunks } from "./retrieve";
import { callLlm } from "./llm";

const COMPLIANCE_SUFFIX =
  "\n\n※ 本回答は施術設計・ケア提案の観点での参考情報です。効能効果の断定表現は避け、お客様の状態に合わせた個別設計を心がけてください。";

export async function generateRagAnswer(params: {
  message: string;
  mode?: AIConsultationMode;
  userMode?: "hairdresser" | "dealer";
}) {
  const { message, mode, userMode = "hairdresser" } = params;
  const chunks = retrieveChunks(message, { mode, limit: 5 });

  if (chunks.length === 0) {
    return {
      answer: "教材データベースに該当する情報が見つかりませんでした。別の表現で質問するか、関連Missionをご確認ください。" + COMPLIANCE_SUFFIX,
      variants: [] as string[],
      relatedLesson: null as string | null,
      relatedProduct: null as string | null,
      source: "fallback" as const,
      citations: [] as string[],
    };
  }

  const context = chunks.map((c, i) => `[${i + 1}] ${c.text}`).join("\n\n");
  const llmAnswer = await callLlm(message, context, userMode);

  const top = chunks[0];
  const synthesize = () => {
    const parts = chunks.slice(0, 3).map((c) => {
      const lines = c.text.split("\n").filter((l) => l.length > 10);
      return lines.slice(0, 2).join(" ");
    });
    const intro = userMode === "dealer"
      ? "【ディーラー向け回答】教材データベースに基づく回答です。\n\n"
      : "【美容師向け回答】教材データベースに基づく回答です。\n\n";
    return intro + parts.join("\n\n");
  };

  const answer = (llmAnswer ?? synthesize()) + COMPLIANCE_SUFFIX;
  const variants = chunks.slice(1, 3).map((c) => {
    const line = c.text.split("\n").find((l) => l.startsWith("美容師") || l.startsWith("ディーラー") || l.startsWith("解説"));
    return line ?? c.text.slice(0, 120) + "…";
  });

  return {
    answer,
    variants,
    relatedLesson: top.relatedLesson ?? null,
    relatedProduct: top.relatedProduct ?? null,
    source: llmAnswer ? ("llm-rag" as const) : ("rag" as const),
    citations: chunks.map((c) => c.source),
    consultationMode: mode,
  };
}