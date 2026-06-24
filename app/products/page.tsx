import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
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
      <section className="relative overflow-hidden px-5 pb-5 pt-7">
        <div className="pointer-events-none absolute -right-8 -top-4 h-32 w-32 rounded-full bg-primary-muted/70 blur-2xl" />
        <p className="section-label">SALES ENABLEMENT</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">
          営業支援
          <br />
          ハブ
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          OXLONラインの特徴・提案シーン・営業トークを整理。
          「売る」ではなく「理解して提案する」ための教材です。
        </p>
      </section>

      <section className="px-5 pb-5">
        <Link
          href="/products/compare"
          className="card-premium flex items-center gap-4 overflow-hidden p-4 transition active:scale-[0.99]"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-muted text-gold">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-bold text-foreground">OXLON 製品比較</p>
            <p className="mt-0.5 text-[11px] text-muted">3% · 6% · After Break を横並びで比較</p>
          </div>
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-primary">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </section>

      <section className="px-5 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {proposalFramework.map((item) => (
            <div key={item.step} className="card-soft p-3 text-center">
              <p className="text-[16px] font-bold text-primary">{item.step}</p>
              <p className="mt-1 text-[11px] font-bold text-foreground">{item.title}</p>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-5">
        <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-muted/50 to-white p-4">
          <p className="text-[11px] leading-relaxed text-muted">
            ※ 効能効果を断定する表現は使用していません。施術設計・ケア提案の観点でご活用ください。
          </p>
        </div>
      </section>

      <section className="px-5 pb-6">
        <p className="section-label">FEATURED LINEUP</p>
        <h2 className="mt-1 text-[16px] font-bold text-foreground">主力製品ライン</h2>
        <div className="mt-4 space-y-4">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-premium group block overflow-hidden transition"
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
                    <span className="text-[10px] font-semibold tracking-wider text-primary">
                      {product.category}
                    </span>
                    <h2 className="mt-1 text-[18px] font-bold text-foreground">{product.name}</h2>
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
                      <li key={scene} className="rounded-full bg-primary-muted px-2.5 py-0.5 text-[10px] font-medium text-primary">
                        {scene}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-primary-muted/50 px-3 py-2">
                    <p className="text-[9px] font-semibold text-primary">美容師向け</p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted">
                      {product.hairdresserExplanation.slice(0, 40)}…
                    </p>
                  </div>
                  <div className="rounded-xl bg-gold-muted px-3 py-2">
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

      <section className="px-5 pb-6">
        <h2 className="text-[16px] font-bold text-foreground">その他の製品</h2>
        <div className="mt-3 space-y-3">
          {others.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="card-soft flex items-center gap-4 p-4 transition active:scale-[0.99]"
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

      <section className="px-5 pb-6">
        <Link
          href="/learn/ewr-products"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white shadow-[0_8px_24px_-6px_rgb(27_122_90/0.45)]"
        >
          製品理解Lessonを学ぶ
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </section>
    </AppShell>
  );
}