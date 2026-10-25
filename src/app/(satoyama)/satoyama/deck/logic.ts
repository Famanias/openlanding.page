import { CHAPTERS } from "./chapters";

export function moveChapter(current: number, delta: number, count: number): number {
  return Math.max(0, Math.min(count - 1, current + delta));
}

export function chapterIndex(hash: string): number {
  const index = CHAPTERS.findIndex((chapter) => chapter.id === hash.replace(/^#/, ""));
  return Math.max(0, index);
}

export function wrapActivity(index: number, count: number): number {
  return ((index % count) + count) % count;
}

export function wheelDirection(deltaX: number, deltaY: number): 1 | -1 | 0 {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  if (absX < 8 && absY < 8) return 0;
  const delta = absY >= absX ? deltaY : deltaX;
  return delta > 0 ? 1 : -1;
}

export function extractContour(d: string): string {
  return d.replace(/V\d+.*Z$/i, "").replace(/Z$/i, "");
}
