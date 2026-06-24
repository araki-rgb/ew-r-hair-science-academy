import Link from "next/link";

export function ComplianceFooter() {
  return (
    <footer className="border-t border-border px-[var(--page-x)] py-6 text-center">
      <p className="text-[9px] leading-relaxed text-muted">
        ※ 本プラットフォームの内容は施術設計・ケア提案の教育目的です。効能効果の断定表現は使用していません。
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <Link href="/help" className="btn-ghost text-[10px]">ヘルプ</Link>
        <Link href="/enterprise" className="btn-ghost text-[10px]">企業向け価値</Link>
        <Link href="/glossary" className="btn-ghost text-[10px]">用語集</Link>
        <Link href="/sales-toolkit" className="btn-ghost text-[10px]">営業ツール</Link>
      </div>
      <p className="mt-3 text-[8px] text-muted">© 2026 EW-R株式会社</p>
    </footer>
  );
}