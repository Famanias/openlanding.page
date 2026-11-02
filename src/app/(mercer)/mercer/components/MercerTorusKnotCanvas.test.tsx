import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MercerTorusKnotCanvas from "./MercerTorusKnotCanvas";

describe("canvas progressive enhancement", () => {
  it("server renders a procedural fallback and HUD before any browser APIs run", () => {
    const html = renderToStaticMarkup(<MercerTorusKnotCanvas />);
    expect(html).toContain('data-testid="mercer-canvas-container"');
    expect(html).toContain('data-state="preview"');
    expect(html).toContain('<svg');
    expect(html).toContain("INTERACTIVE EXPERIMENT / 001");
    expect(html).toContain("STATIC PREVIEW");
    expect(html).not.toContain("<canvas");
  });
  it("provides a named keyboard interaction area and instructions before the scene loads", () => {
    const html = renderToStaticMarkup(<MercerTorusKnotCanvas />);
    expect(html).toContain('aria-label="Interactive torus knot"');
    expect(html).toContain('aria-describedby="jm-knot-help"');
    expect(html).toContain('id="jm-knot-help"');
    expect(html).toContain("Arrow keys");
    expect(html).toContain("DRAG TO ROTATE");
  });
});
