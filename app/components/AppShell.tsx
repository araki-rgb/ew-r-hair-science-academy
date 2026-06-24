import { BottomNav, type NavKey } from "./BottomNav";
import Link from "next/link";

export function AppShell({
  activeNav,
  children,
}: {
  activeNav: NavKey;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white shadow-[0_0_0_1px_#dce8e3] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:shadow-[0_28px_64px_-24px_rgb(27_122_90/0.2)]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/80 bg-white/92 px-5 py-3.5 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark shadow-[0_4px_12px_-2px_rgb(27_122_90/0.4)]">
            <span className="text-[10px] font-bold tracking-tight text-white">EW-R</span>
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold tracking-tight text-foreground">
              Hair Science Academy
            </p>
            <p className="text-[9px] font-medium tracking-[0.14em] text-primary">
              LEARNING PLATFORM
            </p>
          </div>
        </Link>
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
      </header>

      <div className="bottom-nav-safe">{children}</div>
      <BottomNav active={activeNav} />
    </div>
  );
}