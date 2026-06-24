export const objectionHandlers = [
  {
    objection: "「うちのサロンでは今のオキシで十分です」",
    response: "「施術メニューの幅が広がるほど、濃度の使い分けが品質の差になります。3%と6%の設計思想の違いを、次回のメニュー設計の参考にしていただけますか。」",
    product: "oxlon-6",
  },
  {
    objection: "「価格が高い気がします」",
    response: "「施術の再現性とアフターケア提案の幅で、客単価とリピートにどう効くか。1回の施術品質のばらつき削減という観点でお話しできますか。」",
    product: "oxlon-after-break",
  },
  {
    objection: "「スタッフが製品の違いを説明できません」",
    response: "「このAcademyで5問×8Missionの学習が完了すれば、お客様への説明トークまで含めて標準化できます。まずMission 1から30分で体験いただけますか。」",
    product: "ewr-products",
  },
  {
    objection: "「教育する時間がありません」",
    response: "「1問3分のシーン型学習です。スキマ時間で進められ、管理者画面で進捗も見えます。必修3Missionだけでも提案の土台は整います。」",
    product: null,
  },
];

export const visitPrepChecklist = [
  { step: "事前調査", items: ["主力メニュー（カラー/パーマ比率）", "スタッフ数・教育体制", "使用オキシ・カラー剤ブランド"] },
  { step: "提案準備", items: ["製品比較表を印刷/タブレット表示", "該当Missionの図解を1枚選定", "苦手分野データを確認（管理画面）"] },
  { step: "訪問後", items: ["Academyアカウント発行・必修アサイン", "2週間後に進捗フォロー", "Quiz合格を目標に設定"] },
];

export const clientHandouts = [
  { title: "髪の構造とケアの基本", lesson: "hair-basic", audience: "お客様向け" },
  { title: "頭皮環境とホームケア", lesson: "scalp-basic", audience: "お客様向け" },
  { title: "カラー後のアフターケア", lesson: "treatment-aftercare", audience: "お客様向け" },
];