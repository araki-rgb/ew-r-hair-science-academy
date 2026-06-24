import { NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/server/auth";
import { readDb } from "@/lib/server/db";
import { ensureSeeded } from "@/lib/server/seed";

export async function GET(request: Request) {
  await ensureSeeded();
  const auth = await getSessionFromRequest(request);
  if (!auth) return NextResponse.json({ user: null });

  const db = await readDb();
  const org = db.orgs.find((o) => o.id === auth.user.orgId);

  return NextResponse.json({
    user: {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.name,
      role: auth.user.role,
      orgId: auth.user.orgId,
      orgName: org?.name,
      jobTitle: auth.user.jobTitle,
      salonName: auth.user.salonName,
    },
  });
}