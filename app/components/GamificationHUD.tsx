"use client";

import { useProgress } from "@/app/hooks/useProgress";
import { getDailyGoalProgress } from "@/lib/data/gamification";

export function GamificationHUD({ compact = false }: { compact?: boolean }) {
  const { progress, hydrated, level } = useProgress();

  if (!hydrated) {
    return <div className="card-premium h-24 animate-pulse" />;
  }

  const daily = getDailyGoalProgress(progress);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-dark text-[10px] font-bold text-white">
          {level.level}
        </div>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-primary-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${level.progress}%` }} />
          </div>
        </div>
        <span className="text-[10px] font-bold text-primary">{progress.xp} XP</span>
      </div>
    );
  }

  return (
    <div className="card-premium p-4">
      <div className="flex items-center gap-3">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_6px_16px_-4px_rgb(27_122_90/0.45)]">
          <span className="text-[16px] font-bold">{level.level}</span>
          <span className="absolute -bottom-1 -right-1 rounded-full bg-gold px-1.5 py-0.5 text-[7px] font-bold text-white">Lv</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-foreground">{level.title}</p>
          <p className="text-[10px] text-muted">
            {progress.xp} XP
            {!level.isMax && ` · 次のレベルまで ${level.nextLevelXp - level.currentXp} XP`}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-primary-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${level.progress}%` }} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-background px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[14px]">🔥</span>
          <span className="text-[11px] font-semibold text-foreground">{progress.currentStreak}日連続</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted">今日の目標</p>
          <p className="text-[11px] font-bold text-primary">
            {progress.todayXp}/{progress.dailyGoalXp} XP ({daily}%)
          </p>
        </div>
      </div>
    </div>
  );
}