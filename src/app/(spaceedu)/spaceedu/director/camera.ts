export type CameraState = { distance: number; inclination: number; azimuth: number; exposure: number; timeScale: number };
export const CAMERA_KEYFRAMES: CameraState[] = [
  { distance: 40, inclination: 80, azimuth: 0, exposure: 1, timeScale: 1 },
  { distance: 25, inclination: 60, azimuth: 6, exposure: 1.05, timeScale: 1 },
  { distance: 14, inclination: 70, azimuth: 12, exposure: 1.1, timeScale: .9 },
  { distance: 3, inclination: 72, azimuth: 16, exposure: .92, timeScale: .35 },
  { distance: 30, inclination: 64, azimuth: 18, exposure: 1, timeScale: .8 },
  { distance: 18, inclination: 68, azimuth: 22, exposure: 1.08, timeScale: 1 },
  { distance: 50, inclination: 76, azimuth: 26, exposure: .95, timeScale: .7 },
  { distance: 40, inclination: 80, azimuth: 30, exposure: 1, timeScale: 1 },
];
export function cameraAt(progress: number): CameraState {
  const p = Math.max(0, Math.min(1, progress)) * (CAMERA_KEYFRAMES.length - 1);
  const i = Math.min(CAMERA_KEYFRAMES.length - 2, Math.floor(p)); const t = p - i; const a = CAMERA_KEYFRAMES[i]; const b = CAMERA_KEYFRAMES[i + 1];
  const smooth = t * t * (3 - 2 * t);
  return { distance: a.distance + (b.distance - a.distance) * smooth, inclination: a.inclination + (b.inclination - a.inclination) * smooth, azimuth: a.azimuth + (b.azimuth - a.azimuth) * smooth, exposure: a.exposure + (b.exposure - a.exposure) * smooth, timeScale: a.timeScale + (b.timeScale - a.timeScale) * smooth };
}
export function springStep(current: number, target: number, velocity: number, dt: number, stiffness = 170, damping = 26) {
  const acceleration = (target - current) * stiffness - velocity * damping;
  const nextVelocity = velocity + acceleration * dt;
  return { value: current + nextVelocity * dt, velocity: nextVelocity };
}
