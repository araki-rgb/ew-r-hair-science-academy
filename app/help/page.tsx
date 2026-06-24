import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { platformFaq, supportContacts } from "@/lib/data/help-faq";
import { ComplianceFooter } from "@/app/components/ComplianceFooter";

export default function HelpPage() {
  return (
    <AppShell activeNav="progress">
      <PageHeader
        label="HELP CENTER"
        title="ヘルプ"
        description="よくある質問、お問い合わせ、企業導入のご相談はこちらから。"
      />

      <section className="page-section pt-0">
        <div className="grid grid-cols-2 gap-2">
          <Link href="/enterprise" className="help-quick-link card-interactive">
            <div>
              <p className="text-[12px] font-bold text-foreground">企業導入相談</p>
              <p className="mt-0.5 text-[10px] text-muted">ROI・導入フロー</p>
            </div>
            <span className="badge-gold">B2B</span>
          </Link>
          <Link href="/login" className="help-quick-link card-interactive">
            <div>
              <p className="text-[12px] font-bold text-foreground">法人ログイン</p>
              <p className="mt-0.5 text-[10px] text-muted">進捗のサーバー保存</p>
            </div>
            <span className="badge-muted">Login</span>
          </Link>
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">よくある質問</h2>
        <div className="mt-3 space-y-2">
          {platformFaq.map((item) => (
            <details key={item.q} className="faq-item">
              <summary>Q. {item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">CONTACT</p>
        <h2 className="section-title">お問い合わせ</h2>
        <div className="mt-3 space-y-2">
          {supportContacts.map((c) => (
            <div key={c.email} className="help-contact-card">
              <p className="text-[12px] font-semibold text-foreground">{c.label}</p>
              <a href={`mailto:${c.email}`} className="btn-ghost mt-1 text-[11px]">
                {c.email}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">COMPLIANCE</p>
        <h2 className="section-title">コンプライアンス</h2>
        <div className="compliance-note mt-3">
          本プラットフォームの教材は施術設計・ケア提案の教育目的です。効能効果の断定表現は使用していません。詳細は
          <Link href="/enterprise" className="font-semibold text-primary"> 企業導入ページ </Link>
          をご確認ください。
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href="/glossary" className="card-soft card-interactive p-3.5 text-center">
            <p className="text-[12px] font-bold text-foreground">用語集</p>
            <p className="text-[9px] text-muted">クイックリファレンス</p>
          </Link>
          <Link href="/sales-toolkit" className="card-soft card-interactive p-3.5 text-center">
            <p className="text-[12px] font-bold text-foreground">営業ツール</p>
            <p className="text-[9px] text-muted">反論処理・訪問準備</p>
          </Link>
        </div>
      </section>

      <section className="page-section page-section-last">
        <Link href="/enterprise" className="card-premium card-interactive block p-5">
          <p className="section-label">FOR ENTERPRISE</p>
          <h3 className="section-title">企業導入をご検討の方</h3>
          <p className="mt-2 text-[12px] text-muted">ROI・コンプライアンス・導入フローをご確認ください</p>
          <p className="btn-ghost mt-2 text-[11px]">詳細を見る →</p>
        </Link>
      </section>

      <ComplianceFooter />
    </AppShell>
  );
}