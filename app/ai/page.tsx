"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { ModeToggle, useUserMode } from "@/app/components/ModeToggle";
import { PageHeader } from "@/app/components/PageHeader";
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

type AIResponse = {
  answer: string;
  variants: string[];
  relatedLesson: string | null;
  relatedProduct: string | null;
  category?: string;
  consultationMode?: AIConsultationMode;
  source: string;
  citations?: string[];
};

export default function AIPage() {
  const [mode, setConsultMode] = useState<AIConsultationMode>("treatment");
  const [input, setInput] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [userQuestion, setUserQuestion] = useState("");
  const { mode: userMode } = useUserMode();

  const filtered = useMemo(
    () => aiPrompts.filter((p) => p.consultationMode === mode),
    [mode],
  );

  const askAI = async (question: string) => {
    if (!question.trim()) return;
    setLoading(true);
    setError(null);
    setUserQuestion(question.trim());
    setVariantIdx(0);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, mode, userMode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "回答の取得に失敗しました");
        setResponse(null);
        return;
      }
      setResponse(data as AIResponse);
    } catch {
      setError("ネットワークエラーが発生しました。再度お試しください。");
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleConsult = (id: string) => {
    const p = aiPrompts.find((x) => x.id === id);
    if (!p) return;
    setInput(p.question);
    askAI(p.question);
  };

  const handleSubmit = () => askAI(input);

  return (
    <AppShell activeNav="ai">
      <PageHeader
        label="AI ASSISTANT"
        title="AI先生"
        description="施術・薬剤・営業・商品の相談に対応。ナレッジベース連携済み、LLM接続準備完了。"
      />

      <section className="page-section pt-0 space-y-4">
        <ModeToggle />
        <p className="text-[11px] font-semibold text-foreground">相談カテゴリ</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {CONSULTATION_MODES.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => { setConsultMode(m.key); setResponse(null); setError(null); }}
              className={`card-soft p-3 text-left transition ${
                mode === m.key ? "ring-2 ring-primary/20 bg-primary-muted/40" : ""
              }`}
            >
              <span className="text-[16px]">{m.icon}</span>
              <p className="mt-1 text-[12px] font-bold text-foreground">{m.label}</p>
              <p className="text-[9px] text-muted">{m.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">QUICK ASK</p>
        <h2 className="section-title">よくある相談</h2>
        <div className="mt-2 space-y-2">
          {filtered.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleConsult(p.id)}
              disabled={loading}
              className="card-soft card-interactive w-full p-3.5 text-left disabled:opacity-60"
            >
              <p className="text-[12px] font-semibold text-foreground">{p.question}</p>
              <p className="mt-1 text-[10px] text-muted">{p.category}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="page-section min-h-[240px]">
        {loading ? (
          <div className="card-soft flex items-center gap-3 p-5">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-[13px] text-muted">AI先生が回答を準備中...</p>
          </div>
        ) : error ? (
          <div className="card-soft border border-[var(--danger-muted)] bg-[var(--danger-muted)] p-4">
            <p className="text-[13px] font-semibold text-[var(--danger)]">{error}</p>
            <button type="button" onClick={handleSubmit} className="btn-ghost mt-3">
              再試行 →
            </button>
          </div>
        ) : response ? (
          <div className="space-y-3">
            <div className="flex justify-end animate-fade-up">
              <div className="chat-bubble-user max-w-[88%] px-4 py-3 text-[13px] leading-relaxed text-white">
                {userQuestion}
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
                  <span className="badge-muted">
                    {userMode === "hairdresser" ? "美容師向け" : "ディーラー向け"}
                  </span>
                  {response.consultationMode && (
                    <span className="badge-muted">
                      {CONSULTATION_MODES.find((m) => m.key === response.consultationMode)?.label}
                    </span>
                  )}
                  <span className="badge-gold">
                    {response.source === "llm-rag" ? "LLM+RAG" : response.source === "rag" ? "RAG" : "フォールバック"}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.9] text-foreground">{response.answer}</p>

                {response.variants.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-[10px] font-semibold text-muted">別の説明パターン</p>
                    <div className="mt-2 flex gap-1">
                      {response.variants.map((_, i) => (
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
                      {response.variants[variantIdx]}
                    </p>
                  </div>
                )}

                {response.citations && response.citations.length > 0 && (
                  <p className="mt-3 text-[9px] text-muted">
                    参照: {response.citations.slice(0, 3).join(" · ")}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {response.relatedLesson && (
                    <Link href={`/learn/${response.relatedLesson}`} className="btn-ghost text-[11px]">
                      関連Mission →
                    </Link>
                  )}
                  {response.relatedProduct && (
                    <Link href={`/products/${response.relatedProduct}`} className="btn-ghost text-[11px]">
                      関連製品 →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card-soft py-12 text-center">
            <p className="text-[13px] font-medium text-foreground">相談を選択または入力してください</p>
            <p className="mt-1 text-[11px] text-muted">カテゴリを選び、相談例をタップするか自由入力</p>
          </div>
        )}
      </section>

      <section className="sticky bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-white/95 px-[var(--page-x)] py-3 backdrop-blur-lg">
        <div className="compliance-note mb-2 py-2.5">
          ナレッジベースAPI接続済み · LLM差し替え対応 · RAG教材連携準備完了
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit()}
            placeholder={`${CONSULTATION_MODES.find((m) => m.key === mode)?.label}について質問...`}
            disabled={loading}
            className="input-field flex-1"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[var(--shadow-primary)] transition active:scale-95 disabled:opacity-50"
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