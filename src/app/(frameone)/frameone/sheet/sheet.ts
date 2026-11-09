export type FrameRect = { left: number; top: number; width: number; height: number };

export function nextProject(index: number, step: number, count: number): number {
  return count > 0 ? ((index + step) % count + count) % count : 0;
}

export function frameTransform(rect: FrameRect, width: number, height: number) {
  return {
    x: rect.left,
    y: rect.top,
    scaleX: width > 0 && rect.width > 0 ? rect.width / width : 1,
    scaleY: height > 0 && rect.height > 0 ? rect.height / height : 1,
  };
}
