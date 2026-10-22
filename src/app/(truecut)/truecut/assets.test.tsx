import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test, vi } from "vitest";
import { Picture, VideoFrame } from "./assets";

vi.mock("./assets.generated", () => ({ ASSETS: { "hero-site-walk": { w: 1600, h: 900 } } }));
vi.mock("./videos.generated", () => ({ VIDEO_ASSETS: { "hero-site-reel": { desktop: "hero-site-reel.mp4", mobile: "hero-site-reel-m.mp4" } } }));

describe("TRUECUT media delivery", () => {
  test("renders responsive images and prioritizes the hero poster", () => {
    const html = renderToStaticMarkup(<Picture assetKey="hero-site-walk" alt="Control room" priority sizes="100vw" />);
    expect(html).toContain('data-asset="hero-site-walk"');
    expect(html).toContain("hero-site-walk-800.avif 800w");
    expect(html).toContain("hero-site-walk-1600.webp 1600w");
    expect(html).toContain('loading="eager"');
    expect(html).toContain('fetchPriority="high"');
    expect(html).toContain('width="1600" height="900"');
  });

  test("keeps an accessible placeholder for missing images", () => {
    const html = renderToStaticMarkup(<Picture assetKey="capability-testing" alt="Relay testing" />);
    expect(html).toContain('aria-label="Picture: Relay testing"');
    expect(html).not.toContain("<img");
  });

  test("registered video renders a poster and control without starting a download during SSR", () => {
    const html = renderToStaticMarkup(<VideoFrame videoKey="hero-site-reel" posterKey="hero-site-walk" posterAlt="Control room" label="Opening site reel" priority />);
    expect(html).toContain('data-video="hero-site-reel"');
    expect(html).toContain("<picture");
    expect(html).toContain('aria-label="Play Opening site reel"');
    expect(html).toContain('preload="none"');
    expect(html).not.toContain(".mp4");
    expect(html).not.toContain("autoPlay");
    expect(html).not.toContain("tc-video-placeholder-overlay");
  });

  test("missing clips still use a supplied poster without a broken video request", () => {
    const html = renderToStaticMarkup(<VideoFrame videoKey="process-proof" posterKey="hero-site-walk" posterAlt="Control room" />);
    expect(html).toContain('data-video="process-proof"');
    expect(html).toContain("<picture");
    expect(html).toContain("tc-video-placeholder-overlay");
    expect(html).not.toContain("<video");
  });
});
