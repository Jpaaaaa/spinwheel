"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { SpinLoadingIcon } from "@/components/SpinLoading";
import { downloadParticipantsTemplate } from "@/lib/downloadTemplate";
import { parseNamesFromExcel } from "@/lib/parseExcel";

type FileUploadProps = {
  onNamesLoaded: (names: string[]) => void;
  locked?: boolean;
};

export default function FileUpload({ onNamesLoaded, locked = false }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (locked) return;
    if (!file.name.endsWith(".xlsx")) {
      setError("Please upload an Excel file (.xlsx)");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const names = await parseNamesFromExcel(file);
      if (names.length === 0) {
        setError("No names found in the first column.");
        return;
      }
      onNamesLoaded(names);
    } catch {
      setError("Failed to read the Excel file. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [locked, onNamesLoaded]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      if (locked) return;
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [locked, processFile]
  );

  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (locked) return;
    downloadParticipantsTemplate();
  };

  return (
    <div className="relative flex flex-col gap-3">
      <div
        onDragOver={(e) => {
          if (locked) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => !locked && inputRef.current?.click()}
        className={`p-6 text-center transition-all sm:p-8 md:p-12 ${
          locked ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        }`}
        style={{
          borderRadius: 20,
          border: dragging
            ? "2px solid rgba(99,102,241,0.6)"
            : locked
              ? "2px dashed rgba(99,102,241,0.35)"
              : "2px dashed rgba(255,255,255,0.38)",
          background: dragging
            ? "rgba(99,102,241,0.10)"
            : locked
              ? "rgba(238,242,255,0.85)"
              : "rgba(255,255,255,0.07)",
          backdropFilter: "blur(60px) saturate(220%)",
          WebkitBackdropFilter: "blur(60px) saturate(220%)",
          boxShadow: dragging
            ? "inset 0 1.5px 0 rgba(255,255,255,0.80), 0 0 48px rgba(99,102,241,0.30)"
            : "inset 0 1.5px 0 rgba(255,255,255,0.80), inset 0 0 20px rgba(255,255,255,0.05), 0 10px 32px rgba(99,102,241,0.14)",
          transition: "all 0.2s ease",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx"
          className="hidden"
          disabled={locked}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) processFile(f);
          }}
        />

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
          style={{
            background: "rgba(255,255,255,0.30)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 16px rgba(99,102,241,0.15)",
          }}
        >
          {loading ? (
            <SpinLoadingIcon className="h-8 w-8 sm:h-9 sm:w-9" />
          ) : (
            <svg className="h-7 w-7 text-indigo-600 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          )}
        </div>

        <p className="text-base font-semibold text-slate-900 sm:text-lg">
          {locked ? "Excel upload" : loading ? "Reading file…" : "Upload participant list"}
        </p>
        {locked ? (
          <p className="mt-2 text-xs text-indigo-700 sm:text-sm">
            Premium users only — upgrade to import .xlsx files
          </p>
        ) : (
          <>
            <p className="mt-2 text-xs text-slate-600 sm:text-sm">Drag & drop your .xlsx file here, or tap to browse</p>
            <p className="mt-1 text-[11px] text-slate-600">Names should be in the first column</p>
          </>
        )}

        {error && !locked && (
          <p
            className="mt-4 rounded-xl px-3 py-2 text-xs text-red-600 sm:text-sm"
            style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.20)" }}
          >
            {error}
          </p>
        )}
      </div>

      {locked && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-center">
          <span className="badge-glass !text-[10px]">Premium only</span>
          <p className="text-sm text-indigo-900">
            Free accounts can add names manually. Excel import unlocks with Premium.
          </p>
          <Link href="/pricing" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
            View pricing →
          </Link>
        </div>
      )}

      <button
        type="button"
        onClick={handleDownloadTemplate}
        disabled={locked}
        className="btn-secondary w-full !py-3 text-sm sm:!text-base disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3" />
        </svg>
        Download Template
      </button>
      {!locked && (
        <p className="text-center text-xs text-slate-600 sm:text-sm">
          Download → fill names in Excel → save → upload back here
        </p>
      )}
    </div>
  );
}
