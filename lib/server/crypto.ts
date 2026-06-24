import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password: string, salt?: string): string {
  const s = salt ?? randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, s, 10000, 32, "sha256").toString("hex");
  return `${s}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [s, hash] = stored.split(":");
  if (!s || !hash) return false;
  const check = pbkdf2Sync(password, s, 10000, 32, "sha256").toString("hex");
  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(check));
  } catch {
    return false;
  }
}

export function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "ewr-dev-session-secret-change-in-production";
}

export function signToken(payload: string): string {
  const sig = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyToken(token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx < 0) return null;
  const payload = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
  try {
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  return payload;
}

export function newId(prefix: string): string {
  return `${prefix}_${randomBytes(12).toString("hex")}`;
}