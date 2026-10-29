import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { MemoryVoteStore } from "./store";
import { voterHash } from "./runtime";

const state = vi.hoisted(() => ({ store: undefined as unknown, secret: "test-route-secret-with-thirty-two-bytes" }));
vi.mock("./runtime", async (load) => ({ ...await load<typeof import("./runtime")>(), getVoteRuntime: () => ({ store: state.store, secret: state.secret }) }));
vi.mock("next/server", async (load) => ({ ...await load<typeof import("next/server")>(), connection: vi.fn(async () => {}) }));
import { GET as publicCounts } from "../../app/api/votes/route";
import { GET as myVotes } from "../../app/api/votes/me/route";
import { POST, DELETE } from "../../app/api/votes/[slug]/route";
afterEach(() => vi.restoreAllMocks());

describe("vote route contracts", () => {
  it("returns counts for all active templates with public CDN caching and no cookie", async () => {
    const store = new MemoryVoteStore(); state.store = store;
    await store.vote("orrery", "visitor", "up");
    const response = await publicCounts();
    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=30, stale-while-revalidate=60");
    expect(response.headers.get("Set-Cookie")).toBeNull();
    const counts = await response.json();
    expect(Object.keys(counts)).toHaveLength(43);
    expect(counts.orrery).toEqual({ up: 1, down: 0 });
    expect(counts.morrow).toBeUndefined();
  });
  it("restores only the requesting visitor's votes without public caching", async () => {
    const store = new MemoryVoteStore(); state.store = store;
    const vid = "a".repeat(32);
    await store.vote("orrery", voterHash(state.secret, vid), "down");
    await store.vote("koji", "another-visitor", "up");
    const response = await myVotes(new NextRequest("https://gallery.test/api/votes/me", { headers: { cookie: `olp_vid=${vid}` } }));
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await response.json()).toEqual({ orrery: "down" });
    const anonymous = await myVotes(new NextRequest("https://gallery.test/api/votes/me"));
    expect(await anonymous.json()).toEqual({});
    expect(anonymous.headers.get("Set-Cookie")).toBeNull();
  });
  it("returns a private generic error when storage fails", async () => {
    const store = new MemoryVoteStore(); state.store = store;
    vi.spyOn(store, "counts").mockRejectedValue(new Error("private provider detail"));
    const response = await publicCounts();
    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await response.text()).not.toContain("private provider detail");
  });
  it("resolves asynchronous route params and rejects an unknown slug", async () => {
    state.store = new MemoryVoteStore();
    const response = await POST(new NextRequest("https://gallery.test/api/votes/unknown", { method: "POST" }), { params: Promise.resolve({ slug: "unknown" }) });
    expect(response.status).toBe(404);
  });
  it("removes only the vote belonging to the DELETE request's cookie", async () => {
    const store = new MemoryVoteStore(); state.store = store;
    const vid = "b".repeat(32);
    await store.vote("orrery", voterHash(state.secret, vid), "up");
    await store.vote("orrery", "other-visitor", "up");
    const response = await DELETE(new NextRequest("https://gallery.test/api/votes/orrery", {
      method: "DELETE", headers: { origin: "https://gallery.test", cookie: `olp_vid=${vid}`, "content-type": "application/json" }, body: '{"dir":"up"}',
    }), { params: Promise.resolve({ slug: "orrery" }) });
    expect(await response.json()).toEqual({ up: 1, down: 0, myVote: null, accepted: true });
    expect(await store.mine(["orrery"], "other-visitor")).toEqual({ orrery: "up" });
  });
});
