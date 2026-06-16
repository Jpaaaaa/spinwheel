export type DrawSession = {
  id: string;
  completedAt: string;
  participants: string[];
  winners: string[];
  maxWinners: number;
};

export type ActiveDrawSession = {
  participants: string[];
  winners: string[];
  maxWinners: number;
  updatedAt: string;
};

export const HISTORY_STORAGE_KEY = "raffle-history";
export const ACTIVE_SESSION_STORAGE_KEY = "raffle-active-session";
export const MAX_HISTORY_ENTRIES = 50;
