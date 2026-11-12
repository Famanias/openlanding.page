import * as THREE from 'three';
import type { ProduceId } from './basketState';

export interface AlphaMaskTexture {
  texture: THREE.CanvasTexture;
  alphaGrid: Uint8Array;
  gridSize: number;
}

const INK = '#231B15';

function extractAlphaGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  gridSize = 64
): Uint8Array {
  const img = ctx.getImageData(0, 0, width, height).data;
  const grid = new Uint8Array(gridSize * gridSize);
  for (let gy = 0; gy < gridSize; gy++) {
    const py = Math.min(height - 1, Math.floor(((gy + 0.5) / gridSize) * height));
    for (let gx = 0; gx < gridSize; gx++) {
      const px = Math.min(width - 1, Math.floor(((gx + 0.5) / gridSize) * width));
      // Flip Y so UV.y (0 bottom -> 1 top) maps directly
      const flippedY = height - 1 - py;
      const idx = (flippedY * width + px) * 4 + 3;
      grid[gy * gridSize + gx] = img[idx];
    }
  }
  return grid;
}

export function sampleAlphaMask(
  mask: AlphaMaskTexture | undefined,
  uv: THREE.Vector2 | undefined
): number {
  if (!mask || !uv) return 255;
  const gx = Math.max(
    0,
    Math.min(mask.gridSize - 1, Math.floor(uv.x * mask.gridSize))
  );
  const gy = Math.max(
    0,
    Math.min(mask.gridSize - 1, Math.floor(uv.y * mask.gridSize))
  );
  return mask.alphaGrid[gy * mask.gridSize + gx];
}

function finalizeTexture(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  maxAnisotropy: number
): AlphaMaskTexture {
  const alphaGrid = extractAlphaGrid(ctx, canvas.width, canvas.height, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return { texture, alphaGrid, gridSize: 64 };
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  return [canvas, ctx];
}

function setInk(ctx: CanvasRenderingContext2D, width = 6.5) {
  ctx.strokeStyle = INK;
  ctx.lineWidth = width;
}

export type WoodTone =
  | 'honey-left'
  | 'amber-right'
  | 'tan-inner'
  | 'espresso-dark'
  | 'post-ochre';

export function createWoodPlankTexture(
  tone: WoodTone,
  maxAnisotropy: number,
  withNails = true
): THREE.CanvasTexture {
  const [canvas, ctx] = makeCanvas(1024, 256);

  const palettes: Record<
    WoodTone,
    { base: string; mid: string; grain: string; hi: string }
  > = {
    'honey-left': {
      base: '#CA9660',
      mid: '#BC844D',
      grain: '#7E5028',
      hi: '#DDB07E',
    },
    'amber-right': {
      base: '#B8804B',
      mid: '#A66D3B',
      grain: '#6B411F',
      hi: '#CB9661',
    },
    'tan-inner': {
      base: '#C6925D',
      mid: '#B57F4B',
      grain: '#784C27',
      hi: '#D8A978',
    },
    'espresso-dark': {
      base: '#2D221B',
      mid: '#241B15',
      grain: '#16100C',
      hi: '#3B2D24',
    },
    'post-ochre': {
      base: '#BA834E',
      mid: '#A56F3C',
      grain: '#6E4421',
      hi: '#CE9B67',
    },
  };

  const p = palettes[tone];
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, p.hi);
  grad.addColorStop(0.22, p.base);
  grad.addColorStop(0.82, p.mid);
  grad.addColorStop(1, p.grain);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 256);

  // Subtle hand-drawn woodgrain streaks
  ctx.strokeStyle = p.grain;
  ctx.globalAlpha = tone === 'espresso-dark' ? 0.45 : 0.34;
  for (let i = 0; i < 14; i++) {
    const y0 = 18 + i * 17 + Math.sin(i * 2.1) * 5;
    ctx.lineWidth = i % 3 === 0 ? 3.2 : 1.9;
    ctx.beginPath();
    ctx.moveTo(0, y0);
    for (let x = 64; x <= 1024; x += 64) {
      const wave =
        Math.sin(x * 0.009 + i * 1.4) * 6 +
        (x > 580 && x < 740 ? Math.sin(((x - 580) / 160) * Math.PI) * (i % 2 ? 12 : -10) : 0);
      ctx.lineTo(x, y0 + wave);
    }
    ctx.stroke();
  }

  // Wood knot accent
  if (tone !== 'espresso-dark') {
    ctx.globalAlpha = 0.32;
    ctx.beginPath();
    ctx.ellipse(665, 134, 42, 16, 0.08, 0, Math.PI * 2);
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  ctx.globalAlpha = 1;

  // Hand-inked plank border
  ctx.strokeStyle = INK;
  ctx.lineWidth = 9;
  ctx.strokeRect(4, 4, 1016, 248);

  // Nail dots at both ends
  if (withNails && tone !== 'espresso-dark') {
    ctx.fillStyle = INK;
    for (const nx of [34, 990]) {
      for (const ny of [68, 188]) {
        ctx.beginPath();
        ctx.arc(nx, ny, 7.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

function drawSingleTomato(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  heirloom = false
) {
  ctx.save();
  ctx.translate(cx, cy);

  const grad = ctx.createRadialGradient(-rx * 0.28, -ry * 0.28, rx * 0.1, 0, 0, rx * 1.05);
  if (heirloom) {
    grad.addColorStop(0, '#F0834A');
    grad.addColorStop(0.45, '#D94929');
    grad.addColorStop(0.82, '#A84824');
    grad.addColorStop(1, '#7F6A30');
  } else {
    grad.addColorStop(0, '#F47E4D');
    grad.addColorStop(0.38, '#DF4629');
    grad.addColorStop(0.85, '#C1321C');
    grad.addColorStop(1, '#9E2514');
  }

  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  setInk(ctx, 6.5);
  ctx.stroke();

  if (heirloom) {
    // Olive-green shoulder ribs
    ctx.fillStyle = 'rgba(132, 142, 58, 0.55)';
    ctx.beginPath();
    ctx.ellipse(0, -ry * 0.42, rx * 0.72, ry * 0.42, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    setInk(ctx, 3.5);
    for (const ang of [-0.65, -0.22, 0.22, 0.65]) {
      ctx.beginPath();
      ctx.moveTo(Math.sin(ang) * rx * 0.18, -ry * 0.55);
      ctx.quadraticCurveTo(
        Math.sin(ang) * rx * 0.75,
        -ry * 0.05,
        Math.sin(ang) * rx * 0.58,
        ry * 0.62
      );
      ctx.stroke();
    }
  }

  // Gouache crescent highlight
  ctx.fillStyle = 'rgba(255, 226, 190, 0.52)';
  ctx.beginPath();
  ctx.ellipse(-rx * 0.36, -ry * 0.22, rx * 0.2, ry * 0.32, 0.42, 0, Math.PI * 2);
  ctx.fill();

  // Star calyx
  ctx.fillStyle = '#5D7E3B';
  setInk(ctx, 4.5);
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    const tipX = Math.cos(a) * rx * 0.46;
    const tipY = -ry * 0.44 + Math.sin(a) * ry * 0.28;
    const midA = a + Math.PI / 6;
    const inX = Math.cos(midA) * rx * 0.14;
    const inY = -ry * 0.44 + Math.sin(midA) * ry * 0.09;
    if (i === 0) ctx.moveTo(tipX, tipY);
    else ctx.lineTo(tipX, tipY);
    ctx.lineTo(inX, inY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

export interface ProduceTextureSet {
  sourceMain: AlphaMaskTexture;
  sourceAccent?: AlphaMaskTexture;
  crateMain: AlphaMaskTexture;
  crateAccent?: AlphaMaskTexture;
  altSourceMain?: AlphaMaskTexture;
}

export function buildAllProduceTextures(
  maxAnisotropy: number
): Record<ProduceId, ProduceTextureSet> {
  // 1. VINE TOMATOES
  const [vtCanvas, vtCtx] = makeCanvas(512, 512);
  drawSingleTomato(vtCtx, 295, 152, 78, 72, false);
  drawSingleTomato(vtCtx, 168, 206, 80, 74, false);
  drawSingleTomato(vtCtx, 372, 266, 82, 76, false);
  drawSingleTomato(vtCtx, 146, 336, 84, 78, false);
  drawSingleTomato(vtCtx, 272, 344, 84, 78, false);

  // Separate vine stem layer for 2.5D depth
  const [vtStemC, vtStemCtx] = makeCanvas(512, 512);
  vtStemCtx.strokeStyle = INK;
  vtStemCtx.lineWidth = 17;
  vtStemCtx.beginPath();
  vtStemCtx.moveTo(395, 118);
  vtStemCtx.quadraticCurveTo(270, 195, 156, 280);
  vtStemCtx.stroke();
  vtStemCtx.strokeStyle = '#6B8D45';
  vtStemCtx.lineWidth = 9.5;
  vtStemCtx.stroke();

  // Crate heirloom + vine tomato duo
  const [vtCrateC, vtCrateCtx] = makeCanvas(512, 512);
  drawSingleTomato(vtCrateCtx, 175, 286, 98, 88, false);
  drawSingleTomato(vtCrateCtx, 326, 256, 116, 102, true);

  // 2. CARROTS BUNCH
  const drawCarrotsRoots = (ctx: CanvasRenderingContext2D) => {
    const carrots = [
      { x0: 274, y0: 215, x1: 58, y1: 374, w: 34, col: '#EC7F35' },
      { x0: 302, y0: 238, x1: 72, y1: 422, w: 36, col: '#E36D28' },
      { x0: 325, y0: 262, x1: 122, y1: 468, w: 35, col: '#EE883C' },
    ];
    for (const c of carrots) {
      const ang = Math.atan2(c.y1 - c.y0, c.x1 - c.x0);
      const perp = ang + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(c.x0 + Math.cos(perp) * c.w, c.y0 + Math.sin(perp) * c.w);
      ctx.quadraticCurveTo(
        (c.x0 + c.x1) * 0.52 + Math.cos(perp) * (c.w * 0.62),
        (c.y0 + c.y1) * 0.52 + Math.sin(perp) * (c.w * 0.62),
        c.x1,
        c.y1
      );
      ctx.quadraticCurveTo(
        (c.x0 + c.x1) * 0.52 - Math.cos(perp) * (c.w * 0.62),
        (c.y0 + c.y1) * 0.52 - Math.sin(perp) * (c.w * 0.62),
        c.x0 - Math.cos(perp) * c.w,
        c.y0 - Math.sin(perp) * c.w
      );
      ctx.closePath();
      const g = ctx.createLinearGradient(
        c.x0 - 25,
        c.y0 - 25,
        c.x0 + 25,
        c.y0 + 25
      );
      g.addColorStop(0, '#F7A457');
      g.addColorStop(0.55, c.col);
      g.addColorStop(1, '#BE4F19');
      ctx.fillStyle = g;
      ctx.fill();
      setInk(ctx, 6.2);
      ctx.stroke();

      // Root crease hash lines
      setInk(ctx, 3.6);
      for (const f of [0.24, 0.44, 0.64, 0.8]) {
        const mx = c.x0 + (c.x1 - c.x0) * f;
        const my = c.y0 + (c.y1 - c.y0) * f;
        const span = c.w * (1 - f) * 0.58;
        ctx.beginPath();
        ctx.moveTo(mx - Math.cos(perp) * span, my - Math.sin(perp) * span);
        ctx.lineTo(mx + Math.cos(perp) * span * 0.4, my + Math.sin(perp) * span * 0.4);
        ctx.stroke();
      }
    }
  };

  const drawCarrotGreens = (ctx: CanvasRenderingContext2D) => {
    const fronds = [
      { tx: 356, ty: 68, col: '#5B7B3A', r: 52 },
      { tx: 422, ty: 98, col: '#6E8E46', r: 56 },
      { tx: 462, ty: 158, col: '#587838', r: 54 },
      { tx: 454, ty: 226, col: '#75954C', r: 50 },
      { tx: 394, ty: 152, col: '#7D9D53', r: 58 },
    ];
    for (const f of fronds) {
      // Scalloped parsley puff
      ctx.fillStyle = f.col;
      setInk(ctx, 5.8);
      ctx.beginPath();
      const lobes = 9;
      for (let i = 0; i < lobes; i++) {
        const a0 = (i / lobes) * Math.PI * 2;
        const a1 = ((i + 0.5) / lobes) * Math.PI * 2;
        const a2 = ((i + 1) / lobes) * Math.PI * 2;
        const rIn = f.r * 0.65;
        const rOut = f.r * 1.05;
        if (i === 0) {
          ctx.moveTo(f.tx + Math.cos(a0) * rIn, f.ty + Math.sin(a0) * rIn);
        }
        ctx.quadraticCurveTo(
          f.tx + Math.cos(a1) * rOut,
          f.ty + Math.sin(a1) * rOut,
          f.tx + Math.cos(a2) * rIn,
          f.ty + Math.sin(a2) * rIn
        );
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Stem connecting to carrot crown
      setInk(ctx, 5.2);
      ctx.beginPath();
      ctx.moveTo(298, 240);
      ctx.quadraticCurveTo(335, 190, f.tx, f.ty);
      ctx.stroke();
    }
  };

  const [carMainC, carMainCtx] = makeCanvas(512, 512);
  drawCarrotsRoots(carMainCtx);
  drawCarrotGreens(carMainCtx);

  const [carTopC, carTopCtx] = makeCanvas(512, 512);
  drawCarrotGreens(carTopCtx);

  // 3. LEMONS (Standard + Alt with twin leaves)
  const drawLemon = (ctx: CanvasRenderingContext2D, twinLeaves: boolean) => {
    ctx.save();
    ctx.translate(242, 266);
    ctx.rotate(twinLeaves ? -0.35 : -0.18);

    // Leaf / Leaves
    const drawLeaf = (lx: number, ly: number, rot: number) => {
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(rot);
      ctx.fillStyle = '#668742';
      setInk(ctx, 6);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(48, -36, 98, 4);
      ctx.quadraticCurveTo(46, 38, 0, 0);
      ctx.fill();
      ctx.stroke();
      setInk(ctx, 3.8);
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(84, 3);
      ctx.stroke();
      ctx.restore();
    };

    if (twinLeaves) {
      drawLeaf(98, -38, 0.35);
      drawLeaf(82, -62, -0.25);
    } else {
      drawLeaf(-132, -48, -2.5);
    }

    // Lemon body with pointed tips
    const g = ctx.createRadialGradient(-36, -38, 16, 0, 0, 152);
    g.addColorStop(0, '#FCF097');
    g.addColorStop(0.45, '#F4CB3D');
    g.addColorStop(0.88, '#DFA91E');
    g.addColorStop(1, '#BF8A12');

    ctx.fillStyle = g;
    setInk(ctx, 7);
    ctx.beginPath();
    ctx.moveTo(-142, 0);
    ctx.bezierCurveTo(-118, -28, -78, -96, 0, -96);
    ctx.bezierCurveTo(78, -96, 118, -28, 144, 0);
    ctx.bezierCurveTo(118, 28, 78, 96, 0, 96);
    ctx.bezierCurveTo(-78, 96, -118, 28, -142, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Stippled citrus pores
    ctx.fillStyle = '#8B630E';
    for (let i = 0; i < 28; i++) {
      const px = -75 + ((i * 37) % 150);
      const py = 15 + ((i * 29) % 56);
      if ((px * px) / (110 * 110) + (py * py) / (78 * 78) < 0.82) {
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  };

  const [lemC, lemCtx] = makeCanvas(512, 512);
  drawLemon(lemCtx, false);
  const [lemAltC, lemAltCtx] = makeCanvas(512, 512);
  drawLemon(lemAltCtx, true);

  // 4. RED APPLE & 5. GREEN APPLE
  const drawApple = (ctx: CanvasRenderingContext2D, isRed: boolean) => {
    ctx.save();
    ctx.translate(256, 276);

    // Leaf
    ctx.save();
    ctx.translate(10, -112);
    ctx.rotate(-0.45);
    ctx.fillStyle = '#6A8B44';
    setInk(ctx, 6);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(44, -32, 86, -4);
    ctx.quadraticCurveTo(42, 28, 0, 0);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Apple silhouette
    const g = ctx.createRadialGradient(-42, -44, 18, 10, 10, 155);
    if (isRed) {
      g.addColorStop(0, '#F7BE59');
      g.addColorStop(0.38, '#EA6E36');
      g.addColorStop(0.78, '#D94329');
      g.addColorStop(1, '#A62B19');
    } else {
      g.addColorStop(0, '#DCE07E');
      g.addColorStop(0.5, '#B2BC58');
      g.addColorStop(0.88, '#8E9940');
      g.addColorStop(1, '#6F7A2E');
    }

    ctx.fillStyle = g;
    setInk(ctx, 7);
    ctx.beginPath();
    ctx.moveTo(0, -98);
    ctx.bezierCurveTo(68, -128, 142, -74, 134, 12);
    ctx.bezierCurveTo(126, 92, 68, 138, 14, 126);
    ctx.quadraticCurveTo(0, 118, -14, 126);
    ctx.bezierCurveTo(-68, 138, -126, 92, -134, 12);
    ctx.bezierCurveTo(-142, -74, -68, -128, 0, -98);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Crown dimple + woody stem
    setInk(ctx, 5.2);
    ctx.beginPath();
    ctx.arc(0, -92, 28, 0.25, Math.PI - 0.25);
    ctx.stroke();

    ctx.strokeStyle = INK;
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.moveTo(0, -94);
    ctx.quadraticCurveTo(8, -134, 24, -152);
    ctx.stroke();

    // Soft highlight
    ctx.fillStyle = 'rgba(255, 244, 205, 0.42)';
    ctx.beginPath();
    ctx.ellipse(-56, -28, 22, 42, 0.32, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const [redAppC, redAppCtx] = makeCanvas(512, 512);
  drawApple(redAppCtx, true);
  const [grnAppC, grnAppCtx] = makeCanvas(512, 512);
  drawApple(grnAppCtx, false);

  // 6. GOLDEN BELL PEPPER
  const [pepC, pepCtx] = makeCanvas(512, 512);
  pepCtx.save();
  pepCtx.translate(256, 282);
  const drawPepperLobe = (ox: number, oy: number, rx: number, ry: number, col0: string, col1: string) => {
    const g = pepCtx.createLinearGradient(ox - rx, oy - ry, ox + rx, oy + ry);
    g.addColorStop(0, col0);
    g.addColorStop(1, col1);
    pepCtx.fillStyle = g;
    setInk(pepCtx, 6.8);
    pepCtx.beginPath();
    pepCtx.ellipse(ox, oy, rx, ry, 0, 0, Math.PI * 2);
    pepCtx.fill();
    pepCtx.stroke();
  };
  drawPepperLobe(-68, -4, 68, 108, '#F6C74D', '#D98E1D');
  drawPepperLobe(68, -4, 68, 108, '#F2B538', '#CE8118');
  drawPepperLobe(0, 8, 76, 118, '#FBD96E', '#E39B22');

  // Curved green calyx & stem
  pepCtx.fillStyle = '#5F803D';
  setInk(pepCtx, 6.5);
  pepCtx.beginPath();
  pepCtx.ellipse(0, -104, 48, 20, 0, 0, Math.PI * 2);
  pepCtx.fill();
  pepCtx.stroke();

  pepCtx.beginPath();
  pepCtx.moveTo(-14, -106);
  pepCtx.quadraticCurveTo(-8, -162, 34, -172);
  pepCtx.lineTo(42, -152);
  pepCtx.quadraticCurveTo(10, -144, 14, -104);
  pepCtx.closePath();
  pepCtx.fill();
  pepCtx.stroke();
  pepCtx.restore();

  // 7. KALE & ORCHARD GREENS BUNCH
  const drawKaleLeaf = (
    ctx: CanvasRenderingContext2D,
    bx: number,
    by: number,
    tx: number,
    ty: number,
    width: number,
    fill: string
  ) => {
    const dx = tx - bx;
    const dy = ty - by;
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(ang);

    ctx.fillStyle = fill;
    setInk(ctx, 5.8);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    const steps = 7;
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = t * len;
      const w = Math.sin(t * Math.PI * 0.88) * width;
      const cx = (t - 0.5 / steps) * len;
      ctx.quadraticCurveTo(cx, -w * 1.24, x, -w * 0.85);
    }
    ctx.quadraticCurveTo(len * 1.05, 0, len, width * 0.2);
    for (let i = steps; i >= 1; i--) {
      const t = i / steps;
      const x = ((i - 1) / steps) * len;
      const w = Math.sin(t * Math.PI * 0.88) * width;
      const cx = (t - 0.5 / steps) * len;
      ctx.quadraticCurveTo(cx, w * 1.24, x, w * 0.78);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Pale midrib & veins
    ctx.strokeStyle = '#ACC27B';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len * 0.84, 0);
    ctx.stroke();

    setInk(ctx, 3.2);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(len * 0.84, 0);
    ctx.stroke();

    ctx.restore();
  };

  const [kaleC, kaleCtx] = makeCanvas(512, 512);
  drawKaleLeaf(kaleCtx, 226, 426, 134, 118, 68, '#557437');
  drawKaleLeaf(kaleCtx, 240, 428, 256, 74, 78, '#6B8C45');
  drawKaleLeaf(kaleCtx, 252, 430, 386, 128, 72, '#5D7D3B');
  drawKaleLeaf(kaleCtx, 236, 434, 168, 196, 62, '#789850');
  drawKaleLeaf(kaleCtx, 250, 434, 344, 214, 64, '#7D9D54');

  // Red farm twine band at base
  kaleCtx.fillStyle = '#D44429';
  setInk(kaleCtx, 5.8);
  kaleCtx.beginPath();
  kaleCtx.roundRect(202, 396, 76, 24, 8);
  kaleCtx.fill();
  kaleCtx.stroke();

  const [kaleTopC, kaleTopCtx] = makeCanvas(512, 512);
  drawKaleLeaf(kaleTopCtx, 244, 428, 220, 108, 70, '#72934B');
  drawKaleLeaf(kaleTopCtx, 252, 430, 336, 154, 66, '#82A258');

  // 8. CHILI PEPPERS (Pair)
  const drawChili = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    rot: number,
    color0: string,
    color1: string
  ) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    // Stem
    ctx.strokeStyle = '#587738';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(95, -18);
    ctx.quadraticCurveTo(126, -34, 146, -20);
    ctx.stroke();
    setInk(ctx, 4.5);
    ctx.stroke();

    const g = ctx.createLinearGradient(-110, -25, 95, 30);
    g.addColorStop(0, color0);
    g.addColorStop(1, color1);
    ctx.fillStyle = g;
    setInk(ctx, 6.2);

    ctx.beginPath();
    ctx.moveTo(98, -22);
    ctx.bezierCurveTo(64, -46, -35, -24, -124, 18);
    ctx.bezierCurveTo(-40, 38, 66, 26, 102, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  const [chiliC, chiliCtx] = makeCanvas(512, 512);
  drawChili(chiliCtx, 246, 192, -0.45, '#7EA053', '#527135');
  drawChili(chiliCtx, 268, 336, -0.35, '#F26D44', '#C8351D');

  const [chiliAltC, chiliAltCtx] = makeCanvas(512, 512);
  drawChili(chiliAltCtx, 268, 224, -0.22, '#F26D44', '#C8351D');
  drawChili(chiliAltCtx, 236, 314, 2.95, '#7EA053', '#527135');

  // 9. ARTISAN BAGUETTE IN KRAFT PAPER BAG
  const drawBaguette = (ctx: CanvasRenderingContext2D, uprightForCrate: boolean) => {
    ctx.save();
    ctx.translate(256, 264);
    ctx.rotate(uprightForCrate ? 2.06 : -0.46);

    // Scored golden sourdough loaf (extends to left)
    const loafG = ctx.createLinearGradient(-210, -68, -20, 68);
    loafG.addColorStop(0, '#E3B079');
    loafG.addColorStop(0.55, '#C5874D');
    loafG.addColorStop(1, '#9C6230');
    ctx.fillStyle = loafG;
    setInk(ctx, 6.8);

    ctx.beginPath();
    ctx.moveTo(18, -62);
    ctx.bezierCurveTo(-92, -74, -216, -54, -218, 4);
    ctx.bezierCurveTo(-216, 62, -92, 74, 18, 62);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3 baker's slashes
    for (const sx of [-148, -92, -36]) {
      ctx.fillStyle = '#EED3AA';
      setInk(ctx, 4.2);
      ctx.beginPath();
      ctx.ellipse(sx, -8, 22, 8, -0.52, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    // Crinkled brown kraft paper bag sleeve (right half)
    const bagG = ctx.createLinearGradient(-24, -78, 195, 82);
    bagG.addColorStop(0, '#DFCBB0');
    bagG.addColorStop(0.55, '#C8AF8F');
    bagG.addColorStop(1, '#AA8F6E');
    ctx.fillStyle = bagG;
    setInk(ctx, 6.8);

    ctx.beginPath();
    ctx.moveTo(-22, -68);
    ctx.lineTo(192, -64);
    ctx.lineTo(208, 48);
    ctx.lineTo(-10, 72);
    ctx.quadraticCurveTo(-32, 12, -22, -68);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Kraft crinkle lines
    setInk(ctx, 3.8);
    ctx.beginPath();
    ctx.moveTo(12, -26);
    ctx.lineTo(148, -32);
    ctx.moveTo(28, 24);
    ctx.lineTo(176, 14);
    ctx.moveTo(92, -8);
    ctx.lineTo(188, -18);
    ctx.stroke();

    ctx.restore();
  };

  const [bagSrcC, bagSrcCtx] = makeCanvas(512, 512);
  drawBaguette(bagSrcCtx, false);
  const [bagCrateC, bagCrateCtx] = makeCanvas(512, 512);
  drawBaguette(bagCrateCtx, true);

  // 10. PRESERVES / JAM JAR
  const [jarC, jarCtx] = makeCanvas(512, 512);
  jarCtx.save();
  jarCtx.translate(256, 272);

  // Glass jar outer body
  jarCtx.fillStyle = '#F3EAD9';
  setInk(jarCtx, 6.8);
  jarCtx.beginPath();
  jarCtx.roundRect(-94, -82, 188, 224, 34);
  jarCtx.fill();
  jarCtx.stroke();

  // Rich red-apricot conserve inside
  const jamG = jarCtx.createLinearGradient(-82, -50, 82, 130);
  jamG.addColorStop(0, '#E3623B');
  jamG.addColorStop(0.55, '#CD4728');
  jamG.addColorStop(1, '#9E2E18');
  jarCtx.fillStyle = jamG;
  setInk(jarCtx, 5);
  jarCtx.beginPath();
  jarCtx.roundRect(-80, -48, 160, 176, 22);
  jarCtx.fill();
  jarCtx.stroke();

  // Blank cream paper label
  jarCtx.fillStyle = '#F8F2E6';
  setInk(jarCtx, 5.2);
  jarCtx.beginPath();
  jarCtx.roundRect(-58, -12, 116, 86, 8);
  jarCtx.fill();
  jarCtx.stroke();

  // Glass highlight bar
  jarCtx.fillStyle = 'rgba(255,255,255,0.58)';
  jarCtx.beginPath();
  jarCtx.roundRect(54, -36, 14, 142, 7);
  jarCtx.fill();

  // Ribbed cream screw-top lid
  jarCtx.fillStyle = '#F6EFE2';
  setInk(jarCtx, 6.5);
  jarCtx.beginPath();
  jarCtx.ellipse(0, -96, 88, 30, 0, 0, Math.PI * 2);
  jarCtx.fill();
  jarCtx.stroke();

  jarCtx.beginPath();
  jarCtx.ellipse(0, -108, 84, 24, 0, 0, Math.PI * 2);
  jarCtx.fill();
  jarCtx.stroke();
  jarCtx.restore();

  return {
    'vine-tomatoes': {
      sourceMain: finalizeTexture(vtCanvas, vtCtx, maxAnisotropy),
      sourceAccent: finalizeTexture(vtStemC, vtStemCtx, maxAnisotropy),
      crateMain: finalizeTexture(vtCrateC, vtCrateCtx, maxAnisotropy),
    },
    carrots: {
      sourceMain: finalizeTexture(carMainC, carMainCtx, maxAnisotropy),
      sourceAccent: finalizeTexture(carTopC, carTopCtx, maxAnisotropy),
      crateMain: finalizeTexture(carMainC, carMainCtx, maxAnisotropy),
      crateAccent: finalizeTexture(carTopC, carTopCtx, maxAnisotropy),
    },
    lemon: {
      sourceMain: finalizeTexture(lemC, lemCtx, maxAnisotropy),
      altSourceMain: finalizeTexture(lemAltC, lemAltCtx, maxAnisotropy),
      crateMain: finalizeTexture(lemC, lemCtx, maxAnisotropy),
    },
    'red-apple': {
      sourceMain: finalizeTexture(redAppC, redAppCtx, maxAnisotropy),
      crateMain: finalizeTexture(redAppC, redAppCtx, maxAnisotropy),
    },
    'green-apple': {
      sourceMain: finalizeTexture(grnAppC, grnAppCtx, maxAnisotropy),
      crateMain: finalizeTexture(grnAppC, grnAppCtx, maxAnisotropy),
    },
    'bell-pepper': {
      sourceMain: finalizeTexture(pepC, pepCtx, maxAnisotropy),
      crateMain: finalizeTexture(pepC, pepCtx, maxAnisotropy),
    },
    'kale-greens': {
      sourceMain: finalizeTexture(kaleC, kaleCtx, maxAnisotropy),
      sourceAccent: finalizeTexture(kaleTopC, kaleTopCtx, maxAnisotropy),
      crateMain: finalizeTexture(kaleC, kaleCtx, maxAnisotropy),
      crateAccent: finalizeTexture(kaleTopC, kaleTopCtx, maxAnisotropy),
    },
    'chili-peppers': {
      sourceMain: finalizeTexture(chiliC, chiliCtx, maxAnisotropy),
      altSourceMain: finalizeTexture(chiliAltC, chiliAltCtx, maxAnisotropy),
      crateMain: finalizeTexture(chiliC, chiliCtx, maxAnisotropy),
    },
    baguette: {
      sourceMain: finalizeTexture(bagSrcC, bagSrcCtx, maxAnisotropy),
      crateMain: finalizeTexture(bagCrateC, bagCrateCtx, maxAnisotropy),
    },
    'jam-jar': {
      sourceMain: finalizeTexture(jarC, jarCtx, maxAnisotropy),
      crateMain: finalizeTexture(jarC, jarCtx, maxAnisotropy),
    },
  };
}

export interface AnnotationTextures {
  inSeasonBadge: THREE.CanvasTexture;
  localBadge: THREE.CanvasTexture;
  organicBadge: THREE.CanvasTexture;
  leftDoodles: THREE.CanvasTexture;
  rightDoodles: THREE.CanvasTexture;
}

export function buildAnnotationTextures(maxAnisotropy: number): AnnotationTextures {
  const mkTex = (canvas: HTMLCanvasElement) => {
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = maxAnisotropy;
    t.needsUpdate = true;
    return t;
  };

  // 1. IN SEASON Terracotta Apothecary Badge
  const [c1, x1] = makeCanvas(512, 320);
  x1.fillStyle = '#DB5836';
  x1.beginPath();
  x1.moveTo(64, 252);
  x1.quadraticCurveTo(44, 250, 48, 224);
  x1.lineTo(62, 134);
  x1.quadraticCurveTo(68, 114, 118, 112);
  x1.quadraticCurveTo(138, 52, 256, 52);
  x1.quadraticCurveTo(374, 52, 394, 112);
  x1.quadraticCurveTo(444, 114, 450, 134);
  x1.lineTo(464, 224);
  x1.quadraticCurveTo(468, 250, 444, 252);
  x1.closePath();
  x1.fill();

  x1.strokeStyle = '#F7EFE2';
  x1.lineWidth = 5;
  x1.stroke();
  setInk(x1, 4.5);
  x1.save();
  x1.translate(256, 158);
  x1.scale(0.92, 0.88);
  x1.translate(-256, -158);
  x1.stroke();
  x1.restore();

  x1.fillStyle = INK;
  x1.font = '700 50px ui-sans-serif, system-ui, sans-serif';
  x1.textAlign = 'center';
  x1.fillText('IN', 256, 146);
  x1.fillText('SEASON', 256, 206);

  // 2. LOCAL Olive-Sage Badge
  const [c2, x2] = makeCanvas(512, 256);
  x2.fillStyle = '#8F9C59';
  x2.beginPath();
  x2.moveTo(48, 154);
  x2.quadraticCurveTo(42, 116, 128, 72);
  x2.lineTo(384, 62);
  x2.quadraticCurveTo(468, 86, 462, 138);
  x2.quadraticCurveTo(454, 188, 368, 204);
  x2.lineTo(136, 208);
  x2.quadraticCurveTo(54, 198, 48, 154);
  x2.closePath();
  x2.fill();
  setInk(x2, 4.5);
  x2.save();
  x2.translate(256, 136);
  x2.scale(0.92, 0.84);
  x2.translate(-256, -136);
  x2.stroke();
  x2.restore();
  x2.fillStyle = INK;
  x2.font = '700 54px ui-sans-serif, system-ui, sans-serif';
  x2.textAlign = 'center';
  x2.fillText('LOCAL', 256, 156);

  // 3. 100% ORGANIC Mustard Stamp Badge
  const [c3, x3] = makeCanvas(512, 320);
  x3.fillStyle = '#E8BB4B';
  x3.beginPath();
  x3.roundRect(44, 48, 424, 224, 28);
  x3.fill();
  setInk(x3, 5.5);
  x3.beginPath();
  x3.roundRect(62, 66, 388, 188, 18);
  x3.stroke();
  x3.fillStyle = INK;
  x3.font = '700 52px ui-sans-serif, system-ui, sans-serif';
  x3.textAlign = 'center';
  x3.fillText('100%', 256, 146);
  x3.fillText('ORGANIC', 256, 208);

  // 4. Left Hand-Inked Arrows, Dashed Arc & SEASONAL MICRO
  const [c4, x4] = makeCanvas(768, 768);
  setInk(x4, 5.5);
  // Dashed arc at top-right of left canvas (from right of IN SEASON into crate)
  x4.save();
  x4.setLineDash([16, 18]);
  x4.beginPath();
  x4.moveTo(548, 42);
  x4.quadraticCurveTo(662, 46, 726, 134);
  x4.stroke();
  x4.restore();

  // Burst lines near crate left corner
  x4.beginPath();
  x4.moveTo(356, 268);
  x4.lineTo(392, 290);
  x4.moveTo(348, 304);
  x4.lineTo(384, 310);
  x4.moveTo(356, 336);
  x4.lineTo(386, 330);
  x4.stroke();

  // Curved solid arrow pointing up into crate from above vine tomatoes
  x4.beginPath();
  x4.moveTo(298, 476);
  x4.quadraticCurveTo(312, 404, 384, 372);
  x4.stroke();
  x4.beginPath();
  x4.moveTo(360, 364);
  x4.lineTo(388, 370);
  x4.lineTo(374, 396);
  x4.stroke();

  // Motion ticks around tomatoes + SEASONAL MICRO cleanly below tomatoes
  x4.beginPath();
  x4.moveTo(188, 492);
  x4.lineTo(202, 514);
  x4.moveTo(214, 480);
  x4.lineTo(220, 506);
  x4.moveTo(156, 568);
  x4.quadraticCurveTo(146, 592, 158, 614);
  x4.stroke();

  x4.save();
  x4.translate(184, 712);
  x4.rotate(-0.22);
  x4.fillStyle = INK;
  x4.font = '600 22px ui-sans-serif, system-ui, sans-serif';
  x4.textAlign = 'center';
  x4.fillText('SEASONAL', 0, 0);
  x4.fillText('MICRO', 0, 24);
  x4.restore();

  // Small curved tick beside SEASONAL MICRO
  x4.beginPath();
  x4.moveTo(252, 694);
  x4.quadraticCurveTo(266, 690, 272, 678);
  x4.stroke();

  // 5. Right Hand-Inked Burst Lines, Dashed Arrow & Arched SEASONAL
  const [c5, x5] = makeCanvas(768, 768);
  setInk(x5, 5.5);
  // Top burst lines
  x5.beginPath();
  x5.moveTo(164, 98);
  x5.lineTo(182, 62);
  x5.moveTo(194, 112);
  x5.lineTo(232, 82);
  x5.moveTo(212, 134);
  x5.lineTo(258, 120);
  x5.stroke();

  // Dashed curved arrow from 100% ORGANIC toward crate right corner
  x5.save();
  x5.setLineDash([15, 16]);
  x5.beginPath();
  x5.moveTo(518, 224);
  x5.quadraticCurveTo(532, 304, 456, 334);
  x5.stroke();
  x5.restore();
  x5.beginPath();
  x5.moveTo(476, 314);
  x5.lineTo(452, 335);
  x5.lineTo(480, 344);
  x5.stroke();

  // Arched SEASONAL + curved arrow pointing down-left
  x5.save();
  x5.translate(546, 396);
  x5.rotate(0.58);
  x5.fillStyle = INK;
  x5.font = '600 27px ui-sans-serif, system-ui, sans-serif';
  x5.textAlign = 'center';
  x5.fillText('SEASONAL', 0, 0);
  x5.restore();

  x5.beginPath();
  x5.moveTo(506, 420);
  x5.quadraticCurveTo(502, 456, 464, 476);
  x5.stroke();
  x5.beginPath();
  x5.moveTo(484, 456);
  x5.lineTo(462, 477);
  x5.lineTo(488, 480);
  x5.stroke();

  return {
    inSeasonBadge: mkTex(c1),
    localBadge: mkTex(c2),
    organicBadge: mkTex(c3),
    leftDoodles: mkTex(c4),
    rightDoodles: mkTex(c5),
  };
}
