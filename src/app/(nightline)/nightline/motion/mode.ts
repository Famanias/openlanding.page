export const NL_MOTION_SCRIPT = `(() => { try { if (matchMedia('(prefers-reduced-motion: no-preference)').matches) document.documentElement.dataset.nlMotion = 'live'; } catch {} })();`;
