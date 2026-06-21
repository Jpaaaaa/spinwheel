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
  const [localOnly, setLocalOnly] = useState(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const admin = isAdmin(session?.user?.email);

  useEffect(() => {
    if (status === "loading") return;

    if (!admin) {
      clearNerakarIfUnauthorized(session?.user?.email);
      setEnabled(false);
      setNamesText("");
      setSyncError(null);
      setLocalOnly(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setSyncError(null);
      setLocalOnly(false);

      const result = await fetchNerakarSettings();
      if (cancelled) return;

      if (result.settings) {
        setEnabled(result.settings.enabled);
        setNamesText(result.settings.queue.join("\n"));
      }

      if (!result.ok) {
        setSyncError(result.error ?? "Could not load NERAKAR from your account.");
        setLocalOnly(Boolean(result.localOnly));
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
      const result = await persistNerakarSettings({
        enabled: nextEnabled,
        queue: parseNerakarNames(text),
      });

      if (!result.ok) {
        setSyncError(result.error ?? "Could not save NERAKAR to your account.");
        setLocalOnly(Boolean(result.localOnly));
        return;
      }

      setSyncError(null);
      setLocalOnly(false);
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
        <div className="max-w-sm rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center">
          <p className="text-xs font-semibold text-red-800">Sync issue</p>
          <p className="mt-1 text-xs leading-relaxed text-red-700">{syncError}</p>
          {localOnly && (
            <p className="mt-2 text-[11px] leading-relaxed text-red-600/90">
              Changes are kept on this device only until cloud storage is connected.
            </p>
          )}
        </div>
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
