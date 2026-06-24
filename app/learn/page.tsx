"use client";

import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { CategoryIcon } from "@/app/components/CategoryIcon";
import { ModeToggle, useUserMode } from "@/app/components/ModeToggle";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { RoadmapTimeline } from "@/app/components/RoadmapTimeline";
import { categories } from "@/lib/data/categories";
import { lessons } from "@/lib/data/lessons";
import { demoProgress, getOverallProgress } from "@/lib/data/progress";

const quizOptions = [
  { key: "A", label: "ケラチン" },
  { key: "B", label: "コラーゲン" },
  { key: "C", label: "メラニン" },
  { key: "D", label: "皮脂" },
];

const hairdresserCategories = ["hair-basic", "scalp-basic", "color-theory", "treatment-aftercare", "customer-explanation"];
const dealerCategories = ["developer-science", "ewr-products", "sales-training", "color-theory", "customer-explanation"];

export default function LearnPage() {
  const overall = getOverallProgress();
  const { mode } = useUserMode();
  const filteredSlugs = mode === "hairdresser" ? hairdresserCategories : dealerCategories;
  const filteredCategories = categories.filter((c) => filteredSlugs.includes(c.slug));

  return (
    <AppShell activeNav="learn">
      <section className="relative overflow-hidden px-5 pb-5 pt-7">
        <div className="pointer-events-none absolute -right-8 -top-4 h-32 w-32 rounded-full bg-primary-muted/70 blur-2xl" />
        <p className="section-label">LEARNING PLATFORM</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">Learn</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          髪・頭皮・薬剤を、現場で使える知識へ。
        </p>
        <div className="mt-5">
          <ModeToggle />
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="card-premium overflow-hidden p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="section-label">YOUR PROGRESS</p>
              <p className="mt-1 text-[28px] font-bold tracking-tight text-foreground">
                {overall.percent}
                <span className="text-[16px] text-muted">%</span>
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
                  strokeLinecap="round"
                  pathLength="100"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-primary">{overall.accuracy}%</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "修了", value: `${overall.completed}` },
              { label: "正答", value: `${demoProgress.correctAnswers}/${demoProgress.totalQuestionsAnswered}` },
              { label: "連続", value: `${demoProgress.currentStreak}日` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-white/80 px-2 py-2 text-center">
                <p className="text-[14px] font-bold text-foreground">{s.value}</p>
                <p className="text-[9px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-8">
        <p className="section-label">ROADMAP</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">
          {mode === "hairdresser" ? "美容師" : "ディーラー"}学習ロードマップ
        </h2>
        <div className="mt-4">
          <RoadmapTimeline />
        </div>
      </section>

      <section className="px-5 pb-8">
        <p className="section-label">RECOMMENDED</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">目的別おすすめ</h2>
        <div className="mt-3">
          <RecommendedLessons />
        </div>
      </section>

      <section className="px-5 pb-8">
        <div className="flex items-end justify-between">
          <h2 className="text-[16px] font-bold text-foreground">
            {mode === "hairdresser" ? "美容師向け" : "ディーラー向け"}コース
          </h2>
          <span className="text-[11px] text-muted">{filteredCategories.length}コース</span>
        </div>
        <div className="mt-4 space-y-4">
          {filteredCategories.map((cat) => {
            const lesson = lessons.find((l) => l.slug === cat.slug);
            const completed = demoProgress.completedLessons.includes(cat.slug);
            const progress = completed ? 100 : cat.slug === "scalp-basic" ? 35 : 0;
            return (
              <article key={cat.slug} className="card-soft overflow-hidden">
                <div className="flex">
                  <div
                    className="w-1 shrink-0"
                    style={{
                      background: completed
                        ? "linear-gradient(to bottom, #1b7a5a, #4db88a)"
                        : progress > 0
                          ? "linear-gradient(to bottom, #1b7a5a, #e4f2ec)"
                          : "#e4f2ec",
                    }}
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-muted text-primary">
                        <CategoryIcon type={cat.icon} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                            Level {cat.level}
                          </span>
                          <span className="text-[10px] font-medium text-muted">
                            {lesson?.questions.length ?? 5} Questions
                          </span>
                          {completed && (
                            <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-semibold text-primary">
                              修了
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 text-[15px] font-bold text-foreground">{cat.title}</h3>
                        <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{cat.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[11px]">
                      <span className="text-muted">{cat.duration}</span>
                      <span className="font-semibold text-primary">{progress}%</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <Link
                      href={`/learn/${cat.slug}`}
                      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[13px] font-semibold transition active:scale-[0.98] ${
                        progress > 0
                          ? "bg-primary text-white shadow-[0_6px_16px_-4px_rgb(27_122_90/0.35)]"
                          : "border border-primary/20 bg-white text-primary"
                      }`}
                    >
                      {progress > 0 && !completed ? "続きから進む" : completed ? "復習する" : "Lessonへ進む"}
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

      <section className="px-5 pb-6">
        <h2 className="text-[16px] font-bold text-foreground">今日の1問</h2>
        <div className="card-soft mt-3 p-5">
          <span className="inline-flex rounded-lg bg-primary-muted px-2.5 py-1 text-[10px] font-semibold text-primary">
            QUICK CHECK · Level 1
          </span>
          <p className="mt-4 text-[15px] font-bold leading-snug text-foreground">
            Q. 髪の主成分は何ですか？
          </p>
          <ul className="mt-4 space-y-2.5">
            {quizOptions.map((option) => (
              <li key={option.key}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[12px] font-bold text-primary shadow-sm">
                    {option.key}
                  </span>
                  <span className="text-[13px] font-medium text-foreground">{option.label}</span>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/learn/hair-basic"
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-primary-muted py-3 text-[12px] font-semibold text-primary"
          >
            Lessonで回答する
          </Link>
        </div>
      </section>
    </AppShell>
  );
}