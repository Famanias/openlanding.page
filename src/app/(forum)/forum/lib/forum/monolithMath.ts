/**
 * Pure maths for the hero's 2.5D monolith scene (no three.js imports, so it is unit-testable).
 * Proportions are measured from 02-hero-monolith-clean.webp: front width : side depth : height ≈ 1 : 1.15 : 4.6.
 */
export const MONOLITH = { width: 1, depth: 1.15, height: 4.6 } as const;

type Vec3 = { x: number; y: number; z: number };

/** World x that lands at `fraction` (0 = left edge, 1 = right edge) of a perspective frame at `distance`. */
export function frameOffsetX(aspect: number, fovDeg: number, distance: number, fraction: number): number {
  const halfWidth = Math.tan((fovDeg * Math.PI) / 360) * distance * aspect;
  return (fraction * 2 - 1) * halfWidth;
}

/**
 * Where the camera ray through `target` meets the plane z = `planeZ`, and how much larger a shape must be on
 * that plane to subtend the same angle as at the target. Used to park the eclipse directly behind the slab.
 */
export function coronaAnchor(camera: Vec3, target: Vec3, planeZ: number): { x: number; y: number; scale: number } {
  const toTarget = camera.z - target.z;
  const toPlane = camera.z - planeZ;
  if (toTarget <= 0 || toPlane <= toTarget) throw new Error('the corona plane must sit behind the target');
  const scale = toPlane / toTarget;
  return { x: camera.x + (target.x - camera.x) * scale, y: camera.y + (target.y - camera.y) * scale, scale };
}

/** Ordered dithering: which of `levels` palette steps a luminance falls on for a Bayer threshold in [0, 1). */
export function ditherLevel(luminance: number, threshold: number, levels: number): number {
  const q = Math.min(1, Math.max(0, luminance)) * (levels - 1);
  const base = Math.floor(q);
  if (base >= levels - 1) return levels - 1;
  return q - base > threshold ? base + 1 : base;
}
