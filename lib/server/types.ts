import type { UserProgress } from "../types";

export type Org = {
  id: string;
  name: string;
  code: string;
  createdAt: string;
};

export type UserRole = "learner" | "admin" | "education_manager" | "sales_manager";

export type User = {
  id: string;
  orgId: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;
  jobTitle?: string;
  salonName?: string;
  createdAt: string;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
};

export type UserProgressRecord = {
  userId: string;
  orgId: string;
  progress: UserProgress;
  updatedAt: string;
};

export type AuditEntry = {
  id: string;
  userId: string | null;
  orgId: string | null;
  userEmail?: string;
  action: string;
  resource: string;
  metadata: Record<string, unknown>;
  at: string;
};

export type CmsOverrides = {
  lessons: Record<string, { title?: string; description?: string; questions?: Record<string, { explanation?: string; hairdresserTalk?: string; dealerTalk?: string }> }>;
  products: Record<string, { tagline?: string; hairdresserExplanation?: string; dealerTalk?: string }>;
  videos: Record<string, { url?: string; title?: string; description?: string; duration?: string }>;
  updatedAt?: string;
};

export type Database = {
  orgs: Org[];
  users: User[];
  sessions: Session[];
  progress: UserProgressRecord[];
  audit: AuditEntry[];
  cms: CmsOverrides;
};