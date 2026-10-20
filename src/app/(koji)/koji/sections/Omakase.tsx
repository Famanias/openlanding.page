import type { ReactNode } from "react";
import { Hanko } from "../brand/Hanko";
import { COURSE_GROUPS } from "../menu";

/** Sumi slab: the food flight (3D course sequence) beside the eleven-course menu in mono. */
export function Omakase({ flight }: { flight: ReactNode }) {
  return (
    <section className="kj-slab kj-slab--sumi kj-omakase" id="omakase" aria-labelledby="kj-omakase-title">
      <header className="kj-section-head">
        <p className="kj-mono">02 · 献立 · Omakase</p>
        <h2 id="kj-omakase-title" className="kj-h2">
          Eleven courses. One counter.
        </h2>
      </header>
      <div className="kj-omakase__flight" id="flight">
        {flight}
      </div>
      <div className="kj-menu">
        <div className="kj-menu__head">
          <Hanko size={44} />
          <p className="kj-mono">Autumn menu · ¥38,000 · served 18:00 and 20:45</p>
        </div>
        <ol className="kj-menu__groups">
          {COURSE_GROUPS.map((g) => (
            <li key={g.id} className="kj-menu__group" data-group={g.id}>
              <p className="kj-menu__group-name">
                <span aria-hidden="true">{g.jp}</span> {g.label}
              </p>
              <ol className="kj-menu__courses">
                {g.courses.map((c) => (
                  <li key={c.n}>
                    <span className="kj-menu__n">{String(c.n).padStart(2, "0")}</span>
                    <span className="kj-menu__name">{c.name}</span>
                    <span className="kj-menu__detail">{c.detail}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
