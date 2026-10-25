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
