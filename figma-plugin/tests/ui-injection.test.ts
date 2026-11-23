import { describe, it, expect } from "vitest";
import { injectBridgeScript } from "../src/ui/inject";

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
