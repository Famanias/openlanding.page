/** Timings observed in Lumen, adapted to the faster CTRL/ROOM workspace. */
export const CR_MOTION = {
  ease: [0.16, 1, 0.3, 1],
  feedback: 0.12,
  window: 0.28,
  exit: 0.16,
  reveal: 0.7,
  dialog: 0.32,
  menu: 0.35,
  glyph: 0.5,
  cssEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
  cssTravel: 'cubic-bezier(0.77, 0, 0.175, 1)',
} as const;

export function scrollToCtrlRoom(id: string, focusTarget = false) {
  const target = document.getElementById(id);
  if (!target) return;
  if (focusTarget) {
    if (!target.hasAttribute('tabindex')) {
      target.setAttribute('tabindex', '-1');
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.focus({ preventScroll: true });
  }
  target.scrollIntoView({
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start',
  });
}
