export type QualityPreset = 'auto' | 'high' | 'medium' | 'low';

export interface DitherCityPalette {
  nearBlack: string;
  charcoal: string;
  darkGray: string;
  agedPaper: string;
  boneWhite: string;
  acidGreen: string;
}

export const PALETTE: DitherCityPalette = {
  nearBlack: '#0A0B09',
  charcoal: '#232520',
  darkGray: '#50524A',
  agedPaper: '#D3D0BA',
  boneWhite: '#EEEBD8',
  acidGreen: '#A8F23A',
};

export interface DitherCitySettings {
  motionEnabled: boolean;
  parallaxEnabled: boolean;
  scrollProgress: number;
  ditherEnabled: boolean;
  halftoneEnabled: boolean;
  wireframe: boolean;
  ditherIntensity: number;
  ditherResolution: number;
  halftoneScale: number;
  contrast: number;
  grainIntensity: number;
  accentIntensity: number;
  fogDensity: number;
  quality: QualityPreset;
}

export const DEFAULT_CITY_SETTINGS: DitherCitySettings = {
  motionEnabled: true,
  parallaxEnabled: true,
  scrollProgress: 0,
  ditherEnabled: true,
  halftoneEnabled: true,
  wireframe: false,
  ditherIntensity: 0.72,
  ditherResolution: 1.0,
  halftoneScale: 0.88,
  contrast: 1.24,
  grainIntensity: 0.14,
  accentIntensity: 0.92,
  fogDensity: 0.0135,
  quality: 'auto',
};

export interface RenderStats {
  fps: number;
  drawCalls: number;
  triangles: number;
}

/**
 * Mulberry32 deterministic PRNG so the procedural megacity preserves its exact
 * art-directed architectural composition across reloads and environments.
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export interface CameraFrameTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  planetOffset: [number, number, number];
  planetScale: number;
}

/**
 * Computes responsive camera framing, subtle clamped pointer parallax, and
 * continuous scroll-driven elevation/depth motion without exposing empty edges.
 */
export function computeCameraFrame(params: {
  aspect: number;
  pointerX: number; // normalized -1..1
  pointerY: number; // normalized -1..1
  scrollProgress: number; // normalized 0..1
  parallaxEnabled: boolean;
  isTouchDevice: boolean;
}): CameraFrameTarget {
  const aspect = clamp(params.aspect || 16 / 9, 0.35, 3.0);
  const scroll = clamp(params.scrollProgress, 0, 1);

  // Smoothly detect narrow / portrait viewports to reframe rather than shrink
  const portraitBlend = clamp((1.15 - aspect) / 0.65, 0, 1);

  // Base desktop framing matching the reference 16:9 low-angle upward skyline
  const basePosX = lerp(-2.6, -0.4, portraitBlend);
  const basePosY = lerp(3.4, 3.2, portraitBlend);
  const basePosZ = lerp(34.5, 46.0, portraitBlend);

  const baseLookX = lerp(2.0, 4.4, portraitBlend);
  const baseLookY = lerp(9.4, 11.2, portraitBlend);
  const baseLookZ = 0.0;

  const baseFov = lerp(39, 48, portraitBlend);

  // Continuous scroll-driven vertical rise & subtle forward push
  const scrollPosY = scroll * 3.8;
  const scrollPosZ = -scroll * 3.4;
  const scrollLookY = scroll * 2.4;

  // Clamped subtle pointer parallax (~12-18px equivalent on foreground towers)
  const allowParallax = params.parallaxEnabled && !params.isTouchDevice;
  const px = allowParallax ? clamp(params.pointerX, -1, 1) : 0;
  const py = allowParallax ? clamp(params.pointerY, -1, 1) : 0;

  // Small camera translation creates natural depth-stratified parallax:
  // foreground towers shift most, midground slightly, distant planet minimally.
  const parallaxX = px * 0.85;
  const parallaxY = -py * 0.48;
  const lookParallaxX = px * 0.22;
  const lookParallaxY = -py * 0.14;

  // On narrow viewports, shift planet into clear upper framing above midground skyline
  const planetOffset: [number, number, number] = [
    lerp(0, 6.2, portraitBlend),
    lerp(0, 11.0, portraitBlend),
    0,
  ];
  const planetScale = lerp(1.0, 0.85, portraitBlend);

  return {
    position: [
      basePosX + parallaxX,
      basePosY + scrollPosY + parallaxY,
      basePosZ + scrollPosZ,
    ],
    lookAt: [
      baseLookX + lookParallaxX,
      baseLookY + scrollLookY + lookParallaxY,
      baseLookZ,
    ],
    fov: baseFov,
    planetOffset,
    planetScale,
  };
}

/**
 * Resolves effective quality tier from preset, viewport width, and software WebGL flag.
 */
export function resolveQualityTier(
  preset: QualityPreset,
  viewportWidth: number,
  isSoftwareGl: boolean,
): 'high' | 'medium' | 'low' {
  if (preset !== 'auto') return preset;
  if (isSoftwareGl) return 'medium';
  if (viewportWidth < 640) return 'low';
  if (viewportWidth < 1024) return 'medium';
  return 'high';
}

export function getDprCap(
  tier: 'high' | 'medium' | 'low',
  isSoftwareGl: boolean,
): number {
  if (isSoftwareGl) return 1;
  if (tier === 'low') return 1;
  if (tier === 'medium') return 1.5;
  return 2;
}
