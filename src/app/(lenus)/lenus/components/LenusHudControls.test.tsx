import { describe,expect,it,vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LenusHudControls } from "./LenusHudControls";
import {getPartTelemetry} from "../scene/telemetry";
describe("Lenus optical HUD",()=>{
  it("keeps interior inspection available in static fallback mode",()=>{
    const html=renderToStaticMarkup(<LenusHudControls state="static" fps={0} exploded={false} explodeAmount={0} focusAngle={0} activePart={getPartTelemetry(null)} paused={false} cutaway={false} onToggleCutaway={vi.fn()} onToggleExplode={vi.fn()} onExplodeChange={vi.fn()} onFocusChange={vi.fn()} onResetView={vi.fn()} onTogglePause={vi.fn()}/>);
    expect(html).toContain('aria-label="Inspect lens interior"');
    const button=html.match(/<button[^>]*aria-label="Inspect lens interior"[^>]*>/)?.[0];
    expect(button).toBeDefined();expect(button).not.toContain("disabled");
  });
  it("exposes named assembly, focus and playback controls",()=>{
    const html=renderToStaticMarkup(<LenusHudControls state="running" fps={60} exploded={false} explodeAmount={0} focusAngle={0} activePart={getPartTelemetry("front-lens")} paused={false} onToggleExplode={vi.fn()} onExplodeChange={vi.fn()} onFocusChange={vi.fn()} onResetView={vi.fn()} onTogglePause={vi.fn()}/>);
    expect(html).toContain("EMERALD OBJECTIVE CORE");expect(html).toContain("60 FPS");
    expect(html).toContain('aria-label="Explode optical assembly"');expect(html).toContain('aria-label="Focus ring rotation"');
    expect(html).toContain('aria-label="Pause animation"');expect(html).toContain("EXPLODE ASSEMBLY");
  });
});
