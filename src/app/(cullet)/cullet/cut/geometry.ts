/**
 * Plane geometry for the cut: insetting a shard away from its neighbours and rounding its corners.
 * Pure and coordinate-agnostic, so the SVG poster (y down) and the WebGL slab (y up) share it.
 */
export type Pt = { x: number; y: number };

/** Twice-signed area halved: positive when the points wind counter-clockwise in a y-up frame. */
export function signedArea(pts: Pt[]): number {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    area += a.x * b.y - b.x * a.y;
  }
  return area / 2;
}

export function centroid(pts: Pt[]): Pt {
  let x = 0, y = 0;
  for (const p of pts) { x += p.x; y += p.y; }
  return { x: x / pts.length, y: y / pts.length };
}

/** Moves every edge of a convex polygon `d` inward and returns the new corners (positive winding). */
export function insetPolygon(points: Pt[], d: number): Pt[] {
  const n = points.length;
  if (n < 3) return points.slice();
  const pts = signedArea(points) < 0 ? points.slice().reverse() : points.slice();
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const l1 = Math.hypot(curr.x - prev.x, curr.y - prev.y) || 1;
    const u1x = (curr.x - prev.x) / l1, u1y = (curr.y - prev.y) / l1;
    const l2 = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;
    const u2x = (next.x - curr.x) / l2, u2y = (next.y - curr.y) / l2;
    // the inward normal of a positively wound edge is its left normal (-uy, ux)
    const p1x = curr.x - u1y * d, p1y = curr.y + u1x * d;
    const p2x = curr.x - u2y * d, p2y = curr.y + u2x * d;
    const denom = u1x * u2y - u1y * u2x;
    if (Math.abs(denom) < 1e-4) { out.push({ x: p1x, y: p1y }); continue; }
    const t = ((p2x - p1x) * u2y - (p2y - p1y) * u2x) / denom;
    out.push({ x: p1x + u1x * t, y: p1y + u1y * t });
  }
  return out;
}

/** One rounded corner: leave the edge at `start`, curve through the vertex `ctrl`, rejoin at `end`. */
export type Corner = { start: Pt; ctrl: Pt; end: Pt };

/** Tangent points for a quadratic rounding of every vertex, never eating more than 42% of an edge. */
export function roundedCorners(pts: Pt[], radius: number): Corner[] {
  const n = pts.length;
  const corners: Corner[] = [];
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n];
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const l1 = Math.hypot(prev.x - curr.x, prev.y - curr.y) || 1;
    const d1x = (prev.x - curr.x) / l1, d1y = (prev.y - curr.y) / l1;
    const l2 = Math.hypot(next.x - curr.x, next.y - curr.y) || 1;
    const d2x = (next.x - curr.x) / l2, d2y = (next.y - curr.y) / l2;
    const dot = Math.min(0.999, Math.max(-0.999, d1x * d2x + d1y * d2y));
    const tanHalf = Math.tan(Math.acos(dot) / 2);
    const dist = Math.min(radius / Math.max(0.15, tanHalf), Math.min(l1, l2) * 0.42);
    corners.push({
      start: { x: curr.x + d1x * dist, y: curr.y + d1y * dist },
      ctrl: curr,
      end: { x: curr.x + d2x * dist, y: curr.y + d2y * dist },
    });
  }
  return corners;
}

const f = (v: number) => Number(v.toFixed(2));

/** The rounded polygon as an SVG path, offset by `(ox, oy)`. */
export function roundedPath(pts: Pt[], radius: number, ox = 0, oy = 0): string {
  if (pts.length < 3) return "";
  const c = roundedCorners(pts, radius);
  let d = `M${f(c[0].start.x - ox)} ${f(c[0].start.y - oy)}`;
  for (let i = 0; i < c.length; i++) {
    const next = c[(i + 1) % c.length];
    d += `Q${f(c[i].ctrl.x - ox)} ${f(c[i].ctrl.y - oy)} ${f(c[i].end.x - ox)} ${f(c[i].end.y - oy)}`;
    d += `L${f(next.start.x - ox)} ${f(next.start.y - oy)}`;
  }
  return `${d}Z`;
}

export function bounds(pts: Pt[]) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const p of pts) {
    minX = Math.min(minX, p.x); minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x); maxY = Math.max(maxY, p.y);
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}
