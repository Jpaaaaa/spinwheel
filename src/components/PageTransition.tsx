"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SpinLoading from "@/components/SpinLoading";

const TRANSITION_MS = 2000;

function isInternalNavigation(href: string, pathname: string): boolean {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return false;
  }
  const target = href.split("?")[0].split("#")[0];
  return target !== pathname;
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const prevPath = useRef(pathname);
  const navStart = useRef<number | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishAfterDelay = (startedAt: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    const elapsed = Date.now() - startedAt;
    const remaining = Math.max(0, TRANSITION_MS - elapsed);
    hideTimer.current = setTimeout(() => {
      setLoading(false);
      navStart.current = null;
      hideTimer.current = null;
    }, remaining);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !isInternalNavigation(href, pathname)) return;

      navStart.current = Date.now();
      setLoading(true);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (prevPath.current === pathname) return;

    setLoading(true);
    const startedAt = navStart.current ?? Date.now();
    navStart.current = startedAt;
    finishAfterDelay(startedAt);
    prevPath.current = pathname;

    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [pathname]);

  return (
    <>
      {children}
      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/85 backdrop-blur-sm">
          <SpinLoading label="Loading…" className="h-14 w-14" />
        </div>
      )}
    </>
  );
}
