"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { StudioSettings } from "./engine";
import { MATERIALS, wrapIndex, type LayerId } from "./physics";

export function MaterialStudio({ variant = "hero", activeLayer, onLayerChange }: {
  variant?: "hero" | "workshop";
  activeLayer?: LayerId;
  onLayerChange?: (id: LayerId) => void;
}) {
  const root = useRef<HTMLDivElement>(null), host = useRef<HTMLDivElement>(null), fallback = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof import("./engine").createPaperStudio> | null>(null);
  const [spread, setSpread] = useState(0), [light, setLight] = useState(28);
  const [localLayer, setLocalLayer] = useState<LayerId>("paper");
  const [announcement, setAnnouncement] = useState("Paper. Material 1 of 4.");
  const selected = activeLayer ?? localLayer;
  const selectedRef = useRef(selected);
  const index = MATERIALS.findIndex(material => material.id === selected);
  const settings = useRef<StudioSettings>({ spread, light, selected });
  const selectRef = useRef<(id: LayerId, automatic?: boolean) => void>(() => {});
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  useEffect(() => {
    selectRef.current = (layer, automatic = false) => {
      selectedRef.current = layer; setLocalLayer(layer); onLayerChange?.(layer);
      if (!automatic) {
        const index = MATERIALS.findIndex(material => material.id === layer);
        setAnnouncement(`${MATERIALS[index].label}. Material ${index + 1} of 4.`);
      }
    };
  }, [onLayerChange]);
  useEffect(() => {
    selectedRef.current = selected;
    settings.current = { spread, light, selected };
    engine.current?.update(settings.current);
    const node = fallback.current;
    node?.scrollTo({ left: index * node.clientWidth, behavior: "instant" });
  }, [spread, light, selected, index]);
  useEffect(() => {
    let cancelled = false;
    let instance: typeof engine.current = null;
    const node = root.current, mount = host.current;
    if (!node || !mount) return;
    Promise.all([import("./engine"), document.fonts.ready]).then(([{ createPaperStudio }]) => {
      if (cancelled) return;
      try {
        instance = createPaperStudio(node, mount, settings.current, (layer, automatic) => selectRef.current(layer, automatic));
        engine.current = instance;
      } catch { node.dataset.asSceneFallback = "true"; }
    }).catch(() => { if (!cancelled) node.dataset.asSceneFallback = "true"; });
    return () => { cancelled = true; instance?.dispose(); engine.current = null; if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
  }, []);

  function select(layer: LayerId) { selectRef.current(layer); }
  function advance(direction: number) {
    const current = MATERIALS.findIndex(material => material.id === selectedRef.current);
    engine.current?.advance(direction);
    select(MATERIALS[wrapIndex(current + direction)].id);
  }

  return <div ref={root} className={`as-studio as-studio--${variant}`} data-variant={variant} data-selected={selected} role="region" aria-roledescription="carousel" aria-label={variant === "hero" ? "Material study" : "Material workshop"}>
    <div className="as-studio-topline as-mono"><span><span className="as-studio-dot" /> The material carousel</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
    <div className="as-studio-surface" role="group" tabIndex={0} aria-label="Swipe to browse materials. Use left and right arrow keys to change slides." onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); advance(event.key === "ArrowRight" ? 1 : -1); }
      else if (event.key === "Home" || event.key === "End") { event.preventDefault(); select(MATERIALS[event.key === "Home" ? 0 : MATERIALS.length - 1].id); }
    }}>
      <div ref={fallback} className="as-studio-fallback" aria-hidden="true" onScroll={() => {
        if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
        fallbackTimer.current = setTimeout(() => {
          const node = fallback.current; if (!node || root.current?.dataset.asSceneReady === "true") return;
          const material = MATERIALS[Math.min(3, Math.round(node.scrollLeft / node.clientWidth))];
          if (material.id !== selectedRef.current) select(material.id);
        }, 120);
      }}>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--paper"><span>MAKE ROOM<br />FOR THE<br />UNEXPECTED</span><small>A WORKING SURFACE.</small></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--image"><i /><span>FIELD NOTE 07</span></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--ink"><span>material<br />is a point<br />of view</span></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--signal"><span>ASSEMBLE<br />REPEAT<br />REFINE</span><strong>look<br />again.</strong></div></div>
      </div>
      <div className="as-studio-canvas" ref={host} />
      <span className="as-studio-cross as-studio-cross--tl" aria-hidden="true">+</span><span className="as-studio-cross as-studio-cross--br" aria-hidden="true">+</span>
    </div>
    <span className="as-carousel-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    {variant === "workshop" && <div className="as-studio-settings">
      <label htmlFor={`${id}-spread`}><span className="as-mono">Space between sheets <output>{spread}%</output></span><input id={`${id}-spread`} type="range" min="0" max="100" value={spread} onChange={event => setSpread(Number(event.target.value))} /></label>
      <label htmlFor={`${id}-light`}><span className="as-mono">Move the light</span><input id={`${id}-light`} type="range" min="0" max="100" value={light} onChange={event => setLight(Number(event.target.value))} /></label>
    </div>}
  </div>;
}
