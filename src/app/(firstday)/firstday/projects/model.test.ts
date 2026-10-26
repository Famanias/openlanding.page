import { describe, it, expect } from "vitest";
import { filterProjects, projectById } from "./model";
describe("finding a first project", () => {
  it("shows matching projects and rejects unknown role identifiers", () => {
    expect(filterProjects("Data").map((p) => p.id)).toEqual(["data-story"]);
    expect(filterProjects("All").length).toBe(6);
    expect(projectById("<script>")).toBeUndefined();
    expect(projectById("product-sprint")?.title).toBe("Product thinking");
  });
});
