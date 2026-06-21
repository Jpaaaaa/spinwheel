"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FileUpload from "@/components/FileUpload";
import ManualNameEntry from "@/components/ManualNameEntry";
import NamePreview from "@/components/NamePreview";
import WinnerCountInput from "@/components/WinnerCountInput";
import {
  canUseExcelUpload,
  capParticipantNames,
  FREE_MAX_PARTICIPANTS,
  FREE_MAX_WINNERS,
  getMaxWinners,
  isPremiumUser,
} from "@/lib/tierLimits";
import { saveNames, saveWinnerCount } from "@/lib/storage";
import { clampWinnerCount, DEFAULT_WINNER_COUNT } from "@/types/raffle";

type InputMode = "upload" | "manual";

export default function UploadPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const premium = isPremiumUser(email);
  const excelAllowed = canUseExcelUpload(email);
  const maxWinners = getMaxWinners(email);

  const [names, setNames] = useState<string[]>([]);
  const [mode, setMode] = useState<InputMode>("manual");
  const [winnerCount, setWinnerCount] = useState(DEFAULT_WINNER_COUNT);
  const [limitNotice, setLimitNotice] = useState<string | null>(null);

  useEffect(() => {
    if (excelAllowed) setMode("upload");
  }, [excelAllowed]);

  const handleNamesLoaded = useCallback(
    (loaded: string[]) => {
      const { names: capped, truncated } = capParticipantNames(loaded, email);
      setNames(capped);
      if (truncated) {
        setLimitNotice(
          `Free plan allows up to ${FREE_MAX_PARTICIPANTS} participants. Extra names were removed.`
        );
      } else {
        setLimitNotice(null);
      }
    },
    [email]
  );

  useEffect(() => {
    if (names.length === 0) return;
    setWinnerCount((prev) => {
      const participantMax = clampWinnerCount(prev, names.length);
      if (premium) return participantMax;
      return Math.min(participantMax, FREE_MAX_WINNERS);
    });
  }, [names.length, premium]);

  const handleProceed = () => {
    if (names.length === 0) return;
    saveNames(names);
    saveWinnerCount(
      clampWinnerCount(
        premium ? winnerCount : Math.min(winnerCount, FREE_MAX_WINNERS),
        names.length
      )
    );
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
          {premium
            ? "Upload an Excel file or add names manually"
            : "Add names manually — up to 100 participants, 10 winners"}
        </motion.p>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative flex flex-1 flex-col gap-6"
      >
        {!premium && (
          <div className="rounded-xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-sm text-indigo-900">
            <span className="font-semibold">Free plan:</span> manual entry only, max{" "}
            {FREE_MAX_PARTICIPANTS} participants and {FREE_MAX_WINNERS} winners. Excel import is{" "}
            <span className="font-semibold">Premium only</span>.
          </div>
        )}

        {limitNotice && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {limitNotice}
          </div>
        )}

        <WinnerCountInput
          value={winnerCount}
          onChange={setWinnerCount}
          maxParticipants={names.length}
          maxWinners={Number.isFinite(maxWinners) ? maxWinners : undefined}
        />

        <div className="glass flex p-1.5">
          {(["upload", "manual"] as const).map((m) => {
            const isExcel = m === "upload";
            const isLocked = isExcel && !excelAllowed;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                  mode === m
                    ? "bg-neutral-100 text-neutral-900 shadow-sm border border-neutral-200"
                    : "text-neutral-500 hover:bg-neutral-50"
                } ${isLocked ? "opacity-90" : ""}`}
              >
                {isExcel ? "Upload Excel" : "Add manually"}
                {isLocked && (
                  <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:text-[10px]">
                    Premium
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {mode === "upload" ? (
          <FileUpload onNamesLoaded={handleNamesLoaded} locked={!excelAllowed} />
        ) : (
          <ManualNameEntry
            onNamesLoaded={handleNamesLoaded}
            maxParticipants={premium ? undefined : FREE_MAX_PARTICIPANTS}
          />
        )}
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
