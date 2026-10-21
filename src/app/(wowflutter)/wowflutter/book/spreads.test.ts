import { describe, expect, test } from "vitest";
import {
  LEAF_COUNT,
  PAGE_COUNT,
  SPREAD_COUNT,
  clampSpread,
  folio,
  leafOf,
  leafState,
  pageToSpread,
  parsePageHash,
  spreadHash,
  spreadPages,
} from "./spreads";

describe("book geometry", () => {
  test("14 pages are 7 leaves and 8 spreads", () => {
    expect(PAGE_COUNT).toBe(14);
    expect(LEAF_COUNT).toBe(7);
    expect(SPREAD_COUNT).toBe(8);
  });
});

describe("spreadPages", () => {
  test("the cover is alone on the right and the back cover alone on the left", () => {
    expect(spreadPages(0)).toEqual({ left: null, right: 1 });
    expect(spreadPages(7)).toEqual({ left: 14, right: null });
  });

  test("inner spreads pair an even verso with the next odd recto", () => {
    expect(spreadPages(1)).toEqual({ left: 2, right: 3 });
    expect(spreadPages(2)).toEqual({ left: 4, right: 5 });
    expect(spreadPages(6)).toEqual({ left: 12, right: 13 });
  });

  test("every page appears in exactly one spread", () => {
    const seen = new Map<number, number>();
    for (let s = 0; s < SPREAD_COUNT; s++) {
      const { left, right } = spreadPages(s);
      for (const p of [left, right]) if (p !== null) seen.set(p, (seen.get(p) ?? 0) + 1);
    }
    expect([...seen.keys()].sort((a, b) => a - b)).toEqual(Array.from({ length: PAGE_COUNT }, (_, i) => i + 1));
    expect([...seen.values()].every((n) => n === 1)).toBe(true);
  });
});

describe("pageToSpread", () => {
  test("is the inverse of spreadPages", () => {
    for (let p = 1; p <= PAGE_COUNT; p++) {
      const { left, right } = spreadPages(pageToSpread(p));
      expect([left, right]).toContain(p);
    }
  });

  test("clamps out-of-range pages", () => {
    expect(pageToSpread(0)).toBe(0);
    expect(pageToSpread(99)).toBe(SPREAD_COUNT - 1);
  });
});

describe("leaves", () => {
  test("a leaf carries page 2k+1 on its front and 2k+2 on its back", () => {
    expect(leafOf(1)).toEqual({ leaf: 0, face: "front" });
    expect(leafOf(2)).toEqual({ leaf: 0, face: "back" });
    expect(leafOf(13)).toEqual({ leaf: 6, face: "front" });
    expect(leafOf(14)).toEqual({ leaf: 6, face: "back" });
  });

  test("leaves before the spread are turned, the rest lie flat", () => {
    expect(leafState(0, 0)).toBe("flat");
    expect(leafState(0, 1)).toBe("turned");
    expect(leafState(3, 3)).toBe("flat");
    expect(leafState(3, 4)).toBe("turned");
  });
});

describe("clampSpread", () => {
  test("keeps the spread inside the book", () => {
    expect(clampSpread(-3)).toBe(0);
    expect(clampSpread(40)).toBe(SPREAD_COUNT - 1);
    expect(clampSpread(2.6)).toBe(3);
  });
});

describe("page hashes", () => {
  test("#pN opens the spread that holds page N", () => {
    expect(parsePageHash("#p1")).toBe(0);
    expect(parsePageHash("#p4")).toBe(2);
    expect(parsePageHash("#p5")).toBe(2);
    expect(parsePageHash("#p14")).toBe(7);
  });

  test("anything else is not a page hash", () => {
    expect(parsePageHash("")).toBeNull();
    expect(parsePageHash("#top")).toBeNull();
    expect(parsePageHash("#p0")).toBeNull();
    expect(parsePageHash("#p15")).toBeNull();
    expect(parsePageHash("#p3x")).toBeNull();
  });

  test("a spread's hash round-trips to the same spread", () => {
    for (let s = 0; s < SPREAD_COUNT; s++) expect(parsePageHash(spreadHash(s))).toBe(s);
  });
});

describe("folio", () => {
  test("shows one page on the covers and two inside, zero-padded", () => {
    expect(folio(0)).toBe("P. 01 / 14");
    expect(folio(2)).toBe("P. 04–05 / 14");
    expect(folio(7)).toBe("P. 14 / 14");
  });
});
