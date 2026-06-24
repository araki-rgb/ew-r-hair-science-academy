import type { DiagramType } from "../types";

/** Grok生成済み図解 — CMSで imageUrl を上書き可能 */
export const diagramImageUrls: Partial<Record<DiagramType, string>> = {
  "hair-cross-section": "/diagrams/hair-cross-section.jpg",
  "hair-internal": "/diagrams/hair-cross-section.jpg",
  "scalp-environment": "/diagrams/scalp-environment.jpg",
  "chemical-reaction": "/diagrams/chemical-reaction.jpg",
  "oxidation-reaction": "/diagrams/chemical-reaction.jpg",
  "alkaline-reaction": "/diagrams/chemical-reaction.jpg",
  developer: "/diagrams/developer.jpg",
  "gray-mechanism": "/diagrams/gray-mechanism.jpg",
  "customer-scene": "/diagrams/customer-scene.jpg",
  "salon-scene": "/diagrams/customer-scene.jpg",
  "dealer-scene": "/diagrams/customer-scene.jpg",
};

export function getDiagramImageUrl(type: DiagramType): string | null {
  return diagramImageUrls[type] ?? null;
}