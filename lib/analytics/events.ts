export type AnalyticsEvent =
  | "mission_start"
  | "mission_complete"
  | "quiz_complete"
  | "ai_consult"
  | "product_view"
  | "cert_download"
  | "search"
  | "profile_update";

type EventPayload = Record<string, string | number | boolean | undefined>;

const EVENTS_KEY = "ewr-analytics-events";

export function trackEvent(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === "undefined") return;
  const entry = { event, payload, at: new Date().toISOString() };
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    const list = raw ? (JSON.parse(raw) as typeof entry[]) : [];
    list.push(entry);
    if (list.length > 200) list.splice(0, list.length - 200);
    localStorage.setItem(EVENTS_KEY, JSON.stringify(list));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent("ewr-analytics", { detail: entry }));
}

export function getEventCount(event: AnalyticsEvent): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(EVENTS_KEY);
    if (!raw) return 0;
    return (JSON.parse(raw) as { event: string }[]).filter((e) => e.event === event).length;
  } catch {
    return 0;
  }
}