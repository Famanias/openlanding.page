import { describe, expect, it } from "vitest";
import { createValenceStore } from "./store";

describe("valence external store", () => {
  it("tracks active capture tier, cohort, unlocked gates, and tailored filters", () => {
    const store = createValenceStore();
    expect(store.getSnapshot().activeTier).toBe("splash");
    expect(store.getSnapshot().unlocked.splash).toBe(false);

    let notifications = 0;
    const unsubscribe = store.subscribe(() => {
      notifications += 1;
    });

    store.setActiveTier("squeeze");
    expect(store.getSnapshot().activeTier).toBe("squeeze");
    expect(notifications).toBe(1);

    // De-duplicates identical tier updates
    store.setActiveTier("squeeze");
    expect(notifications).toBe(1);

    store.unlockTier("splash");
    expect(store.getSnapshot().unlocked.splash).toBe(true);
    expect(notifications).toBe(2);

    store.setPreviewFilter({ companySize: "1000+", role: "vp-growth" });
    expect(store.getSnapshot().companySize).toBe("1000+");
    expect(store.getSnapshot().role).toBe("vp-growth");

    unsubscribe();
  });
});
