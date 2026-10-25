import type { CSSProperties } from "react";
import { STATS, WEEK } from "../data/shop";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { toneVar } from "../brand/Jar";
import { SectionHead } from "./SectionHead";

/** Batch day: four count-up facts and the week as five pills joined by a drawn line. */
export function BatchDay() {
  return (
    <section id="batch" className="pk-sec pk-sec--butter" aria-labelledby="batch-title">
      <div className="pk-wrap">
        <SectionHead id="batch-title" eyebrow="Batch day" title="Small enough to [[know your name.]]" lede="No warehouse, no night shift. Just a Tuesday, a very big pot and a calendar we keep honest." />

        <ul className="pk-stats">
          {STATS.map((s, i) => (
            <Reveal as="li" key={s.label} variant="pop" index={i} className="pk-stat">
              <span className="pk-stat-n"><CountUp to={s.value} suffix={s.suffix} /></span>
              <span className="pk-stat-l">{s.label}</span>
            </Reveal>
          ))}
        </ul>

        <div className="pk-week">
          <Reveal variant="draw" className="pk-week-line"><span aria-hidden="true" /></Reveal>
          <ol className="pk-week-list">
            {WEEK.map((w, i) => (
              <Reveal as="li" key={w.day} variant="pop" index={i} delay={200} className="pk-day" >
                <span className="pk-day-pill" style={{ "--tone": toneVar(w.tone) } as CSSProperties} data-key={w.day === "Tue" ? "true" : "false"}>{w.day}</span>
                <span className="pk-day-job">{w.job}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
