export function CategoryIcon({ type, className = "h-6 w-6" }: { type: string; className?: string }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, className };
  switch (type) {
    case "hair":
      return <svg {...props}><ellipse cx="12" cy="14" rx="5" ry="7" /><path d="M7 10 Q12 4 17 10" strokeLinecap="round" /></svg>;
    case "scalp":
      return <svg {...props}><path d="M4 14c2-4 6-6 8-6s6 2 8 6" strokeLinecap="round" /></svg>;
    case "color":
      return <svg {...props}><circle cx="8" cy="10" r="3" /><circle cx="16" cy="10" r="3" /><circle cx="12" cy="16" r="3" /></svg>;
    case "developer":
      return <svg {...props}><path d="M9 3v6l-4 10h14L15 9V3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "treatment":
      return <svg {...props}><rect x="7" y="4" width="10" height="16" rx="2" /><path d="M10 8h4" strokeLinecap="round" /></svg>;
    case "product":
      return <svg {...props}><path d="M4 7h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" strokeLinejoin="round" /><path d="M4 7l2-4h12l2 4" strokeLinecap="round" /></svg>;
    case "sales":
      return <svg {...props}><path d="M4 18V8l8-4 8 4v10" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "customer":
      return <svg {...props}><path d="M4 6h16v10a2 2 0 01-2 2H8l-4 3V6z" strokeLinejoin="round" /></svg>;
    default:
      return <svg {...props}><circle cx="12" cy="12" r="8" /></svg>;
  }
}