"use client";

import { useMemo, useState } from "react";
import type { LessonQuestion } from "@/lib/types";
import Link from "next/link";
import { XP_REWARDS } from "@/lib/data/gamification";
import { syncQuizComplete } from "@/lib/api/sync";
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
        syncQuizComplete(score, correctCount, total);
        setSaved(true);
      }
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <section className="page-section pb-8">
        <div className="card-premium overflow-hidden animate-scale-in">
          <div className={passed ? "result-banner-pass px-5 py-8" : "result-banner-fail px-5 py-8"}>
            <p className="section-label">QUIZ RESULT</p>
            <p className="quiz-score-display mt-3">{score}</p>
            <p className="text-[14px] text-muted">/ 100点</p>
            <p className={`mt-4 text-[16px] font-bold ${passed ? "text-primary" : "text-[var(--danger)]"}`}>
              {passed ? "合格おめでとうございます！" : "もう一度チャレンジしましょう"}
            </p>
            <p className="mt-2 text-[12px] text-muted">
              合格ライン {PASS_SCORE}点 · 正解 {correctCount}/{total}問
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white/90 px-4 py-2 shadow-[var(--shadow-xs)]">
              <span className="text-[14px] font-bold text-primary">+{xpGained} XP</span>
              {passed && <span className="badge-primary">バッジ解放の可能性</span>}
            </div>
          </div>
          <div className="space-y-3 p-5">
            <Link href="/progress" className="btn-primary">学習記録を確認</Link>
            <Link href="/learn" className="btn-secondary">Missionを続ける</Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="flex w-full justify-center py-3 text-[13px] font-medium text-muted transition-opacity active:opacity-60"
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
      <section className="page-section pt-0">
        <div className="section-heading-row text-[11px]">
          <span className="text-muted">問題 {index + 1} / {total}</span>
          <span className="font-semibold text-primary">
            暫定 {Math.round((correctCount / total) * 100)}点
          </span>
        </div>
        <div className="progress-track progress-glow mt-2">
          <div
            className="progress-fill"
            style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </section>

      <section className="page-section">
        <div className="card-soft p-5">
          <span className="badge-muted">QUIZ {String(index + 1).padStart(2, "0")}</span>
          <p className="mt-4 text-[17px] font-bold leading-snug tracking-tight text-foreground">
            Q. {current.question}
          </p>
        </div>
      </section>

      <section className="page-section">
        <ul className="space-y-2.5">
          {current.choices.map((choice, i) => (
            <li key={choice}>
              <button
                type="button"
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={
                  !answered
                    ? "choice-btn"
                    : i === current.answerIndex
                      ? "choice-btn correct"
                      : selected === i
                        ? "choice-btn incorrect"
                        : "choice-btn opacity-60"
                }
              >
                <span className="choice-letter">{CHOICE_LABELS[i]}</span>
                <span className="text-[14px] font-medium text-foreground">{choice}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {answered && (
        <section className="page-section pb-8 animate-fade-up">
          <div className="card-soft mb-4 p-4">
            <p className="section-label">EXPLANATION</p>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">{current.explanation}</p>
          </div>
          <button type="button" onClick={handleNext} className="btn-primary">
            {index < total - 1 ? "次の問題へ" : "結果を見る"}
          </button>
        </section>
      )}
    </>
  );
}