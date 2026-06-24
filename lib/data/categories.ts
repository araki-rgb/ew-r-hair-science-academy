import type { Category } from "../types";

export const categories: Category[] = [
  {
    slug: "hair-basic",
    level: 1,
    title: "髪の基礎",
    description: "毛髪の構造と主成分を理解し、ダメージのメカニズムを正しく捉えます。",
    duration: "約45分",
    lessonCount: 1,
    icon: "hair",
  },
  {
    slug: "scalp-basic",
    level: 2,
    title: "頭皮の基礎",
    description: "頭皮環境の見極め方と、健やかな髪を育むためのケア視点を学びます。",
    duration: "約35分",
    lessonCount: 1,
    icon: "scalp",
  },
  {
    slug: "color-theory",
    level: 3,
    title: "カラー理論",
    description: "色の原理と薬剤選択の考え方を整理し、再現性の高い施術設計につなげます。",
    duration: "約55分",
    lessonCount: 1,
    icon: "color",
  },
  {
    slug: "developer-science",
    level: 4,
    title: "2剤・オキシの科学",
    description: "1剤・2剤の役割と酸化の仕組みを理解し、施術時の負担に配慮した設計を学びます。",
    duration: "約40分",
    lessonCount: 1,
    icon: "developer",
  },
  {
    slug: "treatment-aftercare",
    level: 5,
    title: "処理剤・後処理",
    description: "施術後のケア設計と、ダメージを抑える後処理のポイントを習得します。",
    duration: "約30分",
    lessonCount: 1,
    icon: "treatment",
  },
  {
    slug: "ewr-products",
    level: 6,
    title: "EW-R製品理解",
    description: "EW-R製品ラインの特徴と成分の考え方を整理し、現場で伝えられる知識を身につけます。",
    duration: "約50分",
    lessonCount: 1,
    icon: "product",
  },
  {
    slug: "sales-training",
    level: 7,
    title: "営業トレーニング",
    description: "科学的根拠に基づく提案トークを練習し、サロン提案の幅を広げます。",
    duration: "約40分",
    lessonCount: 1,
    icon: "sales",
  },
  {
    slug: "customer-explanation",
    level: 8,
    title: "お客様説明トレーニング",
    description: "専門用語をやさしく伝える方法と、納得感のあるカウンセリング表現を学びます。",
    duration: "約35分",
    lessonCount: 1,
    icon: "customer",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}