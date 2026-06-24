"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  applyProgressToRoadmap,
  type RoadmapStep,
  type UserMode,
} from "@/lib/data/roadmaps";
import { useProgress } from "@/app/hooks/useProgress";
import { useUserMode } from "./ModeToggle";

function StepIcon({ status }: { status: RoadmapStep["status"] }) {
  if (status === "completed") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_4px_12px_-2px_rgb(27_122_90/0.4)]">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  if (status === "in-progress") {
    return (
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary-muted">
        <div className="h-3 w-3 animate-pulse-soft rounded-full bg-primary" />
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-white" />
      </div>
    );
  }
  if (status === "available") {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary/40 bg-white text-primary">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-muted">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 opacity-50">
        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

function RoadmapItem({ step, isLast }: { step: RoadmapStep; isLast: boolean }) {
  const isLocked = step.status === "locked";
  const content = (
    <div
      className={`card-soft ml-3 flex-1 p-3.5 transition ${
        isLocked ? "opacity-55" : "hover:shadow-[0_8px_28px_-8px_rgb(27_122_90/0.15)]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-foreground">{step.title}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">{step.description}</p>
        </div>
        {step.badge && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
              step.status === "completed"
                ? "bg-primary-muted text-primary"
                : step.status === "in-progress"
                  ? "bg-primary text-white"
                  : "bg-gold-muted text-gold"
            }`}
          >
            {step.badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-[10px] text-muted">所要 {step.duration}</p>
      {!isLocked && step.status !== "completed" && (
        <p className="mt-2 text-[11px] font-semibold text-primary">
          {step.status === "in-progress" ? "続きから学習 →" : "Lessonを開始 →"}
        </p>
      )}
    </div>
  );

  return (
    <li className="relative flex pb-5">
      {!isLast && <div className="roadmap-line" />}
      <StepIcon status={step.status} />
      {isLocked ? content : (
        <Link href={`/learn/${step.slug}`} className="flex flex-1">
          {content}
        </Link>
      )}
    </li>
  );
}

export function RoadmapTimeline({ initialMode }: { initialMode?: UserMode }) {
  const { mode, hydrated } = useUserMode();
  const { progress, hydrated: progressHydrated } = useProgress();
  const [activeMode, setActiveMode] = useState<UserMode>(initialMode ?? "hairdresser");

  useEffect(() => {
    if (hydrated) setActiveMode(mode);
  }, [mode, hydrated]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<UserMode>).detail;
      setActiveMode(detail);
    };
    window.addEventListener("ewr-mode-change", handler);
    return () => window.removeEventListener("ewr-mode-change", handler);
  }, []);

  const steps = progressHydrated
    ? applyProgressToRoadmap(activeMode, progress.completedMissions, progress.nextLessonSlug)
    : applyProgressToRoadmap(activeMode, [], "hair-basic");

  return (
    <ol className="relative">
      {steps.map((step, i) => (
        <RoadmapItem key={step.slug} step={step} isLast={i === steps.length - 1} />
      ))}
    </ol>
  );
}