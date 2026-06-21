import fs from "fs/promises";
import path from "path";

export type NerakarSettings = {
  enabled: boolean;
  queue: string[];
};

type NerakarStore = Record<string, NerakarSettings>;

const STORE_PATH = path.join(process.cwd(), "data", "nerakar-store.json");

const DEFAULT_SETTINGS: NerakarSettings = { enabled: false, queue: [] };

async function readStore(): Promise<NerakarStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as NerakarStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeStore(store: NerakarStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

function normalizeSettings(settings: NerakarSettings): NerakarSettings {
  return {
    enabled: Boolean(settings.enabled),
    queue: Array.isArray(settings.queue)
      ? settings.queue.filter((name) => typeof name === "string" && name.trim()).map((n) => n.trim())
      : [],
  };
}

export async function getNerakarForUser(email: string): Promise<NerakarSettings> {
  const store = await readStore();
  const saved = store[email.toLowerCase()];
  return saved ? normalizeSettings(saved) : DEFAULT_SETTINGS;
}

export async function saveNerakarForUser(email: string, settings: NerakarSettings): Promise<NerakarSettings> {
  const store = await readStore();
  const normalized = normalizeSettings(settings);
  store[email.toLowerCase()] = normalized;
  await writeStore(store);
  return normalized;
}
