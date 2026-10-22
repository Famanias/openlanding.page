/** Wedge geometry for the satsuma segment motif. Pure; angles start at twelve and run clockwise. */

export type Wedge = { path: string; angle: number };

function pt(cx: number, cy: number, r: number, turn: number): string {
  const a = turn * Math.PI * 2 - Math.PI / 2;
  return `${round(cx + r * Math.cos(a))} ${round(cy + r * Math.sin(a))}`;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * `count` wedges around (cx, cy) between radii `inner` and `outer`, each separated by `gap` of a turn.
 * One wedge per reel in a pack.
 */
export function segmentWedges(count: number, cx: number, cy: number, inner: number, outer: number, gap = 0.012): Wedge[] {
  const wedges: Wedge[] = [];
  for (let i = 0; i < count; i++) {
    const a0 = i / count + gap / 2;
    const a1 = (i + 1) / count - gap / 2;
    const large = a1 - a0 > 0.5 ? 1 : 0;
    const path = [
      `M${pt(cx, cy, outer, a0)}`,
      `A${outer} ${outer} 0 ${large} 1 ${pt(cx, cy, outer, a1)}`,
      `L${pt(cx, cy, inner, a1)}`,
      `A${inner} ${inner} 0 ${large} 0 ${pt(cx, cy, inner, a0)}`,
      "Z",
    ].join("");
    wedges.push({ path, angle: ((a0 + a1) / 2) * 360 });
  }
  return wedges;
}
