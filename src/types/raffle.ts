export type RaffleState = {
  names: string[];
  winners: string[];
  spinsRemaining: number;
};

export const DEFAULT_WINNER_COUNT = 10;

export const STORAGE_KEY = "raffle-names";
export const WINNER_COUNT_STORAGE_KEY = "raffle-winner-count";

export function clampWinnerCount(count: number, participantCount: number): number {
  const min = 1;
  const max = participantCount > 0 ? participantCount : 999;
  return Math.min(Math.max(count, min), max);
}
