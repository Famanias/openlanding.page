import { describe, expect, it } from "vitest";
import { progressAt } from "./math";

describe("bouquet gathering progress", () => {
  it("gathers halfway through the measured scroll interval", () => {
    expect(progressAt(450, 300, 300)).toBe(0.5);
  });
  it("holds the finished composition after the stage leaves", () => {
    expect(progressAt(900, 300, 300)).toBe(1);
    expect(progressAt(0, 300, 300)).toBe(0);
    expect(progressAt(300, 300, 0)).toBe(1);
  });
});
