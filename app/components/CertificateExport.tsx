"use client";

import { useEffect, useState } from "react";
import type { Mission } from "@/lib/types";
import { getDisplayName, loadProfile } from "@/lib/storage/profile-store";
import { trackEvent } from "@/lib/analytics/events";

type Props = {
  mission: Mission;
  accuracy: number;
  userName?: string;
};

export function CertificateExport({ mission, accuracy, userName }: Props) {
  const [name, setName] = useState(userName ?? "受講者");

  useEffect(() => {
    if (!userName) setName(getDisplayName(loadProfile()));
    const handler = () => setName(getDisplayName(loadProfile()));
    window.addEventListener("ewr-profile-change", handler);
    return () => window.removeEventListener("ewr-profile-change", handler);
  }, [userName]);
  const date = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, ".");

  const downloadCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 560;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 800, 560);
    grad.addColorStop(0, "#f8fcfa");
    grad.addColorStop(1, "#ffffff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 560);

    ctx.strokeStyle = "#1b7a5a";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 24, 752, 512);

    ctx.strokeStyle = "#c4a574";
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, 728, 488);

    ctx.fillStyle = "#1b7a5a";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("EW-R HAIR SCIENCE ACADEMY", 400, 80);

    ctx.fillStyle = "#c4a574";
    ctx.font = "12px sans-serif";
    ctx.fillText("CERTIFICATE OF COMPLETION", 400, 108);

    ctx.fillStyle = "#142820";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("修了認定証", 400, 170);

    ctx.font = "18px sans-serif";
    ctx.fillStyle = "#1b7a5a";
    ctx.fillText(`Mission ${mission.missionNumber}: ${mission.title}`, 400, 220);

    ctx.fillStyle = "#5f726c";
    ctx.font="16px sans-serif";
    ctx.fillText(`${name} 様`, 400, 270);

    ctx.font = "14px sans-serif";
    ctx.fillText(`正答率 ${accuracy}% · ${date} 修了`, 400, 310);

    ctx.fillStyle = "#5f726c";
    ctx.font = "12px sans-serif";
    const desc = mission.description.slice(0, 60);
    ctx.fillText(desc, 400, 360);

    ctx.strokeStyle = "#1b7a5a";
    ctx.beginPath();
    ctx.moveTo(280, 420);
    ctx.lineTo(520, 420);
    ctx.stroke();
    ctx.font = "11px sans-serif";
    ctx.fillText("EW-R株式会社 Hair Science Academy", 400, 450);

    trackEvent("cert_download", { mission: mission.slug, accuracy });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EW-R-Mission${mission.missionNumber}-certificate.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <button
      type="button"
      onClick={downloadCertificate}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-gold-muted py-3.5 text-[13px] font-semibold text-[#9a7b4f]"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      認定証を保存（PNG）
    </button>
  );
}