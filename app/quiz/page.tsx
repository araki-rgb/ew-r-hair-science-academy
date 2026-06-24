"use client";

import { useMemo } from "react";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { QuizEngine } from "@/app/components/QuizEngine";
import { getQuizQuestions } from "@/lib/data/lessons";

export default function QuizPage() {
  const questions = useMemo(() => getQuizQuestions(10), []);

  return (
    <AppShell activeNav="quiz">
      <PageHeader
        label="ASSESSMENT"
        title="Quiz"
        description="全カテゴリ横断の理解度テスト。10問・合格ライン80点。"
      />

      <section className="page-section pt-0">
        <div className="card-premium flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-muted text-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M9.2 9.2a2.8 2.8 0 115.2.4c-.8.8-2 .9-2 2.4" strokeLinecap="round" />
              <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
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