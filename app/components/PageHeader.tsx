import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  label: string;
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
  backHref?: string;
  backLabel?: string;
};

export function PageHeader({
  label,
  title,
  description,
  badge,
  action,
  backHref,
  backLabel,
}: Props) {
  return (
    <header className="page-header">
      {backHref && (
        <Link href={backHref} className="back-link">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden>
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {backLabel ?? "戻る"}
        </Link>
      )}
      <div className={`flex items-start justify-between gap-3 ${backHref ? "mt-4" : ""}`}>
        <div className="min-w-0 flex-1">
          <p className="section-label">{label}</p>
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-desc">{description}</p>}
        </div>
        {badge && <span className="badge-gold shrink-0">{badge}</span>}
        {action}
      </div>
    </header>
  );
}