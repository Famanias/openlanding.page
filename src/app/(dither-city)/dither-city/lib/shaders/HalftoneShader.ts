/**
 * GLSL rotated halftone screen-tone module.
 * Generates manga/newspaper circular dot screens aligned to a 45-degree print grid
 * with smooth anti-aliased transitions so dots stay visually stable during parallax.
 */
export const HALFTONE_GLSL_CHUNK = /* glsl */ `
// 45-degree rotated halftone screening returning a binary-ish smooth dot coverage
// value in [0, 1] for an input luminance in [0, 1].
float computeHalftoneScreen(vec2 fragCoord, float luminance, float scale, float resolutionScale) {
  // Cell spacing in screen pixels (~3.2px at scale=1.0 for refined print screen tone)
  float cellSize = max(2.0, 3.25 * scale * resolutionScale);

  // Rotate coordinates by 45 degrees (classic offset print / manga tone angle)
  const float c = 0.70710678;
  const float s = 0.70710678;
  vec2 rotCoord = vec2(
    fragCoord.x * c - fragCoord.y * s,
    fragCoord.x * s + fragCoord.y * c
  );

  vec2 cellUv = fract(rotCoord / cellSize) - 0.5;
  float dist = length(cellUv);

  // Dual-polarity print halftone:
  // In dark tones (<0.5), small bright dots grow on dark ink;
  // In bright tones (>=0.5), small dark dots shrink on aged-paper stock.
  float clampedLuma = clamp(luminance, 0.0, 1.0);
  float aa = 0.095;

  if (clampedLuma < 0.5) {
    float dotRadius = sqrt(clampedLuma * 2.0) * 0.45;
    return 1.0 - smoothstep(dotRadius - aa, dotRadius + aa, dist);
  } else {
    float holeRadius = sqrt((1.0 - clampedLuma) * 2.0) * 0.45;
    return smoothstep(holeRadius - aa, holeRadius + aa, dist);
  }
}

// Coarser secondary halftone strictly for acid-green light fadeouts so green glow
// dissolves into printed dots rather than smooth neon bloom.
float computeAccentHalftone(vec2 fragCoord, float greenStrength, float scale, float resolutionScale) {
  float cellSize = max(1.8, 2.9 * scale * resolutionScale);
  const float c = 0.8660254; // 30-degree secondary ink plate angle
  const float s = 0.5;
  vec2 rotCoord = vec2(
    fragCoord.x * c - fragCoord.y * s,
    fragCoord.x * s + fragCoord.y * c
  );
  vec2 cellUv = fract(rotCoord / cellSize) - 0.5;
  float dist = length(cellUv);
  float radius = sqrt(clamp(greenStrength, 0.0, 1.0)) * 0.5;
  return 1.0 - smoothstep(radius - 0.095, radius + 0.095, dist);
}
`;
