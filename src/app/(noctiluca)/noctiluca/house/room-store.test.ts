import { describe, expect, it, vi } from "vitest";
import { createRoomStore } from "./room-store";

describe("room store", () => {
  it("only notifies when the room actually changes", () => {
    const store = createRoomStore();
    const listener = vi.fn();
    store.subscribe(listener);
    store.set(0);
    expect(listener).not.toHaveBeenCalled();
    store.set(2);
    store.set(2);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.get()).toBe(2);
  });

  it("unsubscribes", () => {
    const store = createRoomStore(1);
    const listener = vi.fn();
    const off = store.subscribe(listener);
    off();
    store.set(3);
    expect(listener).not.toHaveBeenCalled();
  });
});
