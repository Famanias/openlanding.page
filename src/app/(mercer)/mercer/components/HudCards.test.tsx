import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ExperimentStatusCard, FpsBadge, TerminalCodeCard } from "./HudCards";

describe("hero telemetry", () => {
  it("displays measured FPS and does not invent an initial reading", () => {
    expect(renderToStaticMarkup(<FpsBadge fps={60} />)).toContain("60 FPS");
    expect(renderToStaticMarkup(<FpsBadge fps={0} />)).toContain("— FPS");
  });
  it("renders the code window as code, with no HTML injection", () => {
    const html = renderToStaticMarkup(<TerminalCodeCard />);
    expect(html).toContain("function applet()");
    expect(html).toContain("<code>");
    expect(html).toContain("requestAnimationFrame");
  });
  it("distinguishes a live experiment from a static fallback", () => {
    expect(renderToStaticMarkup(<ExperimentStatusCard />)).toContain("SYSTEM ONLINE");
    expect(renderToStaticMarkup(<ExperimentStatusCard />)).toContain("INTERACTIVE EXPERIMENT / 001");
    const fallback = renderToStaticMarkup(<ExperimentStatusCard online={false} />);
    expect(fallback).toContain("STATIC PREVIEW");
    expect(fallback).not.toContain("SYSTEM ONLINE");
  });
});
