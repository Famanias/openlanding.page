import { createHmac, randomBytes } from "node:crypto";
import { Redis } from "@upstash/redis";
import { MemoryVoteStore, UpstashVoteStore } from "./store";
import type { VoteStore } from "./types";

let runtime: { store: VoteStore; secret: string } | undefined;
export function getVoteRuntime() {
  if (runtime) return runtime;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  const secret = process.env.VOTES_HMAC_SECRET;
  const localMemory = process.env.VOTES_ALLOW_MEMORY === "1" && !process.env.VERCEL;
  if (url || token || process.env.VERCEL || process.env.NODE_ENV === "production" && !localMemory) {
    if (!url || !token || !secret || Buffer.byteLength(secret) < 32 || !url.startsWith("https://")) {
      throw new Error("Voting requires Redis and a VOTES_HMAC_SECRET of at least 32 bytes");
    }
    runtime = { store: new UpstashVoteStore(new Redis({ url, token })), secret };
  } else {
    runtime = { store: new MemoryVoteStore(), secret: secret || randomBytes(32).toString("hex") };
  }
  return runtime;
}
export function voterHash(secret: string, vid: string) {
  return createHmac("sha256", secret).update(`visitor:${vid}`).digest("hex");
}
export function dailyIpHash(secret: string, ip: string, date = new Date()) {
  const salt = createHmac("sha256", secret).update(`ip:${date.toISOString().slice(0, 10)}`).digest();
  return createHmac("sha256", salt).update(ip).digest("hex");
}
