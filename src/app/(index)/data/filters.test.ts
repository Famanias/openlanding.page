import { describe, expect, it } from "vitest";
import { filterTemplates, modelFamily, readFilters } from "./filters";
import { TEMPLATES } from "./templates";

describe("gallery discovery", () => {
  it("groups the catalog's model names by provider", () => {
    expect(modelFamily("Claude Opus 5.5 High")).toBe("claude");
    expect(modelFamily("GPT-6 Astra Max")).toBe("openai");
    expect(modelFamily("Gemini 3.8 Flash High")).toBe("gemini");
    expect(modelFamily("MiMo v2.6 Flash Free")).toBe("other");
  });
  it("intersects search, category, and model", () => {
    expect(filterTemplates(TEMPLATES, { query: "trace", category: "3d-webgpu", model: "openai" }).map((item) => item.slug)).toEqual(["trace"]);
    expect(filterTemplates(TEMPLATES, { query: "trace", category: "3d-webgpu", model: "claude" })).toEqual([]);
  });
  it("searches multiword descriptions and provider aliases without case sensitivity", () => {
    const matches = filterTemplates(TEMPLATES, { query: " OPENAI spatial ", category: "all", model: "all" });
    expect(matches.some((item) => item.slug === "trace")).toBe(true);
  });
  it("validates URL enums, preserves literal search text, and limits its length", () => {
    expect(readFilters("?model=invalid&category=invalid&q=%3Cscript%3E")).toEqual({ model: "all", category: "all", query: "<script>" });
    expect(readFilters(`?q=${"a".repeat(300)}`).query).toHaveLength(160);
  });
});
