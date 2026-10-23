import { describe, expect, it } from "vitest";
import { createWatershedStore } from "./store";

describe("RILL watershed store", () => {
  it("clamps values and notifies subscribers only when rain changes", () => {
    const store = createWatershedStore(10);
    const seen: number[] = [];
    const unsubscribe = store.subscribe(() => seen.push(store.getSnapshot()));

    store.setRain(10);
    store.setRain(42);
    store.setRain(200);
    unsubscribe();
    store.setRain(-2);

    expect(seen).toEqual([42, 80]);
    expect(store.getSnapshot()).toBe(0);
  });
});

