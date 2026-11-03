import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusLensFallback from "./LenusLensFallback";
describe("LenusLensFallback",()=>{
  it("renders an accessible procedural optical assembly without JavaScript",()=>{
    const html=renderToStaticMarkup(<LenusLensFallback/>);
    expect(html).toContain('class="ln-lens-fallback"');
    expect(html).toContain('<svg');expect(html).toContain('viewBox="-280 -280 560 560"');
    expect(html).toContain('Optical lens');expect(html).toContain('data-optical-ring');
    expect(html).toContain('#00E599');
  });
});
