"use client";

import Link from "next/link";
import { useMemo } from "react";
import { defaultAssignments, resolveAssignmentStatus } from "@/lib/data/assignments";
import { useProgress } from "@/app/hooks/useProgress";
import { useUserMode } from "./ModeToggle";

const statusBadge = {
  completed: "badge-muted",
  "in-progress": "badge-primary",
  pending: "badge-muted opacity-60",
  overdue: "badge-danger",
};

const statusLabel = {
  completed: "修了",
  "in-progress": "学習中",
  pending: "未着手",
  overdue: "期限超過",
};

export function AssignmentsPanel({ compact = false }: { compact?: boolean }) {
  const { progress, hydrated } = useProgress();
  const { mode } = useUserMode();

  const assignments = useMemo(() => {
    if (!hydrated) return defaultAssignments;
    const resolved = resolveAssignmentStatus(defaultAssignments, progress.completedMissions, progress.quizPassed);
    return resolved.filter((a) => a.targetRole === "both" || a.targetRole === mode);
  }, [hydrated, progress, mode]);

  const mandatoryPending = assignments.filter((a) => a.mandatory && a.status !== "completed").length;

  if (compact) {
    return (
      <Link href="/assignments" className="card-soft card-interactive flex items-center justify-between p-4">
        <div>
          <p className="text-[13px] font-bold text-foreground">必修トレーニング</p>
          <p className="mt-0.5 text-[11px] text-muted">教育本部からのアサイン</p>
        </div>
        {mandatoryPending > 0 ? (
          <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--danger)] px-2 text-[11px] font-bold text-white">
            {mandatoryPending}
          </span>
        ) : (
          <span className="badge-muted">完了 ✓</span>
        )}
      </Link>
    );
  }

  return (
    <div className="space-y-2">
      {assignments.map((a) => (
        <Link
          key={a.id}
          href={a.slug === "quiz" ? "/quiz" : `/learn/${a.slug}`}
          className="card-soft card-interactive flex items-center justify-between p-3.5"
        >
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-foreground">{a.title}</p>
              {a.mandatory && <span className="badge-gold">必修</span>}
            </div>
            <p className="mt-0.5 text-[10px] text-muted">期限 {a.deadline} · {a.assignedBy}</p>
          </div>
          <span className={`shrink-0 ${statusBadge[a.status]}`}>
            {statusLabel[a.status]}
          </span>
        </Link>
      ))}
    </div>
  );
}