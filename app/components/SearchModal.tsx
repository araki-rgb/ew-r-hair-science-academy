"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { lessons } from "@/lib/data/lessons";
import { products } from "@/lib/data/products";
import { glossaryTerms } from "@/lib/data/glossary";
import { trackEvent } from "@/lib/analytics/events";

type Props = { open: boolean; onClose: () => void };

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { lessons: [], products: [], terms: [] };
    return {
      lessons: lessons.filter((l) => l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)).slice(0, 4),
      products: products.filter((p) => p.name.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)).slice(0, 4),
      terms: glossaryTerms.filter((t) => t.term.includes(q) || t.definition.includes(q)).slice(0, 4),
    };
  }, [query]);

  const hasResults = results.lessons.length + results.products.length + results.terms.length > 0;

  if (!open) return null;

  const handleSelect = () => {
    if (query.trim()) trackEvent("search", { query: query.trim() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center bg-black/40 px-4 pt-16 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-[400px] animate-scale-in rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-border p-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mission・製品・用語を検索..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-[14px] outline-none focus:border-primary"
          />
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {!query.trim() && (
            <p className="text-center text-[12px] text-muted">キーワードを入力してください</p>
          )}
          {query.trim() && !hasResults && (
            <p className="text-center text-[12px] text-muted">該当する結果がありません</p>
          )}
          {results.lessons.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-muted">MISSION</p>
              {results.lessons.map((l) => (
                <Link key={l.slug} href={`/learn/${l.slug}`} onClick={handleSelect} className="mt-2 block rounded-xl bg-primary-muted/40 px-3 py-2.5">
                  <p className="text-[13px] font-semibold">{l.title}</p>
                  <p className="text-[10px] text-muted">{l.description.slice(0, 40)}…</p>
                </Link>
              ))}
            </div>
          )}
          {results.products.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold text-muted">製品</p>
              {results.products.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} onClick={handleSelect} className="mt-2 block rounded-xl bg-primary-muted/40 px-3 py-2.5">
                  <p className="text-[13px] font-semibold">{p.name}</p>
                  <p className="text-[10px] text-muted">{p.tagline}</p>
                </Link>
              ))}
            </div>
          )}
          {results.terms.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-muted">用語</p>
              {results.terms.map((t) => (
                <Link key={t.term} href="/glossary" onClick={handleSelect} className="mt-2 block rounded-xl bg-primary-muted/40 px-3 py-2.5">
                  <p className="text-[13px] font-semibold">{t.term}</p>
                  <p className="text-[10px] text-muted">{t.definition.slice(0, 50)}…</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}