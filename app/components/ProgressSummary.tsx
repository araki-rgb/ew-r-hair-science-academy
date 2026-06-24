"use client";

import { useProgress } from "@/app/hooks/useProgress";
import { calcOverallProgress } from "@/lib/utils/progress-calc";

export function ProgressSummary({ variant = "card" }: { variant?: "card" | "inline" }) {
  const { progress, hydrated } = useProgress();
  const overall = calcOverallProgress(progress);

  if (!hydrated) {
    return <div className="h-20 animate-pulse rounded-2xl bg-primary-muted/40" />;
  }

  if (variant === "inline") {
    return (
      <div className="text-right">
        <p className="text-[20px] font-bold text-primary">{overall.percent}%</p>
        <p className="text-[9px] text-muted">全体進捗</p>
      </div>
    );
  }

  return (
    <div className="card-premium overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="section-label">YOUR PROGRESS</p>
          <p className="mt-1 text-[28px] font-bold tracking-tight text-foreground">
            {overall.percent}<span className="text-[16px] text-muted">%</span>
          </p>
          <p className="mt-1 text-[11px] text-muted">
            {overall.completed} / {overall.total} Lessons · 正答率 {overall.accuracy}%
          </p>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center">
          <svg viewBox="0 0 40 40" className="h-16 w-16 -rotate-90">
            <circle cx="20" cy="20" r="16" fill="none" stroke="#e4f2ec" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="#1b7a5a" strokeWidth="3"
              strokeDasharray={`${overall.percent} ${100 - overall.percent}`}
              strokeLinecap="round" pathLength="100"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-primary">{overall.accuracy}%</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "修了", value: `${overall.completed}` },
          { label: "正答", value: `${progress.correctAnswers}/${progress.totalQuestionsAnswered}` },
          { label: "連続", value: `${progress.currentStreak}日` },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white/80 px-2 py-2 text-center">
            <p className="text-[14px] font-bold text-foreground">{s.value}</p>
            <p className="text-[9px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}