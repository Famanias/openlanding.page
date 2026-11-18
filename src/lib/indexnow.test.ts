import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildIndexNowPayloads,
  INDEXNOW_KEY,
  INDEXNOW_KEY_URL,
  INDEXNOW_MAX_BATCH_SIZE,
} from "./indexnow";

describe("indexnow key", () => {
  it("exports a 32-character hex key and canonical key URL", () => {
    expect(INDEXNOW_KEY).toMatch(/^[0-9a-f]{32}$/);
    expect(INDEXNOW_KEY_URL).toBe(`https://www.openlanding.page/${INDEXNOW_KEY}.txt`);
  });

  it("matches the public verification file verbatim", () => {
    const filePath = path.join(process.cwd(), "public", `${INDEXNOW_KEY}.txt`);
    expect(fs.existsSync(filePath)).toBe(true);
    expect(fs.readFileSync(filePath, "utf8")).toBe(INDEXNOW_KEY);
  });
});

describe("buildIndexNowPayloads", () => {
  it("builds a protocol-compliant payload and deduplicates URLs", () => {
    const payloads = buildIndexNowPayloads([
      "https://www.openlanding.page/",
      "https://www.openlanding.page/templates/orrery",
      "https://www.openlanding.page/",
    ]);

    expect(payloads).toEqual([
      {
        host: "www.openlanding.page",
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_URL,
        urlList: [
          "https://www.openlanding.page/",
          "https://www.openlanding.page/templates/orrery",
        ],
      },
    ]);
  });

  it("splits URLs into batches of at most 10,000", () => {
    const smallBatches = buildIndexNowPayloads(
      [
        "https://www.openlanding.page/",
        "https://www.openlanding.page/templates/orrery",
        "https://www.openlanding.page/templates/koji",
      ],
      { maxBatchSize: 2 },
    );
    expect(smallBatches).toHaveLength(2);
    expect(smallBatches[0].urlList).toHaveLength(2);
    expect(smallBatches[1].urlList).toHaveLength(1);

    const manyUrls = Array.from(
      { length: INDEXNOW_MAX_BATCH_SIZE + 1 },
      (_, i) => `https://www.openlanding.page/templates/t-${i}`,
    );
    const defaultBatches = buildIndexNowPayloads(manyUrls);
    expect(defaultBatches).toHaveLength(2);
    expect(defaultBatches[0].urlList).toHaveLength(INDEXNOW_MAX_BATCH_SIZE);
    expect(defaultBatches[1].urlList).toHaveLength(1);
  });

  it("refuses empty, invalid, or off-origin URLs", () => {
    expect(() => buildIndexNowPayloads([])).toThrow(/empty/i);
    expect(() => buildIndexNowPayloads(["/templates/orrery"])).toThrow(/invalid URL/i);
    expect(() => buildIndexNowPayloads(["http://www.openlanding.page/"])).toThrow(/not on https:\/\/www\.openlanding\.page/);
    expect(() => buildIndexNowPayloads(["https://openlanding.page/"])).toThrow(/not on https:\/\/www\.openlanding\.page/);
    expect(() => buildIndexNowPayloads(["https://openlandingpage.vercel.app/"])).toThrow(/not on https:\/\/www\.openlanding\.page/);
  });

  it("refuses mismatched host, keyLocation, or invalid batch size", () => {
    expect(() =>
      buildIndexNowPayloads(["https://www.openlanding.page/"], { host: "openlanding.page" }),
    ).toThrow(/host/);
    expect(() =>
      buildIndexNowPayloads(["https://www.openlanding.page/"], {
        keyLocation: `https://evil.example/${INDEXNOW_KEY}.txt`,
      }),
    ).toThrow(/keyLocation/);
    expect(() =>
      buildIndexNowPayloads(["https://www.openlanding.page/"], { maxBatchSize: 10_001 }),
    ).toThrow(/maxBatchSize/);
  });
});
