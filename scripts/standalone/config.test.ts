import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { discoverStandaloneTemplates, resolveStandaloneTemplate, selectSlugs } from "./config";

const roots: string[] = [];
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "export-discovery-"));
  roots.push(root);
  return root;
}
function page(root: string, slug: string, file = "page.tsx") {
  const directory = path.join(root, "src/app", `(${slug})`, slug);
  fs.mkdirSync(directory, { recursive: true });
  const entry = path.join(directory, file);
  fs.writeFileSync(entry, "export default function Page(){return null}");
  return entry;
}
afterEach(() => { for (const root of roots.splice(0)) fs.rmSync(root, { recursive: true, force: true }); });

describe("automatic standalone template discovery", () => {
  it("accepts a future registered component without an exporter registration or asset directory", () => {
    const root = fixture();
    const entry = page(root, "future-studio");
    const templates = [{ slug: "future-studio", categories: ["studio"] }];
    expect(discoverStandaloneTemplates(root, templates).map(t => t.slug)).toEqual(["future-studio"]);
    expect(resolveStandaloneTemplate("future-studio", root, templates).entry).toBe(entry);
    expect(selectSlugs(["future-studio", "future-studio"], { root, templates })).toEqual(["future-studio"]);
  });
  it.each(["page.tsx", "page.ts", "page.jsx", "page.js"])("discovers the real %s entry", file => {
    const root = fixture(); const entry = page(root, "future-page", file);
    expect(resolveStandaloneTemplate("future-page", root, [{ slug: "future-page" }]).entry).toBe(entry);
  });
  it("derives selectors from the current registry, independently of export publication", () => {
    const root = fixture(); for (const slug of ["fresh-scene", "published", "fresh-shop"]) page(root, slug);
    const templates = [
      { slug: "fresh-scene", categories: ["showcase", "3d"], hasDownload: false },
      { slug: "published", category: "3d", hasDownload: true },
      { slug: "fresh-shop", categories: ["commerce"] },
    ];
    const options = { root, templates };
    expect(selectSlugs([], options)).toEqual(["fresh-scene", "published", "fresh-shop"]);
    expect(selectSlugs(["--all"], options)).toEqual(selectSlugs([], options));
    expect(selectSlugs(["--3d"], options)).toEqual(["fresh-scene", "published"]);
    expect(selectSlugs(["--remaining"], options)).toEqual(["fresh-scene", "fresh-shop"]);
  });
  it("leaves imported HTML route handlers out of component generation and explains explicit requests", () => {
    const root = fixture(); page(root, "provided-html", "route.ts");
    const templates = [{ slug: "provided-html" }];
    expect(discoverStandaloneTemplates(root, templates)).toEqual([]);
    expect(() => selectSlugs(["provided-html"], { root, templates })).toThrow(/component page/i);
  });
  it("rejects unregistered routes even if a matching page exists", () => {
    const root = fixture(); page(root, "private-page");
    expect(() => resolveStandaloneTemplate("private-page", root, [])).toThrow(/not registered|unknown template/i);
  });
  it.each(["../private", "..\\private", "C:private", "%2e%2e", "bad/name"])("rejects unsafe slug %s before filesystem access", slug => {
    expect(() => resolveStandaloneTemplate(slug, fixture(), [{ slug }])).toThrow(/invalid.*slug/i);
  });
  it("rejects a registered page whose route group junction escapes the project", () => {
    const root = fixture(); const outside = fixture(); page(outside, "escaped");
    fs.mkdirSync(path.join(root, "src/app"), { recursive: true });
    fs.symlinkSync(path.join(outside, "src/app/(escaped)"), path.join(root, "src/app/(escaped)"), "junction");
    expect(() => discoverStandaloneTemplates(root, [{ slug: "escaped" }])).toThrow(/escapes/i);
  });
  it("rejects unknown switches with a useful error", () => {
    expect(() => selectSlugs(["--typo"], { root: fixture(), templates: [] })).toThrow(/unknown.*option/i);
  });
});
