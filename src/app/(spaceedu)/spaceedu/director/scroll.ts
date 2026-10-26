export function scrollProgress(scrollY: number, pageHeight: number, viewportHeight: number) {
  return Math.max(0, Math.min(1, scrollY / Math.max(pageHeight - viewportHeight, 1)));
}
export function chapterIndex(progress: number, count: number) { return Math.max(0, Math.min(count - 1, Math.round(progress * (count - 1)))); }
