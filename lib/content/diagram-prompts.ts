import type { DiagramType } from "../types";

/** Grok画像生成用プロンプト — CMSから編集・差し替え可能 */
export const diagramPrompts: Record<
  DiagramType,
  { grokPrompt: string; alt: string }
> = {
  "hair-cross-section": {
    grokPrompt:
      "Scientific cross-section illustration of human hair strand showing cuticle, cortex, and medulla layers. Clean medical-education style, soft green and white palette, labeled in Japanese. EW-R Hair Science Academy brand aesthetic, premium minimalist.",
    alt: "毛髪断面図 — キューティクル・コルテックス・メデュラの3層構造",
  },
  cuticle: {
    grokPrompt:
      "Microscopic illustration of hair cuticle scales in overlapping shingle pattern. Scientific beauty education diagram, green accent colors, Japanese labels, clean white background, professional salon science aesthetic.",
    alt: "キューティクル鱗片構造 — 表面保護層の模式図",
  },
  "hair-internal": {
    grokPrompt:
      "Detailed internal structure of hair cortex showing keratin protein bonds and melanin pigment distribution. Scientific illustration for hairdresser education, soft green palette, Japanese annotations.",
    alt: "毛髪内部構造 — ケラチン結合とメラニン分布",
  },
  "chemical-reaction": {
    grokPrompt:
      "Hair color chemistry diagram showing dye molecule penetration into cortex with 1st agent and 2nd agent interaction. Scientific salon education illustration, green and white, Japanese labels, clean professional style.",
    alt: "カラー反応 — 染料分子の毛髪内部への浸透",
  },
  "oxidation-reaction": {
    grokPrompt:
      "Oxidation reaction diagram in hair coloring showing developer (H2O2) role with melanin decolorization process. Scientific beauty education, minimalist green palette, Japanese text labels.",
    alt: "酸化反応 — 2剤（オキシ）による漂白・発色メカニズム",
  },
  "alkaline-reaction": {
    grokPrompt:
      "Alkaline reaction diagram showing cuticle opening and pH effect on hair during chemical treatment. Scientific illustration for salon professionals, soft green aesthetic, Japanese labels.",
    alt: "アルカリ反応 — キューティクル開放とpHの影響",
  },
  "scalp-environment": {
    grokPrompt:
      "Scalp cross-section illustration showing skin layers, hair follicles, sebaceous glands, and blood vessels. Scientific head spa education diagram, green and white palette, Japanese labels, premium medical illustration style.",
    alt: "頭皮構造 — 毛包・皮脂腺・血流の模式図",
  },
  "color-residue": {
    grokPrompt:
      "Illustration of post-color treatment residue on hair surface and within cuticle layer. Scientific salon aftercare education, clean diagram style, green accents, Japanese annotations.",
    alt: "カラー残留物 — 施術後の表面・内部残留イメージ",
  },
  "gray-mechanism": {
    grokPrompt:
      "Gray hair mechanism diagram showing melanocyte activity decrease with age progression. Three-stage comparison illustration, scientific beauty education, green palette, Japanese labels.",
    alt: "白髪メカニズム — メラノサイト活性の変化",
  },
  "customer-scene": {
    grokPrompt:
      "Professional salon consultation scene with hairdresser explaining hair science to client using tablet diagram. Warm modern salon interior, premium Japanese beauty brand aesthetic, soft natural lighting.",
    alt: "カウンセリングシーン — お客様への科学的説明",
  },
  "dealer-scene": {
    grokPrompt:
      "Beauty product dealer presenting EW-R OXLON line to salon owner in professional meeting. Business education context, clean modern salon back office, premium Japanese corporate aesthetic.",
    alt: "営業提案シーン — ディーラーとサロンオーナーの商談",
  },
  developer: {
    grokPrompt:
      "OXLON developer concentration comparison chart showing 3%, 6%, 9% bottles with reaction intensity visualization. Scientific product education diagram, EW-R green branding, Japanese labels.",
    alt: "オキシ濃度比較 — 3%・6%・9%の使い分け",
  },
  treatment: {
    grokPrompt:
      "Hair treatment process flow diagram: chemical service → neutralization → aftercare treatment. Scientific salon workflow illustration, green palette, Japanese step labels, premium education style.",
    alt: "施術フロー — 薬剤処理・中和・アフターケア",
  },
  product: {
    grokPrompt:
      "EW-R OXLON product line arrangement with professional salon bottles. Premium Japanese beauty manufacturer aesthetic, clean white and green, product education catalog style.",
    alt: "EW-R製品ライン — OXLONシリーズ",
  },
  sales: {
    grokPrompt:
      "Sales growth chart with salon partnership milestones for beauty product distribution. Professional business education infographic, green accent, Japanese labels, clean corporate style.",
    alt: "提案力向上 — サロン導入ステップ",
  },
  "color-wheel": {
    grokPrompt:
      "Hair color theory color wheel showing primary, secondary, and complementary colors for salon color correction. Scientific education diagram, clean illustration, Japanese annotations.",
    alt: "カラーホイール — 補色と色の関係",
  },
  "salon-scene": {
    grokPrompt:
      "Modern Japanese hair salon interior with stylist performing color treatment, educational overlay showing hair science concepts. Premium salon photography style illustration, warm lighting.",
    alt: "サロン施術シーン — カラー施術の現場イメージ",
  },
};

export function getDiagramPrompt(type: DiagramType) {
  return diagramPrompts[type] ?? diagramPrompts["hair-cross-section"];
}