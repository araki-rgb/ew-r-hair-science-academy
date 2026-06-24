import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { glossaryTerms } from "@/lib/data/glossary";

export default function GlossaryPage() {
  return (
    <AppShell activeNav="learn">
      <PageHeader
        label="GLOSSARY"
        title="用語集"
        description="現場で使えるヘアサイエンス用語のクイックリファレンス"
      />

      <section className="page-section pt-0 space-y-3 pb-8">
        {glossaryTerms.map((t) => (
          <div key={t.term} className="card-soft p-4">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-[15px] font-bold text-foreground">{t.term}</h2>
              <span className="text-[10px] text-muted">{t.reading}</span>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-foreground">{t.definition}</p>
            {t.fieldTip && (
              <p className="mt-2.5 rounded-lg bg-primary-muted/50 px-3 py-2.5 text-[11px] leading-relaxed text-primary">
                現場T: {t.fieldTip}
              </p>
            )}
            {t.relatedLesson && (
              <Link href={`/learn/${t.relatedLesson}`} className="btn-ghost mt-2 text-[11px]">
                関連Mission →
              </Link>
            )}
          </div>
        ))}
      </section>
    </AppShell>
  );
}