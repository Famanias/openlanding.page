import { clamp } from "../motion/math";

export type Tone = "light" | "dark";

/** A scene measured once per resize: its top in document pixels, its height, and the chrome tone it asks for. */
export type SceneBox = { top: number; height: number; tone: Tone; /** pin progress after which a light scene turns dark */ darkFrom?: number };

/**
 * Progress through a pinned (sticky) scene: 0 when its top meets the top of the screen,
 * 1 when its bottom meets the bottom, so the stage is held for `height - vh` pixels.
 */
export function pinProgress(scrollY: number, top: number, height: number, vh: number): number {
  const hold = height - vh;
  if (hold <= 0) return scrollY >= top ? 1 : 0;
  return clamp((scrollY - top) / hold);
}

/**
 * Progress through a scene that scrolls normally: 0 when its top crosses the reading line
 * (`line` of the way down the screen), 1 when its bottom does.
 */
export function flowProgress(scrollY: number, top: number, height: number, vh: number, line = 0.6): number {
  return clamp((scrollY + vh * line - top) / Math.max(1, height));
}

/** The tone of the scene under a probe line `probe` of the way down the screen. */
export function toneAt(boxes: SceneBox[], scrollY: number, vh: number, probe: number): Tone {
  const y = scrollY + vh * probe;
  const box = boxes.find((b) => y >= b.top && y < b.top + b.height);
  if (!box) return "light";
  if (box.darkFrom !== undefined && pinProgress(scrollY, box.top, box.height, vh) >= box.darkFrom) return "dark";
  return box.tone;
}
