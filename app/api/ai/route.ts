import { NextResponse } from "next/server";
import type { AIConsultationMode } from "@/lib/types";
import { generateRagAnswer } from "@/lib/server/rag/answer";
import { getSessionFromRequest } from "@/lib/server/auth";
import { logAudit } from "@/lib/server/audit";

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

    const result = await generateRagAnswer({ message, mode, userMode });

    const auth = await getSessionFromRequest(request);
    await logAudit({
      userId: auth?.user.id ?? null,
      orgId: auth?.user.orgId ?? null,
      userEmail: auth?.user.email,
      action: "ai.consult",
      resource: "rag",
      metadata: { query: message.slice(0, 80), source: result.source },
    });

    return NextResponse.json({
      ...result,
      llmReady: true,
    });
  } catch {
    return NextResponse.json({ error: "リクエストの処理に失敗しました" }, { status: 500 });
  }
}