import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/server/auth";
import { getUserProgress, saveUserProgress } from "@/lib/server/progress-service";
import { applyQuizComplete } from "@/lib/progress/logic";

export async function POST(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (!auth) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });

  const { score, correct, total } = await request.json() as {
    score?: number;
    correct?: number;
    total?: number;
  };

  const current = await getUserProgress(auth.user.id);
  const next = applyQuizComplete(current, score ?? 0, correct ?? 0, total ?? 10);
  await saveUserProgress(auth.user.id, auth.user.orgId, next, "progress.quiz_complete");

  return NextResponse.json({ progress: next });
}