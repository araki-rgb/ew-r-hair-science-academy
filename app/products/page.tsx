import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { DiagramIllustration } from "@/app/components/DiagramIllustration";
import { products } from "@/lib/data/products";

export default function ProductsPage() {
  return (
    <AppShell activeNav="products">
      <section className="px-5 pb-6 pt-7">
        <p className="text-[10px] font-semibold tracking-[0.2em] text-primary">EW-R PRODUCTS</p>
        <h1 className="mt-2 text-[28px] font-bold tracking-tight text-foreground">Products</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-muted">
          EW-R製品の特徴と提案シーンを学び、サロン提案の幅を広げます。
        </p>
      </section>

      <section className="px-5 pb-5">
        <div className="card-soft border-primary/20 bg-gradient-to-br from-primary-muted/50 to-white p-4">
          <p className="text-[11px] leading-relaxed text-muted">
            ※ 効能効果を断定する表現は使用していません。施術設計・ケア提案の観点でご活用ください。
          </p>
        </div>
      </section>

      <section className="px-5 pb-6 space-y-4">
        {products.map((product) => (
          <Link key={product.slug} href={`/products/${product.slug}`} className="card-soft block overflow-hidden transition active:scale-[0.99]">
            <div className="diagram-placeholder p-4">
              <div className="aspect-[2/1] w-full">
                <DiagramIllustration type={product.diagramType} />
              </div>
            </div>
            <div className="p-4">
              <span className="text-[10px] font-semibold tracking-wider text-primary">{product.category}</span>
              <h2 className="mt-1 text-[17px] font-bold text-foreground">{product.name}</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{product.tagline}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {product.scenes.slice(0, 2).map((scene) => (
                  <li key={scene} className="rounded-full bg-primary-muted px-2.5 py-0.5 text-[10px] text-primary">
                    {scene}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] font-semibold text-primary">詳細を見る →</p>
            </div>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}