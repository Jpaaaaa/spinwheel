import fs from "fs/promises";
import path from "path";
import { Redis } from "@upstash/redis";

export type NerakarSettings = {
  enabled: boolean;
  queue: string[];
};

type NerakarStore = Record<string, NerakarSettings>;

const STORE_PATH = path.join(process.cwd(), "data", "nerakar-store.json");
const DEFAULT_SETTINGS: NerakarSettings = { enabled: false, queue: [] };

let redisClient: Redis | null = null;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  if (!redisClient) {
    redisClient = new Redis({ url, token });
  }
  return redisClient;
}

function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

function redisKey(email: string): string {
  return `nerakar:${email.toLowerCase()}`;
}

function normalizeSettings(settings: NerakarSettings): NerakarSettings {
  return {
    enabled: Boolean(settings.enabled),
    queue: Array.isArray(settings.queue)
      ? settings.queue
          .filter((name) => typeof name === "string" && name.trim())
          .map((n) => n.trim())
      : [],
  };
}

async function readFileStore(): Promise<NerakarStore> {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as NerakarStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeFileStore(store: NerakarStore): Promise<void> {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

function assertStorageAvailable(): void {
  if (getRedis()) return;
  if (!isVercel()) return;
  throw new Error(
    "NERAKAR storage is not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your Vercel project."
  );
}

export async function getNerakarForUser(email: string): Promise<NerakarSettings> {
  assertStorageAvailable();

  const redis = getRedis();
  if (redis) {
    const saved = await redis.get<NerakarSettings>(redisKey(email));
    return saved ? normalizeSettings(saved) : DEFAULT_SETTINGS;
  }

  const store = await readFileStore();
  const saved = store[email.toLowerCase()];
  return saved ? normalizeSettings(saved) : DEFAULT_SETTINGS;
}

export async function saveNerakarForUser(
  email: string,
  settings: NerakarSettings
): Promise<NerakarSettings> {
  assertStorageAvailable();

  const normalized = normalizeSettings(settings);
  const redis = getRedis();

  if (redis) {
    await redis.set(redisKey(email), normalized);
    return normalized;
  }

  const store = await readFileStore();
  store[email.toLowerCase()] = normalized;
  await writeFileStore(store);
  return normalized;
}
