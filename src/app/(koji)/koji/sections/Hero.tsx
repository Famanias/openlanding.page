import type { ReactNode } from "react";
import { Wordmark } from "../brand/Wordmark";

export const SIGNAGE = ["OPEN 18:00–23:00", "11 COURSES", "12 SEATS", "B1–14F", "TOWER 1972 · GINZA"];

/** Sumi slab: the wordmark, the vertical 麹, the dish (3D or poster) and the red signage strip. */
export function Hero({ dish }: { dish: ReactNode }) {
  return (
    <section className="kj-hero" aria-label="KŌJI">
      <div className="kj-hero__grid">
        <div className="kj-hero__copy">
          <p className="kj-mono kj-hero__kicker">Fermentation kitchen · 麹 · Est. 1972 tower</p>
          <Wordmark as="h1" className="kj-hero__wordmark" />
          <p className="kj-hero__lead">
            Eleven courses built on kōji, miso and shio, served at one concrete counter on the fourteenth floor of a
            Metabolist tower.
          </p>
          <a className="kj-btn kj-btn--shu" href="#reserve">
            Reserve a seat
          </a>
        </div>
        <div className="kj-hero__dish" id="dish">
          {dish}
        </div>
        <p className="kj-hero__kanji" aria-hidden="true">
          麹
        </p>
      </div>
      <ul className="kj-signage" aria-label="At a glance">
        {SIGNAGE.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
