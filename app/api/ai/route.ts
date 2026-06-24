import { NextResponse } from "next/server";
import { aiPrompts } from "@/lib/data/ai-prompts";
import type { AIConsultationMode } from "@/lib/types";

const COMPLIANCE_SUFFIX =
  "\n\n※ 本回答は施術設計・ケア提案の観点での参考情報です。効能効果の断定表現は避け、お客様の状態に合わせた個別設計を心がけてください。";

function findBestMatch(query: string, mode?: AIConsultationMode) {
  const normalized = query.trim().toLowerCase();
  const pool = mode ? aiPrompts.filter((p) => p.consultationMode === mode) : aiPrompts;

  const exact = pool.find((p) => p.question === query.trim());
  if (exact) return exact;

  const partial = pool.find(
    (p) =>
      normalized.includes(p.question.slice(0, 4).toLowerCase()) ||
      p.question.toLowerCase().includes(normalized.slice(0, 6)),
  );
  if (partial) return partial;

  return pool[0];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, mode, userMode } = body as {
      message?: string;
      mode?: AIConsultationMode;
      userMode?: "hairdresser" | "dealer";
    };

    if (!message?.trim()) {
      return NextResponse.json({ error: "質問を入力してください" }, { status: 400 });
    }

    const match = findBestMatch(message, mode);
    if (!match) {
      return NextResponse.json({
        answer: "該当する回答が見つかりませんでした。別の表現で質問してみてください。" + COMPLIANCE_SUFFIX,
        variants: [],
        relatedLesson: null,
        relatedProduct: null,
        source: "fallback",
      });
    }

    const answer =
      userMode === "dealer" ? match.dealerAnswer : match.hairdresserAnswer;

    return NextResponse.json({
      answer: answer + COMPLIANCE_SUFFIX,
      variants: match.answerVariants,
      relatedLesson: match.relatedLesson ?? null,
      relatedProduct: match.relatedProduct ?? null,
      category: match.category,
      consultationMode: match.consultationMode,
      source: "knowledge-base",
      llmReady: true,
    });
  } catch {
    return NextResponse.json({ error: "リクエストの処理に失敗しました" }, { status: 500 });
  }
}