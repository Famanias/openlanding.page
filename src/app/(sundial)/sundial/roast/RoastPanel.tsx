"use client";

import { useEffect, useRef, useState } from "react";
import { useRoastElapsed, useRoastStage, roastStore } from "./roast-store";
import {
  beanColorAt,
  beanTempAt,
  developmentPct,
  formatClock,
  CRACK_AT,
} from "./roast";
import { RoastCurve } from "./RoastCurve";
import { Scrubber } from "./Scrubber";

/** The interactive stage: curve, live readouts, bean swatch, scrubber. */
export function RoastPanel() {
  const elapsed = useRoastElapsed();
  const stage = useRoastStage();

  // Announce stage changes politely; never every frame.
  const prevStageRef = useRef(stage.id);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    if (prevStageRef.current !== stage.id) {
      prevStageRef.current = stage.id;
      setAnnouncement(`Stage ${stage.index + 1} of 6: ${stage.label}.`);
    }
  }, [stage]);

  const beanColor = beanColorAt(elapsed);
  const isLight = elapsed < 240;

  return (
    <div className="sd-roast-panel">
      <div aria-live="polite" aria-atomic="true" className="sd-vh">
        {announcement}
      </div>

      <div className="sd-roast-panel__grid">
        {/* Left: the curve */}
        <div className="sd-roast-panel__curve">
          <RoastCurve elapsed={elapsed} className="sd-curve-svg" />
        </div>

        {/* Right: chapter + readouts */}
        <div className="sd-roast-panel__read">
          <p className="sd-mono" style={{ color: "var(--color-tangerine)", margin: "0 0 10px" }}>
            § 02 — The Roast · Stage {stage.index + 1} / 6
          </p>
          <h2 className="sd-display" style={{ fontSize: "clamp(30px, 4vw, 54px)", margin: "0 0 8px" }}>
            {stage.label}
          </h2>
          <p className="sd-mono" style={{ color: "var(--color-oat)", margin: "0 0 18px" }}>
            {stage.range}
          </p>
          <p style={{ margin: "0 0 26px", maxWidth: "44ch", color: "color-mix(in srgb, var(--color-crema) 86%, transparent)" }}>
            {stage.blurb}
          </p>

          <dl className="sd-readouts">
            <div>
              <dt className="sd-mono">Bean temp</dt>
              <dd className="sd-readout__value" style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}>
                {Math.round(beanTempAt(elapsed))}
                <span style={{ fontSize: "0.45em" }}>°C</span>
                <span className="sd-vh">{Math.round(beanTempAt(elapsed))} degrees Celsius</span>
              </dd>
            </div>
            <div>
              <dt className="sd-mono">Elapsed</dt>
              <dd className="sd-readout__value" style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}>
                {formatClock(elapsed)}
              </dd>
            </div>
            <div>
              <dt className="sd-mono">Development</dt>
              <dd className="sd-readout__value" style={{ fontSize: "clamp(34px, 4.4vw, 56px)" }}>
                {developmentPct(elapsed).toFixed(1)}
                <span style={{ fontSize: "0.45em" }}>%</span>
              </dd>
            </div>
          </dl>

          <div className="sd-roast-panel__foot">
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                className={`sd-bean ${isLight ? "sd-bean--light" : ""}`}
                style={{ width: 46, height: 58, background: beanColor }}
                aria-hidden="true"
              />
              <span className="sd-mono" style={{ color: "var(--color-oat)" }}>
                Bean colour
                <br />
                {elapsed < 240 ? "Green → hay" : elapsed < CRACK_AT ? "Caramelising" : "Browning"}
              </span>
            </div>
            <div className="sd-stamp" style={{ transform: "rotate(2deg)" }}>
              <span>Batch 041 · 12 kg</span>
              <span>Drum 2 · 06:12</span>
            </div>
          </div>
        </div>
      </div>

      <Scrubber elapsed={elapsed} onElapsedChange={(next) => roastStore.setElapsed(next)} />
    </div>
  );
}
