"use client";
import Link from "next/link";
import { useState } from "react";
import { Picture } from "../assets";
import { KIT_PRESETS } from "../content/cms";

export function AccessoryBundles() {
  const [presetId, setPresetId] = useState(KIT_PRESETS[0].id);
  const current = KIT_PRESETS.find((k) => k.id === presetId) ?? KIT_PRESETS[0];

  return (
    <>
      <section className="rd-sub-section">
        <div className="rd-sub-shell">
          <div className="rd-sub-toolbar">
            <div className="rd-tabs-row" role="group" aria-label="Select modular setup preset">
              {KIT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="rd-tab-btn"
                  aria-pressed={presetId === preset.id}
                  onClick={() => setPresetId(preset.id)}
                >
                  {preset.name}
                </button>
              ))}
            </div>
            <span className="rd-kicker">{current.code}</span>
          </div>

          <div className="rd-grid-2" style={{ border: "1px solid var(--rd-ink)", padding: "clamp(20px, 3vw, 36px)", alignItems: "center" }}>
            <div className="rd-cell-card__media" style={{ background: "var(--rd-paper)" }}>
              <Picture assetKey={current.assetKey} alt={current.alt} sizes="(min-width: 900px) 45vw, 100vw" priority />
            </div>
            <div style={{ display: "grid", gap: 16 }}>
              <span className="rd-kicker">SELECTED MODULAR PACK</span>
              <h2 style={{ margin: 0, font: "italic 900 clamp(32px, 3.8vw, 50px)/.92 var(--rd-display)", textTransform: "uppercase" }}>
                {current.name}
              </h2>
              <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>{current.summary}</p>
              <div className="rd-tabs-row">
                {current.parts.map((part) => (
                  <span key={part} className="rd-tab-btn" style={{ cursor: "default" }}>{part}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                <Link className="rd-button" href="/templates/radius#build">
                  <span>Configure on bike</span>
                  <b aria-hidden="true">↗</b>
                </Link>
                <Link className="rd-link" href="/templates/radius/reserve" style={{ alignSelf: "center" }}>
                  Preview reservation ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rd-sub-section rd-sub-section--alt">
        <div className="rd-sub-shell">
          <div className="rd-sub-head">
            <div>
              <p className="rd-kicker">INDIVIDUAL HARDWARE</p>
              <h2>Standalone <em>pieces.</em></h2>
            </div>
          </div>

          <div className="rd-grid-3">
            {KIT_PRESETS.map((kit) => (
              <article key={kit.id} className="rd-cell-card">
                <div>
                  <div className="rd-cell-card__media">
                    <Picture assetKey={kit.assetKey} alt={kit.alt} sizes="(min-width: 900px) 30vw, 100vw" />
                  </div>
                  <span className="rd-kicker" style={{ display: "block", marginTop: 16 }}>{kit.code}</span>
                  <h3 className="rd-cell-card__title">{kit.name}</h3>
                  <p className="rd-cell-card__body">{kit.summary}</p>
                </div>
                <Link className="rd-link" href="/templates/radius#build">Try in bike builder ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
