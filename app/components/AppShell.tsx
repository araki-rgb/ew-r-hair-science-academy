"use client";

import { useState } from "react";
import { BottomNav, type NavKey } from "./BottomNav";
import { SearchModal } from "./SearchModal";
import Link from "next/link";

export function AppShell({
  activeNav,
  children,
}: {
  activeNav: NavKey;
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white shadow-[0_0_0_1px_#dce8e3] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:shadow-[0_28px_64px_-24px_rgb(27_122_90/0.2)]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-white">
        メインコンテンツへスキップ
      </a>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/80 bg-white/92 px-5 py-3.5 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-[0_4px_12px_-2px_rgb(27_122_90/0.4)]">
            <span className="text-[10px] font-bold tracking-tight text-white">EW-R</span>
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold tracking-tight text-foreground">Hair Science Academy</p>
            <p className="text-[9px] font-medium tracking-[0.14em] text-primary">LEARNING PLATFORM</p>
          </div>
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="検索"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-muted text-primary"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          <Link
            href="/progress"
            className="flex items-center gap-1.5 rounded-full bg-primary-muted px-3 py-1.5 text-[10px] font-semibold text-primary transition active:bg-primary active:text-white"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            学習中
          </Link>
        </div>
      </header>

      <div id="main-content" className="bottom-nav-safe">{children}</div>
      <BottomNav active={activeNav} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}