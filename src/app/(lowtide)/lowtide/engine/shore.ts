import { lerp } from "../motion/math";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";

/** World units along x that one night covers; the camera walks it as progress goes 0 → 1. */
export const SHORE_LENGTH = 360;
/** Sand rises toward the camera (+z) by this much per unit. */
export const SLOPE = 0.04;
export const LOW_Y = -2.1;
export const HIGH_Y = 0.7;

export const waterLevel = (tide: number) => lerp(LOW_Y, HIGH_Y, tide);

/** The beach without ripples or pools: a gentle ramp. */
export const sandBase = (z: number) => SLOPE * z;

/** Where the water surface meets the ramp. */
export const shoreZ = (waterY: number) => waterY / SLOPE;

export const chapterX = (id: ChapterId) => CHAPTER_POINTS[id] * SHORE_LENGTH;

/** Chapter content sits on sand the low tide uncovers. */
export const CONTENT_Z = -22;
