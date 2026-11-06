import { describe,expect,it,vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusHeroCopy from "./LenusHeroCopy";
import LenusHeader from "./LenusHeader";
describe("Lenus hero composition",()=>{
  it("renders the reference wordmark and navigation actions",()=>{
    const html=renderToStaticMarkup(<LenusHeader onNavigate={vi.fn()}/>);
    for(const word of ["LENUS","WORK","EXPERTISE","TECHNOLOGY","ABOUT","GET IN TOUCH"])expect(html).toContain(word);
    expect(html).toContain('aria-label="Toggle navigation"');
  });
  it("renders exact reference copy and the step inside action",()=>{
    const html=renderToStaticMarkup(<LenusHeroCopy onStepInside={vi.fn()}/>);
    for(const word of ["REALITY","IS JUST","THE","START.","We build experiences that move brands","beyond the expected.","STEP INSIDE"])expect(html).toContain(word);
    expect(html).toContain('aria-label="REALITY IS JUST THE START."');
  });
});
