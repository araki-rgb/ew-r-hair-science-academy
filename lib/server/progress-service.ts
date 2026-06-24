import { demoProgress } from "../data/progress";
import type { UserProgress } from "../types";
import { updateDb, readDb } from "./db";
import { logAudit } from "./audit";

export async function getUserProgress(userId: string): Promise<UserProgress> {
  const db = await readDb();
  const record = db.progress.find((p) => p.userId === userId);
  return record?.progress ?? structuredClone(demoProgress);
}

export async function saveUserProgress(
  userId: string,
  orgId: string,
  progress: UserProgress,
  auditAction = "progress.update",
) {
  const now = new Date().toISOString();
  await updateDb((db) => {
    const idx = db.progress.findIndex((p) => p.userId === userId);
    const record = { userId, orgId, progress, updatedAt: now };
    if (idx >= 0) db.progress[idx] = record;
    else db.progress.push(record);
  });

  await logAudit({
    userId,
    orgId,
    action: auditAction,
    resource: "progress",
    metadata: {
      xp: progress.xp,
      completed: progress.completedMissions.length,
    },
  });
}