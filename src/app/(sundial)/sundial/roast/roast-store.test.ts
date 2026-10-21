import { describe, it, expect, beforeEach } from "vitest";
import { roastStore } from "./roast-store";
import { TOTAL_SECONDS } from "./roast";

describe("roastStore", () => {
  beforeEach(() => {
    roastStore.reset();
  });

  it("starts at elapsed 0", () => {
    expect(roastStore.getState().elapsed).toBe(0);
  });

  it("sets and notifies subscribers", () => {
    let notified = 0;
    const unsubscribe = roastStore.subscribe(() => {
      notified += 1;
    });
    roastStore.setElapsed(300);
    expect(roastStore.getState().elapsed).toBe(300);
    expect(notified).toBe(1);
    unsubscribe();
    roastStore.setElapsed(310);
    expect(notified).toBe(1);
  });

  it("clamps to the roast window", () => {
    roastStore.setElapsed(-50);
    expect(roastStore.getState().elapsed).toBe(0);
    roastStore.setElapsed(9999);
    expect(roastStore.getState().elapsed).toBe(TOTAL_SECONDS);
  });

  it("does not notify when the value is unchanged", () => {
    roastStore.setElapsed(120);
    let notified = 0;
    const unsubscribe = roastStore.subscribe(() => {
      notified += 1;
    });
    roastStore.setElapsed(120);
    expect(notified).toBe(0);
    unsubscribe();
  });

  it("rounds to tenths of a second", () => {
    roastStore.setElapsed(123.4567);
    expect(roastStore.getState().elapsed).toBe(123.5);
  });
});
