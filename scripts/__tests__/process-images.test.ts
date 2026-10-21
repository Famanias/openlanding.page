import { mkdtempSync, readdirSync, readFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import sharp from "sharp";
import { describe, expect, test } from "vitest";
import { inkOnStock, processImages, renderAssetsModule, tritone } from "../process-images";

describe("inkOnStock", () => {
  test("runs from tape black to stock and interpolates linearly", () => {
    expect(inkOnStock(0)).toEqual([20, 17, 15]);
    expect(inkOnStock(1)).toEqual([239, 230, 212]);
    expect(inkOnStock(0.5)).toEqual([130, 124, 114]);
  });

  test("clamps out-of-range luma", () => {
    expect(inkOnStock(-1)).toEqual(inkOnStock(0));
    expect(inkOnStock(2)).toEqual(inkOnStock(1));
  });
});

describe("tritone", () => {
  test("maps black, mid and white luminance to the three Cairn stops", () => {
    expect(tritone(0)).toEqual([11, 12, 14]);
    expect(tritone(0.5)).toEqual([15, 30, 51]);
    expect(tritone(1)).toEqual([245, 246, 247]);
  });

  test("interpolates linearly between stops", () => {
    expect(tritone(0.25)).toEqual([13, 21, 33]);
  });
});

describe("renderAssetsModule", () => {
  test("writes an empty record when there are no images", () => {
    expect(renderAssetsModule({})).toContain("export const ASSETS: Record<string, { w: number; h: number }> = {};");
  });
});

describe("processImages", () => {
  async function fixture(slug: string) {
    const root = mkdtempSync(path.join(tmpdir(), "tf-img-"));
    const incoming = path.join(root, "incoming", slug);
    mkdirSync(incoming, { recursive: true });
    await sharp({ create: { width: 40, height: 20, channels: 3, background: { r: 255, g: 0, b: 0 } } })
      .png()
      .toFile(path.join(incoming, "swatch.png"));
    return { root, incoming, publicDir: path.join(root, "public", slug), assetsModule: path.join(root, "assets.generated.ts") };
  }

  test("writes avif and webp at both widths and records dimensions", async () => {
    const f = await fixture("orrery");
    const assets = await processImages("orrery", f);
    expect(assets).toEqual({ swatch: { w: 40, h: 20 } });
    expect(readdirSync(f.publicDir).sort()).toEqual([
      "swatch-1600.avif", "swatch-1600.webp", "swatch-800.avif", "swatch-800.webp",
    ]);
    expect(readFileSync(f.assetsModule, "utf8")).toContain('"swatch": { "w": 40, "h": 20 }');
  });

  test("keytu output contains only colours on the tritone curve", async () => {
    const f = await fixture("keytu");
    await processImages("keytu", f);
    const { data } = await sharp(path.join(f.publicDir, "swatch-800.webp")).raw().toBuffer({ resolveWithObject: true });
    const [r, g, b] = [data[0], data[1], data[2]];
    // Pure red has Rec.709 luma ≈ 0.2126 → between black and navy stops; webp is lossy, allow ±3.
    const [er, eg, eb] = tritone(0.2126);
    expect(Math.abs(r - er)).toBeLessThanOrEqual(3);
    expect(Math.abs(g - eg)).toBeLessThanOrEqual(3);
    expect(Math.abs(b - eb)).toBeLessThanOrEqual(3);
  });

  test("wowflutter output sits on the ink-to-stock ramp", async () => {
    const f = await fixture("wowflutter");
    await processImages("wowflutter", f);
    const { data } = await sharp(path.join(f.publicDir, "swatch-800.webp")).raw().toBuffer({ resolveWithObject: true });
    const [er, eg, eb] = inkOnStock(0.2126);
    expect(Math.abs(data[0] - er)).toBeLessThanOrEqual(3);
    expect(Math.abs(data[1] - eg)).toBeLessThanOrEqual(3);
    expect(Math.abs(data[2] - eb)).toBeLessThanOrEqual(3);
  });
});
