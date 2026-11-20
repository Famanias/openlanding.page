import { islandShoreSDF } from './island';
import { EffectiveEnvState } from './types';

export interface GerstnerWaveComponent {
  dirX: number;
  dirZ: number;
  steepness: number;
  wavelength: number;
  speed: number;
}

/**
 * Six multi-frequency Gerstner wave components (non-harmonic irrational wavelengths
 * to eliminate tiling repetition) shared identically between the CPU physics evaluator
 * and the GPU ocean vertex shader.
 */
export const GERSTNER_WAVES: GerstnerWaveComponent[] = [
  // Primary deep ocean swell rolling in from the west-southwest toward the cliffs
  { dirX: 0.91, dirZ: -0.41, steepness: 0.24, wavelength: 31.3, speed: 1.02 },
  // Secondary cross-swell creating varied irregular peaks & troughs
  { dirX: 0.72, dirZ: 0.69, steepness: 0.19, wavelength: 19.7, speed: 1.14 },
  // Medium coastal chop
  { dirX: 0.97, dirZ: 0.24, steepness: 0.15, wavelength: 12.1, speed: 1.28 },
  // Refracted cove cross-wave
  { dirX: 0.44, dirZ: -0.90, steepness: 0.13, wavelength: 7.9, speed: 1.44 },
  // Wind-driven short wave
  { dirX: 0.86, dirZ: -0.51, steepness: 0.10, wavelength: 4.85, speed: 1.64 },
  // Fine surface swell ripple
  { dirX: 0.23, dirZ: 0.97, steepness: 0.08, wavelength: 3.05, speed: 1.82 },
];

export interface OceanSample {
  x: number;
  y: number;
  z: number;
  dispX: number;
  dispZ: number;
  normalX: number;
  normalY: number;
  normalZ: number;
  slopeX: number;
  slopeZ: number;
  velocityY: number;
  foamFactor: number;
  crestFactor: number;
}

export interface OceanParams {
  time: number;
  amplitude: number; // wave amplitude multiplier (0.2..2.2)
  frequency: number; // wave frequency multiplier (0.5..1.8)
  waveSpeed?: number; // wave propagation speed multiplier (0.3..2.0)
  windDirX: number;
  windDirZ: number;
  windStrength: number;
  foamIntensity: number;
}

/**
 * Evaluates exact Gerstner wave displacement, analytical surface normal, local slope,
 * vertical surface velocity, and shoreline/crest foam factor at world coordinates (x, z).
 */
export function sampleOceanSurface(
  x: number,
  z: number,
  params: OceanParams
): OceanSample {
  const {
    time,
    amplitude,
    frequency,
    waveSpeed = 1.0,
    windDirX,
    windDirZ,
    windStrength,
    foamIntensity,
  } = params;

  let dispX = 0;
  let dispY = 0;
  let dispZ = 0;
  let velocityY = 0;

  // Partial derivatives for exact analytical normal (tangent T and binormal B)
  let tx = 1;
  let ty = 0;
  let tz = 0;

  let bx = 0;
  let by = 0;
  let bz = 1;

  const windBoost = 0.76 + Math.min(1.8, windStrength) * 0.27;
  const effectiveAmp = Math.max(0.05, amplitude * windBoost);
  const freqScale = Math.max(0.4, frequency);
  const speedScale = Math.max(0.15, waveSpeed);

  // Subtle shoreline shoaling: waves steepen slightly near cliffs and dampen inside solid rock
  const sdf = islandShoreSDF(x, z);
  const shoreShoal =
    sdf < 0
      ? Math.max(0.15, 1 + sdf * 0.2)
      : 1 + Math.exp(-sdf * 0.19) * 0.24;

  let jacobianAccum = 0;

  for (let i = 0; i < GERSTNER_WAVES.length; i++) {
    const w = GERSTNER_WAVES[i];
    const rawDx = w.dirX * 0.78 + windDirX * 0.22;
    const rawDz = w.dirZ * 0.78 + windDirZ * 0.22;
    const dLen = Math.hypot(rawDx, rawDz) || 1;
    const dx = rawDx / dLen;
    const dz = rawDz / dLen;

    const wavelength = w.wavelength / freqScale;
    const k = (2 * Math.PI) / wavelength;
    const c = Math.sqrt(9.8 / k) * w.speed * speedScale;

    // Keep steepness safely below wave-folding limit
    const q = Math.min(0.4, w.steepness * Math.min(1.65, effectiveAmp) * shoreShoal);
    const a = (q / k) * 0.88;

    const phase = k * (dx * x + dz * z - c * time);
    const cosP = Math.cos(phase);
    const sinP = Math.sin(phase);

    dispX += dx * (a * cosP);
    dispY += a * sinP;
    dispZ += dz * (a * cosP);
    // d(a * sin(k*(d.p - c*t))) / dt = -a * k * c * cos(phase)
    velocityY += -a * k * c * cosP;

    const wa = k * a;
    tx += -dx * dx * (wa * sinP);
    ty += dx * (wa * cosP);
    tz += -dx * dz * (wa * sinP);

    bx += -dx * dz * (wa * sinP);
    by += dz * (wa * cosP);
    bz += -dz * dz * (wa * sinP);

    jacobianAccum += Math.max(0, sinP) * q;
  }

  // Normal = normalize(B x T) so +Y points upward
  const nx = by * tz - bz * ty;
  const ny = bz * tx - bx * tz;
  const nz = bx * ty - by * tx;
  const nLen = Math.hypot(nx, ny, nz) || 1;

  const normalX = nx / nLen;
  const normalY = Math.max(0.001, Math.abs(ny / nLen));
  const normalZ = nz / nLen;

  const slopeX = -normalX / normalY;
  const slopeZ = -normalZ / normalY;

  const crestFactor = Math.max(0, Math.min(1, jacobianAccum * 0.95));

  // Localized shoreline foam band hugging rock contours & surging with breaking crests
  const surgePos = sdf - dispY * 1.15;
  const shoreWaveBand = Math.max(0, 1 - Math.abs(surgePos) / (2.2 + effectiveAmp * 0.85));
  const foamFactor = Math.max(
    0,
    Math.min(1, (shoreWaveBand * 1.1 + Math.pow(crestFactor, 2.3) * 0.8) * foamIntensity)
  );

  return {
    x: x + dispX,
    y: dispY,
    z: z + dispZ,
    dispX,
    dispZ,
    normalX,
    normalY,
    normalZ,
    slopeX,
    slopeZ,
    velocityY,
    foamFactor,
    crestFactor,
  };
}

/**
 * Samples wave height, normal, displacement, slope, and vertical velocity at exact
 * world (x, z) using 2-step fixed-point inversion of Gerstner horizontal displacement
 * so floating objects align tightly with the displaced GPU ocean mesh beneath them.
 */
export function sampleOceanAtWorldXZ(
  worldX: number,
  worldZ: number,
  params: OceanParams
): OceanSample {
  let sx = worldX;
  let sz = worldZ;
  let sample = sampleOceanSurface(sx, sz, params);
  for (let i = 0; i < 2; i++) {
    sx = worldX - (sample.x - sx);
    sz = worldZ - (sample.z - sz);
    sample = sampleOceanSurface(sx, sz, params);
  }
  return sample;
}

/**
 * Unified conceptual interface sampleOcean(position, time, weatherState)
 * bridging EffectiveEnvState directly to the shared CPU/GPU Gerstner wave model.
 */
export function sampleOcean(
  position: { x: number; z: number },
  time: number,
  weatherState: Pick<
    EffectiveEnvState,
    'waveAmplitude' | 'waveFrequency' | 'waveSpeed' | 'windDirX' | 'windDirZ' | 'windStrength' | 'foamIntensity'
  >
): OceanSample {
  return sampleOceanAtWorldXZ(position.x, position.z, {
    time,
    amplitude: weatherState.waveAmplitude,
    frequency: weatherState.waveFrequency,
    waveSpeed: weatherState.waveSpeed,
    windDirX: weatherState.windDirX,
    windDirZ: weatherState.windDirZ,
    windStrength: weatherState.windStrength,
    foamIntensity: weatherState.foamIntensity,
  });
}
