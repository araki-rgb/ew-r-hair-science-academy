import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { DiagramArea } from "@/app/components/DiagramArea";
import { PageHeader } from "@/app/components/PageHeader";
import { getDiagramPrompt } from "@/lib/content/diagram-prompts";
import { getDiagramImageUrl } from "@/lib/content/diagram-images";
import { categories } from "@/lib/data/categories";
import { getProductBySlug, products } from "@/lib/data/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const promptMeta = getDiagramPrompt(product.diagramType);
  const diagram = {
    type: product.diagramType,
    title: product.name,
    alt: promptMeta.alt,
    grokPrompt: promptMeta.grokPrompt,
    imageUrl: getDiagramImageUrl(product.diagramType),
    status: "generated" as const,
  };

  const relatedProducts = products.filter((p) => product.relatedProducts.includes(p.slug));
  const relatedLessons = product.relatedLessons.map((s) => categories.find((c) => c.slug === s)).filter(Boolean);

  return (
    <AppShell activeNav="products">
      <PageHeader
        backHref="/products"
        backLabel="営業支援一覧"
        label={product.category.toUpperCase()}
        title={product.name}
        description={product.tagline}
      />

      <section className="page-section pt-0">
        <DiagramArea diagram={diagram} size="hero" />
      </section>

      {slug === "oxlon-after-break" && (
        <section className="page-section">
          <Link href="/learn/after-break" className="card-premium card-interactive block p-5">
            <p className="section-label">STUDY GUIDE</p>
            <h2 className="section-title">毛髪理論で読み解く</h2>
            <p className="mt-2 text-[12px] leading-relaxed text-muted">
              三層構造・4つの結合・機能ブロックまで、高校生でもわかるレベルで段階的に学べます。
            </p>
            <p className="btn-ghost mt-3 text-[11px]">学習ページを開く →</p>
          </Link>
        </section>
      )}

      <section className="page-section">
        <div className="card-premium p-4">
          <p className="section-label">FEATURES</p>
          <h2 className="section-title">製品の特徴</h2>
          <ul className="mt-3 space-y-2.5">
            {product.features.map((f, i) => (
              <li key={f} className="flex gap-2.5 text-[13px] leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section">
        <div className="card-soft p-4">
          <p className="section-label">SCENES</p>
          <h2 className="section-title">使用シーン</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.scenes.map((s) => (
              <span key={s} className="badge-muted">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="card-soft p-4">
          <p className="section-label">TARGET</p>
          <h2 className="section-title">おすすめ提案先</h2>
          <ul className="mt-3 space-y-2">
            {product.recommendedTargets.map((t) => (
              <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-foreground">
                <span className="text-primary">→</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="page-section space-y-3">
        <div className="talk-card talk-card-field">
          <div className="talk-card-header">
            <p className="text-[10px] font-bold tracking-wider text-primary">美容師向け · お客様への説明</p>
          </div>
          <p className="p-4 text-[14px] leading-[1.9] text-foreground">{product.hairdresserExplanation}</p>
        </div>
        <div className="talk-card talk-card-sales">
          <div className="talk-card-header">
            <p className="text-[10px] font-bold tracking-wider text-gold">ディーラー向け · 営業トーク</p>
          </div>
          <p className="p-4 text-[14px] leading-[1.9] text-foreground">{product.dealerTalk}</p>
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">FAQ</p>
        <h2 className="section-title">よくある質問</h2>
        <div className="mt-3 space-y-2">
          {product.faq.map((item) => (
            <details key={item.id} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="caution-note">
          <p className="caution-note-title">注意表現</p>
          <ul className="mt-2 space-y-1">
            {product.cautions.map((c) => (
              <li key={c} className="text-[12px] leading-relaxed text-muted">· {c}</li>
            ))}
          </ul>
        </div>
      </section>

      {relatedLessons.length > 0 && (
        <section className="page-section">
          <p className="section-label">RELATED</p>
          <h2 className="section-title">関連教材</h2>
          <div className="mt-3 space-y-2">
            {relatedLessons.map((cat) => cat && (
              <Link key={cat.slug} href={`/learn/${cat.slug}`} className="card-soft card-interactive flex items-center justify-between p-3.5">
                <p className="text-[13px] font-semibold">{cat.title}</p>
                <span className="btn-ghost text-[11px]">Mission →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="page-section">
          <h2 className="section-title">関連製品</h2>
          <div className="mt-3 space-y-2">
            {relatedProducts.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="card-soft card-interactive p-3.5">
                <p className="text-[13px] font-semibold">{r.name}</p>
                <p className="text-[10px] text-muted">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="page-section pb-8 space-y-3">
        <Link href="/learn/ewr-products" className="btn-primary">
          関連Missionを学ぶ
        </Link>
        <Link href="/ai" className="btn-secondary">
          AI先生に製品相談
        </Link>
        <Link href="/products/compare" className="btn-ghost flex w-full justify-center py-2">
          製品比較表を見る →
        </Link>
      </section>
    </AppShell>
  );
}