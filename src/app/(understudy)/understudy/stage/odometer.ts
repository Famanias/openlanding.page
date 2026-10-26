import { clamp } from "../motion/math";

/** How many callbacks have come in `p` of the way through the casting slice, one per company. */
export const callbacksAt = (p: number, companies: number) => Math.floor(clamp(p) * companies + 1e-9);

/** The last `width` digits of `n`, most significant first, for the rolling digit columns. */
export const digitsOf = (n: number, width: number) =>
  Array.from({ length: width }, (_, i) => Math.floor(Math.abs(n) / 10 ** (width - 1 - i)) % 10);
