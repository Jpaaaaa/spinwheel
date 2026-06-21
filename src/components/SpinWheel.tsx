"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  WHEEL_COLORS,
  computeTargetRotation,
  easeOutCubic,
  findNameIndex,
  getSliceAngle,
  truncate,
} from "@/lib/wheel";
import { SpinLoadingIcon } from "@/components/SpinLoading";

type SpinWheelProps = {
  names: string[];
  maxWinners: number;
  winnersCount: number;
  onSpinComplete: (winner: string) => void;
  spinning: boolean;
  onSpinStart: () => void;
  forcedWinner?: string;
};

function getFontSize(nameCount: number, wheelSize: number): number {
  if (wheelSize < 280) return nameCount > 16 ? 9 : nameCount > 10 ? 10 : 11;
  if (wheelSize < 360) return nameCount > 20 ? 10 : nameCount > 12 ? 11 : 12;
  return nameCount > 20 ? 11 : nameCount > 12 ? 12 : 14;
}

function getMaxLabelLength(nameCount: number, wheelSize: number): number {
  if (wheelSize < 280) return nameCount > 16 ? 8 : 10;
  if (wheelSize < 360) return nameCount > 20 ? 10 : nameCount > 12 ? 14 : 16;
  return nameCount > 20 ? 12 : nameCount > 12 ? 16 : 20;
}

export default function SpinWheel({
  names,
  maxWinners,
  winnersCount,
  onSpinComplete,
  spinning,
  onSpinStart,
  forcedWinner,
}: SpinWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const prevNameCountRef = useRef(names.length);
  const [size, setSize] = useState(280);

  const drawWheel = useCallback(
    (rotation: number, highlightIndex: number | null = null) => {
      const canvas = canvasRef.current;
      if (!canvas || names.length === 0) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const center = size / 2;
      const radius = center - (size < 320 ? 6 : 8);
      const sliceAngle = getSliceAngle(names.length);
      const fontSize = getFontSize(names.length, size);
      const maxLen = getMaxLabelLength(names.length, size);
      const hubRadius = size < 320 ? 14 : 18;

      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(rotation);

      for (let i = 0; i < names.length; i++) {
        const start = i * sliceAngle;
        const isWinner = highlightIndex === i;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, start, start + sliceAngle);
        ctx.closePath();

        ctx.fillStyle = isWinner ? "#fbbf24" : WHEEL_COLORS[i % WHEEL_COLORS.length];
        ctx.fill();

        ctx.strokeStyle = isWinner ? "#f59e0b" : "#ffffff";
        ctx.lineWidth = isWinner ? (size < 320 ? 3 : 4) : size < 320 ? 1.5 : 2;
        ctx.stroke();

        ctx.save();
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        ctx.font = `600 ${fontSize}px system-ui, sans-serif`;

        const labelRadius = radius - (size < 320 ? 14 : 20);
        ctx.fillText(truncate(names[i], maxLen), labelRadius, 0);
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, hubRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#0f172a";
      ctx.fill();
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = size < 320 ? 2 : 3;
      ctx.stroke();

      ctx.restore();
    },
    [names, size]
  );

  useEffect(() => {
    drawWheel(rotationRef.current);
  }, [drawWheel]);

  // Reset rotation when a winner leaves the wheel so slices don't jump awkwardly
  useEffect(() => {
    if (names.length !== prevNameCountRef.current) {
      rotationRef.current = 0;
      prevNameCountRef.current = names.length;
      drawWheel(0);
    }
  }, [names.length, drawWheel]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const width = container.clientWidth;
      const maxSize = width > 0 ? width : 280;
      setSize(Math.max(220, Math.min(maxSize, 520)));
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const spin = useCallback(() => {
    if (spinning || names.length === 0) return;

    onSpinStart();

    const matchedIndex = forcedWinner ? findNameIndex(names, forcedWinner) : -1;
    const winnerIndex =
      matchedIndex >= 0 ? matchedIndex : Math.floor(Math.random() * names.length);
    const winnerName = names[winnerIndex];

    const from = rotationRef.current;
    const to = computeTargetRotation(from, winnerIndex, names.length);
    const duration = 4000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(t);
      rotationRef.current = from + (to - from) * eased;
      drawWheel(rotationRef.current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        rotationRef.current = to;
        drawWheel(to, winnerIndex);
        onSpinComplete(winnerName);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [spinning, names, forcedWinner, onSpinStart, onSpinComplete, drawWheel]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="flex w-full max-w-[520px] flex-col items-center gap-5 sm:gap-6 md:gap-8">
      <div ref={containerRef} className="relative w-full">
        <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-0.5 sm:-translate-y-1">
          <div
            className="h-0 w-0 sm:border-l-[14px] sm:border-r-[14px] sm:border-t-[24px]"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "18px solid #4f46e5", /* Solid indigo arrow */
              filter: "drop-shadow(0 4px 6px rgba(79,70,229,0.4))",
            }}
          />
        </div>

        <div
          className="mx-auto w-full max-w-full p-1 sm:p-2"
          style={{
            borderRadius: "9999px",
            border: "2px solid #c7d2fe",
            background: "transparent",
            boxShadow: "0 8px 32px -8px rgba(79, 70, 229, 0.2)",
          }}
        >
          <canvas ref={canvasRef} className="mx-auto block max-w-full rounded-full" />
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning || winnersCount >= maxWinners || names.length === 0}
        className="btn-primary w-full max-w-[280px] !py-4 !text-xl font-bold uppercase tracking-widest sm:max-w-[220px] sm:!py-5 sm:!text-2xl"
      >
        {spinning ? (
          <>
            <SpinLoadingIcon className="h-6 w-6" />
            Spinning…
          </>
        ) : (
          "Spin"
        )}
      </button>
    </div>
  );
}
