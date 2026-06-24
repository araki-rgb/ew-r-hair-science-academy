import type { DiagramType } from "../types";

/** 全16種の図解タイプ — Grok生成済み画像（CMSで上書き可能） */
export const diagramImageUrls: Record<DiagramType, string> = {
  "hair-cross-section": "/diagrams/hair-cross-section.jpg",
  cuticle: "/diagrams/cuticle.jpg",
  "hair-internal": "/diagrams/hair-internal.jpg",
  "chemical-reaction": "/diagrams/chemical-reaction.jpg",
  "oxidation-reaction": "/diagrams/oxidation-reaction.jpg",
  "alkaline-reaction": "/diagrams/alkaline-reaction.jpg",
  "scalp-environment": "/diagrams/scalp-environment.jpg",
  "color-residue": "/diagrams/color-residue.jpg",
  "gray-mechanism": "/diagrams/gray-mechanism.jpg",
  "customer-scene": "/diagrams/customer-scene.jpg",
  "dealer-scene": "/diagrams/dealer-scene.jpg",
  developer: "/diagrams/developer.jpg",
  treatment: "/diagrams/treatment.jpg",
  product: "/diagrams/product.jpg",
  sales: "/diagrams/sales.jpg",
  "color-wheel": "/diagrams/color-wheel.jpg",
  "salon-scene": "/diagrams/salon-scene.jpg",
};

export function getDiagramImageUrl(type: DiagramType): string {
  return diagramImageUrls[type];
}

export const diagramGallery = Object.entries(diagramImageUrls).map(([type, url]) => ({
  type: type as DiagramType,
  url,
}));