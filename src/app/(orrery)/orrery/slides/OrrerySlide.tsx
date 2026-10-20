"use client";

import { Eyebrow, rv } from "./Eyebrow";
import { ORBIT_LEGEND, OrbitDiagram, useOrbitBuild } from "./OrbitDiagram";

export function OrrerySlide({ active }: { active: boolean }) {
  const step = useOrbitBuild(active);
  return (
    <div className="orr-slide-inner orr-orrery">
      <Eyebrow n={3}>The orrery</Eyebrow>
      <div className="orr-orrery__copy">
        <h2 className="orr-h2 orr-reveal" style={rv(1)}>
          Specialists on their own orbits, <em>kept in time.</em>
        </h2>
        <ol className="orr-legend" aria-label="Diagram key">
          {ORBIT_LEGEND.map((item) => (
            <li key={item.name} data-lit={step >= item.step ? "on" : "off"}>
              <span className="orr-label">{item.name}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="orr-orrery__diagram">
        <OrbitDiagram step={step} />
      </div>
    </div>
  );
}
