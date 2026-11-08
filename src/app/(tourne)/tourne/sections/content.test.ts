import { describe, expect, it } from "vitest";
import { GLAZE_TICKER, POTTERS, PROCESS, STUDIO_FACTS } from "./content";

describe("page content", () => {
  it("has unique ids and no empty copy", () => {
    for (const list of [PROCESS, POTTERS, STUDIO_FACTS]) {
      expect(new Set(list.map((item) => item.id)).size).toBe(list.length);
    }
    for (const step of PROCESS) expect(step.detail.length).toBeGreaterThan(30);
    for (const potter of POTTERS) expect(potter.assetKey).toMatch(/^[a-z0-9-]+$/);
    expect(GLAZE_TICKER.length).toBeGreaterThan(4);
  });
});
