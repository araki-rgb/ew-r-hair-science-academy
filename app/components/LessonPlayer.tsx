"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lesson } from "@/lib/types";
import { DiagramIllustration } from "./DiagramIllustration";

const CHOICE_LABELS = ["A", "B", "C", "D"];

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
  if (index === answerIndex) return "border-primary bg-[#e8f5f0]";
  if (selectedIndex === index) return "border-[#e8b4b4] bg-[#fdf2f2]";
  return "border-border bg-background opacity-60";
}

export function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const current = lesson.questions[questionIndex];
  const total = lesson.questions.length;
  const progressPercent = isComplete
    ? 100
    : Math.round(((questionIndex + (answered ? 1 : 0)) / total) * 100);
  const isCorrect = selectedIndex === current?.answerIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
  };

  const handleNext = () => {
    if (questionIndex < total - 1) {
      setQuestionIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
    } else {
      setIsComplete(true);
    }
  };

  return (
    <>
      <section className="px-5 pb-5 pt-5">
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
          <p className="text-[10px] font-semibold tracking-[0.15em] text-primary">
            Level {lesson.level} / Lesson {String(lesson.lessonNumber).padStart(2, "0")}
          </p>
          <h1 className="mt-1.5 text-[24px] font-bold tracking-tight text-foreground">
            {lesson.title}
          </h1>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted">
              {isComplete ? "レッスン完了" : `問題 ${questionIndex + 1} / ${total}`}
            </span>
            <span className="font-semibold text-primary">{progressPercent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </section>

      {isComplete ? (
        <section className="px-5 pb-6">
          <div className="card-soft overflow-hidden">
            <div className="bg-gradient-to-r from-primary-muted to-[#f0f9f6] px-5 py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-8 w-8">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="mt-4 text-[22px] font-bold text-foreground">Lesson完了</h2>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">
                「{lesson.title}」全{total}問を完了しました。
              </p>
            </div>
            <div className="space-y-3 p-5">
              <Link
                href="/learn"
                className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
              >
                Learnに戻る
              </Link>
              <Link
                href="/quiz"
                className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary"
              >
                理解度テストに挑戦
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <>
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

          <section className="px-5 pb-5">
            <ul className="space-y-2.5">
              {current.choices.map((choice, index) => (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => handleSelect(index)}
                    disabled={answered}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${getChoiceStyle(index, selectedIndex, answered, current.answerIndex)}`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold ${
                        answered && index === current.answerIndex
                          ? "bg-primary text-white"
                          : answered && selectedIndex === index
                            ? "bg-[#e8b4b4] text-[#9b3b3b]"
                            : "bg-white text-primary shadow-sm"
                      }`}
                    >
                      {CHOICE_LABELS[index]}
                    </span>
                    <span className="text-[14px] font-medium text-foreground">{choice}</span>
                    {answered && index === current.answerIndex && (
                      <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
                        正解
                      </span>
                    )}
                    {answered && selectedIndex === index && index !== current.answerIndex && (
                      <span className="ml-auto rounded-full bg-[#e8b4b4] px-2 py-0.5 text-[10px] font-semibold text-[#9b3b3b]">
                        不正解
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            {answered && (
              <div
                className={`mt-4 rounded-xl px-4 py-3 text-center text-[13px] font-semibold ${
                  isCorrect ? "bg-[#e8f5f0] text-primary" : "bg-[#fdf2f2] text-[#9b3b3b]"
                }`}
              >
                {isCorrect ? "正解です！" : "不正解 — 解説を確認しましょう"}
              </div>
            )}
          </section>

          {answered && (
            <>
              <section className="px-5 pb-5">
                <div className="card-soft border-primary/20 bg-gradient-to-br from-primary-muted/60 to-white p-5">
                  <p className="text-[10px] font-semibold tracking-wider text-primary">EXPLANATION</p>
                  <p className="mt-3 text-[13px] leading-[1.8] text-foreground">{current.explanation}</p>
                </div>
              </section>

              <section className="px-5 pb-5">
                <h2 className="text-[13px] font-semibold text-foreground">図解</h2>
                <p className="mt-1 text-[11px] text-muted">{current.diagramTitle}</p>
                <div className="card-soft diagram-placeholder mt-3 overflow-hidden p-4">
                  <div className="aspect-[4/3] w-full">
                    <DiagramIllustration type={current.diagramType} />
                  </div>
                </div>
              </section>

              <section className="px-5 pb-5">
                <div className="space-y-3">
                  <div className="card-soft p-4">
                    <p className="text-[10px] font-semibold tracking-wider text-primary">現場での説明例</p>
                    <p className="mt-2.5 text-[13px] leading-[1.75] text-foreground">{current.hairdresserTalk}</p>
                  </div>
                  <div className="card-soft p-4">
                    <p className="text-[10px] font-semibold tracking-wider text-primary">ディーラー営業トーク</p>
                    <p className="mt-2.5 text-[13px] leading-[1.75] text-foreground">{current.dealerTalk}</p>
                  </div>
                </div>
              </section>

              <section className="px-5 pb-6">
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
            </>
          )}
        </>
      )}
    </>
  );
}