import { describe, it, expect } from "vitest";
import { EARLY_IO_SHIM, injectBridgeScript, injectHeadShim } from "../src/ui/inject";

describe("injectBridgeScript", () => {
  it("injects before the last </body> and preserves $& and escaped </script> literals", () => {
    const html = "<!DOCTYPE html><html><head><title>T</title></head><body><h1>Hi</h1></body></html>";
    const out = injectBridgeScript(html, 'const r = "$&"; console.log("</script>");');
    expect(out).toContain('<script>const r = "$&"; console.log("<\\/script>");</script></body>');
  });

  it("handles bare HTML fragments without <html> or <body>", () => {
    const out = injectBridgeScript("<div>Hello</div>", "window.__ok = true;");
    expect(out).toContain("<div>Hello</div>");
    expect(out).toContain("window.__ok = true;");
  });

  it("falls back to before </html> when </body> is missing and matches tags case-insensitively", () => {
    const out = injectBridgeScript("<HTML><DIV>Hi</DIV></HTML>", "window.__x = 1;");
    expect(out).toBe("<HTML><DIV>Hi</DIV><script>window.__x = 1;</script></HTML>");
  });
});

describe("injectHeadShim", () => {
  it("injects right after <head> so the IntersectionObserver shim executes before page scripts", () => {
    const html = "<!DOCTYPE html><html><head><script>new IntersectionObserver(()=>{})</script></head><body></body></html>";
    const out = injectHeadShim(html, EARLY_IO_SHIM);
    const shimPos = out.indexOf("__h2f_ioPatched");
    const pageScriptPos = out.indexOf("new IntersectionObserver");
    expect(shimPos).toBeGreaterThan(-1);
    expect(shimPos).toBeLessThan(pageScriptPos);
    expect(() => new Function(EARLY_IO_SHIM)).not.toThrow();
  });

  it("falls back to after <html> or document start when <head> is absent", () => {
    expect(injectHeadShim("<html lang='en'><body></body></html>", "var a=1;")).toBe(
      "<html lang='en'><script>var a=1;</script><body></body></html>"
    );
    expect(injectHeadShim("<div>Hi</div>", "var a=1;")).toBe("<script>var a=1;</script><div>Hi</div>");
  });
});
