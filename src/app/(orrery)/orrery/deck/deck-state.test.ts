import { describe, expect, test } from "vitest";
import { deckReducer, formatCounter } from "./deck-state";

describe("formatCounter", () => {
  test("pads both numbers to two digits, one-based", () => {
    expect(formatCounter(2, 10)).toBe("03 / 10");
    expect(formatCounter(0, 10)).toBe("01 / 10");
  });
});

describe("deckReducer", () => {
  const at = (index: number) => ({ index, count: 10 });

  test("next stops at the last slide", () => {
    expect(deckReducer(at(9), { type: "next" })).toEqual(at(9));
    expect(deckReducer(at(3), { type: "next" })).toEqual(at(4));
  });

  test("prev stops at the first slide", () => {
    expect(deckReducer(at(0), { type: "prev" })).toEqual(at(0));
    expect(deckReducer(at(3), { type: "prev" })).toEqual(at(2));
  });

  test("goto clamps into range", () => {
    expect(deckReducer(at(0), { type: "goto", index: 4 })).toEqual(at(4));
    expect(deckReducer(at(0), { type: "goto", index: 99 })).toEqual(at(9));
    expect(deckReducer(at(5), { type: "goto", index: -3 })).toEqual(at(0));
  });

  test("first and last jump to the ends", () => {
    expect(deckReducer(at(5), { type: "first" })).toEqual(at(0));
    expect(deckReducer(at(5), { type: "last" })).toEqual(at(9));
  });
});
