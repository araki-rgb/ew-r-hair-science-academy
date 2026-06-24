"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { GamificationHUD } from "@/app/components/GamificationHUD";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { useProgress } from "@/app/hooks/useProgress";
import { categories } from "@/lib/data/categories";
import { getLessonBySlug } from "@/lib/data/lessons";
import { weeklyActivity } from "@/lib/data/progress";

export default function ProgressPage() {
  const { progress, hydrated, level } = useProgress();

  if (!hydrated) {
    return (
      <AppShell activeNav="progress">
        <div className="px-5 py-20 text-center text-muted">読み込み中...</div>
      </AppShell>
    );
  }

  const totalLessons = 8;
  const percent = Math.round((progress.completedLessons.length / totalLessons) * 100);
  const accuracy =
    progress.totalQuestionsAnswered > 0
      ? Math.round((progress.correctAnswers / progress.totalQuestionsAnswered) * 100)
      : 0;
  const nextLesson = getLessonBySlug(progress.nextLessonSlug);
  const nextCategory = categories.find((c) => c.slug === progress.nextLessonSlug);
  const earnedBadges = progress.badges.filter((b) => b.earned);
  const earnedCerts = progress.certifications.filter((c) => c.earned);

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">MY JOURNEY</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">学習記録</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          Lv.{level.level} {level.title} · {progress.xp} XP
        </p>
      </section>

      <section className="px-5 pb-5"><GamificationHUD /></section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[22px] font-bold text-primary">{percent}%</p>
              <p className="text-[9px] text-muted">Mission進捗</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{accuracy}%</p>
              <p className="text-[9px] text-muted">正答率</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{progress.longestStreak}</p>
              <p className="text-[9px] text-muted">最長連続</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="text-[12px] font-semibold text-foreground">今週の学習</p>
        <div className="card-soft mt-2 flex items-end justify-between gap-1 px-4 py-4">
          {weeklyActivity.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-md ${d.active ? "bg-primary" : "bg-primary-muted"}`} style={{ height: d.active ? Math.max(d.minutes, 14) : 6 }} />
              <span className={`text-[9px] ${d.active ? "font-semibold text-primary" : "text-muted"}`}>{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">CERTIFICATION</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">認定制度</h2>
        <div className="mt-3 space-y-3">
          {progress.certifications.map((cert) => (
            <div key={cert.id} className={`card-premium overflow-hidden ${cert.earned ? "" : "opacity-50"}`}>
              <div className="cert-pattern px-5 py-4">
                <p className="text-[14px] font-bold text-foreground">{cert.title}</p>
                <p className="text-[11px] text-muted">{cert.description}</p>
                {cert.earnedAt && <p className="mt-1 text-[10px] font-semibold text-gold">取得: {cert.earnedAt}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="flex items-end justify-between">
          <h2 className="text-[16px] font-bold text-foreground">バッジ</h2>
          <span className="text-[11px] text-muted">{earnedBadges.length}/{progress.badges.length}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {progress.badges.map((badge) => (
            <div key={badge.id} className={`card-soft p-3.5 ${badge.earned ? "" : "opacity-45"}`}>
              <p className="text-[12px] font-bold text-foreground">{badge.title}</p>
              <p className="text-[10px] text-muted">{badge.description}</p>
              <p className="mt-1 text-[9px] font-semibold text-primary">+{badge.xpBonus} XP</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">NEXT MISSION</p>
        {nextLesson && nextCategory && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft mt-2 block p-4">
            <p className="text-[15px] font-bold">{nextLesson.title}</p>
            <p className="mt-1 text-[12px] text-muted">{nextLesson.description}</p>
            <p className="mt-2 text-[11px] font-semibold text-primary">+{nextLesson.xpReward} XP →</p>
          </Link>
        )}
        <div className="mt-3"><RecommendedLessons /></div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[16px] font-bold text-foreground">修了Mission ({progress.completedMissions.length})</h2>
        <ul className="mt-3 space-y-2">
          {progress.completedMissions.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            const lesson = getLessonBySlug(slug);
            return (
              <li key={slug}>
                <Link href={`/learn/${slug}`} className="card-soft flex items-center justify-between p-3.5">
                  <p className="text-[13px] font-semibold">{cat?.title}</p>
                  <span className="text-[10px] font-semibold text-primary">修了</span>
                </Link>
              </li>
            );
          })}
          {progress.completedMissions.length === 0 && (
            <li className="card-soft p-4 text-center text-[12px] text-muted">まだ修了したMissionはありません</li>
          )}
        </ul>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <p className="text-[13px] font-semibold">Quiz最高スコア</p>
          <p className="mt-1 text-[28px] font-bold">{progress.quizBestScore}点</p>
          {progress.quizPassed && <span className="mt-2 inline-flex rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-bold text-primary">合格済</span>}
          <Link href="/quiz" className="mt-3 flex w-full items-center justify-center rounded-xl bg-primary-muted py-2.5 text-[12px] font-semibold text-primary">理解度テスト</Link>
        </div>
      </section>

      <section className="px-5 pb-6">
        <Link href="/admin" className="card-premium block p-5">
          <p className="section-label">ENTERPRISE</p>
          <h2 className="mt-1 text-[16px] font-bold text-foreground">教育管理画面 →</h2>
        </Link>
      </section>
    </AppShell>
  );
}