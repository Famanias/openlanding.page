import { clamp } from "../motion/math";

export type FieldSection = { id: string; top: number; height: number };

/** Progress is measured against real section offsets, so layout changes do not break the field log. */
export function fieldProgress(scrollY: number, sections: FieldSection[], viewportHeight = 0): number {
  if (sections.length === 0) return 0;
  const line = scrollY + viewportHeight * 0.32;
  const first = sections[0];
  const last = sections[sections.length - 1];
  if (line <= first.top) return 0;
  const lastEnd = last.top + Math.max(1, last.height);
  if (line >= lastEnd) return 1;

  const index = sections.findIndex((section) => line < section.top + Math.max(1, section.height));
  const activeIndex = Math.max(0, index);
  const section = sections[activeIndex];
  const local = clamp((line - section.top) / Math.max(1, section.height));
  return clamp((activeIndex + local) / Math.max(1, sections.length - 1));
}

export function chapterFromProgress(progressValue: number, sections: FieldSection[]): string | null {
  if (sections.length === 0) return null;
  const index = Math.min(sections.length - 1, Math.floor(clamp(progressValue) * sections.length));
  return sections[index].id;
}
