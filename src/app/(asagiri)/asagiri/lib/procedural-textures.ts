import * as THREE from 'three';
import { createSeededRandom } from './webgl-utils';

export interface ProceduralTextureSet {
  graniteBump: THREE.CanvasTexture | null;
  vermilionWoodMap: THREE.CanvasTexture | null;
  vermilionBump: THREE.CanvasTexture | null;
  barkBump: THREE.CanvasTexture | null;
  contactShadowMap: THREE.CanvasTexture | null;
  dispose: () => void;
}

function configureRepeatTexture(
  canvas: HTMLCanvasElement,
  repeatX: number,
  repeatY: number,
  isColor: boolean,
  anisotropy = 4
): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeatX, repeatY);
  tex.colorSpace = isColor ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = anisotropy;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Tileable speckled Kurama granite stone micro-relief bump texture.
 */
function buildGraniteBumpTexture(anisotropy: number): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rng = createSeededRandom(44109);
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, size, size);

  // Broad weathered mineral clouds
  for (let i = 0; i < 180; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 6 + rng() * 22;
    const v = Math.floor(96 + rng() * 64);
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(${v},${v},${v},0.35)`);
    grad.addColorStop(1, `rgba(${v},${v},${v},0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fine granite grain speckles
  for (let i = 0; i < 2400; i++) {
    const x = Math.floor(rng() * size);
    const y = Math.floor(rng() * size);
    const shade = rng() > 0.5 ? Math.floor(155 + rng() * 75) : Math.floor(45 + rng() * 65);
    ctx.fillStyle = `rgba(${shade},${shade},${shade},0.48)`;
    ctx.fillRect(x, y, 1 + Math.floor(rng() * 2), 1 + Math.floor(rng() * 2));
  }

  return configureRepeatTexture(canvas, 3, 3, false, anisotropy);
}

/**
 * Muted weathered vermilion wood lacquer texture + bump map for the Torii gate.
 */
function buildVermilionTextures(anisotropy: number): {
  map: THREE.CanvasTexture | null;
  bump: THREE.CanvasTexture | null;
} {
  if (typeof document === 'undefined') return { map: null, bump: null };
  const size = 256;

  // Albedo canvas
  const albedo = document.createElement('canvas');
  albedo.width = size;
  albedo.height = size;
  const ctx = albedo.getContext('2d');

  // Bump canvas
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d');

  if (!ctx || !bCtx) return { map: null, bump: null };

  const rng = createSeededRandom(82311);

  // Restrained, atmospheric weathered vermilion base (not cartoonish neon red)
  ctx.fillStyle = '#9C3E35';
  ctx.fillRect(0, 0, size, size);
  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  // Subtle vertical cedar wood grain streaks & paint weathering
  for (let i = 0; i < 220; i++) {
    const x = rng() * size;
    const w = 1 + rng() * 3.5;
    const darker = rng() > 0.45;
    ctx.fillStyle = darker
      ? `rgba(112, 39, 34, ${0.08 + rng() * 0.14})`
      : `rgba(182, 86, 72, ${0.06 + rng() * 0.11})`;
    ctx.fillRect(x, 0, w, size);

    const bv = darker ? 102 : 148;
    bCtx.fillStyle = `rgba(${bv},${bv},${bv},0.28)`;
    bCtx.fillRect(x, 0, w, size);
  }

  // Subtle aged patina blotches near lower weathered paint
  for (let i = 0; i < 65; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const r = 8 + rng() * 24;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, `rgba(68, 34, 34, ${0.06 + rng() * 0.08})`);
    grad.addColorStop(1, 'rgba(68, 34, 34, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  return {
    map: configureRepeatTexture(albedo, 1, 2, true, anisotropy),
    bump: configureRepeatTexture(bumpCanvas, 1, 2, false, anisotropy),
  };
}

/**
 * Japanese cherry (sakura) horizontal lenticel bark bump map.
 */
function buildSakuraBarkBumpTexture(anisotropy: number): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const rng = createSeededRandom(19551);
  ctx.fillStyle = '#7E7E7E';
  ctx.fillRect(0, 0, size, size);

  // Subtle longitudinal crevices
  for (let i = 0; i < 90; i++) {
    const x = rng() * size;
    ctx.fillStyle = `rgba(60,60,60,${0.12 + rng() * 0.18})`;
    ctx.fillRect(x, 0, 1 + rng() * 2, size);
  }

  // Characteristic horizontal sakura lenticel bands
  for (let i = 0; i < 240; i++) {
    const x = rng() * size;
    const y = rng() * size;
    const len = 10 + rng() * 34;
    const h = 1.5 + rng() * 2.5;
    const light = rng() > 0.35;
    ctx.fillStyle = light
      ? `rgba(176,176,176,${0.25 + rng() * 0.25})`
      : `rgba(52,52,52,${0.22 + rng() * 0.25})`;
    ctx.fillRect(x, y, len, h);
  }

  return configureRepeatTexture(canvas, 2, 4, false, anisotropy);
}

/**
 * Soft radial contact-shadow disc texture for grounding Torii columns, lantern base, and rocks.
 */
function buildContactShadowTexture(): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') return null;
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const grad = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
  grad.addColorStop(0, 'rgba(10, 16, 24, 0.72)');
  grad.addColorStop(0.48, 'rgba(10, 16, 24, 0.34)');
  grad.addColorStop(0.8, 'rgba(10, 16, 24, 0.08)');
  grad.addColorStop(1, 'rgba(10, 16, 24, 0.0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function createProceduralTextureSet(maxAnisotropy = 4): ProceduralTextureSet {
  const anisotropy = Math.max(1, Math.min(8, maxAnisotropy));
  const graniteBump = buildGraniteBumpTexture(anisotropy);
  const { map: vermilionWoodMap, bump: vermilionBump } = buildVermilionTextures(anisotropy);
  const barkBump = buildSakuraBarkBumpTexture(anisotropy);
  const contactShadowMap = buildContactShadowTexture();

  return {
    graniteBump,
    vermilionWoodMap,
    vermilionBump,
    barkBump,
    contactShadowMap,
    dispose: () => {
      graniteBump?.dispose();
      vermilionWoodMap?.dispose();
      vermilionBump?.dispose();
      barkBump?.dispose();
      contactShadowMap?.dispose();
    },
  };
}
