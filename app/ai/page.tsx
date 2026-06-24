"use client";

import { useState } from "react";
import { AppShell } from "@/app/components/AppShell";
import { aiPrompts } from "@/lib/data/ai-prompts";
import Link from "next/link";

export default function AIPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = aiPrompts.find((p) => p.id === activeId);

  return (
    <AppShell activeNav="ai">
      <section className="px-5 pb-5 pt-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary">AI TEACHER</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">AI先生</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          現場の疑問を、科学に基づいた視点で確認できます。
        </p>
      </section>

      <section className="px-5 pb-4">
        <div className="card-soft flex items-start gap-3 bg-gradient-to-br from-primary-muted/60 to-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" />
              <rect x="5" y="11" width="14" height="10" rx="3" />
            </svg>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-foreground">EW-R AI Teacher（デモ）</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              質問例をタップすると回答が表示されます。医薬品的な断定表現は行いません。
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-4">
        <p className="text-[12px] font-semibold text-foreground">質問例を選ぶ</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => setActiveId(prompt.id)}
              className={`rounded-full px-3.5 py-2 text-[12px] font-medium transition ${
                activeId === prompt.id
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-foreground active:bg-primary-muted"
              }`}
            >
              {prompt.question}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6 min-h-[200px]">
        {active ? (
          <div className="space-y-3 animate-fade-up">
            <div className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-[13px] text-white">
                {active.question}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="card-soft max-w-[90%] p-4">
                <p className="text-[10px] font-semibold text-primary">AI TEACHER</p>
                <p className="mt-2 text-[13px] leading-[1.8] text-foreground">{active.answer}</p>
                {active.relatedLesson && (
                  <Link
                    href={`/learn/${active.relatedLesson}`}
                    className="mt-3 inline-flex text-[12px] font-semibold text-primary"
                  >
                    関連Lessonを見る →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-soft flex flex-col items-center justify-center py-12 text-center">
            <p className="text-[13px] text-muted">上の質問例をタップしてください</p>
          </div>
        )}
      </section>
    </AppShell>
  );
}