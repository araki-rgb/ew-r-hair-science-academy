"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/app/components/AppShell";
import { loadProfile, saveProfile, type UserProfile } from "@/lib/storage/profile-store";
import { trackEvent } from "@/lib/analytics/events";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({ name: "", salonName: "", region: "", jobTitle: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const handleSave = () => {
    saveProfile(profile);
    trackEvent("profile_update");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell activeNav="progress">
      <section className="px-5 pb-5 pt-7">
        <Link href="/progress" className="text-[13px] font-medium text-primary">← 学習記録</Link>
        <p className="section-label mt-4">MY PROFILE</p>
        <h1 className="mt-2 text-[24px] font-bold text-foreground">プロフィール</h1>
        <p className="mt-2 text-[12px] text-muted">認定証・修了記録に表示される情報を登録</p>
      </section>

      <section className="space-y-4 px-5 pb-6">
        {([
          ["name", "お名前", "山田 花子"],
          ["salonName", "サロン / 会社名", "Hair Studio Aoyama"],
          ["region", "地域", "東京"],
          ["jobTitle", "役職", "スタイリスト"],
        ] as const).map(([key, label, placeholder]) => (
          <div key={key}>
            <label className="text-[11px] font-semibold text-foreground">{label}</label>
            <input
              value={profile[key]}
              onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
              placeholder={placeholder}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-[14px] outline-none focus:border-primary"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleSave}
          className="flex w-full items-center justify-center rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-white"
        >
          {saved ? "保存しました ✓" : "保存する"}
        </button>
      </section>
    </AppShell>
  );
}