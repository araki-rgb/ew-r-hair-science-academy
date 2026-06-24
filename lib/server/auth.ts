import { cookies } from "next/headers";
import { newId, signToken, verifyToken } from "./crypto";
import { ensureSeeded } from "./seed";
import { updateDb, readDb } from "./db";
import { logAudit } from "./audit";
import type { User, Session } from "./types";

const COOKIE_NAME = "ewr-session";
const SESSION_DAYS = 14;

export type AuthContext = {
  user: User;
  session: Session;
};

export async function getSessionFromRequest(request?: Request): Promise<AuthContext | null> {
  await ensureSeeded();

  let token: string | undefined;
  if (request) {
    const cookieHeader = request.headers.get("cookie") ?? "";
    const match = cookieHeader.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    token = match?.[1];
  } else {
    const jar = await cookies();
    token = jar.get(COOKIE_NAME)?.value;
  }
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const db = await readDb();
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return null;
  if (new Date(session.expiresAt) < new Date()) return null;

  const user = db.users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { user, session };
}

export async function createSession(userId: string): Promise<{ token: string; session: Session }> {
  const token = signToken(newId("sess"));
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString();
  const session: Session = {
    id: newId("session"),
    userId,
    token,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  await updateDb((db) => {
    db.sessions.push(session);
  });

  return { token, session };
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  };
}

export async function destroySession(token: string) {
  await updateDb((db) => {
    db.sessions = db.sessions.filter((s) => s.token !== token);
  });
}

export async function loginUser(email: string, password: string, verifyFn: (pw: string, hash: string) => boolean) {
  await ensureSeeded();
  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || !verifyFn(password, user.passwordHash)) return null;

  const { token, session } = await createSession(user.id);
  await logAudit({
    userId: user.id,
    orgId: user.orgId,
    userEmail: user.email,
    action: "auth.login",
    resource: "session",
  });

  return { user, token, session };
}

export function isAdminRole(role: User["role"]): boolean {
  return role === "admin" || role === "education_manager";
}