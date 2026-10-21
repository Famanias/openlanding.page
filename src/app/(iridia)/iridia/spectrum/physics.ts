/**
 * Pure mathematical functions for optical dispersion, Cauchy equations,
 * camera orbit matrices, and spectral parameters.
 */

/**
 * Calculates refractive index at a given wavelength using Cauchy's empirical formula:
 * n(λ) = A + B / λ² (where λ is in micrometers)
 */
export function cauchyRefraction(a: number, b: number, wavelengthNm: number): number {
  if (wavelengthNm <= 0) return a;
  const lambdaMicrons = wavelengthNm / 1000;
  return a + b / (lambdaMicrons * lambdaMicrons);
}

/**
 * Calculates Abbe number (constringence Vd), measuring optical dispersion:
 * Vd = (nD - 1) / (nF - nC)
 * Fraunhofer lines:
 * nD = 589.3 nm (yellow sodium)
 * nF = 486.1 nm (blue hydrogen)
 * nC = 656.3 nm (red hydrogen)
 */
export function calculateAbbeNumber(nD: number, nF: number, nC: number): number {
  const dispersion = nF - nC;
  if (Math.abs(dispersion) < 0.0001) return 100.0;
  return (nD - 1.0) / dispersion;
}

/**
 * Maps physical wavelength in nanometers (380 to 700 nm) to approximate Hue angle (0 to 360 deg).
 */
export function wavelengthToHue(wavelengthNm: number): number {
  const clamped = Math.max(380, Math.min(700, wavelengthNm));
  // 380 nm -> Violet (280°), 480 nm -> Cyan (180°), 530 nm -> Green (130°), 590 nm -> Yellow (50°), 650 nm -> Red (0°)
  if (clamped < 440) {
    return 280 - ((clamped - 380) / 60) * 40; // 280 -> 240
  } else if (clamped < 490) {
    return 240 - ((clamped - 440) / 50) * 60; // 240 -> 180 (Cyan)
  } else if (clamped < 550) {
    return 180 - ((clamped - 490) / 60) * 60; // 180 -> 120 (Green)
  } else if (clamped < 600) {
    return 120 - ((clamped - 550) / 50) * 70; // 120 -> 50 (Yellow)
  } else {
    return Math.max(0, 50 - ((clamped - 600) / 100) * 50); // 50 -> 0 (Red)
  }
}

/**
 * Simulates optical radiative energy flux in lm/m² given refractive index and wavelength.
 */
export function calculateFlux(refractiveIndex: number, wavelengthNm: number, baseLumens = 1000): number {
  // Higher refraction and shorter wavelengths concentrate flux density
  const wavelengthFactor = 550 / Math.max(380, Math.min(750, wavelengthNm));
  const indexFactor = Math.pow(refractiveIndex, 1.4);
  return Math.round(baseLumens * wavelengthFactor * indexFactor);
}

export interface CameraOrbitState {
  pitchDeg: number;
  yawDeg: number;
  rollDeg: number;
  translationZ: number;
  focalDepth: number;
}

/**
 * Calculates 3D camera orbit coordinates given normalized scroll progress (0..1)
 * and normalized pointer offset (-1..1).
 */
export function calculateCameraOrbit(
  scrollProgress: number,
  pointerX = 0,
  pointerY = 0
): CameraOrbitState {
  const progress = Math.max(0, Math.min(1, scrollProgress));
  const px = Math.max(-1, Math.min(1, pointerX));
  const py = Math.max(-1, Math.min(1, pointerY));

  // Base camera path: starts frontal, sweeps around side facets, tilts as scroll deepens
  // Pitch moves from -2deg down to +6deg with pointer bias (+-4deg)
  const pitchDeg = -2 + progress * 8 + py * -4.5;

  // Yaw orbits through 360 degrees * scroll progress with pointer bias (+-6deg)
  const yawDeg = Math.sin(progress * Math.PI * 2) * 12 + px * 6.0;

  // Subtle banking roll
  const rollDeg = px * -1.5;

  // Z-depth pushes camera slightly in and out along an orbital wave
  const translationZ = Math.cos(progress * Math.PI * 2) * 60 - 20;

  // Focal depth in meters
  const focalDepth = 1.2 + Math.sin(progress * Math.PI) * 0.8;

  return {
    pitchDeg: Number(pitchDeg.toFixed(2)),
    yawDeg: Number(yawDeg.toFixed(2)),
    rollDeg: Number(rollDeg.toFixed(2)),
    translationZ: Math.round(translationZ),
    focalDepth: Number(focalDepth.toFixed(2)),
  };
}

/**
 * Linear clamp helper.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Linear interpolation between two numbers.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp(t, 0, 1);
}
