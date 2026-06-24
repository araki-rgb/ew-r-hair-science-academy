const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.65,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CategoryIcon({ type, className = "h-6 w-6" }: { type: string; className?: string }) {
  const props = { ...stroke, className };
  switch (type) {
    case "hair":
      return (
        <svg {...props}>
          <path d="M12 5c-4 0-7 3-7 7.5 0 3 1.5 5.5 4 7" />
          <path d="M12 5c4 0 7 3 7 7.5 0 3-1.5 5.5-4 7" />
          <ellipse cx="12" cy="16" rx="4" ry="5.5" />
        </svg>
      );
    case "scalp":
      return (
        <svg {...props}>
          <path d="M5 14c2.5-5 6.5-7 7-7s4.5 2 7 7" />
          <path d="M8 14.5c1.5-2.5 4-3.5 4-3.5s2.5 1 4 3.5" opacity="0.55" />
        </svg>
      );
    case "color":
      return (
        <svg {...props}>
          <circle cx="8.5" cy="10" r="2.8" />
          <circle cx="15.5" cy="10" r="2.8" />
          <circle cx="12" cy="16" r="2.8" />
          <path d="M10.5 11.5l1.5 3M13.5 11.5l-1.5 3" opacity="0.45" />
        </svg>
      );
    case "developer":
      return (
        <svg {...props}>
          <path d="M10 3.5v5.5L6 18.5h12l-4-9.5V3.5" />
          <path d="M10 9h4" opacity="0.5" />
          <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "treatment":
      return (
        <svg {...props}>
          <rect x="7.5" y="4" width="9" height="16" rx="2.2" />
          <path d="M10.5 8.5h3M10.5 12h3" opacity="0.55" />
        </svg>
      );
    case "product":
      return (
        <svg {...props}>
          <path d="M5 8h14v11a2 2 0 01-2 2H7a2 2 0 01-2-2V8z" />
          <path d="M5 8l2.2-3.5h9.6L19 8" />
          <path d="M9.5 12h5" opacity="0.55" />
        </svg>
      );
    case "sales":
      return (
        <svg {...props}>
          <path d="M4.5 18V9l7.5-4 7.5 4v9" />
          <path d="M9 18v-5h6v5" opacity="0.55" />
        </svg>
      );
    case "customer":
      return (
        <svg {...props}>
          <path d="M4.5 6.5h15v9.5a2 2 0 01-2 2H9l-4.5 3.5V6.5z" />
          <path d="M8.5 10.5h7M8.5 13.5h4.5" opacity="0.55" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="7.5" />
        </svg>
      );
  }
}