import { createSeededRandom, clamp } from './sceneLayout';
import { hexToRgba, mixHex } from './desertPalette';

export type Point2D = [number, number];

export interface DryBrushOptions {
  width: number;
  color: string;
  secondaryColor?: string;
  opacity?: number;
  bristles?: number;
  /** 0 = wet/solid gouache, 1 = very dry broken bristles */
  dryness?: number;
  taperStart?: number;
  taperEnd?: number;
  roughness?: number;
  seed?: number;
}

/**
 * Sample a Catmull-Rom-like smoothed polyline into evenly spaced points with tangents/normals.
 */
function samplePolyline(points: Point2D[], stepPx = 10): Array<{ x: number; y: number; nx: number; ny: number; t: number }> {
  if (points.length < 2) return [];
  const segLengths: number[] = [];
  let totalLen = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const d = Math.hypot(dx, dy);
    segLengths.push(d);
    totalLen += d;
  }
  if (totalLen < 1) return [];

  const samples: Array<{ x: number; y: number; nx: number; ny: number; t: number }> = [];
  let accum = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const len = segLengths[i];
    const steps = Math.max(2, Math.ceil(len / stepPx));
    const dx = (p1[0] - p0[0]) / (len || 1);
    const dy = (p1[1] - p0[1]) / (len || 1);
    const nx = -dy;
    const ny = dx;

    for (let s = 0; s < steps; s++) {
      const f = s / steps;
      const dist = accum + f * len;
      samples.push({
        x: p0[0] + (p1[0] - p0[0]) * f,
        y: p0[1] + (p1[1] - p0[1]) * f,
        nx,
        ny,
        t: dist / totalLen,
      });
    }
    accum += len;
  }

  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const d = Math.hypot(last[0] - prev[0], last[1] - prev[1]) || 1;
  samples.push({
    x: last[0],
    y: last[1],
    nx: -(last[1] - prev[1]) / d,
    ny: (last[0] - prev[0]) / d,
    t: 1,
  });

  return samples;
}

/**
 * Draws an expressive multi-bristle dry-brush stroke along a path.
 * Individual bristles carry slightly varied pigment and break off organically
 * to emulate gouache / sumi ink dragged across toothy watercolor paper.
 */
export function drawDryBrushStroke(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  options: DryBrushOptions
): void {
  const {
    width,
    color,
    secondaryColor,
    opacity = 0.85,
    bristles = 22,
    dryness = 0.45,
    taperStart = 0.12,
    taperEnd = 0.25,
    roughness = 0.25,
    seed = 101,
  } = options;

  const samples = samplePolyline(points, Math.max(8, width * 0.22));
  if (samples.length < 2) return;

  const rand = createSeededRandom(seed);
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (let b = 0; b < bristles; b++) {
    // Distribute bristles across the brush width, slightly denser toward core
    const u = bristles === 1 ? 0 : (b / (bristles - 1)) * 2 - 1;
    const jitteredU = u + (rand() - 0.5) * 0.22;
    const edgeFactor = Math.abs(jitteredU);

    // Outer bristles dry out earlier and break more frequently
    const bristleStart = Math.max(0, (rand() - 0.55) * dryness * 0.35 + edgeFactor * dryness * 0.12);
    const bristleEnd = Math.min(1, 1 - rand() * dryness * (0.28 + edgeFactor * 0.48));
    if (bristleEnd <= bristleStart + 0.05) continue;

    const bristleWidth = Math.max(
      0.8,
      (width / bristles) * (1.25 + rand() * 1.15) * (1 - edgeFactor * 0.35)
    );
    const toneColor = secondaryColor ? mixHex(color, secondaryColor, rand()) : color;
    const bristleAlpha =
      opacity * (0.45 + rand() * 0.55) * (1 - edgeFactor * (0.3 + dryness * 0.35));

    ctx.strokeStyle = hexToRgba(toneColor, clamp(bristleAlpha, 0.04, 0.98));
    ctx.lineWidth = bristleWidth;

    let drawing = false;
    let skipRun = 0;
    const wobblePhase = rand() * Math.PI * 2;
    const wobbleFreq = 3 + rand() * 7;

    ctx.beginPath();
    for (let i = 0; i < samples.length; i++) {
      const s = samples[i];
      if (s.t < bristleStart || s.t > bristleEnd) {
        if (drawing) {
          ctx.stroke();
          ctx.beginPath();
          drawing = false;
        }
        continue;
      }

      // Compute width envelope with taper at both ends
      let env = 1;
      if (taperStart > 0 && s.t < taperStart) {
        env *= 0.25 + 0.75 * (s.t / taperStart);
      }
      if (taperEnd > 0 && s.t > 1 - taperEnd) {
        env *= Math.max(0.08, (1 - s.t) / taperEnd);
      }

      // Dry-brush paper tooth skip probability increases toward tail and outer edges
      const skipChance =
        dryness * (0.04 + edgeFactor * 0.14 + Math.pow(s.t, 1.8) * 0.22);
      if (skipRun > 0) {
        skipRun--;
        if (drawing) {
          ctx.stroke();
          ctx.beginPath();
          drawing = false;
        }
        continue;
      } else if (rand() < skipChance) {
        skipRun = 1 + Math.floor(rand() * 2);
        if (drawing) {
          ctx.stroke();
          ctx.beginPath();
          drawing = false;
        }
        continue;
      }

      const wobble = Math.sin(s.t * wobbleFreq + wobblePhase) * roughness * width * 0.08;
      const offset = jitteredU * (width * 0.5) * env + wobble;
      const px = s.x + s.nx * offset;
      const py = s.y + s.ny * offset;

      if (!drawing) {
        ctx.moveTo(px, py);
        drawing = true;
      } else {
        ctx.lineTo(px, py);
      }
    }
    if (drawing) {
      ctx.stroke();
    }
  }

  ctx.restore();
}

export interface GouacheWashOptions {
  width: number;
  color: string;
  opacity?: number;
  passes?: number;
  seed?: number;
}

/**
 * Broad translucent watercolor/gouache atmospheric band with streaky feathered edges.
 */
export function drawGouacheWash(
  ctx: CanvasRenderingContext2D,
  points: Point2D[],
  options: GouacheWashOptions
): void {
  const { width, color, opacity = 0.22, passes = 4, seed = 202 } = options;
  const rand = createSeededRandom(seed);

  for (let p = 0; p < passes; p++) {
    const spread = (p / Math.max(1, passes - 1) - 0.5) * width * 0.45;
    const shifted: Point2D[] = points.map(([x, y]) => [
      x + (rand() - 0.5) * width * 0.08,
      y + spread + (rand() - 0.5) * width * 0.12,
    ]);
    drawDryBrushStroke(ctx, shifted, {
      width: width * (0.55 + rand() * 0.5),
      color,
      opacity: opacity * (0.42 + rand() * 0.45),
      bristles: 16 + Math.floor(rand() * 12),
      dryness: 0.48 + rand() * 0.3,
      taperStart: 0.28,
      taperEnd: 0.36,
      roughness: 0.35,
      seed: seed + p * 37,
    });
  }
}

export interface PaintedMassOptions {
  baseTopColor: string;
  baseBottomColor: string;
  gradientAngle?: number;
  strokeColor: string;
  highlightColor?: string;
  shadowColor?: string;
  /** Angle in degrees for directional dry-brush strata inside the rock mass */
  strataAngleDeg: number;
  strokeDensity?: number;
  dryness?: number;
  seed: number;
  /** Optional ragged brush strokes painted along top/side edges */
  fringeEdgeColor?: string;
}

/**
 * Paints a sculptural canyon rock form:
 * 1) Organic slightly jittered base gouache wash gradient
 * 2) Clipped directional multi-bristle strata brushwork inside the form
 * 3) Dry sunlit scumble catchlights and dark umber crevice scrapes
 * 4) Broken dry-brush edges escaping the silhouette slightly so it reads as hand-painted
 */
export function drawPaintedMass(
  ctx: CanvasRenderingContext2D,
  polygon: Point2D[],
  options: PaintedMassOptions
): void {
  if (polygon.length < 3) return;
  const rand = createSeededRandom(options.seed);

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of polygon) {
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }

  const w = maxX - minX;
  const h = maxY - minY;

  ctx.save();

  // Build slightly organic path
  ctx.beginPath();
  ctx.moveTo(polygon[0][0], polygon[0][1]);
  for (let i = 1; i < polygon.length; i++) {
    ctx.lineTo(polygon[i][0], polygon[i][1]);
  }
  ctx.closePath();

  // Base gouache fill
  const grad = ctx.createLinearGradient(minX, minY, minX + w * 0.25, maxY);
  grad.addColorStop(0, options.baseTopColor);
  grad.addColorStop(1, options.baseBottomColor);
  ctx.fillStyle = grad;
  ctx.fill();

  // Clip interior for layered directional dry-brush passes
  ctx.save();
  ctx.clip();

  const rad = (options.strataAngleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const cx = (minX + maxX) * 0.5;
  const cy = (minY + maxY) * 0.5;
  const span = Math.hypot(w, h) * 0.72;
  const count = options.strokeDensity ?? 26;

  for (let i = 0; i < count; i++) {
    const frac = i / Math.max(1, count - 1);
    const lateral = (frac - 0.5) * span * 1.15 + (rand() - 0.5) * 26;
    const lenHalf = span * (0.42 + rand() * 0.32);

    const mx = cx - sin * lateral;
    const my = cy + cos * lateral;

    const p0: Point2D = [mx - cos * lenHalf, my - sin * lenHalf];
    const pMid: Point2D = [
      mx + (rand() - 0.5) * 24,
      my + (rand() - 0.5) * 18,
    ];
    const p1: Point2D = [mx + cos * lenHalf, my + sin * lenHalf];

    const pick = rand();
    let col = options.strokeColor;
    let alpha = 0.28 + rand() * 0.34;
    if (pick < 0.24 && options.highlightColor) {
      col = options.highlightColor;
      alpha = 0.24 + rand() * 0.32;
    } else if (pick > 0.72 && options.shadowColor) {
      col = options.shadowColor;
      alpha = 0.26 + rand() * 0.38;
    }

    drawDryBrushStroke(ctx, [p0, pMid, p1], {
      width: 14 + rand() * 34,
      color: col,
      secondaryColor: options.strokeColor,
      opacity: alpha,
      bristles: 14 + Math.floor(rand() * 14),
      dryness: options.dryness ?? 0.52,
      taperStart: 0.18,
      taperEnd: 0.28,
      roughness: 0.3,
      seed: options.seed + i * 29 + 7,
    });
  }

  ctx.restore();

  // Expressive hand-painted edge drag strokes along selected polygon spans
  if (options.fringeEdgeColor) {
    for (let i = 0; i < Math.min(polygon.length - 1, 6); i++) {
      if (rand() > 0.62) continue;
      const a = polygon[i];
      const b = polygon[i + 1];
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) < 45) continue;
      drawDryBrushStroke(ctx, [a, b], {
        width: 8 + rand() * 16,
        color: options.fringeEdgeColor,
        opacity: 0.42 + rand() * 0.32,
        bristles: 12,
        dryness: 0.65,
        taperStart: 0.2,
        taperEnd: 0.32,
        seed: options.seed + 500 + i * 19,
      });
    }
  }

  ctx.restore();
}

/**
 * Renders a delicate hand-painted sumi-ink / gouache branching desert shrub.
 */
export function drawInkDesertShrub(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  scale: number,
  darkColor: string,
  lightColor: string,
  seed: number
): void {
  const rand = createSeededRandom(seed);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.lineCap = 'round';

  const drawBranch = (
    bx: number,
    by: number,
    angle: number,
    length: number,
    thickness: number,
    depth: number,
    color: string
  ) => {
    if (depth <= 0 || length < 5) return;
    const midX = bx + Math.cos(angle) * length * 0.52 + (rand() - 0.5) * 5;
    const midY = by + Math.sin(angle) * length * 0.52 + (rand() - 0.5) * 4;
    const endX = bx + Math.cos(angle + (rand() - 0.5) * 0.22) * length;
    const endY = by + Math.sin(angle + (rand() - 0.5) * 0.22) * length;

    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo(midX, midY, endX, endY);
    ctx.stroke();

    const splits = depth === 3 ? 2 + (rand() > 0.4 ? 1 : 0) : 2;
    for (let s = 0; s < splits; s++) {
      const spread = (s === 0 ? -1 : s === 1 ? 1 : 0) * (0.28 + rand() * 0.36);
      const startFrac = 0.42 + rand() * 0.52;
      const sx = bx + (endX - bx) * startFrac;
      const sy = by + (endY - by) * startFrac;
      drawBranch(
        sx,
        sy,
        angle + spread,
        length * (0.56 + rand() * 0.2),
        Math.max(0.7, thickness * 0.65),
        depth - 1,
        color
      );
    }
  };

  // Subtle sunlit pale rim twigs behind dark ink twigs for editorial contrast
  const stems = 4 + Math.floor(rand() * 3);
  for (let i = 0; i < stems; i++) {
    const baseAngle = -Math.PI * 0.5 + ((i / (stems - 1)) - 0.5) * 1.45 + (rand() - 0.5) * 0.2;
    const len = 26 + rand() * 26;
    drawBranch((rand() - 0.5) * 12, 0, baseAngle, len, 1.9, 3, hexToRgba(lightColor, 0.72));
    drawBranch((rand() - 0.5) * 12 + 1.5, 1.2, baseAngle + 0.03, len * 0.96, 1.65, 3, hexToRgba(darkColor, 0.9));
  }

  ctx.restore();
}

let cachedPaperGrainUrl: string | null = null;

/**
 * Generates a tileable cold-press watercolor paper grain texture data URL once.
 */
export function getPaperGrainDataUrl(): string {
  if (cachedPaperGrainUrl) return cachedPaperGrainUrl;
  if (typeof document === 'undefined') return '';

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const img = ctx.createImageData(size, size);
  const data = img.data;
  const rand = createSeededRandom(9091);

  // Fine cold-press paper tooth with warm neutral pigment tint
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const grain = rand();
      const wave =
        Math.sin((x / size) * Math.PI * 4) * Math.cos((y / size) * Math.PI * 4) * 6;
      const v = clamp(238 + (grain - 0.5) * 28 + wave, 198, 252);
      data[idx] = v;
      data[idx + 1] = clamp(v - 4, 190, 248);
      data[idx + 2] = clamp(v - 11, 180, 242);
      data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Subtle organic paper fibers
  ctx.strokeStyle = 'rgba(138, 102, 76, 0.055)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 95; i++) {
    const x = rand() * size;
    const y = rand() * size;
    const len = 6 + rand() * 18;
    const ang = rand() * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(ang) * len, y + Math.sin(ang) * len);
    ctx.stroke();
  }

  cachedPaperGrainUrl = canvas.toDataURL('image/png');
  return cachedPaperGrainUrl;
}

export interface DirectionalRevealStroke {
  points: Point2D[];
  width: number;
  start: number;
  end: number;
  seed: number;
}

/**
 * Slices a polyline to the partial segment from 0..fraction (0..1) so dry-brush
 * masks visibly sweep forward along the exact geological contour.
 */
function slicePolyline(points: Point2D[], fraction: number): Point2D[] {
  const f = clamp(fraction, 0, 1);
  if (points.length < 2 || f <= 0.002) return [];
  if (f >= 0.998) return points;

  const lengths: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const d = Math.hypot(
      points[i + 1][0] - points[i][0],
      points[i + 1][1] - points[i][1]
    );
    lengths.push(d);
    total += d;
  }
  if (total < 1) return [];

  const target = total * f;
  const out: Point2D[] = [points[0]];
  let accum = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const segLen = lengths[i];
    if (accum + segLen >= target) {
      const localF = segLen > 0 ? (target - accum) / segLen : 1;
      out.push([
        points[i][0] + (points[i + 1][0] - points[i][0]) * localF,
        points[i][1] + (points[i + 1][1] - points[i][1]) * localF,
      ]);
      break;
    }
    out.push(points[i + 1]);
    accum += segLen;
  }

  return out;
}

let sharedMaskCanvas: HTMLCanvasElement | null = null;

function getSharedRevealMaskCanvas(w: number, h: number): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  if (!sharedMaskCanvas) {
    sharedMaskCanvas = document.createElement('canvas');
  }
  if (sharedMaskCanvas.width !== w || sharedMaskCanvas.height !== h) {
    sharedMaskCanvas.width = w;
    sharedMaskCanvas.height = h;
  }
  return sharedMaskCanvas;
}

/**
 * Progressively reveals a pre-painted offscreen layer canvas along curated
 * directional dry-brush strokes (zero overhead once layerProgress >= 0.999).
 */
export function renderDirectionalBrushReveal(
  displayCtx: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  strokes: DirectionalRevealStroke[],
  layerProgress: number,
  canvasScale: number,
  bleedX: number,
  bleedY: number
): void {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  displayCtx.clearRect(0, 0, w, h);

  if (layerProgress <= 0.002) return;
  if (layerProgress >= 0.998) {
    displayCtx.drawImage(sourceCanvas, 0, 0);
    return;
  }

  const maskCanvas = getSharedRevealMaskCanvas(w, h);
  const mctx = maskCanvas?.getContext('2d');
  if (!maskCanvas || !mctx) {
    displayCtx.drawImage(sourceCanvas, 0, 0);
    return;
  }

  mctx.clearRect(0, 0, w, h);
  mctx.save();
  mctx.scale(canvasScale, canvasScale);
  mctx.translate(bleedX, bleedY);
  mctx.lineCap = 'butt';
  mctx.lineJoin = 'round';

  for (const stroke of strokes) {
    if (layerProgress <= stroke.start) continue;
    const localT = clamp(
      (layerProgress - stroke.start) / Math.max(0.01, stroke.end - stroke.start),
      0,
      1
    );
    if (localT <= 0.005) continue;

    const rand = createSeededRandom(stroke.seed);

    // 1. Recessed soft inner wash belly (trails behind the ragged bristle tip — never a round cap)
    const bellyT = clamp(localT * 0.84, 0, 1);
    const bellyPts = slicePolyline(stroke.points, bellyT);
    if (bellyPts.length >= 2) {
      mctx.strokeStyle = 'rgba(0,0,0,0.68)';
      mctx.lineWidth = stroke.width * 0.56;
      mctx.beginPath();
      mctx.moveTo(bellyPts[0][0], bellyPts[0][1]);
      for (let i = 1; i < bellyPts.length; i++) {
        mctx.lineTo(bellyPts[i][0], bellyPts[i][1]);
      }
      mctx.stroke();
    }

    // 2. Staggered, jagged dry-brush bristle ribbons creating an organic feathered brush frontier
    const bristleCount = 18;
    for (let b = 0; b < bristleCount; b++) {
      const u = (b / (bristleCount - 1)) * 2 - 1;
      const edgeFactor = Math.abs(u);
      const offsetMag = u * stroke.width * 0.5;

      // Center bristles reach slightly further; outer bristles stagger raggedly
      const reachBias = 0.74 + (1 - edgeFactor * 0.45) * 0.24 + (rand() - 0.35) * 0.3;
      const tipCut = clamp(localT * reachBias, 0, 1);
      if (tipCut <= 0.015) continue;

      const bPts = slicePolyline(stroke.points, tipCut);
      if (bPts.length < 2) continue;

      const baseWidth = Math.max(
        5,
        (stroke.width / bristleCount) * (1.35 + rand() * 1.15) * (1 - edgeFactor * 0.28)
      );
      const baseAlpha = clamp(
        (0.46 + (1 - edgeFactor) * 0.48) * (0.72 + rand() * 0.35),
        0.22,
        0.96
      );

      // Compute offset polyline for this bristle
      const jitterSeed = (rand() - 0.5) * stroke.width * 0.065;
      const wobblePhase = rand() * Math.PI * 2;
      const offsetPts: Point2D[] = [];
      for (let i = 0; i < bPts.length; i++) {
        const prev = bPts[Math.max(0, i - 1)];
        const next = bPts[Math.min(bPts.length - 1, i + 1)];
        const dx = next[0] - prev[0];
        const dy = next[1] - prev[1];
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const tFrac = i / Math.max(1, bPts.length - 1);
        const wobble = Math.sin(tFrac * 5.2 + wobblePhase) * stroke.width * 0.025;
        offsetPts.push([
          bPts[i][0] + nx * (offsetMag + jitterSeed + wobble),
          bPts[i][1] + ny * (offsetMag + jitterSeed + wobble),
        ]);
      }

      // Main bristle shaft
      mctx.strokeStyle = `rgba(0,0,0,${baseAlpha.toFixed(2)})`;
      mctx.lineWidth = baseWidth;
      mctx.beginPath();
      mctx.moveTo(offsetPts[0][0], offsetPts[0][1]);
      for (let i = 1; i < offsetPts.length; i++) {
        mctx.lineTo(offsetPts[i][0], offsetPts[i][1]);
      }
      mctx.stroke();

      // Feathered dry-brush leading tip flick (tapered fine hairs ahead of the shaft)
      if (localT < 0.96) {
        const tail = offsetPts[offsetPts.length - 1];
        const prev = offsetPts[offsetPts.length - 2];
        const dx = tail[0] - prev[0];
        const dy = tail[1] - prev[1];
        const segLen = Math.hypot(dx, dy) || 1;
        const tx = dx / segLen;
        const ty = dy / segLen;
        const flickLen = stroke.width * (0.08 + rand() * 0.22) * (1 - edgeFactor * 0.35);

        mctx.strokeStyle = `rgba(0,0,0,${(baseAlpha * 0.52).toFixed(2)})`;
        mctx.lineWidth = Math.max(2.5, baseWidth * 0.42);
        mctx.beginPath();
        mctx.moveTo(tail[0] - tx * flickLen * 0.2, tail[1] - ty * flickLen * 0.2);
        mctx.lineTo(tail[0] + tx * flickLen, tail[1] + ty * flickLen);
        mctx.stroke();
      }
    }
  }

  // Final smooth completion merge above 0.88 so every edge pixel joins cleanly
  if (layerProgress > 0.88) {
    const finishAlpha = clamp((layerProgress - 0.88) / 0.12, 0, 1);
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.fillStyle = `rgba(0,0,0,${finishAlpha.toFixed(3)})`;
    mctx.fillRect(0, 0, w, h);
  }
  mctx.restore();

  displayCtx.save();
  displayCtx.globalCompositeOperation = 'source-over';
  displayCtx.drawImage(maskCanvas, 0, 0);
  displayCtx.globalCompositeOperation = 'source-in';
  displayCtx.drawImage(sourceCanvas, 0, 0);
  displayCtx.restore();
}

/**
 * Reveals the golden sun disc through an organic wet-on-wet watercolor pigment bloom
 * mask (never a flat linear opacity fade).
 */
export function renderSunPigmentReveal(
  displayCtx: CanvasRenderingContext2D,
  sourceCanvas: HTMLCanvasElement,
  sunProgress: number,
  canvasScale: number,
  bleedX: number,
  bleedY: number
): void {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  displayCtx.clearRect(0, 0, w, h);

  if (sunProgress <= 0.002) return;
  if (sunProgress >= 0.998) {
    displayCtx.drawImage(sourceCanvas, 0, 0);
    return;
  }

  const maskCanvas = getSharedRevealMaskCanvas(w, h);
  const mctx = maskCanvas?.getContext('2d');
  if (!maskCanvas || !mctx) {
    displayCtx.drawImage(sourceCanvas, 0, 0);
    return;
  }

  mctx.clearRect(0, 0, w, h);
  mctx.save();
  mctx.scale(canvasScale, canvasScale);
  mctx.translate(bleedX, bleedY);

  const cx = 468;
  const cy = 486;
  const maxR = 265;
  const rand = createSeededRandom(31419);

  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2 + 0.35;
    const lobeDelay = i * 0.045;
    const localP = clamp((sunProgress - lobeDelay) / (1 - lobeDelay), 0, 1);
    if (localP <= 0) continue;

    const drift = (i === 0 ? 0 : 18 + rand() * 34) * localP;
    const lx = cx + Math.cos(angle) * drift;
    const ly = cy + Math.sin(angle) * drift;
    const radius = (34 + maxR * Math.pow(localP, 0.78)) * (0.85 + rand() * 0.28);

    const grad = mctx.createRadialGradient(lx, ly, radius * 0.12, lx, ly, radius);
    grad.addColorStop(0, `rgba(0,0,0,${Math.min(1, localP * 1.45).toFixed(3)})`);
    grad.addColorStop(0.68, `rgba(0,0,0,${Math.min(0.92, localP * 1.15).toFixed(3)})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');

    mctx.fillStyle = grad;
    mctx.beginPath();
    mctx.arc(lx, ly, radius, 0, Math.PI * 2);
    mctx.fill();
  }

  mctx.restore();

  displayCtx.save();
  displayCtx.globalCompositeOperation = 'source-over';
  displayCtx.drawImage(maskCanvas, 0, 0);
  displayCtx.globalCompositeOperation = 'source-in';
  displayCtx.drawImage(sourceCanvas, 0, 0);
  displayCtx.restore();
}

