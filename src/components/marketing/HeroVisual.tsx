"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { LOGO_PATH, BRAND_NAME } from "@/lib/brand";

const participants = [
  { name: "Mike Anderson", initials: "MA" },
  { name: "Emma Williams", initials: "EW" },
  { name: "John Davis", initials: "JD" },
  { name: "Lisa Brown", initials: "LB" },
];

export default function HeroVisual() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const handleSpin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    const extraTurns = 1440 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + extraTurns);
    window.setTimeout(() => setSpinning(false), 2600);
  }, [spinning]);

  return (
    <div className="relative mx-auto flex w-full max-w-lg items-center justify-center lg:max-w-none">
      {/* Confetti */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute h-2 w-2 rounded-sm bg-indigo-400/60"
            style={{
              top: `${10 + (i * 11) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </div>

      {/* Winner card */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="pointer-events-none absolute -right-2 top-0 z-20 w-52 rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_20px_50px_-12px_rgba(79,70,229,0.25)] sm:right-4 sm:w-56"
      >
        <p className="text-xs font-semibold text-indigo-600">Winner Selected!</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
            SJ
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-900">Sarah Johnson</p>
            <p className="text-xs text-neutral-500">Premium Headphones</p>
          </div>
        </div>
      </motion.div>

      {/* Wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        className="relative z-10"
      >
        <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]">
          <motion.button
            type="button"
            onClick={handleSpin}
            disabled={spinning}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            animate={{ rotate: rotation }}
            transition={{ duration: 2.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative h-full w-full cursor-pointer rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-wait"
            style={{ transformOrigin: "center center" }}
            aria-label="Spin the wheel"
          >
            <div
              className="relative h-full w-full rounded-full"
              style={{
                background: `conic-gradient(
                  from 0deg,
                  #6366f1 0deg 45deg,
                  #818cf8 45deg 90deg,
                  #4f46e5 90deg 135deg,
                  #a5b4fc 135deg 180deg,
                  #6366f1 180deg 225deg,
                  #818cf8 225deg 270deg,
                  #4f46e5 270deg 315deg,
                  #a5b4fc 315deg 360deg
                )`,
                boxShadow:
                  "0 30px 80px -20px rgba(79, 70, 229, 0.45), inset 0 0 0 8px rgba(255,255,255,0.15)",
              }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <div
                  key={deg}
                  className="absolute left-1/2 top-1/2 h-1/2 w-6 origin-bottom -translate-x-1/2 text-white/90"
                  style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
                >
                  <span className="block text-lg" style={{ transform: `rotate(${-deg}deg)` }}>
                    {deg % 90 === 0 ? "🎁" : "✦"}
                  </span>
                </div>
              ))}

              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-indigo-200/90 shadow-sm"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 30}deg) translateY(-144px) translateX(-50%)`,
                  }}
                />
              ))}
            </div>
          </motion.button>

          {/* Fixed center hub */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-white/80 sm:h-[4.5rem] sm:w-[4.5rem] sm:ring-[5px]"
          >
            <Image
              src={LOGO_PATH}
              alt={BRAND_NAME}
              width={48}
              height={48}
              unoptimized
              className="h-8 w-auto bg-transparent sm:h-10"
            />
          </div>
        </div>

        {/* Stand */}
        <div className="pointer-events-none mx-auto -mt-2 h-16 w-32 rounded-b-3xl bg-gradient-to-b from-indigo-700 to-indigo-900 shadow-xl sm:w-36" />
      </motion.div>

      {/* Participants card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="pointer-events-none absolute -bottom-4 -left-2 z-20 w-56 rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] sm:-left-4 sm:w-60"
      >
        <p className="text-xs font-semibold text-neutral-900">Recent Participants</p>
        <ul className="mt-3 space-y-2.5">
          {participants.map((p) => (
            <li key={p.name} className="flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-[10px] font-bold text-neutral-600">
                  {p.initials}
                </div>
                <span className="truncate text-xs font-medium text-neutral-700">{p.name}</span>
              </div>
              <svg className="h-4 w-4 shrink-0 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
