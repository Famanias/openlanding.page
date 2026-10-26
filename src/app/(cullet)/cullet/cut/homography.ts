import type { Pt } from "./geometry";

/**
 * The projective map taking the rectangle (0,0)–(w,h) to four screen corners (clockwise from top-left),
 * as the eight coefficients of a 3×3 homography with h33 = 1. Solved by Gaussian elimination with pivoting.
 * This is what keeps real, selectable DOM text glued to the tilted glass.
 */
export function solveHomography(w: number, h: number, dst: [Pt, Pt, Pt, Pt]): number[] {
  const src = [[0, 0], [w, 0], [w, h], [0, h]];
  const A: number[][] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const { x: X, y: Y } = dst[i];
    A.push([x, y, 1, 0, 0, 0, -x * X, -y * X, X]);
    A.push([0, 0, 0, x, y, 1, -x * Y, -y * Y, Y]);
  }
  const n = 8;
  for (let i = 0; i < n; i++) {
    let max = i;
    for (let k = i + 1; k < n; k++) if (Math.abs(A[k][i]) > Math.abs(A[max][i])) max = k;
    [A[i], A[max]] = [A[max], A[i]];
    const pivot = A[i][i];
    if (Math.abs(pivot) < 1e-12) continue;
    for (let j = i; j <= n; j++) A[i][j] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = A[k][i];
      for (let j = i; j <= n; j++) A[k][j] -= factor * A[i][j];
    }
  }
  return A.map((row) => row[n]);
}

/** Applies the homography to a point: what the CSS transform will do to it. */
export function project(hc: number[], x: number, y: number): Pt {
  const [h11, h12, h13, h21, h22, h23, h31, h32] = hc;
  const wz = h31 * x + h32 * y + 1;
  return { x: (h11 * x + h12 * y + h13) / wz, y: (h21 * x + h22 * y + h23) / wz };
}

/** The homography as a column-major CSS `matrix3d()` for an element with `transform-origin: 0 0`. */
export function toMatrix3d(hc: number[]): string {
  const [h11, h12, h13, h21, h22, h23, h31, h32] = hc.map((v) => (Math.abs(v) < 1e-10 ? 0 : Number(v.toPrecision(8))));
  return `matrix3d(${h11},${h21},0,${h31},${h12},${h22},0,${h32},0,0,1,0,${h13},${h23},0,1)`;
}
