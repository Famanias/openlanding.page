export interface FieldController {
  /** Runs the animation loop only while the host is on screen. */
  setActive(active: boolean): void;
  resize(): void;
  destroy(): void;
}

export const NOOP_FIELD: FieldController = {
  setActive: () => {},
  resize: () => {},
  destroy: () => {},
};

/** Wires a canvas field to its host: pause off screen, re-fit on resize, tear down on cleanup. */
export function mountField(host: HTMLElement, controller: FieldController): () => void {
  const visibility = new IntersectionObserver(
    (entries) => {
      const entry = entries[entries.length - 1];
      if (entry) controller.setActive(entry.isIntersecting);
    },
    { rootMargin: '120px 0px' },
  );
  const size = new ResizeObserver(() => controller.resize());

  visibility.observe(host);
  size.observe(host);

  return () => {
    visibility.disconnect();
    size.disconnect();
    controller.destroy();
  };
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

/** Small deterministic generator so drawn scenery is identical on every visit. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
