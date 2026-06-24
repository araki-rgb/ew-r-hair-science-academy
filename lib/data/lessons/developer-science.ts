import type { Lesson } from "../../types";

export const developerScienceLesson: Lesson = {
  slug: "developer-science",
  categorySlug: "developer-science",
  level: 4,
  title: "2剤・オキシの科学",
  description:
    "1剤・2剤の役割と酸化の仕組みを理解し、施術時の負担に配慮した設計を学びます。",
  duration: "約40分",
  lessonNumber: 1,
  questions: [
    {
      id: "developer-science-1",
      question: "カラー施術における1剤の主な役割はどれですか？",
      choices: [
        "色素の付着や脱色などの化学反応を担う",
        "髪を物理的に切断する",
        "頭皮の血行を促進する",
        "キューティクルを完全に除去する",
      ],
      answerIndex: 0,
      explanation:
        "1剤はカラー剤の主成分であり、色素の付着や脱色などの化学反応を担います。髪の状態や目標色に応じた1剤の選択が、施術結果の基盤となります。",
      hairdresserTalk:
        "「1剤は色の設計の土台です。髪の状態と目標色を確認してから選びましょう。」",
      dealerTalk:
        "「1剤の役割を説明できると、カラーライン全体の提案ストーリーが組み立てやすくなります。」",
      diagramType: "chemical-reaction",
      diagramTitle: "1剤の役割 — 色素付着と化学反応",
    },
    {
      id: "developer-science-2",
      question: "2剤（オキシ）の主な役割はどれですか？",
      choices: [
        "1剤の作用を促し、施術の仕上がりに影響する",
        "髪の主成分を生成する",
        "頭皮の炎症を抑える",
        "施術後の香りを消す",
      ],
      answerIndex: 0,
      explanation:
        "2剤（オキシ）は過酸化水素水を主成分とし、1剤の作用を促進します。濃度によって反応の設計が変わるため、髪の状態と施術目的に応じた選択が大切です。",
      hairdresserTalk:
        "「2剤の濃度は反応の設計そのものです。髪の状態を見ながら、負担に配慮した選択をしましょう。」",
      dealerTalk:
        "「2剤濃度の使い分けは、サロンの施術品質と製品提案の両方に効きます。」",
      diagramType: "developer",
      diagramTitle: "2剤（オキシ）— 1剤の作用を促進",
    },
    {
      id: "developer-science-3",
      question: "オキシ濃度の違いについて正しい説明はどれですか？",
      choices: [
        "濃度が高いほど反応が強くなる傾向がある",
        "濃度は仕上がりに一切影響しない",
        "すべての髪に同じ濃度が最適である",
        "濃度が低いほど必ずダメージが大きくなる",
      ],
      answerIndex: 0,
      explanation:
        "オキシの濃度が高いほど、酸化反応が強くなる傾向があります。ダメージ毛には低濃度、十分なトーンアップが必要な場合は高濃度など、髪の状態と目的に応じた使い分けが求められます。",
      hairdresserTalk:
        "「3%は繊細な設計向き、6%は標準的な施術向き——髪の状態に合わせて選び分けましょう。」",
      dealerTalk:
        "「濃度別の使い分け提案は、OXLONラインの導入ストーリーとして非常に有効です。」",
      diagramType: "developer",
      diagramTitle: "オキシ濃度 — 反応設計の違い",
    },
    {
      id: "developer-science-4",
      question: "酸化反応について正しい説明はどれですか？",
      choices: [
        "1剤と2剤の混合により化学反応が起こる",
        "酸化反応は水だけで完結する",
        "酸化反応は髪の構造を強化する治療である",
        "酸化反応は頭皮にのみ作用する",
      ],
      answerIndex: 0,
      explanation:
        "カラー施術では1剤と2剤を混合することで酸化反応が起こり、色素の付着や脱色などの変化が生じます。この反応の強さを髪の状態に合わせてコントロールすることが、施術設計の要点です。",
      hairdresserTalk:
        "「薬剤を混ぜた瞬間から反応が始まります。髪の状態に合った設計で、仕上がりと負担のバランスを取りましょう。」",
      dealerTalk:
        "「酸化反応の仕組みを理解すると、施術時間や薬剤量の提案根拠が明確になります。」",
      diagramType: "chemical-reaction",
      diagramTitle: "酸化反応 — 1剤と2剤の化学変化",
    },
    {
      id: "developer-science-5",
      question: "ダメージ毛への2剤選択で適切な考え方はどれですか？",
      choices: [
        "髪の状態を確認し、負担に配慮した低濃度設計を検討する",
        "ダメージ毛には常に最高濃度を使用する",
        "2剤の選択は髪の状態と無関係である",
        "ダメージ毛には2剤を使用しない",
      ],
      answerIndex: 0,
      explanation:
        "ダメージ毛では施術時の負担が大きくなりやすいため、髪の状態を丁寧に確認し、低濃度の2剤や処理剤との組み合わせなど、負担に配慮した設計が重要です。",
      hairdresserTalk:
        "「毛先の状態を見ると、今日の薬剤設計のヒントになります。負担を抑えた設計で仕上げましょう。」",
      dealerTalk:
        "「ダメージ毛対応の2剤提案は、技術力の高いサロンほどニーズが高いテーマです。」",
      diagramType: "developer",
      diagramTitle: "ダメージ毛への配慮 — 2剤選択の設計",
    },
  ],
};