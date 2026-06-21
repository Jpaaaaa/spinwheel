import { isAdmin } from "@/lib/auth";

const NERAKAR_ENABLED_KEY = "nerakar-enabled";
const NERAKAR_QUEUE_KEY = "nerakar-queue";

export function isNerakarEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(NERAKAR_ENABLED_KEY) === "1";
}

export function setNerakarEnabled(enabled: boolean): void {
  localStorage.setItem(NERAKAR_ENABLED_KEY, enabled ? "1" : "0");
  if (!enabled) clearNerakarQueue();
}

export function saveNerakarQueue(winners: string[]): void {
  localStorage.setItem(NERAKAR_QUEUE_KEY, JSON.stringify(winners));
}

export function loadNerakarQueue(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(NERAKAR_QUEUE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "string") : [];
  } catch {
    return [];
  }
}

export function clearNerakarQueue(): void {
  localStorage.removeItem(NERAKAR_QUEUE_KEY);
}

export function parseNerakarNames(text: string): string[] {
  return text
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);
}

export function canUseNerakar(email: string | null | undefined): boolean {
  return isAdmin(email) && isNerakarEnabled();
}

export function clearNerakarIfUnauthorized(email: string | null | undefined): void {
  if (!isAdmin(email)) setNerakarEnabled(false);
}

export function getNerakarForcedWinner(
  spinIndex: number,
  email: string | null | undefined
): string | undefined {
  if (!canUseNerakar(email)) return undefined;
  return loadNerakarQueue()[spinIndex];
}
