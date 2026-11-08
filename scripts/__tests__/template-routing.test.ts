import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { RAW_TEMPLATES } from "../../src/app/(index)/data/templates";
import { createTemplateRouting, templatePath } from "../../src/lib/template-routing";

describe("template URL routing", () => {
  it("constructs the public path", () => {
    expect(templatePath("volume-zero")).toBe("/templates/volume-zero");
  });

  it("mounts registered and future templates without duplicate rules", () => {
    const rules = createTemplateRouting(["orrery", "future-widget", "orrery"]);
    expect(rules.redirects).toContainEqual({ source: "/orrery/:path*", destination: "/templates/orrery/:path*", permanent: true });
    expect(rules.rewrites).toEqual([
      { source: "/templates/orrery/:path*", destination: "/orrery/:path*" },
      { source: "/templates/future-widget/:path*", destination: "/future-widget/:path*" },
    ]);
    expect(rules.redirects.filter(rule => rule.source === "/orrery/:path*")).toHaveLength(1);
  });

  it("retains unavailable registrations without enabling their content", () => {
    expect(createTemplateRouting(["retired-template"]).rewrites).toContainEqual({
      source: "/templates/retired-template/:path*", destination: "/retired-template/:path*",
    });
  });

  it.each([
    ["kinetix", "synapxe"], ["cyberpunk", "synapxe"], ["cairn", "keytu"],
  ])("redirects %s aliases directly to %s", (alias, slug) => {
    const { redirects } = createTemplateRouting(["synapxe", "keytu"]);
    for (const prefix of ["", "/templates"]) {
      expect(redirects).toContainEqual({
        source: `${prefix}/${alias}/:path*`, destination: `/templates/${slug}/:path*`, permanent: true,
      });
    }
  });

  it("derives config routes from raw registrations after public files", async () => {
    const rules = createTemplateRouting(RAW_TEMPLATES.map(template => template.slug));
    expect(await nextConfig.redirects!()).toEqual(rules.redirects);
    expect(await nextConfig.rewrites!()).toEqual({ beforeFiles: [], afterFiles: rules.rewrites, fallback: [] });
    expect(rules.redirects.some(rule => ["/:slug", "/:path*"].includes(rule.source))).toBe(false);
  });
});
