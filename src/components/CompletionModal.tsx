"use client";

import Link from "next/link";
type CompletionModalProps = {
  open: boolean;
  winners: string[];
  totalParticipants: number;
  onDownload: () => void;
  onClose: () => void;
};

export default function CompletionModal({
  open,
  winners,
  totalParticipants,
  onDownload,
  onClose,
}: CompletionModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="completion-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="glass-strong relative w-full max-w-md p-6 sm:p-8">
        <div className="text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
            style={{
              background: "linear-gradient(135deg,#6366f1,#7c3aed)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px rgba(99,102,241,0.40)",
            }}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>

          <h2
            id="completion-modal-title"
            className="font-display text-2xl font-extrabold tracking-tight text-slate-900"
          >
            All winners drawn!
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {winners.length} winner{winners.length !== 1 ? "s" : ""} selected from{" "}
            {totalParticipants} participant{totalParticipants !== 1 ? "s" : ""}.
          </p>
        </div>

        <p className="mt-6 text-center text-sm font-medium text-slate-700">
          Saved to your draw history. Download results as PDF?
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button type="button" onClick={onDownload} className="btn-primary w-full !py-3">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3" />
            </svg>
            Download PDF
          </button>
          <Link href="/history" onClick={onClose} className="btn-secondary w-full !py-3">
            View history
          </Link>
          <button type="button" onClick={onClose} className="btn-secondary w-full !py-3">
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
