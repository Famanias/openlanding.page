import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Configurator } from "./Configurator";

describe("RADIUS configurator", () => {
  it("renders the initial build with native selection controls and a live text summary", () => {
    const html = renderToStaticMarkup(<Configurator />);

    expect(html).toContain('id="build"');
    expect(html.match(/type="radio"/g)).toHaveLength(5);
    expect(html.match(/type="checkbox"/g)).toHaveLength(3);
    expect(html).toContain("Graphite finish, city tires. No accessories selected.");
    expect(html).toContain('aria-live="polite"');
    expect(html).toContain("Reset build");
    expect(html).toContain("02-bike-side-graphite-alpha-1600.webp");
  });
});
