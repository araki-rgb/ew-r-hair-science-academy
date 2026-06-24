import { NextResponse } from "next/server";
import { getSessionFromRequest, isAdminRole } from "@/lib/server/auth";
import { getAuditLog } from "@/lib/server/audit";

export async function GET(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (!auth || !isAdminRole(auth.user.role)) {
    return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Number(url.searchParams.get("limit") ?? 100);
  const entries = await getAuditLog(auth.user.orgId, limit);
  return NextResponse.json({ entries });
}