type ScrollDriver = { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void; stop: () => void; start: () => void };
let driver: ScrollDriver | null = null;
let locked = false;

export function registerScrollDriver(next: ScrollDriver) {
  driver = next;
  if (locked) next.stop();
  return () => { if (driver === next) driver = null; };
}

export function lockLumenScroll(next: boolean) {
  locked = next;
  if (next) driver?.stop(); else driver?.start();
}

export function scrollToLumen(target: HTMLElement | number) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const offset = (document.querySelector('.lumen-header')?.getBoundingClientRect().bottom ?? 64) + 20;
  if (driver && !reduce) {
    driver.scrollTo(target, { offset: typeof target === 'number' ? 0 : -offset, duration: 1.15 });
  } else {
    const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'instant' : 'smooth' });
  }
}
