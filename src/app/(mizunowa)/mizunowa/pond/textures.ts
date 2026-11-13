import * as THREE from 'three/webgpu';

export type PondQuality = 'desktop' | 'mobile';

export interface PondTextureSuite {
  waterNormalA: THREE.DataTexture;
  waterNormalB: THREE.DataTexture;
  stoneAlbedo: THREE.CanvasTexture;
  stoneNormal: THREE.DataTexture;
  stoneRoughness: THREE.DataTexture;
  bedAlbedo: THREE.CanvasTexture;
  bedNormal: THREE.DataTexture;
  scaleNormal: THREE.DataTexture;
  finAlpha: THREE.CanvasTexture;
  barkAlbedo: THREE.CanvasTexture;
  barkNormal: THREE.DataTexture;
  blossomMap: THREE.CanvasTexture;
  petalMap: THREE.CanvasTexture;
  woodAlbedo: THREE.CanvasTexture;
  woodNormal: THREE.DataTexture;
  roofAlbedo: THREE.CanvasTexture;
  roofNormal: THREE.DataTexture;
  envEquirect: THREE.CanvasTexture;
  contactShadow: THREE.CanvasTexture;
  groundAlbedo: THREE.CanvasTexture;
  groundNormal: THREE.DataTexture;
  mossAlbedo: THREE.CanvasTexture;
  mossNormal: THREE.DataTexture;
  litterAlbedo: THREE.CanvasTexture;
  litterNormal: THREE.DataTexture;
  bambooAlbedo: THREE.CanvasTexture;
  bambooNormal: THREE.DataTexture;
  fernLeafMap: THREE.CanvasTexture;
  bambooLeafMap: THREE.CanvasTexture;
  broadLeafMap: THREE.CanvasTexture;
  grassBladeMap: THREE.CanvasTexture;
  understoryLeafMap: THREE.CanvasTexture;
  clayAlbedo: THREE.CanvasTexture;
  clayNormal: THREE.DataTexture;
  dispose: () => void;
}

function hash2D(ix: number, iy: number, seed: number): number {
  let n = (ix * 374761393 + iy * 668265263 + seed * 1442695041) | 0;
  n = (n ^ (n >>> 13)) * 1274126177;
  n = n ^ (n >>> 16);
  return (n >>> 0) / 4294967295;
}

function periodicNoise(u: number, v: number, period: number, seed: number): number {
  const x = u * period;
  const y = v * period;
  const ix0 = Math.floor(x);
  const iy0 = Math.floor(y);
  const fx = x - ix0;
  const fy = y - iy0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);

  const px0 = ((ix0 % period) + period) % period;
  const py0 = ((iy0 % period) + period) % period;
  const px1 = (px0 + 1) % period;
  const py1 = (py0 + 1) % period;

  const n00 = hash2D(px0, py0, seed);
  const n10 = hash2D(px1, py0, seed);
  const n01 = hash2D(px0, py1, seed);
  const n11 = hash2D(px1, py1, seed);

  const nx0 = n00 + (n10 - n00) * sx;
  const nx1 = n01 + (n11 - n01) * sx;
  return nx0 + (nx1 - nx0) * sy;
}

function periodicFbm(
  u: number,
  v: number,
  basePeriod: number,
  octaves: number,
  seed: number,
): number {
  let sum = 0;
  let amp = 0.5;
  let norm = 0;
  let period = basePeriod;
  for (let o = 0; o < octaves; o++) {
    sum += periodicNoise(u, v, period, seed + o * 97) * amp;
    norm += amp;
    amp *= 0.5;
    period *= 2;
  }
  return sum / norm;
}

function buildNormalTexture(
  size: number,
  heightField: Float32Array,
  strength: number,
  anisotropy: number,
): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size;
    const yp = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size;
      const xp = (x + 1) % size;

      const hL = heightField[y * size + xm];
      const hR = heightField[y * size + xp];
      const hD = heightField[ym * size + x];
      const hU = heightField[yp * size + x];

      const dx = (hL - hR) * strength;
      const dy = (hD - hU) * strength;
      const invLen = 1 / Math.hypot(dx, dy, 1);

      const idx = (y * size + x) * 4;
      data[idx] = Math.round((dx * invLen * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.round((dy * invLen * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.round((invLen * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = anisotropy;
  tex.needsUpdate = true;
  return tex;
}

function buildWaterNormal(
  size: number,
  seed: number,
  freqA: number,
  freqB: number,
  anisotropy: number,
): THREE.DataTexture {
  const heights = new Float32Array(size * size);
  const tau = Math.PI * 2;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Seamless directional swells + fine capillary wave interference
      const w1 = Math.sin(tau * (u * freqA + v * freqB) + 0.4 * Math.cos(tau * v * 2));
      const w2 = Math.sin(tau * (u * -freqB + v * (freqA + 1)) + 0.35 * Math.sin(tau * u * 3));
      const w3 = Math.cos(tau * (u * (freqA * 2 + 1) - v * (freqB * 2 - 1)));
      const micro = periodicFbm(u, v, 8, 4, seed);
      heights[y * size + x] = w1 * 0.34 + w2 * 0.28 + w3 * 0.16 + (micro - 0.5) * 0.65;
    }
  }
  return buildNormalTexture(size, heights, 3.2, anisotropy);
}

function buildStoneMaps(
  size: number,
  anisotropy: number,
): {
  albedo: THREE.CanvasTexture;
  normal: THREE.DataTexture;
  roughness: THREE.DataTexture;
} {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);
  const roughData = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const macro = periodicFbm(u, v, 4, 4, 101);
      const grain = periodicFbm(u, v, 18, 3, 202);
      const ridge = Math.abs(periodicFbm(u + macro * 0.12, v, 6, 3, 303) - 0.5) * 2;
      const crack = Math.max(0, 1 - ridge * 7.5);
      const mossPatch = Math.max(0, (periodicFbm(u, v, 3, 3, 404) - 0.56) * 2.4);

      const h = macro * 0.55 + grain * 0.35 - crack * 0.35;
      heights[y * size + x] = h;

      // Warm Kyoto granite base blended with mineral speckle & subtle olive moss
      let r = 136 + (macro - 0.5) * 58 + (grain - 0.5) * 42 - crack * 44;
      let g = 130 + (macro - 0.5) * 52 + (grain - 0.5) * 38 - crack * 40;
      let b = 114 + (macro - 0.5) * 44 + (grain - 0.5) * 34 - crack * 36;

      if (mossPatch > 0) {
        const m = Math.min(0.65, mossPatch);
        r = r * (1 - m) + 64 * m;
        g = g * (1 - m) + 92 * m;
        b = b * (1 - m) + 64 * m;
      }

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;

      const roughVal = Math.max(
        130,
        Math.min(248, Math.round((0.76 + (1 - grain) * 0.16 + crack * 0.1) * 255)),
      );
      roughData[idx] = roughVal;
      roughData[idx + 1] = roughVal;
      roughData[idx + 2] = roughVal;
      roughData[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  const roughness = new THREE.DataTexture(roughData, size, size, THREE.RGBAFormat);
  roughness.wrapS = THREE.RepeatWrapping;
  roughness.wrapT = THREE.RepeatWrapping;
  roughness.minFilter = THREE.LinearMipmapLinearFilter;
  roughness.generateMipmaps = true;
  roughness.colorSpace = THREE.NoColorSpace;
  roughness.anisotropy = anisotropy;
  roughness.needsUpdate = true;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.2, anisotropy),
    roughness,
  };
}

function buildPondBedMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base deep silty jade sand
  ctx.fillStyle = '#243c35';
  ctx.fillRect(0, 0, size, size);

  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const sand = periodicFbm(u, v, 14, 3, 701);
      const silt = periodicFbm(u, v, 4, 3, 709);
      heights[y * size + x] = sand * 0.25 + silt * 0.25;
    }
  }

  // Draw deterministic tiled river pebbles
  let seed = 88123;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const pebbleCount = Math.round((size * size) / 220);
  for (let i = 0; i < pebbleCount; i++) {
    const px = rand() * size;
    const py = rand() * size;
    const rx = (2.2 + rand() * 5.8) * (size / 256);
    const ry = rx * (0.62 + rand() * 0.34);
    const rot = rand() * Math.PI;
    const tone = rand();

    let r = 82;
    let g = 92;
    let b = 78;
    if (tone < 0.28) {
      r = 122;
      g = 118;
      b = 102;
    } else if (tone < 0.56) {
      r = 66;
      g = 80;
      b = 71;
    } else if (tone < 0.8) {
      r = 96;
      g = 101;
      b = 85;
    } else {
      r = 52;
      g = 72;
      b = 58;
    }

    // Wraparound draw for seamless tiling
    for (let ox = -1; ox <= 1; ox++) {
      for (let oy = -1; oy <= 1; oy++) {
        const cx = px + ox * size;
        const cy = py + oy * size;
        if (cx < -rx * 2 || cx > size + rx * 2 || cy < -rx * 2 || cy > size + rx * 2) continue;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Also stamp height dome for pebble normal relief
    const x0 = Math.floor(px - rx - 1);
    const x1 = Math.ceil(px + rx + 1);
    const y0 = Math.floor(py - rx - 1);
    const y1 = Math.ceil(py + rx + 1);
    const cosR = Math.cos(-rot);
    const sinR = Math.sin(-rot);
    for (let pyIdx = y0; pyIdx <= y1; pyIdx++) {
      const wy = ((pyIdx % size) + size) % size;
      const dy = pyIdx - py;
      for (let pxIdx = x0; pxIdx <= x1; pxIdx++) {
        const wx = ((pxIdx % size) + size) % size;
        const dx = pxIdx - px;
        const lx = (dx * cosR - dy * sinR) / rx;
        const ly = (dx * sinR + dy * cosR) / ry;
        const d2 = lx * lx + ly * ly;
        if (d2 < 1) {
          const dome = Math.sqrt(1 - d2) * 0.55;
          heights[wy * size + wx] = Math.max(heights[wy * size + wx], 0.35 + dome);
        }
      }
    }
  }

  // Soft olive algae veil pass
  const img = ctx.getImageData(0, 0, size, size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const algae = Math.max(0, (periodicFbm(u, v, 5, 3, 919) - 0.45) * 1.4);
      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(img.data[idx] * (1 - algae * 0.35) + 34 * algae * 0.35);
      img.data[idx + 1] = Math.round(img.data[idx + 1] * (1 - algae * 0.28) + 64 * algae * 0.28);
      img.data[idx + 2] = Math.round(img.data[idx + 2] * (1 - algae * 0.35) + 52 * algae * 0.35);
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.5, anisotropy),
  };
}

function buildKoiScaleNormal(size: number, anisotropy: number): THREE.DataTexture {
  const heights = new Float32Array(size * size);
  const cols = 22;
  const rows = 16;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const gx = u * cols;
      const gy = v * rows;
      const rowIdx = Math.floor(gy);
      const staggerX = gx + (rowIdx % 2 === 0 ? 0 : 0.5);
      const fx = staggerX - Math.floor(staggerX) - 0.5;
      const fy = gy - rowIdx - 0.5;
      const dist = Math.hypot(fx * 1.1, fy * 1.2);
      const scaleDome = Math.max(0, 1 - dist * 1.35);
      // Slight trailing edge rim
      heights[y * size + x] = Math.pow(scaleDome, 0.72) * 0.85;
    }
  }
  return buildNormalTexture(size, heights, 2.2, anisotropy);
}

function buildFinAlphaTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Fin ray lines running along U with soft scalloped membrane translucency
      const rays = 0.5 + 0.5 * Math.sin(v * Math.PI * 26);
      const taper = 1 - Math.pow(Math.max(0, Math.abs(v - 0.5) * 1.9), 2.2);
      const edgeFade = 1 - Math.pow(u, 2.5) * 0.45;
      const alpha = Math.max(0.18, Math.min(0.95, (0.52 + rays * 0.34) * taper * edgeFade));
      const shade = Math.round(225 + rays * 30);
      const idx = (y * size + x) * 4;
      img.data[idx] = shade;
      img.data[idx + 1] = shade;
      img.data[idx + 2] = Math.min(255, shade + 2);
      img.data[idx + 3] = Math.round(alpha * 255);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBarkMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const verticalFurrow = periodicFbm(u * 2.2, v * 0.35, 8, 4, 511);
      // Sakura cherry bark signature horizontal lenticel bands
      const lenticel = Math.pow(
        Math.max(0, Math.sin(v * Math.PI * 22 + periodicNoise(u, v, 4, 521) * 2.4)),
        6,
      );
      const fine = periodicFbm(u, v, 24, 2, 533);
      const h = verticalFurrow * 0.65 + fine * 0.25 - lenticel * 0.25;
      heights[y * size + x] = h;

      const base = 42 + verticalFurrow * 26 + fine * 12;
      const r = base * 1.15 + lenticel * 24;
      const g = base * 0.92 + lenticel * 16;
      const b = base * 0.86 + lenticel * 12;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.min(255, Math.round(r));
      img.data[idx + 1] = Math.min(255, Math.round(g));
      img.data[idx + 2] = Math.min(255, Math.round(b));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.8, anisotropy),
  };
}

function drawSingleSakuraBlossom(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  rot: number,
  pinkTint: number,
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);

  for (let p = 0; p < 5; p++) {
    ctx.save();
    ctx.rotate((p / 5) * Math.PI * 2);
    const grad = ctx.createRadialGradient(0, -radius * 0.15, 0, 0, -radius * 0.45, radius);
    const blush = Math.round(pinkTint * 20);
    grad.addColorStop(0, `rgba(${238 - blush}, ${188 - blush}, ${186 - blush}, 0.96)`);
    grad.addColorStop(0.45, `rgba(${248 - blush / 2}, ${220 - blush / 2}, ${218 - blush / 2}, 0.94)`);
    grad.addColorStop(1, 'rgba(253, 245, 242, 0.88)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.44, -radius * 0.28, -radius * 0.42, -radius * 0.86, -radius * 0.1, -radius * 0.96);
    // Authentic sakura petal apical notch
    ctx.lineTo(0, -radius * 0.82);
    ctx.lineTo(radius * 0.1, -radius * 0.96);
    ctx.bezierCurveTo(radius * 0.42, -radius * 0.86, radius * 0.44, -radius * 0.28, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  // Crimson-gold stamen heart
  ctx.fillStyle = '#9E3F32';
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.13, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(203, 148, 98, 0.85)';
  ctx.lineWidth = Math.max(0.8, radius * 0.045);
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * radius * 0.28, Math.sin(a) * radius * 0.28);
    ctx.stroke();
  }
  ctx.restore();
}

function buildBlossomClusterTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 4242;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Faint twig stems in center
  ctx.strokeStyle = 'rgba(65, 48, 42, 0.55)';
  ctx.lineWidth = size * 0.018;
  ctx.beginPath();
  ctx.moveTo(size * 0.25, size * 0.72);
  ctx.quadraticCurveTo(size * 0.5, size * 0.52, size * 0.75, size * 0.34);
  ctx.stroke();

  // Layered bouquet of 14 varied sakura blossoms leaving natural negative space
  for (let i = 0; i < 15; i++) {
    const angle = (i / 15) * Math.PI * 2 + rand() * 0.5;
    const dist = (0.06 + rand() * 0.27) * size;
    const cx = size * 0.5 + Math.cos(angle) * dist;
    const cy = size * 0.5 + Math.sin(angle) * dist;
    const r = (0.1 + rand() * 0.075) * size;
    drawSingleSakuraBlossom(ctx, cx, cy, r, rand() * Math.PI * 2, rand());
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildSinglePetalTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  const cx = size * 0.5;
  const cy = size * 0.85;
  const r = size * 0.74;
  const grad = ctx.createRadialGradient(cx, cy - r * 0.12, 0, cx, cy - r * 0.45, r);
  grad.addColorStop(0, '#D9A7A4');
  grad.addColorStop(0.45, '#F0D5D1');
  grad.addColorStop(1, '#FDF7F5');
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.bezierCurveTo(cx - r * 0.44, cy - r * 0.3, cx - r * 0.42, cy - r * 0.86, cx - r * 0.1, cy - r * 0.96);
  ctx.lineTo(cx, cy - r * 0.82);
  ctx.lineTo(cx + r * 0.1, cy - r * 0.96);
  ctx.bezierCurveTo(cx + r * 0.42, cy - r * 0.86, cx + r * 0.44, cy - r * 0.3, cx, cy);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildWoodMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const warp = periodicFbm(u, v, 3, 3, 611) * 0.35;
      const rings = Math.sin((u * 16 + warp * 8) * Math.PI * 2) * 0.5 + 0.5;
      const fiber = periodicFbm(u * 6, v * 0.4, 8, 3, 619);
      const h = rings * 0.5 + fiber * 0.5;
      heights[y * size + x] = h;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(138 + rings * 36 + (fiber - 0.5) * 20);
      img.data[idx + 1] = Math.round(104 + rings * 28 + (fiber - 0.5) * 16);
      img.data[idx + 2] = Math.round(72 + rings * 18 + (fiber - 0.5) * 12);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 2.6, anisotropy),
  };
}

function buildRoofTileMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  const cols = 12;
  const rows = 10;
  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      // Fluted curved Kawara tile ribs + overlapping horizontal courses
      const colPhase = (u * cols) % 1;
      const rib = Math.cos((colPhase - 0.5) * Math.PI * 2) * 0.5 + 0.5;
      const rowPhase = (v * rows) % 1;
      const overlap = 1 - rowPhase * 0.72;
      const weather = periodicFbm(u, v, 6, 3, 733);
      const h = rib * 0.55 + overlap * 0.35 + (weather - 0.5) * 0.14;
      heights[y * size + x] = h;

      const shade = 38 + rib * 16 + overlap * 10 + (weather - 0.5) * 14;
      const idx = (y * size + x) * 4;
      img.data[idx] = Math.round(shade * 0.96);
      img.data[idx + 1] = Math.round(shade * 1.03);
      img.data[idx + 2] = Math.round(shade * 1.02);
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.4, anisotropy),
  };
}

function buildMorningGardenEquirect(): THREE.CanvasTexture {
  const w = 512;
  const h = 256;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;

  // Misty early-morning sky zenith-to-forest horizon gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
  skyGrad.addColorStop(0.0, '#6B897E');
  skyGrad.addColorStop(0.24, '#9DB3A4');
  skyGrad.addColorStop(0.45, '#DCE2D1');
  skyGrad.addColorStop(0.51, '#263E2C');
  skyGrad.addColorStop(1.0, '#0F1C14');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, w, h);

  // Warm upper-right morning sun glow matching diagonal forest sunbeams
  const sunX = w * 0.72;
  const sunY = h * 0.24;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 6, sunX, sunY, 155);
  sunGrad.addColorStop(0, 'rgba(255, 249, 226, 0.96)');
  sunGrad.addColorStop(0.28, 'rgba(247, 232, 194, 0.54)');
  sunGrad.addColorStop(1, 'rgba(247, 232, 194, 0)');
  ctx.fillStyle = sunGrad;
  ctx.fillRect(0, 0, w, h);

  // Soft misty bamboo horizon band
  const mistGrad = ctx.createLinearGradient(0, h * 0.36, 0, h * 0.56);
  mistGrad.addColorStop(0, 'rgba(220, 228, 212, 0)');
  mistGrad.addColorStop(0.55, 'rgba(216, 224, 206, 0.42)');
  mistGrad.addColorStop(1, 'rgba(38, 62, 44, 0.72)');
  ctx.fillStyle = mistGrad;
  ctx.fillRect(0, h * 0.36, w, h * 0.22);

  // Right-side sakura blossom canopy silhouette reflected softly on pond surface
  ctx.fillStyle = 'rgba(232, 190, 200, 0.38)';
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    ctx.ellipse(
      w * 0.58 + (i % 5) * 28,
      h * 0.33 + Math.floor(i / 5) * 14,
      26,
      13,
      -0.18,
      0,
      Math.PI * 2,
    );
    ctx.fill();
  }

  // Soft forest foliage & shrine reflection silhouettes toward upper-left-back
  ctx.fillStyle = 'rgba(30, 46, 30, 0.55)';
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.ellipse(w * 0.14 + i * 28, h * 0.45 + (i % 3) * 8, 30, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildContactShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(
    size / 2,
    size / 2,
    size * 0.04,
    size / 2,
    size / 2,
    size * 0.5,
  );
  grad.addColorStop(0, 'rgba(8, 20, 18, 0.78)');
  grad.addColorStop(0.55, 'rgba(8, 20, 18, 0.32)');
  grad.addColorStop(1, 'rgba(8, 20, 18, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildGardenGroundMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const macro = periodicFbm(u, v, 3, 4, 1201);
      const grain = periodicFbm(u, v, 14, 3, 1307);
      const pebbles = Math.max(0, (periodicFbm(u + 0.31, v - 0.19, 22, 2, 1409) - 0.62) * 2.6);
      const needleLitter = Math.max(
        0,
        (periodicFbm(u * 2.1, v * 0.8, 12, 3, 1511) - 0.56) * 2.2,
      );

      const h = macro * 0.38 + grain * 0.36 + pebbles * 0.32 - needleLitter * 0.1;
      heights[y * size + x] = h;

      // Rich damp forest umber loam with warm earth flecks & tiny mineral grit
      let r = 58 + macro * 28 + (grain - 0.5) * 24;
      let g = 51 + macro * 22 + (grain - 0.5) * 18;
      let b = 38 + macro * 15 + (grain - 0.5) * 14;

      if (needleLitter > 0) {
        const w = Math.min(0.62, needleLitter);
        r = r * (1 - w) + 92 * w;
        g = g * (1 - w) + 74 * w;
        b = b * (1 - w) + 50 * w;
      }

      if (pebbles > 0) {
        const pw = Math.min(0.55, pebbles);
        r = r * (1 - pw) + 118 * pw;
        g = g * (1 - pw) + 114 * pw;
        b = b * (1 - pw) + 102 * pw;
      }

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.4, anisotropy),
  };
}

function buildLitterGravelMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const bed = periodicFbm(u, v, 4, 3, 2701);
      const grit = periodicFbm(u, v, 24, 3, 2803);
      const chip = Math.max(0, (periodicFbm(u + 0.14, v + 0.27, 30, 2, 2909) - 0.55) * 2.4);
      const h = bed * 0.28 + grit * 0.42 + chip * 0.38;
      heights[y * size + x] = h;

      // Compacted warm Kyoto Shirakawa decomposed granite gravel & fallen dry litter tones
      let r = 104 + (bed - 0.5) * 28 + (grit - 0.5) * 34 + chip * 32;
      let g = 97 + (bed - 0.5) * 25 + (grit - 0.5) * 30 + chip * 28;
      let b = 81 + (bed - 0.5) * 22 + (grit - 0.5) * 26 + chip * 22;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Scatter subtle fallen dry bamboo/sakura leaf wisps onto litter map
  let seed = 5519;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const leafCount = Math.round((size * size) / 480);
  for (let i = 0; i < leafCount; i++) {
    const cx = rand() * size;
    const cy = rand() * size;
    const len = (3.5 + rand() * 7.5) * (size / 256);
    const wid = len * (0.18 + rand() * 0.12);
    const rot = rand() * Math.PI * 2;
    const tone = rand();
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.fillStyle =
      tone > 0.65
        ? 'rgba(132, 102, 64, 0.58)'
        : tone > 0.3
          ? 'rgba(98, 86, 54, 0.52)'
          : 'rgba(154, 134, 96, 0.45)';
    ctx.beginPath();
    ctx.ellipse(0, 0, len, wid, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 4.8, anisotropy),
  };
}

function buildBambooMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const fiber = periodicFbm(u * 6, v * 0.4, 8, 3, 1709);
      const patina = periodicFbm(u, v, 4, 3, 1811);
      // Horizontal culm node rings
      const nodeDist = Math.abs(((v * 3) % 1) - 0.5);
      const nodeRing = Math.exp(-nodeDist * nodeDist * 380);
      heights[y * size + x] = fiber * 0.35 + nodeRing * 0.55;

      const warmOlive = 1 - nodeRing * 0.42;
      const r = (92 + fiber * 36 + (patina - 0.5) * 28) * warmOlive;
      const g = (108 + fiber * 34 + (patina - 0.5) * 24) * warmOlive;
      const b = (66 + fiber * 22 + (patina - 0.5) * 18) * warmOlive;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 2.8, anisotropy),
  };
}

function buildMossCushionMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const clump = periodicFbm(u, v, 4, 3, 2101);
      const cushion = periodicFbm(u, v, 11, 3, 2203);
      const tuft = periodicFbm(u, v, 28, 2, 2309);
      const crevice = Math.max(0, 1 - clump * 2.1);

      const h = clump * 0.45 + cushion * 0.35 + tuft * 0.25 - crevice * 0.28;
      heights[y * size + x] = h;

      // Rich layered Kyoto moss: deep emerald crevices -> olive cushions -> warm chartreuse tips
      const warmth = Math.max(0, (cushion - 0.38) * 1.45) + (tuft - 0.45) * 0.48;
      const r = 74 + warmth * 82 + clump * 34 - crevice * 28;
      const g = 112 + warmth * 86 + clump * 42 - crevice * 34;
      const b = 52 + warmth * 28 + clump * 20 - crevice * 16;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(r)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(g)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 5.2, anisotropy),
  };
}

function buildFernLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  ctx.strokeStyle = '#7E984C';
  ctx.lineWidth = Math.max(2, size * 0.022);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.96);
  ctx.quadraticCurveTo(size * 0.51, size * 0.48, size * 0.5, size * 0.05);
  ctx.stroke();

  const pairCount = 15;
  for (let i = 0; i < pairCount; i++) {
    const t = i / (pairCount - 1);
    const y = size * (0.9 - t * 0.82);
    const widthFactor = Math.sin(Math.pow(1 - t, 0.72) * Math.PI * 0.88 + 0.12);
    const span = size * (0.1 + 0.34 * widthFactor) * (1 - t * 0.25);
    const bladeH = size * (0.044 * (1 - t * 0.45));

    for (const dir of [-1, 1]) {
      ctx.save();
      ctx.translate(size * 0.5, y + (dir === 1 ? 0 : -size * 0.014));
      ctx.rotate(dir * (-0.28 + t * 0.14));

      const grad = ctx.createLinearGradient(0, 0, dir * span, -bladeH);
      grad.addColorStop(0, '#5E7F3B');
      grad.addColorStop(0.55, '#86A852');
      grad.addColorStop(1, '#ABC76E');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(dir * span * 0.48, -bladeH * 1.15, dir * span, -bladeH * 0.22);
      ctx.quadraticCurveTo(dir * span * 0.48, bladeH * 0.72, 0, bladeH * 0.28);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBambooLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 7319;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  ctx.strokeStyle = 'rgba(84, 102, 58, 0.9)';
  ctx.lineWidth = Math.max(1.5, size * 0.014);
  ctx.beginPath();
  ctx.moveTo(size * 0.14, size * 0.88);
  ctx.quadraticCurveTo(size * 0.48, size * 0.56, size * 0.82, size * 0.24);
  ctx.stroke();

  const anchors: Array<[number, number, number]> = [
    [0.28, 0.72, 5],
    [0.45, 0.56, 6],
    [0.62, 0.42, 6],
    [0.74, 0.28, 5],
    [0.52, 0.36, 4],
  ];

  for (const [ax, ay, leaves] of anchors) {
    for (let i = 0; i < leaves; i++) {
      const ang = -Math.PI * 0.88 + (i / Math.max(1, leaves - 1)) * Math.PI * 0.95 + (rand() - 0.5) * 0.24;
      const len = size * (0.2 + rand() * 0.14);
      const wid = size * (0.03 + rand() * 0.014);

      ctx.save();
      ctx.translate(ax * size, ay * size);
      ctx.rotate(ang);
      const grad = ctx.createLinearGradient(0, 0, len, 0);
      grad.addColorStop(0, '#6B8646');
      grad.addColorStop(0.6, '#8CA85C');
      grad.addColorStop(1, '#B3C97C');
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(len * 0.38, -wid, len, 0);
      ctx.quadraticCurveTo(len * 0.38, wid, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildBroadLeafTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 9187;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  ctx.strokeStyle = 'rgba(66, 54, 40, 0.78)';
  ctx.lineWidth = Math.max(1.5, size * 0.015);
  ctx.beginPath();
  ctx.moveTo(size * 0.5, size * 0.94);
  ctx.quadraticCurveTo(size * 0.46, size * 0.52, size * 0.52, size * 0.18);
  ctx.stroke();

  for (let i = 0; i < 20; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = (0.05 + Math.pow(rand(), 0.75) * 0.31) * size;
    const cx = size * 0.5 + Math.cos(angle) * dist;
    const cy = size * 0.48 + Math.sin(angle) * dist * 0.86;
    const r = (0.078 + rand() * 0.062) * size;
    const warmTip = rand();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rand() * Math.PI * 2);
    const fillHex =
      warmTip > 0.72 ? '#B88450' : warmTip > 0.38 ? '#7CA14F' : '#5B7C3B';
    ctx.fillStyle = fillHex;
    ctx.beginPath();
    for (let l = 0; l < 5; l++) {
      const la = (l / 5) * Math.PI * 2 - Math.PI / 2;
      const tipX = Math.cos(la) * r;
      const tipY = Math.sin(la) * r;
      const midA = la + Math.PI / 5;
      const valleyX = Math.cos(midA) * r * 0.36;
      const valleyY = Math.sin(midA) * r * 0.36;
      if (l === 0) ctx.moveTo(tipX, tipY);
      else ctx.lineTo(tipX, tipY);
      ctx.lineTo(valleyX, valleyY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildGrassBladeTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 4817;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Dense multi-blade fine sedge / mondo-grass fan with tapered tips and natural color gradients
  const bladeCount = 26;
  for (let i = 0; i < bladeCount; i++) {
    const t = i / (bladeCount - 1);
    const bx = size * (0.28 + t * 0.44 + (rand() - 0.5) * 0.05);
    const by = size * 0.98;
    const tipX = size * (0.06 + t * 0.88 + (rand() - 0.5) * 0.14);
    const tipY = size * (0.08 + Math.abs(t - 0.5) * 0.34 + rand() * 0.18);
    const ctrlX = (bx + tipX) * 0.5 + (tipX - size * 0.5) * 0.18;
    const ctrlY = (by + tipY) * 0.46;
    const baseW = size * (0.016 + rand() * 0.012);

    const grad = ctx.createLinearGradient(bx, by, tipX, tipY);
    grad.addColorStop(0, '#435E2B');
    grad.addColorStop(0.45, rand() > 0.4 ? '#6E8F43' : '#5B7C38');
    grad.addColorStop(1, rand() > 0.5 ? '#9EBA68' : '#8AA856');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(bx - baseW, by);
    ctx.quadraticCurveTo(ctrlX - baseW * 0.45, ctrlY, tipX, tipY);
    ctx.quadraticCurveTo(ctrlX + baseW * 0.45, ctrlY, bx + baseW, by);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildUnderstoryClumpTexture(size: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, size, size);

  let seed = 6421;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Shaded Japanese forest-floor broadleaf / wild-ginger / dwarf bamboo cluster
  const leaves = 18;
  for (let i = 0; i < leaves; i++) {
    const a = -Math.PI * 0.92 + (i / (leaves - 1)) * Math.PI * 0.84 + (rand() - 0.5) * 0.2;
    const len = size * (0.28 + rand() * 0.34);
    const wid = len * (0.24 + rand() * 0.12);
    const ox = size * (0.36 + rand() * 0.28);
    const oy = size * (0.86 + rand() * 0.08);

    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate(a + Math.PI * 0.5);
    const grad = ctx.createLinearGradient(0, 0, 0, -len);
    grad.addColorStop(0, '#445E2D');
    grad.addColorStop(0.55, rand() > 0.4 ? '#688A3F' : '#587735');
    grad.addColorStop(1, '#8FAE58');
    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-wid, -len * 0.45, 0, -len);
    ctx.quadraticCurveTo(wid, -len * 0.45, 0, 0);
    ctx.fill();

    ctx.strokeStyle = 'rgba(176, 204, 118, 0.42)';
    ctx.lineWidth = Math.max(1, size * 0.008);
    ctx.beginPath();
    ctx.moveTo(0, -len * 0.08);
    ctx.lineTo(0, -len * 0.85);
    ctx.stroke();
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildClayMaps(
  size: number,
  anisotropy: number,
): { albedo: THREE.CanvasTexture; normal: THREE.DataTexture } {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const img = ctx.createImageData(size, size);
  const heights = new Float32Array(size * size);

  for (let y = 0; y < size; y++) {
    const v = y / size;
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const wheel = Math.sin(v * Math.PI * 28) * 0.5 + 0.5;
      const speckle = periodicFbm(u, v, 14, 3, 2503);
      const glazeFlow = Math.max(0, 1 - v * 1.45);
      const h = wheel * 0.25 + speckle * 0.45;
      heights[y * size + x] = h;

      // Warm glazed Kyoto Shigaraki stoneware terracotta
      const baseR = 138 + (speckle - 0.5) * 44 + wheel * 12 - glazeFlow * 26;
      const baseG = 112 + (speckle - 0.5) * 36 + wheel * 10 - glazeFlow * 18;
      const baseB = 86 + (speckle - 0.5) * 28 + wheel * 8 - glazeFlow * 14;

      const idx = (y * size + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, Math.round(baseR)));
      img.data[idx + 1] = Math.max(0, Math.min(255, Math.round(baseG)));
      img.data[idx + 2] = Math.max(0, Math.min(255, Math.round(baseB)));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const albedo = new THREE.CanvasTexture(canvas);
  albedo.wrapS = THREE.RepeatWrapping;
  albedo.wrapT = THREE.RepeatWrapping;
  albedo.colorSpace = THREE.SRGBColorSpace;
  albedo.anisotropy = anisotropy;

  return {
    albedo,
    normal: buildNormalTexture(size, heights, 3.0, anisotropy),
  };
}

export function createPondTextureSuite(
  quality: PondQuality,
  maxAnisotropy = 4,
): PondTextureSuite {
  const aniso = Math.max(1, Math.min(maxAnisotropy, quality === 'desktop' ? 8 : 2));
  const waterSize = quality === 'desktop' ? 512 : 256;
  const stoneSize = quality === 'desktop' ? 512 : 256;
  const bedSize = quality === 'desktop' ? 512 : 256;
  const detailSize = quality === 'desktop' ? 256 : 128;

  const waterNormalA = buildWaterNormal(waterSize, 17, 2, 3, aniso);
  const waterNormalB = buildWaterNormal(waterSize, 83, 4, -3, aniso);
  const stone = buildStoneMaps(stoneSize, aniso);
  const bed = buildPondBedMaps(bedSize, aniso);
  const scaleNormal = buildKoiScaleNormal(detailSize, aniso);
  const finAlpha = buildFinAlphaTexture(128);
  const bark = buildBarkMaps(detailSize, aniso);
  const blossomMap = buildBlossomClusterTexture(detailSize);
  const petalMap = buildSinglePetalTexture(128);
  const wood = buildWoodMaps(detailSize, aniso);
  const roof = buildRoofTileMaps(detailSize, aniso);
  const envEquirect = buildMorningGardenEquirect();
  const contactShadow = buildContactShadowTexture();
  const ground = buildGardenGroundMaps(stoneSize, aniso);
  const moss = buildMossCushionMaps(detailSize, aniso);
  const litter = buildLitterGravelMaps(detailSize, aniso);
  const bamboo = buildBambooMaps(detailSize, aniso);
  const fernLeafMap = buildFernLeafTexture(detailSize);
  const bambooLeafMap = buildBambooLeafTexture(detailSize);
  const broadLeafMap = buildBroadLeafTexture(detailSize);
  const grassBladeMap = buildGrassBladeTexture(detailSize);
  const understoryLeafMap = buildUnderstoryClumpTexture(detailSize);
  const clay = buildClayMaps(detailSize, aniso);

  const all = [
    waterNormalA,
    waterNormalB,
    stone.albedo,
    stone.normal,
    stone.roughness,
    bed.albedo,
    bed.normal,
    scaleNormal,
    finAlpha,
    bark.albedo,
    bark.normal,
    blossomMap,
    petalMap,
    wood.albedo,
    wood.normal,
    roof.albedo,
    roof.normal,
    envEquirect,
    contactShadow,
    ground.albedo,
    ground.normal,
    moss.albedo,
    moss.normal,
    litter.albedo,
    litter.normal,
    bamboo.albedo,
    bamboo.normal,
    fernLeafMap,
    bambooLeafMap,
    broadLeafMap,
    grassBladeMap,
    understoryLeafMap,
    clay.albedo,
    clay.normal,
  ];

  return {
    waterNormalA,
    waterNormalB,
    stoneAlbedo: stone.albedo,
    stoneNormal: stone.normal,
    stoneRoughness: stone.roughness,
    bedAlbedo: bed.albedo,
    bedNormal: bed.normal,
    scaleNormal,
    finAlpha,
    barkAlbedo: bark.albedo,
    barkNormal: bark.normal,
    blossomMap,
    petalMap,
    woodAlbedo: wood.albedo,
    woodNormal: wood.normal,
    roofAlbedo: roof.albedo,
    roofNormal: roof.normal,
    envEquirect,
    contactShadow,
    groundAlbedo: ground.albedo,
    groundNormal: ground.normal,
    mossAlbedo: moss.albedo,
    mossNormal: moss.normal,
    litterAlbedo: litter.albedo,
    litterNormal: litter.normal,
    bambooAlbedo: bamboo.albedo,
    bambooNormal: bamboo.normal,
    fernLeafMap,
    bambooLeafMap,
    broadLeafMap,
    grassBladeMap,
    understoryLeafMap,
    clayAlbedo: clay.albedo,
    clayNormal: clay.normal,
    dispose: () => {
      for (const tex of all) {
        tex.dispose();
      }
    },
  };
}
