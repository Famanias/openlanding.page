import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MercerApp from "./MercerApp";

describe("Mercer portfolio hero", () => {
  it("assembles the header, experiment, selected projects and accessible dialogs", () => {
    const html = renderToStaticMarkup(<MercerApp />);
    for (const text of ["JULES MERCER", "IMAGINE.", "MONOCHROME", "SHIFT SYSTEM", "FORM STUDY"]) expect(html).toContain(text);
    expect(html).toContain('id="main-content"');
    expect(html).toContain('href="#main-content"');
    expect(html).toContain('<dialog');
    expect(html).toContain('aria-label="Close details"');
    expect(html.match(/<main/g)).toHaveLength(1);
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html).not.toContain('href="#"');
  });
});
