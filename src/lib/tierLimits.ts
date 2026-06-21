import { isAdmin } from "@/lib/auth";

export const FREE_MAX_PARTICIPANTS = 100;
export const FREE_MAX_WINNERS = 10;

export function isPremiumUser(email: string | null | undefined): boolean {
  return isAdmin(email);
}

export function canUseExcelUpload(email: string | null | undefined): boolean {
  return isPremiumUser(email);
}

export function getMaxParticipants(email: string | null | undefined): number {
  return isPremiumUser(email) ? Number.POSITIVE_INFINITY : FREE_MAX_PARTICIPANTS;
}

export function getMaxWinners(email: string | null | undefined): number {
  return isPremiumUser(email) ? Number.POSITIVE_INFINITY : FREE_MAX_WINNERS;
}

export function capParticipantNames(
  names: string[],
  email: string | null | undefined
): { names: string[]; truncated: boolean } {
  const max = getMaxParticipants(email);
  if (names.length <= max) return { names, truncated: false };
  return { names: names.slice(0, max), truncated: true };
}
