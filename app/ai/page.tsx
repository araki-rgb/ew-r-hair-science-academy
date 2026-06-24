"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { ModeToggle, useUserMode } from "@/app/components/ModeToggle";
import { aiPrompts } from "@/lib/data/ai-prompts";
import type { AIConsultationMode } from "@/lib/types";

const CONSULTATION_MODES: {
  key: AIConsultationMode;
  label: string;
  desc: string;
  icon: string;
}[] = [
  { key: "treatment", label: "施術相談", desc: "カウンセリング・施術設計", icon: "✂️" },
  { key: "chemical", label: "薬剤相談", desc: "1剤・2剤・濃度設計", icon: "🧪" },
  { key: "sales", label: "営業相談", desc: "サロン提案・導入戦略", icon: "📊" },
  { key: "product", label: "商品説明", desc: "OXLONライン・製品特性", icon: "📦" },
];

export default function AIPage() {
  const [mode, setConsultMode] = useState<AIConsultationMode>("treatment");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);
  const { mode: userMode } = useUserMode();

  const filtered = useMemo(
    () => aiPrompts.filter((p) => p.consultationMode === mode),
    [mode],
  );

  const active = aiPrompts.find((p) => p.id === activeId);
  const answer = active
    ? userMode === "dealer" ? active.dealerAnswer : active.hairdresserAnswer
    : "";

  const handleConsult = (id: string) => {
    const p = aiPrompts.find((x) => x.id === id);
    if (!p) return;
    setActiveId(id);
    setInput(p.question);
    setVariantIdx(0);
  };

  return (
    <AppShell activeNav="ai">
      <section className="px-5 pb-4 pt-7">
        <p className="section-label">AI ASSISTANT</p>
        <h1 className="mt-2 text-[26px] font-bold tracking-tight text-foreground">AI先生</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          施術・薬剤・営業・商品の相談に対応するAIアシスタント。
          将来LLM接続を前提とした拡張可能な設計です。
        </p>
        <div className="mt-4"><ModeToggle /></div>
      </section>

      <section className="px-5 pb-4">
        <p className="text-[11px] font-semibold text-foreground">相談カテゴリ</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {CONSULTATION_MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => { setConsultMode(m.key); setActiveId(null); }}
              className={`card-soft p-3 text-left transition ${
                mode === m.key ? "ring-2 ring-primary/25 bg-primary-muted/30" : ""
              }`}
            >
              <span className="text-[16px]">{m.icon}</span>
              <p className="mt-1 text-[12px] font-bold text-foreground">{m.label}</p>
              <p className="text-[9px] text-muted">{m.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-3">
        <p className="text-[11px] font-semibold text-foreground">よくある相談</p>
        <div className="mt-2 space-y-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleConsult(p.id)}
              className={`card-soft w-full p-3.5 text-left ${activeId === p.id ? "ring-2 ring-primary/25" : ""}`}
            >
              <p className="text-[12px] font-semibold text-foreground">{p.question}</p>
              <p className="mt-1 text-[10px] text-muted">{p.category}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-3 min-h-[240px]">
        {active ? (
          <div className="space-y-3">
            <div className="flex justify-end animate-fade-up">
              <div className="chat-bubble-user max-w-[88%] px-4 py-3 text-[13px] leading-relaxed text-white">
                {active.question}
              </div>
            </div>
            <div className="flex gap-2.5 animate-fade-up animate-fade-up-delay-1">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 16c0-3.3 2.7-6 6-6s6 2.7 6 6v1H4v-1z" />
                </svg>
              </div>
              <div className="chat-bubble-ai card-soft flex-1 p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[10px] font-bold text-primary">AI ASSISTANT</p>
                  <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">
                    {userMode === "hairdresser" ? "美容師向け" : "ディーラー向け"}
                  </span>
                  <span className="rounded-full bg-background px-2 py-0.5 text-[9px] text-muted">
                    {CONSULTATION_MODES.find((m) => m.key === active.consultationMode)?.label}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.9] text-foreground">{answer}</p>

                {active.answerVariants.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-[10px] font-semibold text-muted">別の説明パターン</p>
                    <div className="mt-2 flex gap-1">
                      {active.answerVariants.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setVariantIdx(i)}
                          className={`h-6 w-6 rounded-md text-[10px] font-bold ${
                            variantIdx === i ? "bg-primary text-white" : "bg-primary-muted text-primary"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted">
                      {active.answerVariants[variantIdx]}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {active.relatedLesson && (
                    <Link href={`/learn/${active.relatedLesson}`} className="text-[11px] font-semibold text-primary">
                      関連Mission →
                    </Link>
                  )}
                  {active.relatedProduct && (
                    <Link href={`/products/${active.relatedProduct}`} className="text-[11px] font-semibold text-primary">
                      関連製品 →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-soft py-12 text-center">
            <p className="text-[13px] font-medium text-foreground">相談を選択してください</p>
            <p className="mt-1 text-[11px] text-muted">カテゴリを選び、相談例をタップ</p>
          </div>
        )}
      </section>

      <section className="sticky bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-white/95 px-5 py-3 backdrop-blur-lg">
        <div className="mb-2 rounded-xl bg-primary-muted/40 px-3 py-2">
          <p className="text-[9px] text-muted">
            🔌 LLM接続予定 — APIエンドポイント・プロンプトテンプレート・RAG教材連携に対応可能な設計
          </p>
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`${CONSULTATION_MODES.find((m) => m.key === mode)?.label}について質問...`}
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-[13px] outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => {
              const match = filtered.find((p) => input.includes(p.question.slice(0, 6)));
              if (match) handleConsult(match.id);
            }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </section>
    </AppShell>
  );
}