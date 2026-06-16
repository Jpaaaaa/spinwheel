"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
        <p className="text-slate-600">Loading…</p>
      </div>
    );
  }

  return (
    <div className="safe-px safe-pb mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="section-title">Draw History</h1>
          <p className="section-subtitle">Completed raffle sessions saved on this device</p>
        </div>
        {history.length > 0 && (
          <button type="button" onClick={handleClearAll} className="btn-secondary !py-2 !px-4 !text-sm">
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="glass mt-10 p-8 text-center">
          <p className="text-base font-medium text-slate-700">No completed draws yet</p>
          <p className="mt-2 text-sm text-slate-600">
            Finish a spin session and it will appear here automatically.
          </p>
          <Link href="/upload" className="btn-primary mt-6 inline-flex">
            Start a draw
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {history.map((session) => {
            const expanded = expandedId === session.id;
            return (
              <li key={session.id} className="glass overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : session.id)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-white/10 sm:p-6"
                >
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-slate-900 sm:text-lg">
                      {session.winners.length} winner{session.winners.length !== 1 ? "s" : ""} drawn
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {formatSessionDate(session.completedAt)} · {session.participants.length} participants
                    </p>
                  </div>
                  <svg
                    className={`h-5 w-5 shrink-0 text-indigo-500 transition-transform ${expanded ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expanded && (
                  <div className="border-t border-white/25 px-5 pb-5 pt-4 sm:px-6">
                    <ol className="space-y-2">
                      {session.winners.map((name, i) => (
                        <li
                          key={`${session.id}-${i}`}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm"
                          style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.30)" }}
                        >
                          <span className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-xs font-bold text-indigo-600">
                            {i + 1}
                          </span>
                          <span className="font-medium text-slate-800">{name}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-4 flex flex-wrap gap-2">
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
                        className="btn-secondary !py-2 !px-4 !text-sm text-red-600"
                      >
                        Delete
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
