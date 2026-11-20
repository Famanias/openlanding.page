/**
 * Procedural SVG path builders for handcrafted Japanese kirigami paper geometry.
 * Pure, deterministic functions suitable for direct rendering and unit testing.
 */

export interface SakuraBlossomGeometry {
  petalPaths: string[];
  highlightPaths: string[];
  centerX: number;
  centerY: number;
  centerRadius: number;
  stamenLines: Array<{ x1: number; y1: number; x2: number; y2: number }>;
}

/**
 * Builds an authentic 5-petal Japanese sakura blossom with classic notched petal tips
 * and delicate radiating stamens (never generic circular dots).
 */
export function buildSakuraBlossomPaths(
  cx: number,
  cy: number,
  radius: number,
  rotationDeg = 0
): SakuraBlossomGeometry {
  const petalPaths: string[] = [];
  const highlightPaths: string[] = [];
  const stamenLines: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const baseRad = (rotationDeg * Math.PI) / 180;

  for (let i = 0; i < 5; i++) {
    const angle = baseRad + (i * Math.PI * 2) / 5;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const perpX = -sin;
    const perpY = cos;

    const rInner = radius * 0.16;
    const rMid = radius * 0.68;
    const rTip = radius;
    const rNotch = radius * 0.84;
    const spreadMid = radius * 0.38;
    const spreadTip = radius * 0.22;

    const sx = cx + cos * rInner;
    const sy = cy + sin * rInner;

    const c1x = cx + cos * rMid + perpX * spreadMid;
    const c1y = cy + sin * rMid + perpY * spreadMid;

    const tip1x = cx + cos * rTip + perpX * spreadTip;
    const tip1y = cy + sin * rTip + perpY * spreadTip;

    const notchX = cx + cos * rNotch;
    const notchY = cy + sin * rNotch;

    const tip2x = cx + cos * rTip - perpX * spreadTip;
    const tip2y = cy + sin * rTip - perpY * spreadTip;

    const c2x = cx + cos * rMid - perpX * spreadMid;
    const c2y = cy + sin * rMid - perpY * spreadMid;

    const d = [
      `M ${sx.toFixed(1)} ${sy.toFixed(1)}`,
      `Q ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${tip1x.toFixed(1)} ${tip1y.toFixed(1)}`,
      `L ${notchX.toFixed(1)} ${notchY.toFixed(1)}`,
      `L ${tip2x.toFixed(1)} ${tip2y.toFixed(1)}`,
      `Q ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}`,
      'Z',
    ].join(' ');

    petalPaths.push(d);

    // Subtle paper crease vein down the center of each petal
    const hx = cx + cos * (radius * 0.62);
    const hy = cy + sin * (radius * 0.62);
    highlightPaths.push(`M ${sx.toFixed(1)} ${sy.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`);

    // Delicate stamen line
    const stAngle = angle + 0.31;
    stamenLines.push({
      x1: Number((cx + Math.cos(stAngle) * radius * 0.08).toFixed(1)),
      y1: Number((cy + Math.sin(stAngle) * radius * 0.08).toFixed(1)),
      x2: Number((cx + Math.cos(stAngle) * radius * 0.34).toFixed(1)),
      y2: Number((cy + Math.sin(stAngle) * radius * 0.34).toFixed(1)),
    });
  }

  return {
    petalPaths,
    highlightPaths,
    centerX: cx,
    centerY: cy,
    centerRadius: Number((radius * 0.16).toFixed(1)),
    stamenLines,
  };
}

export interface PineFanGeometry {
  fanOutlinePath: string;
  needleCuts: string[];
  innerBaseArc: string;
}

/**
 * Generates a handcrafted Japanese kirigami fan-shaped pine needle pad
 * with individually notched radiating paper needles matching the reference artwork.
 */
export function buildPineFanPaths(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
  needleCount: number
): PineFanGeometry {
  const count = Math.max(5, needleCount);
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;
  const step = (endRad - startRad) / count;
  const innerR = radius * 0.16;

  const pts: string[] = [];
  const needleCuts: string[] = [];

  // Start at base center
  const baseStartX = cx + Math.cos(startRad) * innerR;
  const baseStartY = cy + Math.sin(startRad) * innerR;
  pts.push(`M ${baseStartX.toFixed(1)} ${baseStartY.toFixed(1)}`);

  for (let i = 0; i < count; i++) {
    const a0 = startRad + i * step;
    const aMid = a0 + step * 0.5;
    const a1 = a0 + step;

    // Slight organic length variation per needle so it looks hand-cut, not mechanical
    const wave = 1 - 0.12 * Math.pow((i / (count - 1)) * 2 - 1, 2);
    const jitter = ((i * 37) % 5) * 0.018;
    const tipR = radius * (wave + jitter);
    const valleyR = radius * 0.32;

    const tipX = cx + Math.cos(aMid) * tipR;
    const tipY = cy + Math.sin(aMid) * tipR;
    const edgeLeftX = cx + Math.cos(a0 + step * 0.15) * (tipR * 0.9);
    const edgeLeftY = cy + Math.sin(a0 + step * 0.15) * (tipR * 0.9);
    const edgeRightX = cx + Math.cos(a1 - step * 0.15) * (tipR * 0.9);
    const edgeRightY = cy + Math.sin(a1 - step * 0.15) * (tipR * 0.9);
    const valleyX = cx + Math.cos(a1) * valleyR;
    const valleyY = cy + Math.sin(a1) * valleyR;

    pts.push(
      `L ${edgeLeftX.toFixed(1)} ${edgeLeftY.toFixed(1)}`,
      `L ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
      `L ${edgeRightX.toFixed(1)} ${edgeRightY.toFixed(1)}`
    );

    if (i < count - 1) {
      pts.push(`L ${valleyX.toFixed(1)} ${valleyY.toFixed(1)}`);
      needleCuts.push(
        `M ${(cx + Math.cos(a1) * innerR).toFixed(1)} ${(cy + Math.sin(a1) * innerR).toFixed(1)} L ${valleyX.toFixed(1)} ${valleyY.toFixed(1)}`
      );
    }
  }

  const baseEndX = cx + Math.cos(endRad) * innerR;
  const baseEndY = cy + Math.sin(endRad) * innerR;
  pts.push(`L ${baseEndX.toFixed(1)} ${baseEndY.toFixed(1)}`, `Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${baseStartX.toFixed(1)} ${baseStartY.toFixed(1)}`, 'Z');

  const innerBaseArc = `M ${baseStartX.toFixed(1)} ${baseStartY.toFixed(1)} Q ${(cx + Math.cos((startRad + endRad) / 2) * innerR * 1.4).toFixed(1)} ${(cy + Math.sin((startRad + endRad) / 2) * innerR * 1.4).toFixed(1)} ${baseEndX.toFixed(1)} ${baseEndY.toFixed(1)}`;

  return {
    fanOutlinePath: pts.join(' '),
    needleCuts,
    innerBaseArc,
  };
}

/**
 * Generates a stepped paper-cut evergreen/cypress silhouette with crisp tiered branches.
 */
export function buildCypressSpirePath(
  cx: number,
  baseY: number,
  width: number,
  height: number,
  tiers = 5
): string {
  const halfW = width / 2;
  const topY = baseY - height;
  const leftPts: string[] = [];
  const rightPts: string[] = [];

  for (let i = 1; i <= tiers; i++) {
    const t = i / tiers;
    const yOuter = topY + height * t;
    const yNotch = yOuter - (height / tiers) * 0.28;
    const tierHalfW = halfW * (0.28 + 0.72 * t);
    const notchHalfW = tierHalfW * 0.54;

    rightPts.push(`L ${(cx + tierHalfW).toFixed(1)} ${yOuter.toFixed(1)}`);
    if (i < tiers) {
      rightPts.push(`L ${(cx + notchHalfW).toFixed(1)} ${yNotch.toFixed(1)}`);
    }

    if (i < tiers) {
      leftPts.unshift(`L ${(cx - notchHalfW).toFixed(1)} ${yNotch.toFixed(1)}`);
    }
    leftPts.unshift(`L ${(cx - tierHalfW).toFixed(1)} ${yOuter.toFixed(1)}`);
  }

  return [
    `M ${cx.toFixed(1)} ${topY.toFixed(1)}`,
    ...rightPts,
    `L ${(cx + halfW * 0.14).toFixed(1)} ${baseY.toFixed(1)}`,
    `L ${(cx - halfW * 0.14).toFixed(1)} ${baseY.toFixed(1)}`,
    ...leftPts,
    'Z',
  ].join(' ');
}

/**
 * Generates a curved, tapered cut-paper grass blade path.
 */
export function buildGrassBladePath(
  baseX: number,
  baseY: number,
  height: number,
  leanX: number,
  baseWidth: number
): string {
  const tipX = baseX + leanX;
  const tipY = baseY - height;
  const ctrlX = baseX + leanX * 0.35;
  const ctrlY = baseY - height * 0.58;
  const hw = baseWidth / 2;

  return [
    `M ${(baseX - hw).toFixed(1)} ${baseY.toFixed(1)}`,
    `Q ${(ctrlX - hw * 0.45).toFixed(1)} ${ctrlY.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
    `Q ${(ctrlX + hw * 0.55).toFixed(1)} ${ctrlY.toFixed(1)} ${(baseX + hw).toFixed(1)} ${baseY.toFixed(1)}`,
    'Z',
  ].join(' ');
}

/**
 * Generates scalloped paper foliage rosette path (like the foreground botanical clusters).
 */
export function buildFernRosettePath(
  cx: number,
  cy: number,
  radius: number,
  lobes = 9
): string {
  const pts: string[] = [];
  const step = (Math.PI * 2) / lobes;

  for (let i = 0; i < lobes; i++) {
    const a0 = i * step - Math.PI / 2;
    const aMid = a0 + step * 0.5;
    const a1 = a0 + step;
    const rOut = radius * (0.94 + ((i * 19) % 3) * 0.05);
    const rIn = radius * 0.52;

    const p0x = cx + Math.cos(a0) * rIn;
    const p0y = cy + Math.sin(a0) * rIn;
    const c1x = cx + Math.cos(a0 + step * 0.25) * rOut * 1.12;
    const c1y = cy + Math.sin(a0 + step * 0.25) * rOut * 1.12;
    const tipX = cx + Math.cos(aMid) * rOut;
    const tipY = cy + Math.sin(aMid) * rOut;
    const c2x = cx + Math.cos(a1 - step * 0.25) * rOut * 1.12;
    const c2y = cy + Math.sin(a1 - step * 0.25) * rOut * 1.12;

    if (i === 0) {
      pts.push(`M ${p0x.toFixed(1)} ${p0y.toFixed(1)}`);
    }
    pts.push(
      `Q ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}`,
      `Q ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${(cx + Math.cos(a1) * rIn).toFixed(1)} ${(cy + Math.sin(a1) * rIn).toFixed(1)}`
    );
  }
  pts.push('Z');
  return pts.join(' ');
}

export interface PetalParticleState {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  scale: number;
  phase: number;
  opacity: number;
  anchorIndex: number;
}

/**
 * Deterministic physics step for falling sakura petals.
 * Petals drift gracefully along curved paths with gentle gravity and wind gusts,
 * recycling cleanly at their origin blossom cluster once outside the viewport.
 */
export function stepPetalParticle(
  petal: PetalParticleState,
  dtSec: number,
  windIntensity: number,
  timeSec: number,
  anchors: Array<{ x: number; y: number; scale: number }>,
  bounds: { width: number; height: number }
): PetalParticleState {
  const clampedDt = Math.min(0.05, Math.max(0, dtSec));
  const gust = Math.sin(timeSec * 0.7 + petal.phase) * 14 * windIntensity;
  const flutter = Math.cos(timeSec * 2.1 + petal.phase * 1.7) * 18;

  const nextX = petal.x + (petal.vx * windIntensity + gust + flutter) * clampedDt;
  const nextY = petal.y + petal.vy * clampedDt;
  const nextRot = petal.rotation + (petal.vRot + flutter * 0.9) * clampedDt;

  const outOfBounds =
    nextY > bounds.height + 35 ||
    nextX < -60 ||
    nextX > bounds.width + 60;

  if (outOfBounds && anchors.length > 0) {
    const nextAnchorIdx = (petal.anchorIndex + 3) % anchors.length;
    const anchor = anchors[nextAnchorIdx];
    return {
      ...petal,
      x: anchor.x + Math.sin(petal.id * 4.3 + timeSec) * 16,
      y: anchor.y + Math.cos(petal.id * 2.7 + timeSec) * 10,
      rotation: (petal.id * 47) % 360,
      anchorIndex: nextAnchorIdx,
      opacity: 0.92,
    };
  }

  return {
    ...petal,
    x: nextX,
    y: nextY,
    rotation: nextRot,
  };
}
