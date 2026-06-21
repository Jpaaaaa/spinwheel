"use client";

import { useCallback, useRef, useState } from "react";
import { SpinLoadingIcon } from "@/components/SpinLoading";
import { downloadParticipantsTemplate } from "@/lib/downloadTemplate";
import { parseNamesFromExcel } from "@/lib/parseExcel";

type FileUploadProps = {
  onNamesLoaded: (names: string[]) => void;
};

export default function FileUpload({ onNamesLoaded }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.endsWith(".xlsx")) { setError("Please upload an Excel file (.xlsx)"); return; }
    setLoading(true); setError(null);
    try {
      const names = await parseNamesFromExcel(file);
      if (names.length === 0) { setError("No names found in the first column."); return; }
      onNamesLoaded(names);
    } catch { setError("Failed to read the Excel file. Please try again."); }
    finally   { setLoading(false); }
  }, [onNamesLoaded]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleDownloadTemplate = (e: React.MouseEvent) => {
    e.stopPropagation();
    downloadParticipantsTemplate();
  };

  return (
    <div className="flex flex-col gap-3">
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer p-6 text-center transition-all sm:p-8 md:p-12"
      style={{
        borderRadius: 20,
        border: dragging ? "2px solid rgba(99,102,241,0.6)" : "2px dashed rgba(255,255,255,0.38)",
        background: dragging ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.07)",
        backdropFilter: "blur(60px) saturate(220%)",
        WebkitBackdropFilter: "blur(60px) saturate(220%)",
        boxShadow: dragging
          ? "inset 0 1.5px 0 rgba(255,255,255,0.80), 0 0 48px rgba(99,102,241,0.30)"
          : "inset 0 1.5px 0 rgba(255,255,255,0.80), inset 0 0 20px rgba(255,255,255,0.05), 0 10px 32px rgba(99,102,241,0.14)",
        transition: "all 0.2s ease",
      }}
    >
      <input ref={inputRef} type="file" accept=".xlsx" className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />

      <div
        className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl sm:h-16 sm:w-16"
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
        {loading ? "Reading file…" : "Upload participant list"}
      </p>
      <p className="mt-2 text-xs text-slate-600 sm:text-sm">Drag & drop your .xlsx file here, or tap to browse</p>
      <p className="mt-1 text-[11px] text-slate-600">Names should be in the first column</p>

      {error && (
        <p className="mt-4 rounded-xl px-3 py-2 text-xs text-red-600 sm:text-sm"
          style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.20)" }}>
          {error}
        </p>
      )}
    </div>

    <button
      type="button"
      onClick={handleDownloadTemplate}
      className="btn-secondary w-full !py-3 text-sm sm:!text-base"
    >
      <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12M12 16.5V3" />
      </svg>
      Download Template
    </button>
    <p className="text-center text-xs text-slate-600 sm:text-sm">
      Download → fill names in Excel → save → upload back here
    </p>
    </div>
  );
}
