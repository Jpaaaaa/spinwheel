"use client";

import { clampWinnerCount } from "@/types/raffle";

type WinnerCountInputProps = {
  value: number;
  onChange: (count: number) => void;
  maxParticipants: number;
};

export default function WinnerCountInput({ value, onChange, maxParticipants }: WinnerCountInputProps) {
  const max = maxParticipants > 0 ? maxParticipants : 999;

  const handleChange = (raw: string) => {
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) return;
    onChange(clampWinnerCount(parsed, maxParticipants));
  };

  return (
    <div className="glass p-4 sm:p-6">
      <label htmlFor="winner-count" className="block text-base font-semibold text-slate-900 sm:text-lg">
        Number of winners
      </label>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">How many winners should be drawn from the wheel</p>

      <div className="mt-3 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:items-center sm:gap-4">
        <input
          id="winner-count"
          type="number"
          min={1}
          max={max}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className="glass-input w-full px-4 py-3 text-center text-lg font-semibold sm:w-28"
        />
        <p className="text-xs text-slate-600 sm:text-sm text-slate-600">
          {maxParticipants > 0
            ? `Max ${maxParticipants} (one per participant)`
            : "Set after loading participants"}
        </p>
      </div>
    </div>
  );
}
