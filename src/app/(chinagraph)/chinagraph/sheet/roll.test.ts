import { describe, expect, it } from "vitest";
import { ENLARGE_END, ENLARGE_START, FRAMES, SELECTS, SWEEP_END, SWEEP_START, counterAt, enlargeAt, flashAt, flipToSquare, frameAt, lerpFlip, loupeAt, markAt } from "./roll";

const sweepPoint = (position: number) => SWEEP_START + ((SWEEP_END - SWEEP_START) * position) / FRAMES.length;

describe("CHINAGRAPH roll", () => {
  it("is one 12-frame roll with six selects", () => {
    expect(FRAMES).toHaveLength(12);
    expect(FRAMES.map((frame) => frame.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(SELECTS).toEqual([2, 4, 5, 7, 10, 12]);
    expect(SWEEP_START < SWEEP_END && SWEEP_END < ENLARGE_START && ENLARGE_START < ENLARGE_END).toBe(true);
  });

  it("sweeps the loupe across the frames in reading order", () => {
    expect(frameAt(0)).toBe(1);
    expect(frameAt(sweepPoint(0.5))).toBe(1);
    expect(frameAt(sweepPoint(3.5))).toBe(4);
    expect(frameAt(sweepPoint(11.9))).toBe(12);
    expect(frameAt(1)).toBe(12);
  });

  it("moves the loupe continuously between frame centres", () => {
    expect(loupeAt(0)).toBe(0);
    expect(loupeAt(sweepPoint(4.5))).toBeCloseTo(4);
    expect(loupeAt(sweepPoint(5))).toBeCloseTo(4.5);
    expect(loupeAt(1)).toBe(11);
  });

  it("draws a select's grease-pencil mark while the loupe is over it", () => {
    expect(markAt(0, 2)).toBe(0);
    expect(markAt(sweepPoint(1.5), 2)).toBeCloseTo(0.5);
    expect(markAt(sweepPoint(2), 2)).toBe(1);
    expect(markAt(1, 12)).toBe(1);
    expect(markAt(1, 3)).toBe(0);
  });

  it("enlarges the first select after the sweep and strobes as it lands", () => {
    expect(enlargeAt(SWEEP_END)).toBe(0);
    expect(enlargeAt(ENLARGE_END)).toBe(1);
    const mid = enlargeAt((ENLARGE_START + ENLARGE_END) / 2);
    expect(mid).toBeGreaterThan(0.4);
    expect(mid).toBeLessThan(0.9);
    expect(flashAt(0.5)).toBe(0);
    expect(flashAt(ENLARGE_END)).toBeGreaterThan(0.8);
    // The pinned scroll clamps at 1, so the strobe must be fully decayed there or it sticks on screen.
    expect(flashAt(1)).toBe(0);
  });

  it("labels the frame counter", () => {
    expect(counterAt(0)).toBe("Frame 01 / 12");
    expect(counterAt(sweepPoint(9.5))).toBe("Frame 10 / 12");
    expect(counterAt(ENLARGE_END)).toBe("Frame 02 / 12");
  });

  it("maps a contact-sheet cell onto a stage-covering square, transform only", () => {
    const flip = flipToSquare({ x: 100, y: 50, w: 100, h: 100 }, { w: 1600, h: 900 });
    // target square: side 1600, centred on (800, 450); cell centre (150, 100)
    expect(flip).toEqual({ x: -650, y: -350, s: 0.0625 });
    expect(lerpFlip(flip, 0)).toEqual(flip);
    expect(lerpFlip(flip, 1)).toEqual({ x: 0, y: 0, s: 1 });
    expect(lerpFlip(flip, 0.5).s).toBeCloseTo(0.53125);
  });
});
