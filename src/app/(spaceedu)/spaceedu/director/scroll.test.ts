import { describe, expect, it } from "vitest";
import { chapterIndex, scrollProgress } from "./scroll";

describe("scroll director", () => {
  it("clamps document progress", () => { expect(scrollProgress(-4, 2000, 1000)).toBe(0); expect(scrollProgress(2000, 2000, 1000)).toBe(1); });
  it("maps progress to a chapter", () => expect(chapterIndex(.5, 8)).toBe(4));
});
