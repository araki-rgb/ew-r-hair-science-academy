"use client";

import { useState } from "react";
import { BottomNav, type NavKey } from "./BottomNav";
import { SearchModal } from "./SearchModal";
import Link from "next/link";
import { useAuth } from "@/app/hooks/useAuth";

export function AppShell({
  activeNav,
  children,
}: {
  activeNav: NavKey;
  children: React.ReactNode;
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, hydrated, logout } = useAuth();

  return (
    <div className="shell-device mx-auto min-h-dvh w-full max-w-[430px]">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-3 focus:py-2 focus:text-white">
        メインコンテンツへスキップ
      </a>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-white/90 px-5 py-3 backdrop-blur-xl md:rounded-t-[2rem]">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] bg-gradient-to-br from-primary to-primary-dark shadow-[0_4px_14px_-4px_rgb(26_117_86/0.5)]">
            <span className="text-[9px] font-bold tracking-tight text-white">EW-R</span>
          </div>
          <div className="leading-tight">
            <p className="text-[12px] font-semibold tracking-tight text-foreground">Hair Science Academy</p>
            <p className="text-[8px] font-medium tracking-[0.16em] text-primary">LEARNING PLATFORM</p>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="検索"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white text-primary shadow-[var(--shadow-xs)] transition active:scale-95"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
          {hydrated && user ? (
            <button
              type="button"
              onClick={() => logout()}
              className="max-w-[5.5rem] truncate rounded-full border border-primary/15 bg-primary-muted px-3 py-1.5 text-[10px] font-semibold text-primary"
              title={user.email}
            >
              {user.name}
            </button>
          ) : (
            <Link href="/login" className="rounded-full border border-primary/15 bg-primary-muted px-3 py-1.5 text-[10px] font-semibold text-primary">
              ログイン
            </Link>
          )}
        </div>
      </header>

      <div id="main-content" className="bottom-nav-safe">{children}</div>
      <BottomNav active={activeNav} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}