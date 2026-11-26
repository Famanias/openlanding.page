import { randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { dailyIpHash } from "./votes/runtime";
import { privateHeaders, voteError } from "./votes/http";

export const DOWNLOADS_KEY = "downloads:counts";

export interface DownloadStore {
  counts(slugs: string[]): Promise<Record<string, number>>;
  increment(slug: string): Promise<number>;
  limit(key: string, kind: "minute" | "daily"): Promise<{ success: boolean; reset: number }>;
}

export class UpstashDownloadStore implements DownloadStore {
  private minute: Ratelimit;
  private daily: Ratelimit;

  constructor(private redis: Redis) {
    const options = { redis, analytics: false, ephemeralCache: false as const, timeout: 0 };
    this.minute = new Ratelimit({ ...options, prefix: "olp:dl:limit:minute", limiter: Ratelimit.slidingWindow(30, "1 m") });
    this.daily = new Ratelimit({ ...options, prefix: "olp:dl:limit:daily", limiter: Ratelimit.fixedWindow(3, "1 d") });
  }

  async counts(slugs: string[]) {
    const raw = await this.redis.hgetall<Record<string, string | number>>(DOWNLOADS_KEY);
    return Object.fromEntries(slugs.map((slug) => [slug, Number(raw?.[slug] ?? 0)]));
  }

  async increment(slug: string) {
    return this.redis.hincrby(DOWNLOADS_KEY, slug, 1);
  }

  async limit(key: string, kind: "minute" | "daily") {
    const result = await this[kind].limit(key);
    await result.pending;
    if (result.reason === "timeout") throw new Error("Download limiter unavailable");
    return { success: result.success, reset: result.reset };
  }
}

export class MemoryDownloadStore implements DownloadStore {
  private totals = new Map<string, number>();
  private limits = new Map<string, { count: number; reset: number }>();

  async counts(slugs: string[]) {
    return Object.fromEntries(slugs.map((slug) => [slug, this.totals.get(slug) ?? 0]));
  }

  async increment(slug: string) {
    const next = (this.totals.get(slug) ?? 0) + 1;
    this.totals.set(slug, next);
    return next;
  }

  async limit(key: string, kind: "minute" | "daily") {
    const now = Date.now();
    for (const [id, value] of this.limits) if (value.reset <= now) this.limits.delete(id);
    const id = `${kind}:${key}`;
    const value = this.limits.get(id) ?? { count: 0, reset: now + (kind === "minute" ? 60_000 : 86_400_000) };
    value.count++;
    this.limits.set(id, value);
    return { success: value.count <= (kind === "minute" ? 30 : 3), reset: value.reset };
  }
}

let runtime: { store: DownloadStore; secret: string } | undefined;

export function getDownloadRuntime() {
  if (runtime) return runtime;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.VOTES_HMAC_SECRET;
  const localMemory = process.env.VOTES_ALLOW_MEMORY === "1" && !process.env.VERCEL;
  if (url || token || process.env.VERCEL || (process.env.NODE_ENV === "production" && !localMemory)) {
    if (!url || !token || !secret || Buffer.byteLength(secret) < 32 || !url.startsWith("https://")) {
      throw new Error("Download tracking requires Redis and a VOTES_HMAC_SECRET of at least 32 bytes");
    }
    runtime = { store: new UpstashDownloadStore(new Redis({ url, token })), secret };
  } else {
    runtime = { store: new MemoryDownloadStore(), secret: secret || randomBytes(32).toString("hex") };
  }
  return runtime;
}

export async function handleDownloadTrack(
  request: NextRequest,
  slug: string,
  validSlugs: ReadonlySet<string>,
  store: DownloadStore,
  secret: string,
) {
  if (!validSlugs.has(slug)) return voteError("Template download not found.", 404);
  if (request.headers.get("origin") !== new URL(request.url).origin) return voteError("Download from openlanding.page.", 403);

  // Vercel overwrites this header. Never accept arbitrary forwarded IPs off-platform.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.trim() : "127.0.0.1";
  if (!ip || !isIP(ip)) return voteError("Download tracking is temporarily unavailable.", 503);

  const ipHash = dailyIpHash(secret, ip);
  const minute = await store.limit(ipHash, "minute");
  if (!minute.success) {
    return voteError("Too many requests. Please try again later.", 429, {
      "Retry-After": String(Math.max(1, Math.ceil((minute.reset - Date.now()) / 1000))),
    });
  }
  const daily = await store.limit(`${ipHash}:${slug}`, "daily");
  if (!daily.success) {
    return voteError("Daily download tracking limit reached for this template.", 429, {
      "Retry-After": String(Math.max(1, Math.ceil((daily.reset - Date.now()) / 1000))),
    });
  }

  const count = await store.increment(slug);
  return NextResponse.json({ slug, count }, { headers: privateHeaders });
}
