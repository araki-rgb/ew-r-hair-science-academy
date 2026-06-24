"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ModeToggle } from "./ModeToggle";
import { isOnboardingDone, setOnboardingDone } from "@/lib/storage/progress-store";

export function Onboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOnboardingDone()) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#132820]/45 backdrop-blur-xl md:items-center">
      <div className="animate-scale-in mx-auto w-full max-w-[430px] overflow-hidden rounded-t-[2rem] bg-white shadow-[var(--shadow-lg)] md:rounded-[2rem]">
        <div className="hero-stage relative !h-auto overflow-hidden px-6 pb-8 pt-8 text-center">
          <div className="hero-mesh absolute inset-0" />
          <div className="hero-orb hero-orb-a absolute" aria-hidden />
          <div className="relative z-10 flex flex-col items-center">
            <BrandLogo size="lg" variant="inverse" />
            <h2 className="text-display-inverse mt-5 text-[1.5rem]">ようこそ</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/80">
              学ぶ · 理解する · 活かす · 提案する
            </p>
          </div>
        </div>
        <div className="space-y-5 px-6 py-6">
          <div>
            <p className="text-[12px] font-bold text-foreground">1. あなたの役割</p>
            <p className="mt-0.5 text-[10px] text-muted">美容師 / ディーラーで表示が切り替わります</p>
            <div className="mt-3"><ModeToggle /></div>
          </div>
          <div className="platform-pillar p-4">
            <p className="text-[12px] font-bold text-foreground">2. 最初のMission</p>
            <p className="mt-1 text-[11px] text-muted">現場シーンから始まるストーリー型学習</p>
            <p className="mt-2.5 text-[14px] font-bold text-primary">Mission 1 — 髪の基礎</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "8", l: "Mission" },
              { v: "40+", l: "問題" },
              { v: "XP", l: "レベル制" },
            ].map((s) => (
              <div key={s.l} className="metric-card py-3">
                <p className="text-[15px] font-bold text-primary">{s.v}</p>
                <p className="metric-label">{s.l}</p>
              </div>
            ))}
          </div>
          <Link
            href="/learn/hair-basic"
            onClick={() => { setOnboardingDone(); setShow(false); }}
            className="btn-primary"
          >
            Mission 1を始める
          </Link>
          <button
            type="button"
            onClick={() => { setOnboardingDone(); setShow(false); }}
            className="w-full py-2 text-[12px] font-medium text-muted transition-opacity active:opacity-60"
          >
            あとで始める
          </button>
        </div>
      </div>
    </div>
  );
}