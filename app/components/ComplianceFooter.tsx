import Link from "next/link";

export function ComplianceFooter() {
  return (
    <footer className="border-t border-border px-5 py-6 text-center">
      <p className="text-[9px] leading-relaxed text-muted">
        ※ 本プラットフォームの内容は施術設計・ケア提案の教育目的です。効能効果の断定表現は使用していません。
      </p>
      <div className="mt-3 flex flex-wrap justify-center gap-3">
        <Link href="/help" className="text-[10px] font-semibold text-primary">ヘルプ</Link>
        <Link href="/enterprise" className="text-[10px] font-semibold text-primary">企業向け価値</Link>
        <Link href="/glossary" className="text-[10px] font-semibold text-primary">用語集</Link>
        <Link href="/sales-toolkit" className="text-[10px] font-semibold text-primary">営業ツール</Link>
      </div>
      <p className="mt-3 text-[8px] text-muted">© 2026 EW-R株式会社 · v0.2.0-demo</p>
    </footer>
  );
}