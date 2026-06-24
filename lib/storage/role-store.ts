const ROLE_KEY = "ewr-user-role";
const DEMO_ADMIN_PIN = "ewr2026";

export type UserRole = "learner" | "admin";

export function getUserRole(): UserRole {
  if (typeof window === "undefined") return "learner";
  return localStorage.getItem(ROLE_KEY) === "admin" ? "admin" : "learner";
}

export function setUserRole(role: UserRole) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ROLE_KEY, role);
  window.dispatchEvent(new CustomEvent("ewr-role-change", { detail: role }));
}

export function verifyAdminPin(pin: string): boolean {
  return pin.trim() === DEMO_ADMIN_PIN;
}

export function unlockAdmin(pin: string): boolean {
  if (!verifyAdminPin(pin)) return false;
  setUserRole("admin");
  return true;
}