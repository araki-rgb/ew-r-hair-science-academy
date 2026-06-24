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
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="h-[18px] w-[18px]">
        {active ? <path d="M12 3l9 8h-2v10h-5v-6H10v6H5V11H3l9-8z" /> : <path d="M4 11.5L12 4l8 7.5M6 10.5V20h4v-5h4v5h4v-9.5" strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
    ),
  },
  {
    key: "learn",
    label: "Learn",
    href: "/learn",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.75} className="h-[18px] w-[18px]">
        {active ? <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /> : <><path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" /></>}
      </svg>
    ),
  },
  {
    key: "quiz",
    label: "Quiz",
    href: "/quiz",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[18px] w-[18px]">
        <circle cx="12" cy="12" r="9" fill={active ? "currentColor" : "none"} opacity={active ? 0.12 : 1} />
        <path d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4" strokeLinecap="round" />
        <circle cx="12" cy="17" r="0.75" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "products",
    label: "Prod",
    href: "/products",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[18px] w-[18px]">
        <path d="M8 6h8l1 14H7L8 6z" strokeLinecap="round" strokeLinejoin="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.12 : 1} />
        <path d="M10 6V4a2 2 0 014 0v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "ai",
    label: "AI",
    href: "/ai",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[18px] w-[18px]">
        <path d="M12 2a4 4 0 014 4v1a4 4 0 01-8 0V6a4 4 0 014-4z" strokeLinecap="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.12 : 1} />
        <rect x="5" y="11" width="14" height="10" rx="3" />
      </svg>
    ),
  },
  {
    key: "progress",
    label: "Me",
    href: "/progress",
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-[18px] w-[18px]">
        <circle cx="12" cy="8" r="4" fill={active ? "currentColor" : "none"} opacity={active ? 0.15 : 1} />
        <path d="M5 20c0-4 3.5-7 7-7s7 3 7 7" strokeLinecap="round" fill={active ? "currentColor" : "none"} opacity={active ? 0.1 : 1} />
      </svg>
    ),
  },
];

export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-border/70 bg-white/92 px-2 pb-[env(safe-area-inset-bottom,0px)] pt-1.5 backdrop-blur-xl md:rounded-b-[2rem]">
      <ul className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.icon(isActive)}
                <span className="text-[9px] font-semibold">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}