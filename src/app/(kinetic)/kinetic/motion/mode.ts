/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion.
 * Hidden pre-reveal states hang off html[data-kn-motion="live"], so no-JS and reduced-motion
 * visitors always get the finished, visible static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.knMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;
