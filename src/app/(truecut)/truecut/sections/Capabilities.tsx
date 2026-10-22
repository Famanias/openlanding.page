"use client";

import { useState } from "react";
import { Picture } from "../assets";
import { Reveal } from "../motion/Reveals";

const capabilities = [
  { id: "testing", index: "01 / TEST", title: "Testing & commissioning", body: "A clear read on the system before it carries the load.", asset: "capability-testing" },
  { id: "controls", index: "02 / CONTROL", title: "Controls & automation", body: "Panels, signals, and interfaces that stay legible in the field.", asset: "capability-controls" },
  { id: "retrofit", index: "03 / REVAMP", title: "Retrofit & revamp", body: "A careful upgrade that respects the equipment already doing the work.", asset: "capability-retrofit" },
  { id: "design", index: "04 / DESIGN", title: "Design & engineering", body: "Drawings and decisions that make the install easier to finish.", asset: "capability-design" },
];

export function Capabilities() {
  const [selected, setSelected] = useState("testing");

  const choose = (id: string) => {
    setSelected(id);
    window.dispatchEvent(new CustomEvent("tc:service", { detail: id }));
  };

  return (
    <section id="proof" className="tc-section tc-capabilities tc-field-section" data-field-section="proof" aria-labelledby="capabilities-title">
      <div className="tc-container">
        <Reveal className="tc-section-head" kind="rule">
          <div>
            <span className="tc-eyebrow" style={{ color: "var(--tc-oxide)" }}>Field proof / capabilities</span>
            <h2 id="capabilities-title">The work has a shape.</h2>
          </div>
          <p>Visitors do not need a wall of claims. They need to recognize their problem in a real frame, then know who to call.</p>
        </Reveal>
        <div className="tc-cap-grid">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.id} className="tc-cap-card" kind="stagger" delay={index * 70}>
              <div className="tc-cap-media"><Picture assetKey={capability.asset} alt={`${capability.title} field work`} sizes="(min-width: 900px) 25vw, 100vw" /></div>
              <div className="tc-cap-body">
                <span className="tc-cap-index">{capability.index}</span>
                <h3>{capability.title}</h3>
                <p>{capability.body}</p>
                <button className="tc-cap-action" type="button" data-selected={selected === capability.id ? "true" : "false"} aria-pressed={selected === capability.id} onClick={() => choose(capability.id)}>
                  {selected === capability.id ? "Selected / book this" : "Choose this scope"}<span aria-hidden="true">↗</span>
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
