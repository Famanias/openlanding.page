/**
 * Spectral stops for dispersion fans: what white light becomes after the prism.
 * Optical content, not brand colour (exempt from the palette guard), used only where a ray has split.
 */
export const SPECTRUM = [
  { nm: 650, color: "#F0455A" },
  { nm: 600, color: "#F79A3E" },
  { nm: 570, color: "#EFD24A" },
  { nm: 520, color: "#3CCB7F" },
  { nm: 470, color: "#3B82F6" },
  { nm: 420, color: "#8B5CF6" },
] as const;

/** The spectrum as a CSS gradient, for caustic sweeps and the sampler's fan. */
export const spectrumGradient = (angle = 90) =>
  `linear-gradient(${angle}deg, ${SPECTRUM.map((s, i) => `${s.color} ${Math.round((i / (SPECTRUM.length - 1)) * 100)}%`).join(", ")})`;
