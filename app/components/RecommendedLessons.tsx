"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRecommendations, type UserMode } from "@/lib/data/roadmaps";
import { useProgress } from "@/app/hooks/useProgress";
import { useUserMode } from "./ModeToggle";

export function RecommendedLessons({ initialMode }: { initialMode?: UserMode }) {
  const { mode, hydrated } = useUserMode();
  const [activeMode, setActiveMode] = useState<UserMode>(initialMode ?? "hairdresser");

  useEffect(() => {
    if (hydrated) setActiveMode(mode);
  }, [mode, hydrated]);

  useEffect(() => {
    const handler = (e: Event) => {
      setActiveMode((e as CustomEvent<UserMode>).detail);
    };
    window.addEventListener("ewr-mode-change", handler);
    return () => window.removeEventListener("ewr-mode-change", handler);
  }, []);

  const { progress, hydrated: progressHydrated } = useProgress();
  const lessons = getRecommendations(
    activeMode,
    progressHydrated ? progress.completedMissions : [],
  );

  return (
    <div className="space-y-3">
      {lessons.map((lesson, i) => (
        <Link
          key={lesson.slug}
          href={`/learn/${lesson.slug}`}
          className="card-soft group block overflow-hidden transition"
          style={{ animationDelay: `${i * 0.06}s` }}
        >
          <div className="flex">
            <div className="flex w-1 shrink-0 bg-gradient-to-b from-primary to-primary-light" />
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-primary-muted px-2 py-0.5 text-[9px] font-bold text-primary">
                  {lesson.tag}
                </span>
                <span className="text-[10px] text-muted">Lv.{lesson.level} · {lesson.duration}</span>
              </div>
              <p className="mt-2 text-[14px] font-bold text-foreground group-active:text-primary">
                {lesson.title}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{lesson.reason}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}