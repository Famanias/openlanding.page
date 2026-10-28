import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import type { CountsBySlug, VoteCounts, VoteDirection, VoteResult, VotesBySlug, VoteStore } from "./types";

export const VOTE_SCRIPT = `
local accepted = redis.call('HSETNX', KEYS[1], ARGV[1], ARGV[2])
if accepted == 1 then redis.call('HINCRBY', KEYS[2], ARGV[2], 1) end
return {tonumber(redis.call('HGET', KEYS[2], 'up') or '0'),
        tonumber(redis.call('HGET', KEYS[2], 'down') or '0'),
        redis.call('HGET', KEYS[1], ARGV[1]), accepted}
`;

export class UpstashVoteStore implements VoteStore {
  private minute: Ratelimit;
  private daily: Ratelimit;
  constructor(private redis: Redis) {
    const options = { redis, analytics: false, ephemeralCache: false as const, timeout: 0 };
    this.minute = new Ratelimit({ ...options, prefix: "olp:limit:minute", limiter: Ratelimit.slidingWindow(20, "1 m") });
    this.daily = new Ratelimit({ ...options, prefix: "olp:limit:daily", limiter: Ratelimit.fixedWindow(5, "1 d") });
  }
  async counts(slugs: string[]) {
    const pipeline = this.redis.pipeline();
    for (const slug of slugs) pipeline.hgetall(`counts:{${slug}}`);
    const values = await pipeline.exec<(VoteCounts | null)[]>();
    return Object.fromEntries(slugs.map((slug, i) => [slug, { up: Number(values[i]?.up ?? 0), down: Number(values[i]?.down ?? 0) }]));
  }
  async mine(slugs: string[], voter: string): Promise<VotesBySlug> {
    const pipeline = this.redis.pipeline();
    for (const slug of slugs) pipeline.hget(`votes:{${slug}}`, voter);
    const values = await pipeline.exec<(VoteDirection | null)[]>();
    return Object.fromEntries(slugs.flatMap((slug, i) => values[i] === "up" || values[i] === "down" ? [[slug, values[i]]] : []));
  }
  async vote(slug: string, voter: string, dir: VoteDirection): Promise<VoteResult> {
    const [up, down, myVote, accepted] = await this.redis.eval<[string, VoteDirection], [number, number, VoteDirection, number]>(
      VOTE_SCRIPT, [`votes:{${slug}}`, `counts:{${slug}}`], [voter, dir]);
    return { up, down, myVote, accepted: accepted === 1 };
  }
  async limit(key: string, kind: "minute" | "daily") {
    const result = await this[kind].limit(key);
    await result.pending;
    if (result.reason === "timeout") throw new Error("Vote limiter unavailable");
    return { success: result.success, reset: result.reset };
  }
}

/** Development/test fake. All writes are synchronous before the Promise resolves. */
export class MemoryVoteStore implements VoteStore {
  private votes = new Map<string, Map<string, VoteDirection>>();
  private totals = new Map<string, VoteCounts>();
  private limits = new Map<string, { count: number; reset: number }>();
  async counts(slugs: string[]): Promise<CountsBySlug> {
    return Object.fromEntries(slugs.map((slug) => [slug, { ...(this.totals.get(slug) ?? { up: 0, down: 0 }) }]));
  }
  async mine(slugs: string[], voter: string): Promise<VotesBySlug> {
    return Object.fromEntries(slugs.flatMap((slug) => {
      const value = this.votes.get(slug)?.get(voter);
      return value ? [[slug, value]] : [];
    }));
  }
  async vote(slug: string, voter: string, dir: VoteDirection): Promise<VoteResult> {
    const votes = this.votes.get(slug) ?? new Map<string, VoteDirection>();
    const counts = this.totals.get(slug) ?? { up: 0, down: 0 };
    const existing = votes.get(voter);
    if (!existing) {
      votes.set(voter, dir);
      counts[dir]++;
      this.votes.set(slug, votes);
      this.totals.set(slug, counts);
    }
    return { ...counts, myVote: existing ?? dir, accepted: !existing };
  }
  async limit(key: string, kind: "minute" | "daily") {
    const now = Date.now();
    // Expired buckets are removed so the development fake stays bounded.
    for (const [id, value] of this.limits) if (value.reset <= now) this.limits.delete(id);
    const id = `${kind}:${key}`;
    const value = this.limits.get(id) ?? { count: 0, reset: now + (kind === "minute" ? 60_000 : 86_400_000) };
    value.count++;
    this.limits.set(id, value);
    return { success: value.count <= (kind === "minute" ? 20 : 5), reset: value.reset };
  }
}
