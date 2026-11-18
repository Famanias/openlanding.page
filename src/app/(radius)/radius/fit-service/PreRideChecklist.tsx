"use client";
import { useState } from "react";
import { PRE_RIDE_CHECKS } from "../content/cms";

export function PreRideChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const completed = PRE_RIDE_CHECKS.filter((c) => checked[c.id]).length;

  return (
    <div>
      <div className="rd-sub-toolbar">
        <div>
          <p className="rd-kicker">INTERACTIVE ROUTINE</p>
          <h2 style={{ margin: "8px 0 0", font: "italic 900 clamp(30px, 3.8vw, 48px)/.92 var(--rd-display)", textTransform: "uppercase" }}>
            Pre-ride bench check
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="rd-kicker" aria-live="polite">
            {completed} / {PRE_RIDE_CHECKS.length} VERIFIED
          </span>
          {completed > 0 ? (
            <button type="button" className="rd-tab-btn" onClick={() => setChecked({})}>
              Reset
            </button>
          ) : null}
        </div>
      </div>

      <div className="rd-checklist">
        {PRE_RIDE_CHECKS.map((item) => {
          const isOn = !!checked[item.id];
          return (
            <button
              key={item.id}
              type="button"
              className="rd-check-item"
              aria-pressed={isOn}
              onClick={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
            >
              <span className="rd-check-box" aria-hidden="true">{isOn ? "✓" : ""}</span>
              <span>
                <strong style={{ display: "block", fontSize: 15, marginBottom: 4 }}>{item.label}</strong>
                <span style={{ fontSize: 13.5, opacity: 0.82 }}>{item.note}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
