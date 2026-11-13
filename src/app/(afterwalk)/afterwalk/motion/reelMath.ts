/** The canonical cycle starts after the first, decorative copy. */
export function wrapReelOffset(position: number, period: number): number {
  if (!Number.isFinite(period) || period <= 0) return 0;
  const offset = Number.isFinite(position) ? position : 0;
  const phase = ((-offset % period) + period) % period;
  return -period - phase;
}

/** Keep the same part of the filmstrip in view when its card sizes change. */
export function rescaleReelPhase(position: number, oldPeriod: number, newPeriod: number): number {
  if (![position, oldPeriod, newPeriod].every(Number.isFinite) || oldPeriod <= 0 || newPeriod <= 0) return 0;
  const phase = ((-position % oldPeriod) + oldPeriod) % oldPeriod;
  return phase === 0 ? 0 : -(phase / oldPeriod) * newPeriod;
}

/** In the still native-scroll view, buttons wrap without starting autoplay. */
export function nextStaticReelOffset(current: number, step: number, max: number, direction: 1 | -1): number {
  const limit = Number.isFinite(max) ? Math.max(0, max) : 0;
  if (!limit) return 0;
  const position = Number.isFinite(current) ? Math.min(limit, Math.max(0, current)) : 0;
  const distance = Number.isFinite(step) ? Math.max(0, step) : 0;
  if (direction === 1 && position >= limit - 1) return 0;
  if (direction === -1 && position <= 1) return limit;
  return Math.min(limit, Math.max(0, position + distance * direction));
}
