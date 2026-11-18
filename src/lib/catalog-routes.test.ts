import { describe, expect, it } from "vitest";
import { RAW_TEMPLATES } from "../app/(index)/data/templates";
import { catalogIndexPath, categoryHubPath, RESERVED_CATALOG_SEGMENTS, templateDetailPath } from "./catalog-routes";

describe("catalog routes", () => {
  it("builds catalog paths", () => {
    expect(catalogIndexPath()).toBe("/landing-page-templates");
    expect(templateDetailPath("orrery")).toBe("/landing-page-templates/orrery");
    expect(categoryHubPath("3d")).toBe("/landing-page-templates/category/3d");
  });

  it("never lets a template slug shadow a reserved segment", () => {
    const reserved: readonly string[] = RESERVED_CATALOG_SEGMENTS;
    expect(RAW_TEMPLATES.filter(t => reserved.includes(t.slug))).toEqual([]);
  });
});
