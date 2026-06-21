"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { setNerakarEnabled } from "@/lib/nerakar";
import Logo from "./Logo";

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
    return (
      <>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 backdrop-blur-sm"
        >
          {session.user.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={session.user.image} alt="" className="h-7 w-7 rounded-full ring-2 ring-white/40" />
          )}
          <span className="max-w-[120px] truncate text-sm font-medium text-white">
            {session.user.name}
          </span>
        </motion.div>
        <button
          type="button"
          onClick={() => {
            onNavigate?.();
            setNerakarEnabled(false);
            signOut({ callbackUrl: "/" });
          }}
          className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
        >
          Sign out
        </button>
        <Link
          href="/upload"
          onClick={onNavigate}
          className="rounded-full bg-white px-5 py-1.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-50 hover:shadow-md"
        >
          Start Free
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        onClick={onNavigate}
        className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
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
        className={`pointer-events-auto flex w-full max-w-5xl flex-col rounded-3xl border border-indigo-400/25 bg-gradient-to-r from-indigo-700 to-violet-700 p-2 shadow-[0_8px_28px_rgba(67,56,202,0.28)] backdrop-blur-xl transition-shadow duration-300 ${
          open ? "shadow-[0_16px_40px_-12px_rgba(67,56,202,0.35)]" : ""
        }`}
      >
        <nav className="flex items-center justify-between px-2 sm:px-4">
          <Logo variant="light" className="relative z-10 origin-left scale-90 sm:scale-100" priority />

          <div className="hidden items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-sm md:flex">
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
                      className="absolute inset-0 rounded-full border border-white/30 bg-white/20 shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {hoveredIndex === index && !isActive && (
                    <motion.div
                      layoutId="hover-nav-pill"
                      className="absolute inset-0 rounded-full bg-white/12"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "font-semibold text-white" : "text-white/80 hover:text-white"}`}>
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
            className="relative z-10 rounded-full p-2 text-white/90 transition-colors hover:bg-white/15 md:hidden"
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
              <div className="flex flex-col gap-1 rounded-2xl border border-white/15 bg-white/5 p-2 pt-4 backdrop-blur-sm">
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
                          ? "border border-white/30 bg-white/20 font-semibold text-white shadow-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
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
                  className="mt-2 flex flex-col gap-2 border-t border-white/25 pt-2"
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
