import { describe, expect, test } from "vitest";
import { CAMPS, activeCamp, altitudeAt, formatAltitude, progressFromOffsets } from "./camps";

describe("CAMPS", () => {
  test("follow the Abruzzi Spur from base camp to the summit", () => {
    expect(CAMPS.map((c) => [c.id, c.altitude])).toEqual([
      ["base", 5000],
      ["c1", 6050],
      ["c2", 6700],
      ["c3", 7350],
      ["c4", 7900],
      ["bottleneck", 8200],
      ["summit", 8611],
    ]);
  });
});

describe("altitudeAt", () => {
  test("interpolates camps at equal progress spacing", () => {
    expect(altitudeAt(0)).toBe(5000);
    expect(altitudeAt(0.5)).toBe(7350);
    expect(altitudeAt(1)).toBe(8611);
  });

  test("clamps outside 0..1", () => {
    expect(altitudeAt(-1)).toBe(5000);
    expect(altitudeAt(2)).toBe(8611);
  });

  test("is linear between two camps", () => {
    expect(altitudeAt(1 / 12)).toBe(5525); // halfway between 5,000 and 6,050
  });
});

describe("activeCamp", () => {
  test("is the last camp reached", () => {
    expect(activeCamp(0.49)).toBe(2);
    expect(activeCamp(0.5)).toBe(3);
    expect(activeCamp(0)).toBe(0);
    expect(activeCamp(1)).toBe(6);
  });
});

describe("formatAltitude", () => {
  test("uses thousands separators and an uppercase M", () => {
    expect(formatAltitude(8611)).toBe("8,611 M");
    expect(formatAltitude(5000)).toBe("5,000 M");
  });
});

describe("progressFromOffsets", () => {
  // Seven chapters of uneven height; tops measured in page pixels.
  const tops = [1000, 1800, 3000, 3600, 4400, 5000, 6200];

  test("is 0 until the first chapter reaches the reading line", () => {
    expect(progressFromOffsets(500, tops)).toBe(0);
    expect(progressFromOffsets(1000, tops)).toBe(0);
  });

  test("reaches camp i exactly when chapter i reaches the reading line", () => {
    expect(progressFromOffsets(3000, tops)).toBeCloseTo(2 / 6);
    expect(progressFromOffsets(6200, tops)).toBe(1);
  });

  test("moves linearly within a chapter", () => {
    expect(progressFromOffsets(1400, tops)).toBeCloseTo(0.5 / 6); // halfway through chapter 0
  });

  test("stays at 1 past the summit chapter", () => {
    expect(progressFromOffsets(9000, tops)).toBe(1);
  });
});
