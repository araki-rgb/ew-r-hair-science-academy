import type { RagChunk } from "./corpus";
import { buildCorpus } from "./corpus";

function tokenize(text: string): string[] {
  const normalized = text.toLowerCase().replace(/[、。．！？\s]+/g, " ");
  const words = normalized.split(" ").filter((w) => w.length > 1);
  const chars = [...text.replace(/\s/g, "")];
  const bigrams: string[] = [];
  for (let i = 0; i < chars.length - 1; i++) bigrams.push(chars[i] + chars[i + 1]);
  return [...new Set([...words, ...bigrams])];
}

function scoreChunk(query: string, chunk: RagChunk): number {
  const qTokens = tokenize(query);
  const text = chunk.text.toLowerCase();
  let score = 0;
  for (const t of qTokens) {
    if (text.includes(t.toLowerCase())) score += t.length > 2 ? 2 : 1;
  }
  if (text.includes(query.slice(0, 6).toLowerCase())) score += 5;
  return score;
}

export function retrieveChunks(
  query: string,
  opts?: { mode?: string; limit?: number },
): RagChunk[] {
  const corpus = buildCorpus();
  const pool = opts?.mode
    ? corpus.filter(
        (c) =>
          !c.consultationMode ||
          c.consultationMode === opts.mode ||
          c.sourceType !== "ai",
      )
    : corpus;

  return pool
    .map((c) => ({ chunk: c, score: scoreChunk(query, c) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, opts?.limit ?? 5)
    .map((x) => x.chunk);
}