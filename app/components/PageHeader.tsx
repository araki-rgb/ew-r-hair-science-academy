import type { ReactNode } from "react";

type Props = {
  label: string;
  title: string;
  description?: string;
  badge?: string;
  action?: ReactNode;
};

export function PageHeader({ label, title, description, badge, action }: Props) {
  return (
    <header className="page-header">
      <div className="flex items-start justify-between gap-3">
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