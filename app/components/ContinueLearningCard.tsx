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
    <div className="card-premium card-interactive overflow-hidden">
      <div className="continue-learning-header">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label">CONTINUE LEARNING</p>
            <p className="section-title">続きから学習</p>
          </div>
          <div className="continue-learning-ring">
            <span className="text-[13px] font-bold text-primary">{missionProgress}%</span>
          </div>
        </div>
      </div>
      <Link href={`/learn/${nextLesson.slug}`} className="block p-5">
        <div className="flex items-center gap-2">
          <span className="badge-primary">IN PROGRESS</span>
          <span className="badge-muted">{nextLesson.duration}</span>
        </div>
        <h3 className="mt-2.5 text-[17px] font-bold leading-snug tracking-tight text-foreground">
          {nextLesson.title}
        </h3>
        <p className="mt-2 text-[12px] leading-relaxed text-muted">{nextLesson.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="progress-track progress-glow flex-1">
            <div className="progress-fill" style={{ width: `${missionProgress}%` }} />
          </div>
          <span className="text-[11px] font-semibold text-primary">{missionProgress}%</span>
        </div>
        <p className="btn-ghost mt-3 text-[12px]">続きから学習 →</p>
      </Link>
    </div>
  );
}