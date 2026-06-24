"use client";

import { useEffect, useState } from "react";
import type { UserMode } from "@/lib/data/roadmaps";

const STORAGE_KEY = "ewr-user-mode";

export function useUserMode() {
  const [mode, setModeState] = useState<UserMode>("hairdresser");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as UserMode | null;
    if (stored === "hairdresser" || stored === "dealer") {
      setModeState(stored);
    }
    setHydrated(true);
  }, []);

  const setMode = (next: UserMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent("ewr-mode-change", { detail: next }));
  };

  return { mode, setMode, hydrated };
}

export function ModeToggle({ className = "" }: { className?: string }) {
  const { mode, setMode, hydrated } = useUserMode();

  if (!hydrated) {
    return <div className={`mode-toggle-track ${className}`}><div className="h-10" /></div>;
  }

  return (
    <div className={`mode-toggle-track ${className}`} role="tablist" aria-label="学習モード">
      <div
        className="mode-toggle-thumb"
        style={{ transform: mode === "dealer" ? "translateX(100%)" : "translateX(0)" }}
        aria-hidden
      />
      <button
        type="button"
        role="tab"
        aria-selected={mode === "hairdresser"}
        onClick={() => setMode("hairdresser")}
        className={`mode-toggle-btn ${mode === "hairdresser" ? "active" : ""}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
          <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 16c0-3.3 2.7-6 6-6s6 2.7 6 6v1H4v-1z" />
        </svg>
        美容師
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={mode === "dealer"}
        onClick={() => setMode("dealer")}
        className={`mode-toggle-btn ${mode === "dealer" ? "active" : ""}`}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
          <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v1h6V4a1 1 0 011-1h3a1 1 0 011 1v2H3V4zm0 4h14v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
        </svg>
        ディーラー
      </button>
    </div>
  );
}