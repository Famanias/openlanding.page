"use client";

import { useState } from "react";
import {
  METHODS,
  getMethod,
  brewRatio,
  formatBrewTime,
  type MethodId,
} from "./brew";

export function BrewBench() {
  const [methodId, setMethodId] = useState<MethodId>("v60");
  const method = getMethod(methodId);

  return (
    <div className="sd-bench">
      <div className="sd-bench__tabs" role="tablist" aria-label="Brew method">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            id={`brew-tab-${m.id}`}
            aria-selected={m.id === methodId}
            aria-controls={`brew-panel-${m.id}`}
            onClick={() => setMethodId(m.id)}
            className="sd-bench__tab"
            data-active={m.id === methodId}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`brew-panel-${methodId}`}
        aria-labelledby={`brew-tab-${methodId}`}
        className="sd-bench__panel"
      >
        <div className="sd-bench__grid">
          <div>
            <h3 className="sd-display" style={{ fontSize: "clamp(28px, 3.4vw, 44px)", margin: "0 0 8px" }}>
              {method.label}
            </h3>
            <p style={{ margin: "0 0 24px", maxWidth: "42ch", color: "var(--color-oat)" }}>
              {method.blurb}
            </p>
            <dl className="sd-bench__specs">
              <div>
                <dt className="sd-mono">Dose</dt>
                <dd className="sd-readout__value" style={{ fontSize: "2rem" }}>
                  {method.doseG}<span style={{ fontSize: "0.5em" }}> g</span>
                </dd>
              </div>
              <div>
                <dt className="sd-mono">Water</dt>
                <dd className="sd-readout__value" style={{ fontSize: "2rem" }}>
                  {method.waterG}<span style={{ fontSize: "0.5em" }}> g</span>
                </dd>
              </div>
              <div>
                <dt className="sd-mono">Ratio</dt>
                <dd className="sd-readout__value" style={{ fontSize: "2rem" }}>
                  {brewRatio(method)}
                </dd>
              </div>
              <div>
                <dt className="sd-mono">Time</dt>
                <dd className="sd-readout__value" style={{ fontSize: "2rem" }}>
                  {formatBrewTime(method.timeS)}
                </dd>
              </div>
            </dl>
            <p className="sd-mono" style={{ color: "var(--color-oat)", margin: "18px 0 0" }}>
              {method.tempC} °C · {method.grind}
            </p>
          </div>
          <ol className="sd-bench__steps">
            {method.steps.map((step, i) => (
              <li key={step}>
                <span className="sd-bench__stepno">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
