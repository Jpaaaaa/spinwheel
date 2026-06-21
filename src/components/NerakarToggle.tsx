"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { isAdmin } from "@/lib/auth";
import {
  clearNerakarIfUnauthorized,
  fetchNerakarSettings,
  parseNerakarNames,
  persistNerakarSettings,
} from "@/lib/nerakar";

export default function NerakarToggle() {
  const { data: session, status } = useSession();
  const [enabled, setEnabled] = useState(false);
  const [namesText, setNamesText] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const admin = isAdmin(session?.user?.email);

  useEffect(() => {
    if (status === "loading") return;

    if (!admin) {
      clearNerakarIfUnauthorized(session?.user?.email);
      setEnabled(false);
      setNamesText("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setSyncError(null);
      const settings = await fetchNerakarSettings();
      if (cancelled) return;

      if (settings) {
        setEnabled(settings.enabled);
        setNamesText(settings.queue.join("\n"));
      } else {
        setSyncError("Could not load NERAKAR from your account.");
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [admin, session?.user?.email, status]);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  if (status === "loading" || !admin) return null;

  const queueFromText = () => parseNerakarNames(namesText);

  const saveSettings = (nextEnabled: boolean, text: string) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(async () => {
      const ok = await persistNerakarSettings({
        enabled: nextEnabled,
        queue: parseNerakarNames(text),
      });
      if (!ok) setSyncError("Could not save NERAKAR to your account.");
      else setSyncError(null);
    }, 400);
  };

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    saveSettings(checked, namesText);
  };

  const handleNamesChange = (value: string) => {
    setNamesText(value);
    saveSettings(enabled, value);
  };

  return (
    <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold tracking-wide text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50">
        <input
          type="checkbox"
          checked={enabled}
          disabled={loading}
          onChange={(e) => handleToggle(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 accent-indigo-600"
        />
        NERAKAR
      </label>

      <textarea
        value={namesText}
        disabled={loading}
        onChange={(e) => handleNamesChange(e.target.value)}
        placeholder="Winner names (one per line). Synced to your admin account."
        rows={3}
        className="glass-input w-full max-w-sm resize-none px-4 py-3 text-sm text-neutral-700 disabled:opacity-60"
      />

      {loading && (
        <p className="text-xs text-neutral-500">Loading your saved names…</p>
      )}
      {syncError && (
        <p className="max-w-sm text-center text-xs text-red-600">{syncError}</p>
      )}
      {!loading && !syncError && queueFromText().length > 0 && (
        <p className="max-w-sm text-center text-xs text-neutral-500">
          Saved to your account — available on any device when you sign in.
        </p>
      )}
      <p className="max-w-sm text-center text-xs text-neutral-500">
        Uncheck NERAKAR to pause rigging without deleting names.
      </p>
    </div>
  );
}
