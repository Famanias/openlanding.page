import type { StageRect } from "./director";
export type StageTier = "phone" | "tablet" | "compact" | "desktop";
export function stageTier(width: number): StageTier {
  return width <= 600
    ? "phone"
    : width <= 900
      ? "tablet"
      : width <= 1180
        ? "compact"
        : "desktop";
}
export function bandLayout(
  width: number,
  height: number,
  chapter: number,
  pinned = false,
) {
  const tablet = stageTier(width) === "tablet";
  const fraction =
    chapter === 1
      ? tablet
        ? 0.42
        : 0.3
      : chapter === 4 && pinned
        ? tablet
          ? 0.34
          : 0.23
        : tablet
          ? 0.5
          : 0.36;
  const top = chapter === 4 && pinned ? 64 : 70;
  return {
    top,
    height: height * fraction,
    bottom: top + height * fraction + (chapter === 1 ? 154 : 30),
  };
}
export function overlaps(a: StageRect, b: StageRect) {
  return (
    a.left < b.left + b.width &&
    a.left + a.width > b.left &&
    a.top < b.top + b.height &&
    a.top + a.height > b.top
  );
}
/** Fade in reserved slots; never drag a canvas across a readable column. */
export function stageHandoff(
  current: StageRect,
  next: StageRect,
  progress: number,
  obstacles: StageRect[],
  reduced: boolean,
  stacked: boolean,
  extraHeight = 0,
) {
  const t = Math.max(0, Math.min(1, progress)),
    incoming = !reduced && t >= 0.5;
  const rect = incoming ? next : current;
  const same = (["left", "top", "width", "height"] as const).every(
    (key) => Math.abs(current[key] - next[key]) < 0.5,
  );
  let opacity =
    reduced || same
      ? 1
      : t < 0.5
        ? 1 - Math.min(1, t / 0.42)
        : Math.max(0, Math.min(1, (t - 0.58) / 0.42));
  if (!stacked) {
    const occupied = { ...rect, height: rect.height + extraHeight };
    for (const block of obstacles) {
      if (
        occupied.left >= block.left + block.width ||
        occupied.left + occupied.width <= block.left
      )
        continue;
      if (overlaps(occupied, block)) {
        opacity = 0;
        break;
      }
      const gap = Math.max(
        block.top - (occupied.top + occupied.height),
        occupied.top - (block.top + block.height),
      );
      if (!reduced)
        opacity = Math.min(opacity, Math.max(0, Math.min(1, gap / 64)));
    }
  }
  return { rect, opacity };
}
