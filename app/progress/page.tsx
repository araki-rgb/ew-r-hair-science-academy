import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { categories } from "@/lib/data/categories";
import { getLessonBySlug } from "@/lib/data/lessons";
import {
  demoProgress,
  getOverallProgress,
  teamStats,
  weeklyActivity,
} from "@/lib/data/progress";

export default function ProgressPage() {
  const overall = getOverallProgress();
  const nextLesson = getLessonBySlug(demoProgress.nextLessonSlug);
  const nextCategory = categories.find((c) => c.slug === demoProgress.nextLessonSlug);
  const earnedBadges = demoProgress.badges.filter((b) => b.earned);

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">MY PROGRESS</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">学習記録</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          進捗・バッジ・認定証。次に学ぶべき内容を確認できます。
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-premium overflow-hidden p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[24px] font-bold text-primary">{overall.percent}%</p>
              <p className="text-[10px] text-muted">学習進捗</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-foreground">{overall.accuracy}%</p>
              <p className="text-[10px] text-muted">正答率</p>
            </div>
            <div>
              <p className="text-[24px] font-bold text-foreground">{demoProgress.currentStreak}</p>
              <p className="text-[10px] text-muted">連続学習日</p>
            </div>
          </div>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
              style={{ width: `${overall.percent}%` }}
            />
          </div>
          <p className="mt-2 text-center text-[10px] text-muted">
            {overall.completed} / {overall.total} Lessons 完了
          </p>
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="text-[12px] font-semibold text-foreground">今週の学習</p>
        <div className="card-soft mt-3 flex items-end justify-between gap-1 px-4 py-4">
          {weeklyActivity.map((day) => (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className={`w-full rounded-md transition ${
                  day.active ? "bg-primary" : "bg-primary-muted"
                }`}
                style={{ height: day.active ? `${Math.max(day.minutes, 12)}px` : "8px" }}
              />
              <span className={`text-[9px] ${day.active ? "font-semibold text-primary" : "text-muted"}`}>
                {day.day}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">CERTIFICATION</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">認定証</h2>
        <div className="cert-pattern card-premium mt-3 overflow-hidden">
          <div className="border-b border-primary/10 bg-gradient-to-r from-primary-muted/60 to-gold-muted/40 px-5 py-3 text-center">
            <p className="text-[9px] font-semibold tracking-[0.25em] text-primary">EW-R HAIR SCIENCE ACADEMY</p>
          </div>
          <div className="px-5 py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-gold-muted">
              <svg viewBox="0 0 24 24" fill="none" stroke="#c4a574" strokeWidth="1.5" className="h-7 w-7">
                <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="mt-4 text-[11px] font-semibold tracking-wider text-gold">CERTIFICATE OF COMPLETION</p>
            <h3 className="mt-2 text-[18px] font-bold text-foreground">髪の基礎 修了認定</h3>
            <p className="mt-2 text-[11px] text-muted">
              Level 1「髪の基礎」を修了しました
            </p>
            <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white/70 px-4 py-2">
              <span className="text-[10px] text-muted">発行日</span>
              <span className="text-[11px] font-semibold text-foreground">2026.06.20</span>
            </div>
            <p className="mt-3 text-[10px] text-muted">
              全Level修了で「Hair Science Professional」認定証を発行
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="flex items-end justify-between">
          <h2 className="text-[16px] font-bold text-foreground">取得バッジ</h2>
          <span className="text-[11px] text-muted">{earnedBadges.length} / {demoProgress.badges.length}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {demoProgress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`card-soft p-3.5 transition ${badge.earned ? "" : "opacity-45"}`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                  badge.earned
                    ? "bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_4px_12px_-2px_rgb(27_122_90/0.4)]"
                    : "bg-primary-muted text-muted"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-2.5 text-[12px] font-bold text-foreground">{badge.title}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{badge.description}</p>
              {badge.earned && (
                <span className="mt-2 inline-flex rounded-full bg-primary-muted px-2 py-0.5 text-[9px] font-bold text-primary">
                  取得済
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">NEXT STEP</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">次に学ぶべき内容</h2>
        {nextLesson && nextCategory && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft mt-3 block overflow-hidden">
            <div className="bg-gradient-to-r from-primary-muted to-white px-4 py-2.5">
              <span className="text-[10px] font-bold text-primary">RECOMMENDED NEXT</span>
            </div>
            <div className="p-4">
              <p className="text-[15px] font-bold text-foreground">
                Level {nextCategory.level} · {nextLesson.title}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{nextLesson.description}</p>
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-primary-muted">
                  <div className="h-full w-[35%] rounded-full bg-primary" />
                </div>
                <span className="text-[10px] font-semibold text-primary">35%</span>
              </div>
              <p className="mt-3 text-[12px] font-semibold text-primary">学習を始める →</p>
            </div>
          </Link>
        )}
        <div className="mt-3">
          <RecommendedLessons />
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[16px] font-bold text-foreground">完了Lesson</h2>
        <ul className="mt-3 space-y-2">
          {demoProgress.completedLessons.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            return (
              <li key={slug}>
                <Link href={`/learn/${slug}`} className="card-soft flex items-center justify-between p-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{cat?.title}</p>
                      <p className="text-[10px] text-muted">Level {cat?.level}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-semibold text-primary">
                    修了
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[16px] font-bold text-foreground">Quiz成績</h2>
        <div className="card-soft mt-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-foreground">最高スコア</p>
              <p className="text-[10px] text-muted">合格ライン 80点</p>
            </div>
            <div className="text-right">
              <p className="text-[28px] font-bold text-foreground">{demoProgress.quizBestScore}</p>
              <p className="text-[10px] text-muted">/ 100点</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${demoProgress.quizBestScore}%` }}
            />
          </div>
          <Link
            href="/quiz"
            className="mt-3 flex w-full items-center justify-center rounded-xl bg-primary-muted py-2.5 text-[12px] font-semibold text-primary"
          >
            理解度テストに挑戦
          </Link>
        </div>
      </section>

      <section className="px-5 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label">TEAM DASHBOARD</p>
            <h2 className="mt-1 text-[16px] font-bold text-foreground">教育管理画面</h2>
            <p className="mt-1 text-[11px] text-muted">ディーラー向け · 代理店教育管理イメージ</p>
          </div>
          <span className="rounded-full bg-primary-muted px-2.5 py-1 text-[9px] font-bold text-primary">
            DEMO
          </span>
        </div>
        <div className="card-premium mt-3 overflow-hidden">
          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              { label: "学習者数", value: teamStats.totalLearners, unit: "名" },
              { label: "今週アクティブ", value: teamStats.activeThisWeek, unit: "名" },
              { label: "平均進捗", value: teamStats.avgProgress, unit: "%" },
              { label: "修了率", value: teamStats.completionRate, unit: "%" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-4 py-4">
                <p className="text-[20px] font-bold text-foreground">
                  {stat.value}
                  <span className="text-[11px] font-medium text-muted">{stat.unit}</span>
                </p>
                <p className="mt-0.5 text-[10px] text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border px-4 py-3">
            <p className="text-[11px] text-muted">
              サロンスタッフ・代理店の学習状況を一元管理。修了率・正答率・バッジ取得状況を可視化。
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}