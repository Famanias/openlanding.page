import type { CSSProperties } from "react";
import { CompanyMark } from "../brand/CompanyMark";
import { CALLBACKS, companyById } from "../content/companies";
import { MaskLine, Reveal } from "../motion/Reveal";
import { ReelFigure } from "../rehearsal/Windows";

/** Where each callback sits on the 1200 × 600 stage, and where its line leaves the reel. */
export const SEATS = CALLBACKS.map((id, n) => {
  const left = n % 2 === 0;
  const row = Math.floor(n / 2);
  const y = 110 + row * 95;
  return { id, left, x: left ? 118 : 1082, y, from: { x: left ? 372 : 828, y: 150 + row * 70 } };
});

const curve = (s: (typeof SEATS)[number]) => {
  const ex = s.left ? s.x + 82 : s.x - 82;
  const mid = (s.from.x + ex) / 2;
  return `M${s.from.x} ${s.from.y}C${mid} ${s.from.y} ${mid} ${s.y} ${ex} ${s.y}`;
};

/**
 * One held stage. The reel rests in the middle; ten companies call back one after another,
 * each pulled in by a line drawn from the reel, while the callback counter rolls like an odometer.
 */
export function Casting() {
  return (
    <section className="us-casting" id="casting" data-scene="casting" data-tone="light" aria-labelledby="us-cast-t">
      <div className="us-casting__stage">
        <header className="us-casting__head">
          <h2 className="us-h2" id="us-cast-t"><MaskLine>You rehearse. We <em className="us-cueword">cast.</em></MaskLine></h2>
          <Reveal as="p" className="us-lead" index={1}>Your reel goes straight to the companies casting for your part.</Reveal>
        </header>
        <div className="us-cast">
          <svg className="us-cast__net" viewBox="0 0 1200 600" aria-hidden="true">
            {SEATS.map((s, n) => <path key={s.id} d={curve(s)} pathLength={1} style={{ "--i": n } as CSSProperties} />)}
          </svg>
          <div className="us-cast__reel"><ReelFigure /></div>
          <ul className="us-cast__cos" aria-label="Companies that called back">
            {SEATS.map((s, n) => (
              <li key={s.id} className="us-cast__co" data-on="" data-side={s.left ? "l" : "r"}
                style={{ "--x": `${(s.x / 1200) * 100}%`, "--y": `${(s.y / 600) * 100}%`, "--i": n } as CSSProperties}>
                <CompanyMark company={companyById(s.id)} />
              </li>
            ))}
          </ul>
          <p className="us-cast__count">
            <span className="us-mono">Callbacks</span>
            <span className="us-odo" aria-hidden="true">
              {[1, 0].map((d, n) => (
                <span key={n} className="us-odo__col" style={{ "--d": d } as CSSProperties}>
                  {Array.from({ length: 10 }, (_, k) => <span key={k}>{k}</span>)}
                </span>
              ))}
            </span>
            <span className="us-sr">10 companies called back</span>
          </p>
        </div>
      </div>
    </section>
  );
}
