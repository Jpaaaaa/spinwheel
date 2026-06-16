"use client";

import { useState } from "react";
import { parseManualNames } from "@/lib/parseNames";

type ManualNameEntryProps = { onNamesLoaded: (names: string[]) => void; };

export default function ManualNameEntry({ onNamesLoaded }: ManualNameEntryProps) {
  const [text, setText]   = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    const names = parseManualNames(text);
    if (names.length === 0) { setError("Enter at least one name (one per line)."); return; }
    setError(null);
    onNamesLoaded(names);
  };

  return (
    <div className="glass p-4 sm:p-6">
      <label htmlFor="manual-names" className="block text-base font-semibold text-slate-900 sm:text-lg">
        Add participants manually
      </label>
      <p className="mt-1 text-xs text-slate-600 sm:text-sm">One name per line</p>

      <textarea
        id="manual-names"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder={"Alice\nBob\nCharlie"}
        className="glass-input mt-3 w-full resize-y px-3 py-2.5 text-sm sm:mt-4 sm:min-h-[180px] sm:px-4 sm:py-3"
      />

      {error && (
        <p className="mt-3 rounded-xl px-3 py-2 text-xs text-red-600 sm:text-sm"
          style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.20)" }}>
          {error}
        </p>
      )}

      <button type="button" onClick={handleLoad} className="btn-primary mt-4 w-full">
        Load participants
      </button>
    </div>
  );
}
