"use client";
import Link from "next/link";
import { useState } from "react";
import { Picture } from "../assets";
import type { Finish } from "../configurator/logic";
import { FINISH_PROFILES } from "../content/cms";

const FINISHES: Finish[] = ["graphite", "tangerine", "cream"];

const ASSEMBLIES = [
  { code: "A / 01", title: "Chassis triangle", detail: "Clean main-triangle junctions with accessible down-tube cable ports for straightforward shop service." },
  { code: "A / 02", title: "Upright cockpit", detail: "Swept commuter bar geometry keeps eye height elevated across cross-traffic intersections." },
  { code: "A / 03", title: "Modular dropouts", detail: "Dedicated rear rack and fender bosses machined directly into the stay cluster." },
  { code: "A / 04", title: "Rolling contact", detail: "Wide-clearance fork and rear bridge accepting both sleek city and textured gravel treads." },
];

export function BikeExplorer() {
  const [finish, setFinish] = useState<Finish>("graphite");
  const current = FINISH_PROFILES[finish];

  return (
    <>
      <section className="rd-sub-section">
        <div className="rd-sub-shell">
          <div className="rd-sub-toolbar">
            <div className="rd-tabs-row" role="group" aria-label="Select frame finish">
              {FINISHES.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="rd-tab-btn"
                  aria-pressed={finish === key}
                  onClick={() => setFinish(key)}
                >
                  {FINISH_PROFILES[key].label}
                </button>
              ))}
            </div>
            <span className="rd-kicker">{current.code}</span>
          </div>

          <div className="rd-finish-stage">
            <div style={{ display: "grid", placeItems: "center" }}>
              <Picture
                assetKey={current.assetKey}
                alt={current.alt}
                className="rd-blueprint-bike"
                sizes="(min-width: 900px) 60vw, 100vw"
                priority
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 20 }}>
              <div>
                <span className="rd-kicker" style={{ color: "var(--rd-mint)" }}>ACTIVE FINISH PROFILE</span>
                <h2 style={{ margin: "12px 0 10px", font: "italic 900 clamp(32px, 3.6vw, 48px)/.92 var(--rd-display)", textTransform: "uppercase" }}>
                  {current.label}
                </h2>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{current.surfaceNote}</p>
              </div>
              <div>
                <span className="rd-kicker" style={{ color: "var(--rd-mint)" }}>HARDWARE PAIRING</span>
                <p style={{ margin: "8px 0 18px", fontSize: 14.5 }}>{current.contrastAccent}</p>
                <Link className="rd-button" href="/templates/radius#build">
                  <span>Open configurator</span>
                  <b aria-hidden="true">↗</b>
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
              <p className="rd-kicker">SUB-ASSEMBLIES</p>
              <h2>Built around <em>the line.</em></h2>
            </div>
          </div>

          <div className="rd-grid-2">
            {ASSEMBLIES.map((item) => (
              <article key={item.code} className="rd-cell-card" style={{ borderTop: "1px solid var(--rd-ink)", borderLeft: "1px solid var(--rd-ink)" }}>
                <div>
                  <span className="rd-kicker">{item.code}</span>
                  <h3 className="rd-cell-card__title">{item.title}</h3>
                  <p className="rd-cell-card__body">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rd-grid-2" style={{ marginTop: 28 }}>
            <figure className="rd-cell-card" style={{ borderTop: "1px solid var(--rd-ink)", borderLeft: "1px solid var(--rd-ink)" }}>
              <div className="rd-cell-card__media">
                <Picture assetKey="09-frame-macro" alt="Close detail of a graphite bicycle frame with tangerine accents" sizes="(min-width: 900px) 45vw, 100vw" />
              </div>
              <figcaption className="rd-kicker">DETAIL / 01 — FRAME JUNCTIONS</figcaption>
            </figure>
            <figure className="rd-cell-card" style={{ borderTop: "1px solid var(--rd-ink)", borderLeft: "1px solid var(--rd-ink)" }}>
              <div className="rd-cell-card__media">
                <Picture assetKey="10-tire-detail" alt="Close detail of the tread on a bicycle tire" sizes="(min-width: 900px) 45vw, 100vw" />
              </div>
              <figcaption className="rd-kicker">DETAIL / 02 — STREET CONTACT</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
