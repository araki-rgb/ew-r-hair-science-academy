"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import { ModeToggle, useUserMode } from "@/app/components/ModeToggle";
import { PageHeader } from "@/app/components/PageHeader";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { RoadmapTimeline } from "@/app/components/RoadmapTimeline";
import { categories } from "@/lib/data/categories";
import { lessons } from "@/lib/data/lessons";
import { AssignmentsPanel } from "@/app/components/AssignmentsPanel";
import { ProgressSummary } from "@/app/components/ProgressSummary";
import { useProgress } from "@/app/hooks/useProgress";
import { calcMissionProgress } from "@/lib/utils/progress-calc";

const quizOptions = [
  { key: "A", label: "ケラチン" },
  { key: "B", label: "コラーゲン" },
  { key: "C", label: "メラニン" },
  { key: "D", label: "皮脂" },
];

const hairdresserCategories = ["hair-basic", "scalp-basic", "color-theory", "treatment-aftercare", "customer-explanation"];
const dealerCategories = ["developer-science", "ewr-products", "sales-training", "color-theory", "customer-explanation"];

export default function LearnPage() {
  const { progress, hydrated } = useProgress();
  const { mode } = useUserMode();
  const filteredSlugs = mode === "hairdresser" ? hairdresserCategories : dealerCategories;
  const filteredCategories = categories.filter((c) => filteredSlugs.includes(c.slug));

  return (
    <AppShell activeNav="learn">
      <PageHeader
        label="MISSION CENTER"
        title="Mission"
        description="現場シーンから始まるストーリー型学習。8つのMissionで提案力を育てます。"
      />

      <section className="page-section pt-0 space-y-4">
        <ModeToggle />
        <ProgressSummary />
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">必修トレーニング</h2>
          <Link href="/assignments" className="btn-ghost text-[11px]">すべて →</Link>
        </div>
        <div className="mt-3"><AssignmentsPanel compact /></div>
      </section>

      <section className="page-section">
        <p className="section-label">ROADMAP</p>
        <h2 className="section-title">
          {mode === "hairdresser" ? "美容師" : "ディーラー"}学習ロードマップ
        </h2>
        <div className="mt-4">
          <RoadmapTimeline />
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">RECOMMENDED</p>
        <h2 className="section-title">目的別おすすめ</h2>
        <div className="mt-3">
          <RecommendedLessons />
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading-row">
          <h2 className="section-title">
            {mode === "hairdresser" ? "美容師向け" : "ディーラー向け"}コース
          </h2>
          <span className="badge-muted">{filteredCategories.length}コース</span>
        </div>
        <div className="mt-4 space-y-4">
          {filteredCategories.map((cat) => {
            const lesson = lessons.find((l) => l.slug === cat.slug);
            const completed = hydrated && progress.completedLessons.includes(cat.slug);
            const missionProgress = hydrated ? calcMissionProgress(cat.slug, progress) : 0;
            return (
              <article key={cat.slug} className="card-soft overflow-hidden">
                <div className="flex">
                  <div
                    className="w-1 shrink-0"
                    style={{
                      background: completed
                        ? "linear-gradient(to bottom, var(--primary), var(--accent))"
                        : missionProgress > 0
                          ? "linear-gradient(to bottom, var(--primary), var(--primary-muted))"
                          : "var(--primary-muted)",
                    }}
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-muted text-primary">
                        <CategoryIcon type={cat.icon} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="badge-primary">Level {cat.level}</span>
                          <span className="text-[10px] font-medium text-muted">
                            {lesson?.questions.length ?? 5} Questions
                          </span>
                          {completed && <span className="badge-muted">修了</span>}
                        </div>
                        <h3 className="mt-1.5 text-[15px] font-bold text-foreground">{cat.title}</h3>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{cat.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px]">
                      <span className="text-muted">{cat.duration}</span>
                      <span className="font-semibold text-primary">{missionProgress}%</span>
                    </div>
                    <div className="progress-track progress-glow mt-2">
                      <div className="progress-fill" style={{ width: `${missionProgress}%` }} />
                    </div>
                    <Link
                      href={`/learn/${cat.slug}`}
                      className={missionProgress > 0 ? "btn-primary mt-4" : "btn-secondary mt-4"}
                    >
                      {missionProgress > 0 && !completed ? "続きから進む" : completed ? "復習する" : "Lessonへ進む"}
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="page-section">
        <Link href="/learn/after-break" className="card-premium card-interactive block p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-label">STUDY GUIDE</p>
              <p className="text-[14px] font-bold text-foreground">アフターブレイクを構造的に理解する</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">
                毛髪理論 × 機能構造。高校生向けの段階的ガイド。
              </p>
            </div>
            <span className="badge-gold shrink-0">New</span>
          </div>
          <p className="btn-ghost mt-3 text-[11px]">学習ページを開く →</p>
        </Link>
      </section>

      <section className="page-section">
        <Link href="/glossary" className="card-soft card-interactive flex items-center justify-between p-4">
          <div>
            <p className="text-[13px] font-bold text-foreground">用語集</p>
            <p className="text-[10px] text-muted">ケラチン・キューティクル等のクイックリファレンス</p>
          </div>
          <span className="btn-ghost text-[11px]">→</span>
        </Link>
      </section>

      <section className="page-section pb-8">
        <h2 className="section-title">今日の1問</h2>
        <div className="card-soft mt-3 p-5">
          <span className="badge-muted">QUICK CHECK · Level 1</span>
          <p className="mt-4 text-[15px] font-bold leading-snug text-foreground">
            Q. 髪の主成分は何ですか？
          </p>
          <ul className="mt-4 space-y-2.5">
            {quizOptions.map((option) => (
              <li key={option.key}>
                <div className="choice-btn pointer-events-none">
                  <span className="choice-letter">{option.key}</span>
                  <span className="text-[13px] font-medium text-foreground">{option.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/learn/hair-basic" className="btn-secondary mt-4">
            Lessonで回答する
          </Link>
        </div>
      </section>
    </AppShell>
  );
}