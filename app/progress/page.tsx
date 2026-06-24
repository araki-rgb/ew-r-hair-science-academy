import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { GamificationHUD } from "@/app/components/GamificationHUD";
import { RecommendedLessons } from "@/app/components/RecommendedLessons";
import { categories } from "@/lib/data/categories";
import { getLevelFromXp } from "@/lib/data/gamification";
import { getLessonBySlug } from "@/lib/data/lessons";
import { demoProgress, getOverallProgress, weeklyActivity } from "@/lib/data/progress";

export default function ProgressPage() {
  const overall = getOverallProgress();
  const lvl = getLevelFromXp(demoProgress.xp);
  const nextLesson = getLessonBySlug(demoProgress.nextLessonSlug);
  const nextCategory = categories.find((c) => c.slug === demoProgress.nextLessonSlug);
  const earnedBadges = demoProgress.badges.filter((b) => b.earned);
  const earnedCerts = demoProgress.certifications.filter((c) => c.earned);

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">MY JOURNEY</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">学習記録</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          経験値・レベル・バッジ・認定証。毎日学びたくなる進捗設計。
        </p>
      </section>

      <section className="px-5 pb-5">
        <GamificationHUD />
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[22px] font-bold text-primary">{overall.percent}%</p>
              <p className="text-[9px] text-muted">Mission進捗</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{overall.accuracy}%</p>
              <p className="text-[9px] text-muted">正答率</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-foreground">{demoProgress.longestStreak}</p>
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
              <div
                className={`w-full rounded-md ${d.active ? "bg-primary" : "bg-primary-muted"}`}
                style={{ height: d.active ? Math.max(d.minutes, 14) : 6 }}
              />
              <span className={`text-[9px] ${d.active ? "font-semibold text-primary" : "text-muted"}`}>{d.day}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">CERTIFICATION</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">認定制度</h2>
        <div className="mt-3 space-y-3">
          {demoProgress.certifications.map((cert) => (
            <div
              key={cert.id}
              className={`card-premium overflow-hidden ${cert.earned ? "" : "opacity-50"}`}
            >
              <div className={`cert-pattern px-5 py-5 ${cert.earned ? "" : "grayscale"}`}>
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 ${
                    cert.earned ? "border-gold bg-gold-muted" : "border-border bg-background"
                  }`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke={cert.earned ? "#c4a574" : "#5f726c"} strokeWidth="1.5" className="h-6 w-6">
                      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-foreground">{cert.title}</p>
                    <p className="text-[11px] text-muted">{cert.description}</p>
                    {cert.earnedAt && (
                      <p className="mt-1 text-[10px] font-semibold text-gold">取得日: {cert.earnedAt}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">
          Lv.{lvl.level} {lvl.title} · 全{earnedCerts.length}件の認定証を取得中
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="flex items-end justify-between">
          <h2 className="text-[16px] font-bold text-foreground">バッジ</h2>
          <span className="text-[11px] text-muted">{earnedBadges.length}/{demoProgress.badges.length}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {demoProgress.badges.map((badge) => (
            <div key={badge.id} className={`card-soft p-3.5 ${badge.earned ? "" : "opacity-45"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                badge.earned ? "bg-gradient-to-br from-primary to-primary-dark text-white" : "bg-primary-muted text-muted"
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                  <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="mt-2 text-[12px] font-bold text-foreground">{badge.title}</p>
              <p className="text-[10px] text-muted">{badge.description}</p>
              <p className="mt-1 text-[9px] font-semibold text-primary">+{badge.xpBonus} XP</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <p className="section-label">NEXT MISSION</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">次に学ぶべき内容</h2>
        {nextLesson && nextCategory && (
          <Link href={`/learn/${nextLesson.slug}`} className="card-soft mt-3 block overflow-hidden">
            <div className="bg-gradient-to-r from-primary-muted to-white px-4 py-2">
              <span className="text-[10px] font-bold text-primary">MISSION {nextLesson.missionNumber}</span>
            </div>
            <div className="p-4">
              <p className="text-[15px] font-bold">{nextLesson.title}</p>
              <p className="mt-1 text-[12px] text-muted">{nextLesson.description}</p>
              <p className="mt-2 text-[11px] font-semibold text-primary">+{nextLesson.xpReward} XP · 学習開始 →</p>
            </div>
          </Link>
        )}
        <div className="mt-3"><RecommendedLessons /></div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[16px] font-bold text-foreground">修了Mission</h2>
        <ul className="mt-3 space-y-2">
          {demoProgress.completedMissions.map((slug) => {
            const cat = categories.find((c) => c.slug === slug);
            const lesson = getLessonBySlug(slug);
            return (
              <li key={slug}>
                <Link href={`/learn/${slug}`} className="card-soft flex items-center justify-between p-3.5">
                  <div>
                    <p className="text-[13px] font-semibold">{cat?.title}</p>
                    <p className="text-[10px] text-muted">Mission {lesson?.missionNumber} · +{lesson?.xpReward} XP</p>
                  </div>
                  <span className="rounded-full bg-primary-muted px-2 py-0.5 text-[10px] font-semibold text-primary">修了</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="px-5 pb-6">
        <Link href="/admin" className="card-premium block p-5">
          <p className="section-label">ENTERPRISE</p>
          <h2 className="mt-1 text-[16px] font-bold text-foreground">教育管理画面</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            受講人数・学習率・修了率・店舗別・営業担当別の分析。
            企業導入時の管理者ダッシュボード（デモ）→
          </p>
        </Link>
      </section>
    </AppShell>
  );
}