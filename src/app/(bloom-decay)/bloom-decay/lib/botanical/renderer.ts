import {
  BRUSHSTROKES,
  ENGRAVED_FLOWERS,
  FLOWERS,
  INK_STAINS,
  LEAVES,
  PAPER_SCRAPS,
  SPLATTERS,
  STEMS,
  UMBELS,
} from './composition';
import { drawEngravedFlower, drawPaperScrap } from './engravingPainter';
import { InkDiffusionEngine } from './inkEngine';
import { mulberry32 } from './noise';
import {
  buildPaperAssets,
  buildPetalLibrary,
  FLOWER_PALETTES,
  type BakedPaperAssets,
  type BakedPetalSet,
} from './petalPainter';
import {
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  evaluateFlowerGrowth,
  segmentProgress,
} from './timeline';
import type {
  DeveloperSettings,
  FlowerPaletteId,
  FlowerSpec,
  LeafSpec,
  Point2D,
  PointerState,
  StemSpec,
  TimelineSnapshot,
  UmbelSpec,
  ViewportTransform,
} from './types';

interface PrecomputedPetalSlot {
  tier: 'outer' | 'midOuter' | 'midInner' | 'inner';
  variant: number;
  baseAngle: number;
  radiusRatio: number;
  scaleX: number;
  scaleY: number;
  delay: number;
  swayOffset: number;
  alpha: number;
}

interface DriftingPetal {
  originX: number;
  originY: number;
  cycleDuration: number;
  phaseOffset: number;
  driftX: number;
  fallY: number;
  size: number;
  palette: FlowerPaletteId;
}

const DRIFTING_PETALS: DriftingPetal[] = [
  {
    originX: 1485,
    originY: 600,
    cycleDuration: 15.5,
    phaseOffset: 2.0,
    driftX: -95,
    fallY: 360,
    size: 0.24,
    palette: 'dustyPeony',
  },
  {
    originX: 1615,
    originY: 830,
    cycleDuration: 19.0,
    phaseOffset: 9.5,
    driftX: -72,
    fallY: 250,
    size: 0.21,
    palette: 'burgundyRose',
  },
];

function evalCubic(pts: Point2D[], t: number): Point2D {
  const [p0, p1, p2, p3] = pts;
  const inv = 1 - t;
  const inv2 = inv * inv;
  const t2 = t * t;
  return {
    x: inv2 * inv * p0.x + 3 * inv2 * t * p1.x + 3 * inv * t2 * p2.x + t2 * t * p3.x,
    y: inv2 * inv * p0.y + 3 * inv2 * t * p1.y + 3 * inv * t2 * p2.y + t2 * t * p3.y,
  };
}

function evalCubicTangent(pts: Point2D[], t: number): Point2D {
  const [p0, p1, p2, p3] = pts;
  const inv = 1 - t;
  return {
    x:
      3 * inv * inv * (p1.x - p0.x) +
      6 * inv * t * (p2.x - p1.x) +
      3 * t * t * (p3.x - p2.x),
    y:
      3 * inv * inv * (p1.y - p0.y) +
      6 * inv * t * (p2.y - p1.y) +
      3 * t * t * (p3.y - p2.y),
  };
}

/**
 * Generates deterministic petal slots per flower species for layered botanical unfolding.
 */
function buildFlowerAnatomy(flower: FlowerSpec): PrecomputedPetalSlot[] {
  const rng = mulberry32(flower.seed * 13 + 7);
  const slots: PrecomputedPetalSlot[] = [];

  if (flower.species === 'ruffledPeony') {
    const tiers: Array<{
      tier: PrecomputedPetalSlot['tier'];
      count: number;
      rRatio: number;
      sx: number;
      sy: number;
      delayBase: number;
    }> = [
      { tier: 'outer', count: 10, rRatio: 0.26, sx: 1.06, sy: 1.08, delayBase: 0.0 },
      { tier: 'midOuter', count: 10, rRatio: 0.2, sx: 0.94, sy: 0.96, delayBase: 0.14 },
      { tier: 'midInner', count: 9, rRatio: 0.14, sx: 0.82, sy: 0.84, delayBase: 0.28 },
      { tier: 'inner', count: 8, rRatio: 0.08, sx: 0.68, sy: 0.72, delayBase: 0.42 },
    ];
    for (const t of tiers) {
      for (let i = 0; i < t.count; i++) {
        const angle = (i / t.count) * Math.PI * 2 + (rng() - 0.5) * 0.34;
        slots.push({
          tier: t.tier,
          variant: Math.floor(rng() * 4),
          baseAngle: angle,
          radiusRatio: t.rRatio * (0.85 + rng() * 0.3),
          scaleX: t.sx * (0.88 + rng() * 0.24),
          scaleY: t.sy * (0.88 + rng() * 0.24),
          delay: t.delayBase + rng() * 0.14,
          swayOffset: rng() * Math.PI * 2,
          alpha: 0.94 + rng() * 0.06,
        });
      }
    }
    return slots;
  }

  if (flower.species === 'spiralRose' || flower.species === 'openRose') {
    const goldenAngle = 2.399963229728653; // Fibonacci phyllotaxis
    const total = flower.species === 'openRose' ? 28 : 26;
    for (let i = total - 1; i >= 0; i--) {
      const u = i / (total - 1); // 1 = outermost, 0 = innermost
      const tier: PrecomputedPetalSlot['tier'] =
        u > 0.68 ? 'outer' : u > 0.42 ? 'midOuter' : u > 0.2 ? 'midInner' : 'inner';
      const angle = i * goldenAngle + (rng() - 0.5) * 0.28;
      slots.push({
        tier,
        variant: i % 4,
        baseAngle: angle,
        radiusRatio: 0.05 + u * 0.23,
        scaleX: 0.56 + u * 0.56 + (rng() - 0.5) * 0.1,
        scaleY: 0.54 + u * 0.56 + (rng() - 0.5) * 0.1,
        delay: (1 - u) * 0.45 + rng() * 0.1,
        swayOffset: rng() * Math.PI * 2,
        alpha: 0.95 + rng() * 0.05,
      });
    }
    return slots;
  }

  if (flower.species === 'cuppedRose') {
    // Three-quarter / side-cupped chalice rose (upper-right & far-right roses in reference)
    const total = 20;
    for (let i = 0; i < total; i++) {
      const u = i / (total - 1);
      const tier: PrecomputedPetalSlot['tier'] =
        i < 7 ? 'outer' : i < 13 ? 'midOuter' : i < 17 ? 'midInner' : 'inner';
      // Cupped petals wrap smoothly from left to right forming a sculptural goblet silhouette
      const fanPos = ((i % 7) / 6 - 0.5) * 1.72 + (rng() - 0.5) * 0.24;
      slots.push({
        tier,
        variant: i % 4,
        baseAngle: fanPos,
        radiusRatio: 0.08 + (1 - u) * 0.14,
        scaleX: 0.78 + (1 - u) * 0.34,
        scaleY: 0.8 + (1 - u) * 0.38,
        delay: u * 0.4,
        swayOffset: rng() * Math.PI * 2,
        alpha: 0.95 + rng() * 0.05,
      });
    }
    return slots;
  }

  // Wildflowers (wildThistle, wildAnemone, tinyWildflower)
  const count =
    flower.species === 'wildThistle'
      ? 14
      : flower.species === 'wildAnemone'
        ? 11
        : 7;

  for (let i = 0; i < count; i++) {
    const u = i / count;
    const isInner = i >= Math.floor(count * 0.55);
    slots.push({
      tier: isInner ? 'inner' : 'outer',
      variant: i % 4,
      baseAngle: u * Math.PI * 2 + (rng() - 0.5) * 0.32,
      radiusRatio: isInner ? 0.12 : 0.2,
      scaleX: flower.species === 'wildThistle' ? 0.55 + rng() * 0.2 : 0.78 + rng() * 0.22,
      scaleY: flower.species === 'wildThistle' ? 0.96 + rng() * 0.22 : 0.92 + rng() * 0.2,
      delay: (isInner ? 0.25 : 0.0) + rng() * 0.16,
      swayOffset: rng() * Math.PI * 2,
      alpha: 0.94 + rng() * 0.06,
    });
  }

  return slots;
}

/**
 * Unified 2D Mixed-Media Botanical Canvas Renderer.
 * Manages cached procedural paper textures, pre-painted botanical petal sprites,
 * ink diffusion fields, and zero-allocation frame rendering.
 */
export class BotanicalRenderer {
  private paperAssets: BakedPaperAssets;
  private fullAgedPaperCanvas: HTMLCanvasElement;
  private petalLibrary: Record<FlowerPaletteId, BakedPetalSet>;
  private flowerAnatomy = new Map<string, PrecomputedPetalSlot[]>();
  private completedFlowerCache = new Map<string, { canvas: HTMLCanvasElement; halfSize: number }>();
  private inkEngine: InkDiffusionEngine;

  constructor() {
    this.paperAssets = buildPaperAssets(720, 405);

    // Pre-composite the completed aged paper sheet once for single-blit steady state
    this.fullAgedPaperCanvas = document.createElement('canvas');
    this.fullAgedPaperCanvas.width = this.paperAssets.baseCanvas.width;
    this.fullAgedPaperCanvas.height = this.paperAssets.baseCanvas.height;
    const fCtx = this.fullAgedPaperCanvas.getContext('2d');
    if (fCtx) {
      fCtx.drawImage(this.paperAssets.baseCanvas, 0, 0);
      fCtx.globalAlpha = 0.96;
      fCtx.drawImage(this.paperAssets.agingCanvas, 0, 0);
    }

    this.petalLibrary = buildPetalLibrary();
    for (const flower of FLOWERS) {
      this.flowerAnatomy.set(flower.id, buildFlowerAnatomy(flower));
    }
    this.inkEngine = new InkDiffusionEngine(INK_STAINS, BRUSHSTROKES, SPLATTERS);
  }

  /**
   * Renders the aged ivory paper substrate and Phase 01 organic aging evolution.
   */
  private drawPaperSubstrate(
    ctx: CanvasRenderingContext2D,
    viewportW: number,
    viewportH: number,
    transform: ViewportTransform,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings
  ): void {
    if (!settings.paperTexture) {
      ctx.fillStyle = '#E9E1D3';
      ctx.fillRect(0, 0, viewportW, viewportH);
      return;
    }

    const agingProgress = settings.inkDiffusion ? snapshot.paperAging : 1;

    ctx.save();
    if (agingProgress >= 0.99) {
      ctx.drawImage(this.fullAgedPaperCanvas, 0, 0, viewportW, viewportH);
    } else {
      ctx.drawImage(this.paperAssets.baseCanvas, 0, 0, viewportW, viewportH);
      if (agingProgress > 0.01) {
        ctx.globalAlpha = Math.min(0.96, agingProgress * 0.98);
        ctx.drawImage(this.paperAssets.agingCanvas, 0, 0, viewportW, viewportH);
      }
    }

    // Phase 01 subtle left-side archival ink washes in virtual art space
    ctx.save();
    ctx.translate(transform.offsetX, transform.offsetY);
    ctx.scale(transform.scale, transform.scale);
    for (const stain of INK_STAINS) {
      if (stain.layer === 'paper') {
        this.inkEngine.drawStain(
          ctx,
          stain,
          snapshot.timeSec,
          settings.inkDiffusion,
          snapshot.visibilityEnvelope
        );
      }
    }
    ctx.restore();

    ctx.restore();
  }

  /**
   * Renders an organically growing botanical stem, gnarled woody branch, twig, or fine root
   * along its true cubic Bezier curve with variable calligraphic width and bark/ink detail.
   */
  private drawStem(
    ctx: CanvasRenderingContext2D,
    stem: StemSpec,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    parallaxX: number,
    parallaxY: number
  ): void {
    const rawP = settings.flowerGrowth
      ? segmentProgress(snapshot.timeSec, stem.startSec, stem.durationSec)
      : 1;
    if (rawP <= 0.002) return;

    const progress = easeOutCubic(rawP);
    const rng = mulberry32(stem.seed);

    // Subtle ambient sway applied smoothly toward stem tip (keeping base anchored)
    const swayAmt =
      settings.ambientMotion && snapshot.ambientWeight > 0
        ? Math.sin(snapshot.ambientClockSec * 0.75 + stem.seed * 0.31) *
          (stem.kind === 'root' ? 2.2 : 3.5) *
          snapshot.ambientWeight
        : 0;

    const steps = stem.kind === 'root' ? 16 : stem.kind === 'woodyBranch' ? 16 : 12;
    const maxStep = Math.max(1, Math.floor(steps * progress));

    ctx.save();
    ctx.translate(parallaxX, parallaxY);
    ctx.globalAlpha = snapshot.visibilityEnvelope;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let prev = evalCubic(stem.points, 0);

    for (let i = 1; i <= maxStep; i++) {
      const u = (i / steps) * (progress < 1 ? 1 : 1);
      const t = Math.min(progress, i / steps);
      const pt = evalCubic(stem.points, t);

      // Add deterministic organic gnarl/tremor for woody branches & delicate roots
      const tremorAmp =
        stem.kind === 'root'
          ? 5.5
          : stem.kind === 'woodyBranch'
            ? 4.2
            : 1.1;
      const tremorX = Math.sin(t * 19 + stem.seed) * tremorAmp * Math.sin(t * Math.PI);
      const tremorY = Math.cos(t * 23 + stem.seed * 1.7) * tremorAmp * Math.sin(t * Math.PI);

      const cur = {
        x: pt.x + tremorX + swayAmt * t * t,
        y: pt.y + tremorY + swayAmt * 0.35 * t * t,
      };

      const width = stem.widthStart + (stem.widthEnd - stem.widthStart) * t;
      const organicWidth =
        stem.kind === 'woodyBranch'
          ? width * (0.82 + Math.sin(t * 27 + stem.seed) * 0.24)
          : width;

      ctx.strokeStyle = stem.color;
      ctx.lineWidth = Math.max(0.65, organicWidth);
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.lineTo(cur.x, cur.y);
      ctx.stroke();

      // Highlight ridge & dry-bark texture along thick woody branches
      if (stem.highlightColor && stem.kind === 'woodyBranch' && i % 2 === 0) {
        ctx.strokeStyle = stem.highlightColor;
        ctx.lineWidth = Math.max(1, organicWidth * 0.28);
        ctx.globalAlpha = 0.55 * snapshot.visibilityEnvelope;
        ctx.beginPath();
        ctx.moveTo(prev.x - 1.8, prev.y - 1.4);
        ctx.lineTo(cur.x - 1.8, cur.y - 1.4);
        ctx.stroke();
        ctx.globalAlpha = snapshot.visibilityEnvelope;
      }

      // Fine lateral rootlets branching organically off main roots
      if (stem.kind === 'root' && i > 4 && i % 5 === 0) {
        const branchLen = 18 + rng() * 34;
        const tan = evalCubicTangent(stem.points, t);
        const baseAng = Math.atan2(tan.y, tan.x);
        const side = i % 10 === 0 ? 1 : -1;
        const forkAng = baseAng + side * (0.48 + rng() * 0.55);
        const subProgress = clamp01((progress - t) * 3.2);
        if (subProgress > 0.05) {
          const ex = cur.x + Math.cos(forkAng) * branchLen * subProgress;
          const ey = cur.y + Math.sin(forkAng) * branchLen * subProgress;
          ctx.strokeStyle = stem.color;
          ctx.lineWidth = Math.max(0.55, organicWidth * 0.65);
          ctx.beginPath();
          ctx.moveTo(cur.x, cur.y);
          ctx.quadraticCurveTo(
            (cur.x + ex) * 0.5 + (rng() - 0.5) * 12,
            (cur.y + ey) * 0.5 + (rng() - 0.5) * 12,
            ex,
            ey
          );
          ctx.stroke();
        }
      }

      // Subtle thorns / bark knots along gnarled branches
      if (stem.kind === 'woodyBranch' && i > 3 && i % 6 === 0 && u < progress) {
        const tan = evalCubicTangent(stem.points, t);
        const baseAng = Math.atan2(tan.y, tan.x);
        const thornAng = baseAng + (i % 12 === 0 ? 1.05 : -1.05);
        ctx.strokeStyle = stem.color;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cur.x, cur.y);
        ctx.lineTo(cur.x + Math.cos(thornAng) * 12, cur.y + Math.sin(thornAng) * 12);
        ctx.stroke();
      }

      prev = cur;
    }

    ctx.restore();
  }

  /**
   * Renders delicate Queen Anne's lace / umbel seed heads near the top-right margin.
   */
  private drawUmbel(
    ctx: CanvasRenderingContext2D,
    umbel: UmbelSpec,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    parallaxX: number,
    parallaxY: number
  ): void {
    const rawP = settings.flowerGrowth
      ? segmentProgress(snapshot.timeSec, umbel.startSec, umbel.durationSec)
      : 1;
    if (rawP <= 0.005) return;

    const progress = easeOutCubic(rawP);
    const rng = mulberry32(umbel.seed);
    const sway =
      settings.ambientMotion && snapshot.ambientWeight > 0
        ? Math.sin(snapshot.ambientClockSec * 0.9 + umbel.seed) * 0.03 * snapshot.ambientWeight
        : 0;

    ctx.save();
    ctx.translate(umbel.anchor.x + parallaxX, umbel.anchor.y + parallaxY);
    ctx.rotate(umbel.tiltAngle + sway);
    ctx.globalAlpha = snapshot.visibilityEnvelope;
    ctx.strokeStyle = '#1E1B1A';
    ctx.fillStyle = '#1E1B1A';

    for (let i = 0; i < umbel.rayCount; i++) {
      const u = umbel.rayCount > 1 ? i / (umbel.rayCount - 1) : 0.5;
      const fanAngle = -Math.PI * 0.5 + (u - 0.5) * 1.65 + (rng() - 0.5) * 0.08;
      const rayLen = umbel.radius * (0.68 + Math.sin(u * Math.PI) * 0.36) * progress;

      const tipX = Math.cos(fanAngle) * rayLen;
      const tipY = Math.sin(fanAngle) * rayLen;

      ctx.lineWidth = 1.05;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(tipX * 0.45, tipY * 0.55 - 8, tipX, tipY);
      ctx.stroke();

      // Tiny umbellet seed cluster at tip of each ray
      if (progress > 0.55) {
        const subP = clamp01((progress - 0.55) / 0.45);
        const subRays = 6;
        for (let s = 0; s < subRays; s++) {
          const sa = fanAngle + ((s / (subRays - 1)) - 0.5) * 1.5;
          const sl = (7 + rng() * 6) * subP;
          const sx = tipX + Math.cos(sa) * sl;
          const sy = tipY + Math.sin(sa) * sl;
          ctx.lineWidth = 0.65;
          ctx.beginPath();
          ctx.moveTo(tipX, tipY);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sx, sy, (1.4 + rng() * 1.1) * subP, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.restore();
  }

  /**
   * Renders muted sage, dried, and charcoal botanical leaves with fine midrib & lateral veins.
   */
  private drawLeaf(
    ctx: CanvasRenderingContext2D,
    leaf: LeafSpec,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    parallaxX: number,
    parallaxY: number
  ): void {
    const rawP = settings.flowerGrowth
      ? segmentProgress(snapshot.timeSec, leaf.startSec, leaf.durationSec)
      : 1;
    if (rawP <= 0.005) return;

    const p = easeOutCubic(rawP);
    const sway =
      settings.ambientMotion && snapshot.ambientWeight > 0
        ? Math.sin(snapshot.ambientClockSec * 0.85 + leaf.seed * 0.4) * 0.028 * snapshot.ambientWeight
        : 0;

    ctx.save();
    ctx.translate(leaf.anchor.x + parallaxX, leaf.anchor.y + parallaxY);
    ctx.rotate(leaf.angle + sway + (1 - p) * 0.14);
    ctx.globalAlpha = Math.min(1, p * 1.4) * snapshot.visibilityEnvelope;

    const len = leaf.length * (0.2 + 0.8 * p);
    const hw = leaf.width * 0.5 * (0.25 + 0.75 * easeInOutCubic(p));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(len * 0.28, -hw * 1.12, len * 0.72, -hw * 0.85, len, 0);
    ctx.bezierCurveTo(len * 0.72, hw * 0.85, len * 0.28, hw * 1.12, 0, 0);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, -hw, len, hw);
    grad.addColorStop(0, leaf.edgeColor);
    grad.addColorStop(0.55, leaf.color);
    grad.addColorStop(1, leaf.style === 'sage' ? '#8A9180' : leaf.color);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.strokeStyle = leaf.edgeColor;
    ctx.lineWidth = 1.25;
    ctx.stroke();

    // Central midrib & feathered lateral veins
    ctx.strokeStyle = leaf.veinColor;
    ctx.lineWidth = 1.1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len * 0.92, 0);
    ctx.stroke();

    const veins = 7;
    ctx.lineWidth = 0.65;
    for (let i = 1; i < veins; i++) {
      const u = i / veins;
      const vx = len * u;
      const spread = Math.sin(u * Math.PI) * hw * 0.78;
      ctx.beginPath();
      ctx.moveTo(vx, 0);
      ctx.quadraticCurveTo(vx + len * 0.06, -spread * 0.5, vx + len * 0.11, -spread);
      ctx.moveTo(vx, 0);
      ctx.quadraticCurveTo(vx + len * 0.06, spread * 0.5, vx + len * 0.11, spread);
      ctx.stroke();
    }

    ctx.restore();
  }

  /**
   * Renders an individually-controlled multi-layered botanical flower anchored to its stem tip.
   * Supports Phase 04 bud swelling + sepal separation, Phase 05 staggered petal unfolding,
   * Phase 08 gentle settling, ambient living sway, and subtle cursor proximity response.
   */
  private drawFlower(
    ctx: CanvasRenderingContext2D,
    flower: FlowerSpec,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    pointer: PointerState,
    parallaxX: number,
    parallaxY: number
  ): void {
    const growth = evaluateFlowerGrowth(flower, snapshot.timeSec, settings.flowerGrowth);
    if (growth.budProgress <= 0.005 || growth.headScale <= 0.005) return;

    const sprites = this.petalLibrary[flower.palette];
    const palette = FLOWER_PALETTES[flower.palette];
    const slots = this.flowerAnatomy.get(flower.id);
    if (!sprites || !slots) return;

    const ax = flower.anchor.x + parallaxX;
    const ay = flower.anchor.y + parallaxY;

    // Gentle cursor proximity hover response (no outlines, no tooltips)
    let hoverInfluence = 0;
    let hoverDirAngle = 0;
    if (flower.interactive && pointer.active && settings.pointerParallax) {
      const dx = pointer.artX - ax;
      const dy = pointer.artY - ay;
      const dist = Math.hypot(dx, dy);
      const triggerDist = flower.radius * 1.45;
      if (dist < triggerDist) {
        const raw = 1 - dist / triggerDist;
        hoverInfluence = raw * raw * (3 - 2 * raw);
        hoverDirAngle = Math.atan2(dy, dx);
      }
    }

    // Subtle ambient breathing & settling (Phase 08 & living canvas)
    const ambientSway =
      settings.ambientMotion && snapshot.ambientWeight > 0
        ? Math.sin(snapshot.ambientClockSec * 0.68 + flower.swayPhase) *
          0.024 *
          snapshot.ambientWeight
        : 0;
    const ambientBreath =
      settings.ambientMotion && snapshot.ambientWeight > 0
        ? Math.sin(snapshot.ambientClockSec * 0.52 + flower.swayPhase * 1.7) *
          0.014 *
          snapshot.ambientWeight
        : 0;

    // Phase 08 gentle micro-settling without bounce
    const settleMicroRot =
      snapshot.timeSec > 16.5 ? (1 - snapshot.settleFactor) * 0.02 : 0;

    ctx.save();
    ctx.translate(ax, ay);
    ctx.rotate(
      flower.bloomRotation +
        growth.rotationOffset +
        ambientSway +
        settleMicroRot +
        Math.sin(hoverDirAngle) * hoverInfluence * 0.045
    );
    ctx.globalAlpha = Math.min(1, growth.budProgress * 1.4) * snapshot.visibilityEnvelope;

    // Fast path: once a flower is fully bloomed and not actively hovered, draw from its baked multi-petal cache
    const isFullyBloomed =
      growth.budProgress >= 0.995 &&
      growth.outerOpen >= flower.maxOpenness - 0.002 &&
      growth.innerOpen >= flower.maxOpenness - 0.002 &&
      growth.coreOpen >= 0.995 &&
      hoverInfluence < 0.01;

    if (isFullyBloomed) {
      let cached = this.completedFlowerCache.get(flower.id);
      if (!cached) {
        const size = Math.ceil(flower.radius * 3.1);
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const cCtx = c.getContext('2d');
        if (cCtx) {
          cCtx.translate(size * 0.5, size * 0.5);
          this.paintFlowerPetals(
            cCtx,
            flower,
            sprites,
            palette,
            slots,
            growth,
            flower.radius,
            0,
            snapshot,
            { ...settings, ambientMotion: false },
            1
          );
        }
        cached = { canvas: c, halfSize: size * 0.5 };
        this.completedFlowerCache.set(flower.id, cached);
      }
      const scaleMod = 1 + ambientBreath;
      const drawSize = cached.canvas.width * scaleMod;
      ctx.drawImage(cached.canvas, -drawSize * 0.5, -drawSize * 0.5, drawSize, drawSize);
      ctx.restore();
      return;
    }

    const radius = flower.radius * growth.headScale * (1 + ambientBreath + hoverInfluence * 0.028);
    this.paintFlowerPetals(
      ctx,
      flower,
      sprites,
      palette,
      slots,
      growth,
      radius,
      hoverInfluence,
      snapshot,
      settings,
      snapshot.visibilityEnvelope
    );

    ctx.restore();
  }

  private paintFlowerPetals(
    ctx: CanvasRenderingContext2D,
    flower: FlowerSpec,
    sprites: BakedPetalSet,
    palette: (typeof FLOWER_PALETTES)[FlowerPaletteId],
    slots: PrecomputedPetalSlot[],
    growth: ReturnType<typeof evaluateFlowerGrowth>,
    radius: number,
    hoverInfluence: number,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    visibilityEnvelope: number
  ): void {
    // 1. Calyx & Sepals (emerge during Phase 04 bud formation and separate outward)
    const sepalCount = flower.species === 'cuppedRose' ? 5 : 6;
    const sepalScale = (radius / 135) * (0.72 + growth.budProgress * 0.32);

    ctx.save();
    ctx.fillStyle = '#1E1D1A';
    ctx.beginPath();
    ctx.ellipse(0, 4, radius * 0.14, radius * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    for (let s = 0; s < sepalCount; s++) {
      const sepBase =
        flower.species === 'cuppedRose'
          ? (s / (sepalCount - 1) - 0.5) * 2.1
          : (s / sepalCount) * Math.PI * 2 + 0.35;
      const sepAngle =
        flower.species === 'cuppedRose'
          ? sepBase * (0.45 + growth.sepalOpen * 0.65)
          : sepBase;
      const sepReach = radius * (0.16 + growth.sepalOpen * 0.38);
      ctx.save();
      ctx.rotate(sepAngle);
      ctx.translate(0, -sepReach * 0.25);
      const sw = sprites.sepal.width * sepalScale;
      const sh = sprites.sepal.height * sepalScale * (0.65 + growth.sepalOpen * 0.38);
      ctx.drawImage(sprites.sepal, -sw * 0.5, -sh * 0.9, sw, sh);
      ctx.restore();
    }
    ctx.restore();

    // 2. Layered Concentric Petals
    const baseSpriteScale = radius / 128;

    for (const slot of slots) {
      const tierOpen =
        slot.tier === 'outer'
          ? growth.outerOpen
          : slot.tier === 'midOuter'
            ? growth.midOpen
            : slot.tier === 'midInner'
              ? growth.midOpen * 0.92 + growth.innerOpen * 0.08
              : growth.innerOpen;

      const localOpen = clamp01((tierOpen - slot.delay * 0.35) / Math.max(0.25, 1 - slot.delay * 0.35));
      const budVisibility =
        slot.tier === 'inner' || slot.tier === 'midInner'
          ? growth.budProgress
          : clamp01(growth.budProgress * 0.45 + localOpen * 1.15);

      if (budVisibility <= 0.02) continue;

      const spriteList =
        slot.tier === 'outer'
          ? sprites.outer
          : slot.tier === 'inner'
            ? sprites.inner
            : sprites.mid;
      const sprite = spriteList[slot.variant % spriteList.length];

      const cupCompressAngle =
        flower.species === 'cuppedRose'
          ? slot.baseAngle * (0.28 + localOpen * 0.72)
          : slot.baseAngle + (1 - localOpen) * Math.sin(slot.baseAngle) * -0.25;

      const petalAmbient =
        settings.ambientMotion && snapshot.ambientWeight > 0
          ? Math.sin(snapshot.ambientClockSec * 0.9 + slot.swayOffset) * 0.018 * snapshot.ambientWeight
          : 0;

      const hoverPetalLift = hoverInfluence * 0.055 * (slot.tier === 'outer' ? 1 : 0.6);
      const perspectiveY = 1 - flower.tilt * 0.35 * Math.abs(Math.sin(cupCompressAngle));
      const radialOffset = radius * slot.radiusRatio * (0.18 + 0.82 * easeOutCubic(localOpen));

      const sx =
        baseSpriteScale *
        slot.scaleX *
        (0.42 + 0.58 * easeOutCubic(localOpen) + hoverPetalLift);
      const sy =
        baseSpriteScale *
        slot.scaleY *
        (0.52 + 0.48 * easeOutCubic(localOpen)) *
        perspectiveY;

      const drawW = sprite.width * sx;
      const drawH = sprite.height * sy;

      ctx.save();
      ctx.globalAlpha =
        slot.alpha *
        Math.min(1, budVisibility * 1.25) *
        visibilityEnvelope;

      if (flower.species === 'cuppedRose') {
        ctx.translate(0, -radius * 0.08);
        ctx.rotate(cupCompressAngle + petalAmbient);
        ctx.translate(0, -radialOffset * 0.45);
      } else {
        ctx.rotate(cupCompressAngle + petalAmbient);
        ctx.translate(0, -radialOffset);
      }

      ctx.drawImage(sprite, -drawW * 0.5, -drawH * 0.9, drawW, drawH);
      ctx.restore();
    }

    // 3. Detailed Botanical Center (cuppedRose heart sits nested inside upper chalice bowl!)
    if (growth.coreOpen > 0.05) {
      const rng = mulberry32(flower.seed + 555);
      ctx.save();
      if (flower.species === 'cuppedRose') {
        ctx.translate(0, -radius * 0.56);
        ctx.scale(1.05, 0.55);
      }
      const coreScale = easeOutCubic(growth.coreOpen);
      const coreR = radius * (flower.species === 'ruffledPeony' ? 0.2 : 0.15) * coreScale;

      const heartGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, coreR * 1.45);
      heartGrad.addColorStop(0, palette.coreColor);
      heartGrad.addColorStop(0.65, palette.baseShadow);
      heartGrad.addColorStop(1, 'rgba(20, 12, 14, 0)');
      ctx.fillStyle = heartGrad;
      ctx.beginPath();
      ctx.arc(0, 0, coreR * 1.45, 0, Math.PI * 2);
      ctx.fill();

      if (flower.species === 'ruffledPeony' || flower.species === 'wildAnemone' || flower.species === 'tinyWildflower') {
        const stamenCount = flower.species === 'ruffledPeony' ? 42 : 22;
        ctx.strokeStyle = palette.coreColor;
        ctx.fillStyle = palette.stamenColor;
        for (let i = 0; i < stamenCount; i++) {
          const a = rng() * Math.PI * 2;
          const d = (0.18 + Math.sqrt(rng()) * 0.85) * coreR;
          const sx = Math.cos(a) * d;
          const sy = Math.sin(a) * d;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(sx, sy);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sx, sy, 1.3 + rng() * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Subtle inner folded rose curves (delicate organic folds rather than rigid geometric coil)
        ctx.strokeStyle = palette.rimHighlight;
        ctx.globalAlpha = 0.36 * coreScale * visibilityEnvelope;
        ctx.lineWidth = 1.15;
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 3.8; a += 0.24) {
          const r = (a / (Math.PI * 3.8)) * coreR * (1.05 + Math.sin(a * 2.3) * 0.14);
          const px = Math.cos(a) * r;
          const py = Math.sin(a) * r;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  /**
   * Renders 1–2 calm, occasional drifting dried petals after the painting finishes.
   */
  private drawAmbientDriftingPetals(
    ctx: CanvasRenderingContext2D,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings
  ): void {
    if (!settings.ambientMotion || snapshot.ambientWeight <= 0.15) return;

    for (const dp of DRIFTING_PETALS) {
      const cycle = ((snapshot.ambientClockSec + dp.phaseOffset) % dp.cycleDuration) / dp.cycleDuration;
      // Only visible during active 45% drift window, resting quietly the rest of the time
      if (cycle > 0.45) continue;

      const u = cycle / 0.45;
      const fade = Math.sin(u * Math.PI);
      const x = dp.originX + dp.driftX * u + Math.sin(u * Math.PI * 3) * 18;
      const y = dp.originY + dp.fallY * u;
      const rot = u * 2.4 + Math.sin(u * 5) * 0.4;

      const sprite = this.petalLibrary[dp.palette].inner[0];
      const w = sprite.width * dp.size;
      const h = sprite.height * dp.size;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = fade * 0.72 * snapshot.ambientWeight * snapshot.visibilityEnvelope;
      ctx.drawImage(sprite, -w * 0.5, -h * 0.5, w, h);
      ctx.restore();
    }
  }

  /**
   * Renders the complete synchronized multi-layer artwork for the given frame.
   */
  public render(
    ctx: CanvasRenderingContext2D,
    viewportW: number,
    viewportH: number,
    transform: ViewportTransform,
    snapshot: TimelineSnapshot,
    settings: DeveloperSettings,
    pointer: PointerState
  ): void {
    ctx.save();
    ctx.clearRect(0, 0, viewportW, viewportH);

    // 1. Aged Ivory Paper Substrate + Phase 01 Organic Aging + Left Archival Smudges
    this.drawPaperSubstrate(ctx, viewportW, viewportH, transform, snapshot, settings);

    // Enter virtual 1920x1080 art coordinate space
    ctx.save();
    ctx.translate(transform.offsetX, transform.offsetY);
    ctx.scale(transform.scale, transform.scale);

    // Pointer parallax amplitude in virtual art pixels (restrained so collage never separates!)
    const maxShift = settings.pointerParallax ? 18 : 0;
    const basePx = pointer.nx * maxShift;
    const basePy = pointer.ny * maxShift * 0.72;

    const pOffset = (depth: number): [number, number] => [basePx * depth, basePy * depth];

    // 2. Stationary Absorbed Watercolor & Ink Stains + Back Dry-Brush Streaks + Back Splatters
    for (const stain of INK_STAINS) {
      if (stain.layer === 'back') {
        this.inkEngine.drawStain(
          ctx,
          stain,
          snapshot.timeSec,
          settings.inkDiffusion,
          snapshot.visibilityEnvelope
        );
      }
    }

    for (const brush of BRUSHSTROKES) {
      if (brush.layer === 'back') {
        this.inkEngine.drawBrushstroke(
          ctx,
          brush,
          snapshot.timeSec,
          settings.inkDiffusion,
          snapshot.visibilityEnvelope
        );
      }
    }

    for (const splat of SPLATTERS) {
      if (splat.layer === 'back') {
        this.inkEngine.drawSplatter(
          ctx,
          splat,
          snapshot.timeSec,
          settings.inkDiffusion,
          snapshot.visibilityEnvelope
        );
      }
    }

    // 3. Back Torn Archival Paper Scraps with Engraved Foliage & Wild Herb Motifs
    for (const scrap of PAPER_SCRAPS) {
      if (scrap.layer === 'back') {
        const [ox, oy] = pOffset(scrap.depthParallax);
        drawPaperScrap(
          ctx,
          scrap,
          snapshot.timeSec,
          ox,
          oy,
          settings.flowerGrowth,
          snapshot.visibilityEnvelope
        );
      }
    }

    // 4. Back Branches, Stems, Umbels, Dark Leaves & Rear Supporting Flowers
    for (const stem of STEMS) {
      if (stem.layer === 'back') {
        const [ox, oy] = pOffset(stem.depthParallax);
        this.drawStem(ctx, stem, snapshot, settings, ox, oy);
      }
    }
    for (const umbel of UMBELS) {
      if (umbel.layer === 'back') {
        const [ox, oy] = pOffset(umbel.depthParallax);
        this.drawUmbel(ctx, umbel, snapshot, settings, ox, oy);
      }
    }
    for (const leaf of LEAVES) {
      if (leaf.layer === 'back') {
        const [ox, oy] = pOffset(leaf.depthParallax);
        this.drawLeaf(ctx, leaf, snapshot, settings, ox, oy);
      }
    }
    for (const flower of FLOWERS) {
      if (flower.layer === 'back') {
        const [ox, oy] = pOffset(flower.depthParallax);
        this.drawFlower(ctx, flower, snapshot, settings, pointer, ox, oy);
      }
    }

    // 5. Mid-Ground Stems, Gnarled Branches, Sweeping Stems & Sage/Dark Leaves
    for (const stem of STEMS) {
      if (stem.layer === 'mid') {
        const [ox, oy] = pOffset(stem.depthParallax);
        this.drawStem(ctx, stem, snapshot, settings, ox, oy);
      }
    }
    for (const leaf of LEAVES) {
      if (leaf.layer === 'mid') {
        const [ox, oy] = pOffset(leaf.depthParallax);
        this.drawLeaf(ctx, leaf, snapshot, settings, ox, oy);
      }
    }

    // 6. Mid-Ground Torn Paper Silhouette & Signature Copperplate Engraved Peony
    for (const scrap of PAPER_SCRAPS) {
      if (scrap.layer === 'mid') {
        const [ox, oy] = pOffset(scrap.depthParallax);
        drawPaperScrap(
          ctx,
          scrap,
          snapshot.timeSec,
          ox,
          oy,
          settings.flowerGrowth,
          snapshot.visibilityEnvelope
        );
      }
    }
    for (const eng of ENGRAVED_FLOWERS) {
      const [ox, oy] = pOffset(eng.depthParallax);
      drawEngravedFlower(
        ctx,
        eng,
        snapshot.timeSec,
        ox,
        oy,
        settings.flowerGrowth,
        snapshot.visibilityEnvelope
      );
    }

    // 7. Mid-Ground Roses & Extending Wildflowers
    for (const flower of FLOWERS) {
      if (flower.layer === 'mid') {
        const [ox, oy] = pOffset(flower.depthParallax);
        this.drawFlower(ctx, flower, snapshot, settings, pointer, ox, oy);
      }
    }

    // 8. Foreground Stems, Tangled Fine Black Roots, Foreground Leaves & Focal Roses
    for (const stem of STEMS) {
      if (stem.layer === 'front') {
        const [ox, oy] = pOffset(stem.depthParallax);
        this.drawStem(ctx, stem, snapshot, settings, ox, oy);
      }
    }
    for (const leaf of LEAVES) {
      if (leaf.layer === 'front') {
        const [ox, oy] = pOffset(leaf.depthParallax);
        this.drawLeaf(ctx, leaf, snapshot, settings, ox, oy);
      }
    }
    for (const flower of FLOWERS) {
      if (flower.layer === 'front') {
        const [ox, oy] = pOffset(flower.depthParallax);
        this.drawFlower(ctx, flower, snapshot, settings, pointer, ox, oy);
      }
    }

    // 9. Crisp Foreground Ink Splatters & Occasional Ambient Falling Dried Petals
    for (const splat of SPLATTERS) {
      if (splat.layer === 'front') {
        this.inkEngine.drawSplatter(
          ctx,
          splat,
          snapshot.timeSec,
          settings.inkDiffusion,
          snapshot.visibilityEnvelope
        );
      }
    }

    this.drawAmbientDriftingPetals(ctx, snapshot, settings);

    ctx.restore();
    ctx.restore();
  }
}
