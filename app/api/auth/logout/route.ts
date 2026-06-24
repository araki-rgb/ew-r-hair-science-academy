import { NextResponse } from "next/server";
import { destroySession, getSessionFromRequest } from "@/lib/server/auth";
import { logAudit } from "@/lib/server/audit";

export async function POST(request: Request) {
  const auth = await getSessionFromRequest(request);
  if (auth) {
    await destroySession(auth.session.token);
    await logAudit({
      userId: auth.user.id,
      orgId: auth.user.orgId,
      userEmail: auth.user.email,
      action: "auth.logout",
      resource: "session",
    });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({ name: "ewr-session", value: "", httpOnly: true, path: "/", maxAge: 0 });
  return res;
}