"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { isAdmin } from "@/lib/auth";
import {
  clearNerakarIfUnauthorized,
  isNerakarEnabled,
  loadNerakarQueue,
  parseNerakarNames,
  saveNerakarQueue,
  setNerakarEnabled,
} from "@/lib/nerakar";

export default function NerakarToggle() {
  const { data: session, status } = useSession();
  const [enabled, setEnabled] = useState(false);
  const [namesText, setNamesText] = useState("");

  const admin = isAdmin(session?.user?.email);

  useEffect(() => {
    if (status === "loading") return;

    if (!admin) {
      clearNerakarIfUnauthorized(session?.user?.email);
      setEnabled(false);
      setNamesText("");
      return;
    }

    const on = isNerakarEnabled();
    setEnabled(on);
    if (on) setNamesText(loadNerakarQueue().join("\n"));
  }, [admin, session?.user?.email, status]);

  if (status === "loading" || !admin) return null;

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    setNerakarEnabled(checked);
    if (!checked) {
      setNamesText("");
    } else if (namesText) {
      saveNerakarQueue(parseNerakarNames(namesText));
    }
  };

  const handleNamesChange = (value: string) => {
    setNamesText(value);
    saveNerakarQueue(parseNerakarNames(value));
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => handleToggle(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 accent-indigo-600"
        />
        NERAKAR
      </label>

      {enabled && (
        <textarea
          value={namesText}
          onChange={(e) => handleNamesChange(e.target.value)}
          placeholder="Winner name for next session (one per line for multiple spins)"
          rows={3}
          className="glass-input w-full max-w-sm resize-none px-4 py-3 text-sm text-neutral-700"
        />
      )}
    </div>
  );
}
