import type { CSSProperties } from "react";
import { ROOMS } from "../rooms/rooms";
import { PHENOMENA } from "./phenomena";

/** A room's four light stops as CSS custom properties (`--nl-a` … `--nl-d`). */
export function roomStops(index: number, prefix = "--nl"): CSSProperties {
  const room = ROOMS[Math.max(0, Math.min(ROOMS.length - 1, index))];
  const [a, b, c, d] = PHENOMENA[room.id].stops;
  return { [`${prefix}-a`]: a, [`${prefix}-b`]: b, [`${prefix}-c`]: c, [`${prefix}-d`]: d } as CSSProperties;
}
