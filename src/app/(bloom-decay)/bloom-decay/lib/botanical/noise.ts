/**
 * Deterministic PRNG and coherent 2D value/FBM noise utilities for
 * paper fiber synthesis, watercolor ink diffusion fields, and organic petal variation.
 */

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next(): number {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hash2D(ix: number, iy: number, seed: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263) + Math.imul(seed, 1442695041);
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Coherent 2D smooth value noise in [0, 1].
 */
export function valueNoise2D(x: number, y: number, seed: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = fade(x - ix);
  const fy = fade(y - iy);

  const v00 = hash2D(ix, iy, seed);
  const v10 = hash2D(ix + 1, iy, seed);
  const v01 = hash2D(ix, iy + 1, seed);
  const v11 = hash2D(ix + 1, iy + 1, seed);

  return lerp(lerp(v00, v10, fx), lerp(v01, v11, fx), fy);
}

/**
 * Multi-octave fractal Brownian motion in [0, 1].
 */
export function fbm2D(
  x: number,
  y: number,
  seed: number,
  octaves = 4,
  lacunarity = 2.05,
  gain = 0.5
): number {
  let amplitude = 0.5;
  let frequency = 1.0;
  let sum = 0;
  let norm = 0;

  for (let i = 0; i < octaves; i++) {
    sum += amplitude * valueNoise2D(x * frequency, y * frequency, seed + i * 1013);
    norm += amplitude;
    frequency *= lacunarity;
    amplitude *= gain;
  }

  return norm > 0 ? sum / norm : 0.5;
}

/**
 * Domain-warped FBM for organic watercolor capillary tendrils and paper absorption contours.
 */
export function warpedFbm2D(x: number, y: number, seed: number, warpStrength = 0.65): number {
  const qx = fbm2D(x + 1.7, y + 9.2, seed + 17, 3) - 0.5;
  const qy = fbm2D(x + 8.3, y + 2.8, seed + 53, 3) - 0.5;
  return fbm2D(x + qx * warpStrength, y + qy * warpStrength, seed + 97, 4);
}

export interface DiffusionField {
  size: number;
  /** Normalized arrival threshold [0..1.4]: lower values saturate first */
  arrival: Float32Array;
  /** Fine granulation texture [0..1] for pigment pooling */
  granulation: Float32Array;
}

/**
 * Precomputes an irregular procedural pigment absorption field for an ink stain.
 * Pixels with arrival <= expansionThreshold are wet/pigmented.
 */
export function generateDiffusionField(
  size: number,
  seed: number,
  lobes = 5
): DiffusionField {
  const arrival = new Float32Array(size * size);
  const granulation = new Float32Array(size * size);
  const rng = mulberry32(seed);

  // Random lobe directions for organic asymmetrical capillary spreading
  const lobeAngles: number[] = [];
  const lobeWeights: number[] = [];
  for (let i = 0; i < lobes; i++) {
    lobeAngles.push(rng() * Math.PI * 2);
    lobeWeights.push(0.14 + rng() * 0.24);
  }

  const half = (size - 1) * 0.5;

  for (let y = 0; y < size; y++) {
    const ny = (y - half) / half;
    for (let x = 0; x < size; x++) {
      const nx = (x - half) / half;
      const dist = Math.hypot(nx, ny);
      const angle = Math.atan2(ny, nx);

      let lobeBias = 0;
      for (let i = 0; i < lobes; i++) {
        const d = Math.cos(angle - lobeAngles[i]);
        if (d > 0) {
          lobeBias += Math.pow(d, 3) * lobeWeights[i];
        }
      }

      // Coherent domain-warped paper absorption resistance
      const absorption = warpedFbm2D((nx + 1.5) * 2.5, (ny + 1.5) * 2.5, seed, 0.95);
      const fineEdge = fbm2D((nx + 2.0) * 6.8, (ny + 2.0) * 6.8, seed + 313, 3);
      const grain = fbm2D(x * 0.22, y * 0.22, seed + 709, 3);

      // Strong radial margin barrier ensures ink tendrils stay 100% organic and never clip to a square box
      const borderT = Math.max(0, (dist - 0.56) / 0.42);
      const borderBarrier = borderT * borderT * 1.45;

      // Arrival value: near 0 at center, ~0.55..1.05 at irregular organic lobes, >1.4 near square edges
      const rawArrival =
        dist * (1.18 - lobeBias * 0.85) +
        (absorption - 0.5) * 0.42 +
        (fineEdge - 0.5) * 0.16 +
        borderBarrier;
      const idx = y * size + x;
      arrival[idx] = Math.max(0, rawArrival);
      granulation[idx] = grain;
    }
  }

  return { size, arrival, granulation };
}
