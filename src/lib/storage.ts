import { clearActiveSession } from "@/lib/sessionHistory";
import { DEFAULT_WINNER_COUNT, STORAGE_KEY, WINNER_COUNT_STORAGE_KEY } from "@/types/raffle";

export function saveNames(names: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  clearActiveSession();
}

export function loadNames(): string[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === "string") : [];
  } catch {
    return [];
  }
}

export function saveWinnerCount(count: number): void {
  localStorage.setItem(WINNER_COUNT_STORAGE_KEY, String(count));
}

export function loadWinnerCount(): number {
  if (typeof window === "undefined") return DEFAULT_WINNER_COUNT;
  const raw = localStorage.getItem(WINNER_COUNT_STORAGE_KEY);
  if (!raw) return DEFAULT_WINNER_COUNT;
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 1 ? parsed : DEFAULT_WINNER_COUNT;
}

export function clearNames(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(WINNER_COUNT_STORAGE_KEY);
  clearActiveSession();
}
