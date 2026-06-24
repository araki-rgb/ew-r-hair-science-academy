import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { adminDashboard } from "@/lib/data/admin";

export default function AdminPage() {
  const { overview, stores, salesReps, popularLessons, weakAreas } = adminDashboard;

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="section-label">ADMIN DASHBOARD</p>
            <h1 className="mt-2 text-[26px] font-bold tracking-tight text-foreground">教育管理</h1>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              受講状況・修了率・理解度を一元管理。企業導入時の管理者画面イメージ。
            </p>
          </div>
          <span className="rounded-full bg-gold-muted px-2.5 py-1 text-[9px] font-bold text-gold">DEMO</span>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "受講者", value: overview.totalLearners, unit: "名" },
            { label: "今週アクティブ", value: overview.activeThisWeek, unit: "名" },
            { label: "平均進捗", value: overview.avgProgress, unit: "%" },
            { label: "修了率", value: overview.completionRate, unit: "%" },
            { label: "平均正答率", value: overview.avgAccuracy, unit: "%" },
            { label: "総獲得XP", value: overview.totalXpEarned.toLocaleString(), unit: "" },
          ].map((s) => (
            <div key={s.label} className="card-soft p-3.5">
              <p className="text-[20px] font-bold text-foreground">
                {s.value}
                <span className="text-[11px] font-medium text-muted">{s.unit}</span>
              </p>
              <p className="mt-0.5 text-[10px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">店舗別 · 学習状況</h2>
        <div className="mt-3 space-y-2">
          {stores.map((store) => (
            <div key={store.id} className="card-soft p-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-bold text-foreground">{store.name}</p>
                  <p className="text-[10px] text-muted">{store.region} · {store.learners}名</p>
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-bold text-primary">{store.progress}%</p>
                  <p className="text-[9px] text-muted">修了 {store.completionRate}%</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${store.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">営業担当別</h2>
        <div className="mt-3 space-y-2">
          {salesReps.map((rep) => (
            <div key={rep.id} className="card-soft flex items-center justify-between p-3.5">
              <div>
                <p className="text-[13px] font-bold text-foreground">{rep.name}</p>
                <p className="text-[10px] text-muted">{rep.region} · {rep.salonsManaged}サロン</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-bold text-primary">{rep.avgProgress}%</p>
                <p className="text-[9px] text-muted">人気: {rep.topLesson}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">人気Mission</h2>
        <div className="mt-3 space-y-2">
          {popularLessons.map((lesson, i) => (
            <div key={lesson.slug} className="card-soft flex items-center gap-3 p-3.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-[12px] font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-foreground">{lesson.title}</p>
                <p className="text-[10px] text-muted">{lesson.completions}修了 · 平均{lesson.avgScore}点</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-[15px] font-bold text-foreground">苦手分野 · 理解度</h2>
        <div className="mt-3 space-y-2">
          {weakAreas.map((area) => (
            <div key={area.topic} className="card-soft p-3.5">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-foreground">{area.topic}</p>
                <p className={`text-[14px] font-bold ${area.accuracy < 60 ? "text-[#9b3b3b]" : "text-primary"}`}>
                  {area.accuracy}%
                </p>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-primary-muted">
                <div
                  className={`h-full rounded-full ${area.accuracy < 60 ? "bg-[#e8b4b4]" : "bg-primary"}`}
                  style={{ width: `${area.accuracy}%` }}
                />
              </div>
              <p className="mt-1 text-[9px] text-muted">{area.attempts}回の回答</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6">
        <Link href="/progress" className="flex w-full items-center justify-center rounded-2xl border border-border py-3.5 text-[13px] font-semibold text-muted">
          学習者画面に戻る
        </Link>
      </section>
    </AppShell>
  );
}