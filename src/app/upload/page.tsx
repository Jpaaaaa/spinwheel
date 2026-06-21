"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <div className="relative safe-px safe-pb mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-10 md:py-12 bg-[#fafafa]">
      <header className="relative mb-8 text-center sm:mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge-glass mb-4"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-800" />
          Official Raffle Draw
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="display-heading text-3xl text-neutral-900 sm:text-4xl md:text-5xl"
        >
          Add Participants
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-3 px-2 text-lg font-normal text-neutral-500 sm:text-xl"
        >
          Upload an Excel file or add names manually
        </motion.p>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative flex flex-1 flex-col gap-6"
      >
        <WinnerCountInput value={winnerCount} onChange={setWinnerCount} maxParticipants={names.length} />

        <div className="glass flex p-1.5">
          {(["upload", "manual"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 rounded-md px-2 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                mode === m 
                  ? "bg-neutral-100 text-neutral-900 shadow-sm border border-neutral-200" 
                  : "text-neutral-500 hover:bg-neutral-50"
              }`}
            >
              {m === "upload" ? "Upload Excel" : "Add manually"}
            </button>
          ))}
        </div>

        {mode === "upload" ? <FileUpload onNamesLoaded={handleNamesLoaded} /> : <ManualNameEntry onNamesLoaded={handleNamesLoaded} />}
        <NamePreview names={names} />

        {canProceed && (
          <motion.button 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleProceed} 
            className="btn-primary mt-2 w-full py-3.5 text-base sm:mt-4 sm:py-4 sm:text-lg shadow-xl shadow-black/10"
          >
            Proceed to Spin Wheel →
          </motion.button>
        )}
      </motion.main>
    </div>
  );
}
