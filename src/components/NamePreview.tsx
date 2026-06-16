type NamePreviewProps = { names: string[]; };

export default function NamePreview({ names }: NamePreviewProps) {
  if (names.length === 0) return null;

  return (
    <div className="glass p-4 sm:p-6">
      <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">Participants</h2>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-semibold text-indigo-600 sm:px-3 sm:text-sm"
          style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.20)" }}
        >
          {names.length} loaded
        </span>
      </div>

      <div
        className="max-h-48 overflow-y-auto rounded-2xl sm:max-h-64"
        style={{ background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.30)" }}
      >
        <ul className="divide-y divide-white/20">
          {names.map((name, i) => (
            <li key={`${name}-${i}`} className="flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-sm">
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-medium text-slate-500 sm:h-6 sm:w-6 sm:text-xs"
                style={{ background: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.55)" }}
              >
                {i + 1}
              </span>
              <span className="min-w-0 break-words text-slate-700">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
