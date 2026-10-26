import { clamp } from "./math";

/**
 * Progress through a pinned (sticky) scene: 0 when its top meets the top of the screen,
 * 1 when its bottom meets the bottom, so the stage is held for `height - vh` pixels.
 */
export function pinProgress(scrollY: number, top: number, height: number, vh: number): number {
  const hold = height - vh;
  if (hold <= 0) return scrollY >= top ? 1 : 0;
  return clamp((scrollY - top) / hold);
}

/** Progress through a scene that scrolls normally: 0 when its top enters the bottom of the screen, 1 when its top reaches the top. */
export function enterProgress(scrollY: number, top: number, vh: number): number {
  return clamp((scrollY + vh - top) / Math.max(1, vh));
}

/** Which of `count` steps a pinned scene is on. Each step owns an equal slice; the last one keeps the end. */
export function stepAt(progress: number, count: number): number {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.floor(clamp(progress) * count));
}

/** The scroll position that puts a pinned scene in the middle of step `index`. */
export function scrollForStep(index: number, count: number, top: number, height: number, vh: number): number {
  const hold = Math.max(0, height - vh);
  return top + hold * ((clamp(index, 0, count - 1) + 0.5) / count);
}

/** The id of the last section whose top has passed the probe line, or null above them all. */
export function activeSection(sections: { id: string; top: number }[], scrollY: number, vh: number, probe = 0.35): string | null {
  const y = scrollY + vh * probe;
  let current: string | null = null;
  for (const s of sections) if (y >= s.top) current = s.id;
  return current;
}
