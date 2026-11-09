import { describe, it, expect } from "vitest";
import { sunPosition, formatTime } from "./model";
describe("daylight study", () => {
  it("clamps the sun to its track and rises at midday", () => {
    expect(sunPosition(360, 1)).toEqual({ x: 10, y: 70 });
    expect(sunPosition(1080, 1).x).toBe(90);
    expect(sunPosition(720, 1).y).toBe(18);
    expect(sunPosition(0, 1).x).toBe(10);
  });
  it("formats a 15 minute time", () => expect(formatTime(735)).toBe("12:15"));
});
