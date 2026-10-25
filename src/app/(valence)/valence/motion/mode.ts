export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.vlMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;

export function isLive(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.vlMotion === "live";
}

export function onIdle(cb: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (fn: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout: 1400 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 140);
  return () => window.clearTimeout(id);
}
