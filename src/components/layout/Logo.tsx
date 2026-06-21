import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME, LOGO_PATH } from "@/lib/brand";

type LogoProps = {
  className?: string;
  priority?: boolean;
  showText?: boolean;
  variant?: "default" | "light";
};

export default function Logo({
  className = "",
  priority = false,
  showText = true,
  variant = "default",
}: LogoProps) {
  const textClass = variant === "light" ? "text-white" : "text-neutral-900";
  const accentClass = variant === "light" ? "text-indigo-200" : "text-indigo-600";
  return (
    <Link href="/" className={`inline-flex shrink-0 items-center gap-2.5 bg-transparent ${className}`}>
      <Image
        src={LOGO_PATH}
        alt={showText ? "" : BRAND_NAME}
        width={40}
        height={40}
        priority={priority}
        unoptimized
        aria-hidden={showText}
        className="h-9 w-9 bg-transparent object-contain sm:h-10 sm:w-10"
      />
      {showText && (
        <span
          className={`font-display text-lg font-bold tracking-tight sm:text-xl ${textClass}`}
          style={{ letterSpacing: "-0.04em" }}
        >
          Draw<span className={accentClass}> Master</span>
        </span>
      )}
    </Link>
  );
}
