import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { glossaryTerms } from "@/lib/data/glossary";

export default function GlossaryPage() {
  return (
    <AppShell activeNav="learn">
      <section className="px-5 pb-5 pt-7">
        <p className="section-label">GLOSSARY</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">用語集</h1>
        <p className="mt-2 text-[12px] text-muted">現場で使えるヘアサイエンス用語のクイックリファレンス</p>
      </section>
      <section className="space-y-3 px-5 pb-6">
        {glossaryTerms.map((t) => (
          <div key={t.term} className="card-soft p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-[15px] font-bold text-foreground">{t.term}</h2>
              <span className="text-[10px] text-muted">{t.reading}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">{t.definition}</p>
            {t.fieldTip && (
              <p className="mt-2 rounded-lg bg-primary-muted/50 px-3 py-2 text-[11px] text-primary">
                💡 現場T: {t.fieldTip}
              </p>
            )}
            {t.relatedLesson && (
              <Link href={`/learn/${t.relatedLesson}`} className="mt-2 inline-block text-[11px] font-semibold text-primary">
                関連Mission →
              </Link>
            )}
          </div>
        ))}
      </section>
    </AppShell>
  );
}