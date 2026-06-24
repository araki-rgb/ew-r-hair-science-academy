"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { GamificationHUD } from "@/app/components/GamificationHUD";
import { PageHeader } from "@/app/components/PageHeader";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { useProgress } from "@/app/hooks/useProgress";
import { categories } from "@/lib/data/categories";
import { getLessonBySlug } from "@/lib/data/lessons";
import { AssignmentsPanel } from "@/app/components/AssignmentsPanel";
import { ComplianceFooter } from "@/app/components/ComplianceFooter";
import { getWeeklyActivityFromProgress } from "@/lib/utils/progress-calc";

export default function ProgressPage() {
  const { progress, hydrated, level } = useProgress();

  if (!hydrated) {
    return (
      <AppShell activeNav="progress">
        <div className="page-section py-20 text-center text-muted">読み込み中...</div>
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
  const weeklyActivity = getWeeklyActivityFromProgress(progress);

  return (
    <AppShell activeNav="progress">
      <PageHeader
        label="MY JOURNEY"
        title="学習記録"
        description={`Lv.${level.level} ${level.title} · ${progress.xp} XP`}
        action={
          <Link href="/login" className="badge-muted shrink-0">ログイン</Link>
        }
      />

      <section className="page-section pt-0">
        <GamificationHUD />
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">プロフィール</h2>
          <Link href="/profile" className="btn-ghost text-[11px]">編集 →</Link>
        </div>
        <p className="mt-1 text-[11px] text-muted">認定証に表示するお名前・サロン名を登録</p>
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">必修トレーニング</h2>
          <Link href="/assignments" className="btn-ghost text-[11px]">すべて →</Link>
        </div>
        <div className="mt-3"><AssignmentsPanel /></div>
      </section>

      <section className="page-section">
        <div className="card-premium p-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="metric-card py-3">
              <p className="metric-hero-value text-[1.375rem]">{percent}%</p>
              <p className="metric-label">Mission進捗</p>
            </div>
            <div className="metric-card py-3">
              <p className="metric-value text-[1.375rem]">{accuracy}%</p>
              <p className="metric-label">正答率</p>
            </div>
            <div className="metric-card py-3">
              <p className="metric-value text-[1.375rem]">{progress.longestStreak}</p>
              <p className="metric-label">最長連続</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">WEEKLY ACTIVITY</p>
        <h2 className="section-title">今週の学習</h2>
        <div className="card-soft mt-3 flex items-end justify-between gap-1 px-4 py-4">
          {weeklyActivity.map((d) => (
            <div key={d.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-md transition-all ${d.active ? "bg-primary" : "bg-primary-muted"}`}
                style={{ height: d.active ? Math.max(d.minutes, 14) : 6 }}
              />
              <span className={`text-[9px] ${d.active ? "font-semibold text-primary" : "text-muted"}`}>{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">CERTIFICATION</p>
        <h2 className="section-title">認定制度</h2>
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

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">バッジ</h2>
          <span className="badge-muted">{earnedBadges.length}/{progress.badges.length}</span>
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

      <section className="page-section">
        <p className="section-label">NEXT MISSION</p>
        {nextLesson && nextCategory && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft card-interactive mt-2 block p-4">
            <p className="text-[15px] font-bold">{nextLesson.title}</p>
            <p className="mt-1 text-[12px] text-muted">{nextLesson.description}</p>
            <p className="btn-ghost mt-2 text-[11px]">+{nextLesson.xpReward} XP →</p>
          </Link>
        )}
        <div className="mt-3"><RecommendedLessons /></div>
      </section>

      <section className="page-section">
        <h2 className="section-title">修了Mission ({progress.completedMissions.length})</h2>
        <ul className="mt-3 space-y-2">
          {progress.completedMissions.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            return (
              <li key={slug}>
                <Link href={`/learn/${slug}`} className="card-soft card-interactive flex items-center justify-between p-3.5">
                  <p className="text-[13px] font-semibold">{cat?.title}</p>
                  <span className="badge-muted">修了</span>
                </Link>
              </li>
            );
          })}
          {progress.completedMissions.length === 0 && (
            <li className="card-soft p-4 text-center text-[12px] text-muted">まだ修了したMissionはありません</li>
          )}
        </ul>
      </section>

      <section className="page-section">
        <div className="card-premium p-4">
          <p className="section-label">QUIZ SCORE</p>
          <p className="metric-hero-value mt-1">{progress.quizBestScore}点</p>
          {progress.quizPassed && <span className="badge-muted mt-2">合格済</span>}
          <Link href="/quiz" className="btn-secondary mt-3">理解度テスト</Link>
        </div>
      </section>

      <section className="page-section">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/glossary" className="card-soft card-interactive p-3.5 text-center">
            <p className="text-[12px] font-bold text-foreground">用語集</p>
            <p className="text-[9px] text-muted">クイックリファレンス</p>
          </Link>
          <Link href="/help" className="card-soft card-interactive p-3.5 text-center">
            <p className="text-[12px] font-bold text-foreground">ヘルプ</p>
            <p className="text-[9px] text-muted">FAQ・問合せ</p>
          </Link>
        </div>
      </section>

      <section className="page-section pb-6">
        <Link href="/admin" className="card-premium card-interactive block p-5">
          <p className="section-label">ENTERPRISE</p>
          <h2 className="section-title">教育管理画面 →</h2>
        </Link>
      </section>

      <ComplianceFooter />
    </AppShell>
  );
}