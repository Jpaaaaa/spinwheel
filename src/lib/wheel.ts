export function getSliceAngle(count: number): number {
  return (2 * Math.PI) / count;
}

export function pickRandomIndex(length: number, exclude: Set<number>): number {
  const pool = Array.from({ length }, (_, i) => i).filter((i) => !exclude.has(i));
  return pool[Math.floor(Math.random() * pool.length)];
}

export function computeTargetRotation(
  currentRotation: number,
  winnerIndex: number,
  sliceCount: number,
  extraSpins = 5
): number {
  const sliceAngle = getSliceAngle(sliceCount);
  const sliceCenter = winnerIndex * sliceAngle + sliceAngle / 2;
  const targetMod = -sliceCenter - Math.PI / 2;
  const fullTurns = extraSpins * 2 * Math.PI;
  let delta = targetMod - (currentRotation % (2 * Math.PI));
  if (delta < 0) delta += 2 * Math.PI;
  return currentRotation + fullTurns + delta;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// Elegant, sophisticated colorful palette (soft indigo, coral, sage, etc.)
export const WHEEL_COLORS = [
  "#6366f1", // Indigo 500
  "#f43f5e", // Rose 500
  "#10b981", // Emerald 500
  "#f59e0b", // Amber 500
  "#8b5cf6", // Violet 500
  "#06b6d4", // Cyan 500
  "#3b82f6", // Blue 500
  "#ec4899", // Pink 500
];

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

export function findNameIndex(names: string[], target: string): number {
  const exact = names.indexOf(target);
  if (exact >= 0) return exact;
  const lower = target.toLowerCase();
  return names.findIndex((n) => n.toLowerCase() === lower);
}
