import { describe, expect, it } from "vitest";
import { activeIndex, headerState, pageProgress } from "./scroll";

describe("tolvar header state", () => {
  it("is 'top' near the head of the page whatever the direction", () => {
    expect(headerState(0, 0, "pinned")).toBe("top");
    expect(headerState(60, 300, "hidden")).toBe("top");
  });

  it("stays pinned while scrolling down the first screen, then hides", () => {
    expect(headerState(200, 120, "top")).toBe("pinned");
    expect(headerState(700, 600, "pinned")).toBe("hidden");
  });

  it("comes back on the first scroll up", () => {
    expect(headerState(900, 960, "hidden")).toBe("pinned");
  });

  it("ignores jitter smaller than four pixels", () => {
    expect(headerState(902, 900, "hidden")).toBe("hidden");
    expect(headerState(898, 900, "hidden")).toBe("hidden");
    expect(headerState(902, 900, "pinned")).toBe("pinned");
  });
});

describe("tolvar page progress", () => {
  it("runs 0..1 down the scrollable height", () => {
    expect(pageProgress(0, 4000)).toBe(0);
    expect(pageProgress(1000, 4000)).toBe(0.25);
    expect(pageProgress(4000, 4000)).toBe(1);
  });

  it("clamps overscroll and handles a page that cannot scroll", () => {
    expect(pageProgress(-40, 4000)).toBe(0);
    expect(pageProgress(4200, 4000)).toBe(1);
    expect(pageProgress(100, 0)).toBe(0);
  });
});

describe("tolvar active section", () => {
  const tops = [900, 1800, 2700];

  it("is -1 above the first section", () => {
    expect(activeIndex(tops, 400)).toBe(-1);
  });

  it("is the last section whose top has passed the line", () => {
    expect(activeIndex(tops, 900)).toBe(0);
    expect(activeIndex(tops, 2000)).toBe(1);
    expect(activeIndex(tops, 99999)).toBe(2);
  });

  it("skips sections that are missing from the page", () => {
    expect(activeIndex([900, Number.POSITIVE_INFINITY, 2700], 3000)).toBe(2);
  });
});
