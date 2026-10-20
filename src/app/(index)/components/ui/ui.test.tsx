import { describe, it, expect } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "./Button";
import { Badge } from "./Badge";

describe("gallery UI primitives", () => {
  it("renders Button with monochrome inversion classes", () => {
    const html = renderToStaticMarkup(<Button variant="solid">Copy prompt</Button>);
    expect(html).toContain("bg-white");
    expect(html).toContain("text-black");
    expect(html).toContain("<button");
  });

  it("renders Button with outline variant", () => {
    const html = renderToStaticMarkup(<Button variant="outline">Copy website</Button>);
    expect(html).toContain("border");
    expect(html).toContain("<button");
  });

  it("renders Button with ghost variant", () => {
    const html = renderToStaticMarkup(<Button variant="ghost">Close</Button>);
    expect(html).toContain("<button");
  });

  it("renders Button with sm and md sizes", () => {
    const smHtml = renderToStaticMarkup(<Button size="sm">Small</Button>);
    expect(smHtml).toContain("text-xs");

    const mdHtml = renderToStaticMarkup(<Button size="md">Medium</Button>);
    expect(mdHtml).toContain("text-sm");
  });

  it("renders Badge with tabular monospace styling", () => {
    const html = renderToStaticMarkup(<Badge variant="emerald">Issue #01</Badge>);
    expect(html).toContain("font-mono");
    expect(html).toContain("Issue #01");
  });

  it("renders Badge with mono variant", () => {
    const html = renderToStaticMarkup(<Badge variant="mono">GSAP</Badge>);
    expect(html).toContain("font-mono");
    expect(html).toContain("GSAP");
  });

  it("renders Badge with pulsing indicator dot when requested", () => {
    const html = renderToStaticMarkup(<Badge variant="emerald" dot>Live</Badge>);
    expect(html).toContain("animate-pulse");
    expect(html).toContain("Live");
  });
});
