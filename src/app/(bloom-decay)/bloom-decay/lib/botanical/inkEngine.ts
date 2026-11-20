import { generateDiffusionField, mulberry32, type DiffusionField } from './noise';
import { clamp01, easeOutCubic, easeOutQuart, segmentProgress } from './timeline';
import type {
  BrushstrokeSpec,
  InkStainSpec,
  InkType,
  SplatterClusterSpec,
} from './types';

interface InkPaletteRGB {
  core: [number, number, number];
  rim: [number, number, number];
  granuleDark: [number, number, number];
  alphaBoost: number;
}

const INK_TYPE_STYLES: Record<InkType, InkPaletteRGB> = {
  burgundy: {
    core: [108, 36, 51], // Deep absorbed burgundy (#6C2433)
    rim: [66, 20, 31], // Caustic dried wine rim
    granuleDark: [48, 14, 22],
    alphaBoost: 1.0,
  },
  roseWash: {
    core: [162, 98, 107], // #A2626B
    rim: [122, 66, 76],
    granuleDark: [98, 50, 58],
    alphaBoost: 0.78,
  },
  charcoal: {
    core: [30, 26, 27], // #1E1A1B
    rim: [18, 15, 16],
    granuleDark: [12, 10, 11],
    alphaBoost: 1.0,
  },
  archivalGray: {
    core: [132, 122, 110],
    rim: [104, 95, 86],
    granuleDark: [88, 80, 72],
    alphaBoost: 0.62,
  },
};

interface CachedStainEntry {
  spec: InkStainSpec;
  field: DiffusionField;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  imageData: ImageData | null;
  lastQuantizedProgress: number;
}

interface PrecomputedDroplet {
  angle: number;
  distFactor: number;
  radius: number;
  elongation: number;
  delay: number;
  irregularity: number;
}

interface CachedBrushEntry {
  spec: BrushstrokeSpec;
  canvas: HTMLCanvasElement;
  minX: number;
  minY: number;
  width: number;
  height: number;
  /** Direction vector from start to end for organic directional reveal */
  dirX: number;
  dirY: number;
  length: number;
}

/**
 * Reusable procedural ink diffusion, directional dry-brush, and splatter engine.
 * Caches expensive FBM diffusion fields and pre-bakes multi-bristle dry-brush strokes
 * into tight offscreen canvases so 60 FPS playback & scrubbing stays ultra-fast.
 */
export class InkDiffusionEngine {
  private stainCache = new Map<string, CachedStainEntry>();
  private dropletCache = new Map<string, PrecomputedDroplet[]>();
  private brushCache = new Map<string, CachedBrushEntry>();

  constructor(
    stains: InkStainSpec[],
    brushstrokes: BrushstrokeSpec[],
    splatters: SplatterClusterSpec[]
  ) {
    for (const stain of stains) {
      const size = 96;
      const field = generateDiffusionField(size, stain.seed, stain.lobes);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const imageData = ctx ? ctx.createImageData(size, size) : null;

      this.stainCache.set(stain.id, {
        spec: stain,
        field,
        canvas,
        ctx,
        imageData,
        lastQuantizedProgress: -1,
      });
    }

    for (const brush of brushstrokes) {
      this.brushCache.set(brush.id, this.bakeBrushstroke(brush));
    }

    for (const splat of splatters) {
      this.dropletCache.set(splat.id, this.precomputeDroplets(splat));
    }
  }

  /**
   * Pre-bakes a rich multi-bristle dry-brush stroke onto a tight offscreen canvas ONCE.
   */
  private bakeBrushstroke(brush: BrushstrokeSpec): CachedBrushEntry {
    const pad = brush.width * 0.75 + 16;
    const minX = Math.floor(Math.min(brush.start.x, brush.control.x, brush.end.x) - pad);
    const minY = Math.floor(Math.min(brush.start.y, brush.control.y, brush.end.y) - pad);
    const maxX = Math.ceil(Math.max(brush.start.x, brush.control.x, brush.end.x) + pad);
    const maxY = Math.ceil(Math.max(brush.start.y, brush.control.y, brush.end.y) + pad);
    const width = Math.max(16, maxX - minX);
    const height = Math.max(16, maxY - minY);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    const dx = brush.end.x - brush.start.x;
    const dy = brush.end.y - brush.start.y;
    const length = Math.hypot(dx, dy) || 1;

    if (ctx) {
      const rng = mulberry32(brush.seed);
      ctx.save();
      ctx.translate(-minX, -minY);
      ctx.strokeStyle = brush.color;
      ctx.lineCap = 'round';

      const steps = 32;
      for (let i = 0; i < brush.bristles; i++) {
        const t = brush.bristles > 1 ? i / (brush.bristles - 1) - 0.5 : 0;
        const offsetRatio = t + (rng() - 0.5) * 0.12;
        const edgeFade = 1 - Math.abs(t) * 1.45;
        const bWidth = Math.max(0.65, (brush.width / brush.bristles) * (0.55 + rng() * 1.05));
        // Wide staggered dry-brush start & end lengths so strokes feather into organic bristles
        const startTrim = rng() * 0.34 + Math.abs(t) * 0.22;
        const endTrim = Math.max(startTrim + 0.18, 1 - rng() * 0.36 - Math.abs(t) * 0.22);
        const alpha = Math.max(0.14, (0.38 + rng() * 0.58) * Math.max(0.25, edgeFade));
        const wobbleAmp = 1.4 + rng() * 3.0;
        const wobbleFreq = 4 + rng() * 8;

        const gapCount = 2 + Math.floor(rng() * 3);
        const gaps: Array<{ start: number; end: number }> = [];
        for (let g = 0; g < gapCount; g++) {
          const gs = 0.12 + rng() * 0.76;
          const gl = 0.03 + rng() * (0.09 + Math.abs(t) * 0.15);
          gaps.push({ start: gs, end: Math.min(0.98, gs + gl) });
        }

        ctx.globalAlpha = brush.opacity * alpha;
        ctx.lineWidth = bWidth;

        let drawing = false;
        ctx.beginPath();
        for (let s = 0; s <= steps; s++) {
          const u = startTrim + (endTrim - startTrim) * (s / steps);
          let inGap = false;
          for (const gap of gaps) {
            if (u > gap.start && u < gap.end) {
              inGap = true;
              break;
            }
          }
          if (inGap) {
            if (drawing) {
              ctx.stroke();
              ctx.beginPath();
              drawing = false;
            }
            continue;
          }

          const inv = 1 - u;
          const bx = inv * inv * brush.start.x + 2 * inv * u * brush.control.x + u * u * brush.end.x;
          const by = inv * inv * brush.start.y + 2 * inv * u * brush.control.y + u * u * brush.end.y;

          const tx = 2 * inv * (brush.control.x - brush.start.x) + 2 * u * (brush.end.x - brush.control.x);
          const ty = 2 * inv * (brush.control.y - brush.start.y) + 2 * u * (brush.end.y - brush.control.y);
          const tLen = Math.hypot(tx, ty) || 1;
          const nx = -ty / tLen;
          const ny = tx / tLen;

          const taper = 0.74 + Math.sin(u * Math.PI) * 0.32;
          const offset = offsetRatio * brush.width * taper + Math.sin(u * wobbleFreq) * wobbleAmp;

          const px = bx + nx * offset;
          const py = by + ny * offset;

          if (!drawing) {
            ctx.moveTo(px, py);
            drawing = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        if (drawing) ctx.stroke();
      }
      ctx.restore();
    }

    return {
      spec: brush,
      canvas,
      minX,
      minY,
      width,
      height,
      dirX: dx / length,
      dirY: dy / length,
      length,
    };
  }

  private precomputeDroplets(splat: SplatterClusterSpec): PrecomputedDroplet[] {
    const rng = mulberry32(splat.seed);
    const list: PrecomputedDroplet[] = [];

    for (let i = 0; i < splat.dropletCount; i++) {
      const baseAngle = rng() * Math.PI * 2;
      const useBias = rng() < splat.biasStrength;
      const angle = useBias ? splat.biasAngle + (rng() - 0.5) * 0.95 : baseAngle;

      const isHeroDrop = i === 0 && splat.dropletCount >= 24;
      const distFactor = isHeroDrop ? 0.06 : Math.pow(rng(), 0.72);
      const radius = isHeroDrop ? 11 + rng() * 12 : 1.3 + Math.pow(rng(), 2.4) * 10.5;

      list.push({
        angle,
        distFactor,
        radius,
        elongation: isHeroDrop ? 1.12 : 1.0 + rng() * 0.72,
        delay: distFactor * 0.42 + rng() * 0.18,
        irregularity: rng(),
      });
    }
    return list;
  }

  /**
   * Updates the offscreen raster for a stain only when its quantized progress changes.
   */
  private updateStainRaster(entry: CachedStainEntry, progress: number): void {
    const quantized = Math.round(clamp01(progress) * 48);
    if (quantized === entry.lastQuantizedProgress) return;
    entry.lastQuantizedProgress = quantized;

    const { ctx, imageData, field, spec } = entry;
    if (!ctx || !imageData) return;

    const p = quantized / 48;
    const data = imageData.data;

    if (p <= 0.002) {
      data.fill(0);
      ctx.putImageData(imageData, 0, 0);
      return;
    }

    const style = INK_TYPE_STYLES[spec.inkType];
    const threshold = 0.05 + easeOutCubic(p) * 0.98;
    const feather = 0.11 + (1 - p) * 0.07;
    const rimBand = 0.13;
    const len = field.size * field.size;

    for (let i = 0; i < len; i++) {
      const arrival = field.arrival[i];
      const delta = threshold - arrival;

      if (delta <= 0) {
        data[i * 4 + 3] = 0;
        continue;
      }

      const edgeMask = clamp01(delta / feather);
      const smoothEdge = edgeMask * edgeMask * (3 - 2 * edgeMask);

      const rimProximity = 1 - clamp01(Math.abs(delta - rimBand * 0.65) / rimBand);
      const rimFactor = rimProximity * rimProximity * spec.rimStrength;

      const gran = field.granulation[i];
      const granShade = (gran - 0.5) * 0.42;

      const r =
        style.core[0] * (1 - rimFactor) +
        style.rim[0] * rimFactor -
        granShade * (style.core[0] - style.granuleDark[0]);
      const g =
        style.core[1] * (1 - rimFactor) +
        style.rim[1] * rimFactor -
        granShade * (style.core[1] - style.granuleDark[1]);
      const b =
        style.core[2] * (1 - rimFactor) +
        style.rim[2] * rimFactor -
        granShade * (style.core[2] - style.granuleDark[2]);

      const interiorAlpha = 0.66 + gran * 0.34;
      const alpha =
        smoothEdge *
        Math.min(1, (interiorAlpha + rimFactor * 0.44) * style.alphaBoost) *
        spec.opacity *
        255;

      const idx = i * 4;
      data[idx] = Math.min(255, Math.max(0, r));
      data[idx + 1] = Math.min(255, Math.max(0, g));
      data[idx + 2] = Math.min(255, Math.max(0, b));
      data[idx + 3] = Math.min(255, Math.max(0, alpha));
    }

    ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Renders an expanding procedural watercolor/ink stain onto the main canvas.
   */
  public drawStain(
    ctx: CanvasRenderingContext2D,
    spec: InkStainSpec,
    timeSec: number,
    animateDiffusion: boolean,
    visibilityEnvelope = 1
  ): void {
    const entry = this.stainCache.get(spec.id);
    if (!entry) return;

    const progress = animateDiffusion
      ? segmentProgress(timeSec, spec.startSec, spec.durationSec)
      : 1;

    if (progress <= 0.002) return;
    this.updateStainRaster(entry, progress);

    ctx.save();
    ctx.translate(spec.origin.x, spec.origin.y);
    ctx.rotate(spec.rotation);
    ctx.globalAlpha = visibilityEnvelope;
    ctx.drawImage(
      entry.canvas,
      -spec.radiusX,
      -spec.radiusY,
      spec.radiusX * 2,
      spec.radiusY * 2
    );
    ctx.restore();
  }

  /**
   * Renders a directional multi-bristle dry-brush stroke using its cached offscreen
   * bristle sprite and a jagged organic bristle-edge directional clip polygon.
   */
  public drawBrushstroke(
    ctx: CanvasRenderingContext2D,
    brush: BrushstrokeSpec,
    timeSec: number,
    animateDiffusion: boolean,
    visibilityEnvelope = 1
  ): void {
    const cached = this.brushCache.get(brush.id);
    if (!cached) return;

    const rawProgress = animateDiffusion
      ? segmentProgress(timeSec, brush.startSec, brush.durationSec)
      : 1;
    if (rawProgress <= 0.002) return;

    const reveal = easeOutCubic(rawProgress);

    ctx.save();
    ctx.globalAlpha = visibilityEnvelope;

    if (reveal < 0.995) {
      // Organic jagged directional clip along the actual painted gesture vector
      const ang = Math.atan2(cached.dirY, cached.dirX);
      const halfSpan = brush.width * 1.15;
      const reach = cached.length * reveal + 18;
      ctx.save();
      ctx.translate(brush.start.x, brush.start.y);
      ctx.rotate(ang);
      ctx.beginPath();
      ctx.moveTo(-36, -halfSpan);
      ctx.lineTo(reach, -halfSpan);
      // Organic serrated leading bristle front (not a rigid rectangle)
      const teeth = 9;
      for (let i = 0; i <= teeth; i++) {
        const y = -halfSpan + (i / teeth) * halfSpan * 2;
        const jag = Math.sin(i * 2.7 + brush.seed) * 16 + Math.cos(i * 5.1) * 9;
        ctx.lineTo(reach + jag, y);
      }
      ctx.lineTo(-36, halfSpan);
      ctx.closePath();
      ctx.clip();
      ctx.rotate(-ang);
      ctx.translate(-brush.start.x, -brush.start.y);
      ctx.drawImage(cached.canvas, cached.minX, cached.minY);
      ctx.restore();
    } else {
      ctx.drawImage(cached.canvas, cached.minX, cached.minY);
    }

    ctx.restore();
  }

  /**
   * Renders a deterministic ink splatter cluster with fast outward expansion.
   */
  public drawSplatter(
    ctx: CanvasRenderingContext2D,
    splat: SplatterClusterSpec,
    timeSec: number,
    animateDiffusion: boolean,
    visibilityEnvelope = 1
  ): void {
    const droplets = this.dropletCache.get(splat.id);
    if (!droplets) return;

    const rawProgress = animateDiffusion
      ? segmentProgress(timeSec, splat.startSec, splat.durationSec)
      : 1;
    if (rawProgress <= 0.002) return;

    ctx.save();
    ctx.fillStyle = splat.color;

    for (const d of droplets) {
      const localP = clamp01((rawProgress - d.delay) / Math.max(0.25, 1 - d.delay));
      if (localP <= 0.002) continue;

      const travel = easeOutQuart(localP);
      const dist = d.distFactor * splat.spreadRadius * (0.28 + travel * 0.72);
      const x = splat.origin.x + Math.cos(d.angle) * dist;
      const y = splat.origin.y + Math.sin(d.angle) * dist;
      const r = d.radius * (0.35 + easeOutCubic(localP) * 0.65);

      ctx.globalAlpha = splat.opacity * Math.min(1, localP * 1.8) * visibilityEnvelope;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(d.angle);

      ctx.beginPath();
      const lobes = 7;
      for (let i = 0; i <= lobes; i++) {
        const a = (i / lobes) * Math.PI * 2;
        const jitter = 0.84 + Math.sin(a * 3 + d.irregularity * 12) * 0.16;
        const rx = Math.cos(a) * r * d.elongation * jitter;
        const ry = Math.sin(a) * r * jitter;
        if (i === 0) ctx.moveTo(rx, ry);
        else ctx.lineTo(rx, ry);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    ctx.restore();
  }
}
