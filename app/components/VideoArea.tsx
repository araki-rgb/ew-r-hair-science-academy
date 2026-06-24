"use client";

import { useState } from "react";
import type { VideoAsset } from "@/lib/types";
import { videoChapters } from "@/lib/content/video-scripts";

type Props = {
  video: VideoAsset;
  compact?: boolean;
  questionId?: string;
};

export function VideoArea({ video, compact = false, questionId }: Props) {
  const [activeChapter, setActiveChapter] = useState(0);
  const chapters = questionId ? videoChapters[questionId] : undefined;

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
          {!compact && video.description && (
            <p className="mt-2 text-[10px] leading-relaxed text-muted">{video.description}</p>
          )}
        </div>
        {chapters && chapters.length > 0 && (
          <div className="border-t border-border bg-primary-muted/30 px-4 py-3">
            <p className="text-[10px] font-bold text-primary">チャプター解説</p>
            <div className="mt-2 flex gap-1 overflow-x-auto pb-1">
              {chapters.map((ch, i) => (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => setActiveChapter(i)}
                  className={`shrink-0 rounded-lg px-2.5 py-1 text-[9px] font-semibold ${
                    activeChapter === i ? "bg-primary text-white" : "bg-white text-muted"
                  }`}
                >
                  {ch.time}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] font-semibold text-foreground">{chapters[activeChapter].title}</p>
            <p className="mt-1 text-[10px] leading-relaxed text-muted">{chapters[activeChapter].content}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`video-placeholder overflow-hidden rounded-2xl aspect-[16/9]`}>
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <svg viewBox="0 0 20 20" fill="white" className="h-6 w-6">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <p className="mt-3 text-[12px] font-semibold text-white">動画教材（準備中）</p>
        <p className="mt-1 text-[10px] text-white/70">{video.title}</p>
      </div>
    </div>
  );
}