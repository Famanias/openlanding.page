/** Direction 1 moves forward through the photographs; -1 moves back. */
export function nextReelOffset(current: number, step: number, overflow: number, direction: 1 | -1): number {
  const limit = Number.isFinite(overflow) ? Math.max(0, overflow) : 0;
  if (limit === 0) return 0;
  const position = Number.isFinite(current) ? Math.min(0, Math.max(-limit, current)) : 0;
  const distance = Number.isFinite(step) ? Math.max(0, step) : 0;
  return Math.min(0, Math.max(-limit, position - distance * direction));
}
