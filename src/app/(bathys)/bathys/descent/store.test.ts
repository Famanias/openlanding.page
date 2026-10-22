import { describe, it, expect, vi } from "vitest";
import { createDescentStore } from "./store";
import { MAX_DEPTH } from "./physics";

describe("descent/store", () => {
  it("initializes with depth 0 by default", () => {
    const store = createDescentStore();
    expect(store.getSnapshot()).toBe(0);
  });

  it("initializes with a specified depth", () => {
    const store = createDescentStore(4500);
    expect(store.getSnapshot()).toBe(4500);
  });

  it("updates depth and notifies subscribers", () => {
    const store = createDescentStore();
    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);
    store.setDepth(2000);

    expect(store.getSnapshot()).toBe(2000);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.setDepth(3000);
    expect(listener).toHaveBeenCalledTimes(1); // not called again
  });

  it("clamps depth between 0 and MAX_DEPTH", () => {
    const store = createDescentStore();
    store.setDepth(-100);
    expect(store.getSnapshot()).toBe(0);

    store.setDepth(15000);
    expect(store.getSnapshot()).toBe(MAX_DEPTH);
  });

  it("does not notify if depth is unchanged", () => {
    const store = createDescentStore(500);
    const listener = vi.fn();
    store.subscribe(listener);

    store.setDepth(500);
    expect(listener).not.toHaveBeenCalled();
  });
});
