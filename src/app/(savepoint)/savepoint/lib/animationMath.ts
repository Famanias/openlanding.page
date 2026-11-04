export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smoothstep01 = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
export const spreadOffset = (r: number) => Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * .5;
export const computeCartridgeX = (r: number, ws = .14, d = .84, gap = .10) => r * (ws + gap) + (d - ws + 1.6 * gap) * spreadOffset(r);
export const computeOpenness = (r: number) => smoothstep01(Math.max(0, 1 - Math.abs(r)));
export const modulo = (n: number, length = 10) => ((n % length) + length) % length;
