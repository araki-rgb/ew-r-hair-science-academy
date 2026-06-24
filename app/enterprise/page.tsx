import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { enterpriseMetrics } from "@/lib/data/enterprise-value";
import { ComplianceFooter } from "@/app/components/ComplianceFooter";

const implementationFlow = [
  { step: "01", title: "契約・環境構築", desc: "SSO連携・ブランド設定・教材カスタマイズ" },
  { step: "02", title: "アカウント発行", desc: "店舗・営業担当への必修アサイン設定" },
  { step: "03", title: "受講・進捗管理", desc: "リアルタイムダッシュボードで可視化" },
  { step: "04", title: "修了・効果測定", desc: "認定証発行・ROIレポート・改善サイクル" },
];

export default function EnterprisePage() {
  return (
    <AppShell activeNav="home">
      <PageHeader
        label="ENTERPRISE VALUE"
        title="企業導入の価値"
        description="経営・教育・営業の各責任者が求める成果に直結する教育インフラ"
        badge="B2B"
      />

      <section className="page-section pt-0">
        <div className="card-premium overflow-hidden p-5">
          <p className="section-label">ROI IMPACT</p>
          <p className="section-title">導入効果（参考値）</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {enterpriseMetrics.roi.map((m) => (
              <div key={m.label} className="enterprise-hero-metric">
                <p className="value">{m.value}</p>
                <p className="mt-0.5 text-[11px] font-bold text-foreground">{m.label}</p>
                <p className="mt-1 text-[9px] leading-relaxed text-muted">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">IMPLEMENTATION</p>
        <h2 className="section-title">導入フロー</h2>
        <div className="mt-3 space-y-2">
          {implementationFlow.map((f) => (
            <div key={f.step} className="flow-step animate-fade-up">
              <span className="flow-step-num">{f.step}</span>
              <div>
                <p className="text-[13px] font-bold text-foreground">{f.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">STAKEHOLDERS</p>
        <h2 className="section-title">ステークホルダー別メリット</h2>
        <div className="mt-3 space-y-2">
          {enterpriseMetrics.stakeholders.map((s) => (
            <div key={s.role} className="card-soft p-4">
              <span className="badge-primary">{s.role}</span>
              <p className="mt-2 text-[12px] leading-relaxed text-foreground">{s.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">COMPLIANCE</p>
        <h2 className="section-title">コンプライアンス</h2>
        <ul className="compliance-note mt-3 space-y-2.5">
          {enterpriseMetrics.compliance.map((c) => (
            <li key={c} className="flex gap-2.5">
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-white">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="page-section pb-8">
        <Link href="/admin" className="btn-primary">
          管理者デモを見る
        </Link>
        <Link href="/help" className="btn-secondary mt-3">
          導入のお問い合わせ
        </Link>
      </section>

      <ComplianceFooter />
    </AppShell>
  );
}