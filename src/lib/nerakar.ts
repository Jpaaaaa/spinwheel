import { isAdmin } from "@/lib/auth";

const NERAKAR_ENABLED_KEY = "nerakar-enabled";
const NERAKAR_QUEUE_KEY = "nerakar-queue";

export type NerakarSettings = {
  enabled: boolean;
  queue: string[];
};

export type NerakarSyncResult = {
  ok: boolean;
  settings?: NerakarSettings;
  error?: string;
  localOnly?: boolean;
};

async function parseNerakarError(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as { error?: unknown };
    if (typeof body.error === "string" && body.error.trim()) return body.error;
  } catch {
    // ignore invalid JSON
  }

  if (res.status === 503) {
    return "Cloud sync is not set up on the server. In Vercel: Storage → Upstash Redis → connect to this project → redeploy.";
  }
  if (res.status === 403) {
    return "You do not have permission to use NERAKAR.";
  }
  return "Could not sync NERAKAR. Please try again.";
}

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

export async function fetchNerakarSettings(): Promise<NerakarSyncResult> {
  try {
    const res = await fetch("/api/nerakar", { cache: "no-store" });
    if (!res.ok) {
      const local = getLocalNerakarSettings();
      return {
        ok: false,
        settings: local,
        error: await parseNerakarError(res),
        localOnly: true,
      };
    }

    const data = (await res.json()) as NerakarSettings;
    applyNerakarSettings(data);
    return { ok: true, settings: data };
  } catch {
    const local = getLocalNerakarSettings();
    return {
      ok: false,
      settings: local,
      error: "Network error — showing the last copy saved on this device.",
      localOnly: true,
    };
  }
}

export async function persistNerakarSettings(settings: NerakarSettings): Promise<NerakarSyncResult> {
  applyNerakarSettings(settings);

  try {
    const res = await fetch("/api/nerakar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!res.ok) {
      return {
        ok: false,
        settings,
        error: await parseNerakarError(res),
        localOnly: true,
      };
    }

    const data = (await res.json()) as NerakarSettings;
    applyNerakarSettings(data);
    return { ok: true, settings: data };
  } catch {
    return {
      ok: false,
      settings,
      error: "Network error — saved on this device only until cloud sync is available.",
      localOnly: true,
    };
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
