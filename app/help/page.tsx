import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { platformFaq, supportContacts } from "@/lib/data/help-faq";
import { ComplianceFooter } from "@/app/components/ComplianceFooter";

export default function HelpPage() {
  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">HELP CENTER</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">ヘルプ</h1>
        <p className="mt-2 text-[12px] text-muted">よくある質問とお問い合わせ先</p>
      </section>
      <section className="space-y-3 px-5 pb-5">
        {platformFaq.map((item) => (
          <div key={item.q} className="card-soft p-4">
            <p className="text-[13px] font-bold text-foreground">Q. {item.q}</p>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">{item.a}</p>
          </div>
        ))}
      </section>
      <section className="px-5 pb-6">
        <h2 className="text-[15px] font-bold text-foreground">お問い合わせ</h2>
        <div className="mt-3 space-y-2">
          {supportContacts.map((c) => (
            <div key={c.email} className="card-soft p-3.5">
              <p className="text-[12px] font-semibold text-foreground">{c.label}</p>
              <a href={`mailto:${c.email}`} className="mt-1 text-[11px] text-primary">{c.email}</a>
            </div>
          ))}
        </div>
        <Link href="/enterprise" className="card-premium mt-4 block p-4">
          <p className="text-[13px] font-bold text-foreground">企業導入をご検討の方 →</p>
          <p className="mt-1 text-[11px] text-muted">ROI・コンプライアンス・導入フロー</p>
        </Link>
      </section>
      <ComplianceFooter />
    </AppShell>
  );
}