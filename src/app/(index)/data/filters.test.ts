import { describe, expect, it } from "vitest";
import { filterTemplates, modelFamily, readFilters, sortTemplates } from "./filters";
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
    expect(readFilters("?model=invalid&category=invalid&q=%3Cscript%3E")).toEqual({ model: "all", category: "all", query: "<script>", sort: "date", dir: "desc" });
    expect(readFilters(`?q=${"a".repeat(300)}`).query).toHaveLength(160);
  });
});

describe("gallery sorting", () => {
  const older = { ...TEMPLATES[0], slug: "orrery" as const, createdAt: "2026-10-20", registrationOrder: 1 };
  const newer = { ...TEMPLATES[0], slug: "koji" as const, createdAt: "2026-10-21", registrationOrder: 2 };
  const latest = { ...TEMPLATES[0], slug: "keytu" as const, createdAt: "2026-10-21", registrationOrder: 3 };
  const items = [newer, older, latest];
  it("validates URL sort values and defaults to latest added", () => {
    expect(readFilters("?sort=likes&dir=asc")).toMatchObject({ sort: "likes", dir: "asc" });
    expect(readFilters("?sort=bad&dir=bad")).toMatchObject({ sort: "date", dir: "desc" });
  });
  it("sorts dates and append-order ties in both directions without mutating input", () => {
    expect(sortTemplates(items, "date", "desc")).toEqual([latest, newer, older]);
    expect(sortTemplates(items, "date", "asc")).toEqual([older, newer, latest]);
    expect(items).toEqual([newer, older, latest]);
  });
  it("sorts likes both ways, breaks ties by latest added, and ignores dislikes", () => {
    const counts = { orrery: { up: 9, down: 99 }, koji: { up: 2, down: 0 }, keytu: { up: 2, down: 5 } };
    expect(sortTemplates(items, "likes", "desc", counts)).toEqual([older, latest, newer]);
    expect(sortTemplates(items, "likes", "asc", counts)).toEqual([latest, newer, older]);
  });
  it("uses latest-added order while counts load, and treats missing counts as zero", () => {
    expect(sortTemplates(items, "likes", "asc")).toEqual([latest, newer, older]);
    expect(sortTemplates(items, "likes", "desc", {})).toEqual([latest, newer, older]);
  });
});
