export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface TimeOfDayLighting {
  hour: number;
  sunElevation: number; // -1..1
  sunDir: { x: number; y: number; z: number };
  moonDir: { x: number; y: number; z: number };
  dayFactor: number; // 0 (night) .. 1 (day)
  sunsetFactor: number; // 0..1 peak around sunrise/sunset
  nightFactor: number; // 0..1 peak at night
  sunColor: RGBColor;
  sunIntensity: number;
  moonColor: RGBColor;
  moonIntensity: number;
  hemiSkyColor: RGBColor;
  hemiGroundColor: RGBColor;
  hemiIntensity: number;
  skyZenithColor: RGBColor;
  skyMidColor: RGBColor;
  skyHorizonColor: RGBColor;
  skySunsetGlowColor: RGBColor;
  fogColor: RGBColor;
  oceanDeepColor: RGBColor;
  oceanShallowColor: RGBColor;
  beaconProminence: number; // 0.22 (noon) .. 1.65 (night)
  windowGlowFactor: number; // 0 (day) .. 1 (dusk/night)
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function lerpRGB(a: RGBColor, b: RGBColor, t: number): RGBColor {
  const ct = clamp01(t);
  return {
    r: lerp(a.r, b.r, ct),
    g: lerp(a.g, b.g, ct),
    b: lerp(a.b, b.b, ct),
  };
}

/**
 * Evaluates continuous solar/lunar lighting, sophisticated coastal atmospheric sky palette
 * (muted amber, warm peach, dusty rose -> dusty mauve, slate blue, indigo, storm charcoal),
 * fog, and cool deep-teal ocean tint for any hour in [0, 24].
 */
export function evaluateTimeOfDay(
  rawHour: number,
  cloudCoverage: number,
  ambientDimming: number,
  stormIntensity = 0.5
): TimeOfDayLighting {
  const hour = ((rawHour % 24) + 24) % 24;

  // Sun rises ~6:00, peaks ~12:30, sets ~19:00 on the far-left (-X, -Z) horizon
  const sunAngle = ((hour - 6.0) / 13.0) * Math.PI;
  const sunElev = Math.sin(sunAngle);
  const sunHoriz = Math.cos(sunAngle);

  const rawSunX = sunHoriz * 0.56 + 0.14;
  const rawSunY = sunElev * 0.88;
  const rawSunZ = -0.82;
  const sLen = Math.hypot(rawSunX, rawSunY, rawSunZ) || 1;
  const sunDir = { x: rawSunX / sLen, y: rawSunY / sLen, z: rawSunZ / sLen };

  // Moon arcs across the opposite sky at night
  const moonElev = Math.max(0.1, -sunElev * 0.8 + 0.2);
  const rawMoonX = -sunHoriz * 0.62 - 0.22;
  const rawMoonY = moonElev;
  const rawMoonZ = -0.58;
  const mLen = Math.hypot(rawMoonX, rawMoonY, rawMoonZ) || 1;
  const moonDir = { x: rawMoonX / mLen, y: rawMoonY / mLen, z: rawMoonZ / mLen };

  const dayFactor = smoothstep(-0.08, 0.36, sunElev);
  const nightFactor = 1 - smoothstep(-0.18, 0.16, sunElev);
  const sunsetFactor =
    smoothstep(-0.14, 0.05, sunElev) * (1 - smoothstep(0.1, 0.44, sunElev));

  // Refined coastal sky palette (avoids oversaturated pure yellow)
  const dayZenith: RGBColor = { r: 0.15, g: 0.34, b: 0.58 };
  const sunsetZenith: RGBColor = { r: 0.075, g: 0.095, b: 0.165 }; // deep muted indigo
  const nightZenith: RGBColor = { r: 0.018, g: 0.032, b: 0.068 };

  const dayMid: RGBColor = { r: 0.34, g: 0.52, b: 0.72 };
  const sunsetMid: RGBColor = { r: 0.31, g: 0.25, b: 0.34 }; // dusty mauve / slate violet
  const nightMid: RGBColor = { r: 0.038, g: 0.062, b: 0.115 };

  const dayHorizon: RGBColor = { r: 0.62, g: 0.72, b: 0.80 };
  const sunsetHorizon: RGBColor = { r: 0.72, g: 0.43, b: 0.32 }; // muted peach-amber & desaturated rose
  const nightHorizon: RGBColor = { r: 0.06, g: 0.095, b: 0.155 };

  const stormZenithTint: RGBColor = { r: 0.07, g: 0.09, b: 0.13 }; // deep storm charcoal
  const stormMidTint: RGBColor = { r: 0.13, g: 0.16, b: 0.22 }; // stormy slate blue
  const stormHorizonTint: RGBColor = { r: 0.20, g: 0.22, b: 0.27 };

  const stormWeight = clamp01(cloudCoverage * 0.6 + stormIntensity * 0.45);

  let skyZenithColor = lerpRGB(nightZenith, dayZenith, dayFactor);
  skyZenithColor = lerpRGB(skyZenithColor, sunsetZenith, sunsetFactor * 0.88);
  skyZenithColor = lerpRGB(skyZenithColor, stormZenithTint, stormWeight * 0.65);

  let skyMidColor = lerpRGB(nightMid, dayMid, dayFactor);
  skyMidColor = lerpRGB(skyMidColor, sunsetMid, sunsetFactor * 0.9);
  skyMidColor = lerpRGB(skyMidColor, stormMidTint, stormWeight * 0.58);

  let skyHorizonColor = lerpRGB(nightHorizon, dayHorizon, dayFactor);
  skyHorizonColor = lerpRGB(skyHorizonColor, sunsetHorizon, sunsetFactor * 0.9);
  skyHorizonColor = lerpRGB(
    skyHorizonColor,
    stormHorizonTint,
    stormWeight * (0.55 - sunsetFactor * 0.2)
  );

  // Restrained warm muted amber-peach solar scatter (never garish yellow)
  const skySunsetGlowColor = lerpRGB(
    { r: 0.22, g: 0.28, b: 0.40 },
    { r: 0.86, g: 0.46, b: 0.24 },
    clamp01(sunsetFactor * 1.05 + dayFactor * 0.15)
  );

  // Atmospheric coastal horizon fog
  const fogBase = lerpRGB(skyHorizonColor, skyMidColor, 0.42);
  const fogColor = lerpRGB(fogBase, stormHorizonTint, stormWeight * 0.45);

  // Sun directional light (restrained warm amber at sunset, clean daylight at noon)
  const sunColor = lerpRGB(
    { r: 0.98, g: 0.94, b: 0.86 },
    { r: 0.94, g: 0.54, b: 0.30 },
    clamp01(sunsetFactor * 1.05)
  );
  const stormSunAtten = 1 - ambientDimming * 0.48;
  const sunIntensity =
    (dayFactor * 1.95 + sunsetFactor * 1.45) * stormSunAtten;

  // Moonlight keeps ocean, rocks, and architecture readable at night
  const moonColor: RGBColor = { r: 0.58, g: 0.72, b: 0.94 };
  const moonIntensity = nightFactor * (0.76 - ambientDimming * 0.22);

  // Hemisphere fill (balanced cool slate sky + damp coastal ground)
  const hemiSkyColor = lerpRGB(
    { r: 0.13, g: 0.20, b: 0.32 },
    lerpRGB({ r: 0.54, g: 0.68, b: 0.84 }, { r: 0.58, g: 0.42, b: 0.40 }, sunsetFactor * 0.72),
    dayFactor
  );
  const hemiGroundColor = lerpRGB(
    { r: 0.045, g: 0.075, b: 0.105 },
    { r: 0.12, g: 0.18, b: 0.20 },
    dayFactor
  );
  const hemiIntensity =
    lerp(0.42, 0.84, dayFactor) * (1 - ambientDimming * 0.22) + sunsetFactor * 0.16;

  // Cool deep teal & dark blue-green ocean palette (eliminates coppery/metallic cast)
  const oceanDeepColor = lerpRGB(
    { r: 0.014, g: 0.052, b: 0.088 },
    { r: 0.022, g: 0.125, b: 0.175 },
    clamp01(dayFactor + sunsetFactor * 0.4)
  );
  const oceanShallowColor = lerpRGB(
    { r: 0.032, g: 0.145, b: 0.185 },
    { r: 0.055, g: 0.295, b: 0.33 },
    clamp01(dayFactor + sunsetFactor * 0.5)
  );

  // Daylight restrains beacon; dusk & night make it the atmospheric focal point
  const beaconProminence =
    clamp01(0.18 + nightFactor * 1.05 + sunsetFactor * 0.62 + stormWeight * 0.32) * 1.35;

  const windowGlowFactor = clamp01(
    nightFactor * 1.15 + sunsetFactor * 0.86 + stormWeight * 0.3
  );

  return {
    hour,
    sunElevation: sunElev,
    sunDir,
    moonDir,
    dayFactor,
    sunsetFactor,
    nightFactor,
    sunColor,
    sunIntensity,
    moonColor,
    moonIntensity,
    hemiSkyColor,
    hemiGroundColor,
    hemiIntensity,
    skyZenithColor,
    skyMidColor,
    skyHorizonColor,
    skySunsetGlowColor,
    fogColor,
    oceanDeepColor,
    oceanShallowColor,
    beaconProminence,
    windowGlowFactor,
  };
}
