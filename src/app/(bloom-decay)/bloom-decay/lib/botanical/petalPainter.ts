import { fbm2D, mulberry32, valueNoise2D } from './noise';
import type { FlowerPaletteId } from './types';

export interface PetalPalette {
  baseShadow: string;
  deepTone: string;
  midTone: string;
  lightTone: string;
  rimHighlight: string;
  veinColor: string;
  outlineColor: string;
  coreColor: string;
  stamenColor: string;
}

export const FLOWER_PALETTES: Record<FlowerPaletteId, PetalPalette> = {
  charcoalRose: {
    baseShadow: '#110F10',
    deepTone: '#1F1C1D',
    midTone: '#3B3736',
    lightTone: '#6C6661',
    rimHighlight: '#A79E95',
    veinColor: 'rgba(14, 12, 13, 0.5)',
    outlineColor: 'rgba(18, 16, 17, 0.44)',
    coreColor: '#110F10',
    stamenColor: '#887D72',
  },
  dustyPeony: {
    baseShadow: '#2F1119',
    deepTone: '#5C2634',
    midTone: '#965A64',
    lightTone: '#C89B9E',
    rimHighlight: '#EAD7D2',
    veinColor: 'rgba(64, 22, 33, 0.36)',
    outlineColor: 'rgba(54, 22, 30, 0.34)',
    coreColor: '#311414',
    stamenColor: '#BD945D',
  },
  burgundyRose: {
    baseShadow: '#16060B',
    deepTone: '#380E19',
    midTone: '#5F1D2C',
    lightTone: '#8B4250',
    rimHighlight: '#BD808A',
    veinColor: 'rgba(22, 5, 10, 0.52)',
    outlineColor: 'rgba(24, 8, 13, 0.45)',
    coreColor: '#16060B',
    stamenColor: '#753D48',
  },
  sepiaRose: {
    baseShadow: '#1F1213',
    deepTone: '#442828',
    midTone: '#73534C',
    lightTone: '#AA8E80',
    rimHighlight: '#DBC7B5',
    veinColor: 'rgba(34, 18, 18, 0.45)',
    outlineColor: 'rgba(34, 20, 19, 0.4)',
    coreColor: '#1F1112',
    stamenColor: '#987B68',
  },
  cuppedDustyRose: {
    baseShadow: '#30151C',
    deepTone: '#62313B',
    midTone: '#945E66',
    lightTone: '#C29796',
    rimHighlight: '#E2CBC3',
    veinColor: 'rgba(52, 22, 29, 0.38)',
    outlineColor: 'rgba(42, 20, 24, 0.38)',
    coreColor: '#2B1118',
    stamenColor: '#9A7868',
  },
  obsidianRose: {
    baseShadow: '#0A090A',
    deepTone: '#171516',
    midTone: '#282526',
    lightTone: '#464242',
    rimHighlight: '#76716D',
    veinColor: 'rgba(8, 7, 8, 0.62)',
    outlineColor: 'rgba(12, 10, 11, 0.56)',
    coreColor: '#0A090A',
    stamenColor: '#524D4B',
  },
  wildBurgundy: {
    baseShadow: '#230D13',
    deepTone: '#4C1E28',
    midTone: '#72313F',
    lightTone: '#9E5C67',
    rimHighlight: '#C28D92',
    veinColor: 'rgba(30, 10, 16, 0.5)',
    outlineColor: 'rgba(28, 12, 17, 0.65)',
    coreColor: '#1F1013',
    stamenColor: '#8B6256',
  },
  driedAnemone: {
    baseShadow: '#240E14',
    deepTone: '#4C1D27',
    midTone: '#6E2D3A',
    lightTone: '#93525E',
    rimHighlight: '#BD898E',
    veinColor: 'rgba(26, 10, 14, 0.52)',
    outlineColor: 'rgba(24, 11, 15, 0.68)',
    coreColor: '#1A0C10',
    stamenColor: '#6D4B4B',
  },
  darkSilhouetteFlower: {
    baseShadow: '#121011',
    deepTone: '#221F20',
    midTone: '#363233',
    lightTone: '#534F4E',
    rimHighlight: '#77716D',
    veinColor: 'rgba(15, 13, 14, 0.58)',
    outlineColor: 'rgba(16, 14, 15, 0.78)',
    coreColor: '#100E0F',
    stamenColor: '#5A5552',
  },
  sepiaTinyBlossom: {
    baseShadow: '#2E1E1B',
    deepTone: '#583F39',
    midTone: '#876B61',
    lightTone: '#B59B8C',
    rimHighlight: '#D8C5B4',
    veinColor: 'rgba(42, 28, 24, 0.45)',
    outlineColor: 'rgba(38, 25, 22, 0.58)',
    coreColor: '#2B1B18',
    stamenColor: '#9E7F65',
  },
};

export interface BakedPetalSet {
  outer: HTMLCanvasElement[];
  mid: HTMLCanvasElement[];
  inner: HTMLCanvasElement[];
  sepal: HTMLCanvasElement;
}

export interface BakedPaperAssets {
  baseCanvas: HTMLCanvasElement;
  agingCanvas: HTMLCanvasElement;
  agingThresholdMap: Float32Array;
  mapWidth: number;
  mapHeight: number;
}

/**
 * Traces an organic, asymmetric, notched/ruffled botanical petal path
 * with anchor at (0, 0) and tip extending toward (0, -height).
 */
function traceRuffledPetal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  ruffleDepth: number,
  notchCount: number,
  seed: number,
  cupFactor: number
): void {
  const rng = mulberry32(seed);
  const halfW = width * 0.5;
  const skew = (rng() - 0.5) * width * 0.14;

  ctx.beginPath();
  ctx.moveTo(0, 0);

  // Left ascending curve from narrow claw to wide upper belly
  ctx.bezierCurveTo(
    -halfW * (0.28 + cupFactor * 0.15),
    -height * 0.22,
    -halfW * (1.06 + rng() * 0.12) + skew * 0.4,
    -height * 0.58,
    -halfW * (0.82 + rng() * 0.12) + skew,
    -height * (0.84 + rng() * 0.06)
  );

  // Irregular ruffled/notched upper petal lip
  const steps = Math.max(4, notchCount * 2);
  const startX = -halfW * 0.82 + skew;
  const endX = halfW * 0.82 + skew;

  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const prevT = (i - 1) / steps;
    const midT = (prevT + t) * 0.5;

    const arch = Math.sin(t * Math.PI);
    const midArch = Math.sin(midT * Math.PI);

    const wave =
      (i % 2 === 0 ? -1 : 1) * ruffleDepth * (0.55 + rng() * 0.65) * (0.4 + arch * 0.7);
    const cx = startX + (endX - startX) * midT + (rng() - 0.5) * width * 0.05;
    const cy = -height * (0.86 + midArch * 0.16) + wave * 1.15;

    const x = startX + (endX - startX) * t;
    const y = -height * (0.84 + arch * 0.14) + (rng() - 0.5) * ruffleDepth * 0.7;

    ctx.quadraticCurveTo(cx, cy, x, y);
  }

  // Right descending curve back to base claw
  ctx.bezierCurveTo(
    halfW * (1.04 + rng() * 0.12) + skew * 0.4,
    -height * 0.56,
    halfW * (0.3 + cupFactor * 0.14),
    -height * 0.22,
    0,
    0
  );
  ctx.closePath();
}

/**
 * Bakes a single high-detail tactile vintage-printed botanical petal sprite.
 * Origin of the petal claw is positioned at (canvas.width * 0.5, canvas.height * 0.90).
 */
function bakeSinglePetal(
  palette: PetalPalette,
  tier: 'outer' | 'mid' | 'inner',
  variantIndex: number,
  seed: number
): HTMLCanvasElement {
  const cw = 156;
  const ch = 176;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const rng = mulberry32(seed + variantIndex * 317);
  const ox = cw * 0.5;
  const oy = ch * 0.9;

  const petalWidth =
    tier === 'outer'
      ? 104 + rng() * 18
      : tier === 'mid'
        ? 88 + rng() * 16
        : 66 + rng() * 14;
  const petalHeight =
    tier === 'outer'
      ? 136 + rng() * 14
      : tier === 'mid'
        ? 116 + rng() * 14
        : 92 + rng() * 12;
  const ruffleDepth =
    tier === 'outer' ? 11 + rng() * 6 : tier === 'mid' ? 9 + rng() * 5 : 6 + rng() * 4;
  const notchCount = tier === 'outer' ? 4 : tier === 'mid' ? 3 : 2;
  const cupFactor = tier === 'inner' ? 0.5 : tier === 'mid' ? 0.3 : 0.15;

  ctx.save();
  ctx.translate(ox, oy);

  // Subtle shadow drop underneath petal for collage depth
  ctx.save();
  ctx.shadowColor = 'rgba(20, 15, 16, 0.34)';
  ctx.shadowBlur = 7;
  ctx.shadowOffsetX = 1.5;
  ctx.shadowOffsetY = 2.5;
  traceRuffledPetal(ctx, petalWidth, petalHeight, ruffleDepth, notchCount, seed + variantIndex * 41, cupFactor);
  ctx.fillStyle = palette.deepTone;
  ctx.fill();
  ctx.restore();

  // Clip all intricate internal printmaking shading & veins inside petal silhouette
  traceRuffledPetal(ctx, petalWidth, petalHeight, ruffleDepth, notchCount, seed + variantIndex * 41, cupFactor);
  ctx.save();
  ctx.clip();

  // 1. Base sculptural gradient from deep shadowed claw to midtone body to curled rim highlight
  const grad = ctx.createLinearGradient(0, 0, (rng() - 0.5) * 28, -petalHeight);
  grad.addColorStop(0.0, palette.baseShadow);
  grad.addColorStop(0.24, palette.deepTone);
  grad.addColorStop(0.62, palette.midTone);
  grad.addColorStop(0.86, palette.lightTone);
  grad.addColorStop(1.0, palette.rimHighlight);
  ctx.fillStyle = grad;
  ctx.fillRect(-cw * 0.5, -ch, cw, ch + 16);

  // 2. Asymmetric lateral fold shading (gives realistic ruffled petal crease volume)
  const foldSide = variantIndex % 2 === 0 ? -1 : 1;
  const foldGrad = ctx.createRadialGradient(
    foldSide * petalWidth * 0.28,
    -petalHeight * 0.52,
    4,
    foldSide * petalWidth * 0.22,
    -petalHeight * 0.52,
    petalWidth * 0.65
  );
  foldGrad.addColorStop(0, 'rgba(16, 10, 12, 0.42)');
  foldGrad.addColorStop(0.65, 'rgba(16, 10, 12, 0.12)');
  foldGrad.addColorStop(1, 'rgba(16, 10, 12, 0)');
  ctx.fillStyle = foldGrad;
  ctx.fillRect(-cw * 0.5, -ch, cw, ch + 16);

  // Opposite curled highlight ridge
  const lightGrad = ctx.createRadialGradient(
    -foldSide * petalWidth * 0.24,
    -petalHeight * 0.78,
    2,
    -foldSide * petalWidth * 0.24,
    -petalHeight * 0.76,
    petalWidth * 0.52
  );
  lightGrad.addColorStop(0, palette.rimHighlight);
  lightGrad.addColorStop(1, 'rgba(233, 225, 211, 0)');
  ctx.globalAlpha = 0.34;
  ctx.fillStyle = lightGrad;
  ctx.fillRect(-cw * 0.5, -ch, cw, ch + 16);
  ctx.globalAlpha = 1;

  // 3. Delicate botanical engraving veins radiating from claw
  const veinCount = 11 + Math.floor(rng() * 5);
  ctx.strokeStyle = palette.veinColor;
  ctx.lineCap = 'round';
  for (let v = 0; v < veinCount; v++) {
    const u = (v / (veinCount - 1)) * 2 - 1; // -1..1
    const targetX = u * petalWidth * 0.47;
    const targetY = -petalHeight * (0.76 + (1 - Math.abs(u)) * 0.22);
    const ctrlX = u * petalWidth * 0.28 + (rng() - 0.5) * 6;
    const ctrlY = -petalHeight * 0.42;
    ctx.lineWidth = 0.55 + (1 - Math.abs(u)) * 0.55;
    ctx.beginPath();
    ctx.moveTo(u * 4, -2);
    ctx.quadraticCurveTo(ctrlX, ctrlY, targetX, targetY);
    ctx.stroke();
  }

  // 4. Fine copperplate crosshatch strokes in the basal shadow zone
  ctx.strokeStyle = palette.outlineColor;
  ctx.globalAlpha = 0.36;
  ctx.lineWidth = 0.65;
  for (let h = 0; h < 14; h++) {
    const y0 = -6 - h * (petalHeight * 0.036);
    const span = petalWidth * (0.24 + (h / 14) * 0.32);
    ctx.beginPath();
    ctx.moveTo(-span, y0 + 5);
    ctx.quadraticCurveTo(0, y0 - 4, span, y0 + 5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // 5. Matte distressed printmaking stipple grain (eliminates any smooth digital plastic sheen)
  const grainDots = 115;
  for (let g = 0; g < grainDots; g++) {
    const gx = (rng() - 0.5) * petalWidth * 1.1;
    const gy = -rng() * petalHeight * 1.02;
    const r = 0.55 + rng() * 1.4;
    ctx.fillStyle =
      rng() > 0.45 ? 'rgba(20, 16, 17, 0.22)' : 'rgba(235, 226, 212, 0.16)';
    ctx.beginPath();
    ctx.arc(gx, gy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Curled top rim inner highlight lip
  ctx.strokeStyle = palette.rimHighlight;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(-petalWidth * 0.38, -petalHeight * 0.88);
  ctx.quadraticCurveTo(0, -petalHeight * 0.99, petalWidth * 0.38, -petalHeight * 0.87);
  ctx.stroke();
  ctx.globalAlpha = 1;

  ctx.restore(); // end clip

  // 6. Restrained fine distressed print edge contour (subtle, never heavy cartoon outline)
  traceRuffledPetal(ctx, petalWidth, petalHeight, ruffleDepth, notchCount, seed + variantIndex * 41, cupFactor);
  ctx.strokeStyle = palette.outlineColor;
  ctx.lineWidth = 0.75;
  ctx.stroke();

  ctx.restore();
  return canvas;
}

/**
 * Bakes a pointed botanical sepal / calyx leaf sprite.
 */
function bakeSepal(seed: number): HTMLCanvasElement {
  const cw = 64;
  const ch = 110;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const rng = mulberry32(seed);
  ctx.save();
  ctx.translate(cw * 0.5, ch * 0.9);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-18, -24, -14, -58, (rng() - 0.5) * 6, -92);
  ctx.bezierCurveTo(14, -56, 18, -24, 0, 0);
  ctx.closePath();

  const grad = ctx.createLinearGradient(0, 0, 0, -92);
  grad.addColorStop(0, '#191716');
  grad.addColorStop(0.55, '#2F332B');
  grad.addColorStop(1, '#585F50');
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.strokeStyle = '#141213';
  ctx.lineWidth = 1.1;
  ctx.stroke();

  // Central rib
  ctx.beginPath();
  ctx.moveTo(0, -3);
  ctx.lineTo(0, -82);
  ctx.strokeStyle = 'rgba(20, 18, 17, 0.55)';
  ctx.lineWidth = 0.9;
  ctx.stroke();

  ctx.restore();
  return canvas;
}

/**
 * Builds and caches all pre-painted high-detail botanical petal sprites for all palettes.
 */
export function buildPetalLibrary(): Record<FlowerPaletteId, BakedPetalSet> {
  const library = {} as Record<FlowerPaletteId, BakedPetalSet>;
  const paletteIds = Object.keys(FLOWER_PALETTES) as FlowerPaletteId[];

  paletteIds.forEach((id, idx) => {
    const pal = FLOWER_PALETTES[id];
    const baseSeed = 4000 + idx * 997;
    library[id] = {
      outer: [0, 1, 2, 3].map((v) => bakeSinglePetal(pal, 'outer', v, baseSeed + 10)),
      mid: [0, 1, 2, 3].map((v) => bakeSinglePetal(pal, 'mid', v, baseSeed + 110)),
      inner: [0, 1, 2].map((v) => bakeSinglePetal(pal, 'inner', v, baseSeed + 210)),
      sepal: bakeSepal(baseSeed + 310),
    };
  });

  return library;
}

/**
 * Generates the cached procedural aged ivory parchment paper canvas AND
 * the Phase 01 organic aging overlay (tea-stains, archival smudges, creases, foxing spots).
 */
export function buildPaperAssets(width = 960, height = 540): BakedPaperAssets {
  const baseCanvas = document.createElement('canvas');
  baseCanvas.width = width;
  baseCanvas.height = height;
  const bCtx = baseCanvas.getContext('2d');

  const agingCanvas = document.createElement('canvas');
  agingCanvas.width = width;
  agingCanvas.height = height;
  const aCtx = agingCanvas.getContext('2d');

  const mapWidth = 160;
  const mapHeight = 90;
  const agingThresholdMap = new Float32Array(mapWidth * mapHeight);

  // Build coherent expansion threshold field for Phase 01 (edges & archival patches age organically)
  for (let y = 0; y < mapHeight; y++) {
    const ny = y / (mapHeight - 1);
    for (let x = 0; x < mapWidth; x++) {
      const nx = x / (mapWidth - 1);
      const edgeDist = Math.min(nx, 1 - nx, ny, 1 - ny);
      const n = fbm2D(nx * 5.2, ny * 5.2, 177, 4);
      // Lower value appears earlier during Phase 01
      agingThresholdMap[y * mapWidth + x] = Math.min(
        1,
        Math.max(0, edgeDist * 0.72 + n * 0.78 - 0.08)
      );
    }
  }

  if (bCtx) {
    // 1. Base warm aged ivory substrate (#E9E1D3) with gentle parchment mottling
    const imgData = bCtx.createImageData(width, height);
    const data = imgData.data;
    const baseR = 236;
    const baseG = 228;
    const baseB = 214;

    for (let y = 0; y < height; y++) {
      const ny = y / height;
      for (let x = 0; x < width; x++) {
        const nx = x / width;
        const mottle = fbm2D(nx * 4.5, ny * 4.5, 42, 3);
        const fineGrain = valueNoise2D(x * 0.45, y * 0.45, 99);
        const delta = (mottle - 0.5) * 14 + (fineGrain - 0.5) * 7;

        const idx = (y * width + x) * 4;
        data[idx] = Math.min(255, Math.max(0, baseR + delta));
        data[idx + 1] = Math.min(255, Math.max(0, baseG + delta * 0.94));
        data[idx + 2] = Math.min(255, Math.max(0, baseB + delta * 0.85));
        data[idx + 3] = 255;
      }
    }
    bCtx.putImageData(imgData, 0, 0);

    // Subtle cellulose paper fibers
    const rng = mulberry32(8881);
    bCtx.lineWidth = 0.65;
    for (let i = 0; i < 650; i++) {
      const fx = rng() * width;
      const fy = rng() * height;
      const len = 5 + rng() * 16;
      const ang = rng() * Math.PI * 2;
      bCtx.strokeStyle =
        rng() > 0.5 ? 'rgba(182, 168, 146, 0.14)' : 'rgba(255, 250, 240, 0.22)';
      bCtx.beginPath();
      bCtx.moveTo(fx, fy);
      bCtx.quadraticCurveTo(
        fx + Math.cos(ang + 0.3) * len * 0.5,
        fy + Math.sin(ang + 0.3) * len * 0.5,
        fx + Math.cos(ang) * len,
        fy + Math.sin(ang) * len
      );
      bCtx.stroke();
    }
  }

  if (aCtx) {
    const rng = mulberry32(5521);

    // 2. Warm parchment edge discoloration (#D7CCBB / tea-stained margins matching reference left & right edges)
    const leftStain = aCtx.createRadialGradient(
      width * 0.04,
      height * 0.12,
      10,
      width * 0.06,
      height * 0.28,
      width * 0.24
    );
    leftStain.addColorStop(0, 'rgba(179, 158, 130, 0.36)');
    leftStain.addColorStop(0.55, 'rgba(196, 178, 152, 0.16)');
    leftStain.addColorStop(1, 'rgba(196, 178, 152, 0)');
    aCtx.fillStyle = leftStain;
    aCtx.fillRect(0, 0, width, height);

    const topStain = aCtx.createRadialGradient(
      width * 0.25,
      height * 0.02,
      10,
      width * 0.25,
      height * 0.05,
      width * 0.18
    );
    topStain.addColorStop(0, 'rgba(176, 153, 124, 0.28)');
    topStain.addColorStop(1, 'rgba(176, 153, 124, 0)');
    aCtx.fillStyle = topStain;
    aCtx.fillRect(0, 0, width, height);

    const rightEdgeStain = aCtx.createRadialGradient(
      width * 0.99,
      height * 0.45,
      10,
      width * 0.95,
      height * 0.5,
      width * 0.24
    );
    rightEdgeStain.addColorStop(0, 'rgba(172, 148, 122, 0.34)');
    rightEdgeStain.addColorStop(0.6, 'rgba(188, 169, 143, 0.14)');
    rightEdgeStain.addColorStop(1, 'rgba(188, 169, 143, 0)');
    aCtx.fillStyle = rightEdgeStain;
    aCtx.fillRect(0, 0, width, height);

    // Subtle vertical archival paper folds/creases (around x=21% and x=42%, matching reference)
    const creases = [width * 0.215, width * 0.425];
    for (const cx of creases) {
      aCtx.strokeStyle = 'rgba(148, 132, 112, 0.20)';
      aCtx.lineWidth = 1.2;
      aCtx.beginPath();
      aCtx.moveTo(cx, 0);
      for (let y = 0; y <= height; y += 24) {
        const wobble = (valueNoise2D(cx * 0.05, y * 0.04, 333) - 0.5) * 4;
        aCtx.lineTo(cx + wobble, y);
      }
      aCtx.stroke();

      aCtx.strokeStyle = 'rgba(255, 250, 242, 0.28)';
      aCtx.lineWidth = 1.0;
      aCtx.beginPath();
      aCtx.moveTo(cx + 1.5, 0);
      for (let y = 0; y <= height; y += 24) {
        const wobble = (valueNoise2D(cx * 0.05, y * 0.04, 333) - 0.5) * 4;
        aCtx.lineTo(cx + 1.5 + wobble, y);
      }
      aCtx.stroke();
    }

    // Delicate surface scratches & archival hairlines on the left parchment field
    for (let s = 0; s < 26; s++) {
      const sx = rng() * width;
      const sy = rng() * height;
      const len = 18 + rng() * 68;
      const ang = (rng() - 0.5) * Math.PI;
      aCtx.strokeStyle =
        rng() > 0.4 ? 'rgba(122, 108, 94, 0.14)' : 'rgba(72, 66, 62, 0.10)';
      aCtx.lineWidth = 0.5 + rng() * 0.6;
      aCtx.beginPath();
      aCtx.moveTo(sx, sy);
      aCtx.quadraticCurveTo(
        sx + Math.cos(ang + 0.18) * len * 0.5,
        sy + Math.sin(ang + 0.18) * len * 0.5,
        sx + Math.cos(ang) * len,
        sy + Math.sin(ang) * len
      );
      aCtx.stroke();
    }

    // Subtle vintage foxing & tiny dried sepia/charcoal specks scattered sparingly
    for (let f = 0; f < 135; f++) {
      const fx = rng() * width;
      const fy = rng() * height;
      const r = 0.6 + Math.pow(rng(), 3) * 3.8;
      const isDarkSpec = rng() > 0.72;
      aCtx.fillStyle = isDarkSpec
        ? `rgba(48, 42, 40, ${0.14 + rng() * 0.28})`
        : `rgba(158, 130, 96, ${0.12 + rng() * 0.22})`;
      aCtx.beginPath();
      aCtx.ellipse(fx, fy, r, r * (0.7 + rng() * 0.5), rng() * Math.PI, 0, Math.PI * 2);
      aCtx.fill();
    }

    // Subtle soft warm vignette along outer paper boundary
    const vig = aCtx.createRadialGradient(
      width * 0.5,
      height * 0.5,
      width * 0.34,
      width * 0.5,
      height * 0.5,
      width * 0.64
    );
    vig.addColorStop(0, 'rgba(168, 150, 126, 0)');
    vig.addColorStop(1, 'rgba(154, 134, 110, 0.24)');
    aCtx.fillStyle = vig;
    aCtx.fillRect(0, 0, width, height);
  }

  return {
    baseCanvas,
    agingCanvas,
    agingThresholdMap,
    mapWidth,
    mapHeight,
  };
}
