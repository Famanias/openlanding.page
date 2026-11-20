import { mulberry32 } from './noise';
import { clamp01, easeInOutCubic, easeOutCubic, segmentProgress } from './timeline';
import type { EngravedFlowerSpec, PaperScrapSpec } from './types';

interface EngravedPetalData {
  angle: number;
  length: number;
  width: number;
  tier: number;
  curl: number;
  revealOffset: number;
  seed: number;
}

interface CachedScrapBuffer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  lastQuantizedPrint: number;
  halfW: number;
  halfH: number;
}

interface CachedEngravedBuffer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  petals: EngravedPetalData[];
  lastQuantizedProgress: number;
  halfSize: number;
}

const scrapBufferCache = new Map<string, CachedScrapBuffer>();
const engravedBufferCache = new Map<string, CachedEngravedBuffer>();

function traceDeckledScrap(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seed: number,
  organicCircular = false
): void {
  const rng = mulberry32(seed);
  const hw = width * 0.5;
  const hh = height * 0.5;

  ctx.beginPath();

  if (organicCircular) {
    const segs = 38;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const rMod =
        0.86 +
        Math.sin(a * 5 + seed) * 0.08 +
        Math.cos(a * 11 + seed * 2) * 0.05 +
        (rng() - 0.5) * 0.07;
      const x = Math.cos(a) * hw * rMod;
      const y = Math.sin(a) * hh * rMod;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    return;
  }

  const edges = 12;
  const pts: Array<{ x: number; y: number }> = [];

  for (let i = 0; i < edges; i++) {
    const t = i / edges;
    pts.push({
      x: -hw + t * width + (rng() - 0.5) * 4,
      y: -hh + (rng() - 0.5) * 14 - Math.sin(t * Math.PI) * 8,
    });
  }
  for (let i = 0; i < edges; i++) {
    const t = i / edges;
    pts.push({
      x: hw + (rng() - 0.5) * 14,
      y: -hh + t * height + (rng() - 0.5) * 4,
    });
  }
  for (let i = 0; i < edges; i++) {
    const t = i / edges;
    pts.push({
      x: hw - t * width + (rng() - 0.5) * 4,
      y: hh + (rng() - 0.5) * 14,
    });
  }
  for (let i = 0; i < edges; i++) {
    const t = i / edges;
    pts.push({
      x: -hw + (rng() - 0.5) * 14,
      y: hh - t * height + (rng() - 0.5) * 4,
    });
  }

  pts.forEach((p, idx) => {
    if (idx === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.closePath();
}

function drawEngravedFoliageMotif(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  printProgress: number,
  seed: number
): void {
  const rng = mulberry32(seed + 77);
  if (printProgress <= 0.02) return;

  ctx.save();
  ctx.strokeStyle = '#1E1B1A';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const leaves = [
    { x: -18, y: 42, angle: -2.15, len: 112, w: 36, delay: 0.0 },
    { x: 10, y: 36, angle: -1.15, len: 105, w: 34, delay: 0.14 },
    { x: -34, y: 55, angle: -2.65, len: 82, w: 28, delay: 0.28 },
    { x: 32, y: 46, angle: -0.68, len: 78, w: 26, delay: 0.36 },
  ];

  for (const lf of leaves) {
    const lp = clamp01((printProgress - lf.delay) / 0.58);
    if (lp <= 0.01) continue;

    ctx.save();
    ctx.translate(lf.x, lf.y);
    ctx.rotate(lf.angle);

    const curLen = lf.len * easeOutCubic(lp);
    const curW = lf.w * easeOutCubic(lp);

    ctx.lineWidth = 1.25;
    ctx.globalAlpha = Math.min(0.92, lp * 1.4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(curLen * 0.32, -curW * 0.72, curLen * 0.72, -curW * 0.56, curLen, 0);
    ctx.bezierCurveTo(curLen * 0.72, curW * 0.56, curLen * 0.32, curW * 0.72, 0, 0);
    ctx.stroke();

    ctx.lineWidth = 1.05;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(curLen * 0.94, 0);
    ctx.stroke();

    const hatchCount = Math.floor(14 * lp);
    ctx.lineWidth = 0.65;
    ctx.globalAlpha = 0.78 * lp;
    for (let i = 1; i <= hatchCount; i++) {
      const u = i / 15;
      const vx = curLen * u;
      const spread = Math.sin(u * Math.PI) * curW * 0.52;
      ctx.beginPath();
      ctx.moveTo(vx, 0);
      ctx.lineTo(vx + 7, -spread);
      ctx.moveTo(vx, 0);
      ctx.lineTo(vx + 7, spread);
      ctx.stroke();
    }

    ctx.restore();
  }

  if (printProgress > 0.45) {
    const stipP = clamp01((printProgress - 0.45) / 0.55);
    ctx.fillStyle = 'rgba(34, 30, 28, 0.38)';
    for (let i = 0; i < Math.floor(36 * stipP); i++) {
      const sx = (rng() - 0.5) * width * 0.72;
      const sy = (rng() - 0.5) * height * 0.72;
      ctx.fillRect(sx, sy, 1.2, 1.2);
    }
  }

  ctx.restore();
}

function drawEngravedHerbMotif(
  ctx: CanvasRenderingContext2D,
  printProgress: number,
  seed: number
): void {
  if (printProgress <= 0.02) return;
  const rng = mulberry32(seed + 111);

  ctx.save();
  ctx.strokeStyle = '#1D1A19';
  ctx.fillStyle = '#1D1A19';
  ctx.lineCap = 'round';

  const stemP = easeOutCubic(clamp01(printProgress / 0.5));
  ctx.lineWidth = 1.3;
  ctx.beginPath();
  ctx.moveTo(-24, 68);
  ctx.quadraticCurveTo(-8, 12, -24 + 34 * stemP, 68 - 110 * stemP);
  ctx.stroke();

  const pairs = 5;
  for (let i = 0; i < pairs; i++) {
    const lp = clamp01((printProgress - 0.14 - i * 0.1) / 0.38);
    if (lp <= 0.01) continue;
    const t = 0.22 + i * 0.15;
    const sx = -24 + t * 30;
    const sy = 64 - t * 92;

    for (const dir of [-1, 1]) {
      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(dir * (0.7 + rng() * 0.25) - 0.3);
      const len = (22 + (1 - t) * 16) * easeOutCubic(lp);
      ctx.lineWidth = 0.95;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(len * 0.45, -len * 0.3, len, 0);
      ctx.quadraticCurveTo(len * 0.45, len * 0.3, 0, 0);
      ctx.stroke();

      ctx.lineWidth = 0.55;
      ctx.beginPath();
      ctx.moveTo(len * 0.2, 0);
      ctx.lineTo(len * 0.85, 0);
      ctx.stroke();
      ctx.restore();
    }
  }

  if (printProgress > 0.38) {
    const flP = easeOutCubic(clamp01((printProgress - 0.38) / 0.58));
    const heads = [
      { x: 14, y: -32, r: 17 },
      { x: -10, y: -44, r: 14 },
      { x: 30, y: -14, r: 13 },
    ];
    for (const h of heads) {
      ctx.save();
      ctx.translate(h.x, h.y);
      const petals = 7;
      for (let p = 0; p < petals; p++) {
        const a = (p / petals) * Math.PI * 2 + rng() * 0.2;
        const r = h.r * flP;
        ctx.save();
        ctx.rotate(a);
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.ellipse(r * 0.6, 0, r * 0.48, r * 0.26, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(r * 0.25, 0);
        ctx.lineTo(r * 0.9, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 2.5 * flP, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  ctx.restore();
}

/**
 * Renders a torn vintage archival paper scrap from a cached offscreen buffer
 * (re-rendered only when quantized engraving print progress advances).
 */
export function drawPaperScrap(
  ctx: CanvasRenderingContext2D,
  scrap: PaperScrapSpec,
  timeSec: number,
  parallaxOffsetX: number,
  parallaxOffsetY: number,
  animateGrowth: boolean,
  visibilityEnvelope = 1
): void {
  const rawP = animateGrowth
    ? segmentProgress(timeSec, scrap.startSec, scrap.durationSec)
    : 1;
  if (rawP <= 0.002) return;

  const settleP = easeOutCubic(clamp01(rawP / 0.55));
  const printP = easeInOutCubic(clamp01((rawP - 0.22) / 0.78));
  const quantizedPrint = Math.round(printP * 32);

  let buf = scrapBufferCache.get(scrap.id);
  if (!buf) {
    const pad = 28;
    const cw = Math.ceil(scrap.width + pad * 2);
    const ch = Math.ceil(scrap.height + pad * 2);
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    buf = {
      canvas,
      ctx: canvas.getContext('2d'),
      lastQuantizedPrint: -1,
      halfW: cw * 0.5,
      halfH: ch * 0.5,
    };
    scrapBufferCache.set(scrap.id, buf);
  }

  if (buf.lastQuantizedPrint !== quantizedPrint && buf.ctx) {
    buf.lastQuantizedPrint = quantizedPrint;
    const bCtx = buf.ctx;
    const isPeonyBacking = scrap.motif === 'peonyBacking';

    bCtx.clearRect(0, 0, buf.canvas.width, buf.canvas.height);
    bCtx.save();
    bCtx.translate(buf.halfW, buf.halfH);

    // Lightweight contact shadow polygon (no per-frame shadowBlur stall)
    bCtx.save();
    bCtx.translate(4, 6);
    traceDeckledScrap(bCtx, scrap.width, scrap.height, scrap.seed, isPeonyBacking);
    bCtx.fillStyle = 'rgba(28, 22, 20, 0.16)';
    bCtx.fill();
    bCtx.restore();

    traceDeckledScrap(bCtx, scrap.width, scrap.height, scrap.seed, isPeonyBacking);
    const grad = bCtx.createLinearGradient(
      -scrap.width * 0.5,
      -scrap.height * 0.5,
      scrap.width * 0.5,
      scrap.height * 0.5
    );
    grad.addColorStop(0, '#E7DEC9');
    grad.addColorStop(0.55, '#DDD1BA');
    grad.addColorStop(1, '#CEBE9F');
    bCtx.fillStyle = grad;
    bCtx.fill();

    // Fibrous torn edge highlight + subtle dark paper deckle outline
    bCtx.strokeStyle = 'rgba(252, 246, 236, 0.65)';
    bCtx.lineWidth = 2.0;
    bCtx.stroke();
    bCtx.strokeStyle = 'rgba(92, 78, 62, 0.3)';
    bCtx.lineWidth = 0.8;
    bCtx.stroke();

    // Clip interior foxing & engraving motif
    bCtx.save();
    traceDeckledScrap(bCtx, scrap.width, scrap.height, scrap.seed, isPeonyBacking);
    bCtx.clip();

    const rng = mulberry32(scrap.seed + 19);
    for (let i = 0; i < 16; i++) {
      bCtx.fillStyle = `rgba(142, 118, 88, ${0.06 + rng() * 0.1})`;
      bCtx.beginPath();
      bCtx.arc(
        (rng() - 0.5) * scrap.width,
        (rng() - 0.5) * scrap.height,
        3 + rng() * 14,
        0,
        Math.PI * 2
      );
      bCtx.fill();
    }

    const qP = quantizedPrint / 32;
    if (scrap.motif === 'foliageEngraving') {
      drawEngravedFoliageMotif(bCtx, scrap.width, scrap.height, qP, scrap.seed);
    } else if (scrap.motif === 'herbSprig') {
      drawEngravedHerbMotif(bCtx, qP, scrap.seed);
    }

    bCtx.restore();
    bCtx.restore();
  }

  const x = scrap.center.x + parallaxOffsetX + scrap.slideOffset.x * (1 - settleP);
  const y = scrap.center.y + parallaxOffsetY + scrap.slideOffset.y * (1 - settleP);
  const rot = scrap.rotation + (1 - settleP) * 0.04;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalAlpha = Math.min(1, settleP * 1.35) * visibilityEnvelope;
  ctx.drawImage(buf.canvas, -buf.halfW, -buf.halfH);
  ctx.restore();
}

function buildEngravedPeonyPetals(spec: EngravedFlowerSpec): EngravedPetalData[] {
  const rng = mulberry32(spec.seed);
  const petals: EngravedPetalData[] = [];

  // Broad lush outer woodcut peony petals
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 + (rng() - 0.5) * 0.25;
    petals.push({
      angle: a,
      length: spec.radius * (0.86 + rng() * 0.16),
      width: spec.radius * (0.52 + rng() * 0.14),
      tier: 0,
      curl: (rng() - 0.5) * 0.28,
      revealOffset: (i / 10) * 0.34,
      seed: spec.seed + i * 17,
    });
  }

  // Overlapping broad middle petals
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2 + 0.34 + (rng() - 0.5) * 0.26;
    petals.push({
      angle: a,
      length: spec.radius * (0.64 + rng() * 0.14),
      width: spec.radius * (0.46 + rng() * 0.11),
      tier: 1,
      curl: (rng() - 0.5) * 0.36,
      revealOffset: 0.2 + (i / 9) * 0.34,
      seed: spec.seed + 200 + i * 19,
    });
  }

  // Curled inner ruffled petals
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + 0.18 + (rng() - 0.5) * 0.24;
    petals.push({
      angle: a,
      length: spec.radius * (0.42 + rng() * 0.1),
      width: spec.radius * (0.34 + rng() * 0.08),
      tier: 2,
      curl: (rng() - 0.5) * 0.42,
      revealOffset: 0.44 + (i / 7) * 0.3,
      seed: spec.seed + 400 + i * 23,
    });
  }

  return petals;
}

/**
 * Traces a broad, notched, ruffled baroque botanical engraving petal along +X.
 */
function traceEngravedRuffledPetal(
  ctx: CanvasRenderingContext2D,
  len: number,
  hw: number,
  tipBend: number,
  seed: number
): void {
  const rng = mulberry32(seed + 5);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  // Upper flank swelling broad like a peony/rose petal
  ctx.bezierCurveTo(
    len * 0.24,
    -hw * 0.85,
    len * 0.62,
    -hw * 1.18 + tipBend * 0.3,
    len * 0.88,
    -hw * 0.62 + tipBend * 0.7
  );
  // Notched scalloped outer petal lip (characteristic of copperplate peony engravings)
  ctx.quadraticCurveTo(
    len * (0.98 + rng() * 0.06),
    -hw * 0.32 + tipBend,
    len * (0.93 + rng() * 0.04),
    -hw * 0.04 + tipBend
  );
  ctx.quadraticCurveTo(
    len * (1.02 + rng() * 0.05),
    hw * 0.24 + tipBend,
    len * 0.88,
    hw * 0.62 + tipBend * 0.7
  );
  // Lower flank returning to base claw
  ctx.bezierCurveTo(
    len * 0.62,
    hw * 1.18 + tipBend * 0.3,
    len * 0.24,
    hw * 0.85,
    0,
    0
  );
  ctx.closePath();
}

/**
 * Renders the signature lower-center-right copperplate-engraved botanical peony
 * via a cached offscreen buffer (re-drawn only when quantized print progress changes).
 */
export function drawEngravedFlower(
  ctx: CanvasRenderingContext2D,
  spec: EngravedFlowerSpec,
  timeSec: number,
  parallaxOffsetX: number,
  parallaxOffsetY: number,
  animateGrowth: boolean,
  visibilityEnvelope = 1
): void {
  const rawP = animateGrowth
    ? segmentProgress(timeSec, spec.startSec, spec.durationSec)
    : 1;
  if (rawP <= 0.002) return;

  const quantized = Math.round(clamp01(rawP) * 40);

  let buf = engravedBufferCache.get(spec.id);
  if (!buf) {
    const size = Math.ceil(spec.radius * 2.55);
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    buf = {
      canvas,
      ctx: canvas.getContext('2d'),
      petals: buildEngravedPeonyPetals(spec),
      lastQuantizedProgress: -1,
      halfSize: size * 0.5,
    };
    engravedBufferCache.set(spec.id, buf);
  }

  if (buf.lastQuantizedProgress !== quantized && buf.ctx) {
    buf.lastQuantizedProgress = quantized;
    const bCtx = buf.ctx;
    const qP = quantized / 40;

    bCtx.clearRect(0, 0, buf.canvas.width, buf.canvas.height);
    bCtx.save();
    bCtx.translate(buf.halfSize, buf.halfSize);

    for (const p of buf.petals) {
      const lp = clamp01((qP - p.revealOffset) / 0.42);
      if (lp <= 0.01) continue;

      const strokeP = easeOutCubic(clamp01(lp / 0.72));
      const hatchP = easeInOutCubic(clamp01((lp - 0.2) / 0.8));
      const rng = mulberry32(p.seed);

      bCtx.save();
      bCtx.rotate(p.angle);

      const len = p.length;
      const hw = p.width * 0.5;
      const tipBend = p.curl * p.width * 0.5;

      traceEngravedRuffledPetal(bCtx, len, hw, tipBend, p.seed);

      // Aged antique engraving paper tone with deep shaded pocket at base
      const paperGrad = bCtx.createLinearGradient(0, 0, len, 0);
      paperGrad.addColorStop(0, '#5E5850');
      paperGrad.addColorStop(0.22, '#ABA191');
      paperGrad.addColorStop(0.62, '#D7CEBC');
      paperGrad.addColorStop(1, '#EBE3D3');
      bCtx.globalAlpha = Math.min(1, lp * 1.5);
      bCtx.fillStyle = paperGrad;
      bCtx.fill();

      bCtx.save();
      bCtx.clip();

      if (hatchP > 0.02) {
        const lineCount = p.tier === 0 ? 22 : p.tier === 1 ? 18 : 14;
        const visibleLines = Math.floor(lineCount * hatchP);
        bCtx.strokeStyle = '#181516';
        bCtx.lineCap = 'round';

        for (let i = 0; i < visibleLines; i++) {
          const u = (i / (lineCount - 1)) * 2 - 1;
          const reach = (0.55 + (1 - Math.abs(u)) * 0.4 + (rng() - 0.5) * 0.14) * hatchP;
          bCtx.lineWidth = Math.abs(u) < 0.3 ? 1.15 : 0.8;
          bCtx.globalAlpha = 0.68 + (1 - Math.abs(u)) * 0.28;

          bCtx.beginPath();
          bCtx.moveTo(len * 0.03, u * hw * 0.16);
          bCtx.quadraticCurveTo(
            len * 0.45 * reach,
            u * hw * 0.92,
            len * reach,
            u * hw * 0.68 + tipBend * reach * 0.65
          );
          bCtx.stroke();
        }

        // Dense crosshatched woodcut shadow near petal heart
        const crossLines = Math.floor(11 * hatchP);
        bCtx.lineWidth = 0.72;
        bCtx.globalAlpha = 0.64 * hatchP;
        for (let c = 1; c <= crossLines; c++) {
          const cx = len * (0.07 + c * 0.044);
          const span = hw * (0.55 + c * 0.05);
          bCtx.beginPath();
          bCtx.moveTo(cx, -span);
          bCtx.quadraticCurveTo(cx + 10, 0, cx, span);
          bCtx.stroke();
        }
      }
      bCtx.restore();

      // Bold variable burin ink contour around scalloped petal
      bCtx.strokeStyle = '#161314';
      bCtx.lineWidth = p.tier === 0 ? 1.85 : 1.5;
      bCtx.globalAlpha = strokeP;
      bCtx.setLineDash([len * 3.2 * strokeP, len * 3.5]);
      traceEngravedRuffledPetal(bCtx, len, hw, tipBend, p.seed);
      bCtx.stroke();
      bCtx.setLineDash([]);

      bCtx.restore();
    }

    const coreP = clamp01((qP - 0.62) / 0.38);
    if (coreP > 0.02) {
      const rng = mulberry32(spec.seed + 999);
      bCtx.fillStyle = '#1B1819';
      bCtx.strokeStyle = '#1B1819';
      bCtx.globalAlpha = coreP;

      const count = Math.floor(38 * coreP);
      for (let i = 0; i < count; i++) {
        const a = rng() * Math.PI * 2;
        const dist = 4 + rng() * spec.radius * 0.16;
        bCtx.lineWidth = 0.8;
        bCtx.beginPath();
        bCtx.moveTo(0, 0);
        bCtx.lineTo(Math.cos(a) * dist, Math.sin(a) * dist);
        bCtx.stroke();

        bCtx.beginPath();
        bCtx.arc(Math.cos(a) * dist, Math.sin(a) * dist, 1.4 + rng() * 1.4, 0, Math.PI * 2);
        bCtx.fill();
      }
    }

    bCtx.restore();
  }

  ctx.save();
  ctx.translate(spec.center.x + parallaxOffsetX, spec.center.y + parallaxOffsetY);
  ctx.rotate(spec.rotation);
  ctx.globalAlpha = visibilityEnvelope;
  ctx.drawImage(buf.canvas, -buf.halfSize, -buf.halfSize);
  ctx.restore();
}
