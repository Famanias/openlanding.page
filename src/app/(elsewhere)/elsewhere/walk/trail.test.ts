import { describe, expect, it } from "vitest";
import {
  TRAIL_LENGTH,
  WAYPOINTS,
  formatMetres,
  metresAt,
  metresToDoor,
  minutesTo,
  reachedCount,
  readoutLabel,
  signalBars,
  signalLabel,
  trailProgress,
  type Anchor,
} from "./trail";

describe("elsewhere trail data", () => {
  it("starts at the road and ends at the door, climbing all the way", () => {
    expect(WAYPOINTS[0].metres).toBe(0);
    expect(WAYPOINTS[WAYPOINTS.length - 1].metres).toBe(TRAIL_LENGTH);
    for (let i = 1; i < WAYPOINTS.length; i++) {
      expect(WAYPOINTS[i].metres).toBeGreaterThan(WAYPOINTS[i - 1].metres);
      expect(WAYPOINTS[i].elevation).toBeGreaterThan(WAYPOINTS[i - 1].elevation);
    }
  });

  it("gives every waypoint a unique id and real copy", () => {
    expect(new Set(WAYPOINTS.map((w) => w.id)).size).toBe(WAYPOINTS.length);
    for (const waypoint of WAYPOINTS) {
      expect(waypoint.name.length).toBeGreaterThan(3);
      expect(waypoint.note.length).toBeGreaterThan(40);
      expect(waypoint.note.toLowerCase()).not.toContain("lorem");
    }
  });
});

describe("elsewhere signal", () => {
  it("loses a bar at each threshold and has none past the plank bridge", () => {
    expect(signalBars(0)).toBe(4);
    expect(signalBars(189)).toBe(4);
    expect(signalBars(190)).toBe(3);
    expect(signalBars(420)).toBe(2);
    expect(signalBars(650)).toBe(1);
    expect(signalBars(880)).toBe(0);
    expect(signalBars(TRAIL_LENGTH)).toBe(0);
  });

  it("never reports signal for a negative distance as anything but full", () => {
    expect(signalBars(-50)).toBe(4);
  });

  it("words the meter", () => {
    expect(signalLabel(4)).toBe("4 bars");
    expect(signalLabel(1)).toBe("1 bar");
    expect(signalLabel(0)).toBe("No service");
  });
});

describe("elsewhere scroll-to-metres mapping", () => {
  const anchors: Anchor[] = [
    { y: 1000, metres: 0 },
    { y: 1400, metres: 420 },
    { y: 2000, metres: 880 },
    { y: 2400, metres: 1340 },
    { y: 3000, metres: 1900 },
  ];

  it("holds at the first and last anchors outside their range", () => {
    expect(metresAt(0, anchors)).toBe(0);
    expect(metresAt(999, anchors)).toBe(0);
    expect(metresAt(9000, anchors)).toBe(1900);
  });

  it("lands exactly on each waypoint's metres at its anchor", () => {
    for (const anchor of anchors) expect(metresAt(anchor.y, anchors)).toBe(anchor.metres);
  });

  it("interpolates between posts whatever their spacing", () => {
    expect(metresAt(1200, anchors)).toBe(210);
    expect(metresAt(1700, anchors)).toBe(650);
    expect(metresAt(2700, anchors)).toBe(1620);
  });

  it("is monotonic", () => {
    let last = -1;
    for (let y = 0; y <= 3200; y += 40) {
      const m = metresAt(y, anchors);
      expect(m).toBeGreaterThanOrEqual(last);
      last = m;
    }
  });

  it("sorts unordered anchors and survives stacked or missing ones", () => {
    expect(metresAt(1200, [...anchors].reverse())).toBe(210);
    expect(metresAt(500, [])).toBe(0);
    expect(metresAt(1000, [{ y: 1000, metres: 0 }, { y: 1000, metres: 420 }])).toBe(0);
    expect(metresAt(1001, [{ y: 1000, metres: 0 }, { y: 1000, metres: 420 }])).toBe(420);
  });
});

describe("elsewhere readout", () => {
  it("counts down in tens and stops at the door", () => {
    expect(metresToDoor(0)).toBe(1900);
    expect(metresToDoor(214)).toBe(1690);
    expect(metresToDoor(1896)).toBe(0);
    expect(metresToDoor(2400)).toBe(0);
    expect(metresToDoor(-20)).toBe(1900);
  });

  it("formats metres with a thousands separator", () => {
    expect(formatMetres(1900)).toBe("1,900 m");
    expect(formatMetres(420)).toBe("420 m");
  });

  it("words the distance, then the arrival", () => {
    expect(readoutLabel(1900)).toBe("1,900 m to the door");
    expect(readoutLabel(40)).toBe("40 m to the door");
    expect(readoutLabel(0)).toBe("At the door");
  });

  it("counts the waypoints behind you", () => {
    expect(reachedCount(0)).toBe(1);
    expect(reachedCount(419.5)).toBe(2);
    expect(reachedCount(900)).toBe(3);
    expect(reachedCount(1900)).toBe(5);
  });

  it("converts distance to trail progress and walking time", () => {
    expect(trailProgress(950)).toBe(0.5);
    expect(trailProgress(5000)).toBe(1);
    expect(minutesTo(0)).toBe(0);
    expect(minutesTo(1900)).toBe(35);
    expect(minutesTo(880)).toBe(16);
  });
});
