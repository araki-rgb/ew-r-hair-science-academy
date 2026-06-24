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
  missionNumber: 6,
  xpReward: 170,
  nextMissionSlug: "sales-training",
  questions: [
    {
      id: "ewr-products-1",
      question:
        "ダメージ毛が多く、施術品質の底上げと負担抑制の両立を求めるサロンへOXLONラインを提案する際、設計思想として最も適切な説明はどれですか？",
      choices: [
        "施術時の負担に配慮した設計と、施術品質の向上を両立する",
        "すべての髪に同一処方で対応し、個別設計は不要である",
        "医薬品的な効能を前面に訴求する",
        "施術前の準備のみに特化し、施術中・後の設計は含まない",
      ],
      answerIndex: 0,
      explanation:
        "OXLONラインは、施術時の負担に配慮した設計と施術品質の向上を両立することを目指しています。2剤濃度の使い分け（3%/6%）や前処理（PreClear）・アフターケア（After Break）まで、施術全体を支えるライン設計であり、単品ではなく施術フロー全体の底上げとして提案するのが効果的です。",
      hairdresserTalk:
        "「OXLONは髪の状態に合わせて使い分けられる設計です。今日の施術に最適な選択をご提案します。」",
      dealerTalk:
        "「ライン全体のストーリーで提案すると、単品販売ではなく施術品質の底上げとして訴求できます。」",
      diagramType: "product",
      diagramTitle: "OXLONライン — 施術設計を支える製品群",
    },
    {
      id: "ewr-products-2",
      question:
        "ブリーチ毛の毛先に既染色を入れ、色味は繊細に、ダメージ進行は抑えたい施術です。OXLON 3%の使用シーンとして最も適切なのはどれですか？",
      choices: [
        "ダメージ毛への繊細なカラー設計",
        "健康毛の根元への大幅トーンアップ専用",
        "頭皮の治療目的での使用",
        "ホームカラー専用の2剤としての使用",
      ],
      answerIndex: 0,
      explanation:
        "OXLON 3%は低濃度設計で、ダメージ毛や既染毛への繊細な施術設計に対応します。反応の穏やかさを重視した選択肢として、毛先の状態確認後に負担に配慮した設計に活用できます。大幅トーンアップが必要な健康毛の根元には6%等の選択も検討する、使い分けの視点が重要です。",
      hairdresserTalk:
        "「毛先の状態を見ると、3%の繊細な設計が向いていることもあります。負担に配慮した施術をしましょう。」",
      dealerTalk:
        "「ダメージ毛が多いサロンでは、3%の提案が施術品質の差別化になります。」",
      diagramType: "developer",
      diagramTitle: "OXLON 3% — 繊細な施術設計への対応",
    },
    {
      id: "ewr-products-3",
      question:
        "残留色素が強く、前回カラーの影響で仕上がりがブレやすいお客様の施術前です。OXLON PreClear Shampooの役割として、提案に最も適切な説明はどれですか？",
      choices: [
        "施術前の前処理で、施術の再現性向上をサポートする",
        "施術後のダメージを完全に修復する",
        "白髪をなくすための治療用シャンプー",
        "頭皮の発毛を促進する",
      ],
      answerIndex: 0,
      explanation:
        "OXLON PreClear Shampooは施術前の洗髪工程を想定した前処理製品です。残留物や不要な油分を洗い流す施術前の土台づくりにより、色味の入り方や仕上がりの安定性に配慮した設計が可能になります。完全修復や治療・発毛促進の表現は適切ではありません。",
      hairdresserTalk:
        "「施術前の準備は仕上がりに影響します。前処理の工程も丁寧にご説明しますね。」",
      dealerTalk:
        "「前処理提案は施術品質の底上げとして差別化できます。技術力を支える提案として有効です。」",
      diagramType: "product",
      diagramTitle: "PreClear Shampoo — 施術前の土台づくり",
    },
    {
      id: "ewr-products-4",
      question:
        "カラー後の手触り改善とリピート率向上を狙うサロンです。OXLON After Breakの提案ポイントとして最も効果的なのはどれですか？",
      choices: [
        "施術後のケア設計とホームケアへの橋渡し",
        "施術中の1剤の代替として使用する",
        "頭皮疾患の治療を主目的とする",
        "パーマ液の2剤代替として使用する",
      ],
      answerIndex: 0,
      explanation:
        "OXLON After Breakは施術後の髪状態への配慮を重視したアフターケア製品です。サロンでの施術後ケアからホームケアへの継続提案につなげる設計が可能で、手触りの印象改善とリピート率向上の両方に寄与します。1剤代替や治療目的の訴求は製品の位置づけと異なります。",
      hairdresserTalk:
        "「施術後のケアは仕上がりの印象を左右します。お家でのケアも一緒に設計しましょう。」",
      dealerTalk:
        "「アフターケアはリピート率と単価向上に直結します。施術メニューとのセット提案が効果的です。」",
      diagramType: "treatment",
      diagramTitle: "After Break — 施術後ケアの継続提案",
    },
    {
      id: "ewr-products-5",
      question:
        "白髪比率60%のお客様が「自然な仕上がりで、頭皮への負担も気になる」と相談しています。OXLON GrayShadeの提案で最も適切な表現はどれですか？",
      choices: [
        "白髪の状態に合わせたエイジングケア視点のカラー設計をご提案します",
        "白髪がなくなるカラー剤です",
        "発毛を促進するカラー剤です",
        "頭皮の病気が治る製品です",
      ],
      answerIndex: 0,
      explanation:
        "OXLON GrayShadeは白髪のお客様への提案設計を意識した製品ラインです。「白髪がなくなる」「発毛する」「治る」等の断定表現は薬機法上も避けるべきであり、エイジングケア視点で髪と頭皮の状態に合わせたケア設計を提案することが適切です。",
      hairdresserTalk:
        "「白髪の状態はお客様ごとに異なります。髪と頭皮の状態を確認しながら、無理のないケア設計をご提案しますね。」",
      dealerTalk:
        "「エイジングケア需要の高いサロンでは、コンプライアンスを守ったGrayShade提案の型が差別化になります。」",
      diagramType: "gray-mechanism",
      diagramTitle: "GrayShade — エイジングケア視点の提案",
    },
  ],
};