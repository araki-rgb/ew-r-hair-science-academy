export function HeroVisual() {
  return (
    <div className="relative h-[220px] w-full overflow-hidden rounded-[1.5rem]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f5c42] via-[#1b7a5a] to-[#2d9b75]" />
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 400 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0H0V20" fill="none" stroke="white" strokeWidth="0.3" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="400" height="220" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute left-4 top-4 animate-float">
        <div className="rounded-xl bg-white/15 px-2.5 py-1 backdrop-blur-sm">
          <p className="text-[9px] font-semibold tracking-wider text-white/90">HAIR SCIENCE</p>
        </div>
      </div>

      <div className="absolute right-3 top-6 animate-fade-up animate-fade-up-delay-2">
        <svg viewBox="0 0 120 140" className="h-[110px] w-[90px]" aria-hidden>
          <ellipse cx="60" cy="70" rx="28" ry="48" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <ellipse cx="60" cy="70" rx="20" ry="34" fill="rgb(255 255 255 / 0.15)" />
          <ellipse cx="60" cy="70" rx="12" ry="20" fill="rgb(255 255 255 / 0.25)" />
          <ellipse cx="60" cy="70" rx="5" ry="8" fill="white" opacity="0.6" />
          <text x="95" y="45" fill="white" fontSize="7" opacity="0.8">Cuticle</text>
          <text x="95" y="72" fill="white" fontSize="7" opacity="0.8">Cortex</text>
          <text x="95" y="98" fill="white" fontSize="7" opacity="0.8">Medulla</text>
          <line x1="88" y1="42" x2="78" y2="50" stroke="white" strokeWidth="0.8" opacity="0.5" />
          <line x1="88" y1="70" x2="72" y2="70" stroke="white" strokeWidth="0.8" opacity="0.5" />
          <line x1="88" y1="96" x2="72" y2="88" stroke="white" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-end justify-between gap-3">
          <div className="animate-fade-up animate-fade-up-delay-1">
            <svg viewBox="0 0 100 80" className="h-[72px] w-[90px]" aria-hidden>
              <circle cx="25" cy="35" r="14" fill="rgb(255 255 255 / 0.2)" stroke="white" strokeWidth="1" />
              <text x="25" y="39" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">1剤</text>
              <circle cx="75" cy="35" r="14" fill="rgb(255 255 255 / 0.2)" stroke="white" strokeWidth="1" />
              <text x="75" y="39" textAnchor="middle" fill="white" fontSize="8" fontWeight="600">2剤</text>
              <path d="M39 35 L61 35" stroke="white" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.7" />
              <rect x="35" y="55" width="30" height="16" rx="4" fill="rgb(77 184 138 / 0.5)" />
              <text x="50" y="66" textAnchor="middle" fill="white" fontSize="7">反応</text>
            </svg>
          </div>

          <div className="flex-1 animate-fade-up animate-fade-up-delay-3">
            <div className="rounded-xl bg-white/12 p-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20">
                  <svg viewBox="0 0 20 20" fill="white" className="h-3.5 w-3.5">
                    <path d="M4 3h12v2H4V3zm0 5h8v2H4V8zm0 5h10v2H4v-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white">サロン教育モジュール</p>
                  <p className="text-[9px] text-white/70">40+ 問題 · 8カテゴリ · 図解教材</p>
                </div>
              </div>
              <div className="mt-2.5 flex gap-1">
                {[72, 45, 28, 12].map((w, i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full bg-white/20"
                    style={{ opacity: 1 - i * 0.15 }}
                  >
                    <div className="h-full rounded-full bg-white/80" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -left-8 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl" />
      <div className="pointer-events-none absolute -right-4 bottom-0 h-24 w-24 rounded-full bg-white/10 blur-xl" />
    </div>
  );
}