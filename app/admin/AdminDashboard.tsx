"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { adminDashboard } from "@/lib/data/admin";
import { defaultAssignments } from "@/lib/data/assignments";

const REGIONS = ["すべて", "東京", "関西", "中部", "九州"] as const;

export function AdminDashboard() {
  const { overview, stores, salesReps, popularLessons, weakAreas } = adminDashboard;
  const [regionFilter, setRegionFilter] = useState<(typeof REGIONS)[number]>("すべて");
  const [activeTab, setActiveTab] = useState<"stores" | "reps">("stores");

  const filteredStores = useMemo(
    () => (regionFilter === "すべて" ? stores : stores.filter((s) => s.region === regionFilter)),
    [stores, regionFilter],
  );

  const filteredReps = useMemo(
    () => (regionFilter === "すべて" ? salesReps : salesReps.filter((r) => r.region === regionFilter)),
    [salesReps, regionFilter],
  );

  const exportCsv = () => {
    const rows = [
      ["店舗", "地域", "受講者数", "進捗%", "修了率%"],
      ...filteredStores.map((s) => [s.name, s.region, s.learners, s.progress, s.completionRate]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ewr-learning-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
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

      <section className="px-5 pb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-foreground">必修アサイン管理</h2>
          <span className="text-[10px] text-muted">{defaultAssignments.filter((a) => a.mandatory).length}件 必修</span>
        </div>
        <div className="mt-2 space-y-2">
          {defaultAssignments.map((a) => (
            <div key={a.id} className="card-soft flex items-center justify-between p-3">
              <div>
                <p className="text-[12px] font-semibold text-foreground">{a.title}</p>
                <p className="text-[9px] text-muted">{a.assignedBy} · 期限 {a.deadline}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${a.mandatory ? "bg-gold-muted text-gold" : "bg-primary-muted text-primary"}`}>
                {a.mandatory ? "必修" : "任意"}
              </span>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={exportCsv}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-primary/20 py-3 text-[13px] font-semibold text-primary"
        >
          学習レポートをCSV出力
        </button>
      </section>

      <section className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/admin/cms" className="card-soft flex items-center gap-3 p-3.5 transition active:scale-[0.99]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted text-primary">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground">CMS管理</p>
              <p className="text-[10px] text-muted">教材・製品・図解</p>
            </div>
          </Link>
          <Link href="/products/compare" className="card-soft flex items-center gap-3 p-3.5 transition active:scale-[0.99]">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-muted text-gold">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-foreground">製品比較</p>
              <p className="text-[10px] text-muted">OXLON横並び比較</p>
            </div>
          </Link>
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

      <section className="px-5 pb-4">
        <p className="text-[11px] font-semibold text-foreground">地域フィルタ</p>
        <div className="mt-2 flex gap-1.5 overflow-x-auto pb-1">
          {REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegionFilter(r)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition ${
                regionFilter === r ? "bg-primary text-white" : "bg-primary-muted text-primary"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-4">
        <div className="flex gap-1 rounded-2xl bg-primary-muted/50 p-1">
          {([
            ["stores", "店舗別"],
            ["reps", "営業担当"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`flex-1 rounded-xl py-2 text-[12px] font-semibold ${
                activeTab === key ? "bg-primary text-white" : "text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {activeTab === "stores" && (
        <section className="px-5 pb-5">
          <h2 className="text-[15px] font-bold text-foreground">
            店舗別 · 学習状況
            <span className="ml-2 text-[11px] font-medium text-muted">({filteredStores.length}件)</span>
          </h2>
          <div className="mt-3 space-y-2">
            {filteredStores.map((store) => (
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
            {filteredStores.length === 0 && (
              <p className="card-soft p-4 text-center text-[12px] text-muted">該当する店舗がありません</p>
            )}
          </div>
        </section>
      )}

      {activeTab === "reps" && (
        <section className="px-5 pb-5">
          <h2 className="text-[15px] font-bold text-foreground">
            営業担当別
            <span className="ml-2 text-[11px] font-medium text-muted">({filteredReps.length}名)</span>
          </h2>
          <div className="mt-3 space-y-2">
            {filteredReps.map((rep) => (
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
            {filteredReps.length === 0 && (
              <p className="card-soft p-4 text-center text-[12px] text-muted">該当する担当者がいません</p>
            )}
          </div>
        </section>
      )}

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
    </>
  );
}