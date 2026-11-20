'use client';

import * as THREE from 'three';
import { createSeededRandom } from './spaceSceneMath';

let cachedSoftwareGl: boolean | null = null;

/**
 * Probes WebGL2 renderer string (never user-agent) to detect CPU software
 * rasterizers (SwiftShader, llvmpipe, WARP). Used solely for rendering cost
 * (pixel ratio, antialiasing, frame pacing) without changing scene content.
 */
export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  if (cachedSoftwareGl !== null) return cachedSoftwareGl;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      cachedSoftwareGl = true;
      return true;
    }
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    cachedSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    return cachedSoftwareGl;
  } catch {
    cachedSoftwareGl = false;
    return false;
  }
}

/**
 * Fast 2D periodic value noise for seamless horizontal equirectangular textures.
 */
function createPeriodicNoise2D(seed: number, periodX: number) {
  const rand = createSeededRandom(seed);
  const perm = new Uint8Array(512);
  const vals = new Float32Array(256);
  for (let i = 0; i < 256; i++) {
    perm[i] = i;
    vals[i] = rand();
  }
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = perm[i];
    perm[i] = perm[j];
    perm[j] = tmp;
  }
  for (let i = 0; i < 256; i++) {
    perm[i + 256] = perm[i];
  }

  const hash = (x: number, y: number) => {
    const wx = ((x % periodX) + periodX) % periodX;
    const xi = wx & 255;
    const yi = ((y % 256) + 256) & 255;
    return vals[perm[(perm[xi] + yi) & 255]];
  };

  return (x: number, y: number) => {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = x - x0;
    const fy = y - y0;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);
    const a = hash(x0, y0);
    const b = hash(x0 + 1, y0);
    const c = hash(x0, y0 + 1);
    const d = hash(x0 + 1, y0 + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  };
}

function fbmPeriodic(
  noise: (x: number, y: number) => number,
  x: number,
  y: number,
  octaves = 4,
): number {
  let value = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < octaves; o++) {
    value += amp * noise(x * freq, y * freq);
    freq *= 2;
    amp *= 0.5;
  }
  return value;
}

export interface PlanetTextureSet {
  albedoMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  cloudMap: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Generates seamless equirectangular procedural textures for the hero exoplanet:
 * - Subtle atmospheric strata blending deep midnight-indigo, slate cerulean,
 *   silver mist, and muted champagne mineral bands.
 * - Calibrated bump & roughness variation for natural specular terminator contrast.
 */
export function createHeroPlanetTextures(maxAnisotropy = 4): PlanetTextureSet {
  const width = 1024;
  const height = 512;

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const albedoCtx = albedoCanvas.getContext('2d')!;
  const albedoImg = albedoCtx.createImageData(width, height);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bumpCtx.createImageData(width, height);

  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const roughCtx = roughCanvas.getContext('2d')!;
  const roughImg = roughCtx.createImageData(width, height);

  const noiseA = createPeriodicNoise2D(4093, 12);
  const noiseB = createPeriodicNoise2D(9187, 24);

  // Curated cinematic exoplanet palette (velvet obsidian-navy -> deep slate -> cerulean -> pale pearl mist -> warm sand highlight)
  const stops: Array<[number, [number, number, number]]> = [
    [0.0, [9, 15, 30]],
    [0.2, [16, 29, 54]],
    [0.38, [26, 49, 82]],
    [0.56, [48, 82, 118]],
    [0.72, [96, 128, 154]],
    [0.86, [166, 178, 188]],
    [0.95, [206, 194, 178]],
    [1.0, [228, 222, 212]],
  ];

  const samplePalette = (t: number): [number, number, number] => {
    const clamped = Math.max(0, Math.min(1, t));
    for (let i = 0; i < stops.length - 1; i++) {
      const [t0, c0] = stops[i];
      const [t1, c1] = stops[i + 1];
      if (clamped >= t0 && clamped <= t1) {
        const f = (clamped - t0) / (t1 - t0);
        return [
          c0[0] + (c1[0] - c0[0]) * f,
          c0[1] + (c1[1] - c0[1]) * f,
          c0[2] + (c1[2] - c0[2]) * f,
        ];
      }
    }
    return stops[stops.length - 1][1];
  };

  for (let py = 0; py < height; py++) {
    const v = py / height;
    const polarFade = Math.sin(v * Math.PI);
    const lat = (v - 0.5) * Math.PI;

    for (let px = 0; px < width; px++) {
      const u = px / width;
      const idx = (py * width + px) * 4;

      // Fine aerodynamic horizontal shear & subtle zonal cloud bands (no blobby tie-dye)
      const shear = fbmPeriodic(noiseA, u * 12, v * 10.0, 4);
      const fineEddy = fbmPeriodic(noiseB, u * 24 + shear * 2.1, v * 22.0, 4);

      const bandCoord =
        v * 11.5 +
        Math.sin(lat * 5.0) * 0.18 +
        (shear - 0.5) * 0.48 * polarFade +
        (fineEddy - 0.5) * 0.16;

      const primaryBands =
        0.5 +
        0.28 * Math.sin(bandCoord * Math.PI * 1.6) +
        0.14 * Math.cos(bandCoord * Math.PI * 3.8 + shear * 2.2) +
        0.08 * Math.sin(bandCoord * Math.PI * 7.5);

      const microStream = fbmPeriodic(
        noiseB,
        u * 24 + shear * 3.4,
        v * 34 + fineEddy * 0.9,
        3,
      );

      const elevation = Math.max(
        0,
        Math.min(
          1,
          primaryBands * 0.72 + microStream * 0.34 - (1 - polarFade) * 0.3,
        ),
      );

      const [r, g, b] = samplePalette(elevation);
      albedoImg.data[idx] = Math.round(r);
      albedoImg.data[idx + 1] = Math.round(g);
      albedoImg.data[idx + 2] = Math.round(b);
      albedoImg.data[idx + 3] = 255;

      const bumpByte = Math.round(
        Math.max(0, Math.min(255, (microStream * 0.65 + primaryBands * 0.35) * 255)),
      );
      bumpImg.data[idx] = bumpByte;
      bumpImg.data[idx + 1] = bumpByte;
      bumpImg.data[idx + 2] = bumpByte;
      bumpImg.data[idx + 3] = 255;

      // Subtle atmospheric sheen contrast
      const roughByte = Math.round(
        Math.max(135, Math.min(242, (0.58 + elevation * 0.34) * 255)),
      );
      roughImg.data[idx] = roughByte;
      roughImg.data[idx + 1] = roughByte;
      roughImg.data[idx + 2] = roughByte;
      roughImg.data[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(albedoImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);
  roughCtx.putImageData(roughImg, 0, 0);

  // Translucent wispy upper atmospheric cloud deck
  const cloudCanvas = document.createElement('canvas');
  cloudCanvas.width = 768;
  cloudCanvas.height = 384;
  const cloudCtx = cloudCanvas.getContext('2d')!;
  const cloudImg = cloudCtx.createImageData(768, 384);
  const cloudNoise = createPeriodicNoise2D(15823, 16);

  for (let py = 0; py < 384; py++) {
    const v = py / 384;
    const polar = Math.pow(Math.sin(v * Math.PI), 0.75);
    for (let px = 0; px < 768; px++) {
      const u = px / 768;
      const idx = (py * 768 + px) * 4;
      const w = fbmPeriodic(cloudNoise, u * 16, v * 12, 4);
      const streak = fbmPeriodic(cloudNoise, u * 16 + w * 2.8, v * 22.0, 4);
      const alpha = Math.max(0, Math.min(1, (streak - 0.48) * 2.15)) * polar;

      cloudImg.data[idx] = 222;
      cloudImg.data[idx + 1] = 236;
      cloudImg.data[idx + 2] = 252;
      cloudImg.data[idx + 3] = Math.round(alpha * 105);
    }
  }
  cloudCtx.putImageData(cloudImg, 0, 0);

  const anisotropy = Math.max(1, Math.min(maxAnisotropy, 8));

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.colorSpace = THREE.SRGBColorSpace;
  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.ClampToEdgeWrapping;
  albedoMap.anisotropy = anisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.anisotropy = anisotropy;

  const roughnessMap = new THREE.CanvasTexture(roughCanvas);
  roughnessMap.wrapS = THREE.RepeatWrapping;
  roughnessMap.wrapT = THREE.ClampToEdgeWrapping;
  roughnessMap.anisotropy = anisotropy;

  const cloudMap = new THREE.CanvasTexture(cloudCanvas);
  cloudMap.colorSpace = THREE.SRGBColorSpace;
  cloudMap.wrapS = THREE.RepeatWrapping;
  cloudMap.wrapT = THREE.ClampToEdgeWrapping;
  cloudMap.anisotropy = anisotropy;

  return {
    albedoMap,
    bumpMap,
    roughnessMap,
    cloudMap,
    dispose: () => {
      albedoMap.dispose();
      bumpMap.dispose();
      roughnessMap.dispose();
      cloudMap.dispose();
    },
  };
}

export interface MoonTextureSet {
  albedoMap: THREE.CanvasTexture;
  bumpMap: THREE.CanvasTexture;
  dispose: () => void;
}

/**
 * Generates procedural cratered mineral textures for the distant companion moon.
 */
export function createCompanionMoonTextures(maxAnisotropy = 4): MoonTextureSet {
  const width = 512;
  const height = 256;

  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const albedoCtx = albedoCanvas.getContext('2d')!;
  const albedoImg = albedoCtx.createImageData(width, height);

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d')!;
  const bumpImg = bumpCtx.createImageData(width, height);

  const noise = createPeriodicNoise2D(31247, 10);
  const rand = createSeededRandom(88421);

  const craters = Array.from({ length: 28 }, () => ({
    u: rand(),
    v: 0.16 + rand() * 0.68,
    r: 0.015 + Math.pow(rand(), 2.4) * 0.052,
    depth: 0.12 + rand() * 0.18,
  }));

  for (let py = 0; py < height; py++) {
    const v = py / height;
    for (let px = 0; px < width; px++) {
      const u = px / width;
      const idx = (py * width + px) * 4;

      let h = fbmPeriodic(noise, u * 10, v * 6.5, 4) * 0.68 + 0.24;

      for (let c = 0; c < craters.length; c++) {
        const cr = craters[c];
        let du = Math.abs(u - cr.u);
        if (du > 0.5) du = 1 - du;
        const dv = (v - cr.v) * 0.55;
        const d = Math.sqrt(du * du + dv * dv) / cr.r;
        if (d < 1.35) {
          if (d < 0.88) {
            const bowl = 1 - (d / 0.88) * (d / 0.88);
            h -= bowl * cr.depth;
          } else {
            const rim = Math.sin(((d - 0.88) / 0.47) * Math.PI);
            h += rim * cr.depth * 0.28;
          }
        }
      }

      const clamped = Math.max(0.12, Math.min(0.95, h));
      const baseLum = 56 + clamped * 92;
      albedoImg.data[idx] = Math.round(baseLum * 0.9);
      albedoImg.data[idx + 1] = Math.round(baseLum * 0.96);
      albedoImg.data[idx + 2] = Math.round(baseLum * 1.1);
      albedoImg.data[idx + 3] = 255;

      const bumpByte = Math.round(clamped * 255);
      bumpImg.data[idx] = bumpByte;
      bumpImg.data[idx + 1] = bumpByte;
      bumpImg.data[idx + 2] = bumpByte;
      bumpImg.data[idx + 3] = 255;
    }
  }

  albedoCtx.putImageData(albedoImg, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);

  const anisotropy = Math.max(1, Math.min(maxAnisotropy, 8));

  const albedoMap = new THREE.CanvasTexture(albedoCanvas);
  albedoMap.colorSpace = THREE.SRGBColorSpace;
  albedoMap.wrapS = THREE.RepeatWrapping;
  albedoMap.wrapT = THREE.ClampToEdgeWrapping;
  albedoMap.anisotropy = anisotropy;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.ClampToEdgeWrapping;
  bumpMap.anisotropy = anisotropy;

  return {
    albedoMap,
    bumpMap,
    dispose: () => {
      albedoMap.dispose();
      bumpMap.dispose();
    },
  };
}

/**
 * Sculpts an angular, organic displaced rock BufferGeometry for asteroid silhouettes
 * instead of using a raw unmodified primitive sphere or box.
 */
export function createSculptedAsteroidGeometry(seed = 2026): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(1, 2);
  const pos = geo.attributes.position;
  const rand = createSeededRandom(seed);

  const axes = Array.from({ length: 6 }, () => ({
    x: (rand() - 0.5) * 2,
    y: (rand() - 0.5) * 2,
    z: (rand() - 0.5) * 2,
    freq: 1.5 + rand() * 2.2,
    amp: 0.08 + rand() * 0.14,
  }));

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    let disp = 1.0;
    for (let a = 0; a < axes.length; a++) {
      const ax = axes[a];
      const dot = v.x * ax.x + v.y * ax.y + v.z * ax.z;
      disp += Math.sin(dot * ax.freq) * ax.amp;
    }
    // Slight faceted ridge flattening
    disp = Math.max(0.62, Math.min(1.34, disp));
    v.multiplyScalar(disp);
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}
