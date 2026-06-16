import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 20px rgba(99,102,241,0.45)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <svg className="h-5 w-5 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v9l6 3" strokeLinecap="round" />
        </svg>
      </div>
      <span className="font-display text-xl font-extrabold tracking-tight text-slate-900" style={{ letterSpacing: "-0.03em" }}>
        Spin<span className="text-gradient">Draw</span>
      </span>
    </Link>
  );
}
