export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary">
                <span className="text-sm font-bold text-white">EW</span>
              </div>
              <div>
                <div className="text-sm font-semibold">
                  EW R Hair Science Academy
                </div>
                <div className="text-[10px] tracking-[0.15em] text-primary">
                  HAIR SCIENCE ACADEMY
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              髪と頭皮の科学を、サロン現場で再現できる技術へ。
              美容師のキャリアを、知識と実践で支える教育機関です。
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-primary">
              PROGRAMS
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>ヘアサイエンス基礎</li>
              <li>頭皮ケアスペシャリスト</li>
              <li>カラーサイエンス実践</li>
              <li>サロン経営・接客</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] text-primary">
              CONTACT
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>info@ewr-academy.jp</li>
              <li>03-0000-0000</li>
              <li>東京都渋谷区（開講予定）</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 EW R Hair Science Academy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/80">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-white/80">
              特定商取引法に基づく表記
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}