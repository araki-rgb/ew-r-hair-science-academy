import type { Lesson } from "../../types";

export const colorTheoryLesson: Lesson = {
  slug: "color-theory",
  categorySlug: "color-theory",
  level: 3,
  title: "カラー理論",
  description:
    "色の原理と薬剤選択の考え方を整理し、再現性の高い施術設計につなげます。",
  duration: "約55分",
  lessonNumber: 1,
  missionNumber: 3,
  xpReward: 140,
  nextMissionSlug: "developer-science",
  questions: [
    {
      id: "color-theory-1",
      question: "補色（反対色）の役割として正しいものはどれですか？",
      choices: [
        "不要な色味を中和してトーンを整える",
        "髪の内部構造を強化する",
        "頭皮の皮脂分泌を抑制する",
        "薬剤のpHを一定に保つ",
      ],
      answerIndex: 0,
      explanation:
        "補色は色相環上で反対側に位置する色の組み合わせで、不要な色味（黄味・赤味など）を中和するために活用されます。再現性の高い施術設計には、補色の理解が欠かせません。",
      hairdresserTalk:
        "「黄味が気になるときは、反対色の紫系でバランスを整える設計が有効です。髪の状態を見ながら調整しましょう。」",
      dealerTalk:
        "「補色理論はカラー薬剤の提案説明に直結します。色相環を使った説明は説得力が高いです。」",
      diagramType: "color-wheel",
      diagramTitle: "補色の原理 — 色相環と色味の中和",
    },
    {
      id: "color-theory-2",
      question: "トーンレベルについて正しい説明はどれですか？",
      choices: [
        "髪の明るさの段階を示す指標である",
        "頭皮の健康状態を示す数値である",
        "薬剤の香りの強さを表す",
        "施術時間の目安を示す",
      ],
      answerIndex: 0,
      explanation:
        "トーンレベルは髪の明るさの段階を示す指標で、カラー施術の設計において基準となります。現在のトーンレベルと目標トーンの差を把握することで、適切な薬剤選択が可能になります。",
      hairdresserTalk:
        "「今の明るさと目指す色を確認してから、薬剤を選ぶと仕上がりのブレが減ります。」",
      dealerTalk:
        "「トーンレベルの理解は、カラーメニュー設計と薬剤在庫の最適化に役立ちます。」",
      diagramType: "color-wheel",
      diagramTitle: "トーンレベル — 明るさの段階と設計",
    },
    {
      id: "color-theory-3",
      question: "残留色素について正しい説明はどれですか？",
      choices: [
        "過去の施術で髪に残った色味の影響を考慮する必要がある",
        "残留色素は施術に一切影響しない",
        "残留色素は洗髪1回で完全に除去される",
        "残留色素は頭皮にのみ存在する",
      ],
      answerIndex: 0,
      explanation:
        "残留色素は過去のカラーやブリーチなどで髪に残った色味です。次の施術の色味に大きく影響するため、事前の確認と設計への反映が再現性の鍵となります。",
      hairdresserTalk:
        "「過去のカラーの影響が残っていることがあります。今日の仕上がりを安定させるために、残留色味も確認させてください。」",
      dealerTalk:
        "「残留色素の説明ができると、薬剤追加や施術工程の提案が論理的になります。」",
      diagramType: "color-residue",
      diagramTitle: "残留色素 — 過去の施術が与える影響",
    },
    {
      id: "color-theory-4",
      question: "メラニン色素の役割として正しいものはどれですか？",
      choices: [
        "髪の自然な色味を決める要素の一つ",
        "キューティクルを形成する主成分",
        "頭皮の保湿を担う脂質",
        "薬剤の酸化を促進する酵素",
      ],
      answerIndex: 0,
      explanation:
        "メラニン色素はコルテックス内に存在し、髪の自然な色味を決める要素の一つです。カラー施術では、メラニンの状態や量が色の入り方に影響するため、髪の状態確認が重要です。",
      hairdresserTalk:
        "「元の髪色の濃さや白髪の割合によって、色の入り方が変わります。今日の髪の状態に合わせて設計しますね。」",
      dealerTalk:
        "「メラニンの働きを理解すると、白髪比率の高いサロンへのカラー提案が具体化できます。」",
      diagramType: "gray-mechanism",
      diagramTitle: "メラニン色素 — 自然な色味の要素",
    },
    {
      id: "color-theory-5",
      question: "再現性の高いカラー設計で大切なことはどれですか？",
      choices: [
        "髪の状態・残留色素・目標色を総合的に判断する",
        "毎回同じ薬剤を無条件に使用する",
        "お客様の要望は確認せず施術する",
        "2剤の濃度は常に最大で使用する",
      ],
      answerIndex: 0,
      explanation:
        "再現性の高いカラー設計には、髪のダメージ状態・残留色素・目標の色味・トーンレベルを総合的に判断することが求められます。画一的な処方ではなく、個別の設計が品質につながります。",
      hairdresserTalk:
        "「同じ色名でも、髪の状態によって設計は変わります。今日の状態に合わせて最適な方法をご提案します。」",
      dealerTalk:
        "「個別設計の考え方は、サロンの技術力と薬剤使い分けの提案に直結します。」",
      diagramType: "chemical-reaction",
      diagramTitle: "カラー設計 — 再現性を高める判断要素",
    },
  ],
};