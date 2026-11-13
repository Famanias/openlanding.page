import {
  colorDistanceOklab,
  hexToOklch,
  hexToRgb,
  hexWithAlpha,
  mixHex,
  oklchToHex,
  relativeLuminance,
} from './color';
import type { DesignState } from './state';

const bitmapIds = new WeakMap<ImageBitmap, number>();
let nextBitmapId = 1;

export function getBitmapKey(bitmap: ImageBitmap | null | undefined): string {
  if (!bitmap) return '';
  let id = bitmapIds.get(bitmap);
  if (!id) {
    id = nextBitmapId++;
    bitmapIds.set(bitmap, id);
  }
  return `${id}:${bitmap.width}x${bitmap.height}`;
}

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

// Cached deterministic wool-felt micro-grain tile so redraws on dial/slider drag stay ultra-fast
let grainTileCanvas: HTMLCanvasElement | null = null;
function getGrainPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  if (typeof document === 'undefined') return null;
  if (!grainTileCanvas) {
    const tile = document.createElement('canvas');
    tile.width = 192;
    tile.height = 192;
    const tCtx = tile.getContext('2d');
    if (tCtx) {
      const rand = seededRand(160288);
      for (let i = 0; i < 1400; i += 1) {
        const x = rand() * 192;
        const y = rand() * 192;
        const len = 1.4 + rand() * 3.2;
        const angle = rand() * Math.PI * 2;
        const light = rand() > 0.48;
        tCtx.strokeStyle = light
          ? 'rgba(255, 252, 248, 0.048)'
          : 'rgba(32, 16, 20, 0.048)';
        tCtx.lineWidth = 0.8;
        tCtx.beginPath();
        tCtx.moveTo(x, y);
        tCtx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
        tCtx.stroke();
      }
    }
    grainTileCanvas = tile;
  }
  return ctx.createPattern(grainTileCanvas, 'repeat');
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  length: number,
  width: number,
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(length * 0.45, -width, length, 0);
  ctx.quadraticCurveTo(length * 0.45, width, 0, 0);
  ctx.fill();
  ctx.restore();
}

function drawBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  petals: number,
  rotation: number,
  petalFill: string,
  accentFill: string,
  centerFill: string,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);

  // Outer open petals
  ctx.fillStyle = petalFill;
  for (let i = 0; i < petals; i += 1) {
    const a = (i * Math.PI * 2) / petals;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      radius * 0.38,
      -radius * 0.42,
      radius * 1.04,
      -radius * 0.34,
      radius,
      0,
    );
    ctx.bezierCurveTo(
      radius * 1.04,
      radius * 0.34,
      radius * 0.38,
      radius * 0.42,
      0,
      0,
    );
    ctx.fill();
    ctx.restore();
  }

  // Soft interior petal shading
  ctx.fillStyle = accentFill;
  for (let i = 0; i < petals; i += 1) {
    const a = ((i + 0.5) * Math.PI * 2) / petals;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.ellipse(radius * 0.36, 0, radius * 0.24, radius * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Botanical center disc + stamens
  ctx.fillStyle = centerFill;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.19, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = petalFill;
  for (let i = 0; i < 6; i += 1) {
    const a = (i * Math.PI * 2) / 6;
    ctx.beginPath();
    ctx.arc(Math.cos(a) * radius * 0.26, Math.sin(a) * radius * 0.26, radius * 0.045, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

export interface PrintTones {
  primary: string;
  secondary: string;
  soft: string;
  centerContrast: string;
  skyWash: string;
  distantRidge: string;
  midRidge: string;
  foreRidge: string;
  foregroundInk: string;
}

/**
 * Derives secondary tonal shades directly from the selected Print Color in OKLCH space
 * so every print retains rich illustration depth without collapsing into the base felt.
 */
export function derivePrintTones(baseHex: string, printHex: string): PrintTones {
  const p = hexToOklch(printHex);
  const b = hexToOklch(baseHex);
  const hue = p.c < 0.015 ? 65 : p.h;
  const isLightPrint = p.l > 0.64;

  // Pick a tonal direction for secondary motifs that separates from both primary ink and base felt.
  const pickSeparatedTone = (deltaLight: number, chromaScale: number): string => {
    const dir = isLightPrint ? -1 : 1;
    const candidateL = Math.max(0.14, Math.min(0.94, p.l + dir * deltaLight));
    const candidate = oklchToHex(candidateL, Math.max(0.004, p.c * chromaScale), hue);
    if (colorDistanceOklab(candidate, baseHex) >= 0.12) {
      return candidate;
    }
    const altDir = p.l >= b.l ? 1 : -1;
    const altL = Math.max(0.12, Math.min(0.96, p.l + altDir * (deltaLight + 0.06)));
    return oklchToHex(altL, Math.max(0.004, p.c * chromaScale), hue);
  };

  const secondary = pickSeparatedTone(0.14, 0.88);
  const soft = pickSeparatedTone(0.24, 0.72);
  const centerContrast =
    relativeLuminance(printHex) < 0.24
      ? oklchToHex(Math.min(0.95, p.l + 0.44), Math.max(0.008, p.c * 0.45), hue)
      : oklchToHex(Math.max(0.18, p.l - 0.42), Math.min(0.11, p.c * 1.1), hue);

  // Landscape keeps stepped separation between atmospheric hills and foreground trees/ground band.
  const skyWash = mixHex(baseHex, soft, 0.22);
  const distantRidge = mixHex(baseHex, soft, 0.34);
  const midRidge = mixHex(baseHex, secondary, 0.56);
  const foreRidge = mixHex(baseHex, secondary, 0.72);
  const foregroundInk = printHex;

  return {
    primary: printHex,
    secondary,
    soft,
    centerContrast,
    skyWash,
    distantRidge,
    midRidge,
    foreRidge,
    foregroundInk,
  };
}

function drawBloomPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  // Unit tile width spans multiple panels (~1.8 panels * scale) so branches cross folds organically
  const unitW = h * 0.86 * s;
  const tileH = h * s;
  const repeatsX = Math.ceil(w / unitW) + 2;
  const repeatsY = Math.ceil(h / tileH) + 1;

  const tones = derivePrintTones(baseHex, designHex);
  const primaryInk = tones.primary;
  const softInk = tones.secondary;
  const stamenContrast = tones.centerContrast;

  const drawSingleTile = (ox: number, oy: number, tw: number, th: number) => {
    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(tw / 440, th / 510);

    // Sweeping botanical stems that cross left & right edges into neighboring tiles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Secondary soft background stem
    ctx.strokeStyle = softInk;
    ctx.lineWidth = 4.2;
    ctx.beginPath();
    ctx.moveTo(-18, 430);
    ctx.bezierCurveTo(95, 360, 145, 220, 268, 175);
    ctx.bezierCurveTo(345, 148, 395, 92, 460, 118);
    ctx.stroke();

    // Primary expressive S-curve stem crossing seam cleanly
    ctx.strokeStyle = primaryInk;
    ctx.lineWidth = 5.4;
    ctx.beginPath();
    ctx.moveTo(42, 515);
    ctx.bezierCurveTo(68, 375, 178, 345, 198, 224);
    ctx.bezierCurveTo(214, 130, 326, 116, 422, 54);
    ctx.stroke();

    // Delicate offshoot branch to lower right blossom
    ctx.lineWidth = 3.8;
    ctx.beginPath();
    ctx.moveTo(156, 302);
    ctx.quadraticCurveTo(246, 322, 338, 376);
    ctx.stroke();

    // Soft foliage leaves
    ctx.fillStyle = softInk;
    drawLeaf(ctx, 112, 342, -0.82, 58, 18);
    drawLeaf(ctx, 250, 182, 0.42, 62, 17);
    drawLeaf(ctx, 314, 128, -0.58, 52, 15);
    drawLeaf(ctx, 224, 324, 0.65, 56, 16);

    // Sharp foreground leaves
    ctx.fillStyle = primaryInk;
    drawLeaf(ctx, 84, 412, -1.05, 64, 19);
    drawLeaf(ctx, 172, 260, -0.35, 60, 17);
    drawLeaf(ctx, 276, 346, -0.45, 50, 15);
    drawLeaf(ctx, 355, 88, 0.36, 48, 14);

    // Focal open 5-petal blossom
    drawBlossom(
      ctx,
      198,
      202,
      62,
      5,
      -0.25,
      primaryInk,
      softInk,
      stamenContrast,
    );

    // Secondary open 6-petal blossom straddling upper right quadrant
    drawBlossom(
      ctx,
      368,
      86,
      46,
      6,
      0.38,
      softInk,
      primaryInk,
      stamenContrast,
    );

    // Lower airy bloom
    drawBlossom(
      ctx,
      344,
      382,
      44,
      5,
      0.72,
      primaryInk,
      softInk,
      stamenContrast,
    );

    // Delicate unopened buds
    ctx.fillStyle = primaryInk;
    drawLeaf(ctx, 108, 176, -1.2, 26, 11);
    ctx.fillStyle = softInk;
    drawLeaf(ctx, 294, 246, -0.78, 22, 9);

    ctx.restore();
  };

  const yOffset = (h - tileH) * 0.5;
  for (let iy = -1; iy <= repeatsY; iy += 1) {
    const oy = yOffset + iy * tileH;
    // Slight brick half-drop offset for natural textile rhythm
    const staggerX = iy % 2 === 0 ? 0 : -unitW * 0.36;
    for (let ix = -1; ix < repeatsX; ix += 1) {
      drawSingleTile(ix * unitW + staggerX, oy, unitW, tileH);
    }
  }
}

function drawStripesPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const period = (w / 5.5) * (motifScale / 100);
  const tones = derivePrintTones(baseHex, designHex);
  const softTone = tones.soft;
  const midTone = tones.secondary;
  const count = Math.ceil(w / period) + 2;

  for (let i = -1; i < count; i += 1) {
    const x = i * period;
    // Wide solid band
    ctx.fillStyle = tones.primary;
    ctx.fillRect(x, 0, period * 0.22, h);

    // Soft woven companion bar
    ctx.fillStyle = softTone;
    ctx.fillRect(x + period * 0.28, 0, period * 0.14, h);

    // Fine paired pinstripes
    ctx.fillStyle = tones.primary;
    ctx.fillRect(x + period * 0.5, 0, Math.max(1.5, period * 0.045), h);
    ctx.fillRect(x + period * 0.58, 0, Math.max(1.5, period * 0.045), h);

    // Medium rhythmic accent
    ctx.fillStyle = midTone;
    ctx.fillRect(x + period * 0.72, 0, period * 0.11, h);

    // Subtle hairline thread
    ctx.fillStyle = hexWithAlpha(tones.primary, 0.55);
    ctx.fillRect(x + period * 0.9, 0, Math.max(1, period * 0.02), h);
  }
}

function drawLandscapeArtwork(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  ctx.save();
  // Uniform centered scale (Artwork zoom) never stretches aspect ratio
  ctx.translate(w * 0.5, h * 0.5);
  ctx.scale(s, s);
  ctx.translate(-w * 0.5, -h * 0.5);

  const tones = derivePrintTones(baseHex, designHex);
  const distantHill = tones.distantRidge;
  const midHill = tones.midRidge;
  const foreRidge = tones.foreRidge;
  const darkInk = tones.foregroundInk;

  // Transparent sky wash so base felt luminescence shows through cleanly
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.72);
  skyGrad.addColorStop(0, hexWithAlpha(tones.soft, 0.24));
  skyGrad.addColorStop(1, hexWithAlpha(tones.soft, 0));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Quiet rising sun with delicate outer ring halo
  const sunX = w * 0.26;
  const sunY = h * 0.29;
  const sunR = Math.min(w, h) * 0.11;

  ctx.strokeStyle = hexWithAlpha(darkInk, 0.28);
  ctx.lineWidth = Math.max(1.5, w * 0.002);
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR * 1.38, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = tones.secondary;
  ctx.beginPath();
  ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
  ctx.fill();

  // Back sweeping ridge across full 16 panels
  ctx.fillStyle = distantHill;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.56);
  ctx.bezierCurveTo(w * 0.18, h * 0.42, w * 0.36, h * 0.58, w * 0.54, h * 0.46);
  ctx.bezierCurveTo(w * 0.72, h * 0.34, w * 0.88, h * 0.52, w, h * 0.42);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Middle rolling range
  ctx.fillStyle = midHill;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.64);
  ctx.bezierCurveTo(w * 0.22, h * 0.54, w * 0.38, h * 0.71, w * 0.61, h * 0.58);
  ctx.bezierCurveTo(w * 0.79, h * 0.49, w * 0.91, h * 0.66, w, h * 0.58);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Subtle horizon line crease
  ctx.strokeStyle = hexWithAlpha(darkInk, 0.2);
  ctx.lineWidth = Math.max(1, h * 0.003);
  ctx.beginPath();
  ctx.moveTo(w * 0.04, h * 0.73);
  ctx.quadraticCurveTo(w * 0.5, h * 0.69, w * 0.96, h * 0.74);
  ctx.stroke();

  // Foreground slope
  ctx.fillStyle = foreRidge;
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(0, h * 0.78);
  ctx.bezierCurveTo(w * 0.24, h * 0.71, w * 0.46, h * 0.83, w * 0.68, h * 0.75);
  ctx.bezierCurveTo(w * 0.83, h * 0.7, w * 0.93, h * 0.77, w, h * 0.73);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  // Rhythmic foreground grove of slender stylized trees & reeds
  ctx.fillStyle = darkInk;
  ctx.strokeStyle = darkInk;
  ctx.lineCap = 'round';

  const trees = [
    { x: 0.11, y: 0.76, h: 0.17, r: 0.017 },
    { x: 0.15, y: 0.75, h: 0.22, r: 0.022 },
    { x: 0.185, y: 0.77, h: 0.14, r: 0.014 },
    { x: 0.48, y: 0.80, h: 0.16, r: 0.016 },
    { x: 0.52, y: 0.79, h: 0.19, r: 0.018 },
    { x: 0.79, y: 0.74, h: 0.23, r: 0.024 },
    { x: 0.835, y: 0.75, h: 0.18, r: 0.018 },
    { x: 0.87, y: 0.76, h: 0.14, r: 0.013 },
  ];

  for (const t of trees) {
    const tx = w * t.x;
    const baseY = h * t.y + h * 0.04;
    const topY = baseY - h * t.h;
    ctx.lineWidth = Math.max(1.5, w * 0.0025);
    ctx.beginPath();
    ctx.moveTo(tx, baseY + h * 0.08);
    ctx.lineTo(tx, topY + h * 0.04);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(
      tx,
      topY + h * t.h * 0.34,
      w * t.r,
      h * t.h * 0.42,
      0,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Ground anchor band
  ctx.fillStyle = darkInk;
  ctx.fillRect(0, h * 0.89, w, h * 0.11);

  ctx.restore();
}

function drawWavesPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  baseHex: string,
  designHex: string,
  motifScale: number,
) {
  const s = motifScale / 100;
  const rows = 9;
  const freq = Math.max(1, Math.round(3 / Math.max(0.5, s)));
  const tones = derivePrintTones(baseHex, designHex);
  const softTone = tones.soft;
  const midTone = tones.secondary;

  ctx.lineCap = 'round';
  for (let row = 0; row < rows; row += 1) {
    const baseY = ((row + 0.65) / rows) * h;
    const amp = h * (0.042 + (row % 3) * 0.016) * Math.min(1.4, Math.max(0.65, s));
    const phase = row * 0.85;
    const lineW =
      h * (row % 3 === 0 ? 0.032 : row % 2 === 0 ? 0.018 : 0.01) * Math.max(0.6, Math.min(1.5, s));

    ctx.strokeStyle = row % 3 === 0 ? tones.primary : row % 2 === 0 ? midTone : softTone;
    ctx.lineWidth = Math.max(2, lineW);
    ctx.beginPath();

    const steps = 96;
    for (let i = 0; i <= steps; i += 1) {
      const u = i / steps;
      const x = u * w;
      const y =
        baseY +
        Math.sin(u * Math.PI * 2 * freq + phase) * amp +
        Math.cos(u * Math.PI * 4 * freq - phase * 0.6) * (amp * 0.28);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function drawUploadedImage(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  bitmap: ImageBitmap | null,
  motifScale: number,
  tintHex?: string,
) {
  if (!bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;

  // Aspect-ratio-preserving centered 'cover' at 100%, scaled uniformly by motifScale/100
  const coverScale = Math.max(w / bitmap.width, h / bitmap.height) * (motifScale / 100);
  const drawW = bitmap.width * coverScale;
  const drawH = bitmap.height * coverScale;
  const dx = (w - drawW) * 0.5;
  const dy = (h - drawH) * 0.5;

  if (!tintHex || typeof document === 'undefined') {
    ctx.save();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bitmap, dx, dy, drawW, drawH);
    ctx.restore();
    return;
  }

  // Opt-in screen-print tinting preserves original transparency/alpha while mapping luminance to Print Color.
  const buffer = document.createElement('canvas');
  buffer.width = w;
  buffer.height = h;
  const bCtx = buffer.getContext('2d');
  if (!bCtx) return;

  bCtx.imageSmoothingEnabled = true;
  bCtx.imageSmoothingQuality = 'high';
  bCtx.drawImage(bitmap, dx, dy, drawW, drawH);

  const img = bCtx.getImageData(0, 0, w, h);
  const data = img.data;
  const { r: tr, g: tg, b: tb } = hexToRgb(tintHex);
  const { r: dr, g: dg, b: db } = hexToRgb(mixHex(tintHex, '#181113', 0.42));
  const { r: lr, g: lg, b: lb } = hexToRgb(mixHex(tintHex, '#FFFCF8', 0.45));

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
    if (lum < 0.5) {
      const k = lum * 2;
      data[i] = Math.round(dr + (tr - dr) * k);
      data[i + 1] = Math.round(dg + (tg - dg) * k);
      data[i + 2] = Math.round(db + (tb - db) * k);
    } else {
      const k = (lum - 0.5) * 2;
      data[i] = Math.round(tr + (lr - tr) * k);
      data[i + 1] = Math.round(tg + (lg - tg) * k);
      data[i + 2] = Math.round(tb + (lb - tb) * k);
    }
  }
  bCtx.putImageData(img, 0, 0);

  ctx.save();
  ctx.drawImage(buffer, 0, 0);
  ctx.restore();
}

/**
 * Renders only the printed artwork layer over transparency (separate from base felt).
 */
export function renderPrintArtworkLayer(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale' | 'tintUpload'>,
  uploadedBitmap: ImageBitmap | null = null,
): void {
  switch (design.print) {
    case 'bloom':
      drawBloomPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'stripes':
      drawStripesPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'landscape':
      drawLandscapeArtwork(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'waves':
      drawWavesPattern(ctx, w, h, design.baseHex, design.designHex, design.motifScale);
      break;
    case 'upload':
      if (uploadedBitmap) {
        drawUploadedImage(
          ctx,
          w,
          h,
          uploadedBitmap,
          design.motifScale,
          design.tintUpload ? design.designHex : undefined,
        );
      }
      break;
    case 'solid':
    default:
      break;
  }
}

/**
 * Renders any Fold 16 fabric design into a target 2D canvas.
 * Shared across Three.js CanvasTexture, Canvas 2D still fallback, room study, and swatch gallery.
 */
export function renderTextileToCanvas(
  canvas: HTMLCanvasElement,
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale' | 'tintUpload'>,
  uploadedBitmap: ImageBitmap | null = null,
): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;

  // 1. Solid base felt color
  ctx.fillStyle = design.baseHex;
  ctx.fillRect(0, 0, w, h);

  // 2. Selected artwork layer over base felt
  renderPrintArtworkLayer(ctx, w, h, design, uploadedBitmap);

  // 3. Subtle felt wool micro-grain overlay so print integrates into textured felt even near white/black
  const lum = relativeLuminance(design.baseHex);
  const grain = getGrainPattern(ctx);
  if (grain) {
    ctx.save();
    ctx.globalAlpha = design.print === 'upload' ? 0.55 : lum > 0.85 || lum < 0.08 ? 0.75 : 1;
    ctx.fillStyle = grain;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}
