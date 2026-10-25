export const NULO_MOTION_SCRIPT = `
  (function () {
    try {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.documentElement.dataset.nuloMotion = reduce ? 'reduced' : 'live';
    } catch (_) {}
  })();
`;
