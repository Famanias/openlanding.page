import {afterEach,describe,expect,it,vi} from "vitest";
import {downloadStandalone,trackDownload} from "./download";

afterEach(()=>vi.unstubAllGlobals());
describe("native standalone downloads",()=>{
  it("checks availability with HEAD, streams through a native link, and fires a tracking beacon",async()=>{
    const readBody=vi.fn(()=>{throw new Error("large file must not be buffered in JavaScript");});
    const fetcher=vi.fn(async()=>({ok:true,text:readBody,blob:readBody,arrayBuffer:readBody}));
    const sendBeacon=vi.fn(()=>true);
    const anchor={href:"",download:"",click:vi.fn(),remove:vi.fn()};
    const append=vi.fn();
    vi.stubGlobal("fetch",fetcher);
    vi.stubGlobal("navigator",{sendBeacon});
    vi.stubGlobal("document",{createElement:()=>anchor,body:{appendChild:append}});
    await downloadStandalone("koji");
    expect(fetcher).toHaveBeenCalledExactlyOnceWith("/downloads/koji.html",{method:"HEAD"});
    expect(anchor.href).toBe("/downloads/koji.html");
    expect(anchor.download).toBe("koji.html");
    expect(anchor.click).toHaveBeenCalledOnce();
    expect(anchor.remove).toHaveBeenCalledOnce();
    expect(sendBeacon).toHaveBeenCalledExactlyOnceWith("/api/downloads/koji");
    expect(readBody).not.toHaveBeenCalled();
  });
  it("does not start or track a download when the file is unavailable",async()=>{
    const create=vi.fn();
    const sendBeacon=vi.fn(()=>true);
    vi.stubGlobal("fetch",vi.fn(async()=>({ok:false})));
    vi.stubGlobal("navigator",{sendBeacon});
    vi.stubGlobal("document",{createElement:create});
    await expect(downloadStandalone("koji")).rejects.toThrow(/unavailable/i);
    expect(create).not.toHaveBeenCalled();
    expect(sendBeacon).not.toHaveBeenCalled();
  });
  it("falls back to keepalive POST when sendBeacon is unavailable or returns false",()=>{
    const fetcher=vi.fn(async()=>({ok:true}));
    vi.stubGlobal("fetch",fetcher);
    vi.stubGlobal("navigator",{sendBeacon:vi.fn(()=>false)});
    trackDownload("koji");
    expect(fetcher).toHaveBeenCalledExactlyOnceWith("/api/downloads/koji",{method:"POST",keepalive:true});
  });
});
