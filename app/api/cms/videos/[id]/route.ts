import { NextResponse } from "next/server";
import { getSessionFromRequest, isAdminRole } from "@/lib/server/auth";
import { updateVideoCms } from "@/lib/server/cms-service";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const auth = await getSessionFromRequest(request);
  if (!auth || !isAdminRole(auth.user.role)) {
    return NextResponse.json({ error: "管理者権限が必要です" }, { status: 403 });
  }

  const { id } = await params;
  const patch = await request.json();
  await updateVideoCms(id, patch, auth.user.id, auth.user.orgId);
  return NextResponse.json({ ok: true });
}