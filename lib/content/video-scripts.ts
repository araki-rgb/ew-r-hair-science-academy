export type VideoChapter = {
  time: string;
  title: string;
  content: string;
};

export const videoChapters: Record<string, VideoChapter[]> = {
  "hair-basic-1": [
    { time: "0:00", title: "イントロ", content: "髪の主成分ケラチンと3層構造（キューティクル・皮質・毛髄）の概要" },
    { time: "0:45", title: "キューティクル", content: "表面の鱗状層がダメージと色味に与える影響" },
    { time: "2:10", title: "カウンセリング例", content: "「髪の表面の扉」と例えたお客様への説明トーク" },
    { time: "3:30", title: "まとめ", content: "施術設計における構造理解のポイント" },
  ],
  "scalp-basic-1": [
    { time: "0:00", title: "頭皮の構造", content: "表皮・真皮・皮脂腺の基礎" },
    { time: "1:20", title: "診断の観察点", content: "赤み・皮脂・フケの見極め方" },
    { time: "2:40", title: "ホームケア提案", content: "来店間ケアの説明例" },
  ],
  "color-theory-1": [
    { time: "0:00", title: "色相環", content: "補色の基本原理" },
    { time: "1:30", title: "黄み・赤み補正", content: "不要色味の中和設計" },
    { time: "3:00", title: "現場応用", content: "トーン補正シーンでの判断" },
  ],
  "developer-science-1": [
    { time: "0:00", title: "1剤の化学反応", content: "アルカリ性と色素の挙動" },
    { time: "2:00", title: "2剤の酸化", content: "発色・固定のメカニズム" },
    { time: "4:00", title: "濃度設計", content: "3%・6%・9%の使い分け観点" },
  ],
  "treatment-aftercare-1": [
    { time: "0:00", title: "処理剤の役割", content: "施術後のpH・残留アルカリへの配慮" },
    { time: "1:40", title: "後処理工程", content: "シャンプー・トリートメントの設計" },
    { time: "2:50", title: "ホームケア接続", content: "来店間の継続ケア提案" },
  ],
  "ewr-products-1": [
    { time: "0:00", title: "OXLONライン概要", content: "前処理・施術・アフターの3軸" },
    { time: "2:30", title: "製品の組み合わせ", content: "サロン提案ストーリーの型" },
    { time: "4:30", title: "営業トーク例", content: "ディーラー向け提案の導入" },
  ],
  "sales-training-1": [
    { time: "0:00", title: "科学的提案の型", content: "構造→施術→製品の論理展開" },
    { time: "2:00", title: "反論への備え", content: "「今ので十分」への切り返し" },
    { time: "4:00", title: "クロージング", content: "Academy導入の提案" },
  ],
  "customer-explanation-1": [
    { time: "0:00", title: "言い換えの原則", content: "専門用語を日常語に" },
    { time: "1:30", title: "具体例", content: "キューティクル・補色の説明例" },
    { time: "3:00", title: "ロールプレイ", content: "白髪・ダメージ毛のカウンセリング" },
  ],
};