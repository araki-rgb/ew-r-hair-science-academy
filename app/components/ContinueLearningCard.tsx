"use client";

import Link from "next/link";
import { useProgress } from "@/app/hooks/useProgress";
import { getLessonBySlug } from "@/lib/data/lessons";
import { calcMissionProgress } from "@/lib/utils/progress-calc";

export function ContinueLearningCard() {
  const { progress, hydrated } = useProgress();

  if (!hydrated) return null;

  const nextLesson = getLessonBySlug(progress.nextLessonSlug);
  if (!nextLesson) return null;

  const missionProgress = calcMissionProgress(nextLesson.slug, progress);

  return (
    <div className="card-premium overflow-hidden">
      <div className="border-b border-border bg-gradient-to-r from-primary-muted/80 to-white px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label">CONTINUE LEARNING</p>
            <p className="mt-1 text-[15px] font-bold text-foreground">続きから学習</p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
            <span className="text-[13px] font-bold text-primary">{missionProgress}%</span>
          </div>
        </div>
      </div>
      <Link href={`/learn/${nextLesson.slug}`} className="block p-5">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold text-white">IN PROGRESS</span>
          <span className="text-[10px] text-muted">{nextLesson.duration}</span>
        </div>
        <h3 className="mt-2.5 text-[17px] font-bold leading-snug text-foreground">{nextLesson.title}</h3>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">{nextLesson.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${missionProgress}%` }} />
          </div>
          <span className="text-[11px] font-semibold text-primary">{missionProgress}%</span>
        </div>
        <p className="mt-3 text-[12px] font-semibold text-primary">続きから学習 →</p>
      </Link>
    </div>
  );
}