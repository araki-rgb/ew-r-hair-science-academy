import type { Lesson } from "../../types";

export const treatmentAftercareLesson: Lesson = {
  slug: "treatment-aftercare",
  categorySlug: "treatment-aftercare",
  level: 5,
  title: "処理剤・後処理",
  description:
    "施術後のケア設計と、ダメージを抑える後処理のポイントを習得します。",
  duration: "約30分",
  lessonNumber: 1,
  missionNumber: 5,
  xpReward: 160,
  nextMissionSlug: "ewr-products",
  questions: [
    {
      id: "treatment-aftercare-1",
      question: "処理剤の主な目的として正しいものはどれですか？",
      choices: [
        "施術後の髪状態を整え、仕上がりの手触りや持続性をサポートする",
        "髪の成長速度を加速する",
        "白髪を完全に除去する",
        "頭皮の疾患を治療する",
      ],
      answerIndex: 0,
      explanation:
        "処理剤は施術後の髪の状態を整え、手触りや仕上がりの持続性をサポートするために使用されます。施術内容と髪の状態に応じた選択が、お客様満足度につながります。",
      hairdresserTalk:
        "「処理剤は仕上がりの印象を左右します。今日の施術に合ったものを選んで、手触りまで整えましょう。」",
      dealerTalk:
        "「処理剤は施術単価と満足度の両方に効く提案ポイントです。ライン全体でストーリーを作れます。」",
      diagramType: "treatment",
      diagramTitle: "処理剤 — 施術後の仕上がりをサポート",
    },
    {
      id: "treatment-aftercare-2",
      question: "カラー後の洗髪で大切なポイントはどれですか？",
      choices: [
        "薬剤残留物を十分に洗い流し、髪への負担を抑える",
        "熱いお湯で素早く1回洗いする",
        "洗髪は省略して処理剤のみ使用する",
        "洗髪回数は多いほど良いので10回以上行う",
      ],
      answerIndex: 0,
      explanation:
        "カラー後は薬剤の残留物が髪や頭皮に残ることがあり、十分な洗髪が大切です。適温のお湯で丁寧に洗い流すことで、仕上がり後の快適さやダメージの抑制につながります。",
      hairdresserTalk:
        "「しっかり洗い流すことで、仕上がり後のパサつきや匂いの印象も変わります。丁寧にケアしますね。」",
      dealerTalk:
        "「後処理の重要性は、施術品質の差別化ポイントとしてサロンに提案できます。」",
      diagramType: "treatment",
      diagramTitle: "洗髪工程 — 残留物の洗い流し",
    },
    {
      id: "treatment-aftercare-3",
      question: "アフターケアの提案で適切な考え方はどれですか？",
      choices: [
        "施術内容とお客様のライフスタイルに合わせた継続ケアを設計する",
        "施術後のケアは不要と伝える",
        "すべてのお客様に同じ製品を勧める",
        "効果を保証する表現で購入を促す",
      ],
      answerIndex: 0,
      explanation:
        "アフターケアは施術内容・髪の状態・お客様のライフスタイルに合わせて設計することが大切です。継続的なケア提案は、仕上がりの持続とリピート来店につながります。",
      hairdresserTalk:
        "「お家でのケア方法も一緒に決めましょう。続けやすい方法をご提案します。」",
      dealerTalk:
        "「アフターケア提案は単価向上とリピート率に直結する、最も効果的な営業ポイントの一つです。」",
      diagramType: "treatment",
      diagramTitle: "アフターケア — 継続ケアの設計",
    },
    {
      id: "treatment-aftercare-4",
      question: "カラー後の匂いについて正しい説明はどれですか？",
      choices: [
        "薬剤成分や残留物などが関係することがある",
        "匂いは施術と無関係で必ず体質による",
        "匂いは洗髪では改善しない",
        "匂いは頭皮の治療が必要である",
      ],
      answerIndex: 0,
      explanation:
        "カラー後の匂いは、施術中の薬剤成分や残留物、アミノ化合物などが関係することがあります。十分な洗髪・後処理・ホームケアの提案が、仕上がり後の快適さにつながります。",
      hairdresserTalk:
        "「施術後のケアで印象が変わることもあります。洗い方やホームケアも一緒にご提案しますね。」",
      dealerTalk:
        "「匂いへの配慮は、後処理製品やアフターケアラインの提案材料になります。」",
      diagramType: "chemical-reaction",
      diagramTitle: "カラー後の匂い — 原因とケアの視点",
    },
    {
      id: "treatment-aftercare-5",
      question: "ダメージを抑える後処理のポイントはどれですか？",
      choices: [
        "髪の状態を確認し、施術内容に合った処理剤とケアを組み合わせる",
        "後処理は省略して時間短縮する",
        "すべての施術後に同じ高濃度処理剤を使用する",
        "後処理より施術前のケアのみ重視する",
      ],
      answerIndex: 0,
      explanation:
        "ダメージを抑えるには、施術後の髪の状態を確認し、施術内容に合った処理剤やホームケアを組み合わせることが効果的です。画一的な後処理ではなく、個別の設計が品質の差になります。",
      hairdresserTalk:
        "「今日の施術内容に合わせて、仕上がりを長持ちさせるケアをご提案します。」",
      dealerTalk:
        "「ダメージ抑制の後処理設計は、技術力の高いサロンへの差別化提案になります。」",
      diagramType: "treatment",
      diagramTitle: "後処理設計 — ダメージ抑制のポイント",
    },
  ],
};