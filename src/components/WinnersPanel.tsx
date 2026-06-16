type WinnersPanelProps = { winners: string[]; maxWinners: number; };

export default function WinnersPanel({ winners, maxWinners }: WinnersPanelProps) {
  const remaining = maxWinners - winners.length;

  return (
    <div
      className="flex max-h-[280px] flex-col p-4 sm:max-h-none sm:p-6 lg:h-full lg:max-h-[600px]"
      style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.35)",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(60px) saturate(220%)",
        WebkitBackdropFilter: "blur(60px) saturate(220%)",
        boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.80), inset 0 0 20px rgba(255,255,255,0.06), 0 24px 72px rgba(99,102,241,0.22), 0 4px 16px rgba(0,0,0,0.05)",
      }}
    >
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">Winners</h2>
        <span className="text-sm font-semibold text-slate-600">{winners.length}/{maxWinners}</span>
      </div>

      {winners.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-6 sm:py-0">
          <p className="text-center text-xs text-slate-600 sm:text-sm">Spin the wheel to draw winners…</p>
        </div>
      ) : (
        <ol className="flex-1 space-y-2 overflow-y-auto overscroll-contain">
          {winners.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="flex items-center gap-2.5 rounded-2xl px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3"
              style={{ background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.35)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.50)" }}
            >
              <span
                className="font-display flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm"
                style={i === 0
                  ? { background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.30)", color: "#b45309", boxShadow: "0 4px 12px rgba(245,158,11,0.20)" }
                  : { background: "rgba(255,255,255,0.40)", border: "1px solid rgba(255,255,255,0.55)", color: "#475569" }
                }
              >
                {i + 1}
              </span>
              <span className="font-display min-w-0 break-words text-sm font-bold tracking-tight text-slate-900 sm:text-base">{name}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="mt-3 pt-3 sm:mt-4 sm:pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.28)" }}>
        <p className="font-display text-sm font-semibold sm:text-base">
          {remaining > 0 ? (
            <><span className="text-indigo-600">{remaining}</span> <span className="text-slate-600">spin{remaining !== 1 ? "s" : ""} remaining</span></>
          ) : (
            <span className="text-emerald-600">All winners drawn!</span>
          )}
        </p>
      </div>
    </div>
  );
}
