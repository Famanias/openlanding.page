import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { DOWNLOADS_KEY, MemoryDownloadStore, UpstashDownloadStore, handleDownloadTrack } from "./downloads";
import { TEMPLATES } from "../app/(index)/data/templates";

const state = vi.hoisted(() => ({ store: undefined as unknown, secret: "test-download-secret-thirty-two-bytes" }));
vi.mock("./downloads", async (load) => {
  const actual = await load<typeof import("./downloads")>();
  return { ...actual, getDownloadRuntime: () => ({ store: state.store, secret: state.secret }) };
});
vi.mock("next/server", async (load) => ({ ...await load<typeof import("next/server")>(), connection: vi.fn(async () => {}) }));
import { GET as publicDownloads } from "../app/api/downloads/route";
import { POST as trackDownloadRoute } from "../app/api/downloads/[slug]/route";

const downloadable = TEMPLATES.filter((t) => t.hasDownload);
function postRequest(slug = "koji", origin: string | null = "https://gallery.test") {
  return new NextRequest(`https://gallery.test/api/downloads/${slug}`, {
    method: "POST",
    headers: origin ? { origin } : {},
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("download tracking", () => {
  it("increments and reads download counts in a single Redis hash", async () => {
    const redis = new Redis({ url: "https://example.test", token: "test", enableAutoPipelining: false });
    const store = new UpstashDownloadStore(redis);
    const hincrby = vi.spyOn(redis, "hincrby").mockResolvedValue(4);
    const hgetall = vi.spyOn(redis, "hgetall").mockResolvedValue({ koji: "4" });

    expect(await store.increment("koji")).toBe(4);
    expect(hincrby).toHaveBeenCalledExactlyOnceWith(DOWNLOADS_KEY, "koji", 1);
    expect(await store.counts(["koji", "orrery"])).toEqual({ koji: 4, orrery: 0 });
    expect(hgetall).toHaveBeenCalledExactlyOnceWith(DOWNLOADS_KEY);
  });

  it("returns public cached counts for downloadable templates and 503 on storage errors", async () => {
    const store = new MemoryDownloadStore();
    state.store = store;
    await store.increment("koji");

    const response = await publicDownloads();
    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=30, stale-while-revalidate=60");
    const body = await response.json();
    expect(Object.keys(body)).toHaveLength(downloadable.length);
    expect(body.koji).toBe(1);

    vi.spyOn(store, "counts").mockRejectedValue(new Error("redis secret detail"));
    const failed = await publicDownloads();
    expect(failed.status).toBe(503);
    expect(failed.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await failed.text()).not.toContain("redis secret detail");
  });

  it("rejects unknown slugs, missing/hostile origins, and enforces daily per-template rate limits", async () => {
    vi.stubEnv("VERCEL", "");
    const store = new MemoryDownloadStore();
    state.store = store;
    const valid = new Set(["koji"]);

    expect((await handleDownloadTrack(postRequest("unknown"), "unknown", valid, store, state.secret)).status).toBe(404);
    expect((await handleDownloadTrack(postRequest("koji", null), "koji", valid, store, state.secret)).status).toBe(403);
    expect((await handleDownloadTrack(postRequest("koji", "https://evil.test"), "koji", valid, store, state.secret)).status).toBe(403);

    for (let i = 1; i <= 3; i++) {
      const ok = await trackDownloadRoute(postRequest("koji"), { params: Promise.resolve({ slug: "koji" }) });
      expect(ok.status).toBe(200);
      expect(ok.headers.get("Cache-Control")).toBe("private, no-store");
      expect(await ok.json()).toEqual({ slug: "koji", count: i });
    }

    const limited = await trackDownloadRoute(postRequest("koji"), { params: Promise.resolve({ slug: "koji" }) });
    expect(limited.status).toBe(429);
    expect(limited.headers.get("Retry-After")).toBeTruthy();
    expect((await store.counts(["koji"])).koji).toBe(3);
  });
});
