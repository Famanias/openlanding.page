/**
 * Runs inline before first paint. Sets html[data-tl-motion="live"] only when JS is enabled
 * and prefers-reduced-motion is not "reduce". All hidden pre-reveal states and pinned scroll
 * stages are scoped under html[data-tl-motion="live"], guaranteeing a complete static page
 * when JS is disabled or reduced motion is active.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.tlMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;

export function isMotionLive(): boolean {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.tlMotion === "live" &&
    document.documentElement.dataset.tlPaused !== "true"
  );
}
