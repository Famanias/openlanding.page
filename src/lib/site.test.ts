import { describe, expect, it } from "vitest";
import { absoluteUrl, SITE_URL } from "./site";

describe("site", () => {
  it("uses the canonical www origin", () => {
    expect(SITE_URL).toBe("https://www.openlanding.page");
  });

  it("builds absolute URLs on the canonical origin", () => {
    expect(absoluteUrl("/templates/orrery")).toBe("https://www.openlanding.page/templates/orrery");
    expect(absoluteUrl()).toBe("https://www.openlanding.page/");
  });
});
