export type PaintColorRGB = readonly [number, number, number];

export const HERO_PAINT_PALETTE: readonly PaintColorRGB[] = [
  [231, 138, 105], // --color-coral
  [246, 195, 161], // --color-peach
  [110, 152, 116], // --color-moss
  [218, 240, 188], // --color-accent
];

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

function pickPaletteColor(normX: number, normY: number, index: number): PaintColorRGB {
  // Blend between warm coral/peach in the lower-center band and moss/mint in the upper/right band
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
  const maxSmudges = options.maxSmudges ?? 48;
  const maxParticles = options.maxParticles ?? 140;

  const smudges: PaintSmudge[] = [];
  const particles: PaintParticle[] = [];

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

  const spawnSmudge = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    angle: number,
    speed: number
  ) => {
    const normX = Math.max(0, Math.min(1, x / width));
    const normY = Math.max(0, Math.min(1, y / height));
    const color = pickPaletteColor(normX, normY, strokeCount++);
    const clampedSpeed = Math.min(420, Math.max(25, speed));

    smudges.push({
      x,
      y,
      vx: vx * 0.55,
      vy: vy * 0.55,
      angle,
      radiusX: 54 + clampedSpeed * 0.16,
      radiusY: 36 + clampedSpeed * 0.06,
      spreadRateX: 48 + clampedSpeed * 0.24,
      spreadRateY: 26 + clampedSpeed * 0.1,
      alpha: 0.24,
      age: 0,
      maxAge: 2.1,
      color,
    });

    if (smudges.length > maxSmudges) {
      smudges.shift();
    }
  };

  const spawnParticle = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    angle: number,
    speed: number,
    idx: number
  ) => {
    const normX = Math.max(0, Math.min(1, x / width));
    const normY = Math.max(0, Math.min(1, y / height));
    const color = pickPaletteColor(normX, normY, strokeCount + idx);
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
      alpha: 0.82,
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
    smudges,
    particles,
    ribbonOffset,
    resize: (nextWidth: number, nextHeight: number) => {
      width = Math.max(1, nextWidth);
      height = Math.max(1, nextHeight);
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
        spawnSmudge(x, y, 0, 0, -0.2, 30);
        spawnParticle(x, y, 18, -12, -0.2, 30, 0);
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

      // Advect and re-spread existing wet paint smudges under the hand
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

      // Sweep existing particles along with the hand stroke
      const particleBrushRadius = 125;
      for (const particle of particles) {
        const d = distanceToSegment(particle.x, particle.y, lastX, lastY, x, y);
        if (d < particleBrushRadius) {
          const influence = 1 - d / particleBrushRadius;
          particle.vx += dx * 5.2 * influence;
          particle.vy += dy * 5.2 * influence;
        }
      }

      // Deposit continuous paint smudges & pigment particles along the hand's path
      const steps = Math.max(1, Math.min(5, Math.ceil(dist / 28)));
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        const sx = lastX + dx * t;
        const sy = lastY + dy * t;
        spawnSmudge(sx, sy, vx, vy, angle, speed);
        const particleCount = dist > 18 ? 3 : 2;
        for (let p = 0; p < particleCount; p++) {
          spawnParticle(sx, sy, vx, vy, angle, speed, p);
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

      const smudgeDrag = Math.exp(-safeDt * 3.1);
      for (let i = smudges.length - 1; i >= 0; i--) {
        const s = smudges[i];
        s.age += safeDt;
        if (s.age >= s.maxAge) {
          smudges.splice(i, 1);
          continue;
        }
        s.x += s.vx * safeDt;
        s.y += s.vy * safeDt;
        s.vx *= smudgeDrag;
        s.vy *= smudgeDrag;
        s.radiusX += s.spreadRateX * safeDt;
        s.radiusY += s.spreadRateY * safeDt;
        s.spreadRateX *= Math.exp(-safeDt * 1.6);
        s.spreadRateY *= Math.exp(-safeDt * 1.6);
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
    isActive: () =>
      smudges.length > 0 ||
      particles.length > 0 ||
      Math.hypot(ribbonOffset.x, ribbonOffset.y) > 0.15,
  };
}
