export const motionTokens = {
  press: { scale: 0.97, duration: 0.11 },
  hoverSpring: { stiffness: 260, damping: 24, mass: 0.55 },
  panelSpring: { stiffness: 170, damping: 23, mass: 0.9 },
  tiltMaxDeg: 4,
  magneticMaxPx: 10,
  textLineStaggerSeconds: 0.14,
  editorialRevealSeconds: 0.85,
} as const;

export function isCoarseOrTouchDevice(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia('(pointer: coarse), (hover: none)').matches;
}

export function scrollToSectionId(sectionId: string, focusSelector?: string): void {
  if (typeof document === 'undefined') return;
  const normalizedId = sectionId.replace(/^#/, '');
  const element = document.getElementById(normalizedId);
  if (!element) return;

  const prefersReduced =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  element.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  });

  if (focusSelector) {
    window.setTimeout(() => {
      const target = element.querySelector<HTMLElement>(focusSelector);
      if (target) {
        target.focus({ preventScroll: true });
      }
    }, prefersReduced ? 30 : 450);
  }
}
