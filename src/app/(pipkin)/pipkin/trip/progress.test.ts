import { describe, it, expect } from "vitest";
import { tripPose, scrollForStop, stopFocus } from "./progress";

describe("pipkin trip progress", () => {
  const top = 2000;
  const height = 5000;
  const vh = 1000;

  it("starts at the first stop and ends at the last", () => {
    expect(tripPose(1500, top, height, vh)).toMatchObject({ p: 0, s: 0, stop: 0 });
    expect(tripPose(9000, top, height, vh)).toMatchObject({ p: 1, s: 4, stop: 4 });
  });

  it("is halfway through at stop 2", () => {
    expect(tripPose(top + 2000, top, height, vh)).toMatchObject({ p: 0.5, stop: 2 });
  });

  it("round-trips a stop through scroll position", () => {
    for (let stop = 0; stop < 5; stop++) {
      const y = scrollForStop(stop, top, height, vh);
      expect(tripPose(y, top, height, vh).stop).toBe(stop);
    }
  });

  it("clamps deep-link stops to the section", () => {
    expect(scrollForStop(-4, top, height, vh)).toBe(top);
    expect(scrollForStop(99, top, height, vh)).toBe(top + 4000);
  });

  it("measures how centred a stop is", () => {
    expect(stopFocus(2, 2)).toBe(1);
    expect(stopFocus(2.5, 2)).toBe(0.5);
    expect(stopFocus(4, 1)).toBe(0);
  });
});
