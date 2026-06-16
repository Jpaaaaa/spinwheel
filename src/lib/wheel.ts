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

// Vibrant premium palette for the wheel slices
export const WHEEL_COLORS = [
  "#4f46e5", // indigo
  "#7c3aed", // violet
  "#2563eb", // blue
  "#0891b2", // cyan
  "#0d9488", // teal
  "#c026d3", // fuchsia
  "#e11d48", // rose
  "#d97706", // amber
];

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}
