/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion; every hidden
 * pre-reveal state, the load sequence and the pinned brief hang off html[data-cr-motion="live"], so no-JS and
 * reduced-motion visitors always get the finished, static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.crMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;

export function isLive(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.crMotion === "live";
}

/** Runs `cb` when the browser is idle (or shortly after, where requestIdleCallback is missing), so scroll setup never competes with hydration. */
export function onIdle(cb: () => void): () => void {
  const w = window as Window & { requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 1500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 150);
  return () => window.clearTimeout(id);
}
