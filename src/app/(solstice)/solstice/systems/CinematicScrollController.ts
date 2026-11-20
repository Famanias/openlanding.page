import { clamp, lerp, smoothstep } from '../utils/sceneLayout';

export type ScrollActId = 'establishing' | 'entering' | 'passage' | 'settled';

export interface CinematicScrollState {
  progress: number;
  act: ScrollActId;
  actLabel: string;
  /** Subtle camera immersion zoom (1.00 -> 1.11, always inside bleed bounds) */
  cameraZoom: number;
  /** Subtle focal drift toward traveler & canyon wall (px in 1920x1080 space) */
  cameraPanX: number;
  cameraPanY: number;
  /** 2.5D layer depth separation multiplier */
  depthSeparation: number;
  /** Atmospheric haze density curve */
  hazeMultiplier: number;
  /** Dust velocity/activity boost during passage (0.35..0.75) */
  passageDustBoost: number;
  /** Additional canyon hatching & geological contour reveal (0..1) */
  geologicalDetailReveal: number;
  /** Warm sunlight shift along cliff ledges (0..1) */
  cliffLightShift: number;
  /** Mid-passage gust influence on traveler & vegetation */
  scrollGustBoost: number;
}

/**
 * 4-Act Cinematic Scroll Controller (fully scrubbable & cleanly reversible):
 * 0.00-0.25: Establishing view — original composition, serene haze
 * 0.25-0.50: Enter the landscape — 2.5D separation, geological brush details emerge, traveler feels gust
 * 0.50-0.75: Atmospheric passage — closer immersion, controlled sweeping valley dust & strata contours
 * 0.75-1.00: Final scenic state — atmosphere settles, crisp sculptural depth, traveler returns to calm idle
 */
export function evaluateCinematicScroll(rawProgress: number): CinematicScrollState {
  const progress = clamp(rawProgress, 0, 1);

  let act: ScrollActId = 'establishing';
  let actLabel = 'Establishing View';
  if (progress >= 0.75) {
    act = 'settled';
    actLabel = 'Final Scenic State';
  } else if (progress >= 0.5) {
    act = 'passage';
    actLabel = 'Atmospheric Passage';
  } else if (progress >= 0.25) {
    act = 'entering';
    actLabel = 'Enter the Landscape';
  }

  // Smooth zoom strictly bounded <= 1.11 so coverScale + bleed NEVER exposes edges
  const enterCurve = smoothstep(0.18, 0.88, progress);
  const cameraZoom = lerp(1.0, 1.1, enterCurve);

  // Subtle drift slightly right-downward toward the traveler & monumental cliff strata
  const cameraPanX = lerp(0, -34, enterCurve);
  const cameraPanY = lerp(0, -16, enterCurve);

  const depthSeparation = lerp(0.32, 1.18, smoothstep(0.05, 0.92, progress));

  // Haze gently rises during atmospheric passage (0.45..0.72), then settles cleanly (0.75..1.0)
  const passagePeak =
    smoothstep(0.28, 0.56, progress) * (1 - smoothstep(0.68, 0.96, progress));
  const baseHaze = lerp(1.12, 0.82, smoothstep(0.08, 0.96, progress));
  const hazeMultiplier = clamp(baseHaze + passagePeak * 0.28, 0.65, 1.38);

  const passageDustBoost = passagePeak * 0.85;
  const scrollGustBoost = passagePeak * 0.55;

  // Fine geological hatching & rock contours emerge smoothly across Act 2 -> Act 4
  const geologicalDetailReveal = smoothstep(0.2, 0.82, progress);

  // Subtle golden light sweep along cliff faces as viewer progresses
  const cliffLightShift = smoothstep(0.15, 0.92, progress);

  return {
    progress,
    act,
    actLabel,
    cameraZoom,
    cameraPanX,
    cameraPanY,
    depthSeparation,
    hazeMultiplier,
    passageDustBoost,
    geologicalDetailReveal,
    cliffLightShift,
    scrollGustBoost,
  };
}
