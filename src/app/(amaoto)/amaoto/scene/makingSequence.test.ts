import { describe, it, expect } from "vitest";
import {
  canPinMaking,
  makingScrollDistance,
  makingSequence,
} from "./makingSequence";
describe("Making pinned sequence", () => {
  it("visits all ten steps while the release transition stays still", () => {
    const distance = makingScrollDistance(900);
    for (let step = 0; step < 10; step++) {
      const frame = makingSequence(
        1000 + ((step + 0.5) / 10) * distance,
        1000,
        distance,
        900,
      );
      expect(frame).toMatchObject({ step, release: 0, transition: 0 });
    }
  });
  it("holds step ten until the scroll distance finishes, then releases over one viewport", () => {
    const distance = makingScrollDistance(900);
    expect(makingSequence(distance * 0.95, 0, distance, 900)).toMatchObject({
      step: 9,
      release: 0,
    });
    expect(makingSequence(distance + 450, 0, distance, 900)).toMatchObject({
      step: 9,
      progress: 1,
      release: 0.5,
      transition: 0.81,
    });
    expect(makingSequence(distance + 900, 0, distance, 900).release).toBe(1);
  });
  it("reverses deterministically through all steps", () => {
    const distance = makingScrollDistance(900);
    const steps = Array.from(
      { length: 10 },
      (_, i) =>
        makingSequence(((9 - i + 0.5) / 10) * distance, 0, distance, 900).step,
    );
    expect(steps).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 0]);
  });
  it("keeps reduced motion and cramped screens unpinned", () => {
    expect(canPinMaking(1440, 900, false)).toBe(true);
    expect(canPinMaking(390, 844, false)).toBe(true);
    expect(canPinMaking(390, 667, false)).toBe(false);
    expect(canPinMaking(1440, 900, true)).toBe(false);
  });
});
