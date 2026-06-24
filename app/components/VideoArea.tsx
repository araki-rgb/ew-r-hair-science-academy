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
      <div className="video-education-block">
        <video
          src={video.url}
          poster={video.thumbnailUrl ?? undefined}
          controls
          className="aspect-video w-full bg-black"
        />
        <div className="video-education-meta">
          <p className="text-[12px] font-bold text-foreground">{video.title}</p>
          {video.duration && (
            <p className="mt-0.5 text-[10px] text-muted">{video.duration}</p>
          )}
          {!compact && video.description && (
            <p className="mt-2 text-[10px] leading-relaxed text-muted">{video.description}</p>
          )}
        </div>
        {chapters && chapters.length > 0 && (
          <div className="video-chapter-track">
            <p className="section-label">CHAPTERS</p>
            <div className="mt-2 flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
              {chapters.map((ch, i) => (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => setActiveChapter(i)}
                  className={`filter-pill ${activeChapter === i ? "active" : ""}`}
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
    <div className="video-placeholder aspect-[16/9] overflow-hidden rounded-[var(--radius-xl)]">
      <div className="video-placeholder-inner">
        <div className="video-play-btn">
          <svg viewBox="0 0 20 20" fill="white" className="h-6 w-6" aria-hidden>
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
        <p className="mt-3 text-[12px] font-semibold text-white">動画教材</p>
        <p className="mt-1 text-[10px] text-white/70">{video.title}</p>
        <span className="badge-gold mt-3">準備中</span>
      </div>
    </div>
  );
}