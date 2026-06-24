"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { isOnboardingDone, setOnboardingDone } from "@/lib/storage/progress-store";

export function Onboarding() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isOnboardingDone()) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm md:items-center">
      <div className="animate-scale-in mx-auto w-full max-w-[430px] overflow-hidden rounded-t-[2rem] bg-white shadow-2xl md:rounded-[2rem]">
        <div className="bg-gradient-to-br from-[#0f5c42] via-primary to-primary-light px-6 py-8 text-center text-white">
          <p className="text-[10px] font-bold tracking-[0.25em] opacity-80">EW-R HAIR SCIENCE ACADEMY</p>
          <h2 className="mt-3 text-[22px] font-bold leading-snug">ようこそ</h2>
          <p className="mt-2 text-[13px] leading-relaxed opacity-90">
            学ぶ · 理解する · 活かす · 提案する
          </p>
        </div>
        <div className="space-y-5 px-6 py-6">
          <div>
            <p className="text-[12px] font-bold text-foreground">1. あなたの役割を選ぶ</p>
            <div className="mt-2"><ModeToggle /></div>
          </div>
          <div className="platform-pillar p-4">
            <p className="text-[12px] font-bold text-foreground">2. 最初のMission</p>
            <p className="mt-1 text-[11px] text-muted">現場シーンから始まるストーリー型学習</p>
            <p className="mt-2 text-[14px] font-bold text-primary">Mission 1: 髪の基礎</p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { v: "8", l: "Mission" },
              { v: "40+", l: "問題" },
              { v: "XP", l: "レベル制" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-primary-muted/50 py-2">
                <p className="text-[16px] font-bold text-primary">{s.v}</p>
                <p className="text-[9px] text-muted">{s.l}</p>
              </div>
            ))}
          </div>
          <Link
            href="/learn/hair-basic"
            onClick={() => { setOnboardingDone(); setShow(false); }}
            className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
          >
            Mission 1を始める
          </Link>
          <button
            type="button"
            onClick={() => { setOnboardingDone(); setShow(false); }}
            className="w-full py-2 text-[12px] text-muted"
          >
            あとで始める
          </button>
        </div>
      </div>
    </div>
  );
}