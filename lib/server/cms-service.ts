import type { Lesson, Product } from "../types";
import { lessons } from "../data/lessons";
import { products } from "../data/products";
import { missionVideos } from "../content/videos";
import { readDb, updateDb } from "./db";
import { logAudit } from "./audit";
import type { CmsOverrides } from "./types";

export async function getCmsOverrides(): Promise<CmsOverrides> {
  const db = await readDb();
  return db.cms;
}

export function applyLessonOverrides(lesson: Lesson, overrides: CmsOverrides): Lesson {
  const o = overrides.lessons[lesson.slug];
  if (!o) return lesson;

  return {
    ...lesson,
    title: o.title ?? lesson.title,
    description: o.description ?? lesson.description,
    questions: lesson.questions.map((q) => {
      const qo = o.questions?.[q.id];
      if (!qo) return q;
      return {
        ...q,
        explanation: qo.explanation ?? q.explanation,
        hairdresserTalk: qo.hairdresserTalk ?? q.hairdresserTalk,
        dealerTalk: qo.dealerTalk ?? q.dealerTalk,
      };
    }),
  };
}

export function applyProductOverrides(product: Product, overrides: CmsOverrides): Product {
  const o = overrides.products[product.slug];
  if (!o) return product;
  return {
    ...product,
    tagline: o.tagline ?? product.tagline,
    hairdresserExplanation: o.hairdresserExplanation ?? product.hairdresserExplanation,
    dealerTalk: o.dealerTalk ?? product.dealerTalk,
  };
}

export function getMergedVideos(overrides: CmsOverrides) {
  const merged = { ...missionVideos };
  for (const [id, o] of Object.entries(overrides.videos)) {
    merged[id] = { ...merged[id], ...o };
  }
  return merged;
}

export async function updateLessonCms(
  slug: string,
  patch: CmsOverrides["lessons"][string],
  userId: string,
  orgId: string,
) {
  await updateDb((db) => {
    db.cms.lessons[slug] = { ...db.cms.lessons[slug], ...patch };
    db.cms.updatedAt = new Date().toISOString();
  });
  await logAudit({ userId, orgId, action: "cms.lesson.update", resource: slug, metadata: patch as Record<string, unknown> });
}

export async function updateProductCms(
  slug: string,
  patch: CmsOverrides["products"][string],
  userId: string,
  orgId: string,
) {
  await updateDb((db) => {
    db.cms.products[slug] = { ...db.cms.products[slug], ...patch };
    db.cms.updatedAt = new Date().toISOString();
  });
  await logAudit({ userId, orgId, action: "cms.product.update", resource: slug, metadata: patch as Record<string, unknown> });
}

export async function updateVideoCms(
  id: string,
  patch: CmsOverrides["videos"][string],
  userId: string,
  orgId: string,
) {
  await updateDb((db) => {
    db.cms.videos[id] = { ...db.cms.videos[id], ...patch };
    db.cms.updatedAt = new Date().toISOString();
  });
  await logAudit({ userId, orgId, action: "cms.video.update", resource: id, metadata: patch as Record<string, unknown> });
}

export function getLessonWithCms(slug: string, overrides: CmsOverrides): Lesson | undefined {
  const base = lessons.find((l) => l.slug === slug);
  if (!base) return undefined;
  return applyLessonOverrides(base, overrides);
}

export function getProductWithCms(slug: string, overrides: CmsOverrides): Product | undefined {
  const base = products.find((p) => p.slug === slug);
  if (!base) return undefined;
  return applyProductOverrides(base, overrides);
}