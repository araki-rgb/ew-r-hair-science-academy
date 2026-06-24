"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lesson } from "@/lib/types";
import { demoProgress } from "@/lib/data/progress";
import { DiagramIllustration } from "./DiagramIllustration";

const CHOICE_LABELS = ["A", "B", "C", "D"];

const FLOW_STEPS = [
  { key: "question", label: "質問" },
  { key: "answer", label: "回答" },
  { key: "diagram", label: "図解" },
  { key: "field", label: "現場" },
  { key: "sales", label: "営業" },
] as const;

type FlowStep = (typeof FLOW_STEPS)[number]["key"];

function getChoiceStyle(
  index: number,
  selectedIndex: number | null,
  answered: boolean,
  answerIndex: number,
) {
  if (!answered) {
    return selectedIndex === index
      ? "border-primary bg-primary-muted ring-1 ring-primary/30"
      : "border-border bg-background active:border-primary active:bg-primary-muted";
  }
  if (index === answerIndex) return "border-primary bg-[#e4f2ec]";
  if (selectedIndex === index) return "border-[#e8b4b4] bg-[#fdf2f2]";
  return "border-border bg-background opacity-60";
}

function FlowIndicator({ currentStep }: { currentStep: FlowStep }) {
  const stepIndex = FLOW_STEPS.findIndex((s) => s.key === currentStep);

  return (
    <div className="flex items-center justify-between gap-1">
      {FLOW_STEPS.map((step, i) => {
        const isActive = i === stepIndex;
        const isDone = i < stepIndex;
        return (
          <div key={step.key} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`step-dot ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}
            />
            <span
              className={`text-[8px] font-medium ${
                isActive ? "text-primary" : isDone ? "text-primary-light" : "text-muted"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [flowStep, setFlowStep] = useState<FlowStep>("question");

  const current = lesson.questions[questionIndex];
  const total = lesson.questions.length;
  const progressPercent = isComplete
    ? 100
    : Math.round(((questionIndex + (answered ? 1 : 0)) / total) * 100);
  const isCorrect = selectedIndex === current?.answerIndex;
  const sessionAccuracy =
    questionIndex + (answered ? 1 : 0) > 0
      ? Math.round((correctCount / (questionIndex + (answered ? 1 : 0))) * 100)
      : 0;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    setFlowStep("answer");
    if (index === current.answerIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex < total - 1) {
      setQuestionIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
      setFlowStep("question");
    } else {
      setIsComplete(true);
    }
  };

  const earnedBadges = demoProgress.badges.filter((b) => b.earned);

  return (
    <>
      <section className="px-5 pb-4 pt-5">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary transition active:opacity-70"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Learnへ戻る
        </Link>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
              Level {lesson.level}
            </span>
            <span className="text-[10px] font-semibold tracking-[0.15em] text-primary">
              Lesson {String(lesson.lessonNumber).padStart(2, "0")}
            </span>
          </div>
          <h1 className="mt-2 text-[24px] font-bold tracking-tight text-foreground">
            {lesson.title}
          </h1>
          <p className="mt-1.5 text-[12px] text-muted">{lesson.duration} · {total}問</p>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-primary-muted/60 px-3 py-2 text-center">
            <p className="text-[14px] font-bold text-primary">{progressPercent}%</p>
            <p className="text-[9px] text-muted">進捗</p>
          </div>
          <div className="rounded-xl bg-primary-muted/60 px-3 py-2 text-center">
            <p className="text-[14px] font-bold text-foreground">{sessionAccuracy}%</p>
            <p className="text-[9px] text-muted">正答率</p>
          </div>
          <div className="rounded-xl bg-primary-muted/60 px-3 py-2 text-center">
            <p className="text-[14px] font-bold text-foreground">{earnedBadges.length}</p>
            <p className="text-[9px] text-muted">バッジ</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted">
              {isComplete ? "レッスン完了" : `問題 ${questionIndex + 1} / ${total}`}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {isComplete ? (
        <section className="px-5 pb-6">
          <div className="card-premium overflow-hidden">
            <div className="cert-pattern px-5 py-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_12px_32px_-8px_rgb(27_122_90/0.5)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-9 w-9">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-5 text-[24px] font-bold text-foreground">Lesson完了</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                「{lesson.title}」全{total}問を完了しました。
              </p>
              <div className="mt-4 inline-flex items-center gap-4 rounded-2xl bg-white/80 px-5 py-3">
                <div>
                  <p className="text-[18px] font-bold text-primary">{sessionAccuracy}%</p>
                  <p className="text-[9px] text-muted">正答率</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-[18px] font-bold text-foreground">{correctCount}/{total}</p>
                  <p className="text-[9px] text-muted">正解数</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 p-5">
              <Link
                href="/learn"
                className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
              >
                Learnに戻る
              </Link>
              <Link
                href="/progress"
                className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary"
              >
                学習記録を確認
              </Link>
              <Link
                href="/quiz"
                className="flex w-full items-center justify-center rounded-2xl border border-border py-3.5 text-[13px] font-semibold text-muted"
              >
                理解度テストに挑戦
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="px-5 pb-4">
            <FlowIndicator currentStep={flowStep} />
          </section>

          {flowStep === "question" && (
            <>
              <section className="px-5 pb-4">
                <div className="video-placeholder flex aspect-[16/9] items-center justify-center rounded-2xl">
                  <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <svg viewBox="0 0 20 20" fill="white" className="h-5 w-5">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="mt-2 text-[10px] font-medium text-white/80">動画教材（収録予定）</p>
                    <p className="text-[9px] text-white/50">{current.diagramTitle}</p>
                  </div>
                </div>
              </section>

              <section className="px-5 pb-5">
                <div className="card-soft p-5">
                  <span className="inline-flex rounded-lg bg-primary-muted px-2.5 py-1 text-[10px] font-semibold text-primary">
                    QUESTION {String(questionIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-[17px] font-bold leading-snug text-foreground">
                    Q. {current.question}
                  </p>
                </div>
              </section>

              <section className="px-5 pb-6">
                <ul className="space-y-2.5">
                  {current.choices.map((choice, index) => (
                    <li key={choice}>
                      <button
                        type="button"
                        onClick={() => handleSelect(index)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${getChoiceStyle(index, selectedIndex, answered, current.answerIndex)}`}
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[13px] font-bold text-primary shadow-sm">
                          {CHOICE_LABELS[index]}
                        </span>
                        <span className="text-[14px] font-medium text-foreground">{choice}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}

          {answered && flowStep === "answer" && (
            <section className="animate-fade-up space-y-4 px-5 pb-4">
              <div
                className={`rounded-2xl px-4 py-4 text-center ${
                  isCorrect ? "bg-[#e4f2ec]" : "bg-[#fdf2f2]"
                }`}
              >
                <p className={`text-[15px] font-bold ${isCorrect ? "text-primary" : "text-[#9b3b3b]"}`}>
                  {isCorrect ? "正解です！" : "不正解 — 解説を確認しましょう"}
                </p>
              </div>
              <div className="card-soft border-primary/20 bg-gradient-to-br from-primary-muted/60 to-white p-5">
                <p className="section-label">EXPLANATION</p>
                <p className="mt-3 text-[13px] leading-[1.85] text-foreground">{current.explanation}</p>
              </div>
              <button
                type="button"
                onClick={() => setFlowStep("diagram")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
              >
                図解を見る
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </section>
          )}

          {answered && flowStep === "diagram" && (
            <section className="animate-scale-in space-y-4 px-5 pb-4">
              <div>
                <p className="section-label">VISUAL EXPLANATION</p>
                <h2 className="mt-1 text-[15px] font-bold text-foreground">{current.diagramTitle}</h2>
              </div>
              <div className="diagram-frame overflow-hidden p-5">
                <div className="aspect-[4/3] w-full">
                  <DiagramIllustration type={current.diagramType} />
                </div>
              </div>
              <p className="text-center text-[10px] text-muted">
                ※ 本番ではGrok生成の高精細図解・動画教材に差し替え予定
              </p>
              <button
                type="button"
                onClick={() => setFlowStep("field")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
              >
                現場トークを見る
              </button>
            </section>
          )}

          {answered && flowStep === "field" && (
            <section className="animate-slide-right space-y-4 px-5 pb-4">
              <div className="card-soft overflow-hidden">
                <div className="border-b border-border bg-primary-muted/40 px-4 py-2.5">
                  <p className="text-[10px] font-bold tracking-wider text-primary">美容師向け · 現場での説明例</p>
                </div>
                <div className="p-4">
                  <p className="text-[14px] leading-[1.85] text-foreground">{current.hairdresserTalk}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFlowStep("sales")}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
              >
                営業トークを見る
              </button>
            </section>
          )}

          {answered && flowStep === "sales" && (
            <section className="animate-slide-right space-y-4 px-5 pb-6">
              <div className="card-soft overflow-hidden">
                <div className="border-b border-border bg-gold-muted px-4 py-2.5">
                  <p className="text-[10px] font-bold tracking-wider text-gold">ディーラー向け · 営業トーク</p>
                </div>
                <div className="p-4">
                  <p className="text-[14px] leading-[1.85] text-foreground">{current.dealerTalk}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)] transition active:scale-[0.98]"
              >
                {questionIndex < total - 1 ? "次の問題へ" : "Lessonを完了する"}
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </section>
          )}
        </>
      )}
    </>
  );
}