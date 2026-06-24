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
      <section className="page-header pb-3">
        <Link href="/progress" className="back-link">← 学習記録</Link>
        <p className="section-label mt-4">MY PROFILE</p>
        <h1 className="page-title">プロフィール</h1>
        <p className="page-desc">認定証・修了記録に表示される情報を登録</p>
      </section>

      <section className="page-section pt-0">
        <div className="card-premium p-5">
          <div className="space-y-4">
            {([
              ["name", "お名前", "山田 花子"],
              ["salonName", "サロン / 会社名", "Hair Studio Aoyama"],
              ["region", "地域", "東京"],
              ["jobTitle", "役職", "スタイリスト"],
            ] as const).map(([key, label, placeholder]) => (
              <div key={key}>
                <label className="input-label">{label}</label>
                <input
                  value={profile[key]}
                  onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="input-field mt-1.5"
                />
              </div>
            ))}
            <button type="button" onClick={handleSave} className="btn-primary">
              {saved ? "保存しました ✓" : "保存する"}
            </button>
          </div>
        </div>
      </section>
    </AppShell>
  );
}