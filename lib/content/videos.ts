import { getDiagramImageUrl } from "./diagram-images";
import type { VideoAsset } from "../types";

const DEMO_VIDEO_URL =
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

/** ミッション別動画教材 — url差し替えで本番投入可能 */
export const missionVideos: Record<string, Partial<VideoAsset>> = {
  "hair-basic-1": {
    id: "hair-basic-1-video",
    title: "髪の構造とケラチン — 施術解説",
    description:
      "毛髪断面の3層構造とケラチンの役割を、カウンセリング現場の視点で解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("hair-cross-section"),
    status: "ready",
    duration: "4:30",
  },
  "scalp-basic-1": {
    id: "scalp-basic-1-video",
    title: "頭皮の構造 — 診断カウンセリング解説",
    description:
      "表皮・真皮・皮下組織の基礎と、施術前の頭皮チェックのポイントを解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("scalp-environment"),
    status: "ready",
    duration: "3:45",
  },
  "color-theory-1": {
    id: "color-theory-1-video",
    title: "補色の原理 — 色相環とトーン補正",
    description:
      "色相環上の補色関係と、黄み・赤み補正の施術設計への活かし方を解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("color-wheel"),
    status: "ready",
    duration: "5:10",
  },
  "developer-science-1": {
    id: "developer-science-1-video",
    title: "1剤の役割 — カラー化学反応の基礎",
    description:
      "1剤が担う色素付着・脱色の化学反応と、薬剤選択の考え方を解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("chemical-reaction"),
    status: "ready",
    duration: "4:55",
  },
  "treatment-aftercare-1": {
    id: "treatment-aftercare-1-video",
    title: "処理剤の役割 — 施術後の仕上がり設計",
    description:
      "処理剤が仕上がりの手触りと持続性をサポートする仕組みを、後処理工程とともに解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("treatment"),
    status: "ready",
    duration: "3:20",
  },
  "ewr-products-1": {
    id: "ewr-products-1-video",
    title: "OXLONライン — 施術設計を支える製品群",
    description:
      "OXLONラインの設計思想と、前処理・施術・アフターケアの3軸提案の考え方を解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("product"),
    status: "ready",
    duration: "6:00",
  },
  "sales-training-1": {
    id: "sales-training-1-video",
    title: "科学的根拠に基づく提案 — ディーラー営業の型",
    description:
      "髪・頭皮の構造と施術の仕組みから論理的に説明し、サロンオーナーの納得感を高めるトークの型を解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("sales"),
    status: "ready",
    duration: "5:30",
  },
  "customer-explanation-1": {
    id: "customer-explanation-1-video",
    title: "専門用語の言い換え — お客様への伝え方",
    description:
      "キューティクルや補色などの専門用語を、日常語と具体例で伝えるカウンセリング表現を解説します。",
    url: DEMO_VIDEO_URL,
    thumbnailUrl: getDiagramImageUrl("customer-scene"),
    status: "ready",
    duration: "4:15",
  },
};