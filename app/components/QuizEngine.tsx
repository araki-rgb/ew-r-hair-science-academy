"use client";

import { useMemo, useState } from "react";
import type { LessonQuestion } from "@/lib/types";
import Link from "next/link";
import { XP_REWARDS } from "@/lib/data/gamification";
import { completeQuiz, loadProgress } from "@/lib/storage/progress-store";

const CHOICE_LABELS = ["A", "B", "C", "D"];
const PASS_SCORE = 80;

export function QuizEngine({ questions }: { questions: LessonQuestion[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [saved, setSaved] = useState(false);

  const current = questions[index];
  const total = questions.length;

  const score = useMemo(
    () => Math.round((correctCount / total) * 100),
    [correctCount, total],
  );
  const passed = score >= PASS_SCORE;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === current.answerIndex) setCorrectCount((c) => c + 1);
  };

  const handleNext = () => {
    if (index < total - 1) {
      setIndex((v) => v + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const xp = passed ? XP_REWARDS.quizPass : Math.round(score / 2);
      setXpGained(xp);
      if (!saved) {
        completeQuiz(loadProgress(), score, correctCount, total);
        setSaved(true);
      }
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <section className="px-5 pb-6">
        <div className="card-soft overflow-hidden">
          <div className={`px-5 py-8 text-center ${passed ? "bg-gradient-to-r from-primary-muted to-[#f0f9f6]" : "bg-gradient-to-r from-[#fdf2f2] to-white"}`}>
            <p className="text-[10px] font-semibold tracking-wider text-primary">QUIZ RESULT</p>
            <p className="mt-3 text-[48px] font-bold text-foreground">{score}</p>
            <p className="text-[14px] text-muted">/ 100点</p>
            <p className={`mt-4 text-[16px] font-bold ${passed ? "text-primary" : "text-[#9b3b3b]"}`}>
              {passed ? "合格おめでとうございます！" : "もう一度チャレンジしましょう"}
            </p>
            <p className="mt-2 text-[12px] text-muted">
              合格ライン {PASS_SCORE}点 · 正解 {correctCount}/{total}問
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2">
              <span className="text-[14px] font-bold text-primary">+{xpGained} XP</span>
              {passed && (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-white">バッジ解放の可能性</span>
              )}
            </div>
          </div>
          <div className="space-y-3 p-5">
            <Link href="/progress" className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white">
              学習記録を確認
            </Link>
            <Link href="/learn" className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary">
              Missionを続ける
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex w-full items-center justify-center py-3 text-[13px] font-medium text-muted"
            >
              もう一度挑戦
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="px-5 pb-5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-muted">問題 {index + 1} / {total}</span>
          <span className="font-semibold text-primary">
            暫定 {Math.round((correctCount / total) * 100)}点
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-muted">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-5">
          <span className="inline-flex rounded-lg bg-primary-muted px-2.5 py-1 text-[10px] font-semibold text-primary">
            QUIZ {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-4 text-[17px] font-bold leading-snug text-foreground">
            Q. {current.question}
          </p>
        </div>
      </section>

      <section className="px-5 pb-5">
        <ul className="space-y-2.5">
          {current.choices.map((choice, i) => (
            <li key={choice}>
              <button
                type="button"
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
                  !answered
                    ? "border-border bg-background active:border-primary active:bg-primary-muted"
                    : i === current.answerIndex
                      ? "border-primary bg-[#e8f5f0]"
                      : selected === i
                        ? "border-[#e8b4b4] bg-[#fdf2f2]"
                        : "border-border bg-background opacity-60"
                }`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[13px] font-bold text-primary shadow-sm">
                  {CHOICE_LABELS[i]}
                </span>
                <span className="text-[14px] font-medium text-foreground">{choice}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {answered && (
        <section className="px-5 pb-6">
          <div className="card-soft mb-4 p-4">
            <p className="text-[10px] font-semibold text-primary">解説</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{current.explanation}</p>
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[15px] font-semibold text-white"
          >
            {index < total - 1 ? "次の問題へ" : "結果を見る"}
          </button>
        </section>
      )}
    </>
  );
}