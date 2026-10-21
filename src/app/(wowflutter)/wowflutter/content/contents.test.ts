import { describe, expect, test } from "vitest";
import { PAGE_COUNT, pageToSpread } from "../book/spreads";
import { CONTENTS, NAV, PAGES } from "./contents";

describe("PAGES", () => {
  test("describes every page of the book, numbered 1..14", () => {
    expect(PAGES).toHaveLength(PAGE_COUNT);
    expect(PAGES.map((p) => p.n)).toEqual(Array.from({ length: PAGE_COUNT }, (_, i) => i + 1));
  });

  test("every page has a title for assistive tech", () => {
    for (const p of PAGES) expect(p.title.length).toBeGreaterThan(2);
  });
});

describe("CONTENTS", () => {
  test("every entry points at a real page, in reading order", () => {
    const pages = CONTENTS.map((c) => c.page);
    expect(pages).toEqual([...pages].sort((a, b) => a - b));
    for (const c of CONTENTS) {
      expect(c.page).toBeGreaterThanOrEqual(1);
      expect(c.page).toBeLessThanOrEqual(PAGE_COUNT);
    }
  });

  test("the contents page lists only pages beyond itself", () => {
    const contentsPage = PAGES.find((p) => p.section === "contents")!.n;
    for (const c of CONTENTS) expect(c.page).toBeGreaterThan(contentsPage);
  });

  test("each entry lands on the spread that opens that section", () => {
    for (const c of CONTENTS) {
      const target = PAGES.find((p) => p.n === c.page)!;
      expect(target.section).toBe(c.section);
      expect(pageToSpread(c.page)).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("NAV", () => {
  test("every nav link targets a page that exists", () => {
    for (const n of NAV) {
      expect(n.page).toBeGreaterThanOrEqual(1);
      expect(n.page).toBeLessThanOrEqual(PAGE_COUNT);
    }
  });
});
