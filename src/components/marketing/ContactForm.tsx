"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="p-8 text-center"
        style={{
          borderRadius: 20, border: "1px solid rgba(16,185,129,0.25)",
          background: "rgba(16,185,129,0.08)", backdropFilter: "blur(20px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.50)",
        }}
      >
        <p className="text-lg font-semibold text-emerald-700">Message sent!</p>
        <p className="mt-2 text-sm text-slate-500">Our team will get back to you within 1–2 business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
      {(["name", "email"] as const).map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium capitalize text-slate-700">{field}</label>
          <input
            id={field} name={field} required
            type={field === "email" ? "email" : "text"}
            className="glass-input mt-2 w-full px-4 py-3 text-sm"
          />
        </div>
      ))}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
        <textarea id="message" name="message" rows={5} required className="glass-input mt-2 w-full resize-y px-4 py-3 text-sm" />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">Send message</button>
    </form>
  );
}
