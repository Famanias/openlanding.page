import { describe, expect, it, vi } from "vitest";
import { collectSitemapUrls, parseIndexNowArgs, submitIndexNow } from "./indexnow";
import { INDEXNOW_ENDPOINT, INDEXNOW_KEY, INDEXNOW_KEY_URL } from "../src/lib/indexnow";

describe("scripts/indexnow", () => {
  it("parses --dry-run and --help flags and rejects unknown flags", () => {
    expect(parseIndexNowArgs([])).toEqual({ dryRun: false, help: false });
    expect(parseIndexNowArgs(["--dry-run"])).toEqual({ dryRun: true, help: false });
    expect(parseIndexNowArgs(["--", "--dry-run"])).toEqual({ dryRun: true, help: false });
    expect(parseIndexNowArgs(["--help"])).toEqual({ dryRun: false, help: true });
    expect(() => parseIndexNowArgs(["--bogus"])).toThrow(/Unknown option/);
  });

  it("collects canonical URLs from sitemap.ts", () => {
    const urls = collectSitemapUrls();
    expect(urls.length).toBeGreaterThan(100);
    expect(urls[0]).toBe("https://www.openlanding.page/");
    expect(urls.every(url => url.startsWith("https://www.openlanding.page/"))).toBe(true);
  });

  it("prints the payload and performs no network request in --dry-run mode", async () => {
    const fetchFn = vi.fn<typeof fetch>();
    const logs: string[] = [];
    const errors: string[] = [];

    const payloads = await submitIndexNow({
      dryRun: true,
      urls: ["https://www.openlanding.page/", "https://www.openlanding.page/templates/orrery"],
      fetchFn,
      log: msg => logs.push(msg),
      errorLog: msg => errors.push(msg),
    });

    expect(fetchFn).not.toHaveBeenCalled();
    expect(errors[0]).toContain("dry-run: 2 URL(s) in 1 batch(es)");
    const printed = JSON.parse(logs[0]);
    expect(printed).toEqual({
      host: "www.openlanding.page",
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_URL,
      urlList: [
        "https://www.openlanding.page/",
        "https://www.openlanding.page/templates/orrery",
      ],
    });
    expect(payloads).toEqual([printed]);
  });

  it("POSTs JSON payload to IndexNow endpoint when not dry-run", async () => {
    const fetchFn = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 202 }));
    const logs: string[] = [];

    await submitIndexNow({
      dryRun: false,
      urls: ["https://www.openlanding.page/"],
      fetchFn,
      log: msg => logs.push(msg),
    });

    expect(fetchFn).toHaveBeenCalledTimes(1);
    expect(fetchFn).toHaveBeenCalledWith(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "www.openlanding.page",
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_URL,
        urlList: ["https://www.openlanding.page/"],
      }),
    });
    expect(logs[0]).toContain("HTTP 202");
  });

  it("throws an error if IndexNow returns a non-OK HTTP status", async () => {
    const fetchFn = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response("Invalid key", { status: 422, statusText: "Unprocessable Entity" }));

    await expect(
      submitIndexNow({
        dryRun: false,
        urls: ["https://www.openlanding.page/"],
        fetchFn,
      }),
    ).rejects.toThrow(/422 Unprocessable Entity\): Invalid key/);
  });

  it("refuses off-origin URLs even in --dry-run mode", async () => {
    const fetchFn = vi.fn<typeof fetch>();
    await expect(
      submitIndexNow({
        dryRun: true,
        urls: ["https://example.com/"],
        fetchFn,
      }),
    ).rejects.toThrow(/not on https:\/\/www\.openlanding\.page/);
    expect(fetchFn).not.toHaveBeenCalled();
  });
});
