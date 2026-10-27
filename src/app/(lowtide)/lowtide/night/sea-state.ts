import { clamp, damp } from "../motion/math";

/** Scroll speed (px/s) that whips the sea to full roughness. */
const FULL_ROUGH_VELOCITY = 4000;
const ATTACK = 12;
const RELEASE = 2;

/** How churned the water is: rises fast with scroll speed, settles to glassy over ~1.5 s. */
export function stepRoughness(prev: number, velocityPxPerSec: number, dt: number) {
  const target = clamp(Math.abs(velocityPxPerSec) / FULL_ROUGH_VELOCITY);
  return clamp(damp(prev, target, target > prev ? ATTACK : RELEASE, dt));
}

const STILL_AFTER_MS = 1200;
const RISE_SECONDS = 2;

/** Stillness: after 1.2 s without pointer or scroll movement, calm rises 0 → 1 over 2 s; movement sinks it fast. */
export function stepCalm(prev: number, stillForMs: number, dt: number) {
  if (stillForMs < STILL_AFTER_MS) return clamp(damp(prev, 0, 6, dt));
  return clamp(prev + dt / RISE_SECONDS);
}
