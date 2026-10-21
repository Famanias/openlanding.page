import { describe, expect, test, vi } from "vitest";
import { createClockStore } from "./clock-store";

describe("createClockStore", () => {
  test("initializes with default hour 0 and first fragrance", () => {
    const store = createClockStore();
    expect(store.getState().hour).toBe(0);
    expect(store.getState().fragranceSlug).toBe("iris-calcaire");
  });

  test("initializes with custom state", () => {
    const store = createClockStore({ hour: 3.5, fragranceSlug: "premiere-heure" });
    expect(store.getState().hour).toBe(3.5);
    expect(store.getState().fragranceSlug).toBe("premiere-heure");
  });

  test("notifies subscribers when hour changes", () => {
    const store = createClockStore();
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setHour(2.5);
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.getState().hour).toBe(2.5);

    unsubscribe();
    store.setHour(4);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("clamps hours between 0 and 12", () => {
    const store = createClockStore();
    store.setHour(-3);
    expect(store.getState().hour).toBe(0);

    store.setHour(15);
    expect(store.getState().hour).toBe(12);
  });

  test("notifies subscribers when fragrance changes", () => {
    const store = createClockStore();
    const listener = vi.fn();
    store.subscribe(listener);

    store.setFragranceSlug("fumee-lente");
    expect(listener).toHaveBeenCalledTimes(1);
    expect(store.getState().fragranceSlug).toBe("fumee-lente");
  });

  test("does not notify if state does not change", () => {
    const store = createClockStore({ hour: 4, fragranceSlug: "iris-calcaire" });
    const listener = vi.fn();
    store.subscribe(listener);

    store.setHour(4);
    store.setFragranceSlug("iris-calcaire");
    expect(listener).not.toHaveBeenCalled();
  });
});
