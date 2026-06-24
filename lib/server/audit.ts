import { updateDb } from "./db";
import { newId } from "./crypto";
import type { AuditEntry } from "./types";

export async function logAudit(params: {
  userId?: string | null;
  orgId?: string | null;
  userEmail?: string;
  action: string;
  resource: string;
  metadata?: Record<string, unknown>;
}) {
  const entry: AuditEntry = {
    id: newId("audit"),
    userId: params.userId ?? null,
    orgId: params.orgId ?? null,
    userEmail: params.userEmail,
    action: params.action,
    resource: params.resource,
    metadata: params.metadata ?? {},
    at: new Date().toISOString(),
  };

  await updateDb((db) => {
    db.audit.unshift(entry);
    if (db.audit.length > 5000) db.audit = db.audit.slice(0, 5000);
  });

  return entry;
}

export async function getAuditLog(orgId: string, limit = 100): Promise<AuditEntry[]> {
  const { readDb } = await import("./db");
  const db = await readDb();
  return db.audit.filter((a) => a.orgId === orgId).slice(0, limit);
}