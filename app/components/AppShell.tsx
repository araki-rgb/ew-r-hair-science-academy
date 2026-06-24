"use client";

import { useState } from "react";
import { BottomNav, type NavKey } from "./BottomNav";
import { BrandLogo } from "./BrandLogo";
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
      <header className="app-header sticky top-0 z-40 flex items-center justify-between md:rounded-t-[2rem]">
        <Link href="/" className="transition-opacity active:opacity-70">
          <BrandLogo size="md" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="検索"
            className="header-icon-btn"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[17px] w-[17px]">
              <circle cx="8.5" cy="8.5" r="4.5" />
              <path d="M12.5 12.5l4 4" strokeLinecap="round" />
            </svg>
          </button>
          {hydrated && user ? (
            <button
              type="button"
              onClick={() => logout()}
              className="header-user-pill"
              title={user.email}
            >
              {user.name}
            </button>
          ) : (
            <Link href="/login" className="header-user-pill">
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