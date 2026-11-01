import { describe, expect, it } from "vitest";
import { filterProjects, projects } from "./projects";

describe("Landing X work index", () => {
  it("shows every project in the full index and only the selected kind in a filtered index", () => {
    expect(filterProjects("all")).toHaveLength(6);
    expect(filterProjects("product").map((project) => project.name)).toEqual(["Avel", "Pello"]);
    expect(filterProjects("place").map((project) => project.name)).toEqual(["Rill", "Hiyas"]);
  });
  it("assigns unique image slots and real template routes", () => {
    expect(new Set(projects.map((project) => project.asset)).size).toBe(projects.length);
    expect(projects.every((project) => project.href.startsWith("/"))).toBe(true);
  });
});
