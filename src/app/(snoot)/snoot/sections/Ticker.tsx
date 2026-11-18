import { NoseBullet } from "../brand/Logo";
import { Marquee } from "../motion/Marquee";
import { PATIENTS } from "./content";

/** The waiting-room board: a slow marquee of patients going home. Real text sits beside it for screen readers. */
export function Ticker() {
  const chips = PATIENTS.map((p) => (
    <span className="sn-tick" key={p.name}>
      <span className="sn-tick-name">{p.name}</span>
      <span className="sn-chart">{p.detail}</span>
      <span className="sn-tick-done">
        <NoseBullet /> {p.done}
      </span>
    </span>
  ));
  return (
    <section className="sn-ticker" aria-label="Today's waiting room">
      <p className="sn-ticker-label sn-chart">Going home today</p>
      <Marquee className="sn-ticker-run">{chips}</Marquee>
      <ul className="sn-sr">
        {PATIENTS.map((p) => (
          <li key={p.name}>
            {p.name}, {p.detail}: {p.done}
          </li>
        ))}
      </ul>
    </section>
  );
}
