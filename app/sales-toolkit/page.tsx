import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { objectionHandlers, visitPrepChecklist, clientHandouts } from "@/lib/data/sales-toolkit";

export default function SalesToolkitPage() {
  return (
    <AppShell activeNav="products">
      <section className="px-5 pb-5 pt-7">
        <Link href="/products" className="text-[13px] font-medium text-primary">← 営業支援</Link>
        <p className="section-label mt-4">SALES TOOLKIT</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">営業ツールキット</h1>
        <p className="mt-2 text-[12px] text-muted">訪問準備・反論処理・お客様説明素材</p>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">反論処理スクリプト</h2>
        <div className="mt-3 space-y-3">
          {objectionHandlers.map((o, i) => (
            <div key={i} className="card-soft p-4">
              <p className="text-[12px] font-bold text-[#9b3b3b]">{o.objection}</p>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground">{o.response}</p>
              {o.product && (
                <Link href={`/products/${o.product}`} className="mt-2 inline-block text-[11px] font-semibold text-primary">
                  関連製品 →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">訪問前チェックリスト</h2>
        {visitPrepChecklist.map((phase) => (
          <div key={phase.step} className="card-soft mt-3 p-4">
            <p className="text-[12px] font-bold text-primary">{phase.step}</p>
            <ul className="mt-2 space-y-1">
              {phase.items.map((item) => (
                <li key={item} className="flex gap-2 text-[11px] text-foreground">
                  <span className="text-primary">□</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="px-5 pb-6">
        <h2 className="text-[15px] font-bold text-foreground">お客様向け説明素材</h2>
        <div className="mt-3 space-y-2">
          {clientHandouts.map((h) => (
            <Link key={h.title} href={`/learn/${h.lesson}`} className="card-soft block p-3.5">
              <p className="text-[13px] font-semibold text-foreground">{h.title}</p>
              <p className="text-[10px] text-muted">{h.audience} · Missionから抜粋</p>
            </Link>
          ))}
        </div>
        <Link href="/products/compare" className="mt-4 flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary">
          製品比較表を見る
        </Link>
      </section>
    </AppShell>
  );
}