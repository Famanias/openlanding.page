import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { Picture, assetSrc, hasAsset } from "./assets";

vi.mock("./assets.generated", () => ({
  ASSETS: {
    "window-hero": { w: 1376, h: 768 },
    "cabin-berth": { w: 1200, h: 896 },
    "cabin-couchette": { w: 1200, h: 896 },
    "cabin-sleeper": { w: 1200, h: 896 },
    "station-lights": { w: 1200, h: 896 },
    "dawn-platform": { w: 1376, h: 768 },
    "midnight-service": { w: 1376, h: 768 },
    "footer-night": { w: 1376, h: 768 },
  },
}));

describe("NIGHTLINE media delivery", () => {
  test("hasAsset identifies existing and missing assets", () => {
    expect(hasAsset("window-hero")).toBe(true);
    expect(hasAsset("cabin-couchette")).toBe(true);
    expect(hasAsset("midnight-service")).toBe(true);
    expect(hasAsset("footer-night")).toBe(true);
    expect(hasAsset("non-existent")).toBe(false);
  });

  test("assetSrc constructs correct template asset paths", () => {
    expect(assetSrc("cabin-berth", 800, "webp")).toBe("/templates/nightline/cabin-berth-800.webp");
    expect(assetSrc("cabin-berth", 1600, "avif")).toBe("/templates/nightline/cabin-berth-1600.avif");
    expect(assetSrc("unknown", 800)).toBeNull();
  });

  test("renders responsive picture when asset is registered", () => {
    const html = renderToStaticMarkup(
      <Picture assetKey="cabin-couchette" alt="The couchette cabin" priority sizes="(min-width: 900px) 30vw, 90vw" />
    );
    expect(html).toContain("<picture");
    expect(html).toContain('data-asset="cabin-couchette"');
    expect(html).toContain("/templates/nightline/cabin-couchette-800.avif 800w, /templates/nightline/cabin-couchette-1600.avif 1600w");
    expect(html).toContain("/templates/nightline/cabin-couchette-800.webp 800w, /templates/nightline/cabin-couchette-1600.webp 1600w");
    expect(html).toContain('loading="eager"');
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain('width="1200"');
    expect(html).toContain('height="896"');
  });

  test("renders children fallback when asset is missing or not registered", () => {
    const html = renderToStaticMarkup(
      <Picture assetKey="cabin-unregistered" alt="Unregistered cabin">
        <span className="fallback-marker">WINDOW 00</span>
      </Picture>
    );
    expect(html).toContain('<span class="fallback-marker">WINDOW 00</span>');
    expect(html).not.toContain("<picture");
  });

  test("renders styled placeholder when asset is missing and no children provided", () => {
    const html = renderToStaticMarkup(
      <Picture assetKey="missing-key" alt="Missing view" />
    );
    expect(html).toContain("nli-placeholder");
    expect(html).toContain('data-asset="missing-key"');
    expect(html).not.toContain("<picture");
  });
});
