import { clamp } from "../motion/math";
export function lanternPose(amount: number) {
  const p = clamp(amount);
  return { x: p ? -45 * p : 0, y: p ? -170 * p : 0, rotate: -4 + 9 * p };
}
