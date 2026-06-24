import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/server/auth";
import { getUserProgress, saveUserProgress } from "@/lib/server/progress-service";
import type { UserProgress } from "@/lib/types";

export async function GET(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (!auth) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });

  const progress = await getUserProgress(auth.user.id);
  return NextResponse.json({ progress });
}

export async function PUT(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (!auth) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });

  const { progress } = await request.json() as { progress?: UserProgress };
  if (!progress) return NextResponse.json({ error: "progress が必要です" }, { status: 400 });

  await saveUserProgress(auth.user.id, auth.user.orgId, progress);
  return NextResponse.json({ ok: true });
}