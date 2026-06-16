"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";

const navLinks = [
  { href: "/about",   label: "About"   },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq",     label: "FAQ"     },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav className="safe-px mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                pathname === link.href ? "text-indigo-600" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/upload" className="btn-secondary !px-4 !py-2 !text-sm">Sign in</Link>
          <Link href="/upload" className="btn-primary  !px-5 !py-2 !text-sm">Start Free</Link>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-white/40 md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="px-4 py-4 md:hidden"
          style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(64px) saturate(220%)",
          WebkitBackdropFilter: "blur(64px) saturate(220%)",
          borderTop: "1px solid rgba(255,255,255,0.32)",
          }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-white/20 text-indigo-600"
                    : "text-slate-600 hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/upload" onClick={() => setOpen(false)} className="btn-primary mt-2 text-center">
              Start Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
