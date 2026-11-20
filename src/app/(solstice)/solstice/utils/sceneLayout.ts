export const SCENE_WIDTH = 1920;
export const SCENE_HEIGHT = 1080;

/** Extra bleed beyond 1920x1080 so parallax and scroll transforms never expose empty edges */
export const SCENE_BLEED_X = 140;
export const SCENE_BLEED_Y = 90;

/** Balanced painterly canvas resolution (1144x655) for crisp dry-brush art with low VRAM footprint */
export const LAYER_CANVAS_SCALE = 0.52;
export const LAYER_CANVAS_W = Math.round((SCENE_WIDTH + SCENE_BLEED_X * 2) * LAYER_CANVAS_SCALE);
export const LAYER_CANVAS_H = Math.round((SCENE_HEIGHT + SCENE_BLEED_Y * 2) * LAYER_CANVAS_SCALE);

export type ViewportProfile = 'desktop' | 'tablet' | 'mobile';

export interface LayerDepthSpec {
  id: string;
  /** Horizontal parallax multiplier (-1..1 normalized pointer -> px) */
  parallaxX: number;
  /** Vertical parallax multiplier (-1..1 normalized pointer -> px) */
  parallaxY: number;
  /** Horizontal scroll drift (px at scrollProgress=1) */
  scrollShiftX: number;
  /** Vertical scroll drift (px at scrollProgress=1) */
  scrollShiftY: number;
  /** Scale delta from compressed (0) to dimensional (1) */
  scrollScaleDelta: number;
  /** Maximum safe translation so bleed is never breached */
  maxOffsetX: number;
  maxOffsetY: number;
}

export const LAYER_DEPTH_SPECS: Record<string, LayerDepthSpec> = {
  sky: {
    id: 'sky',
    parallaxX: 3,
    parallaxY: 2,
    scrollShiftX: 0,
    scrollShiftY: 0,
    scrollScaleDelta: 0.004,
    maxOffsetX: 20,
    maxOffsetY: 16,
  },
  sun: {
    id: 'sun',
    parallaxX: 11,
    parallaxY: 7,
    scrollShiftX: -12,
    scrollShiftY: -18,
    scrollScaleDelta: 0.015,
    maxOffsetX: 38,
    maxOffsetY: 32,
  },
  distantRidges: {
    id: 'distantRidges',
    parallaxX: 20,
    parallaxY: 10,
    scrollShiftX: -18,
    scrollShiftY: 6,
    scrollScaleDelta: 0.022,
    maxOffsetX: 54,
    maxOffsetY: 36,
  },
  canyonMid: {
    id: 'canyonMid',
    parallaxX: 34,
    parallaxY: 15,
    scrollShiftX: -8,
    scrollShiftY: 14,
    scrollScaleDelta: 0.036,
    maxOffsetX: 78,
    maxOffsetY: 48,
  },
  cliffWall: {
    id: 'cliffWall',
    parallaxX: 48,
    parallaxY: 20,
    scrollShiftX: 18,
    scrollShiftY: -10,
    scrollScaleDelta: 0.052,
    maxOffsetX: 98,
    maxOffsetY: 56,
  },
  foreground: {
    id: 'foreground',
    parallaxX: 64,
    parallaxY: 26,
    scrollShiftX: 24,
    scrollShiftY: 24,
    scrollScaleDelta: 0.072,
    maxOffsetX: 118,
    maxOffsetY: 68,
  },
  atmosphere: {
    id: 'atmosphere',
    parallaxX: 26,
    parallaxY: 12,
    scrollShiftX: -24,
    scrollShiftY: -8,
    scrollScaleDelta: 0.02,
    maxOffsetX: 65,
    maxOffsetY: 40,
  },
};

export interface PointerOffset {
  /** Normalized -1 (left) to +1 (right) */
  x: number;
  /** Normalized -1 (top) to +1 (bottom) */
  y: number;
}

export interface ComputedLayerTransform {
  tx: number;
  ty: number;
  scale: number;
}

export interface ScrollProgressionState {
  progress: number;
  /** 0 -> flatter/compressed, 1 -> full 2.5D separation */
  depthSeparation: number;
  /** Higher haze at progress 0, gently settling toward progress 1 */
  hazeMultiplier: number;
  /** Painterly shadows become clearer as scroll increases */
  shadowClarity: number;
  /** Underpainting brush reveal intensity */
  paintRevealBase: number;
}

export interface ViewportFraming {
  profile: ViewportProfile;
  /** CSS object-position-like focal point in percentages of the 1920x1080 artboard */
  focalX: number;
  focalY: number;
  /** Scale applied to the 1920x1080 artboard so it covers viewport cleanly */
  coverScale: number;
  /** Pixel translation to align focal point inside viewport */
  offsetX: number;
  offsetY: number;
  /** Reduced parallax multiplier on narrow screens */
  parallaxScale: number;
}

export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, value));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Deterministic mulberry32 PRNG for reproducible painterly brush strokes */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function computeScrollState(rawProgress: number): ScrollProgressionState {
  const progress = clamp(rawProgress, 0, 1);
  // 0..0.3 calm & compressed, 0.3..0.7 emerging separation, 0.7..1.0 full dimensionality
  const depthSeparation = lerp(0.28, 1.0, smoothstep(0.0, 0.92, progress));
  const hazeMultiplier = lerp(1.24, 0.76, smoothstep(0.05, 0.95, progress));
  const shadowClarity = lerp(0.84, 1.14, smoothstep(0.15, 0.85, progress));
  const paintRevealBase = lerp(0.08, 0.52, smoothstep(0.2, 0.9, progress));

  return {
    progress,
    depthSeparation,
    hazeMultiplier,
    shadowClarity,
    paintRevealBase,
  };
}

export function computeLayerTransform(
  spec: LayerDepthSpec,
  pointer: PointerOffset,
  scrollProgress: number,
  parallaxStrength: number,
  reducedMotion = false
): ComputedLayerTransform {
  const p = clamp(scrollProgress, 0, 1);
  const strength = reducedMotion ? 0 : clamp(parallaxStrength, 0, 2.5);
  const scrollState = computeScrollState(p);

  const px = clamp(pointer.x, -1, 1);
  const py = clamp(pointer.y, -1, 1);

  // Depth separation gently increases parallax authority as the scene opens up
  const effectiveParallax = strength * lerp(0.75, 1.15, scrollState.depthSeparation);

  const rawTx = -px * spec.parallaxX * effectiveParallax + spec.scrollShiftX * p;
  const rawTy = -py * spec.parallaxY * effectiveParallax + spec.scrollShiftY * p;

  const tx = clamp(rawTx, -spec.maxOffsetX, spec.maxOffsetX);
  const ty = clamp(rawTy, -spec.maxOffsetY, spec.maxOffsetY);

  // Base scale includes tiny safety overscan + subtle scroll dimensionality expansion
  const scale = 1.0 + (reducedMotion ? 0 : spec.scrollScaleDelta * p);

  return { tx, ty, scale };
}

export function getViewportProfile(width: number): ViewportProfile {
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Computes responsive reframing for desktop (16:9 baseline), tablet, and mobile.
 * On mobile, instead of shrinking the entire 16:9 painting tiny, it gracefully
 * reframes around the central traveler, sun-left edge, and right canyon mass
 * while preserving a clean upper sky area for hero typography.
 */
export function computeViewportFraming(
  viewportWidth: number,
  viewportHeight: number
): ViewportFraming {
  const w = Math.max(320, viewportWidth);
  const h = Math.max(320, viewportHeight);
  const profile = getViewportProfile(w);

  // Add slight overscan so parallax never reveals viewport borders
  const overscan = 1.07;
  const baseCover = Math.max(w / SCENE_WIDTH, h / SCENE_HEIGHT) * overscan;

  let focalX = 0.5;
  let focalY = 0.5;
  let coverScale = baseCover;
  let parallaxScale = 1.0;

  if (profile === 'tablet') {
    // Shift slightly right-of-center to retain sun, traveler, and primary cliff wall
    focalX = 0.52;
    focalY = 0.52;
    parallaxScale = 0.72;
  } else if (profile === 'mobile') {
    // Dedicated vertical reframing: frame traveler + canyon mass + upper sky negative space
    // while keeping sun visible on the left-mid horizon
    focalX = 0.53;
    focalY = 0.56;
    // Slightly pull out vertically relative to full height? No, cover must fill height,
    // so coverScale = baseCover; we center on traveler/canyon junction (53% X)
    coverScale = baseCover;
    parallaxScale = 0.45;
  }

  const renderedW = SCENE_WIDTH * coverScale;
  const renderedH = SCENE_HEIGHT * coverScale;

  // Compute offset so (focalX * renderedW, focalY * renderedH) lands near viewport center
  const idealOffsetX = w * 0.5 - focalX * renderedW;
  const idealOffsetY = h * 0.5 - focalY * renderedH;

  // Clamp offsets so the scaled artboard ALWAYS covers the viewport completely
  const minOffsetX = w - renderedW;
  const maxOffsetX = 0;
  const minOffsetY = h - renderedH;
  const maxOffsetY = 0;

  const offsetX = clamp(idealOffsetX, minOffsetX, maxOffsetX);
  const offsetY = clamp(idealOffsetY, minOffsetY, maxOffsetY);

  return {
    profile,
    focalX,
    focalY,
    coverScale,
    offsetX,
    offsetY,
    parallaxScale,
  };
}

export interface SceneControlState {
  ambientPlaying: boolean;
  brushAnimationEnabled: boolean;
  dustEnabled: boolean;
  travelerEnabled: boolean;
  vegetationWindEnabled: boolean;
  heatShimmerEnabled: boolean;
  pointerInteractionEnabled: boolean;
  texturesEnabled: boolean;
  showFps: boolean;
  motionIntensity: number;
  windStrength: number;
  brushActivity: number;
  parallaxStrength: number;
  scrollProgress: number;
  manualScrollOverride: boolean;
  revealProgress: number;
  revealManualScrub: boolean;
  revealReplayToken: number;
}

export const DEFAULT_SCENE_CONTROLS: SceneControlState = {
  ambientPlaying: true,
  brushAnimationEnabled: true,
  dustEnabled: true,
  travelerEnabled: true,
  vegetationWindEnabled: true,
  heatShimmerEnabled: true,
  pointerInteractionEnabled: true,
  texturesEnabled: true,
  showFps: true,
  motionIntensity: 1.0,
  windStrength: 1.0,
  brushActivity: 1.0,
  parallaxStrength: 1.0,
  scrollProgress: 0,
  manualScrollOverride: false,
  revealProgress: 0,
  revealManualScrub: false,
  revealReplayToken: 0,
};

