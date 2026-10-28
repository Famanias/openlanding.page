import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { MemoryVoteStore, UpstashVoteStore, VOTE_SCRIPT } from "./store";
import { handleVote } from "./http";
import { dailyIpHash, voterHash } from "./runtime";
import { Redis } from "@upstash/redis";

const secret = "test-secret-at-least-thirty-two-bytes";
const slugs = ["orrery", "koji"];
function request(body: string = '{"dir":"up"}', cookie?: string, origin = "https://gallery.test") {
  return new NextRequest("https://gallery.test/api/votes/orrery", { method: "POST",
    headers: { origin, "Content-Type": "application/json", ...(cookie ? { cookie: `olp_vid=${cookie}` } : {}) }, body });
}
afterEach(() => vi.unstubAllEnvs());

describe("permanent votes", () => {
  it("accepts only the first concurrent vote, including switch attempts", async () => {
    const store = new MemoryVoteStore();
    const results = await Promise.all(Array.from({ length: 30 }, (_, i) => store.vote("orrery", "visitor", i % 2 ? "down" : "up")));
    expect(results.filter((result) => result.accepted)).toHaveLength(1);
    expect(await store.counts(slugs)).toEqual({ orrery: { up: 1, down: 0 }, koji: { up: 0, down: 0 } });
    expect(await store.mine(slugs, "visitor")).toEqual({ orrery: "up" });
    expect(await store.vote("orrery", "visitor", "down")).toEqual({ up: 1, down: 0, myVote: "up", accepted: false });
    expect((await store.vote("koji", "visitor", "down")).accepted).toBe(true);
  });
  it("uses one Lua operation for the permanent write and both counts", async () => {
    const redis = new Redis({ url: "https://example.test", token: "test", enableAutoPipelining: false });
    const store = new UpstashVoteStore(redis);
    const evaluate = vi.spyOn(redis, "eval").mockResolvedValue([1, 0, "up", 0]);
    expect(await store.vote("orrery", "hashed-visitor", "down")).toEqual({ up: 1, down: 0, myVote: "up", accepted: false });
    expect(evaluate).toHaveBeenCalledExactlyOnceWith(VOTE_SCRIPT, ["votes:{orrery}", "counts:{orrery}"], ["hashed-visitor", "down"]);
  });
  it("sets a secure opaque cookie, restores it and refuses to switch", async () => {
    vi.stubEnv("VERCEL", "");
    const store = new MemoryVoteStore();
    const response = await handleVote(request(), "orrery", slugs, store, secret);
    expect(response.status).toBe(200);
    const cookie = response.cookies.get("olp_vid")!;
    expect(cookie.value).toMatch(/^[a-f0-9]{32}$/);
    expect(response.headers.get("set-cookie")).toMatch(/HttpOnly/i);
    expect(response.headers.get("set-cookie")).toMatch(/Secure/);
    expect(response.headers.get("set-cookie")).toMatch(/SameSite=lax/i);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    const replay = await handleVote(request('{"dir":"down"}', cookie.value), "orrery", slugs, store, secret);
    expect(await replay.json()).toEqual({ up: 1, down: 0, myVote: "up", accepted: false });
    expect(await store.mine(slugs, voterHash(secret, cookie.value))).toEqual({ orrery: "up" });
  });
  it("rejects hostile origin, missing origin, unknown slugs, invalid and oversized bodies before storage", async () => {
    vi.stubEnv("VERCEL", "");
    const store = new MemoryVoteStore();
    expect((await handleVote(request(undefined, undefined, "https://evil.test"), "orrery", slugs, store, secret)).status).toBe(403);
    expect((await handleVote(request(undefined, undefined, "null"), "orrery", slugs, store, secret)).status).toBe(403);
    expect((await handleVote(request(), "__proto__", slugs, store, secret)).status).toBe(404);
    for (const body of ['{"dir":"delete"}', 'null', '{}', '{', JSON.stringify({ dir: "up", extra: "x".repeat(300) })]) {
      expect((await handleVote(request(body), "orrery", slugs, store, secret)).status).toBe(400);
    }
    expect((await store.counts(slugs)).orrery).toEqual({ up: 0, down: 0 });
  });
  it("limits cookie-clearing and new identities per template without blocking a replay", async () => {
    vi.stubEnv("VERCEL", "");
    const store = new MemoryVoteStore();
    let cookie = "";
    for (let i = 0; i < 5; i++) {
      const response = await handleVote(request(), "orrery", slugs, store, secret);
      expect(response.status).toBe(200);
      cookie = response.cookies.get("olp_vid")!.value;
    }
    const denied = await handleVote(request(), "orrery", slugs, store, secret);
    expect(denied.status).toBe(429);
    expect(denied.headers.get("Retry-After")).toBeTruthy();
    expect(denied.cookies.get("olp_vid")).toBeUndefined();
    expect((await handleVote(request('{"dir":"down"}', cookie), "orrery", slugs, store, secret)).status).toBe(200);
    expect((await store.counts(slugs)).orrery).toEqual({ up: 5, down: 0 });
  });
  it("enforces the network minute limit on replays too", async () => {
    vi.stubEnv("VERCEL", "");
    const store = new MemoryVoteStore();
    const first = await handleVote(request(), "orrery", slugs, store, secret);
    const cookie = first.cookies.get("olp_vid")!.value;
    for (let i = 1; i < 20; i++) expect((await handleVote(request(undefined, cookie), "orrery", slugs, store, secret)).status).toBe(200);
    expect((await handleVote(request(undefined, cookie), "orrery", slugs, store, secret)).status).toBe(429);
  });
  it("rotates IP hashes daily and separates voter hashes from IP hashes", () => {
    const date = new Date("2026-10-28T00:00:00Z");
    expect(dailyIpHash(secret, "1.2.3.4", date)).toHaveLength(64);
    expect(dailyIpHash(secret, "1.2.3.4", date)).not.toBe(dailyIpHash(secret, "1.2.3.4", new Date("2026-10-29T00:00:00Z")));
    expect(voterHash(secret, "1.2.3.4")).not.toBe(dailyIpHash(secret, "1.2.3.4", date));
  });
});
