import { describe, expect, it } from "vitest";
import { bounds, centroid, insetPolygon, roundedCorners, roundedPath, signedArea, type Pt } from "./geometry";
import { project, solveHomography, toMatrix3d } from "./homography";
import { cellPolys, cleaveFactor, CUT_POINTS, flight, livePoints, navPolys, posterShards, shatterFactor, slabBands } from "./pattern";

const square = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 10 }, { x: 0, y: 10 }];
const areaOf = (pts: { x: number; y: number }[]) => Math.abs(signedArea(pts));

describe("geometry", () => {
  it("measures area and centre", () => {
    expect(areaOf(square)).toBe(100);
    expect(centroid(square)).toEqual({ x: 5, y: 5 });
  });

  it("insets a polygon evenly, whichever way it winds", () => {
    for (const pts of [square, square.slice().reverse()]) {
      const inset = insetPolygon(pts, 1);
      expect(areaOf(inset)).toBeCloseTo(64);
      const b = bounds(inset);
      expect(b.x).toBeCloseTo(1);
      expect(b.w).toBeCloseTo(8);
    }
  });

  it("rounds corners without passing the middle of an edge", () => {
    const corners = roundedCorners(square, 100);
    for (const c of corners) {
      expect(Math.hypot(c.start.x - c.ctrl.x, c.start.y - c.ctrl.y)).toBeLessThanOrEqual(4.2 + 1e-9);
    }
    const right = roundedCorners(square, 2)[1];
    expect(Math.hypot(right.end.x - right.ctrl.x, right.end.y - right.ctrl.y)).toBeCloseTo(2);
  });

  it("writes a closed SVG path offset into the shard's own box", () => {
    const d = roundedPath(square, 2, 5, 5);
    expect(d.startsWith("M")).toBe(true);
    expect(d.endsWith("Z")).toBe(true);
    expect(d.match(/Q/g)).toHaveLength(4);
    expect(d).toContain("-5");
  });
});

describe("the cut", () => {
  it("tiles the slab: the eight shards cover it exactly with no overlap", () => {
    const total = cellPolys(livePoints(0, 0)).reduce((sum, poly) => sum + areaOf(poly), 0);
    expect(total).toBeCloseTo(1, 6);
  });

  it("keeps tiling while the cut drifts and gives way to the pointer", () => {
    for (const t of [3.7, 11, 42]) {
      const total = cellPolys(livePoints(t, 0.017, { x: 0.4, y: 0.5 })).reduce((sum, poly) => sum + areaOf(poly), 0);
      expect(total).toBeCloseTo(1, 6);
    }
  });

  it("keeps a real body on every shard once the gaps are cut", () => {
    for (const poly of cellPolys(livePoints(5, 0.017))) {
      const px = poly.map((p) => ({ x: p.x * 1280, y: p.y * 640 }));
      expect(areaOf(insetPolygon(px, 7))).toBeGreaterThan(areaOf(px) * 0.8);
    }
  });

  it("pins edge points to their edges", () => {
    const p = livePoints(9, 0.017, { x: 0.3, y: 0.3 });
    expect(p.t1.y).toBe(0);
    expect(p.r1.x).toBe(1);
    expect(p.l1.x).toBe(0);
    expect(p.b1.y).toBe(1);
  });

  it("pushes points away from the pointer", () => {
    const still = livePoints(0, 0);
    const pushed = livePoints(0, 0, { x: CUT_POINTS.J5.x - 0.1, y: CUT_POINTS.J5.y });
    expect(pushed.J5.x).toBeGreaterThan(still.J5.x);
  });

  it("splits the nav into three bands that cover it", () => {
    for (const portrait of [false, true]) {
      const total = navPolys(2, portrait).reduce((sum, poly) => sum + areaOf(poly), 0);
      expect(total).toBeCloseTo(1, 6);
    }
  });

  it("lays out eleven poster shards inside the slab", () => {
    const shards = posterShards(1280, 760);
    expect(shards).toHaveLength(11);
    for (const s of shards) {
      expect(s.x).toBeGreaterThanOrEqual(0);
      expect(s.y).toBeGreaterThanOrEqual(0);
      expect(s.x + s.w).toBeLessThanOrEqual(1280);
      expect(s.y + s.h).toBeLessThanOrEqual(760);
      expect(Math.hypot(s.out.x, s.out.y)).toBeCloseTo(1);
    }
    const { nav } = slabBands(1280, 760);
    expect(shards[0].y + shards[0].h).toBeLessThanOrEqual(nav);
  });
});

describe("the cleave and the shatter", () => {
  it("cleaves the nav first and lands every shard by the end", () => {
    expect(cleaveFactor(0, 0)).toBe(0);
    expect(cleaveFactor(0.3, 0)).toBeGreaterThan(cleaveFactor(0.3, 10));
    for (let i = 0; i < 11; i++) expect(cleaveFactor(1, i)).toBe(1);
  });

  it("shatters out and reassembles back to rest", () => {
    expect(shatterFactor(0, 0, "out")).toBe(0);
    expect(shatterFactor(5, 10, "out")).toBe(1);
    expect(shatterFactor(0, 0, "in")).toBeCloseTo(1);
    expect(shatterFactor(5, 10, "in")).toBeCloseTo(0);
  });

  it("flies out, toward the viewer, and falls only when timed", () => {
    const timed = flight(1, { x: 1, y: 0 }, 1, 500);
    expect(timed).toEqual({ x: 520, y: 640, z: 500 });
    expect(flight(1, { x: 0, y: -1 }, 1, 500, false).y).toBe(-520);
    expect(flight(0, { x: 1, y: 0 }, 1, 500)).toEqual({ x: 0, y: 0, z: 0 });
  });
});

describe("homography", () => {
  it("maps the rectangle's corners onto the targets", () => {
    const dst: [Pt, Pt, Pt, Pt] = [{ x: 10, y: 20 }, { x: 410, y: 5 }, { x: 430, y: 330 }, { x: 0, y: 300 }];
    const hc = solveHomography(400, 300, dst);
    const corners = [[0, 0], [400, 0], [400, 300], [0, 300]];
    corners.forEach(([x, y], i) => {
      const p = project(hc, x, y);
      expect(p.x).toBeCloseTo(dst[i].x, 4);
      expect(p.y).toBeCloseTo(dst[i].y, 4);
    });
  });

  it("is the identity for an untouched rectangle", () => {
    const hc = solveHomography(200, 100, [{ x: 0, y: 0 }, { x: 200, y: 0 }, { x: 200, y: 100 }, { x: 0, y: 100 }]);
    expect(toMatrix3d(hc)).toBe("matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)");
  });
});
