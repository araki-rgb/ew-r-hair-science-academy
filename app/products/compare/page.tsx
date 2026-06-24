import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { PageHeader } from "@/app/components/PageHeader";
import { getDiagramImageUrl } from "@/lib/content/diagram-images";
import { products } from "@/lib/data/products";

const compareSlugs = ["oxlon-3", "oxlon-6", "oxlon-9", "oxlon-after-break"];
const compareProducts = products.filter((p) => compareSlugs.includes(p.slug));

const rows = [
  { key: "tagline", label: "コンセプト" },
  { key: "features", label: "特徴" },
  { key: "scenes", label: "使用シーン" },
  { key: "recommendedTargets", label: "提案先" },
] as const;

export default function ProductComparePage() {
  return (
    <AppShell activeNav="products">
      <PageHeader
        backHref="/products"
        backLabel="営業支援一覧"
        label="PRODUCT COMPARISON"
        title="OXLON 製品比較"
        description="3% · 6% · 9% · After Break を横並びで比較。サロン提案・営業トークの材料に。"
      />

      <section className="page-section pt-0">
        <div className="grid grid-cols-2 gap-2">
          {compareProducts.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="card-soft card-interactive overflow-hidden">
              <div className="diagram-frame h-20 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getDiagramImageUrl(p.diagramType)} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-2.5 text-center">
                <p className="text-[11px] font-bold text-foreground">{p.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {rows.map((row) => (
        <section key={row.key} className="page-section">
          <p className="section-label">{row.label.toUpperCase()}</p>
          <h2 className="section-title">{row.label}</h2>
          <div className="mt-3 space-y-2">
            {compareProducts.map((p) => (
              <div key={p.slug} className="card-soft p-3.5">
                <p className="text-[10px] font-semibold text-primary">{p.name}</p>
                {row.key === "tagline" && (
                  <p className="mt-1 text-[11px] leading-relaxed text-foreground">{p.tagline}</p>
                )}
                {row.key === "features" && (
                  <ul className="mt-1 space-y-0.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-1.5 text-[10px] text-muted">
                        <span className="text-primary">·</span>{f}
                      </li>
                    ))}
                  </ul>
                )}
                {row.key === "scenes" && (
                  <ul className="mt-1.5 flex flex-wrap gap-1">
                    {p.scenes.map((s) => (
                      <li key={s} className="badge-muted">{s}</li>
                    ))}
                  </ul>
                )}
                {row.key === "recommendedTargets" && (
                  <ul className="mt-1 space-y-0.5">
                    {p.recommendedTargets.map((t) => (
                      <li key={t} className="text-[10px] text-muted">→ {t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="page-section pb-8">
        <div className="card-premium p-4">
          <p className="section-label">SALES TALK</p>
          <p className="section-title">営業トークの使い分け</p>
          {compareProducts.map((p) => (
            <div key={p.slug} className="mt-3 border-t border-border pt-3 first:mt-2 first:border-0 first:pt-0">
              <p className="text-[10px] font-semibold text-primary">{p.name}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{p.dealerTalk}</p>
            </div>
          ))}
        </div>
        <Link href="/learn/ewr-products" className="btn-primary mt-4">
          製品理解Missionを学ぶ
        </Link>
      </section>
    </AppShell>
  );
}