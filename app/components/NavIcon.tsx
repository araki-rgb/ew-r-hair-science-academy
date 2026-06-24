import type { NavKey } from "./BottomNav";

type Props = {
  name: NavKey;
  active?: boolean;
  className?: string;
};

const base = "h-[22px] w-[22px]";

export function NavIcon({ name, active = false, className = "" }: Props) {
  const cls = `${base} ${className}`;
  const stroke = active ? 2 : 1.65;
  const color = active ? "var(--primary)" : "var(--muted-light)";

  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path
            d="M4 11.2L12 4l8 7.2"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 10.5V19.5h4v-5h3v5h4V10.5"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={active ? "var(--primary-muted)" : "none"}
          />
        </svg>
      );
    case "learn":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path
            d="M6.5 3.5H19a1.5 1.5 0 011.5 1.5v15.5H7.5A2.5 2.5 0 015 18V6a2.5 2.5 0 012.5-2.5z"
            stroke={color}
            strokeWidth={stroke}
            strokeLinejoin="round"
            fill={active ? "var(--primary-muted)" : "none"}
          />
          <path d="M8 7h8M8 11h6M8 15h4" stroke={color} strokeWidth={stroke * 0.85} strokeLinecap="round" opacity={active ? 1 : 0.7} />
        </svg>
      );
    case "quiz":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth={stroke} fill={active ? "var(--primary-muted)" : "none"} />
          <path d="M9.2 9.2a2.8 2.8 0 115.2.4c-.8.8-2 .9-2 2.4" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
          <circle cx="12" cy="16.8" r="0.9" fill={color} />
        </svg>
      );
    case "products":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path
            d="M8.5 7h7l1.2 12H7.3L8.5 7z"
            stroke={color}
            strokeWidth={stroke}
            strokeLinejoin="round"
            fill={active ? "var(--primary-muted)" : "none"}
          />
          <path d="M10 7V5.2a2 2 0 014 0V7" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
          <path d="M10.5 11h3M10.5 14.5h5" stroke={color} strokeWidth={stroke * 0.85} strokeLinecap="round" opacity={0.75} />
        </svg>
      );
    case "ai":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <path
            d="M12 2.5a3.5 3.5 0 013.5 3.5V7a3.5 3.5 0 01-7 0V6A3.5 3.5 0 0112 2.5z"
            stroke={color}
            strokeWidth={stroke}
            fill={active ? "var(--primary-muted)" : "none"}
          />
          <rect x="5.5" y="10.5" width="13" height="9.5" rx="3" stroke={color} strokeWidth={stroke} fill={active ? "var(--primary-muted)" : "none"} />
          <path d="M9.5 15h5" stroke={color} strokeWidth={stroke * 0.85} strokeLinecap="round" opacity={0.7} />
        </svg>
      );
    case "progress":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
          <circle cx="12" cy="8.5" r="3.5" stroke={color} strokeWidth={stroke} fill={active ? "var(--primary-muted)" : "none"} />
          <path
            d="M5.5 19.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill={active ? "var(--primary-muted)" : "none"}
            fillOpacity={0.5}
          />
        </svg>
      );
    default:
      return null;
  }
}