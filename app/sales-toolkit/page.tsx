import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { objectionHandlers, visitPrepChecklist, clientHandouts } from "@/lib/data/sales-toolkit";

export default function SalesToolkitPage() {
  return (
    <AppShell activeNav="products">
      <section className="page-header pb-3">
        <Link href="/products" className="back-link">← 営業支援</Link>
        <p className="section-label mt-4">SALES TOOLKIT</p>
        <h1 className="page-title">営業ツールキット</h1>
        <p className="page-desc">訪問準備・反論処理・お客様説明素材</p>
      </section>

      <section className="page-section pt-0">
        <p className="section-label">OBJECTION HANDLING</p>
        <h2 className="section-title">反論処理スクリプト</h2>
        <div className="mt-3 space-y-3">
          {objectionHandlers.map((o, i) => (
            <div key={i} className="objection-card">
              <p className="text-[12px] font-bold text-[var(--danger)]">{o.objection}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground">{o.response}</p>
              {o.product && (
                <Link href={`/products/${o.product}`} className="btn-ghost mt-2">
                  関連製品 →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">VISIT PREP</p>
        <h2 className="section-title">訪問前チェックリスト</h2>
        {visitPrepChecklist.map((phase) => (
          <div key={phase.step} className="card-soft mt-3 p-4">
            <span className="badge-primary">{phase.step}</span>
            <ul className="mt-2.5 space-y-1.5">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-[11px] text-foreground">
                  <span className="text-primary">□</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="page-section pb-8">
        <p className="section-label">CLIENT MATERIALS</p>
        <h2 className="section-title">お客様向け説明素材</h2>
        <div className="mt-3 space-y-2">
          {clientHandouts.map((h) => (
            <Link key={h.title} href={`/learn/${h.lesson}`} className="card-soft card-interactive block p-3.5">
              <p className="text-[13px] font-semibold text-foreground">{h.title}</p>
              <p className="text-[10px] text-muted">{h.audience} · Missionから抜粋</p>
            </Link>
          ))}
        </div>
        <Link href="/products/compare" className="btn-secondary mt-4">
          製品比較表を見る
        </Link>
      </section>
    </AppShell>
  );
}