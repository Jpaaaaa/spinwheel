import type { ActiveDrawSession, DrawSession } from "@/types/session";
import {
  ACTIVE_SESSION_STORAGE_KEY,
  HISTORY_STORAGE_KEY,
  MAX_HISTORY_ENTRIES,
} from "@/types/session";

function participantsMatch(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((name, i) => name === b[i]);
}

function parseJson<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: ActiveDrawSession): void {
  localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function loadActiveSession(): ActiveDrawSession | null {
  if (typeof window === "undefined") return null;
  const parsed = parseJson<ActiveDrawSession>(localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY));
  if (!parsed || !Array.isArray(parsed.participants) || !Array.isArray(parsed.winners)) return null;
  return parsed;
}

export function clearActiveSession(): void {
  localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
}

export function restoreActiveSessionForParticipants(participants: string[]): ActiveDrawSession | null {
  const active = loadActiveSession();
  if (!active || !participantsMatch(active.participants, participants)) return null;
  return active;
}

export function saveCompletedDraw(
  participants: string[],
  winners: string[],
  maxWinners: number
): DrawSession {
  const session: DrawSession = {
    id: crypto.randomUUID(),
    completedAt: new Date().toISOString(),
    participants,
    winners,
    maxWinners,
  };

  const history = loadDrawHistory();
  const next = [session, ...history].slice(0, MAX_HISTORY_ENTRIES);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(next));
  clearActiveSession();

  return session;
}

export function loadDrawHistory(): DrawSession[] {
  if (typeof window === "undefined") return [];
  const parsed = parseJson<DrawSession[]>(localStorage.getItem(HISTORY_STORAGE_KEY));
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(
    (s) =>
      typeof s.id === "string" &&
      typeof s.completedAt === "string" &&
      Array.isArray(s.participants) &&
      Array.isArray(s.winners)
  );
}

export function deleteDrawSession(id: string): void {
  const history = loadDrawHistory().filter((s) => s.id !== id);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

export function clearDrawHistory(): void {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
}

export function formatSessionDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
