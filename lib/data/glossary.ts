export type GlossaryTerm = {
  term: string;
  reading: string;
  definition: string;
  fieldTip?: string;
  relatedLesson?: string;
};

export const glossaryTerms: GlossaryTerm[] = [
  { term: "ケラチン", reading: "keratin", definition: "髪の主成分となるタンパク質。内部構造の強度や弾力に関わる。", fieldTip: "「髪の骨格のような成分」と伝えると理解されやすい。", relatedLesson: "hair-basic" },
  { term: "キューティクル", reading: "cuticle", definition: "毛髪表面を覆う鱗状の保護層。開閉状態がダメージや色味に影響。", fieldTip: "「髪の表面の扉」と例えるとイメージしやすい。", relatedLesson: "hair-basic" },
  { term: "メラニン", reading: "melanin", definition: "髪の色素。白髪はメラニン生成の低下により色が薄くなる。", relatedLesson: "color-theory" },
  { term: "アルカリ", reading: "alkaline", definition: "pHが高い状態。キューティクルを開きやすくし、薬剤の浸透に影響。", relatedLesson: "color-theory" },
  { term: "酸化", reading: "oxidation", definition: "2剤（オキシ）による発色・固定の化学反応。", fieldTip: "「色を定着させる仕上げの反応」と説明。", relatedLesson: "developer-science" },
  { term: "残留アルカリ", reading: "alkaline residue", definition: "施術後に髪や頭皮に残るアルカリ成分。ケア設計の観点で重要。", relatedLesson: "treatment-aftercare" },
  { term: "補色", reading: "color correction", definition: "不要な色味を中和・調整する考え方。カラーホイールの対角関係が基礎。", relatedLesson: "color-theory" },
  { term: "pH", reading: "pH", definition: "酸性・アルカリ性の指標。頭皮環境や施術後ケアの説明に使う。", relatedLesson: "scalp-basic" },
  { term: "ダメージ毛", reading: "damaged hair", definition: "繰り返し施術や熱により内部構造・表面保護が弱った状態の髪。", relatedLesson: "hair-basic" },
  { term: "ホームケア", reading: "home care", definition: "来店間のセルフケア。サロン施術の効果を支える継続提案。", relatedLesson: "scalp-basic" },
];