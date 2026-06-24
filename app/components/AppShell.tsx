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
    <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white shadow-[0_0_0_1px_#e2ebe8] md:my-6 md:min-h-[calc(100dvh-3rem)] md:rounded-[2rem] md:shadow-[0_24px_60px_-20px_rgb(27_122_90/0.15)]">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-white/90 px-5 py-3.5 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
            <span className="text-[10px] font-bold tracking-tight text-white">EW-R</span>
          </div>
          <div className="leading-tight">
            <p className="text-[13px] font-semibold tracking-tight text-foreground">
              Hair Science Academy
            </p>
            <p className="text-[9px] font-medium tracking-[0.12em] text-primary">
              LEARNING PLATFORM
            </p>
          </div>
        </Link>
        <Link
          href="/progress"
          className="rounded-full bg-primary-muted px-2.5 py-1 text-[10px] font-medium text-primary"
        >
          学習中
        </Link>
      </header>

      <div className="bottom-nav-safe">{children}</div>
      <BottomNav active={activeNav} />
    </div>
  );
}