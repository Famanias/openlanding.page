import { describe,expect,it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusApp from "./LenusApp";
describe("LenusApp",()=>{
  it("server renders the complete hero and native dialog shell",()=>{
    const html=renderToStaticMarkup(<LenusApp/>);
    for(const part of ["LENUS","REALITY","START.","STEP INSIDE",'data-testid="lenus-canvas-container"',"<dialog"])expect(html).toContain(part);
    expect(html).not.toContain("<canvas");
  });
});
