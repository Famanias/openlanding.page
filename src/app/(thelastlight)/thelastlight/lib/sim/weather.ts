import {
  EffectiveEnvState,
  SimControls,
  STORM_DURATION,
  WeatherId,
  WeatherTargets,
} from './types';
import { evaluateWind } from './wind';

export const WEATHER_PRESETS: Record<WeatherId, WeatherTargets> = {
  CLEAR: {
    waveAmplitude: 0.42,
    waveFrequency: 0.88,
    waveSpeed: 0.82,
    oceanRoughness: 0.18,
    foamIntensity: 0.55,
    windStrength: 0.32,
    fogDensity: 0.1,
    rainIntensity: 0.0,
    cloudCoverage: 0.24,
    stormIntensity: 0.06,
    atmosphericHaze: 0.22,
    lightningActivity: 0.0,
    rockWetness: 0.14,
    sprayIntensity: 0.18,
    ambientDimming: 0.0,
  },
  CLOUDY: {
    waveAmplitude: 0.78,
    waveFrequency: 0.98,
    waveSpeed: 0.96,
    oceanRoughness: 0.30,
    foamIntensity: 0.88,
    windStrength: 0.72,
    fogDensity: 0.28,
    rainIntensity: 0.0,
    cloudCoverage: 0.68,
    stormIntensity: 0.38,
    atmosphericHaze: 0.4,
    lightningActivity: 0.0,
    rockWetness: 0.28,
    sprayIntensity: 0.45,
    ambientDimming: 0.32,
  },
  RAIN: {
    waveAmplitude: 1.12,
    waveFrequency: 1.08,
    waveSpeed: 1.1,
    oceanRoughness: 0.40,
    foamIntensity: 1.2,
    windStrength: 1.08,
    fogDensity: 0.46,
    rainIntensity: 0.72,
    cloudCoverage: 0.85,
    stormIntensity: 0.68,
    atmosphericHaze: 0.56,
    lightningActivity: 0.0,
    rockWetness: 0.82,
    sprayIntensity: 0.78,
    ambientDimming: 0.5,
  },
  THUNDERSTORM: {
    waveAmplitude: 1.48,
    waveFrequency: 1.16,
    waveSpeed: 1.22,
    oceanRoughness: 0.48,
    foamIntensity: 1.5,
    windStrength: 1.48,
    fogDensity: 0.54,
    rainIntensity: 0.96,
    cloudCoverage: 0.94,
    stormIntensity: 0.95,
    atmosphericHaze: 0.64,
    lightningActivity: 1.0,
    rockWetness: 1.0,
    sprayIntensity: 1.05,
    ambientDimming: 0.65,
  },
};

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Smooth exponential interpolation of WeatherTargets toward a target preset.
 * Multi-second smooth transitions (rate ~0.65 -> ~3-4s full settle) keep clouds,
 * waves, wind, rain, fog, lighting, and boat motion coherent without pops.
 */
export function dampWeatherState(
  current: WeatherTargets,
  target: WeatherTargets,
  dt: number,
  rate = 0.85
): WeatherTargets {
  const alpha = 1 - Math.exp(-rate * Math.max(0, dt));
  return {
    waveAmplitude: lerp(current.waveAmplitude, target.waveAmplitude, alpha),
    waveFrequency: lerp(current.waveFrequency, target.waveFrequency, alpha),
    waveSpeed: lerp(current.waveSpeed, target.waveSpeed, alpha),
    oceanRoughness: lerp(current.oceanRoughness, target.oceanRoughness, alpha),
    foamIntensity: lerp(current.foamIntensity, target.foamIntensity, alpha),
    windStrength: lerp(current.windStrength, target.windStrength, alpha),
    fogDensity: lerp(current.fogDensity, target.fogDensity, alpha),
    rainIntensity: lerp(current.rainIntensity, target.rainIntensity, alpha),
    cloudCoverage: lerp(current.cloudCoverage, target.cloudCoverage, alpha),
    stormIntensity: lerp(current.stormIntensity, target.stormIntensity, alpha),
    atmosphericHaze: lerp(current.atmosphericHaze, target.atmosphericHaze, alpha),
    lightningActivity: lerp(current.lightningActivity, target.lightningActivity, alpha),
    rockWetness: lerp(current.rockWetness, target.rockWetness, alpha),
    sprayIntensity: lerp(current.sprayIntensity, target.sprayIntensity, alpha),
    ambientDimming: lerp(current.ambientDimming, target.ambientDimming, alpha),
  };
}

/**
 * Deterministic lightning flash envelope with varied, controlled intensity
 * (never washes the entire viewport pure white) and nonuniform spacing.
 */
export function evaluateDeterministicLightning(
  time: number,
  activity: number,
  isStormTimeline = false
): number {
  if (activity <= 0.05) return 0;

  if (isStormTimeline) {
    // Choreographed nonuniform lightning strikes during 15-25s peak thunderstorm
    const strikes = [
      { t: 16.1, amp: 0.72 },
      { t: 18.8, amp: 0.92 },
      { t: 21.1, amp: 0.65 },
      { t: 23.6, amp: 0.84 },
    ];
    let peak = 0;
    for (const s of strikes) {
      const dt = time - s.t;
      if (dt >= 0 && dt < 0.72) {
        const primary = Math.exp(-dt * 11.5);
        const secondary = dt > 0.14 ? Math.exp(-(dt - 0.14) * 15.5) * 0.72 : 0;
        peak = Math.max(peak, Math.min(0.95, (primary + secondary) * s.amp));
      }
    }
    return peak * activity;
  }

  // Free-run deterministic strikes at nonuniform intervals
  const cycle = 7.4;
  const idx = Math.floor(time / cycle);
  const offset = 1.3 + (Math.sin(idx * 17.31) * 0.5 + 0.5) * 3.8;
  const strength = 0.58 + (Math.cos(idx * 9.13) * 0.5 + 0.5) * 0.34;
  const dt = time - (idx * cycle + offset);
  if (dt >= 0 && dt < 0.68) {
    const primary = Math.exp(-dt * 11.5);
    const secondary = dt > 0.14 ? Math.exp(-(dt - 0.14) * 15.0) * 0.68 : 0;
    return Math.min(0.92, (primary + secondary) * strength * activity);
  }
  return 0;
}

export interface StormSequenceSample {
  phaseName: string;
  phaseIndex: number; // 0..4
  timeOfDay: number;
  targets: WeatherTargets;
  beaconActive: boolean;
  beaconIntensity: number;
  interiorLights: boolean;
  lightningFlash: number;
  cameraAzimuthOffset: number;
  cameraElevOffset: number;
  cameraDistOffset: number;
}

/**
 * Deterministic, fully reversible 30-second Cinematic Storm Sequence evaluator:
 * 0-5s:   Golden hour — gentle waves, warm atmospheric sunlight, sparse clouds
 * 5-10s:  Approaching storm — denser clouds, rising wind, muted sunlight, growing swell, haze
 * 10-15s: Rain begins — wind-driven rain, shoreline foam, dark wet rocks, beacon visible
 * 15-25s: Thunderstorm — brooding clouds, heavy rain, strong swells, sea spray, lightning, fog beam
 * 25-30s: Storm subsides — weakening rain/wind, settling waves, parting clouds, misty night beacon
 */
export function evaluateStormSequence(rawT: number): StormSequenceSample {
  const t = clamp(rawT, 0, STORM_DURATION);

  const gather = smoothstep(4.5, 10.0, t);
  const rainOn = smoothstep(9.5, 14.5, t);
  const stormPeak = smoothstep(14.0, 17.5, t) * (1 - smoothstep(23.5, 27.5, t));
  const settle = smoothstep(24.5, 29.8, t);

  const timeOfDay = lerp(18.2, 21.75, smoothstep(0.0, 29.5, t));

  const cloudCoverage = clamp(
    0.2 + gather * 0.54 + rainOn * 0.22 - settle * 0.45,
    0.18,
    0.98
  );
  const stormIntensity = clamp(
    0.08 + gather * 0.38 + rainOn * 0.28 + stormPeak * 0.32 - settle * 0.65,
    0.06,
    1.0
  );
  const atmosphericHaze = clamp(
    0.22 + gather * 0.28 + rainOn * 0.18 + stormPeak * 0.14 - settle * 0.22,
    0.2,
    0.85
  );
  const windStrength = clamp(
    0.28 + gather * 0.55 + rainOn * 0.45 + stormPeak * 0.58 - settle * 1.12,
    0.25,
    1.9
  );
  const waveAmplitude = clamp(
    0.38 + gather * 0.42 + rainOn * 0.42 + stormPeak * 0.52 - settle * 0.92,
    0.35,
    1.75
  );
  const waveFrequency = clamp(
    0.84 + gather * 0.14 + rainOn * 0.12 + stormPeak * 0.12 - settle * 0.26,
    0.8,
    1.25
  );
  const waveSpeed = clamp(
    0.8 + gather * 0.15 + rainOn * 0.15 + stormPeak * 0.2 - settle * 0.35,
    0.75,
    1.35
  );
  const oceanRoughness = clamp(
    0.16 + gather * 0.14 + rainOn * 0.14 + stormPeak * 0.12 - settle * 0.28,
    0.14,
    0.58
  );
  const foamIntensity = clamp(
    0.45 + gather * 0.38 + rainOn * 0.42 + stormPeak * 0.45 - settle * 0.88,
    0.4,
    1.7
  );
  const rainIntensity = clamp(
    rainOn * 0.65 + stormPeak * 0.35 - settle * 0.9,
    0.0,
    1.0
  );
  const fogDensity = clamp(
    0.12 + gather * 0.2 + rainOn * 0.2 + stormPeak * 0.16 - settle * 0.26,
    0.1,
    0.68
  );
  const rockWetness = clamp(
    0.14 + rainOn * 0.72 + stormPeak * 0.14 - settle * 0.24,
    0.12,
    1.0
  );
  const sprayIntensity = clamp(
    0.16 + gather * 0.3 + rainOn * 0.35 + stormPeak * 0.32 - settle * 0.72,
    0.12,
    1.1
  );
  const ambientDimming = clamp(
    gather * 0.3 + rainOn * 0.24 + stormPeak * 0.18 - settle * 0.42,
    0.0,
    0.74
  );
  const lightningActivity = stormPeak;

  const beaconRamp = smoothstep(10.0, 12.2, t);
  const beaconActive = t >= 10.0;
  const beaconIntensity = 0.25 + beaconRamp * 1.35 + stormPeak * 0.32;
  const interiorLights = t >= 7.5;

  const lightningFlash = evaluateDeterministicLightning(t, lightningActivity, true);

  let phaseName = 'Golden Hour';
  let phaseIndex = 0;
  if (t >= 25) {
    phaseName = 'Storm Subsides';
    phaseIndex = 4;
  } else if (t >= 15) {
    phaseName = 'Thunderstorm';
    phaseIndex = 3;
  } else if (t >= 10) {
    phaseName = 'Rain Begins';
    phaseIndex = 2;
  } else if (t >= 5) {
    phaseName = 'Approaching Storm';
    phaseIndex = 1;
  }

  const p = t / STORM_DURATION;
  const cameraAzimuthOffset = Math.sin(p * Math.PI * 1.4) * 0.18;
  const cameraElevOffset = Math.sin(p * Math.PI) * 1.6 - settle * 0.5;
  const cameraDistOffset = -Math.sin(p * Math.PI) * 3.0;

  return {
    phaseName,
    phaseIndex,
    timeOfDay,
    targets: {
      waveAmplitude,
      waveFrequency,
      waveSpeed,
      oceanRoughness,
      foamIntensity,
      windStrength,
      fogDensity,
      rainIntensity,
      cloudCoverage,
      stormIntensity,
      atmosphericHaze,
      lightningActivity,
      rockWetness,
      sprayIntensity,
      ambientDimming,
    },
    beaconActive,
    beaconIntensity,
    interiorLights,
    lightningFlash,
    cameraAzimuthOffset,
    cameraElevOffset,
    cameraDistOffset,
  };
}

/**
 * Combines either manual controls (smoothly interpolated through dampedWeather)
 * or the deterministic 30s storm sequence into one unified EffectiveEnvState.
 */
export function buildEffectiveEnvState(
  controls: SimControls,
  dampedWeather: WeatherTargets,
  simTime: number
): EffectiveEnvState {
  if (controls.stormActive) {
    const seq = evaluateStormSequence(controls.stormTime);
    const wind = evaluateWind(simTime, seq.targets.windStrength);
    return {
      timeOfDay: seq.timeOfDay,
      waveAmplitude: seq.targets.waveAmplitude,
      waveFrequency: seq.targets.waveFrequency,
      waveSpeed: seq.targets.waveSpeed,
      oceanRoughness: seq.targets.oceanRoughness,
      foamIntensity: seq.targets.foamIntensity,
      windStrength: wind.effectiveSpeed,
      windDirX: wind.dirX,
      windDirZ: wind.dirZ,
      gustFactor: wind.gustFactor,
      fogDensity: seq.targets.fogDensity,
      rainIntensity: seq.targets.rainIntensity,
      cloudCoverage: seq.targets.cloudCoverage,
      cloudSpeed: controls.cloudSpeed,
      stormIntensity: seq.targets.stormIntensity,
      atmosphericHaze: seq.targets.atmosphericHaze,
      lightningActivity: seq.targets.lightningActivity,
      lightningFlash: seq.lightningFlash,
      rockWetness: seq.targets.rockWetness,
      sprayIntensity: seq.targets.sprayIntensity,
      ambientDimming: seq.targets.ambientDimming,
      beaconActive: seq.beaconActive,
      beaconIntensity: seq.beaconIntensity,
      beamSoftness: controls.beamSoftness,
      beamRange: controls.beamRange,
      interiorLightsActive: seq.interiorLights,
    };
  }

  // Smoothly interpolate all weather parameters via dampedWeather so preset switches
  // transition organically over several seconds while still respecting manual slider edits.
  const wind = evaluateWind(simTime, dampedWeather.windStrength);
  const lightningActivity = Math.max(
    dampedWeather.lightningActivity,
    dampedWeather.stormIntensity > 0.78 ? (dampedWeather.stormIntensity - 0.78) * 4.2 : 0
  );
  const lightningFlash = evaluateDeterministicLightning(
    simTime,
    clamp(lightningActivity, 0, 1),
    false
  );

  return {
    timeOfDay: controls.timeOfDay,
    waveAmplitude: dampedWeather.waveAmplitude,
    waveFrequency: dampedWeather.waveFrequency,
    waveSpeed: dampedWeather.waveSpeed,
    oceanRoughness: dampedWeather.oceanRoughness,
    foamIntensity: dampedWeather.foamIntensity,
    windStrength: wind.effectiveSpeed,
    windDirX: wind.dirX,
    windDirZ: wind.dirZ,
    gustFactor: wind.gustFactor,
    fogDensity: dampedWeather.fogDensity,
    rainIntensity: dampedWeather.rainIntensity,
    cloudCoverage: dampedWeather.cloudCoverage,
    cloudSpeed: controls.cloudSpeed,
    stormIntensity: dampedWeather.stormIntensity,
    atmosphericHaze: dampedWeather.atmosphericHaze,
    lightningActivity: clamp(lightningActivity, 0, 1),
    lightningFlash,
    rockWetness: Math.max(dampedWeather.rockWetness, dampedWeather.rainIntensity * 0.9),
    sprayIntensity: dampedWeather.sprayIntensity,
    ambientDimming: dampedWeather.ambientDimming,
    beaconActive: controls.beaconEnabled,
    beaconIntensity: controls.beamIntensity,
    beamSoftness: controls.beamSoftness,
    beamRange: controls.beamRange,
    interiorLightsActive: controls.interiorLights,
  };
}
