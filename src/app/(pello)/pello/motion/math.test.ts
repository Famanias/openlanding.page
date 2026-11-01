import { it, expect } from "vitest";
import { clamp, progress, durationInMs } from "./math";
it("maps measured scroll bounds to stable clamped progress", () => {
  expect(progress(300, 100, 500)).toBe(0.5);
  expect(progress(-20, 100, 500)).toBe(0);
  expect(progress(900, 100, 500)).toBe(1);
  expect(progress(100, 100, 100)).toBe(0);
  expect(clamp(8, 0, 4)).toBe(4);
});
it("reads CSS durations whether the browser serializes seconds or milliseconds", () => {
  expect(durationInMs("0.8s")).toBe(800);
  expect(durationInMs("280ms")).toBe(280);
  expect(durationInMs("invalid")).toBe(0);
});
