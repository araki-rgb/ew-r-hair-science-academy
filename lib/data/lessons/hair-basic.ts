import type { Lesson } from "../../types";

export const hairBasicLesson: Lesson = {
  slug: "hair-basic",
  categorySlug: "hair-basic",
  level: 1,
  title: "髪の基礎",
  description:
    "毛髪の構造と主成分を理解し、ダメージのメカニズムを正しく捉えます。",
  duration: "約45分",
  lessonNumber: 1,
  questions: [
    {
      id: "hair-basic-1",
      question: "髪の主成分は何ですか？",
      choices: ["ケラチン", "コラーゲン", "メラニン", "皮脂"],
      answerIndex: 0,
      explanation:
        "髪の主成分はケラチンというタンパク質です。髪はタンパク質を中心に構成されており、カラーやパーマなどの施術では、この内部構造への配慮が大切になります。",
      hairdresserTalk:
        "「髪はタンパク質でできているので、カラー後は内部補修や保湿ケアも大切です。」",
      dealerTalk:
        "「髪の構造を理解すると、薬剤や処理剤の提案理由が明確になります。」",
      diagramType: "hair-cross-section",
      diagramTitle: "髪の主成分 — ケラチンと内部構造",
    },
    {
      id: "hair-basic-2",
      question: "キューティクルの主な役割は何ですか？",
      choices: [
        "髪の内部を支える",
        "表面を保護する",
        "色素を保持する",
        "水分を産生する",
      ],
      answerIndex: 1,
      explanation:
        "キューティクルは毛髪の最外層を覆う鱗片状の構造で、内部への刺激や摩擦から髪を守る役割を持ちます。開きやすい状態は、パサつきや手触りの変化につながることがあります。",
      hairdresserTalk:
        "「表面のキューティクルの状態を見ると、ダメージの進み方やホームケアの方向性が伝えやすくなります。」",
      dealerTalk:
        "「キューティクルケア製品の必要性は、髪の構造から説明すると納得感が高まります。」",
      diagramType: "cuticle",
      diagramTitle: "キューティクル — 表面の鱗片状保護層",
    },
    {
      id: "hair-basic-3",
      question: "コルテックスの主な役割は何ですか？",
      choices: [
        "髪の中心部を形成する",
        "髪の強さや色味に関わる",
        "頭皮の皮脂を分泌する",
        "薬剤を無害化する",
      ],
      answerIndex: 1,
      explanation:
        "コルテックスは毛髪の中間層で、ケラチンを中心としたタンパク質が集まっています。髪の強度やしなやかさ、メラニンによる色味など、見た目や質感に大きく関わる部分です。",
      hairdresserTalk:
        "「色味やハリの印象はコルテックスの状態にも左右されるので、施術前の確認が大切です。」",
      dealerTalk:
        "「内部補修やカラー後ケアの提案は、コルテックスへの働きから説明すると伝わりやすくなります。」",
      diagramType: "hair-cross-section",
      diagramTitle: "コルテックス — 髪の主体となる中間層",
    },
    {
      id: "hair-basic-4",
      question: "メデュラについて正しい説明はどれですか？",
      choices: [
        "すべての髪に必ず存在する",
        "髪の中心部にある柔らかい層",
        "キューティクルより外側にある",
        "主にケラチンで強化されている",
      ],
      answerIndex: 1,
      explanation:
        "メデュラは毛髪の中心部にある柔らかい層です。細い毛やダメージ毛では目立たない場合もあり、髪の空洞感や軽さの印象に関わることがあります。",
      hairdresserTalk:
        "「毛先が空洞感を帯びやすいお客様には、内部の状態にも配慮したケア提案が有効です。」",
      dealerTalk:
        "「メデュラの特徴を押さえると、軽さやボリューム感の悩みへの提案がしやすくなります。」",
      diagramType: "hair-cross-section",
      diagramTitle: "メデュラ — 毛髪中心部の柔らかい層",
    },
    {
      id: "hair-basic-5",
      question: "CMC（細胞間基質）の役割として正しいものはどれですか？",
      choices: [
        "メラニン色素を生成する",
        "キューティクルとコルテックスを結合する",
        "頭皮の血行を促進する",
        "髪の成長速度を決定する",
      ],
      answerIndex: 1,
      explanation:
        "CMC（細胞間基質）は、キューティクル層とコルテックス層を結びつける役割を持つ部分です。施術や熱、摩擦などでダメージを受けると、毛髪の強度や手触りに影響が出ることがあります。",
      hairdresserTalk:
        "「内部の結合部分への負担を抑える施術設計と、施術後のケアが仕上がりの持続につながります。」",
      dealerTalk:
        "「CMCの役割を説明できると、処理剤やアフターケアの提案根拠が明確になります。」",
      diagramType: "cuticle",
      diagramTitle: "CMC — 層間を結ぶ細胞間基質",
    },
  ],
};