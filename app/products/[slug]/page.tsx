import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { DiagramArea } from "@/app/components/DiagramArea";
import { getDiagramPrompt } from "@/lib/content/diagram-prompts";
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
    imageUrl: null,
    status: "placeholder" as const,
  };

  const relatedProducts = products.filter((p) => product.relatedProducts.includes(p.slug));
  const relatedLessons = product.relatedLessons.map((s) => categories.find((c) => c.slug === s)).filter(Boolean);

  return (
    <AppShell activeNav="products">
      <section className="px-5 pb-4 pt-5">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          営業支援一覧
        </Link>
        <p className="mt-5 text-[10px] font-semibold tracking-wider text-primary">{product.category}</p>
        <h1 className="mt-1 text-[26px] font-bold text-foreground">{product.name}</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{product.tagline}</p>
      </section>

      <section className="px-5 pb-5">
        <DiagramArea diagram={diagram} size="hero" />
      </section>

      <section className="px-5 pb-5">
        <div className="card-premium p-4">
          <p className="section-label">FEATURES</p>
          <h2 className="mt-1 text-[15px] font-bold">製品の特徴</h2>
          <ul className="mt-3 space-y-2">
            {product.features.map((f, i) => (
              <li key={f} className="flex gap-2.5 text-[13px] leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary text-[10px] font-bold text-white">{i + 1}</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <p className="section-label">SCENES</p>
          <h2 className="mt-1 text-[15px] font-bold">使用シーン</h2>
          <div className="mt-3 space-y-2">
            {product.scenes.map((s) => (
              <div key={s} className="rounded-xl bg-primary-muted/40 px-3.5 py-2.5 text-[13px]">{s}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <p className="section-label">TARGET</p>
          <h2 className="mt-1 text-[15px] font-bold">おすすめ提案先</h2>
          <ul className="mt-3 space-y-2">
            {product.recommendedTargets.map((t) => (
              <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-foreground">
                <span className="text-primary">→</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-5 space-y-3">
        <div className="card-soft overflow-hidden">
          <div className="border-b border-border bg-primary-muted/50 px-4 py-2.5">
            <p className="text-[10px] font-bold text-primary">美容師向け · お客様への説明</p>
          </div>
          <p className="p-4 text-[14px] leading-[1.9]">{product.hairdresserExplanation}</p>
        </div>
        <div className="card-soft overflow-hidden">
          <div className="border-b border-border bg-gold-muted px-4 py-2.5">
            <p className="text-[10px] font-bold text-gold">ディーラー向け · 営業トーク</p>
          </div>
          <p className="p-4 text-[14px] leading-[1.9]">{product.dealerTalk}</p>
        </div>
      </section>

      <section className="px-5 pb-5">
        <h2 className="text-[15px] font-bold">よくある質問</h2>
        <div className="mt-3 space-y-2">
          {product.faq.map((item) => (
            <details key={item.id} className="card-soft group">
              <summary className="cursor-pointer p-4 text-[13px] font-semibold text-foreground">
                {item.question}
              </summary>
              <p className="border-t border-border px-4 pb-4 text-[12px] leading-relaxed text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft border-[#e8d4b4] bg-[#fdfaf5] p-4">
          <p className="text-[10px] font-bold text-[#9a7b4f]">注意表現</p>
          <ul className="mt-2 space-y-1">
            {product.cautions.map((c) => (
              <li key={c} className="text-[12px] text-muted">・{c}</li>
            ))}
          </ul>
        </div>
      </section>

      {relatedLessons.length > 0 && (
        <section className="px-5 pb-5">
          <h2 className="text-[14px] font-bold">関連教材</h2>
          <div className="mt-2 space-y-2">
            {relatedLessons.map((cat) => cat && (
              <Link key={cat.slug} href={`/learn/${cat.slug}`} className="card-soft flex items-center justify-between p-3.5">
                <p className="text-[13px] font-semibold">{cat.title}</p>
                <span className="text-[11px] text-primary">Mission →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="px-5 pb-5">
          <h2 className="text-[14px] font-bold">関連製品</h2>
          <div className="mt-2 space-y-2">
            {relatedProducts.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="card-soft p-3.5">
                <p className="text-[13px] font-semibold">{r.name}</p>
                <p className="text-[10px] text-muted">{r.tagline}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pb-6 space-y-3">
        <Link href="/learn/ewr-products" className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white">
          関連Missionを学ぶ
        </Link>
        <Link href="/ai" className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary">
          AI先生に製品相談
        </Link>
      </section>
    </AppShell>
  );
}