import { describe, it, expect } from "vitest";
import {
  stageTier,
  bandLayout,
  stageHandoff,
  planStageJourney,
  overlaps,
} from "./staging";
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
  const current = { left: 522, top: 84, width: 492, height: 560 };
  const next = { left: 0, top: 77, width: 614, height: 448 };
  const outgoing = { left: 41, top: 173, width: 450, height: 388 };
  const incoming = { left: 652, top: 820, width: 331, height: 654 };
  const journey = planStageJourney(
    current,
    next,
    [outgoing],
    [incoming],
    0,
    700,
    700,
  );
  const sample = (y: number) =>
    stageHandoff(
      current,
      next,
      y / 700,
      [outgoing, incoming].map((r) => ({ ...r, top: r.top - y })),
      false,
      false,
      0,
      journey,
      y,
      700,
    ).rect;
  it("moves through the gap continuously, stays contained and never overlaps either column", () => {
    let previous = sample(0);
    let crossed = false;
    for (let y = 0; y <= 700; y++) {
      const rect = sample(y);
      for (const block of [outgoing, incoming])
        expect(overlaps(rect, { ...block, top: block.top - y })).toBe(false);
      expect(rect.top).toBeGreaterThanOrEqual(0);
      expect(rect.top + rect.height).toBeLessThanOrEqual(700);
      expect(rect.height).toBeGreaterThan(100);
      for (const key of ["left", "top", "width", "height"] as const)
        expect(Math.abs(rect[key] - previous[key])).toBeLessThan(10);
      if (rect.left > next.left + 50 && rect.left < current.left - 50)
        crossed = true;
      previous = rect;
    }
    expect(crossed).toBe(true);
    expect(sample(0)).toEqual(current);
    expect(sample(700)).toEqual(next);
  });
  it("shrinks same-side stages before incoming text reaches them", () => {
    const current = { left: 0, top: 99, width: 864, height: 576 };
    const next = { left: 0, top: 108, width: 691, height: 720 };
    for (let y = 900; y <= 1935; y += 5) {
      const blocks = [
        { left: 913, top: 1020 - y, width: 455, height: 658 },
        { left: 777, top: 2097 - y, width: 590, height: 450 },
      ];
      const rect = stageHandoff(
        current,
        next,
        (y - 900) / 1035,
        blocks,
        false,
        false,
        150,
      ).rect;
      for (const block of blocks)
        expect(overlaps({ ...rect, height: rect.height + 150 }, block)).toBe(
          false,
        );
    }
  });
  it.each([
    {
      name: "Light to Colourways",
      start: 1600,
      end: 2545,
      outgoingTop: 1726,
      outgoingHeight: 409,
      incomingTop: 2671,
      incomingHeight: 519,
      fromLeft: true,
    },
    {
      name: "Colourways to Making",
      start: 2545,
      end: 3316,
      outgoingTop: 2671,
      outgoingHeight: 519,
      incomingTop: 3388,
      incomingHeight: 592,
      fromLeft: false,
    },
  ])("keeps the $name route continuous and clear", (example) => {
    const from = {
      left: example.fromLeft ? 0 : 522,
      top: 84,
      width: 492,
      height: 560,
    };
    const to = { ...from, left: example.fromLeft ? 522 : 0 };
    const outgoing = {
      left: example.fromLeft ? 532 : 41,
      top: example.outgoingTop,
      width: 450,
      height: example.outgoingHeight,
    };
    const incoming = {
      left: example.fromLeft ? 41 : 532,
      top: example.incomingTop,
      width: 450,
      height: example.incomingHeight,
    };
    const route = planStageJourney(
      from,
      to,
      [outgoing],
      [incoming],
      example.start,
      example.end,
      700,
    );
    let previous = from;
    for (let y = example.start; y <= example.end; y++) {
      const blocks = [outgoing, incoming].map((r) => ({
        ...r,
        top: r.top - y,
      }));
      const rect = stageHandoff(
        from,
        to,
        0,
        blocks,
        false,
        false,
        0,
        route,
        y,
        700,
      ).rect;
      blocks.forEach((r) => expect(overlaps(rect, r)).toBe(false));
      expect(rect.top).toBeGreaterThanOrEqual(0);
      expect(rect.top + rect.height).toBeLessThanOrEqual(700);
      expect(rect.height).toBeGreaterThan(100);
      for (const key of ["left", "top", "width", "height"] as const)
        expect(Math.abs(rect[key] - previous[key])).toBeLessThan(10);
      previous = rect;
    }
  });
  it("reverses without state and uses the current target immediately for reduced motion", () => {
    const progress = [0, 0.2, 0.42, 0.5, 0.58, 0.7, 1];
    const forward = progress.map((t) =>
      stageHandoff(right, left, t, [], false, false),
    );
    const backward = [...progress]
      .reverse()
      .map((t) => stageHandoff(right, left, t, [], false, false));
    expect(backward.reverse()).toEqual(forward);
    expect(stageHandoff(right, left, 0.9, [], true, false)).toEqual({
      rect: right,
    });
  });
  it("interpolates the shared phone/tablet band without switching slots", () => {
    expect(stageHandoff(left, right, 0.5, [], false, true).rect.left).toBe(275);
  });
  it("keeps reduced-motion handoffs clear using still slots", () => {
    for (let y = 0; y <= 700; y += 5) {
      const blocks = [outgoing, incoming].map((r) => ({
        ...r,
        top: r.top - y,
      }));
      const rect = stageHandoff(
        current,
        next,
        y / 700,
        blocks,
        true,
        false,
      ).rect;
      expect([current.left, next.left]).toContain(rect.left);
      blocks.forEach((block) => expect(overlaps(rect, block)).toBe(false));
      expect(rect.height).toBeGreaterThan(100);
    }
  });
});

it("keeps matching reserved slots unchanged", () => {
  expect(stageHandoff(left, left, 0.5, [], false, false).rect).toEqual(left);
});
