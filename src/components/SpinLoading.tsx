type SpinLoadingProps = {
  className?: string;
  label?: string;
};

export function SpinLoadingIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className}`}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="28" stroke="#e0e7ff" strokeWidth="4" />
      <path
        d="M32 32 L32 4 A28 28 0 0 1 51.8 46.8 Z"
        fill="#6366f1"
      />
      <path
        d="M32 32 L51.8 46.8 A28 28 0 0 1 12.2 46.8 Z"
        fill="#818cf8"
      />
      <path
        d="M32 32 L12.2 46.8 A28 28 0 0 1 12.2 17.2 Z"
        fill="#4f46e5"
      />
      <path
        d="M32 32 L12.2 17.2 A28 28 0 0 1 32 4 Z"
        fill="#a5b4fc"
      />
      <circle cx="32" cy="32" r="8" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
      <circle cx="32" cy="32" r="3" fill="#6366f1" />
    </svg>
  );
}

export default function SpinLoading({ className, label }: SpinLoadingProps) {
  return (
    <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
      <SpinLoadingIcon className={className ?? "h-12 w-12"} />
      {label && <p className="text-sm font-medium text-neutral-500">{label}</p>}
      {!label && <span className="sr-only">Loading</span>}
    </div>
  );
}
