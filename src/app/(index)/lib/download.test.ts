import {afterEach,describe,expect,it,vi} from "vitest";
import {downloadStandalone} from "./download";

afterEach(()=>vi.unstubAllGlobals());
describe("native standalone downloads",()=>{
  it("checks availability with HEAD and streams through a native link without reading the HTML body",async()=>{
    const readBody=vi.fn(()=>{throw new Error("large file must not be buffered in JavaScript");});
    const fetcher=vi.fn(async()=>({ok:true,text:readBody,blob:readBody,arrayBuffer:readBody}));
    const anchor={href:"",download:"",click:vi.fn(),remove:vi.fn()};
    const append=vi.fn();
    vi.stubGlobal("fetch",fetcher);
    vi.stubGlobal("document",{createElement:()=>anchor,body:{appendChild:append}});
    await downloadStandalone("koji");
    expect(fetcher).toHaveBeenCalledWith("/downloads/koji.html",{method:"HEAD"});
    expect(anchor.href).toBe("/downloads/koji.html");
    expect(anchor.download).toBe("koji.html");
    expect(anchor.click).toHaveBeenCalledOnce();
    expect(anchor.remove).toHaveBeenCalledOnce();
    expect(readBody).not.toHaveBeenCalled();
  });
  it("does not start a download when the file is unavailable",async()=>{
    const create=vi.fn();
    vi.stubGlobal("fetch",vi.fn(async()=>({ok:false})));
    vi.stubGlobal("document",{createElement:create});
    await expect(downloadStandalone("koji")).rejects.toThrow(/unavailable/i);
    expect(create).not.toHaveBeenCalled();
  });
});
