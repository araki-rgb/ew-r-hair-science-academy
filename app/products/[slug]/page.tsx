import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/AppShell";
import { DiagramIllustration } from "@/app/components/DiagramIllustration";
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

  return (
    <AppShell activeNav="products">
      <section className="px-5 pb-5 pt-5">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Productsへ戻る
        </Link>
        <p className="mt-5 text-[10px] font-semibold tracking-wider text-primary">{product.category}</p>
        <h1 className="mt-1 text-[24px] font-bold text-foreground">{product.name}</h1>
        <p className="mt-2 text-[14px] text-muted">{product.tagline}</p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft diagram-placeholder overflow-hidden p-4">
          <div className="aspect-[4/3] w-full">
            <DiagramIllustration type={product.diagramType} />
          </div>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <h2 className="text-[13px] font-semibold text-foreground">特徴</h2>
          <ul className="mt-3 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                <span className="text-primary">•</span>{f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <h2 className="text-[13px] font-semibold text-foreground">おすすめ提案シーン</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {product.scenes.map((s) => (
              <li key={s} className="rounded-full bg-primary-muted px-3 py-1 text-[11px] text-primary">{s}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-5 space-y-3">
        <div className="card-soft p-4">
          <p className="text-[10px] font-semibold tracking-wider text-primary">美容師向け説明</p>
          <p className="mt-2.5 text-[13px] leading-[1.75] text-foreground">{product.hairdresserExplanation}</p>
        </div>
        <div className="card-soft p-4">
          <p className="text-[10px] font-semibold tracking-wider text-primary">ディーラー向け提案トーク</p>
          <p className="mt-2.5 text-[13px] leading-[1.75] text-foreground">{product.dealerTalk}</p>
        </div>
        <div className="card-soft border-[#e8d4b4] bg-[#fdfaf5] p-4">
          <p className="text-[10px] font-semibold tracking-wider text-[#9a7b4f]">注意表現</p>
          <ul className="mt-2.5 space-y-1.5">
            {product.cautions.map((c) => (
              <li key={c} className="text-[12px] leading-relaxed text-muted">・{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-6">
        <Link href="/learn/ewr-products" className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white">
          関連Lessonを学ぶ
        </Link>
      </section>
    </AppShell>
  );
}