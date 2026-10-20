import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import IndexPage from "./page";

describe("IndexPage", () => {
  it("renders full landing page assembly with Header, Hero, Gallery, HowItWorks, and Footer", async () => {
    const element = await IndexPage();
    const html = renderToStaticMarkup(element);
    expect(html).toContain("templateflow");
    expect(html).toContain("Issue #01");
    expect(html).toContain('id="gallery"');
    expect(html).toContain('id="how-it-works"');
    expect(html).toContain("Orrery");
    expect(html).toContain("KEYTU");
    expect(html).toContain("KŌJI");
    expect(html).toContain("TRACE");
    expect(html).toContain("CALDER &amp; ROWE");
    expect(html).toContain("VECTOR/90");
    expect(html).toContain("MORROW");
    expect(html).toContain("LOOPHOUSE");
    expect(html).toContain("GitHub");
  });
});
