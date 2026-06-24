import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Database } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "db.json");

const EMPTY_DB: Database = {
  orgs: [],
  users: [],
  sessions: [],
  progress: [],
  audit: [],
  cms: { lessons: {}, products: {}, videos: {} },
};

let cache: Database | null = null;

export async function readDb(): Promise<Database> {
  if (cache) return structuredClone(cache);
  try {
    const raw = await readFile(DB_FILE, "utf-8");
    cache = JSON.parse(raw) as Database;
    return structuredClone(cache);
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    cache = structuredClone(EMPTY_DB);
    await writeFile(DB_FILE, JSON.stringify(cache, null, 2));
    return structuredClone(cache);
  }
}

export async function writeDb(db: Database): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  cache = structuredClone(db);
  await writeFile(DB_FILE, JSON.stringify(db, null, 2));
}

export async function updateDb(mutator: (db: Database) => void): Promise<Database> {
  const db = await readDb();
  mutator(db);
  await writeDb(db);
  return db;
}