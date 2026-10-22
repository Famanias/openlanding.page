import { describe, expect, it } from "vitest";
import { LEGS, STATIONS } from "../content/line";
import {
  clockAt,
  formatClock,
  kmAt,
  layerShift,
  legAt,
  legProgress,
  parseClock,
  progressFromOffsets,
  stepTarget,
  tunnelMouth,
  TUNNEL_RAMP,
} from "./journey";

describe("progressFromOffsets", () => {
  const box = { top: 1000, height: 5200, viewport: 900 };

  it("is 0 before the track and 1 after it", () => {
    expect(progressFromOffsets({ ...box, scrollY: 0 })).toBe(0);
    expect(progressFromOffsets({ ...box, scrollY: 999_999 })).toBe(1);
  });

  it("measures progress over the scrollable length (height − viewport)", () => {
    expect(progressFromOffsets({ ...box, scrollY: 1000 + 4300 / 2 })).toBeCloseTo(0.5);
  });

  it("is safe when the track is no taller than the viewport", () => {
    expect(progressFromOffsets({ top: 0, height: 500, viewport: 900, scrollY: 10 })).toBe(1);
  });
});

describe("legs", () => {
  it("cover 0–1 without gaps", () => {
    expect(LEGS[0].start).toBe(0);
    expect(LEGS.at(-1)?.end).toBe(1);
    for (let i = 1; i < LEGS.length; i++) expect(LEGS[i].start).toBe(LEGS[i - 1].end);
  });

  it("finds the leg for a progress value, with 1 in the last leg", () => {
    expect(legAt(0)).toBe(0);
    expect(legAt(0.19)).toBe(0);
    expect(legAt(0.2)).toBe(1);
    expect(legAt(0.5)).toBe(2);
    expect(legAt(1)).toBe(4);
    expect(legAt(-1)).toBe(0);
  });

  it("measures progress inside a leg", () => {
    expect(legProgress(0.1)).toBeCloseTo(0.5);
    expect(legProgress(0.42)).toBe(0);
    expect(legProgress(1)).toBe(1);
  });
});

describe("clock and km", () => {
  it("parses and formats times across midnight", () => {
    expect(parseClock("19:12")).toBe(1152);
    expect(formatClock(1152)).toBe("19:12");
    expect(formatClock(1440 + 88)).toBe("01:28");
  });

  it("reads the scheduled time at each station", () => {
    for (const s of STATIONS) expect(clockAt(s.at)).toBe(s.time);
  });

  it("interpolates between stations and never runs backwards across midnight", () => {
    // Vallorbe 23:04 (.33) → Brig 01:28 (.42): 144 minutes, halfway is 00:16
    expect(clockAt(0.375)).toBe("00:16");
    let last = -1;
    for (let p = 0; p <= 1; p += 0.01) {
      const m = clockMinutes(p);
      expect(m).toBeGreaterThanOrEqual(last);
      last = m;
    }
  });

  it("reads km along the line", () => {
    expect(kmAt(0)).toBe(0);
    expect(kmAt(0.1)).toBe(158);
    expect(kmAt(1)).toBe(1128);
  });
});

function clockMinutes(p: number): number {
  const [h, m] = clockAt(p).split(":").map(Number);
  const raw = h * 60 + m;
  return raw < 1152 ? raw + 1440 : raw;
}

describe("layerShift", () => {
  it("loops inside [0, 50) percent and moves faster for nearer layers", () => {
    for (let p = 0; p <= 1; p += 0.05) {
      const s = layerShift(p, 3);
      expect(s).toBeGreaterThanOrEqual(0);
      expect(s).toBeLessThan(50);
    }
    expect(layerShift(0.01, 2)).toBeCloseTo(layerShift(0.01, 1) * 2);
  });
});

describe("tunnelMouth", () => {
  const tunnel = LEGS.find((l) => l.id === "tunnel")!;

  it("is open (0, 0) far from the Simplon", () => {
    expect(tunnelMouth(0.1)).toEqual({ enter: 0, exit: 0 });
    expect(tunnelMouth(0.9)).toEqual({ enter: 1, exit: 1 });
  });

  it("closes across the ramp before Brig and stays dark inside", () => {
    expect(tunnelMouth(tunnel.start - TUNNEL_RAMP / 2).enter).toBeCloseTo(0.5);
    expect(tunnelMouth(tunnel.start)).toEqual({ enter: 1, exit: 0 });
    expect(tunnelMouth((tunnel.start + tunnel.end) / 2)).toEqual({ enter: 1, exit: 0 });
  });

  it("opens across the ramp after Domodossola", () => {
    expect(tunnelMouth(tunnel.end + TUNNEL_RAMP / 2).exit).toBeCloseTo(0.5);
  });
});

describe("stepTarget", () => {
  it("steps forward to the next leg's start and stops at the end", () => {
    expect(stepTarget(0.05, 1)).toBe(0.2);
    expect(stepTarget(0.2, 1)).toBe(0.42);
    expect(stepTarget(0.9, 1)).toBe(1);
    expect(stepTarget(1, 1)).toBe(1);
  });

  it("steps back to the current leg's start, then the previous one", () => {
    expect(stepTarget(0.3, -1)).toBe(0.2);
    expect(stepTarget(0.2, -1)).toBe(0);
    expect(stepTarget(0, -1)).toBe(0);
    expect(stepTarget(1, -1)).toBe(0.78);
  });
});
