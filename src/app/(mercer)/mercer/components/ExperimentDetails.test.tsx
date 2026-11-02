import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ExperimentDetails from "./ExperimentDetails";

describe("Mercer experiment notes", () => {
  it("presents the linked knot study and a readable applet sketch inside the shared dialog", () => {
    const html = renderToStaticMarkup(<ExperimentDetails onReturn={() => {}} />);
    expect(html).toContain('id="jm-dialog-title"');
    const heading = html.match(/<h2[^>]*>(.*?)<\/h2>/)?.[1].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    expect(heading).toBe("A knot of possibilities.");
    expect(html).toContain("(2, 3) TORUS KNOT");
    expect(html).toContain("APPLET SKETCH");
    expect(html).toContain("function applet()");
    expect(html).toContain("RETURN TO EXPERIMENT");
    expect(html).toContain('<svg');
    expect(html).not.toContain('<dialog');
    expect(html).not.toContain('<iframe');
  });
});
