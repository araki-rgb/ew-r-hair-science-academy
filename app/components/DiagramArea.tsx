import type { DiagramAsset } from "@/lib/types";
import { DiagramIllustration } from "./DiagramIllustration";

type Props = {
  diagram: DiagramAsset;
  size?: "default" | "hero";
  showMeta?: boolean;
};

export function DiagramArea({ diagram, size = "default", showMeta = true }: Props) {
  const isHero = size === "hero";

  return (
    <div className="diagram-education-block">
      <div
        className={`diagram-frame overflow-hidden ${isHero ? "p-6" : "p-4"}`}
      >
        {diagram.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={diagram.imageUrl}
            alt={diagram.alt}
            className={`w-full object-contain ${isHero ? "aspect-[4/3]" : "aspect-[4/3]"}`}
          />
        ) : (
          <div className={isHero ? "aspect-[4/3] w-full" : "aspect-[4/3] w-full"}>
            <DiagramIllustration type={diagram.type} />
          </div>
        )}
      </div>

      {showMeta && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-bold text-foreground">{diagram.title}</p>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                diagram.status === "uploaded"
                  ? "bg-primary text-white"
                  : diagram.status === "generated"
                    ? "bg-accent/20 text-primary"
                    : "bg-primary-muted text-primary"
              }`}
            >
              {diagram.status === "uploaded"
                ? "図解投入済"
                : diagram.status === "generated"
                  ? "AI図解"
                  : "図解準備中"}
            </span>
          </div>
          <p className="text-[10px] leading-relaxed text-muted">{diagram.alt}</p>
          {diagram.status === "placeholder" && (
            <div className="rounded-xl bg-primary-muted/40 px-3 py-2">
              <p className="text-[9px] font-semibold text-primary">Grok生成プロンプト（CMS編集可）</p>
              <p className="mt-1 line-clamp-2 text-[9px] leading-relaxed text-muted">
                {diagram.grokPrompt}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}