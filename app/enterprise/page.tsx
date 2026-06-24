import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { enterpriseMetrics } from "@/lib/data/enterprise-value";
import { ComplianceFooter } from "@/app/components/ComplianceFooter";

export default function EnterprisePage() {
  return (
    <AppShell activeNav="home">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">ENTERPRISE VALUE</p>
        <h1 className="mt-2 text-[26px] font-bold text-foreground">企業導入の価値</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          経営・教育・営業の各責任者が求める成果に直結する教育インフラ
        </p>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">導入効果（参考値）</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {enterpriseMetrics.roi.map((m) => (
            <div key={m.label} className="card-soft p-3.5">
              <p className="text-[22px] font-bold text-primary">{m.value}</p>
              <p className="mt-0.5 text-[11px] font-bold text-foreground">{m.label}</p>
              <p className="mt-1 text-[9px] leading-relaxed text-muted">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">ステークホルダー別メリット</h2>
        <div className="mt-3 space-y-2">
          {enterpriseMetrics.stakeholders.map((s) => (
            <div key={s.role} className="card-soft p-3.5">
              <p className="text-[12px] font-bold text-primary">{s.role}</p>
              <p className="mt-1 text-[12px] text-foreground">{s.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold text-foreground">コンプライアンス</h2>
        <ul className="card-soft mt-3 space-y-2 p-4">
          {enterpriseMetrics.compliance.map((c) => (
            <li key={c} className="flex gap-2 text-[11px] text-foreground">
              <span className="text-primary">✓</span>{c}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-6">
        <Link href="/admin" className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white">
          管理者デモを見る
        </Link>
        <Link href="/help" className="mt-3 flex w-full items-center justify-center py-3 text-[13px] font-medium text-muted">
          導入のお問い合わせ
        </Link>
      </section>
      <ComplianceFooter />
    </AppShell>
  );
}