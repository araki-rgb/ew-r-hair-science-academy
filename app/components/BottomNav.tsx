import Link from "next/link";
import { NavIcon } from "./NavIcon";

export type NavKey = "home" | "learn" | "quiz" | "products" | "ai" | "progress";

const navItems: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "learn", label: "Learn", href: "/learn" },
  { key: "quiz", label: "Quiz", href: "/quiz" },
  { key: "products", label: "Prod", href: "/products" },
  { key: "ai", label: "AI", href: "/ai" },
  { key: "progress", label: "Me", href: "/progress" },
];

export function BottomNav({ active }: { active: NavKey }) {
  return (
    <nav className="bottom-nav-bar fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 md:rounded-b-[2rem]">
      <ul className="flex items-center justify-around px-1.5 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`nav-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <NavIcon name={item.key} active={isActive} />
                <span className="nav-item-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}