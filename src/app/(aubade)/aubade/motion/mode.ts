/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion; every hidden
 * pre-reveal state and the pinned window hang off html[data-au-motion="live"], so no-JS and reduced-motion
 * visitors always get the finished, static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.auMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;
