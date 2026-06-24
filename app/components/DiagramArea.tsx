import type { DiagramAsset } from "@/lib/types";
import { DiagramIllustration } from "./DiagramIllustration";

type Props = {
  diagram: DiagramAsset;
  size?: "default" | "hero";
  showMeta?: boolean;
};

function diagramBadge(status: DiagramAsset["status"]) {
  if (status === "uploaded") return "badge-primary";
  if (status === "generated") return "badge-muted";
  return "badge-gold";
}

function diagramBadgeLabel(status: DiagramAsset["status"]) {
  if (status === "uploaded") return "図解投入済";
  if (status === "generated") return "AI図解";
  return "図解準備中";
}

export function DiagramArea({ diagram, size = "default", showMeta = true }: Props) {
  const isHero = size === "hero";

  return (
    <div className="diagram-education-block">
      <div className={`diagram-frame overflow-hidden ${isHero ? "p-5" : "p-4"}`}>
        {diagram.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={diagram.imageUrl}
            alt={diagram.alt}
            className="aspect-[4/3] w-full object-contain"
          />
        ) : (
          <div className="aspect-[4/3] w-full">
            <DiagramIllustration type={diagram.type} />
          </div>
        )}
      </div>

      {showMeta && (
        <div className="diagram-meta space-y-2">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-bold tracking-tight text-foreground">{diagram.title}</p>
            <span className={`shrink-0 ${diagramBadge(diagram.status)}`}>
              {diagramBadgeLabel(diagram.status)}
            </span>
          </div>
          <p className="text-[10px] leading-relaxed text-muted">{diagram.alt}</p>
          {diagram.status === "placeholder" && (
            <div className="platform-pillar px-3 py-2.5">
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