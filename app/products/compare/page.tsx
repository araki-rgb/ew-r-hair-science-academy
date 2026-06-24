import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
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
      <section className="px-5 pb-5 pt-7">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          営業支援一覧
        </Link>
        <p className="section-label mt-5">PRODUCT COMPARISON</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">OXLON 製品比較</h1>
        <p className="mt-2 text-[13px] leading-relaxed text-muted">
          3% · 6% · 9% · After Break を横並びで比較。サロン提案・営業トークの材料に。
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-2">
          {compareProducts.map((p) => (
            <div key={p.slug} className="card-soft overflow-hidden">
              <div className="h-20 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={getDiagramImageUrl(p.diagramType)} alt={p.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-2 text-center">
                <p className="text-[11px] font-bold text-foreground">{p.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {rows.map((row) => (
        <section key={row.key} className="px-5 pb-5">
          <h2 className="text-[13px] font-bold text-foreground">{row.label}</h2>
          <div className="mt-2 space-y-2">
            {compareProducts.map((p) => (
              <div key={p.slug} className="card-soft p-3">
                <p className="text-[10px] font-semibold text-primary">{p.name}</p>
                {row.key === "tagline" && (
                  <p className="mt-1 text-[11px] leading-relaxed text-foreground">{p.tagline}</p>
                )}
                {row.key === "features" && (
                  <ul className="mt-1 space-y-0.5">
                    {p.features.map((f) => (
                      <li key={f} className="text-[10px] text-muted">· {f}</li>
                    ))}
                  </ul>
                )}
                {row.key === "scenes" && (
                  <ul className="mt-1 flex flex-wrap gap-1">
                    {p.scenes.map((s) => (
                      <li key={s} className="rounded-full bg-primary-muted px-2 py-0.5 text-[9px] text-primary">{s}</li>
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

      <section className="px-5 pb-6">
        <div className="card-premium p-4">
          <p className="text-[12px] font-bold text-foreground">営業トークの使い分け</p>
          {compareProducts.map((p) => (
            <div key={p.slug} className="mt-3 border-t border-border pt-3 first:mt-2 first:border-0 first:pt-0">
              <p className="text-[10px] font-semibold text-primary">{p.name}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted">{p.dealerTalk}</p>
            </div>
          ))}
        </div>
        <Link href="/learn/ewr-products" className="mt-4 flex w-full items-center justify-center rounded-2xl bg-primary py-4 text-[14px] font-semibold text-white">
          製品理解Missionを学ぶ
        </Link>
      </section>
    </AppShell>
  );
}