import { BrandMark } from "./BrandLogo";

const stats = [
  { value: "8", label: "Missions" },
  { value: "16", label: "図解" },
  { value: "40+", label: "問題" },
];

export function HeroVisual() {
  return (
    <div className="hero-stage relative w-full overflow-hidden">
      {/* Ambient layers */}
      <div className="hero-mesh absolute inset-0" />
      <div className="hero-noise absolute inset-0 opacity-[0.35]" aria-hidden />
      <div className="hero-orb hero-orb-a absolute" aria-hidden />
      <div className="hero-orb hero-orb-b absolute" aria-hidden />

      {/* Top brand row */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-4">
        <div className="hero-glass-pill animate-fade-up flex items-center gap-2 px-3 py-1.5">
          <BrandMark size="sm" />
          <div>
            <p className="text-[8px] font-bold tracking-[0.22em] text-white/85">EW-R ACADEMY</p>
            <p className="text-[9px] font-medium text-white/60">Hair Science Platform</p>
          </div>
        </div>
        <div className="hero-glass-pill animate-fade-up animate-fade-up-delay-1 px-2.5 py-1">
          <p className="text-[8px] font-semibold tracking-wider text-white/80">ENTERPRISE</p>
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 px-4 pt-5">
        <p className="animate-fade-up text-display-inverse text-[22px] leading-[1.2]">
          現場の知識を、
          <br />
          <span className="text-white/90">科学的に。</span>
        </p>
        <div className="animate-fade-up animate-fade-up-delay-2 mt-4 flex gap-2">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat-pill flex-1 px-2.5 py-2 text-center">
              <p className="text-[15px] font-bold tracking-tight text-white">{s.value}</p>
              <p className="text-[8px] font-medium tracking-wide text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hair cross-section illustration */}
      <div className="pointer-events-none absolute right-2 top-[52%] z-[1] -translate-y-1/2 animate-hero-drift" aria-hidden>
        <svg viewBox="0 0 130 160" className="h-[130px] w-[100px]">
          <defs>
            <linearGradient id="hero-strand" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="white" stopOpacity="0.35" />
              <stop offset="1" stopColor="white" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <ellipse cx="52" cy="80" rx="30" ry="52" fill="url(#hero-strand)" />
          <ellipse cx="52" cy="80" rx="22" ry="38" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.25" />
          <ellipse cx="52" cy="80" rx="14" ry="24" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
          <ellipse cx="52" cy="80" rx="6" ry="10" fill="white" fillOpacity="0.5" />
          {[
            { y: 52, label: "Cuticle" },
            { y: 80, label: "Cortex" },
            { y: 106, label: "Medulla" },
          ].map(({ y, label }) => (
            <g key={label}>
              <line x1="82" y1={y} x2="72" y2={y} stroke="white" strokeWidth="0.6" strokeOpacity="0.35" />
              <text x="86" y={y + 3} fill="white" fontSize="7" fontWeight="500" opacity="0.65">
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom glass panel */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
        <div className="hero-glass-panel animate-fade-up animate-fade-up-delay-3">
          <div className="flex items-center gap-3">
            <div className="hero-progress-ring shrink-0" aria-hidden>
              <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(255 255 255 / 0.15)" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="14" fill="none" stroke="white" strokeWidth="2.5"
                  strokeDasharray="62 88" strokeLinecap="round"
                  className="hero-ring-fill"
                />
              </svg>
              <span className="absolute text-[8px] font-bold text-white">68%</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-white">学習を続ける</p>
              <p className="text-[9px] text-white/60">Mission · 図解 · AI先生 · 営業支援</p>
              <div className="mt-2 flex gap-1">
                {[88, 62, 40, 18].map((w, i) => (
                  <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
                    <div
                      className="h-full rounded-full bg-white/85 transition-all"
                      style={{ width: `${w}%`, opacity: 1 - i * 0.12 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}