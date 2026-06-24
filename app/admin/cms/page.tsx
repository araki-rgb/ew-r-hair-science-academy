"use client";

import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/app/components/AppShell";
import { AdminGate } from "@/app/components/AdminGate";
import { CMS_ENTITIES } from "@/lib/cms/schema";
import { diagramGallery } from "@/lib/content/diagram-images";
import { lessons } from "@/lib/data/lessons";
import { products } from "@/lib/data/products";
import { aiPrompts } from "@/lib/data/ai-prompts";

type Tab = "lessons" | "products" | "diagrams" | "ai";

export default function CMSPage() {
  const [tab, setTab] = useState<Tab>("lessons");

  return (
    <AppShell activeNav="progress">
      <AdminGate>
      <section className="px-5 pb-4 pt-7">
        <Link href="/admin" className="text-[13px] font-medium text-primary">← 管理画面</Link>
        <p className="section-label mt-4">CONTENT MANAGEMENT</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">CMS</h1>
        <p className="mt-2 text-[12px] text-muted">
          教材・製品・図解・AI回答の管理（デモ）。本番ではDB/APIと接続。
        </p>
      </section>

      <section className="px-5 pb-4">
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-primary-muted/50 p-1">
          {([
            ["lessons", "Mission"],
            ["products", "製品"],
            ["diagrams", "図解"],
            ["ai", "AI"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`shrink-0 rounded-xl px-4 py-2 text-[12px] font-semibold ${
                tab === key ? "bg-primary text-white" : "text-muted"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6">
        {tab === "lessons" && (
          <div className="space-y-2">
            {lessons.map((l) => (
              <div key={l.slug} className="card-soft p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-bold">Mission {l.missionNumber}: {l.title}</p>
                    <p className="text-[10px] text-muted">{l.questions.length}問 · +{l.xpReward} XP</p>
                  </div>
                  <Link href={`/learn/${l.slug}`} className="text-[11px] font-semibold text-primary">編集プレビュー →</Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.slug} className="card-soft p-4">
                <p className="text-[13px] font-bold">{p.name}</p>
                <p className="text-[10px] text-muted">{p.faq.length} FAQ · {p.relatedLessons.length} 関連Mission</p>
                <Link href={`/products/${p.slug}`} className="mt-2 inline-flex text-[11px] font-semibold text-primary">詳細 →</Link>
              </div>
            ))}
          </div>
        )}

        {tab === "diagrams" && (
          <div className="grid grid-cols-2 gap-2">
            {diagramGallery.map(({ type, url }) => (
              <div key={type} className="card-soft overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt={type} className="h-24 w-full object-cover" />
                <p className="p-2 text-[10px] font-semibold">{type}</p>
              </div>
            ))}
          </div>
        )}

        {tab === "ai" && (
          <div className="space-y-2">
            {aiPrompts.map((p) => (
              <div key={p.id} className="card-soft p-4">
                <p className="text-[12px] font-bold">{p.question}</p>
                <p className="mt-1 text-[10px] text-muted">{p.category} · {p.consultationMode}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 rounded-xl bg-primary-muted/40 p-3">
          <p className="text-[10px] text-muted">
            エンティティ: {CMS_ENTITIES.join(" · ")} — lib/data/ と lib/content/ に分離済み
          </p>
        </div>
      </section>
      </AdminGate>
    </AppShell>
  );
}