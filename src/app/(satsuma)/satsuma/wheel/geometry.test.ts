import { describe, expect, it } from "vitest";
import { cardAt, cardCount, DESKTOP, layoutCards, PHONE, pushedX, quadPoints, roundedQuadPath, tileLayout, wrap } from "./geometry";

describe("cylinder geometry (desktop frame)", () => {
  it("centre card is an upright 170×280 rectangle on the 687 line", () => {
    const g = cardAt(DESKTOP, 0);
    expect(g.x).toBe(720);
    expect(g.w).toBe(170);
    expect(g.hl).toBeCloseTo(g.hr, 3);
    expect(g.cy).toBe(687);
    // The edges sit a little off centre, so even the middle card grows a hair: heights stay within 2u of 280.
    expect(g.hl).toBeGreaterThan(279.9);
    expect(g.hl).toBeLessThan(283);
  });

  it("cards widen, rise and lean toward the rim, outer edge taller than inner", () => {
    const right = cardAt(DESKTOP, 588);
    const left = cardAt(DESKTOP, -588);
    expect(right.w).toBeGreaterThan(cardAt(DESKTOP, 196).w);
    expect(right.cy).toBeLessThan(687);
    expect(right.hr).toBeGreaterThan(right.hl);
    expect(left.hl).toBeGreaterThan(left.hr);
    expect(right.hr).toBeCloseTo(left.hl, 6);
  });

  it("grows past 340u by the time a card reaches the screen edge", () => {
    const edge = cardAt(DESKTOP, 650);
    expect(Math.max(edge.hl, edge.hr)).toBeGreaterThan(340);
    expect(Math.max(edge.hl, edge.hr)).toBeLessThan(420);
  });

  it("keeps a visible gap between neighbours the whole way out", () => {
    for (const row of [0, 0.3, 0.7]) {
      const offset = row * DESKTOP.pitch;
      const cards = layoutCards(DESKTOP, offset, 10).sort((a, b) => a.x - b.x);
      for (let i = 0; i < cards.length - 1; i++) {
        const gap = cards[i + 1].left - cards[i].right;
        if (cards[i + 1].right < -200 || cards[i].left > 1640) continue;
        // Ignore the seam pair that sits far off-screen.
        if (Math.abs(cards[i].x - 720) > 900 || Math.abs(cards[i + 1].x - 720) > 900) continue;
        expect(gap).toBeGreaterThan(14);
        expect(gap).toBeLessThan(40);
      }
    }
  });

  it("push is monotonic and symmetric about the centre line", () => {
    expect(pushedX(DESKTOP, 400) - 720).toBeCloseTo(720 - pushedX(DESKTOP, -400), 6);
    expect(pushedX(DESKTOP, 500)).toBeGreaterThan(pushedX(DESKTOP, 400));
  });

  it("bend 0 is a flat row of identical cards on an even pitch", () => {
    const cards = layoutCards(DESKTOP, 0, 10, 0).sort((a, b) => a.x - b.x);
    for (const c of cards) {
      expect(c.w).toBe(170);
      expect(c.hl).toBe(280);
      expect(c.hr).toBe(280);
      expect(c.cy).toBe(687);
    }
    expect(cards[1].x - cards[0].x).toBe(196);
  });
});

describe("the loop", () => {
  it("wraps negatives into the period", () => {
    expect(wrap(-1, 10)).toBe(9);
    expect(wrap(25, 10)).toBe(5);
  });

  it("is seamless: one full period later every card is back where it started", () => {
    const a = layoutCards(DESKTOP, 123, 10);
    const b = layoutCards(DESKTOP, 123 + 10 * DESKTOP.pitch, 10);
    a.forEach((card, i) => expect(card.x).toBeCloseTo(b[i].x, 6));
  });

  it("scrolling by one pitch moves card i onto card i-1's old place", () => {
    const a = layoutCards(DESKTOP, 0, 10);
    const b = layoutCards(DESKTOP, -DESKTOP.pitch, 10);
    expect(b[1].x).toBeCloseTo(a[0].x, 6);
  });

  it("needs ten cards on the 1440 frame, more on a wider screen", () => {
    expect(cardCount(DESKTOP, 720)).toBe(10);
    expect(cardCount(DESKTOP, 1500)).toBeGreaterThan(10);
    expect(cardCount(DESKTOP, 1500) % 2).toBe(0);
    expect(cardCount(PHONE, 320)).toBeGreaterThanOrEqual(10);
  });

  it("keeps the seam off-screen", () => {
    const n = cardCount(DESKTOP, 720);
    const edge = cardAt(DESKTOP, (n * DESKTOP.pitch) / 2);
    expect(edge.left).toBeGreaterThan(1440);
  });
});

describe("rounded quad path", () => {
  it("rounds every corner and closes", () => {
    const path = roundedQuadPath(quadPoints(cardAt(DESKTOP, 0)), 15);
    expect(path.startsWith("M")).toBe(true);
    expect(path.endsWith("Z")).toBe(true);
    expect(path.match(/Q/g)).toHaveLength(4);
  });

  it("never rounds past half an edge", () => {
    const tiny = roundedQuadPath(
      [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 10, y: 10 },
        { x: 0, y: 10 },
      ],
      999,
    );
    expect(tiny).toContain("Q10 0");
    expect(tiny).toMatch(/^M0 5Q0 0 5 0/); // clamped to a radius of 5: the first curve starts 5 up the left edge
  });
});

describe("tileLayout", () => {
  it("sizes the sheet 5×2 tiles and fits a portrait card to its tile", () => {
    const l = tileLayout(0, 170, 280);
    const tileH = 280; // card is already taller than 170 / 0.7111 = 239
    expect(l.h).toBeCloseTo(tileH * 2, 6);
    expect(l.w).toBeCloseTo(tileH * (384 / 540) * 5, 6);
  });

  it("uses the width when the card is wider than its tile ratio", () => {
    const l = tileLayout(0, 300, 280);
    expect(l.h / 2).toBeCloseTo(300 / (384 / 540), 6);
  });

  it("offsets each tile to its own cell, row-major", () => {
    const a = tileLayout(0, 170, 280);
    const b = tileLayout(1, 170, 280);
    const f = tileLayout(5, 170, 280);
    const tileW = a.w / 5;
    expect(a.x - b.x).toBeCloseTo(tileW, 6);
    expect(a.y - f.y).toBeCloseTo(a.h / 2, 6);
    expect(f.x).toBeCloseTo(a.x, 6);
  });
});
