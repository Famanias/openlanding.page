"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { MaterialStudio } from "../studio/MaterialStudio";
import type { LayerId } from "../studio/physics";

const layers: { id: LayerId; name: string; note: string; detail: string }[] = [
  { id: "paper", name: "Paper", note: "The quiet base", detail: "Soft stock, generous margins, a little room to breathe." },
  { id: "ink", name: "Ink", note: "The point of view", detail: "Words with a weight, a mark with a reason, a voice you can recognise." },
  { id: "image", name: "Image", note: "The evidence", detail: "A frame that carries the world instead of decorating it." },
  { id: "signal", name: "Signal", note: "The interruption", detail: "One sharp colour or strange detail that makes the system yours." },
];

export function MaterialDeck() {
  const [active, setActive] = useState<LayerId>("paper");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = (index + 1) % layers.length; break;
      case "ArrowUp": next = (index + layers.length - 1) % layers.length; break;
      case "Home": next = 0; break;
      case "End": next = layers.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(layers[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <section className="as-materials as-container" id="materials">
      <div className="as-materials-head" data-as-reveal="paper-rise"><div><p className="as-kicker">The material index</p><h2>Every layer earns its place.</h2></div><p className="as-materials-intro">Tap a layer to see what it does. A direction gets clearer when you can name the parts.</p></div>
      <div className="as-materials-stage">
        <MaterialStudio variant="workshop" activeLayer={active} onLayerChange={setActive} />
        <div className="as-materials-list" data-as-reveal="paper-rise" data-as-order="1">
          <div role="tablist" aria-label="Material layers" aria-orientation="vertical">
            {layers.map((entry, index) => <button
              key={entry.id}
              ref={(node) => { buttons.current[index] = node; }}
              id={`as-material-tab-${entry.id}`}
              type="button"
              className={active === entry.id ? "is-active" : ""}
              onClick={() => setActive(entry.id)}
              onKeyDown={(event) => navigate(event, index)}
              role="tab"
              tabIndex={active === entry.id ? 0 : -1}
              aria-selected={active === entry.id}
              aria-controls={`as-material-panel-${entry.id}`}
            ><span className="as-material-number">0{index + 1}</span><span><strong>{entry.name}</strong><small>{entry.note}</small></span><span className="as-material-plus" aria-hidden="true" /></button>)}
          </div>
          <div className="as-material-details">
            {layers.map((entry) => <div
              key={entry.id}
              className="as-material-detail"
              id={`as-material-panel-${entry.id}`}
              role="tabpanel"
              aria-labelledby={`as-material-tab-${entry.id}`}
              aria-hidden={active !== entry.id}
              inert={active !== entry.id}
              tabIndex={active === entry.id ? 0 : -1}
            ><span className="as-mono">{entry.name} / {entry.note}</span><p>{entry.detail}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
