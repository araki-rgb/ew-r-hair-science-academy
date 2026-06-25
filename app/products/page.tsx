import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { getDiagramImageUrl } from "@/lib/content/diagram-images";
import { products } from "@/lib/data/products";

const featuredSlugs = ["oxlon-3", "oxlon-6", "oxlon-after-break"];

const proposalFramework = [
  { step: "01", title: "理解する", desc: "成分・設計思想を学ぶ" },
  { step: "02", title: "提案する", desc: "施術シーンに合わせて選ぶ" },
  { step: "03", title: "説明する", desc: "断定を避けた表現で伝える" },
];

export default function ProductsPage() {
  const featured = products.filter((p) => featuredSlugs.includes(p.slug));
  const others = products.filter((p) => !featuredSlugs.includes(p.slug));

  return (
    <AppShell activeNav="products">
      <PageHeader
        label="SALES ENABLEMENT"
        title="営業支援ハブ"
        description="OXLONラインの特徴・提案シーン・営業トークを整理。「売る」ではなく「理解して提案する」ための教材です。"
      />

      <section className="page-section pt-0 space-y-2">
        <Link href="/products/compare" className="card-premium card-interactive flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-muted text-gold">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-foreground">OXLON 製品比較</p>
            <p className="mt-0.5 text-[11px] text-muted">3% · 6% · 9% · After Break 比較</p>
          </div>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-primary">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
        <Link href="/learn/after-break" className="card-soft card-interactive flex items-center justify-between p-4">
          <div>
            <p className="text-[13px] font-bold text-foreground">After Break 学習ガイド</p>
            <p className="mt-0.5 text-[10px] text-muted">毛髪理論で構造的に理解する</p>
          </div>
          <span className="badge-gold">Study</span>
        </Link>
      </section>

      <section className="page-section">
        <p className="section-label">FRAMEWORK</p>
        <h2 className="section-title">提案の3ステップ</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {proposalFramework.map((item) => (
            <div key={item.step} className="platform-pillar p-3 text-center">
              <p className="text-[16px] font-bold text-primary">{item.step}</p>
              <p className="mt-1 text-[11px] font-bold text-foreground">{item.title}</p>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="compliance-note">
          ※ 効能効果を断定する表現は使用していません。施術設計・ケア提案の観点でご活用ください。
        </div>
      </section>

      <section className="page-section">
        <p className="section-label">FEATURED LINEUP</p>
        <h2 className="section-title">主力製品ライン</h2>
        <div className="mt-4 space-y-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-premium card-interactive group block overflow-hidden"
            >
              <div className="diagram-frame overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getDiagramImageUrl(product.diagramType)}
                  alt={product.name}
                  className="aspect-[2.2/1] w-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="badge-muted">{product.category}</span>
                    <h2 className="mt-1.5 text-[18px] font-bold text-foreground">{product.name}</h2>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{product.tagline}</p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary transition group-active:bg-primary group-active:text-white">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-muted">特徴</p>
                  <ul className="mt-1.5 space-y-1">
                    {product.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex gap-2 text-[11px] text-foreground">
                        <span className="text-primary">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3">
                  <p className="text-[10px] font-semibold text-muted">提案シーン</p>
                  <ul className="mt-1.5 flex flex-wrap gap-1.5">
                    {product.scenes.map((scene) => (
                      <li key={scene} className="badge-muted">{scene}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-primary-muted/50 px-3 py-2.5">
                    <p className="text-[9px] font-semibold text-primary">美容師向け</p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted">
                      {product.hairdresserExplanation.slice(0, 40)}…
                    </p>
                  </div>
                  <div className="rounded-xl bg-gold-muted px-3 py-2.5">
                    <p className="text-[9px] font-semibold text-gold">ディーラー向け</p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted">
                      {product.dealerTalk.slice(0, 40)}…
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <h2 className="section-title">その他の製品</h2>
        <div className="mt-3 space-y-3">
          {others.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-soft card-interactive flex items-center gap-4 p-4"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getDiagramImageUrl(product.diagramType)}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold text-primary">{product.category}</p>
                <p className="text-[14px] font-bold text-foreground">{product.name}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted">{product.tagline}</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-primary">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section">
        <Link href="/sales-toolkit" className="card-soft card-interactive flex items-center gap-4 p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-muted text-primary">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-bold text-foreground">営業ツールキット</p>
            <p className="text-[11px] text-muted">反論処理 · 訪問チェックリスト</p>
          </div>
        </Link>
      </section>

      <section className="page-section pb-8">
        <Link href="/learn/ewr-products" className="btn-primary">
          製品理解Lessonを学ぶ
        </Link>
      </section>
    </AppShell>
  );
}