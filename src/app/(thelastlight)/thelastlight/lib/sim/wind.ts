export interface WindSample {
  dirX: number;
  dirZ: number;
  baseSpeed: number;
  gustFactor: number; // 0..1
  effectiveSpeed: number;
  velX: number;
  velZ: number;
}

/**
 * Coherent time-varying coastal wind system shared across ocean, rain,
 * coastal grasses, sea spray, fog drift, and boat leeway.
 */
export function evaluateWind(time: number, baseStrength: number): WindSample {
  const clampedStrength = Math.max(0, Math.min(3, baseStrength));

  // Slowly meandering prevailing coastal wind blowing roughly from sea toward cliffs (+X, -Z)
  const baseAngle =
    -0.38 +
    Math.sin(time * 0.085) * 0.22 +
    Math.cos(time * 0.037 + 1.1) * 0.14;

  const dirX = Math.cos(baseAngle);
  const dirZ = Math.sin(baseAngle);

  // Coherent multi-octave gust envelope (non-repeating feel)
  const g1 = Math.sin(time * 0.41) * 0.5 + 0.5;
  const g2 = Math.sin(time * 0.93 + 2.1) * 0.5 + 0.5;
  const g3 = Math.sin(time * 1.67 + 4.3) * 0.5 + 0.5;
  const rawGust = Math.pow(g1 * 0.55 + g2 * 0.3 + g3 * 0.15, 2.2);

  // Stronger storms amplify gust intensity
  const gustScale = Math.min(1, clampedStrength * 0.72);
  const gustFactor = rawGust * gustScale;

  const effectiveSpeed = clampedStrength * (1.0 + gustFactor * 0.85);

  return {
    dirX,
    dirZ,
    baseSpeed: clampedStrength,
    gustFactor,
    effectiveSpeed,
    velX: dirX * effectiveSpeed,
    velZ: dirZ * effectiveSpeed,
  };
}

/**
 * Spatial gust wave for vegetation & fog ribbons so gusts sweep coherently across space.
 */
export function evaluateSpatialGust(
  x: number,
  z: number,
  time: number,
  wind: WindSample
): number {
  const proj = x * wind.dirX + z * wind.dirZ;
  const wave =
    Math.sin(proj * 0.22 - time * (1.8 + wind.effectiveSpeed * 1.2)) * 0.5 + 0.5;
  const ripple =
    Math.cos(proj * 0.55 - time * 3.1 + z * 0.15) * 0.5 + 0.5;
  return (wave * 0.7 + ripple * 0.3) * wind.effectiveSpeed;
}
