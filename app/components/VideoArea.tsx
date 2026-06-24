import type { VideoAsset } from "@/lib/types";

type Props = {
  video: VideoAsset;
  compact?: boolean;
};

export function VideoArea({ video, compact = false }: Props) {
  if (video.status === "ready" && video.url) {
    return (
      <div className="video-education-block overflow-hidden rounded-2xl">
        <video
          src={video.url}
          poster={video.thumbnailUrl ?? undefined}
          controls
          className="aspect-video w-full bg-black"
        />
        <div className="border-t border-border bg-white px-4 py-3">
          <p className="text-[12px] font-bold text-foreground">{video.title}</p>
          {video.duration && (
            <p className="mt-0.5 text-[10px] text-muted">{video.duration}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`video-placeholder overflow-hidden rounded-2xl ${
        compact ? "aspect-[16/9]" : "aspect-[16/9]"
      }`}
    >
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <svg viewBox="0 0 20 20" fill="white" className="h-6 w-6">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <p className="mt-3 text-[12px] font-semibold text-white">動画教材（準備中）</p>
        <p className="mt-1 text-[10px] text-white/70">{video.title}</p>
        {!compact && (
          <p className="mt-2 max-w-[260px] text-[9px] leading-relaxed text-white/50">
            {video.description}
          </p>
        )}
        <div className="mt-3 rounded-full bg-white/10 px-3 py-1 text-[9px] text-white/60">
          CMS: URLを設定するだけで差し替え可能
        </div>
      </div>
    </div>
  );
}