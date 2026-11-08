import { DEFAULT_ROLE } from "../content/defaults";
import { ROLE_IDS, type RoleId } from "../content/roles";

export function isRoleId(value: unknown): value is RoleId {
  return typeof value === "string" && (ROLE_IDS as readonly string[]).includes(value);
}

/** Unknown or missing values fall back to the default so a bad link never breaks the page. */
export function parseRole(value: string | null | undefined): RoleId {
  return isRoleId(value) ? value : DEFAULT_ROLE;
}

/** Wraps around: the jack row is a loop, so ArrowRight on the last jack returns to the first. */
export function stepRole(current: RoleId, delta: number): RoleId {
  const index = ROLE_IDS.indexOf(current);
  const next = (((index + delta) % ROLE_IDS.length) + ROLE_IDS.length) % ROLE_IDS.length;
  return ROLE_IDS[next];
}

type Weighted = { weights: Record<RoleId, number> };

/** Highest weight first, ties keep authored order, zero-weight items are hidden. */
export function rankForRole<T extends Weighted>(items: readonly T[], role: RoleId): T[] {
  return items
    .map((item, order) => ({ item, order, weight: item.weights[role] }))
    .filter((entry) => entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.order - b.order)
    .map((entry) => entry.item);
}

export type Point = { x: number; y: number };

/** Cubic path that hangs under gravity: both control points sag below the endpoints. */
export function cablePath(from: Point, to: Point, sag: number): string {
  const fmt = (n: number) => Math.round(n * 10) / 10;
  return `M${fmt(from.x)} ${fmt(from.y)} C${fmt(from.x)} ${fmt(from.y + sag)} ${fmt(to.x)} ${fmt(to.y + sag)} ${fmt(to.x)} ${fmt(to.y)}`;
}

/** Centre of jack `index` when `count` equal columns span `width`. */
export function jackCenterX(index: number, count: number, width: number): number {
  return ((index + 0.5) / count) * width;
}

export function roleHref(role: RoleId, search: string): string {
  const params = new URLSearchParams(search);
  if (role === DEFAULT_ROLE) params.delete("role");
  else params.set("role", role);
  const query = params.toString();
  return query ? `?${query}` : "";
}
