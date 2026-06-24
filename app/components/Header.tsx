"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "アカデミーについて" },
  { href: "#courses", label: "コース" },
  { href: "#features", label: "選ばれる理由" },
  { href: "#contact", label: "お問い合わせ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary shadow-inner md:h-10 md:w-10">
            <span className="text-sm font-bold tracking-tighter text-white md:text-base">
              EW
            </span>
          </div>
          <div className="leading-none">
            <div
              className={`text-sm font-semibold tracking-tight md:text-base ${
                scrolled || menuOpen ? "text-foreground" : "text-white"
              }`}
            >
              EW R Hair Science Academy
            </div>
            <div className="mt-0.5 text-[10px] font-medium tracking-[0.15em] text-primary">
              HAIR SCIENCE ACADEMY
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                scrolled ? "text-foreground/80" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary px-5 py-2.5 text-sm"
          >
            資料請求
          </a>
        </nav>

        <button
          type="button"
          aria-label="メニューを開く"
          className={`flex h-10 w-10 items-center justify-center rounded-xl md:hidden ${
            scrolled || menuOpen
              ? "text-foreground"
              : "text-white"
          }`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white px-5 py-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary mt-2 px-5 py-3 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              資料請求
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}