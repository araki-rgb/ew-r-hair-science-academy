"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandMark } from "./BrandLogo";
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
    <div className="search-modal-overlay animate-fade-in" onClick={onClose} role="presentation">
      <div
        className="search-modal-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="検索"
      >
        <div className="border-b border-border-subtle px-4 pb-3 pt-4">
          <div className="mb-3 flex items-center gap-2.5">
            <BrandMark size="sm" />
            <div>
              <p className="text-[11px] font-bold text-foreground">クイック検索</p>
              <p className="text-[9px] text-muted">Mission · 製品 · 用語</p>
            </div>
          </div>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="キーワードを入力..."
            className="input-field"
          />
        </div>
        <div className="max-h-[min(60vh,28rem)] overflow-y-auto px-4 py-3 scrollbar-hide">
          {!query.trim() && (
            <p className="py-6 text-center text-[12px] text-muted">キーワードを入力してください</p>
          )}
          {query.trim() && !hasResults && (
            <p className="py-6 text-center text-[12px] text-muted">該当する結果がありません</p>
          )}
          {results.lessons.length > 0 && (
            <div className="mb-4">
              <p className="section-label">MISSION</p>
              <div className="mt-2 space-y-2">
                {results.lessons.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/learn/${l.slug}`}
                    onClick={handleSelect}
                    className="search-result-item"
                  >
                    <p className="text-[13px] font-semibold text-foreground">{l.title}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{l.description.slice(0, 48)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.products.length > 0 && (
            <div className="mb-4">
              <p className="section-label">PRODUCTS</p>
              <div className="mt-2 space-y-2">
                {results.products.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    onClick={handleSelect}
                    className="search-result-item"
                  >
                    <p className="text-[13px] font-semibold text-foreground">{p.name}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{p.tagline}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {results.terms.length > 0 && (
            <div className="pb-2">
              <p className="section-label">GLOSSARY</p>
              <div className="mt-2 space-y-2">
                {results.terms.map((t) => (
                  <Link
                    key={t.term}
                    href="/glossary"
                    onClick={handleSelect}
                    className="search-result-item"
                  >
                    <p className="text-[13px] font-semibold text-foreground">{t.term}</p>
                    <p className="mt-0.5 text-[10px] text-muted">{t.definition.slice(0, 52)}…</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border-subtle px-4 py-3">
          <button type="button" onClick={onClose} className="btn-secondary">
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}