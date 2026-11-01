"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import type { StudioSettings } from "./engine";
import { MATERIALS, type Composition, type LayerId } from "./physics";

const directions: Record<string, [number, number]> = { ArrowLeft: [-.2, 0], ArrowRight: [.2, 0], ArrowUp: [0, .2], ArrowDown: [0, -.2] };

export function MaterialStudio({ variant = "hero", activeLayer, onLayerChange }: {
  variant?: "hero" | "workshop";
  activeLayer?: LayerId;
  onLayerChange?: (id: LayerId) => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof import("./engine").createPaperStudio> | null>(null);
  const [mode, setMode] = useState<Composition>("compose");
  const [spread, setSpread] = useState(0);
  const [light, setLight] = useState(28);
  const [revision, setRevision] = useState(0);
  const [localLayer, setLocalLayer] = useState<LayerId | null>(null);
  const selected = activeLayer ?? localLayer;
  const settings = useRef<StudioSettings>({ mode, spread, light, revision, selected });
  const selectRef = useRef<(id: LayerId) => void>(() => {});
  const id = useId();

  useEffect(() => {
    selectRef.current = (layer) => { setLocalLayer(layer); onLayerChange?.(layer); };
  }, [onLayerChange]);

  useEffect(() => {
    settings.current = { mode, spread, light, revision, selected };
    engine.current?.update(settings.current);
  }, [mode, spread, light, revision, selected]);

  useEffect(() => {
    let cancelled = false;
    let instance: typeof engine.current = null;
    const node = root.current, mount = host.current;
    if (!node || !mount) return;
    // Keep the authored HTML collage until both the renderer and print fonts are ready.
    Promise.all([import("./engine"), document.fonts.ready]).then(([{ createPaperStudio }]) => {
      if (cancelled) return;
      try {
        instance = createPaperStudio(node, mount, settings.current, (layer) => selectRef.current(layer));
        engine.current = instance;
      } catch {
        node.dataset.asSceneFallback = "true";
      }
    }).catch(() => { node.dataset.asSceneFallback = "true"; });
    return () => { cancelled = true; instance?.dispose(); engine.current = null; };
  }, []);

  function select(layer: LayerId) { setLocalLayer(layer); onLayerChange?.(layer); }
  function reset() { setMode("compose"); setSpread(0); setLight(28); setLocalLayer(null); setRevision((current) => current + 1); }

  return <div ref={root} className={`as-studio as-studio--${variant}`} data-variant={variant} data-mode={mode} data-selected={selected ?? "none"} style={{ "--as-studio-spread": spread / 100, "--as-studio-light": light } as CSSProperties}>
    <div className="as-studio-topline as-mono"><span><span className="as-studio-dot" /> Live material study</span><span>01 — 04</span></div>
    <div className="as-studio-surface" role="group" tabIndex={0} aria-label={`${variant === "hero" ? "Interactive collage" : "Material workshop"}. Drag a paper layer to move it. Arrow keys move the selected layer.`} onKeyDown={(event) => {
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      const layer = selected ?? "ink";
      select(layer); engine.current?.nudge(layer, direction[0], direction[1]);
    }}>
      <div className="as-studio-fallback" aria-hidden="true">
        <div className="as-studio-sheet as-studio-sheet--paper"><span>MAKE ROOM<br />FOR THE<br />UNEXPECTED</span><small>A WORKING SURFACE.</small></div>
        <div className="as-studio-sheet as-studio-sheet--image"><i /><span>FIELD NOTE 07</span></div>
        <div className="as-studio-sheet as-studio-sheet--ink"><span>material<br />is a point<br />of view</span></div>
        <div className="as-studio-sheet as-studio-sheet--signal"><span>ASSEMBLE<br />REPEAT<br />REFINE</span></div>
      </div>
      <div className="as-studio-canvas" ref={host} />
      <span className="as-studio-cross as-studio-cross--tl" aria-hidden="true">+</span><span className="as-studio-cross as-studio-cross--br" aria-hidden="true">+</span>
      <div className="as-studio-instruction as-mono"><span aria-hidden="true">↔</span> Pick up a layer. Make it yours.</div>
    </div>
    <div className="as-studio-toolbar">
      <div className="as-studio-modes" role="group" aria-label={`${variant} composition`}>
        <button type="button" aria-pressed={mode === "compose"} onClick={() => setMode("compose")}>Assemble</button>
        <button type="button" aria-pressed={mode === "unpack"} onClick={() => setMode("unpack")}>Unpack <span aria-hidden="true">↗</span></button>
      </div>
      <button type="button" className="as-studio-reset" onClick={reset} aria-label={`Recompose ${variant} collage`} title="Recompose"><span aria-hidden="true">↻</span></button>
    </div>
    {variant === "hero" ? <div className="as-studio-swatches" role="group" aria-label="Pick a hero material">
      {MATERIALS.map((material) => <button key={material.id} type="button" className={`as-swatch as-swatch--${material.id}`} aria-label={material.label} aria-pressed={selected === material.id} onClick={() => select(material.id)}><span /></button>)}
      <span className="as-mono" aria-live="polite">{MATERIALS.find((material) => material.id === selected)?.label ?? "Paper, ink, image, signal"}</span>
    </div> : <div className="as-studio-settings">
      <label htmlFor={`${id}-spread`}><span className="as-mono">Spread the layers <output>{spread}%</output></span><input id={`${id}-spread`} type="range" min="0" max="100" value={spread} onChange={(event) => setSpread(Number(event.target.value))} /></label>
      <label htmlFor={`${id}-light`}><span className="as-mono">Move the light <span aria-hidden="true">☀</span></span><input id={`${id}-light`} type="range" min="0" max="100" value={light} onChange={(event) => setLight(Number(event.target.value))} /></label>
    </div>}
  </div>;
}
