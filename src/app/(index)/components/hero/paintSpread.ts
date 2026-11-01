export type PaintColorRGB = readonly [number, number, number];

export const HERO_PAINT_PALETTE: readonly PaintColorRGB[] = [
  [231, 138, 105], // --color-coral
  [246, 195, 161], // --color-peach
  [110, 152, 116], // --color-moss
  [218, 240, 188], // --color-accent
];

const PAPER_RGB: PaintColorRGB = [16, 18, 17]; // --color-paper

export interface RibbonNode {
  theta: number;
  baseX: number;
  baseY: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  spread: number;
}

export interface PaintRibbon {
  id: "coral" | "moss";
  outerColor: PaintColorRGB;
  innerColor: PaintColorRGB;
  opacity: number;
  baseWidth: number;
  nodes: RibbonNode[];
}

export interface PaintSmudge {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  radiusX: number;
  radiusY: number;
  spreadRateX: number;
  spreadRateY: number;
  alpha: number;
  age: number;
  maxAge: number;
  persistent: boolean;
  color: PaintColorRGB;
}

export interface PaintParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  age: number;
  maxAge: number;
  seed: number;
  color: PaintColorRGB;
}

export interface HeroPaintSimulationOptions {
  width: number;
  height: number;
  maxSmudges?: number;
  maxParticles?: number;
}

const RIBBON_NODE_COUNT = 96;
const FIELD_COLS = 48;
const FIELD_ROWS = 24;

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function computeRibbonBasePoint(
  id: "coral" | "moss",
  theta: number,
  width: number
): { x: number; y: number } {
  const isMobile = width < 640;
  const boxWidth = (isMobile ? 2.2 : 1.45) * width;
  const boxHeight = 480;
  const left = (id === "coral" ? (isMobile ? -0.6 : -0.2) : 0.12) * width;
  const top = id === "coral" ? 185 : -340;
  const cx = left + boxWidth * 0.5;
  const cy = top + boxHeight * 0.5;

  const ringFactor = id === "coral" ? 0.686 : 0.7;
  const rx = boxWidth * 0.5 * ringFactor;
  const ry = boxHeight * 0.5 * ringFactor;
  const rot = ((id === "coral" ? -12 : -20) * Math.PI) / 180;
  const cosR = Math.cos(rot);
  const sinR = Math.sin(rot);

  const ex = Math.cos(theta) * rx;
  const ey = Math.sin(theta) * ry;

  return {
    x: cx + ex * cosR - ey * sinR,
    y: cy + ex * sinR + ey * cosR,
  };
}

function buildRibbon(id: "coral" | "moss", width: number): PaintRibbon {
  const nodes: RibbonNode[] = [];
  for (let i = 0; i < RIBBON_NODE_COUNT; i++) {
    const theta = (i / RIBBON_NODE_COUNT) * Math.PI * 2;
    const pt = computeRibbonBasePoint(id, theta, width);
    nodes.push({
      theta,
      baseX: pt.x,
      baseY: pt.y,
      offsetX: 0,
      offsetY: 0,
      x: pt.x,
      y: pt.y,
      vx: 0,
      vy: 0,
      spread: 1,
    });
  }

  if (id === "coral") {
    return {
      id,
      outerColor: HERO_PAINT_PALETTE[0],
      innerColor: HERO_PAINT_PALETTE[1],
      opacity: width < 640 ? 0.28 : 0.72,
      baseWidth: 52,
      nodes,
    };
  }

  return {
    id,
    outerColor: HERO_PAINT_PALETTE[2],
    innerColor: HERO_PAINT_PALETTE[3],
    opacity: 0.3,
    baseWidth: 46,
    nodes,
  };
}

function pickPaletteColor(normX: number, normY: number, index: number): PaintColorRGB {
  const warmBias = normY * 0.65 + (1 - Math.abs(normX - 0.45)) * 0.35;
  if (index % 4 === 0) {
    return warmBias > 0.48 ? HERO_PAINT_PALETTE[0] : HERO_PAINT_PALETTE[2];
  }
  if (index % 4 === 1) {
    return warmBias > 0.42 ? HERO_PAINT_PALETTE[1] : HERO_PAINT_PALETTE[3];
  }
  if (index % 4 === 2) {
    return HERO_PAINT_PALETTE[2];
  }
  return HERO_PAINT_PALETTE[3];
}

function distanceToSegment(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const abx = bx - ax;
  const aby = by - ay;
  const lenSq = abx * abx + aby * aby;
  if (lenSq === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * abx + (py - ay) * aby) / lenSq));
  return Math.hypot(px - (ax + abx * t), py - (ay + aby * t));
}

export function createHeroPaintSimulation(options: HeroPaintSimulationOptions) {
  let width = Math.max(1, options.width);
  let height = Math.max(1, options.height);
  const maxSmudges = options.maxSmudges ?? 64;
  const maxParticles = options.maxParticles ?? 140;

  const ribbons: PaintRibbon[] = [
    buildRibbon("coral", width),
    buildRibbon("moss", width),
  ];
  const smudges: PaintSmudge[] = [];
  const particles: PaintParticle[] = [];

  // 2D persistent UV displacement & spread grid for the multi-fold silk field
  const cellCount = FIELD_COLS * FIELD_ROWS;
  const fieldOffsetU = new Float32Array(cellCount);
  const fieldOffsetV = new Float32Array(cellCount);
  const fieldVelU = new Float32Array(cellCount);
  const fieldVelV = new Float32Array(cellCount);
  const fieldSpread = new Float32Array(cellCount).fill(1);

  let lastX: number | null = null;
  let lastY: number | null = null;
  let strokeCount = 0;

  const ribbonOffset = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    scaleX: 1,
    targetScaleX: 1,
  };

  const spreadFieldAndRibbons = (
    ax: number,
    ay: number,
    bx: number,
    by: number
  ): PaintRibbon | null => {
    const dx = bx - ax;
    const dy = by - ay;
    const dist = Math.hypot(dx, dy);
    const brushRadius = 175;
    let strongestRibbon: PaintRibbon | null = null;
    let strongestInfluence = 0;

    // 1. Deform & spread the 2D multi-fold silk field cells permanently
    const du = dx / width;
    const dv = dy / height;
    const fieldRadiusPx = Math.max(150, Math.min(width, height) * 0.28);

    for (let r = 0; r < FIELD_ROWS; r++) {
      const cy = ((r + 0.5) / FIELD_ROWS) * height;
      for (let c = 0; c < FIELD_COLS; c++) {
        const cx = ((c + 0.5) / FIELD_COLS) * width;
        const d = distanceToSegment(cx, cy, ax, ay, bx, by);
        if (d >= fieldRadiusPx) continue;

        const influence = Math.pow(1 - d / fieldRadiusPx, 1.4);
        const idx = r * FIELD_COLS + c;
        const outX = (cx - bx) / width;
        const outY = (cy - by) / height;
        const outLen = Math.hypot(outX, outY) || 1;

        fieldSpread[idx] = Math.min(
          3.2,
          fieldSpread[idx] + (0.14 + (dist / width) * 1.8) * influence
        );
        fieldOffsetU[idx] = Math.max(
          -0.38,
          Math.min(
            0.38,
            fieldOffsetU[idx] + (du * 0.52 + (outX / outLen) * 0.014) * influence
          )
        );
        fieldOffsetV[idx] = Math.max(
          -0.38,
          Math.min(
            0.38,
            fieldOffsetV[idx] + (dv * 0.52 + (outY / outLen) * 0.014) * influence
          )
        );
        fieldVelU[idx] += du * 2.4 * influence;
        fieldVelV[idx] += dv * 2.4 * influence;
      }
    }

    // 2. Deform & spread ribbon nodes permanently
    for (const ribbon of ribbons) {
      for (const node of ribbon.nodes) {
        const d = distanceToSegment(node.x, node.y, ax, ay, bx, by);
        if (d >= brushRadius) continue;

        const influence = Math.pow(1 - d / brushRadius, 1.35);
        if (influence > strongestInfluence) {
          strongestInfluence = influence;
          strongestRibbon = ribbon;
        }

        const outDx = node.x - bx;
        const outDy = node.y - by;
        const outLen = Math.hypot(outDx, outDy) || 1;
        const outUnitX = outDx / outLen;
        const outUnitY = outDy / outLen;

        node.spread = Math.min(3.4, node.spread + (0.14 + dist * 0.008) * influence);
        node.offsetX += (dx * 0.36 + outUnitX * (3.2 + dist * 0.08)) * influence;
        node.offsetY += (dy * 0.36 + outUnitY * (3.2 + dist * 0.08)) * influence;
        node.vx += (dx * 4.8 + outUnitX * (22 + dist * 0.35)) * influence;
        node.vy += (dy * 4.8 + outUnitY * (22 + dist * 0.35)) * influence;
        node.x = node.baseX + node.offsetX;
        node.y = node.baseY + node.offsetY;
      }
    }

    return strongestInfluence > 0.12 ? strongestRibbon : ribbons[0];
  };

  const sampleFieldCell = (
    u: number,
    v: number
  ): { offsetU: number; offsetV: number; spread: number } => {
    const gx = Math.max(0, Math.min(FIELD_COLS - 1.001, u * (FIELD_COLS - 1)));
    const gy = Math.max(0, Math.min(FIELD_ROWS - 1.001, v * (FIELD_ROWS - 1)));
    const c0 = Math.floor(gx);
    const r0 = Math.floor(gy);
    const c1 = Math.min(FIELD_COLS - 1, c0 + 1);
    const r1 = Math.min(FIELD_ROWS - 1, r0 + 1);
    const tx = gx - c0;
    const ty = gy - r0;

    const i00 = r0 * FIELD_COLS + c0;
    const i10 = r0 * FIELD_COLS + c1;
    const i01 = r1 * FIELD_COLS + c0;
    const i11 = r1 * FIELD_COLS + c1;

    const w00 = (1 - tx) * (1 - ty);
    const w10 = tx * (1 - ty);
    const w01 = (1 - tx) * ty;
    const w11 = tx * ty;

    return {
      offsetU:
        fieldOffsetU[i00] * w00 +
        fieldOffsetU[i10] * w10 +
        fieldOffsetU[i01] * w01 +
        fieldOffsetU[i11] * w11,
      offsetV:
        fieldOffsetV[i00] * w00 +
        fieldOffsetV[i10] * w10 +
        fieldOffsetV[i01] * w01 +
        fieldOffsetV[i11] * w11,
      spread:
        fieldSpread[i00] * w00 +
        fieldSpread[i10] * w10 +
        fieldSpread[i01] * w01 +
        fieldSpread[i11] * w11,
    };
  };

  const renderFieldToBuffer = (
    data: Uint8ClampedArray,
    bufWidth: number,
    bufHeight: number
  ) => {
    const [coralR, coralG, coralB] = HERO_PAINT_PALETTE[0];
    const [peachR, peachG, peachB] = HERO_PAINT_PALETTE[1];
    const [mossR, mossG, mossB] = HERO_PAINT_PALETTE[2];
    const [mintR, mintG, mintB] = HERO_PAINT_PALETTE[3];
    const [paperR, paperG, paperB] = PAPER_RGB;

    for (let y = 0; y < bufHeight; y++) {
      const v = y / Math.max(1, bufHeight - 1);
      const topBottomVignette = smoothstep(0.0, 0.2, v) * smoothstep(1.0, 0.82, v);

      for (let x = 0; x < bufWidth; x++) {
        const u = x / Math.max(1, bufWidth - 1);
        const { offsetU, offsetV, spread } = sampleFieldCell(u, v);

        // Advected coordinates where the user's hand smeared the silk folds
        const su = u - offsetU;
        const sv = v - offsetV;

        // Diagonal fold coordinates sweeping bottom-left to top-right (matching reference image)
        const s = su * 0.92 - sv * 0.39;
        const t = su * 0.39 + sv * 0.92;

        // Flowing S-curve undulation along each silk fold
        const wave =
          Math.sin(s * 6.4 + t * 2.2) * 0.044 +
          Math.cos(s * 3.8 - t * 3.1) * 0.028;

        // Parallel diagonal folds (~6 ridges across the viewport)
        const foldPhase = (t + wave) * 18.8;
        const rawCrest = 0.5 + 0.5 * Math.cos(foldPhase);
        const subHarmonic = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(foldPhase * 0.5 + s * 2.5));

        // Spreading flattens & widens the ridges into diffused painterly washes
        const exponent = Math.max(0.58, 1.62 / spread);
        const ridge = Math.pow(rawCrest, exponent) * subHarmonic;

        // Diagonal curtain envelope + right-side radiant bloom (matching reference composition)
        const curtainWidth = 0.42 + (spread - 1) * 0.14;
        const curtainEnv = Math.exp(-Math.pow((t - 0.55) / curtainWidth, 2));
        const rightBloom =
          0.26 + 0.74 * smoothstep(-0.12, 0.94, su * 0.8 + (1 - sv) * 0.3);
        const spreadGlow = (spread - 1) * 0.12 * curtainEnv;

        const intensity = Math.min(
          1,
          (ridge * curtainEnv * rightBloom + spreadGlow) * topBottomVignette * 0.70
        );
        const crestHighlight = Math.pow(intensity, 2.3) * 0.55;

        // Blend between moss/mint folds and warm coral/peach folds from the index palette
        const warmMix = smoothstep(0.32, 0.78, sv + Math.sin(su * 3.4) * 0.08) * 0.52;
        const midR = (mossR * (1 - warmMix) + coralR * warmMix) * 0.82;
        const midG = (mossG * (1 - warmMix) + coralG * warmMix) * 0.82;
        const midB = (mossB * (1 - warmMix) + coralB * warmMix) * 0.82;

        const hiR = (mintR * (1 - warmMix) + peachR * warmMix) * 0.78;
        const hiG = (mintG * (1 - warmMix) + peachG * warmMix) * 0.78;
        const hiB = (mintB * (1 - warmMix) + peachB * warmMix) * 0.78;

        const r = paperR + (midR - paperR) * intensity + (hiR - midR) * crestHighlight;
        const g = paperG + (midG - paperG) * intensity + (hiG - midG) * crestHighlight;
        const b = paperB + (midB - paperB) * intensity + (hiB - midB) * crestHighlight;

        const idx = (y * bufWidth + x) * 4;
        data[idx] = Math.max(0, Math.min(255, Math.round(r)));
        data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
        data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
        data[idx + 3] = 255;
      }
    }
  };

  const spawnSmudge = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    angle: number,
    speed: number,
    sourceRibbon: PaintRibbon | null
  ) => {
    const normX = Math.max(0, Math.min(1, x / width));
    const normY = Math.max(0, Math.min(1, y / height));
    const index = strokeCount++;
    const color = sourceRibbon
      ? index % 2 === 0
        ? sourceRibbon.outerColor
        : sourceRibbon.innerColor
      : pickPaletteColor(normX, normY, index);
    const clampedSpeed = Math.min(420, Math.max(25, speed));
    const persistent = sourceRibbon !== null;

    smudges.push({
      x,
      y,
      vx: vx * 0.55,
      vy: vy * 0.55,
      angle,
      radiusX: (persistent ? 68 : 52) + clampedSpeed * 0.16,
      radiusY: (persistent ? 44 : 34) + clampedSpeed * 0.06,
      spreadRateX: 48 + clampedSpeed * 0.24,
      spreadRateY: 26 + clampedSpeed * 0.1,
      alpha: persistent ? 0.13 : 0.11,
      age: 0,
      maxAge: 2.1,
      persistent,
      color,
    });

    if (smudges.length > maxSmudges) {
      const removableIdx = smudges.findIndex((s) => !s.persistent);
      smudges.splice(removableIdx >= 0 ? removableIdx : 0, 1);
    }
  };

  const spawnParticle = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    angle: number,
    speed: number,
    idx: number,
    sourceRibbon: PaintRibbon | null
  ) => {
    const normX = Math.max(0, Math.min(1, x / width));
    const normY = Math.max(0, Math.min(1, y / height));
    const color = sourceRibbon
      ? (strokeCount + idx) % 2 === 0
        ? sourceRibbon.innerColor
        : sourceRibbon.outerColor
      : pickPaletteColor(normX, normY, strokeCount + idx);
    const spreadAngle = angle + ((idx % 5) - 2) * 0.42 + Math.sin(strokeCount * 1.7 + idx) * 0.28;
    const burstSpeed = 24 + Math.min(180, speed * 0.38) * (0.55 + ((idx * 37) % 10) * 0.06);
    const lateralOffset = ((idx % 3) - 1) * 14;
    const perpX = -Math.sin(angle) * lateralOffset;
    const perpY = Math.cos(angle) * lateralOffset;

    particles.push({
      x: x + perpX,
      y: y + perpY,
      vx: Math.cos(spreadAngle) * burstSpeed + vx * 0.25,
      vy: Math.sin(spreadAngle) * burstSpeed + vy * 0.25,
      size: 1.4 + ((strokeCount + idx) % 4) * 0.75,
      alpha: 0.85,
      age: 0,
      maxAge: 1.25 + ((strokeCount + idx) % 3) * 0.35,
      seed: (strokeCount * 19 + idx * 7) % 100,
      color,
    });

    if (particles.length > maxParticles) {
      particles.shift();
    }
  };

  return {
    ribbons,
    smudges,
    particles,
    ribbonOffset,
    renderFieldToBuffer,
    resize: (nextWidth: number, nextHeight: number) => {
      width = Math.max(1, nextWidth);
      height = Math.max(1, nextHeight);
      for (const ribbon of ribbons) {
        ribbon.opacity = ribbon.id === "coral" ? (width < 640 ? 0.28 : 0.72) : 0.3;
        for (const node of ribbon.nodes) {
          const pt = computeRibbonBasePoint(ribbon.id, node.theta, width);
          node.baseX = pt.x;
          node.baseY = pt.y;
          node.x = node.baseX + node.offsetX;
          node.y = node.baseY + node.offsetY;
        }
      }
    },
    leavePointer: () => {
      lastX = null;
      lastY = null;
      ribbonOffset.targetX = 0;
      ribbonOffset.targetY = 0;
      ribbonOffset.targetScaleX = 1;
    },
    movePointer: (x: number, y: number) => {
      if (lastX === null || lastY === null) {
        lastX = x;
        lastY = y;
        const touchedRibbon = spreadFieldAndRibbons(x, y, x, y);
        spawnSmudge(x, y, 0, 0, -0.2, 30, touchedRibbon);
        spawnParticle(x, y, 18, -12, -0.2, 30, 0, touchedRibbon);
        return;
      }

      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      if (dist < 1.5) return;

      const angle = Math.atan2(dy, dx);
      const speed = Math.min(600, dist * 14);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      const touchedRibbon = spreadFieldAndRibbons(lastX, lastY, x, y);

      const handRadius = 165;
      for (const smudge of smudges) {
        const d = distanceToSegment(smudge.x, smudge.y, lastX, lastY, x, y);
        if (d < handRadius) {
          const influence = 1 - d / handRadius;
          smudge.vx += dx * 4.8 * influence;
          smudge.vy += dy * 4.8 * influence;
          smudge.spreadRateX += dist * 0.45 * influence;
          smudge.spreadRateY += dist * 0.2 * influence;
          smudge.angle += Math.sin(angle - smudge.angle) * 0.35 * influence;
        }
      }

      const particleBrushRadius = 125;
      for (const particle of particles) {
        const d = distanceToSegment(particle.x, particle.y, lastX, lastY, x, y);
        if (d < particleBrushRadius) {
          const influence = 1 - d / particleBrushRadius;
          particle.vx += dx * 5.2 * influence;
          particle.vy += dy * 5.2 * influence;
        }
      }

      const steps = Math.max(1, Math.min(4, Math.ceil(dist / 32)));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const sx = lastX + dx * t;
        const sy = lastY + dy * t;
        spawnSmudge(sx, sy, vx, vy, angle, speed, touchedRibbon);
        const particleCount = dist > 18 ? 3 : 2;
        for (let p = 0; p < particleCount; p++) {
          spawnParticle(sx, sy, vx, vy, angle, speed, p, touchedRibbon);
        }
      }

      ribbonOffset.targetX = Math.max(-42, Math.min(42, ribbonOffset.targetX + dx * 0.22));
      ribbonOffset.targetY = Math.max(-28, Math.min(28, ribbonOffset.targetY + dy * 0.22));
      ribbonOffset.targetScaleX = Math.min(1.14, 1 + Math.min(0.14, dist * 0.0022));

      lastX = x;
      lastY = y;
    },
    step: (dt: number) => {
      const safeDt = Math.max(0, Math.min(dt, 0.1));
      if (safeDt === 0) return;

      const ribbonFollow = 1 - Math.exp(-safeDt * 6);
      ribbonOffset.x += (ribbonOffset.targetX - ribbonOffset.x) * ribbonFollow;
      ribbonOffset.y += (ribbonOffset.targetY - ribbonOffset.y) * ribbonFollow;
      ribbonOffset.scaleX += (ribbonOffset.targetScaleX - ribbonOffset.scaleX) * ribbonFollow;
      ribbonOffset.targetX *= Math.exp(-safeDt * 1.8);
      ribbonOffset.targetY *= Math.exp(-safeDt * 1.8);
      ribbonOffset.targetScaleX = 1 + (ribbonOffset.targetScaleX - 1) * Math.exp(-safeDt * 2.2);

      const nodeDrag = Math.exp(-safeDt * 4.2);
      for (let i = 0; i < cellCount; i++) {
        if (Math.abs(fieldVelU[i]) > 0.0005 || Math.abs(fieldVelV[i]) > 0.0005) {
          fieldOffsetU[i] = Math.max(-0.42, Math.min(0.42, fieldOffsetU[i] + fieldVelU[i] * safeDt));
          fieldOffsetV[i] = Math.max(-0.42, Math.min(0.42, fieldOffsetV[i] + fieldVelV[i] * safeDt));
          fieldVelU[i] *= nodeDrag;
          fieldVelV[i] *= nodeDrag;
        }
      }

      for (const ribbon of ribbons) {
        const nodes = ribbon.nodes;
        const count = nodes.length;
        for (let i = 0; i < count; i++) {
          const node = nodes[i];
          if (Math.abs(node.vx) > 0.01 || Math.abs(node.vy) > 0.01) {
            node.offsetX += node.vx * safeDt;
            node.offsetY += node.vy * safeDt;
            node.vx *= nodeDrag;
            node.vy *= nodeDrag;
            node.x = node.baseX + node.offsetX;
            node.y = node.baseY + node.offsetY;
          }
        }
      }

      const smudgeDrag = Math.exp(-safeDt * 3.1);
      for (let i = smudges.length - 1; i >= 0; i--) {
        const s = smudges[i];
        s.age += safeDt;
        if (!s.persistent && s.age >= s.maxAge) {
          smudges.splice(i, 1);
          continue;
        }
        s.x += s.vx * safeDt;
        s.y += s.vy * safeDt;
        s.vx *= smudgeDrag;
        s.vy *= smudgeDrag;
        s.radiusX += s.spreadRateX * safeDt;
        s.radiusY += s.spreadRateY * safeDt;
        s.spreadRateX *= Math.exp(-safeDt * 2.1);
        s.spreadRateY *= Math.exp(-safeDt * 2.1);
      }

      const particleDrag = Math.exp(-safeDt * 2.6);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += safeDt;
        if (p.age >= p.maxAge) {
          particles.splice(i, 1);
          continue;
        }
        const curlAngle = p.seed * 0.17 + p.age * 3.4;
        p.vx = (p.vx + Math.cos(curlAngle) * 14 * safeDt) * particleDrag;
        p.vy = (p.vy + Math.sin(curlAngle) * 14 * safeDt - 6 * safeDt) * particleDrag;
        p.x += p.vx * safeDt;
        p.y += p.vy * safeDt;
      }
    },
    isActive: () => {
      if (particles.length > 0) return true;
      for (let i = 0; i < cellCount; i++) {
        if (Math.hypot(fieldVelU[i], fieldVelV[i]) > 0.002) return true;
      }
      for (const s of smudges) {
        if (!s.persistent || Math.hypot(s.vx, s.vy) > 0.25 || s.spreadRateX > 0.4) {
          return true;
        }
      }
      for (const ribbon of ribbons) {
        for (const node of ribbon.nodes) {
          if (Math.hypot(node.vx, node.vy) > 0.25) return true;
        }
      }
      return false;
    },
  };
}
