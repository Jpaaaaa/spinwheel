"use client";

import { useState } from "react";

type AccordionItem = { question: string; answer: string; };

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div
      style={{
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.30)",
        background: "rgba(255,255,255,0.13)",
        backdropFilter: "blur(40px) saturate(180%)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55), 0 20px 60px rgba(99,102,241,0.10)",
        overflow: "hidden",
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.22)" : undefined }}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/10 sm:px-6 sm:py-5"
            >
              <span className="text-sm font-medium text-slate-800 sm:text-base">{item.question}</span>
              <svg
                className={`h-5 w-5 shrink-0 text-indigo-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-slate-500 sm:px-6">{item.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
