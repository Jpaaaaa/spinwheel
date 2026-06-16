"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";
import ManualNameEntry from "@/components/ManualNameEntry";
import NamePreview from "@/components/NamePreview";
import WinnerCountInput from "@/components/WinnerCountInput";
import { saveNames, saveWinnerCount } from "@/lib/storage";
import { clampWinnerCount, DEFAULT_WINNER_COUNT } from "@/types/raffle";

type InputMode = "upload" | "manual";

export default function UploadPage() {
  const router = useRouter();
  const [names, setNames] = useState<string[]>([]);
  const [mode, setMode] = useState<InputMode>("upload");
  const [winnerCount, setWinnerCount] = useState(DEFAULT_WINNER_COUNT);

  const handleNamesLoaded = useCallback((loaded: string[]) => setNames(loaded), []);

  useEffect(() => {
    if (names.length > 0) setWinnerCount((prev) => clampWinnerCount(prev, names.length));
  }, [names.length]);

  const handleProceed = () => {
    if (names.length === 0) return;
    saveNames(names);
    saveWinnerCount(clampWinnerCount(winnerCount, names.length));
    router.push("/spin");
  };

  const canProceed = names.length > 0 && winnerCount >= 1 && winnerCount <= names.length;

  return (
    <div className="safe-px safe-pb mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10 md:py-12">
      <header className="mb-6 text-center sm:mb-8 md:mb-10">
        <div className="badge-glass mb-3">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          Official Raffle Draw
        </div>
        <h1 className="display-heading text-3xl text-slate-900 sm:text-4xl md:text-5xl">Add Participants</h1>
        <p className="mt-3 px-2 text-lg font-medium text-slate-600 sm:text-xl">Upload an Excel file or add names manually</p>
      </header>

      <main className="flex flex-1 flex-col gap-4 sm:gap-6">
        <WinnerCountInput value={winnerCount} onChange={setWinnerCount} maxParticipants={names.length} />

        <div className="glass flex p-1">
          {(["upload", "manual"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-medium transition-all sm:text-sm ${
                mode === m ? "bg-blue-600/90 text-slate-900 shadow-md backdrop-blur-sm" : "text-slate-600 hover:bg-white/30"
              }`}
            >
              {m === "upload" ? "Upload Excel" : "Add manually"}
            </button>
          ))}
        </div>

        {mode === "upload" ? <FileUpload onNamesLoaded={handleNamesLoaded} /> : <ManualNameEntry onNamesLoaded={handleNamesLoaded} />}
        <NamePreview names={names} />

        {canProceed && (
          <button onClick={handleProceed} className="btn-primary mt-1 w-full py-3.5 text-base sm:mt-2 sm:py-4 sm:text-lg">
            Proceed to Spin Wheel →
          </button>
        )}
      </main>
    </div>
  );
}
