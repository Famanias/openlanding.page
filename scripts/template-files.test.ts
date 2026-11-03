import {describe,expect,it} from "vitest";
import {readTemplateFiles} from "./template-files";
describe("copyable template sources",()=>{
  it("includes imported JSON data when creating a copy bundle",()=>{
    const files=readTemplateFiles("lenus",true);
    expect(files.find(file=>file.path==="src/app/(lenus)/lenus/model/lens-spec.json")?.source).toContain('"outer-glass"');
  });
  it("exports runnable template source without Vitest component test files",()=>{
    const files=readTemplateFiles("lenus",true);
    expect(files.map(file=>file.path)).not.toContain("src/app/(lenus)/lenus/LenusApp.test.tsx");
    expect(files.some(file=>/\.test\.[jt]sx?$/.test(file.path))).toBe(false);
  });
});
