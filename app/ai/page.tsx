"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { ModeToggle, useUserMode } from "@/app/components/ModeToggle";
import { aiPrompts, aiCategories } from "@/lib/data/ai-prompts";

export default function AIPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [activeCategory, setActiveCategory] = useState("すべて");
  const [variantIndex, setVariantIndex] = useState(0);
  const { mode } = useUserMode();

  const active = aiPrompts.find((p) => p.id === activeId);

  const filteredPrompts = useMemo(() => {
    if (activeCategory === "すべて") return aiPrompts;
    return aiPrompts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleSelectPrompt = (id: string) => {
    setActiveId(id);
    setVariantIndex(0);
    const prompt = aiPrompts.find((p) => p.id === id);
    if (prompt) setInputText(prompt.question);
  };

  const handleSend = () => {
    const match = aiPrompts.find(
      (p) => p.question === inputText.trim() || inputText.includes(p.question.slice(0, 4)),
    );
    if (match) {
      setActiveId(match.id);
      setVariantIndex(0);
    } else if (filteredPrompts.length > 0) {
      setActiveId(filteredPrompts[0].id);
      setVariantIndex(0);
    }
  };

  const displayAnswer = active
    ? mode === "dealer"
      ? active.dealerAnswer
      : active.hairdresserAnswer
    : "";

  return (
    <AppShell activeNav="ai">
      <section className="px-5 pb-4 pt-7">
        <p className="section-label">AI TEACHER</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">AI先生</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          現場の疑問を、科学に基づいた視点で確認できます。
        </p>
        <div className="mt-4">
          <ModeToggle />
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">
          {mode === "hairdresser" ? "美容師向け回答" : "ディーラー向け回答"}を表示中
        </p>
      </section>

      <section className="px-5 pb-4">
        <div className="card-premium flex items-start gap-3.5 p-4">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_6px_16px_-4px_rgb(27_122_90/0.45)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" />
              <rect x="5" y="11" width="14" height="10" rx="3" />
            </svg>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-white" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-foreground">EW-R AI Teacher</p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              髪の科学・薬剤・製品提案の質問に回答。医薬品的な断定表現は行いません。
            </p>
            <div className="mt-2 flex gap-2">
              <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">
                即時回答
              </span>
              <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">
                回答例複数
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-3">
        <p className="text-[12px] font-semibold text-foreground">よくある質問</p>
        <div className="scrollbar-hide mt-2 flex gap-2 overflow-x-auto pb-1">
          {aiCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-medium transition ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {filteredPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handleSelectPrompt(prompt.id)}
              className={`card-soft p-3.5 text-left transition ${
                activeId === prompt.id ? "ring-2 ring-primary/30" : ""
              }`}
            >
              <span className="text-[9px] font-semibold text-primary">{prompt.category}</span>
              <p className="mt-1.5 text-[12px] font-semibold leading-snug text-foreground">
                {prompt.question}
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-3 min-h-[280px]">
        {active ? (
          <div className="space-y-3">
            <div className="flex justify-end animate-fade-up">
              <div className="chat-bubble-user max-w-[85%] px-4 py-3 text-[13px] leading-relaxed text-white">
                {active.question}
              </div>
            </div>
            <div className="flex justify-start gap-2.5 animate-fade-up animate-fade-up-delay-1">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 16c0-3.3 2.7-6 6-6s6 2.7 6 6v1H4v-1z" />
                </svg>
              </div>
              <div className="chat-bubble-ai card-soft max-w-[88%] p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[10px] font-bold text-primary">AI TEACHER</p>
                  <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-medium text-primary">
                    {mode === "hairdresser" ? "美容師向け" : "ディーラー向け"}
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-[1.85] text-foreground">{displayAnswer}</p>

                {active.answerVariants.length > 0 && (
                  <div className="mt-4 border-t border-border pt-3">
                    <p className="text-[10px] font-semibold text-muted">回答バリエーション</p>
                    <div className="mt-2 flex gap-1.5">
                      {active.answerVariants.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setVariantIndex(i)}
                          className={`h-6 w-6 rounded-lg text-[10px] font-bold transition ${
                            variantIndex === i
                              ? "bg-primary text-white"
                              : "bg-primary-muted text-primary"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-[12px] leading-relaxed text-muted">
                      {active.answerVariants[variantIndex]}
                    </p>
                  </div>
                )}

                {active.relatedLesson && (
                  <Link
                    href={`/learn/${active.relatedLesson}`}
                    className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-primary"
                  >
                    関連Lessonを見る
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="card-soft flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-muted text-primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
                <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-4 text-[13px] font-medium text-foreground">質問を選ぶか、入力してください</p>
            <p className="mt-1 text-[11px] text-muted">よくある質問カードをタップすると回答が表示されます</p>
          </div>
        )}
      </section>

      <section className="sticky bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-white/95 px-5 py-3 backdrop-blur-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="質問を入力..."
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-3 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          />
          <button
            type="button"
            onClick={handleSend}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_4px_12px_-2px_rgb(27_122_90/0.4)] transition active:scale-95"
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