"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import CompletionModal from "@/components/CompletionModal";
import SpinWheel from "@/components/SpinWheel";
import WinnersPanel from "@/components/WinnersPanel";
import { downloadWinnersPdf } from "@/lib/downloadWinnersPdf";
import {
  restoreActiveSessionForParticipants,
  saveActiveSession,
  saveCompletedDraw,
} from "@/lib/sessionHistory";
import { loadNames, loadWinnerCount } from "@/lib/storage";
import { clampWinnerCount } from "@/types/raffle";

export default function SpinPage() {
  const router = useRouter();
  const [names, setNames] = useState<string[]>([]);
  const [maxWinners, setMaxWinners] = useState(10);
  const [winners, setWinners] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [lastWinner, setLastWinner] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [restoredSession, setRestoredSession] = useState(false);

  const wheelNames = names.filter((n) => !winners.includes(n));
  const isComplete = winners.length >= maxWinners && maxWinners > 0;

  useEffect(() => {
    const loaded = loadNames();
    if (loaded.length === 0) {
      router.replace("/upload");
      return;
    }

    const winnerTarget = clampWinnerCount(loadWinnerCount(), loaded.length);
    const active = restoreActiveSessionForParticipants(loaded);

    setNames(loaded);
    setMaxWinners(active?.maxWinners ?? winnerTarget);

    if (active && active.winners.length > 0) {
      setWinners(active.winners);
      setRestoredSession(true);
      if (active.winners.length >= (active.maxWinners ?? winnerTarget)) {
        setShowCompletionModal(true);
      }
    }

    setReady(true);
  }, [router]);

  const handleSpinStart = useCallback(() => {
    setSpinning(true);
    setLastWinner(null);
  }, []);

  const handleSpinComplete = useCallback(
    (winner: string) => {
      setLastWinner(winner);
      setSpinning(false);

      const nextWinners = [...winners, winner];

      saveActiveSession({
        participants: names,
        winners: nextWinners,
        maxWinners,
        updatedAt: new Date().toISOString(),
      });

      if (nextWinners.length >= maxWinners) {
        saveCompletedDraw(names, nextWinners, maxWinners);
        setShowCompletionModal(true);
      }

      setWinners(nextWinners);
    },
    [names, maxWinners, winners]
  );

  const handleDownloadPdf = useCallback(() => {
    setShowCompletionModal(false);
    downloadWinnersPdf(winners, names.length);
  }, [winners, names.length]);

  if (!ready) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center">
        <p className="text-slate-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="safe-px safe-pb mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <header className="mb-5 flex flex-col gap-4 sm:mb-6 md:mb-8 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="badge-glass mb-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
            Official Raffle Draw
          </div>
          <h1 className="font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl md:text-3xl">
            Spin Wheel
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-600 sm:text-base">
            {wheelNames.length} on wheel · {names.length} total · Draw {maxWinners} winner
            {maxWinners !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
          <span className="rounded-full border border-white/40 bg-white/30 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur-sm sm:px-4 sm:py-2 sm:text-sm">
            Spin {winners.length}/{maxWinners}
          </span>
          <Link href="/history" className="btn-secondary !py-1.5 !px-3 text-xs sm:!py-2 sm:!px-4 sm:text-sm">
            History
          </Link>
          <Link href="/upload" className="btn-secondary !py-1.5 !px-3 text-xs sm:!py-2 sm:!px-4 sm:text-sm">
            ← Upload new list
          </Link>
        </div>
      </header>

      {restoredSession && winners.length > 0 && !isComplete && (
        <div className="glass mb-4 px-4 py-3 text-center text-sm text-slate-600 sm:mb-6">
          Session restored — {winners.length} winner{winners.length !== 1 ? "s" : ""} already drawn.
        </div>
      )}

      {lastWinner && !spinning && (
        <div className="glass-strong mb-4 border-amber-200/50 bg-amber-500/10 px-4 py-3 text-center sm:mb-6 sm:px-6 sm:py-4">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-amber-600 sm:text-base">
            Winner #{winners.length}
          </p>
          <p className="font-display mt-1 break-words text-2xl font-extrabold tracking-tight text-amber-800 sm:text-3xl">
            {lastWinner}
          </p>
        </div>
      )}

      {isComplete && (
        <div className="glass-strong mb-4 px-4 py-3 text-center sm:mb-6">
          <p className="font-display text-sm font-bold text-emerald-700">Draw complete — saved to history</p>
          <Link href="/history" className="mt-2 inline-block text-sm font-medium text-indigo-600 hover:underline">
            View draw history →
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
        <div className="glass flex min-w-0 items-center justify-center p-3 sm:p-6 md:p-8">
          <SpinWheel
            names={wheelNames}
            maxWinners={maxWinners}
            winnersCount={winners.length}
            spinning={spinning}
            onSpinStart={handleSpinStart}
            onSpinComplete={handleSpinComplete}
          />
        </div>
        <WinnersPanel winners={winners} maxWinners={maxWinners} />
      </div>

      <CompletionModal
        open={showCompletionModal}
        winners={winners}
        totalParticipants={names.length}
        onDownload={handleDownloadPdf}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
}
