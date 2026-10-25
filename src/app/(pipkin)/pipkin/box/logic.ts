import { FLAVORS, FREE_SHIPPING_AT, SHIPPING_FLAT } from "../data/shop";

export type BoxSize = 3 | 6 | 12;
export const BOX_SIZES: BoxSize[] = [3, 6, 12];

export type BoxNotice = null | "full" | "grew" | "shrank";

export type BoxState = {
  size: BoxSize;
  /** jars per flavour id */
  jars: Record<string, number>;
  notice: BoxNotice;
};

export type BoxAction =
  | { type: "add"; id: string }
  | { type: "remove"; id: string }
  | { type: "size"; size: BoxSize }
  | { type: "clear" };

export const initialBox: BoxState = { size: 6, jars: {}, notice: null };

export const jarCount = (jars: Record<string, number>) => Object.values(jars).reduce((a, b) => a + b, 0);

/** Flavour ids in the order jars sit in the box: one entry per jar, flavours in shelf order. */
export function slots(jars: Record<string, number>): string[] {
  return FLAVORS.flatMap((f) => Array.from({ length: jars[f.id] ?? 0 }, () => f.id));
}

/** Drops jars from the end of the shelf order until `jars` fits `size`. */
function trim(jars: Record<string, number>, size: number): Record<string, number> {
  const out = { ...jars };
  let over = jarCount(out) - size;
  for (const f of [...FLAVORS].reverse()) {
    if (over <= 0) break;
    const have = out[f.id] ?? 0;
    const cut = Math.min(have, over);
    if (cut) out[f.id] = have - cut;
    over -= cut;
  }
  return out;
}

export function boxReducer(state: BoxState, action: BoxAction): BoxState {
  switch (action.type) {
    case "add": {
      if (!FLAVORS.some((f) => f.id === action.id)) return state;
      let size = state.size;
      let notice: BoxNotice = null;
      if (jarCount(state.jars) >= size) {
        const next = BOX_SIZES.find((s) => s > size);
        if (!next) return { ...state, notice: "full" };
        size = next;
        notice = "grew";
      }
      return { size, jars: { ...state.jars, [action.id]: (state.jars[action.id] ?? 0) + 1 }, notice };
    }
    case "remove": {
      const have = state.jars[action.id] ?? 0;
      if (have <= 0) return state;
      return { ...state, jars: { ...state.jars, [action.id]: have - 1 }, notice: null };
    }
    case "size": {
      if (action.size === state.size) return state;
      const jars = trim(state.jars, action.size);
      const shrank = jarCount(jars) < jarCount(state.jars);
      return { size: action.size, jars, notice: shrank ? "shrank" : null };
    }
    case "clear":
      return { ...state, jars: {}, notice: null };
  }
}

export type Totals = { count: number; subtotal: number; discount: number; shipping: number; total: number; freeShipping: boolean };

/** $9 a jar, $1 off from 3 jars, $4 off from 6, $12 off at 12, shipping free from 6 jars. */
export function totals(jars: Record<string, number>): Totals {
  const count = jarCount(jars);
  const subtotal = FLAVORS.reduce((sum, f) => sum + (jars[f.id] ?? 0) * f.price, 0);
  const discount = count >= 12 ? 12 : count >= 6 ? 4 : count >= 3 ? 1 : 0;
  const freeShipping = count >= FREE_SHIPPING_AT;
  const shipping = count === 0 || freeShipping ? 0 : SHIPPING_FLAT;
  return { count, subtotal, discount, shipping, total: subtotal - discount + shipping, freeShipping };
}

export const money = (n: number) => `$${n.toFixed(0)}`;

/** Next order number shown on the success ticket. */
export const nextOrderNumber = (base = 412, placed = 0) => `#${String(base + 1 + placed).padStart(4, "0")}`;
