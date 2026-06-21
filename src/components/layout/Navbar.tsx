"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getAccountTier } from "@/lib/auth";
import { setNerakarEnabled } from "@/lib/nerakar";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";

const navLinks = [
  { href: "/about",   label: "About"   },
  { href: "/history", label: "History" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq",     label: "FAQ"     },
  { href: "/contact", label: "Contact" },
];

function AuthButtons({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session } = useSession();

  if (session?.user) {
    const tier = getAccountTier(session.user.email);
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 rounded-full border border-indigo-200/60 bg-white/60 px-3 py-1.5"
        >
          <UserAvatar name={session.user.name} image={session.user.image} />
          <div className="min-w-0">
            <span className="block max-w-[120px] truncate text-sm font-medium leading-tight text-neutral-800">
              {session.user.name}
            </span>
            <span
              className={`block text-[10px] font-semibold leading-tight ${
                tier === "Premium" ? "text-indigo-600" : "text-neutral-500"
              }`}
            >
              {tier}
            </span>
          </div>
        </motion.div>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            setNerakarEnabled(false);
            signOut({ callbackUrl: "/" });
          }}
          className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-indigo-800/75 transition-colors hover:bg-white/50 hover:text-indigo-950"
        >
          Sign out
        </button>
        <Link
          href="/upload"
          onClick={onNavigate}
          className="rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-50 hover:shadow-md"
        >
          Start Draw
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-indigo-800/75 transition-colors hover:bg-white/50 hover:text-indigo-950"
      >
        Sign in
      </Link>
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-50 hover:shadow-md"
      >
        Start Free
      </Link>
    </>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const closeMenu = () => setOpen(false);

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`pointer-events-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-indigo-200/45 bg-gradient-to-r from-white from-[25%] via-indigo-50 via-[48%] via-violet-200 via-[75%] to-indigo-300 p-2 shadow-[0_8px_28px_rgba(99,102,241,0.12)] backdrop-blur-xl transition-shadow duration-300 ${
          open ? "shadow-[0_16px_40px_-12px_rgba(99,102,241,0.16)]" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-2 sm:px-4">
          <Logo className="relative z-10 origin-left scale-90 sm:scale-100" priority />

          <div className="hidden items-center gap-1 rounded-full border border-indigo-200/50 bg-white/45 p-1 backdrop-blur-sm md:flex">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full border border-indigo-200/60 bg-white/80 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {hoveredIndex === index && !isActive && (
                    <motion.div
                      layoutId="hover-nav-pill"
                      className="absolute inset-0 rounded-full bg-indigo-100/50"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "font-semibold text-indigo-800" : "text-indigo-700/70 hover:text-indigo-900"}`}>
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <AuthButtons />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => setOpen(!open)}
            className="relative z-10 rounded-full p-2 text-indigo-700/75 transition-colors hover:bg-white/50 md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </motion.button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 rounded-2xl border border-indigo-200/40 bg-gradient-to-br from-white/70 via-indigo-50/80 to-violet-100/70 p-2 pt-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
                        pathname === link.href
                          ? "border border-indigo-200/60 bg-white/80 font-semibold text-indigo-800 shadow-sm"
                          : "text-indigo-700/70 hover:bg-indigo-100/40 hover:text-indigo-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 flex flex-col gap-2 border-t border-indigo-200/40 pt-2"
                >
                  <AuthButtons onNavigate={closeMenu} />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
