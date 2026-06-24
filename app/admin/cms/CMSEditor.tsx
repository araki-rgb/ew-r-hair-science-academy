"use client";

import { useState } from "react";
import { lessons } from "@/lib/data/lessons";
import { products } from "@/lib/data/products";
import { missionVideos } from "@/lib/content/videos";

type Tab = "lessons" | "products" | "videos";

export function CMSEditor() {
  const [tab, setTab] = useState<Tab>("lessons");
  const [selected, setSelected] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");
  const [hairdresserTalk, setHairdresserTalk] = useState("");
  const [dealerTalk, setDealerTalk] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  const selectLesson = (slug: string) => {
    const l = lessons.find((x) => x.slug === slug);
    if (!l) return;
    setSelected(slug);
    setTitle(l.title);
    setDescription(l.description);
    setStatus("");
  };

  const selectProduct = (slug: string) => {
    const p = products.find((x) => x.slug === slug);
    if (!p) return;
    setSelected(slug);
    setTagline(p.tagline);
    setHairdresserTalk(p.hairdresserExplanation);
    setDealerTalk(p.dealerTalk);
    setStatus("");
  };

  const selectVideo = (id: string) => {
    const v = missionVideos[id];
    if (!v) return;
    setSelected(id);
    setTitle(v.title ?? "");
    setDescription(v.description ?? "");
    setVideoUrl(v.url ?? "");
    setStatus("");
  };

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    setStatus("");
    try {
      let res: Response;
      if (tab === "lessons") {
        res = await fetch(`/api/cms/lessons/${selected}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        });
      } else if (tab === "products") {
        res = await fetch(`/api/cms/products/${selected}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tagline, hairdresserExplanation: hairdresserTalk, dealerTalk }),
        });
      } else {
        res = await fetch(`/api/cms/videos/${selected}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: videoUrl, title, description }),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "保存失敗");
      setStatus("保存しました ✓");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "保存に失敗しました");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section className="page-section pt-0">
        <div className="tab-switcher">
          {([
            ["lessons", "Mission"],
            ["products", "製品"],
            ["videos", "動画"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => { setTab(key); setSelected(null); setStatus(""); }}
              className={tab === key ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="page-section pb-8">
        <div className="space-y-2">
          {tab === "lessons" && lessons.map((l) => (
            <button
              key={l.slug}
              type="button"
              onClick={() => selectLesson(l.slug)}
              className={`card-soft card-interactive w-full p-4 text-left ${selected === l.slug ? "cms-item-selected" : ""}`}
            >
              <p className="text-[13px] font-bold">Mission {l.missionNumber}: {l.title}</p>
            </button>
          ))}
          {tab === "products" && products.map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => selectProduct(p.slug)}
              className={`card-soft card-interactive w-full p-4 text-left ${selected === p.slug ? "cms-item-selected" : ""}`}
            >
              <p className="text-[13px] font-bold">{p.name}</p>
            </button>
          ))}
          {tab === "videos" && Object.entries(missionVideos).map(([id, v]) => (
            <button
              key={id}
              type="button"
              onClick={() => selectVideo(id)}
              className={`card-soft card-interactive w-full p-4 text-left ${selected === id ? "cms-item-selected" : ""}`}
            >
              <p className="text-[13px] font-bold">{v.title}</p>
              <p className="text-[10px] text-muted">{id}</p>
            </button>
          ))}
        </div>

        {selected && (
          <div className="card-premium mt-4 space-y-3 p-4 animate-fade-up">
            <p className="section-label">EDITING</p>
            <p className="section-title">編集: {selected}</p>
            {tab === "lessons" && (
              <>
                <div>
                  <label className="input-label">タイトル</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-field mt-1.5" />
                </div>
                <div>
                  <label className="input-label">説明</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="textarea-field mt-1.5" />
                </div>
              </>
            )}
            {tab === "products" && (
              <>
                <div>
                  <label className="input-label">タグライン</label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="input-field mt-1.5" />
                </div>
                <div>
                  <label className="input-label">美容師向け説明</label>
                  <textarea value={hairdresserTalk} onChange={(e) => setHairdresserTalk(e.target.value)} rows={2} className="textarea-field mt-1.5" />
                </div>
                <div>
                  <label className="input-label">ディーラー向けトーク</label>
                  <textarea value={dealerTalk} onChange={(e) => setDealerTalk(e.target.value)} rows={2} className="textarea-field mt-1.5" />
                </div>
              </>
            )}
            {tab === "videos" && (
              <>
                <div>
                  <label className="input-label">動画タイトル</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="input-field mt-1.5" />
                </div>
                <div>
                  <label className="input-label">動画URL</label>
                  <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="input-field mt-1.5" />
                </div>
                <div>
                  <label className="input-label">説明</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="textarea-field mt-1.5" />
                </div>
              </>
            )}
            <button type="button" onClick={save} disabled={saving} className="btn-primary">
              {saving ? "保存中..." : "保存する"}
            </button>
            {status && <p className="text-center text-[11px] font-medium text-primary">{status}</p>}
          </div>
        )}
      </section>
    </>
  );
}