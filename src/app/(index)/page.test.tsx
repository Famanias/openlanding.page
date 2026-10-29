import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import IndexPage from "./page";

describe("IndexPage", () => {
  it("renders full landing page assembly with Header, Hero, Gallery, Contribute, and Footer", async () => {
    const element = await IndexPage();
    const html = renderToStaticMarkup(element);
    expect(html).toContain("openlandingpage");
    expect(html).toContain("Landing Pages, from Header to Footer.");
    expect(html).toContain('id="gallery"');
    expect(html).toContain('id="contribute"');
    expect(html).toContain("Want to Contribute?");
    expect(html).toContain("Orrery");
    expect(html).toContain("KEYTU");
    expect(html).toContain("KŌJI");
    expect(html).toContain("TRACE");
    expect(html).toContain("CALDER &amp; ROWE");
    expect(html).toContain("VECTOR/90");
    expect(html).not.toContain("MORROW");
    expect(html).toContain("LOOPHOUSE");
    expect(html).toContain("GitHub");
    expect(html).toContain("OpenLanding.page. MIT Licensed.");
  });
});
