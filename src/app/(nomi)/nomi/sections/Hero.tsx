import type { CSSProperties } from "react";
import { ArrowUpRight, SceneIcon } from "../brand/Icons";
import { SCENES } from "../launch/scenes";
import { Words } from "../motion/Words";

function CardExtra({ id }: { id: (typeof SCENES)[number]["id"] }) {
  switch (id) {
    case "inbox":
      return (
        <span className="nm-faces" aria-hidden="true">
          <i>M</i>
          <i>T</i>
          <i>P</i>
        </span>
      );
    case "schedule":
      return (
        <span className="nm-days" aria-hidden="true">
          {["M", "T", "W", "T", "F"].map((d, i) => (
            <i key={i} data-on={i === 1}>{d}</i>
          ))}
        </span>
      );
    case "progress":
      return (
        <svg className="nm-mini-ring" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
          <circle className="nm-ring-track" cx="22" cy="22" r="17" />
          <circle className="nm-ring-fill" cx="22" cy="22" r="17" pathLength={1} />
        </svg>
      );
    case "payments":
      return <span className="nm-stamp" aria-hidden="true">Settled</span>;
  }
}

export function Hero() {
  return (
    <section className="nm-hero" id="top">
      <div className="nm-hero-light" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container nm-hero-grid">
        <div className="nm-hero-copy">
          <h1><Words text="Make every lesson feel looked after." from={1} /></h1>
          <p className="lead nm-hero-lead">A calm mobile workspace for tutoring studios: bookings, updates, progress, payments.</p>
          <div className="nm-actions">
            <a className="nm-btn nm-btn--primary" href="#demo">
              Request a walkthrough
              <ArrowUpRight />
            </a>
            <a className="nm-btn nm-btn--quiet" href="#launch">Explore the app</a>
          </div>
        </div>

        <div className="nm-board" data-slot="hero-board" data-alt="The four NOMI moments as a stack of plastic cards: inbox, schedule, progress and payments.">
          <ul className="nm-stack">
            {SCENES.map((s, i) => (
              <li key={s.id} className="nm-card" data-scene={s.id} style={{ "--i": i } as CSSProperties}>
                <a className="nm-card-face" href="#launch">
                  <span className="nm-card-top">
                    <SceneIcon id={s.id} />
                    <b>{s.name}</b>
                    <span className="nm-card-cue">{s.cue}</span>
                  </span>
                  <span className="nm-card-main">
                    <strong>{s.card}</strong>
                    <CardExtra id={s.id} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
