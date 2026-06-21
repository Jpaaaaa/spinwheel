"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SpinLoading from "@/components/SpinLoading";
import { downloadWinnersPdf } from "@/lib/downloadWinnersPdf";
import {
  clearDrawHistory,
  deleteDrawSession,
  formatSessionDate,
  loadDrawHistory,
} from "@/lib/sessionHistory";
import type { DrawSession } from "@/types/session";

export default function HistoryPage() {
  const [history, setHistory] = useState<DrawSession[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => {
    setHistory(loadDrawHistory());
  }, []);

  useEffect(() => {
    refresh();
    setReady(true);
  }, [refresh]);

  const handleDelete = (id: string) => {
    deleteDrawSession(id);
    refresh();
    if (expandedId === id) setExpandedId(null);
  };

  const handleClearAll = () => {
    if (!confirm("Clear all draw history? This cannot be undone.")) return;
    clearDrawHistory();
    refresh();
    setExpandedId(null);
  };

  if (!ready) {
    return (
      <div className="flex min-h-[50dvh] items-center justify-center">
        <SpinLoading label="Loading history…" />
      </div>
    );
  }

  return (
    // Added pt-28 to clear the fixed floating pill header
    <div className="safe-px safe-pb mx-auto max-w-3xl px-4 pt-28 pb-10 sm:px-6 sm:pt-32 sm:pb-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <div>
          <h1 className="section-title">Draw History</h1>
          <p className="section-subtitle">Completed raffle sessions saved on this device</p>
        </div>
        {history.length > 0 && (
          <button type="button" onClick={handleClearAll} className="btn-secondary !py-2 !px-4 !text-sm border-neutral-300 text-neutral-600 hover:text-red-600 hover:border-red-600">
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass mt-10 p-8 sm:p-12 text-center">
          <p className="text-lg font-bold text-neutral-900">No completed draws yet</p>
          <p className="mt-2 text-sm text-neutral-500">
            Finish a spin session and it will appear here automatically.
          </p>
          <Link href="/upload" className="btn-primary mt-8 inline-flex">
            Start a draw
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {history.map((session) => {
            const expanded = expandedId === session.id;
            return (
              <li key={session.id} className="glass overflow-hidden border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : session.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-neutral-50 sm:p-6"
                >
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-neutral-900 sm:text-lg">
                      {session.winners.length} winner{session.winners.length !== 1 ? "s" : ""} drawn
                    </p>
                    <p className="mt-1 text-sm text-neutral-500">
                      {formatSessionDate(session.completedAt)} · {session.participants.length} participants
                    </p>
                  </div>
                  <svg
                    className={`h-5 w-5 shrink-0 text-neutral-400 transition-transform ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expanded && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4 sm:px-6 bg-neutral-50/50">
                    <ol className="space-y-2">
                      {session.winners.map((name, i) => (
                        <li
                          key={`${session.id}-${i}`}
                          className="flex items-center gap-3 rounded-lg bg-white border border-neutral-200 px-3 py-2.5 text-sm shadow-sm"
                        >
                          <span className="font-display flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-neutral-100 text-xs font-bold text-neutral-600">
                            {i + 1}
                          </span>
                          <span className="font-medium text-neutral-800">{name}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => downloadWinnersPdf(session.winners, session.participants.length)}
                        className="btn-primary !py-2 !px-4 !text-sm"
                      >
                        Download PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(session.id)}
                        className="btn-secondary !py-2 !px-4 !text-sm text-red-600 hover:bg-red-50 hover:border-red-200"
                      >
                        Delete Session
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
