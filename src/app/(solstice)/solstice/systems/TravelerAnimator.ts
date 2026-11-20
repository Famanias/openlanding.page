import { clamp, smoothstep } from '../utils/sceneLayout';
import type { WindSample } from './DesertWindField';

/** Anchor coordinates of the solitary traveler on the sunlit promontory ridge */
export const TRAVELER_BASE_X = 867;
export const TRAVELER_BASE_Y = 838;

/** Exact ridge slope (dy / dx) so walking feet stay planted cleanly on the painted sand path */
export const TRAVELER_RIDGE_SLOPE = 0.195;

/** Bounded walk excursion in px along the sunlit ridge (stays well inside composition) */
export const TRAVELER_MAX_WALK_DX = 42;

export interface FootDustEvent {
  /** Scene-space X where dust puff lifts */
  x: number;
  /** Scene-space Y where dust puff lifts */
  y: number;
  /** 0..1 puff lifecycle */
  age: number;
  /** Opacity/visibility strength */
  intensity: number;
}

export interface ArticulatedTravelerPose {
  /** Grounded root coordinates in 1920x1080 scene space */
  x: number;
  y: number;
  /** Subtle vertical body bob from breathing or footsteps */
  bodyBobY: number;
  /** Torso lean (deg) reacting to wind & stride */
  torsoLeanDeg: number;
  /** Head slight gaze nod/tilt (deg) */
  headTiltDeg: number;
  /** Articulated hip-to-foot leg angles (deg) */
  backLegDeg: number;
  frontLegDeg: number;
  /** Arm holding parasol & trailing balancing arm (deg) */
  parasolArmDeg: number;
  backArmDeg: number;
  /** Parasol / conical hat tilt relative to head/arm attachment (deg) */
  parasolTiltDeg: number;
  /** Parasol gentle vertical lift (px) */
  parasolBobY: number;
  /** Cloak lower hem wind flutter skew (deg) */
  cloakFlutterDeg: number;
  /** Cloak billowing width scale (0.96..1.14) */
  cloakBillowX: number;
  /** Cast shadow horizontal stretch factor */
  shadowScaleX: number;
  /** Current behavioral mode */
  mode: 'idle' | 'walking' | 'bracing';
  /** Active footfall dust puff (if walking) */
  footDust: FootDustEvent | null;
}

/**
 * Deterministic articulated 2D pose solver for the solitary ridge traveler.
 * Combines subtle idle breathing/posture shifts, wind-reactive parasol & cloak
 * dynamics, occasional careful 2-3 step walks along the sunlit ridge slope,
 * and scroll-passage wind bracing.
 */
export function computeTravelerPose(
  t: number,
  wind: WindSample,
  scrollProgress: number,
  options: {
    enabled: boolean;
    motionIntensity: number;
    lifeBlend: number;
  }
): ArticulatedTravelerPose {
  const { enabled, motionIntensity, lifeBlend } = options;
  const activeScale = enabled ? clamp(motionIntensity, 0, 2) * clamp(lifeBlend, 0, 1) : 0;

  if (activeScale <= 0.005) {
    return {
      x: TRAVELER_BASE_X,
      y: TRAVELER_BASE_Y,
      bodyBobY: 0,
      torsoLeanDeg: 0,
      headTiltDeg: 0,
      backLegDeg: 0,
      frontLegDeg: 0,
      parasolArmDeg: 0,
      backArmDeg: 0,
      parasolTiltDeg: 0,
      parasolBobY: 0,
      cloakFlutterDeg: 0,
      cloakBillowX: 1,
      shadowScaleX: 1,
      mode: 'idle',
      footDust: null,
    };
  }

  // =========================================================================
  // 1. OCCASIONAL CAREFUL WALKING CYCLE (26-second serene editorial rhythm)
  // 0..7s: calm idle at ridge tip
  // 7..11.2s: 3 slow careful steps right-downward along the ridge (+38px)
  // 11.2..19.5s: poised contemplation pause
  // 19.5..23.7s: 3 slow careful steps back to ridge overlook
  // 23.7..26s: settle back into stillness
  // =========================================================================
  const cyclePeriod = 26.0;
  const phaseT = ((t % cyclePeriod) + cyclePeriod) % cyclePeriod;

  let walkDisplacement = 0; // 0 .. TRAVELER_MAX_WALK_DX
  let walkDirection = 0; // +1 stepping right, -1 stepping back left, 0 still
  let stepCycle = 0; // 0..3 continuous step counter while walking
  let stepEnvelope = 0; // 0..1 smooth blend into/out of stride

  if (phaseT >= 7.0 && phaseT < 11.2) {
    const u = (phaseT - 7.0) / 4.2;
    const eased = smoothstep(0, 1, u);
    walkDisplacement = eased * TRAVELER_MAX_WALK_DX;
    walkDirection = 1;
    stepCycle = u * 3.0;
    stepEnvelope = Math.sin(u * Math.PI);
  } else if (phaseT >= 11.2 && phaseT < 19.5) {
    walkDisplacement = TRAVELER_MAX_WALK_DX;
  } else if (phaseT >= 19.5 && phaseT < 23.7) {
    const u = (phaseT - 19.5) / 4.2;
    const eased = 1 - smoothstep(0, 1, u);
    walkDisplacement = eased * TRAVELER_MAX_WALK_DX;
    walkDirection = -1;
    stepCycle = u * 3.0;
    stepEnvelope = Math.sin(u * Math.PI);
  }

  // Clamp strictly within safe sunlit promontory bounds and follow exact ridge slope
  const dx = clamp(walkDisplacement * Math.min(1, activeScale), 0, TRAVELER_MAX_WALK_DX);
  const x = TRAVELER_BASE_X + dx;
  const y = TRAVELER_BASE_Y + dx * TRAVELER_RIDGE_SLOPE;

  // =========================================================================
  // 2. STRIDE KINEMATICS & FOOTFALL DUST
  // =========================================================================
  const strideAngle = Math.sin(stepCycle * Math.PI * 2) * 14.5 * stepEnvelope;
  const strideLift = Math.abs(Math.sin(stepCycle * Math.PI * 2)) * 1.8 * stepEnvelope;

  let footDust: FootDustEvent | null = null;
  if (stepEnvelope > 0.18) {
    // Emit tiny sand puff shortly after each foot plant (stepCycle fractional part 0.0..0.45)
    const stepFrac = (stepCycle * 2) % 1;
    if (stepFrac < 0.55) {
      footDust = {
        x: x - walkDirection * 4,
        y: y + 1,
        age: stepFrac / 0.55,
        intensity: (1 - stepFrac / 0.55) * stepEnvelope * 0.72,
      };
    }
  }

  // =========================================================================
  // 3. IDLE WEIGHT SHIFT, BREATHING & WIND/SCROLL RESPONSE
  // =========================================================================
  const breath = Math.sin(t * 1.15) * 0.65;
  const weightShift = Math.sin(t * 0.42 + 0.5) * 1.8 * (1 - stepEnvelope);
  const headLook = Math.sin(t * 0.36 - 0.8) * 3.2;

  // Scroll Act 2-3 (0.30..0.72) creates a subtle gust brace; Act 4 settles calmly
  const scrollGustFactor =
    smoothstep(0.26, 0.45, scrollProgress) *
    (1 - smoothstep(0.64, 0.84, scrollProgress));
  const gustStrength = clamp(wind.gust + scrollGustFactor * 0.55, 0, 1.8);

  const isBracing = stepEnvelope < 0.15 && gustStrength > 0.58;
  const windLean = (wind.dx * 2.4 + scrollGustFactor * 2.6) * activeScale;

  const torsoLeanDeg = clamp(
    weightShift + walkDirection * 3.8 * stepEnvelope + windLean * 0.55,
    -9,
    10
  );

  const headTiltDeg = clamp(
    headLook - torsoLeanDeg * 0.35 + gustStrength * 2.2,
    -8,
    9
  );

  // Parasol tilts subtly against wind gusts and rises slightly with stride
  const parasolTiltDeg = clamp(
    Math.sin(t * 0.62) * 2.4 - gustStrength * 5.8 - wind.pointerInfluence * 4.2 + walkDirection * 2.2 * stepEnvelope,
    -13,
    9
  );
  const parasolBobY = -(strideLift * 0.7 + breath * 0.45);
  const parasolArmDeg = clamp(-parasolTiltDeg * 0.45 + Math.sin(t * 0.8) * 1.5, -9, 9);
  const backArmDeg = clamp(-strideAngle * 0.65 + wind.dx * 2.5, -14, 14);

  // Cloak hem flutters organically in response to canyon breeze + gusts + pointer breeze
  const flutterWave =
    Math.sin(t * 3.4) * 0.55 +
    Math.sin(t * 5.7 + 1.1) * 0.3 +
    Math.cos(t * 2.1) * 0.25;
  const cloakFlutterDeg = clamp(
    (2.2 + gustStrength * 6.8 + wind.pointerInfluence * 5.5 + flutterWave * (1.8 + gustStrength * 3.2)) *
      Math.min(1.4, activeScale),
    -4,
    15
  );
  const cloakBillowX = clamp(1 + gustStrength * 0.09 + wind.pointerInfluence * 0.06, 0.96, 1.16);

  const mode: ArticulatedTravelerPose['mode'] =
    stepEnvelope > 0.15 ? 'walking' : isBracing ? 'bracing' : 'idle';

  return {
    x,
    y,
    bodyBobY: -(breath + strideLift) * Math.min(1.2, activeScale),
    torsoLeanDeg,
    headTiltDeg,
    backLegDeg: -strideAngle,
    frontLegDeg: strideAngle,
    parasolArmDeg,
    backArmDeg,
    parasolTiltDeg,
    parasolBobY,
    cloakFlutterDeg,
    cloakBillowX,
    shadowScaleX: 1 + gustStrength * 0.05 + strideLift * 0.03,
    mode,
    footDust,
  };
}
