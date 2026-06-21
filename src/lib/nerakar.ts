import { isAdmin } from "@/lib/auth";

const NERAKAR_ENABLED_KEY = "nerakar-enabled";
const NERAKAR_QUEUE_KEY = "nerakar-queue";

export type NerakarSettings = {
  enabled: boolean;
  queue: string[];
};

export function isNerakarEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(NERAKAR_ENABLED_KEY) === "1";
}

export function setNerakarEnabled(enabled: boolean): void {
  localStorage.setItem(NERAKAR_ENABLED_KEY, enabled ? "1" : "0");
}

export function clearNerakar(): void {
  localStorage.removeItem(NERAKAR_ENABLED_KEY);
  clearNerakarQueue();
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

export function applyNerakarSettings(settings: NerakarSettings): void {
  setNerakarEnabled(settings.enabled);
  saveNerakarQueue(settings.queue);
}

export function getLocalNerakarSettings(): NerakarSettings {
  return {
    enabled: isNerakarEnabled(),
    queue: loadNerakarQueue(),
  };
}

export async function fetchNerakarSettings(): Promise<NerakarSettings | null> {
  try {
    const res = await fetch("/api/nerakar", { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as NerakarSettings;
    applyNerakarSettings(data);
    return data;
  } catch {
    return null;
  }
}

export async function persistNerakarSettings(settings: NerakarSettings): Promise<boolean> {
  applyNerakarSettings(settings);
  try {
    const res = await fetch("/api/nerakar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function canUseNerakar(email: string | null | undefined): boolean {
  return isAdmin(email) && isNerakarEnabled();
}

export function clearNerakarIfUnauthorized(email: string | null | undefined): void {
  if (!isAdmin(email)) clearNerakar();
}

export function getNerakarForcedWinner(
  spinIndex: number,
  email: string | null | undefined
): string | undefined {
  if (!canUseNerakar(email)) return undefined;
  return loadNerakarQueue()[spinIndex];
}
