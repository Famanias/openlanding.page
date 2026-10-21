/**
 * Corridor mode (the 3D walk) needs a screen big enough to stand in and motion
 * allowed. Everything else gets flow mode: the same rooms, stacked.
 */
export const CORRIDOR_QUERY =
  "(min-width: 900px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";

/**
 * Runs before first paint so the server-rendered page never flashes flow layout
 * on a desktop. The house component keeps the attribute in sync afterwards.
 */
export const MODE_SCRIPT = `try{document.documentElement.dataset.nlMode=matchMedia(${JSON.stringify(
  CORRIDOR_QUERY,
)}).matches?"corridor":"flow"}catch(e){}`;
