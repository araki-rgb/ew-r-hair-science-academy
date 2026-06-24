type Size = "sm" | "md" | "lg";

const markSize: Record<Size, number> = { sm: 32, md: 36, lg: 48 };

export function BrandMark({ size = "md", className = "" }: { size?: Size; className?: string }) {
  const px = markSize[size];
  return (
    <div
      className={`brand-mark shrink-0 ${className}`}
      style={{ width: px, height: px }}
      aria-hidden
    >
      <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="brand-bg" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2d9b75" />
            <stop offset="0.55" stopColor="#1a7556" />
            <stop offset="1" stopColor="#0e4d38" />
          </linearGradient>
          <linearGradient id="brand-strand" x1="14" y1="10" x2="34" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.72" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#brand-bg)" />
        <rect x="2.5" y="2.5" width="43" height="43" rx="12.5" stroke="rgb(255 255 255 / 0.18)" strokeWidth="1" />
        {/* Hair strand — cuticle layers */}
        <path
          d="M24 8c-6 0-10 4.5-10 10.5 0 4 2 7.5 5 9.5-2.5 1.5-4 4-4 7 0 5 4 9 9 9s9-4 9-9c0-3-1.5-5.5-4-7 3-2 5-5.5 5-9.5C34 12.5 30 8 24 8z"
          fill="url(#brand-strand)"
          fillOpacity="0.22"
        />
        <path
          d="M24 11c-4.5 0-7.5 3.2-7.5 7.8 0 3.2 1.6 6 4 7.6-2 1.2-3.2 3.4-3.2 6 0 4.2 3.2 7.4 6.7 7.4s6.7-3.2 6.7-7.4c0-2.6-1.2-4.8-3.2-6 2.4-1.6 4-4.4 4-7.6C31.5 14.2 28.5 11 24 11z"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Science node */}
        <circle cx="24" cy="22" r="2.25" fill="white" fillOpacity="0.9" />
        <circle cx="32" cy="30" r="1.5" fill="white" fillOpacity="0.55" />
        <path d="M25.5 23.2l5.8 5.5" stroke="white" strokeWidth="0.75" strokeOpacity="0.45" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function BrandLogo({
  size = "md",
  showWordmark = true,
  variant = "default",
}: {
  size?: Size;
  showWordmark?: boolean;
  variant?: "default" | "inverse";
}) {
  const titleClass = variant === "inverse" ? "text-white" : "text-foreground";
  const subClass = variant === "inverse" ? "text-white/70" : "text-primary";

  return (
    <div className="flex items-center gap-2.5">
      <BrandMark size={size} className="brand-mark-glow" />
      {showWordmark && (
        <div className="min-w-0 leading-tight">
          <p className={`text-[12px] font-semibold tracking-[-0.02em] ${titleClass}`}>
            Hair Science Academy
          </p>
          <p className={`text-[8px] font-semibold tracking-[0.2em] ${subClass}`}>
            EW-R LEARNING
          </p>
        </div>
      )}
    </div>
  );
}