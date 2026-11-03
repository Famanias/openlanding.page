import { describe,expect,it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusOpticalLensCanvas from "./LenusOpticalLensCanvas";
describe("Lenus progressive enhancement",()=>{
  it("server renders the optical fallback and controls before mounting WebGL",()=>{
    const html=renderToStaticMarkup(<LenusOpticalLensCanvas/>);
    expect(html).toContain('data-testid="lenus-canvas-container"');expect(html).toContain('data-state="preview"');
    expect(html).toContain('class="ln-lens-fallback"');expect(html).toContain('aria-label="Interactive Lenus optical lens assembly"');
    expect(html).toContain("EXPLODE ASSEMBLY");expect(html).not.toContain("<canvas");
  });
});
