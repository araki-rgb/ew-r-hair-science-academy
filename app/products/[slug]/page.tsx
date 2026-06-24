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

  const related = products.filter((p) => p.slug !== slug && p.category === product.category).slice(0, 2);

  return (
    <AppShell activeNav="products">
      <section className="px-5 pb-4 pt-5">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Productsへ戻る
        </Link>
        <p className="mt-5 text-[10px] font-semibold tracking-wider text-primary">{product.category}</p>
        <h1 className="mt-1 text-[26px] font-bold text-foreground">{product.name}</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted">{product.tagline}</p>
      </section>

      <section className="px-5 pb-5">
        <div className="diagram-frame overflow-hidden p-5">
          <div className="aspect-[4/3] w-full">
            <DiagramIllustration type={product.diagramType} />
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted">
          製品理解のための図解教材 · 動画デモ収録予定
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-premium p-4">
          <p className="section-label">PRODUCT FEATURES</p>
          <h2 className="mt-1 text-[15px] font-bold text-foreground">製品の特徴</h2>
          <ul className="mt-3 space-y-2.5">
            {product.features.map((f, i) => (
              <li key={f} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-muted text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-foreground">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft p-4">
          <p className="section-label">PROPOSAL SCENES</p>
          <h2 className="mt-1 text-[15px] font-bold text-foreground">おすすめ提案シーン</h2>
          <div className="mt-3 space-y-2">
            {product.scenes.map((s, i) => (
              <div key={s} className="flex items-start gap-3 rounded-xl bg-primary-muted/40 px-3.5 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white">
                  {i + 1}
                </span>
                <p className="text-[13px] leading-relaxed text-foreground">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-5 space-y-3">
        <div className="card-soft overflow-hidden">
          <div className="border-b border-border bg-primary-muted/50 px-4 py-3">
            <p className="text-[10px] font-bold tracking-wider text-primary">美容師向け · お客様への説明例</p>
          </div>
          <div className="p-4">
            <p className="text-[14px] leading-[1.85] text-foreground">{product.hairdresserExplanation}</p>
            <p className="mt-3 rounded-xl bg-background px-3 py-2 text-[11px] text-muted">
              💡 カウンセリング時にそのまま使える表現です
            </p>
          </div>
        </div>

        <div className="card-soft overflow-hidden">
          <div className="border-b border-border bg-gold-muted px-4 py-3">
            <p className="text-[10px] font-bold tracking-wider text-gold">ディーラー向け · 営業提案トーク</p>
          </div>
          <div className="p-4">
            <p className="text-[14px] leading-[1.85] text-foreground">{product.dealerTalk}</p>
            <p className="mt-3 rounded-xl bg-background px-3 py-2 text-[11px] text-muted">
              💡 サロン訪問時の提案ストーリーとして活用
            </p>
          </div>
        </div>

        <div className="card-soft border-[#e8d4b4] bg-[#fdfaf5] p-4">
          <p className="text-[10px] font-bold tracking-wider text-[#9a7b4f]">注意表現 · コンプライアンス</p>
          <ul className="mt-3 space-y-2">
            {product.cautions.map((c) => (
              <li key={c} className="flex gap-2 text-[12px] leading-relaxed text-muted">
                <span className="text-[#9a7b4f]">⚠</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-5 pb-5">
          <h2 className="text-[14px] font-bold text-foreground">関連製品</h2>
          <div className="mt-3 space-y-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/products/${r.slug}`} className="card-soft flex items-center justify-between p-3.5">
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{r.name}</p>
                  <p className="text-[10px] text-muted">{r.tagline}</p>
                </div>
                <span className="text-[11px] font-semibold text-primary">詳細 →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pb-6 space-y-3">
        <Link
          href="/learn/ewr-products"
          className="flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
        >
          関連Lessonを学ぶ
        </Link>
        <Link
          href="/ai"
          className="flex w-full items-center justify-center rounded-2xl border border-primary/20 py-3.5 text-[13px] font-semibold text-primary"
        >
          AI先生に製品について質問
        </Link>
      </section>
    </AppShell>
  );
}