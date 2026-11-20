import * as THREE from 'three';

export interface ProceduralTextureSet {
  towerColor: THREE.CanvasTexture;
  towerBump: THREE.CanvasTexture;
  stoneColor: THREE.CanvasTexture;
  stoneBump: THREE.CanvasTexture;
  cottageStoneColor: THREE.CanvasTexture;
  cottageStoneBump: THREE.CanvasTexture;
  rockColor: THREE.CanvasTexture;
  rockBump: THREE.CanvasTexture;
  roofColor: THREE.CanvasTexture;
  roofBump: THREE.CanvasTexture;
  woodColor: THREE.CanvasTexture;
  woodBump: THREE.CanvasTexture;
  spraySprite: THREE.CanvasTexture;
  dispose: () => void;
}

function seededRand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function configureTexture(
  canvas: HTMLCanvasElement,
  isColor: boolean,
  anisotropy: number,
  repeatX = 1,
  repeatY = 1
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.anisotropy = anisotropy;
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeCanvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  return [c, ctx];
}

/**
 * Generates weathered off-white coastal plaster masonry with subtle cracks,
 * salt staining, faded rust-crimson identification band, and iron rust drips
 * beneath the upper gallery cornice.
 */
function createTowerTextures(anisotropy: number) {
  const w = 512;
  const h = 512;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(1042);

  // Base weathered off-white lime plaster
  ctx.fillStyle = '#ccc5b8';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#848484';
  bCtx.fillRect(0, 0, w, h);

  // Subtle horizontal masonry block seams beneath plaster
  const rows = 28;
  const rowH = h / rows;
  for (let r = 0; r < rows; r++) {
    const y = r * rowH;
    const cols = 10;
    const colW = w / cols;
    const offset = (r % 2) * (colW * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      const shade = Math.floor(188 + (rand() - 0.5) * 24);
      ctx.fillStyle = `rgba(${shade}, ${shade - 6}, ${shade - 14}, 0.25)`;
      ctx.fillRect(x + 1, y + 1, colW - 2, rowH - 2);

      const bVal = Math.floor(128 + (rand() - 0.5) * 28);
      bCtx.fillStyle = `rgb(${bVal}, ${bVal}, ${bVal})`;
      bCtx.fillRect(x + 1, y + 1, colW - 2, rowH - 2);
    }
    bCtx.fillStyle = '#505050';
    bCtx.fillRect(0, y, w, 1.3);
  }

  // Faded weathered red identification band (around 58%-70% height)
  const bandY = h * 0.30;
  const bandH = h * 0.11;
  ctx.fillStyle = '#7e362c';
  ctx.fillRect(0, bandY, w, bandH);
  for (let i = 0; i < 180; i++) {
    const px = rand() * w;
    const py = bandY + (rand() - 0.12) * (bandH * 1.24);
    const rad = 2 + rand() * 8;
    ctx.fillStyle =
      rand() > 0.44 ? 'rgba(202, 194, 180, 0.48)' : 'rgba(98, 40, 32, 0.48)';
    ctx.beginPath();
    ctx.arc(px, py, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine coastal salt-weathered stucco patina & subtle damp plaster variation
  for (let i = 0; i < 420; i++) {
    const px = rand() * w;
    const py = rand() * h;
    const rx = 2.5 + rand() * 10.5;
    const ry = 2 + rand() * 6.5;
    const t = rand();
    if (t < 0.34) {
      // Subtle weathered mortar/stone reveal
      ctx.fillStyle = `rgba(116, 108, 96, ${0.09 + rand() * 0.14})`;
      bCtx.fillStyle = `rgba(72, 72, 72, ${0.28 + rand() * 0.24})`;
    } else if (t < 0.68) {
      // Pale sea-salt crust efflorescence
      ctx.fillStyle = `rgba(232, 228, 218, ${0.14 + rand() * 0.18})`;
      bCtx.fillStyle = `rgba(158, 158, 158, 0.22)`;
    } else {
      // Soft coastal damp wash
      ctx.fillStyle = `rgba(82, 78, 70, ${0.07 + rand() * 0.12})`;
      bCtx.fillStyle = `rgba(114, 114, 114, 0.2)`;
    }
    ctx.beginPath();
    ctx.ellipse(px, py, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    bCtx.beginPath();
    bCtx.ellipse(px, py, rx, ry, rand() * Math.PI, 0, Math.PI * 2);
    bCtx.fill();
  }

  // Subtle weathered hairline cracks
  for (let i = 0; i < 42; i++) {
    let cx = rand() * w;
    let cy = rand() * h;
    ctx.strokeStyle = 'rgba(54, 48, 42, 0.34)';
    ctx.lineWidth = 1.0;
    bCtx.strokeStyle = 'rgba(28, 28, 28, 0.6)';
    bCtx.lineWidth = 1.2;
    ctx.beginPath();
    bCtx.beginPath();
    ctx.moveTo(cx, cy);
    bCtx.moveTo(cx, cy);
    for (let s = 0; s < 5; s++) {
      cx += (rand() - 0.5) * 18;
      cy += 4 + rand() * 14;
      ctx.lineTo(cx, cy);
      bCtx.lineTo(cx, cy);
    }
    ctx.stroke();
    bCtx.stroke();
  }

  // Iron rust streaks dripping down from the upper gallery iron brackets & fixtures
  for (let i = 0; i < 45; i++) {
    const px = rand() * w;
    const py = rand() * h * 0.14;
    const len = 24 + rand() * 72;
    const grad = ctx.createLinearGradient(px, py, px, py + len);
    grad.addColorStop(0, 'rgba(116, 56, 30, 0.38)');
    grad.addColorStop(0.55, 'rgba(84, 48, 32, 0.16)');
    grad.addColorStop(1, 'rgba(84, 48, 32, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(px, py, 2 + rand() * 3.5, len);
  }

  // Damp base salt-spray discoloration
  const baseGrad = ctx.createLinearGradient(0, h * 0.82, 0, h);
  baseGrad.addColorStop(0, 'rgba(56, 58, 52, 0)');
  baseGrad.addColorStop(1, 'rgba(52, 54, 48, 0.34)');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, h * 0.82, w, h * 0.18);

  return {
    towerColor: configureTexture(cCol, true, anisotropy, 2, 1),
    towerBump: configureTexture(cBump, false, anisotropy, 2, 1),
  };
}

/**
 * Rough-hewn pale granite ashlar blocks for the lighthouse plinth, pathways & stone stairs.
 */
function createStoneTextures(anisotropy: number) {
  const w = 512;
  const h = 512;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(2088);

  ctx.fillStyle = '#484a4d';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#252525';
  bCtx.fillRect(0, 0, w, h);

  const rows = 10;
  const rowH = h / rows;
  for (let r = 0; r < rows; r++) {
    const y = r * rowH;
    const cols = 6;
    const colW = w / cols;
    const offset = (r % 2) * (colW * 0.48);
    for (let c = -1; c <= cols; c++) {
      const x = c * colW + offset;
      const bw = colW - 5;
      const bh = rowH - 5;
      const tone = 104 + Math.floor(rand() * 48);
      const warm = Math.floor((rand() - 0.42) * 16);
      ctx.fillStyle = `rgb(${tone + warm}, ${tone + Math.floor(warm * 0.5)}, ${tone - 3})`;
      ctx.fillRect(x + 2.5, y + 2.5, bw, bh);

      const bv = 135 + Math.floor(rand() * 85);
      bCtx.fillStyle = `rgb(${bv}, ${bv}, ${bv})`;
      bCtx.fillRect(x + 3, y + 3, bw - 1, bh - 1);

      ctx.strokeStyle = 'rgba(218, 212, 200, 0.24)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + 3.5, y + 3.5, bw - 2, bh - 2);
    }
  }

  for (let i = 0; i < 620; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const rad = 1.5 + rand() * 5.2;
    const isMoss = rand() < 0.14;
    ctx.fillStyle = isMoss
      ? `rgba(74, 86, 52, ${0.22 + rand() * 0.25})`
      : `rgba(42, 44, 46, ${0.18 + rand() * 0.24})`;
    ctx.beginPath();
    ctx.arc(x, y, rad, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    stoneColor: configureTexture(cCol, true, anisotropy, 3, 2),
    stoneBump: configureTexture(cBump, false, anisotropy, 3, 2),
  };
}

/**
 * Distinct darker coastal fieldstone & slate masonry for the independent keeper's cottage
 * so the cottage clearly differentiates from the off-white plastered lighthouse tower.
 */
function createCottageStoneTextures(anisotropy: number) {
  const w = 512;
  const h = 512;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(6173);

  // Recessed lime-grey mortar
  ctx.fillStyle = '#383b40';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#242424';
  bCtx.fillRect(0, 0, w, h);

  const rows = 14;
  const rowH = h / rows;
  for (let r = 0; r < rows; r++) {
    const y = r * rowH;
    let x = -rand() * 24;
    while (x < w + 20) {
      const bw = 42 + rand() * 54;
      const bh = rowH - 4.5;
      // Rich dark coastal slate-brown and cool charcoal fieldstone
      const base = 62 + Math.floor(rand() * 38);
      const warm = Math.floor((rand() - 0.5) * 18);
      ctx.fillStyle = `rgb(${base + warm}, ${base + Math.floor(warm * 0.4)}, ${base + 4})`;
      ctx.fillRect(x + 2, y + 2, bw - 4, bh);

      const bv = 120 + Math.floor(rand() * 98);
      bCtx.fillStyle = `rgb(${bv}, ${bv}, ${bv})`;
      bCtx.fillRect(x + 2.5, y + 2.5, bw - 5, bh - 1);

      ctx.strokeStyle = 'rgba(150, 152, 156, 0.16)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x + 3, y + 3, bw - 6, bh - 2);
      x += bw;
    }
  }

  // Coastal lichen & damp weathering along lower walls
  for (let i = 0; i < 480; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 1.5 + rand() * 4.8;
    ctx.fillStyle =
      rand() < 0.22
        ? `rgba(74, 84, 58, ${0.2 + rand() * 0.24})`
        : `rgba(26, 28, 32, ${0.22 + rand() * 0.22})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    cottageStoneColor: configureTexture(cCol, true, anisotropy, 2.5, 2),
    cottageStoneBump: configureTexture(cBump, false, anisotropy, 2.5, 2),
  };
}

/**
 * Stratified coastal basalt & granite cliff rock with varied mineral bands,
 * iron-ochre veins, lichen flecks, and deep erosion fractures.
 */
function createRockTextures(anisotropy: number) {
  const w = 512;
  const h = 512;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(3099);

  ctx.fillStyle = '#3f4348';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#757575';
  bCtx.fillRect(0, 0, w, h);

  // Irregular geological strata & mineral bands (cool basalt + warm ironstone seams)
  for (let i = 0; i < 110; i++) {
    const y = rand() * h;
    const bandH = 3 + rand() * 17;
    const v = 46 + Math.floor(rand() * 54);
    const ironTint = rand() < 0.24 ? 14 : 0;
    ctx.fillStyle = `rgba(${v + 4 + ironTint}, ${v + 2 + Math.floor(ironTint * 0.45)}, ${v}, 0.42)`;
    ctx.fillRect(0, y, w, bandH);
    const bv = 72 + Math.floor(rand() * 126);
    bCtx.fillStyle = `rgba(${bv}, ${bv}, ${bv}, 0.52)`;
    bCtx.fillRect(0, y, w, bandH);
  }

  // Stratified coastal basalt bedding planes & subtle eroded rock crevices
  for (let i = 0; i < 120; i++) {
    let x = rand() * w;
    let y = rand() * h;
    ctx.strokeStyle = `rgba(22, 24, 28, ${0.14 + rand() * 0.16})`;
    ctx.lineWidth = 0.8 + rand() * 1.4;
    bCtx.strokeStyle = 'rgba(32, 32, 32, 0.45)';
    bCtx.lineWidth = 1.0 + rand() * 1.8;

    ctx.beginPath();
    bCtx.beginPath();
    ctx.moveTo(x, y);
    bCtx.moveTo(x, y);
    for (let s = 0; s < 4; s++) {
      x += 18 + rand() * 38;
      y += (rand() - 0.5) * 14;
      ctx.lineTo(x, y);
      bCtx.lineTo(x, y);
    }
    ctx.stroke();
    bCtx.stroke();
  }

  // Quartz veins, pale coastal lichen & mineral grain
  for (let i = 0; i < 620; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 1 + rand() * 4.5;
    const pick = rand();
    ctx.fillStyle =
      pick < 0.24
        ? 'rgba(138, 132, 118, 0.24)'
        : pick < 0.42
          ? 'rgba(84, 96, 62, 0.22)'
          : pick < 0.54
            ? 'rgba(122, 92, 68, 0.20)'
            : 'rgba(24, 26, 30, 0.26)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    rockColor: configureTexture(cCol, true, anisotropy, 6, 6),
    rockBump: configureTexture(cBump, false, anisotropy, 6, 6),
  };
}

/**
 * Aged weathered red-terracotta & slate cottage roof tiles with subtle moss variation.
 */
function createRoofTextures(anisotropy: number) {
  const w = 256;
  const h = 256;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(4123);

  ctx.fillStyle = '#4e2e26';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#3c3c3c';
  bCtx.fillRect(0, 0, w, h);

  const rows = 14;
  const cols = 10;
  const rh = h / rows;
  const cw = w / cols;
  for (let r = 0; r < rows; r++) {
    const offset = (r % 2) * (cw * 0.5);
    for (let c = -1; c <= cols; c++) {
      const x = c * cw + offset;
      const y = r * rh;
      const slateMix = rand() < 0.22;
      const rr = slateMix ? 76 + Math.floor(rand() * 24) : 102 + Math.floor(rand() * 44);
      const gg = slateMix ? 72 + Math.floor(rand() * 20) : 54 + Math.floor(rand() * 26);
      const bb = slateMix ? 70 + Math.floor(rand() * 20) : 42 + Math.floor(rand() * 22);
      ctx.fillStyle = `rgb(${rr}, ${gg}, ${bb})`;
      ctx.fillRect(x + 1, y + 1, cw - 2, rh - 2);
      ctx.fillStyle = 'rgba(20, 12, 10, 0.36)';
      ctx.fillRect(x + 1, y + rh - 3, cw - 2, 2);

      const bv = 130 + Math.floor(rand() * 75);
      bCtx.fillStyle = `rgb(${bv}, ${bv}, ${bv})`;
      bCtx.fillRect(x + 1, y + 1, cw - 2, rh - 3);
    }
  }

  return {
    roofColor: configureTexture(cCol, true, anisotropy, 3, 2),
    roofBump: configureTexture(cBump, false, anisotropy, 3, 2),
  };
}

/**
 * Weathered salt-bleached timber planks for the wooden rowboat, doors & walkway posts.
 */
function createWoodTextures(anisotropy: number) {
  const w = 256;
  const h = 256;
  const [cCol, ctx] = makeCanvas(w, h);
  const [cBump, bCtx] = makeCanvas(w, h);
  const rand = seededRand(5501);

  ctx.fillStyle = '#5e4633';
  ctx.fillRect(0, 0, w, h);
  bCtx.fillStyle = '#787878';
  bCtx.fillRect(0, 0, w, h);

  const planks = 7;
  const ph = h / planks;
  for (let p = 0; p < planks; p++) {
    const y = p * ph;
    const tone = 84 + Math.floor(rand() * 34);
    ctx.fillStyle = `rgb(${tone + 18}, ${tone}, ${Math.max(20, tone - 18)})`;
    ctx.fillRect(0, y + 1, w, ph - 2);
    for (let g = 0; g < 18; g++) {
      const gy = y + 2 + rand() * (ph - 4);
      ctx.fillStyle = `rgba(34, 22, 14, ${0.15 + rand() * 0.2})`;
      ctx.fillRect(0, gy, w, 1.2);
      bCtx.fillStyle = `rgba(${100 + Math.floor(rand() * 90)}, ${100 + Math.floor(rand() * 90)}, ${100 + Math.floor(rand() * 90)}, 0.45)`;
      bCtx.fillRect(0, gy, w, 1.5);
    }
    ctx.fillStyle = '#251a12';
    ctx.fillRect(0, y, w, 2);
    bCtx.fillStyle = '#222222';
    bCtx.fillRect(0, y, w, 2);
  }

  return {
    woodColor: configureTexture(cCol, true, anisotropy, 2, 2),
    woodBump: configureTexture(cBump, false, anisotropy, 2, 2),
  };
}

/**
 * Soft radial mist/spray sprite texture (zero hard particle squares).
 */
function createSpraySprite(): THREE.CanvasTexture {
  const size = 128;
  const [c, ctx] = makeCanvas(size, size);
  const grad = ctx.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.04,
    size * 0.5,
    size * 0.5,
    size * 0.5
  );
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.90)');
  grad.addColorStop(0.35, 'rgba(236, 246, 252, 0.50)');
  grad.addColorStop(0.7, 'rgba(216, 232, 244, 0.14)');
  grad.addColorStop(1, 'rgba(216, 232, 244, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createProceduralTextures(
  renderer: THREE.WebGLRenderer
): ProceduralTextureSet {
  const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const { towerColor, towerBump } = createTowerTextures(anisotropy);
  const { stoneColor, stoneBump } = createStoneTextures(anisotropy);
  const { cottageStoneColor, cottageStoneBump } = createCottageStoneTextures(anisotropy);
  const { rockColor, rockBump } = createRockTextures(anisotropy);
  const { roofColor, roofBump } = createRoofTextures(anisotropy);
  const { woodColor, woodBump } = createWoodTextures(anisotropy);
  const spraySprite = createSpraySprite();

  return {
    towerColor,
    towerBump,
    stoneColor,
    stoneBump,
    cottageStoneColor,
    cottageStoneBump,
    rockColor,
    rockBump,
    roofColor,
    roofBump,
    woodColor,
    woodBump,
    spraySprite,
    dispose: () => {
      towerColor.dispose();
      towerBump.dispose();
      stoneColor.dispose();
      stoneBump.dispose();
      cottageStoneColor.dispose();
      cottageStoneBump.dispose();
      rockColor.dispose();
      rockBump.dispose();
      roofColor.dispose();
      roofBump.dispose();
      woodColor.dispose();
      woodBump.dispose();
      spraySprite.dispose();
    },
  };
}
