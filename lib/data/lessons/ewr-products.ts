import type { Lesson } from "../../types";

export const ewrProductsLesson: Lesson = {
  slug: "ewr-products",
  categorySlug: "ewr-products",
  level: 6,
  title: "EW-R製品理解",
  description:
    "EW-R製品ラインの特徴と成分の考え方を整理し、現場で伝えられる知識を身につけます。",
  duration: "約50分",
  lessonNumber: 1,
  questions: [
    {
      id: "ewr-products-1",
      question: "OXLONラインの設計思想として適切なものはどれですか？",
      choices: [
        "施術時の負担に配慮した設計と、施術品質の向上を両立する",
        "すべての髪に同一処方で対応する",
        "医薬品的な効能を謳う",
        "施術前の準備のみに特化する",
      ],
      answerIndex: 0,
      explanation:
        "OXLONラインは、施術時の負担に配慮した設計と施術品質の向上を両立することを目指しています。2剤濃度の使い分けや前処理・アフターケアまで、施術全体を支えるライン設計です。",
      hairdresserTalk:
        "「OXLONは髪の状態に合わせて使い分けられる設計です。今日の施術に最適な選択をご提案します。」",
      dealerTalk:
        "「ライン全体のストーリーで提案すると、単品販売ではなく施術品質の底上げとして訴求できます。」",
      diagramType: "product",
      diagramTitle: "OXLONライン — 施術設計を支える製品群",
    },
    {
      id: "ewr-products-2",
      question: "OXLON 3%の主な使用シーンとして適切なものはどれですか？",
      choices: [
        "ダメージ毛への繊細なカラー設計",
        "すべてのブリーチ施術",
        "頭皮の治療目的",
        "ホームカラー専用",
      ],
      answerIndex: 0,
      explanation:
        "OXLON 3%は低濃度設計で、ダメージ毛や既染毛への繊細な施術設計に対応します。反応の穏やかさを重視した選択肢として、髪の状態に配慮した施術に活用できます。",
      hairdresserTalk:
        "「毛先の状態を見ると、3%の繊細な設計が向いていることもあります。負担に配慮した施術をしましょう。」",
      dealerTalk:
        "「ダメージ毛が多いサロンでは、3%の提案が施術品質の差別化になります。」",
      diagramType: "developer",
      diagramTitle: "OXLON 3% — 繊細な施術設計への対応",
    },
    {
      id: "ewr-products-3",
      question: "OXLON PreClear Shampooの役割として正しいものはどれですか？",
      choices: [
        "施術前の前処理で、施術の再現性向上をサポートする",
        "施術後のダメージを完全に修復する",
        "白髪をなくすための治療用シャンプー",
        "頭皮の発毛を促進する",
      ],
      answerIndex: 0,
      explanation:
        "OXLON PreClear Shampooは施術前の洗髪工程を想定した前処理製品です。施術前の土台づくりにより、色味の入り方や仕上がりの安定性に配慮した設計が可能になります。",
      hairdresserTalk:
        "「施術前の準備は仕上がりに影響します。前処理の工程も丁寧にご説明しますね。」",
      dealerTalk:
        "「前処理提案は施術品質の底上げとして差別化できます。技術力を支える提案として有効です。」",
      diagramType: "product",
      diagramTitle: "PreClear Shampoo — 施術前の土台づくり",
    },
    {
      id: "ewr-products-4",
      question: "OXLON After Breakの提案ポイントとして適切なものはどれですか？",
      choices: [
        "施術後のケア設計とホームケアへの橋渡し",
        "施術中の1剤の代替使用",
        "頭皮疾患の治療",
        "パーマ液の2剤代替",
      ],
      answerIndex: 0,
      explanation:
        "OXLON After Breakは施術後の髪状態への配慮を重視したアフターケア製品です。サロンでの施術後ケアからホームケアへの継続提案につなげる設計が可能です。",
      hairdresserTalk:
        "「施術後のケアは仕上がりの印象を左右します。お家でのケアも一緒に設計しましょう。」",
      dealerTalk:
        "「アフターケアはリピート率と単価向上に直結します。施術メニューとのセット提案が効果的です。」",
      diagramType: "treatment",
      diagramTitle: "After Break — 施術後ケアの継続提案",
    },
    {
      id: "ewr-products-5",
      question: "OXLON GrayShadeの提案で適切な表現はどれですか？",
      choices: [
        "白髪の状態に合わせたエイジングケア視点のカラー設計をご提案します",
        "白髪がなくなるカラー剤です",
        "発毛を促進するカラー剤です",
        "頭皮の病気が治る製品です",
      ],
      answerIndex: 0,
      explanation:
        "OXLON GrayShadeは白髪のお客様への提案設計を意識した製品ラインです。「白髪がなくなる」等の断定表現は避け、エイジングケア視点で髪と頭皮の状態に合わせたケア設計を提案しましょう。",
      hairdresserTalk:
        "「白髪の状態はお客様ごとに異なります。髪と頭皮の状態を確認しながら、無理のないケア設計をご提案しますね。」",
      dealerTalk:
        "「エイジングケア需要の高いサロンでは、説明の型を整えたGrayShade提案が差別化になります。」",
      diagramType: "gray-mechanism",
      diagramTitle: "GrayShade — エイジングケア視点の提案",
    },
  ],
};