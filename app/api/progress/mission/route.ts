import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/server/auth";
import { getUserProgress, saveUserProgress } from "@/lib/server/progress-service";
import { applyMissionComplete } from "@/lib/progress/logic";

export async function POST(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (!auth) return NextResponse.json({ error: "認証が必要です" }, { status: 401 });

  const { slug, xpEarned, accuracy } = await request.json() as {
    slug?: string;
    xpEarned?: number;
    accuracy?: number;
  };

  if (!slug) return NextResponse.json({ error: "slug が必要です" }, { status: 400 });

  const current = await getUserProgress(auth.user.id);
  const next = applyMissionComplete(current, slug, xpEarned ?? 0, accuracy ?? 0);
  await saveUserProgress(auth.user.id, auth.user.orgId, next, "progress.mission_complete");

  return NextResponse.json({ progress: next });
}