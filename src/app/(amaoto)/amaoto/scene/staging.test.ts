import { describe, it, expect } from "vitest";
import { stageTier, bandLayout, stageHandoff, overlaps } from "./staging";
const left = { left: 0, top: 80, width: 450, height: 560 },
  right = { ...left, left: 550 };
describe("responsive stage slots", () => {
  it("separates phone, portrait tablet and compact laptop tiers", () => {
    expect([390, 600, 768, 820, 900, 901, 1180, 1280].map(stageTier)).toEqual([
      "phone",
      "phone",
      "tablet",
      "tablet",
      "tablet",
      "compact",
      "compact",
      "desktop",
    ]);
  });
  it("makes tablet bands larger and reserves the Anatomy controls", () => {
    expect(bandLayout(768, 1024, 0).height).toBe(512);
    expect(bandLayout(600, 960, 0).height).toBeCloseTo(345.6);
    expect(bandLayout(820, 1180, 1).bottom).toBeGreaterThan(
      bandLayout(820, 1180, 1).height + 200,
    );
  });
});
describe("copy-safe reversible handoffs", () => {
  it("switches slots only while invisible, never traversing the middle", () => {
    for (let i = 0; i <= 100; i++) {
      const result = stageHandoff(right, left, i / 100, [], false, false);
      expect([left.left, right.left]).toContain(result.rect.left);
      if (i === 50) expect(result.opacity).toBe(0);
    }
  });
  it("never paints over either chapter's readable text", () => {
    for (let i = 0; i <= 100; i++) {
      const t = i / 100,
        blocks = [
          { left: 0, top: -t * 800, width: 430, height: 600 },
          { left: 550, top: 800 - t * 800, width: 430, height: 600 },
        ];
      const result = stageHandoff(right, left, t, blocks, false, false);
      if (result.opacity > 0)
        blocks.forEach((block) =>
          expect(overlaps(result.rect, block)).toBe(false),
        );
    }
  });
  it("reverses without state and uses the current target immediately for reduced motion", () => {
    const progress = [0, 0.2, 0.42, 0.5, 0.58, 0.7, 1];
    const forward = progress.map((t) =>
      stageHandoff(right, left, t, [], false, false),
    );
    const backward = [...progress].reverse().map((t) =>
      stageHandoff(right, left, t, [], false, false),
    );
    expect(backward.reverse()).toEqual(forward);
    expect(stageHandoff(right, left, 0.9, [], true, false)).toEqual({
      rect: right,
      opacity: 1,
    });
  });
});

it("keeps matching slots visible without bypassing copy safety", () => {
  expect(stageHandoff(left, left, 0.5, [], false, false).opacity).toBe(1);
  expect(
    stageHandoff(left, left, 0.5, [{ ...left, top: 100 }], false, false)
      .opacity,
  ).toBe(0);
});
