import { expect, it } from "vitest";
import { progress } from "./math";

it("clamps the curtain cue to the section's scrollable distance", () => {
  expect(progress(20, 1200, 600)).toBe(0);
  expect(progress(-300, 1200, 600)).toBe(0.5);
  expect(progress(-900, 1200, 600)).toBe(1);
  expect(progress(-5, 500, 600)).toBe(1);
});
