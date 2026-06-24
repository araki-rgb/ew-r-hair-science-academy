import Link from "next/link";

export type NavKey = "home" | "learn" | "quiz" | "products" | "ai" | "progress";

const navItems: {
  key: NavKey;
  label: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
}[] = [
  {
    key: "home",
    label: "Home",
    href: "/",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2} className="h-[18px] w-[18px]">
        {active ? <path d="M12 3l9 8h-2v10h-5v-6H10v6H5V11H3l9-8z" /> : <path d="M4 11.5L12 4l8 7.5M6 10.5V20h4v-5h4v5h4v-9.5" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    ),
  },
  {
    key: "learn",
    label: "Learn",
    href: "/learn",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 2} className="h-[18px] w-[18px]">
        {active ? <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /> : <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" /></>}
      </svg>
    ),
  },
  {
    key: "quiz",
    label: "Quiz",
    href: "/quiz",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="9" fill={active ? "currentColor" : "none"} opacity={active ? 0.15 : 1} />
        <path d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4" strokeLinecap="round" stroke={active ? "currentColor" : "currentColor"} />
        <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "products",
    label: "Prod",
    href: "/products",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
        <path d="M8 6h8l1 14H7L8 6z" strokeLinecap="round" strokeLinejoin="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.15 : 1} />
        <path d="M10 6V4a2 2 0 014 0v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "ai",
    label: "AI",
    href: "/ai",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
        <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.15 : 1} />
        <rect x="5" y="11" width="14" height="10" rx="3" />
        <circle cx="9" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "progress",
    label: "Me",
    href: "/progress",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[18px] w-[18px]">
        <circle cx="12" cy="8" r="4" fill={active ? "currentColor" : "none"} opacity={active ? 0.2 : 1} />
        <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" strokeLinecap="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.15 : 1} />
      </svg>
    ),
  },
];

export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border bg-white/95 px-1 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-lg md:rounded-b-[2rem]">
      <ul className="flex items-center justify-around py-1.5">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-1.5 py-1 transition ${isActive ? "text-primary" : "text-muted"}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon(isActive)}
                <span className="text-[9px] font-medium">{item.label}</span>
                {isActive && <span className="h-0.5 w-3.5 rounded-full bg-primary" />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}