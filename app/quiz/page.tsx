"use client";

import { AppShell } from "@/app/components/AppShell";
import { QuizEngine } from "@/app/components/QuizEngine";
import { getQuizQuestions } from "@/lib/data/lessons";
import { useMemo } from "react";

export default function QuizPage() {
  const questions = useMemo(() => getQuizQuestions(10), []);

  return (
    <AppShell activeNav="quiz">
      <section className="px-5 pb-6 pt-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary">ASSESSMENT</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">Quiz</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          全カテゴリ横断の理解度テスト。10問・合格ライン80点。
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-muted text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-bold text-foreground">理解度チェック</p>
            <p className="text-[11px] text-muted">40問の教材からランダム10問出題</p>
          </div>
        </div>
      </section>

      <QuizEngine questions={questions} />
    </AppShell>
  );
}