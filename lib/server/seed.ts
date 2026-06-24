import { demoProgress } from "../data/progress";
import { hashPassword } from "./crypto";
import { readDb, writeDb } from "./db";
import type { Database } from "./types";

export async function ensureSeeded(): Promise<Database> {
  const db = await readDb();
  if (db.orgs.length > 0) return db;

  const orgId = "org_ewr_demo";
  const now = new Date().toISOString();

  const seeded: Database = {
    ...db,
    orgs: [
      { id: orgId, name: "EW-R株式会社（デモ）", code: "ewr-demo", createdAt: now },
    ],
    users: [
      {
        id: "user_admin",
        orgId,
        email: "admin@ew-r.co.jp",
        name: "教育管理者",
        passwordHash: hashPassword("ewr2026"),
        role: "admin",
        jobTitle: "教育責任者",
        createdAt: now,
      },
      {
        id: "user_learner",
        orgId,
        email: "learner@ew-r.co.jp",
        name: "山田 花子",
        passwordHash: hashPassword("ewr2026"),
        role: "learner",
        jobTitle: "スタイリスト",
        salonName: "Hair Studio Aoyama",
        createdAt: now,
      },
      {
        id: "user_dealer",
        orgId,
        email: "dealer@ew-r.co.jp",
        name: "田中 健太",
        passwordHash: hashPassword("ewr2026"),
        role: "sales_manager",
        jobTitle: "営業担当",
        createdAt: now,
      },
    ],
    progress: [
      {
        userId: "user_learner",
        orgId,
        progress: structuredClone(demoProgress),
        updatedAt: now,
      },
    ],
    cms: { lessons: {}, products: {}, videos: {} },
  };

  await writeDb(seeded);
  return seeded;
}