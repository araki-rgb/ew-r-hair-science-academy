export type UserProfile = {
  name: string;
  salonName: string;
  region: string;
  jobTitle: string;
};

const PROFILE_KEY = "ewr-user-profile";

const DEFAULT_PROFILE: UserProfile = {
  name: "",
  salonName: "",
  region: "",
  jobTitle: "",
};

export function loadProfile(): UserProfile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfile(profile: UserProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new CustomEvent("ewr-profile-change", { detail: profile }));
}

export function getDisplayName(profile: UserProfile): string {
  return profile.name.trim() || "受講者";
}