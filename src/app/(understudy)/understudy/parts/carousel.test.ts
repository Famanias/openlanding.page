import { describe, expect, it } from "vitest";
import { arcPlace, coast, flingVelocity, glideStep, loopX, repsFor } from "./carousel";

describe("loopX", () => {
  it("lays cards out one slot apart, the last one waiting a slot off the left edge", () => {
    // 4 cards, 300px slots: period 1200; the ring's last card is the lead, ready to come round
    expect([0, 1, 2, 3].map((i) => loopX(i, 4, 300, 0))).toEqual([0, 300, 600, -300]);
  });

  it("wraps a card that leaves on the left round to the right end", () => {
    // offset −350: card 0 would sit at −350, beyond the one-slot lead, so it wraps to 850
    expect(loopX(0, 4, 300, -350)).toBe(850);
    expect(loopX(1, 4, 300, -350)).toBe(-50);
  });

  it("returns every card to its place after one whole period", () => {
    for (let i = 0; i < 4; i++) expect(loopX(i, 4, 300, -1200)).toBeCloseTo(loopX(i, 4, 300, 0));
    for (let i = 0; i < 4; i++) expect(loopX(i, 4, 300, 2400)).toBeCloseTo(loopX(i, 4, 300, 0));
  });

  it("keeps every card inside [−slot, period − slot)", () => {
    for (let offset = -5000; offset < 5000; offset += 137) {
      for (let i = 0; i < 4; i++) {
        const x = loopX(i, 4, 300, offset);
        expect(x).toBeGreaterThanOrEqual(-300);
        expect(x).toBeLessThan(900);
      }
    }
  });
});

describe("repsFor", () => {
  it("repeats a short set until the loop covers the screen plus a card each side", () => {
    expect(repsFor(10, 312, 1440)).toBe(1);
    expect(repsFor(2, 312, 1440)).toBe(4); // 2 × 312 = 624 per set; needs 1440 + 624 = 2064
    expect(repsFor(3, 312, 390)).toBe(2);
    expect(repsFor(0, 312, 1440)).toBe(1);
  });
});

describe("arcPlace", () => {
  it("is flat at the centre and lifts and turns the cards towards the edges", () => {
    expect(arcPlace(0, 700)).toEqual({ y: 0, rotate: 0, scale: 1 });
    const right = arcPlace(700, 700);
    const left = arcPlace(-700, 700);
    expect(right.y).toBeGreaterThan(0);
    expect(right.y).toBeCloseTo(left.y);
    expect(right.rotate).toBeGreaterThan(0);
    expect(left.rotate).toBeCloseTo(-right.rotate);
    expect(right.scale).toBeLessThan(1);
    expect(right.scale).toBeGreaterThan(0.9);
  });

  it("stops bending beyond the screen edge", () => {
    expect(arcPlace(5000, 700)).toEqual(arcPlace(700 * 1.3, 700));
  });
});

describe("coast", () => {
  it("eases a fling back to the drift speed, independent of frame rate", () => {
    const one = coast(1000, -30, 1);
    let many = 1000;
    for (let i = 0; i < 60; i++) many = coast(many, -30, 1 / 60);
    expect(one).toBeCloseTo(many, 6);
    expect(Math.abs(one + 30)).toBeLessThan(1030 * 0.1);
  });

  it("stays at the drift speed once there", () => {
    expect(coast(-30, -30, 0.5)).toBe(-30);
  });
});

describe("flingVelocity", () => {
  it("measures px/s over the last 90ms of pointer samples", () => {
    const samples = [{ x: 0, t: 0 }, { x: 10, t: 100 }, { x: 40, t: 140 }, { x: 70, t: 180 }];
    // the window starts at 90ms: from (10, 100) to (70, 180) is 60px in 80ms
    expect(flingVelocity(samples)).toBeCloseTo(750);
  });

  it("clamps and handles too few samples", () => {
    expect(flingVelocity([{ x: 0, t: 0 }, { x: 1000, t: 10 }])).toBe(3000);
    expect(flingVelocity([{ x: 0, t: 0 }])).toBe(0);
  });
});

describe("glideStep", () => {
  it("covers most of a glide quickly and finishes exactly", () => {
    const first = glideStep(312, 1 / 60);
    expect(first).toBeGreaterThan(0);
    expect(first).toBeLessThan(312);
    let left = 312, moved = 0;
    for (let i = 0; i < 90; i++) { const s = glideStep(left, 1 / 60); moved += s; left -= s; }
    expect(moved).toBeCloseTo(312, 6);
    expect(glideStep(0.2, 1 / 60)).toBe(0.2);
    expect(glideStep(-312, 1 / 60)).toBeLessThan(0);
  });
});
