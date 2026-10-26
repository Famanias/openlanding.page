import { lerp } from "../motion/math";

export type ArchRest = { /** width of the mark at rest */ w: number; h: number; /** vertical centre of the mark at rest, px from the top */ y: number };
export type Inset = { top: number; right: number; bottom: number; left: number; radius: number };

/**
 * The proscenium is the dark house's clip-path. At rest it is the logo mark under the
 * headline (a rounded-top arch); at `t` = 1 it is the whole screen. The insets grow on an
 * ease so the push-in starts slow and lands hard, like a dolly.
 */
export function archInset(t: number, vw: number, vh: number, rest: ArchRest): Inset {
  if (t >= 1) return { top: 0, right: 0, bottom: 0, left: 0, radius: 0 };
  const e = t * t * t; // ease-in: the camera accelerates into the opening
  const side = (vw - rest.w) / 2;
  const top = rest.y - rest.h / 2;
  const bottom = vh - (rest.y + rest.h / 2);
  return {
    top: Math.max(0, lerp(top, 0, e)),
    right: Math.max(0, lerp(side, 0, e)),
    bottom: Math.max(0, lerp(bottom, 0, e)),
    left: Math.max(0, lerp(side, 0, e)),
    radius: lerp(rest.w / 2, 0, e),
  };
}
