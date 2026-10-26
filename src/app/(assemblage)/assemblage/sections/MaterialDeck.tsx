"use client";

import { useState } from "react";

const layers = [
  { id: "paper", name: "Paper", note: "The quiet base", detail: "Soft stock, generous margins, a little room to breathe." },
  { id: "ink", name: "Ink", note: "The point of view", detail: "Words with a weight, a mark with a reason, a voice you can recognise." },
  { id: "image", name: "Image", note: "The evidence", detail: "A frame that carries the world instead of decorating it." },
  { id: "signal", name: "Signal", note: "The interruption", detail: "One sharp colour or strange detail that makes the system yours." },
];

export function MaterialDeck() {
  const [active, setActive] = useState("paper");
  const layer = layers.find((entry) => entry.id === active) ?? layers[0];
  return (
    <section className="as-materials as-container" id="materials" data-as-reveal="paper-rise">
      <div className="as-materials-head"><div><p className="as-kicker">The material index</p><h2>Every layer earns its place.</h2></div><p className="as-materials-intro">Tap a layer to see what it does. A direction gets clearer when you can name the parts.</p></div>
      <div className="as-materials-stage">
        <div className="as-layer-stack" aria-label="Material layer preview">
          <div className={`as-layer as-layer--paper ${active === "paper" ? "is-active" : ""}`} />
          <div className={`as-layer as-layer--ink ${active === "ink" ? "is-active" : ""}`}><span>make the<br />quiet part<br />loud</span></div>
          <div className={`as-layer as-layer--image ${active === "image" ? "is-active" : ""}`}><div /><span>ARCHIVE<br />/ 12</span></div>
          <div className={`as-layer as-layer--signal ${active === "signal" ? "is-active" : ""}`}><span>look<br />again</span></div>
          <div className="as-layer-registration" aria-hidden="true"><span>+</span><span>+</span><span>+</span></div>
        </div>
        <div className="as-materials-list" role="tablist" aria-label="Material layers">
          {layers.map((entry, index) => <button key={entry.id} className={active === entry.id ? "is-active" : ""} onClick={() => setActive(entry.id)} role="tab" aria-selected={active === entry.id} aria-controls="layer-detail"><span className="as-material-number">0{index + 1}</span><span><strong>{entry.name}</strong><small>{entry.note}</small></span><span className="as-material-plus" aria-hidden="true">{active === entry.id ? "−" : "+"}</span></button>)}
          <div className="as-material-detail" id="layer-detail" data-state={active} role="tabpanel" aria-live="polite"><span className="as-mono">{layer.name} / {layer.note}</span><p>{layer.detail}</p></div>
        </div>
      </div>
    </section>
  );
}
