/**
 * CMS Schema Reference
 * ─────────────────────
 * 将来の管理画面で編集可能なコンテンツエンティティ。
 * すべて lib/data/ または lib/content/ に分離済み。
 *
 * Entities:
 *  - lessons      → lib/data/lessons/*.ts     (Mission定義)
 *  - categories   → lib/data/categories.ts
 *  - products     → lib/data/products.ts
 *  - ai-prompts   → lib/data/ai-prompts.ts
 *  - progress     → lib/data/progress.ts      (デモユーザー)
 *  - gamification → lib/data/gamification.ts  (XP/レベル設定)
 *  - admin        → lib/data/admin.ts         (管理画面データ)
 *  - diagrams     → lib/content/diagram-prompts.ts (Grokプロンプト)
 *
 * Media Assets:
 *  - diagram.imageUrl  → Grok生成 or CMSアップロード
 *  - video.url         → CMSアップロードで差し替え
 *
 * Resolver:
 *  - lib/cms/resolve-mission.ts → 未入力フィールドの自動補完
 */

export const CMS_ENTITIES = [
  "lessons",
  "categories",
  "products",
  "ai-prompts",
  "diagram-prompts",
  "gamification",
  "badges",
  "certifications",
] as const;

export type CMSEntity = (typeof CMS_ENTITIES)[number];