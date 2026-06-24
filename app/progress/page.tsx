import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { categories } from "@/lib/data/categories";
import { getLessonBySlug } from "@/lib/data/lessons";
import { demoProgress, getOverallProgress } from "@/lib/data/progress";

export default function ProgressPage() {
  const overall = getOverallProgress();
  const nextLesson = getLessonBySlug(demoProgress.nextLessonSlug);
  const nextCategory = categories.find((c) => c.slug === demoProgress.nextLessonSlug);

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-6 pt-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary">MY PROGRESS</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">学習記録</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          あなたの学習状況と次のステップを確認できます。
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft overflow-hidden bg-gradient-to-br from-primary-muted via-white to-white p-5">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[22px] font-bold text-primary">{overall.percent}%</p>
              <p className="text-[10px] text-muted">学習進捗</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{overall.accuracy}%</p>
              <p className="text-[10px] text-muted">正答率</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{demoProgress.currentStreak}</p>
              <p className="text-[10px] text-muted">連続学習日</p>
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-primary" style={{ width: `${overall.percent}%` }} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[13px] font-semibold text-foreground">次に学ぶべきLesson</h2>
        {nextLesson && nextCategory && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft mt-3 block p-4">
            <span className="text-[10px] font-semibold text-primary">RECOMMENDED</span>
            <p className="mt-1 text-[15px] font-bold text-foreground">
              Level {nextCategory.level} · {nextLesson.title}
            </p>
            <p className="mt-1.5 text-[12px] text-muted">{nextLesson.description}</p>
            <p className="mt-3 text-[12px] font-semibold text-primary">学習を始める →</p>
          </Link>
        )}
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[13px] font-semibold text-foreground">完了Lesson</h2>
        <ul className="mt-3 space-y-2">
          {demoProgress.completedLessons.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            return (
              <li key={slug}>
                <Link href={`/learn/${slug}`} className="card-soft flex items-center justify-between p-3.5">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{cat?.title}</p>
                    <p className="text-[10px] text-muted">Level {cat?.level}</p>
                  </div>
                  <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-semibold text-primary">完了</span>
                </Link>
              </li>
            );
          })}
          {demoProgress.completedLessons.length === 0 && (
            <li className="card-soft p-4 text-center text-[12px] text-muted">まだ完了したLessonはありません</li>
          )}
        </ul>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[13px] font-semibold text-foreground">Quiz成績</h2>
        <div className="card-soft mt-3 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[13px] font-semibold text-foreground">最高スコア</p>
              <p className="text-[10px] text-muted">合格ライン 80点</p>
            </div>
            <p className="text-[24px] font-bold text-foreground">{demoProgress.quizBestScore}点</p>
          </div>
          <Link href="/quiz" className="mt-3 flex w-full items-center justify-center rounded-xl bg-primary-muted py-2.5 text-[12px] font-semibold text-primary">
            理解度テストに挑戦
          </Link>
        </div>
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-[13px] font-semibold text-foreground">取得バッジ</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {demoProgress.badges.map((badge) => (
            <div
              key={badge.id}
              className={`card-soft p-3.5 ${badge.earned ? "" : "opacity-50"}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${badge.earned ? "bg-primary text-white" : "bg-primary-muted text-muted"}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-2 text-[12px] font-bold text-foreground">{badge.title}</p>
              <p className="mt-0.5 text-[10px] leading-relaxed text-muted">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}