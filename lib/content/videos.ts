import { getDiagramImageUrl } from "./diagram-images";
import type { VideoAsset } from "../types";

const VIDEO_URLS: Record<string, string> = {
  "hair-basic-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "scalp-basic-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "color-theory-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "developer-science-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "treatment-aftercare-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "ewr-products-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  "sales-training-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  "customer-explanation-1": "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
};

function buildVideo(
  id: string,
  title: string,
  description: string,
  diagramType: Parameters<typeof getDiagramImageUrl>[0],
  duration: string,
): Partial<VideoAsset> {
  return {
    id: `${id}-video`,
    title,
    description,
    url: VIDEO_URLS[id],
    thumbnailUrl: getDiagramImageUrl(diagramType),
    status: "ready",
    duration,
  };
}

/** ミッション別動画教材 — CMS/APIでURL差し替え可能 */
export const missionVideos: Record<string, Partial<VideoAsset>> = {
  "hair-basic-1": buildVideo("hair-basic-1", "髪の構造とケラチン — 施術解説", "毛髪断面の3層構造とケラチンの役割を、カウンセリング現場の視点で解説します。", "hair-cross-section", "4:30"),
  "scalp-basic-1": buildVideo("scalp-basic-1", "頭皮の構造 — 診断カウンセリング解説", "表皮・真皮・皮下組織の基礎と、施術前の頭皮チェックのポイントを解説します。", "scalp-environment", "3:45"),
  "color-theory-1": buildVideo("color-theory-1", "補色の原理 — 色相環とトーン補正", "色相環上の補色関係と、黄み・赤み補正の施術設計への活かし方を解説します。", "color-wheel", "5:10"),
  "developer-science-1": buildVideo("developer-science-1", "1剤の役割 — カラー化学反応の基礎", "1剤が担う色素付着・脱色の化学反応と、薬剤選択の考え方を解説します。", "chemical-reaction", "4:55"),
  "treatment-aftercare-1": buildVideo("treatment-aftercare-1", "処理剤の役割 — 施術後の仕上がり設計", "処理剤が仕上がりの手触りと持続性をサポートする仕組みを、後処理工程とともに解説します。", "treatment", "3:20"),
  "ewr-products-1": buildVideo("ewr-products-1", "OXLONライン — 施術設計を支える製品群", "OXLONラインの設計思想と、前処理・施術・アフターケアの3軸提案の考え方を解説します。", "product", "6:00"),
  "sales-training-1": buildVideo("sales-training-1", "科学的根拠に基づく提案 — ディーラー営業の型", "髪・頭皮の構造と施術の仕組みから論理的に説明し、サロンオーナーの納得感を高めるトークの型を解説します。", "sales", "5:30"),
  "customer-explanation-1": buildVideo("customer-explanation-1", "専門用語の言い換え — お客様への伝え方", "キューティクルや補色などの専門用語を、日常語と具体例で伝えるカウンセリング表現を解説します。", "customer-scene", "4:15"),
};