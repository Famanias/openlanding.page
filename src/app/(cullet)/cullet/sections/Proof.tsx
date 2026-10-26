import { NOTES, RENDERERS, STATS } from "../content/copy";
import { CountUp } from "../motion/CountUp";
import { Marquee } from "../motion/Marquee";
import { MaskLine, Reveal } from "../motion/Reveal";

/** Chapter 05: the numbers, the renderers that read the export, and three studios that ship with it. */
export function Proof() {
  return (
    <section className="fc-proof" id="proof" aria-labelledby="fc-proof-title">
      <div className="fc-wrap">
        <header className="fc-head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 05 · The budget</Reveal>
          <h2 id="fc-proof-title" className="fc-h2">
            <MaskLine>Glass that fits</MaskLine> <MaskLine index={1}>in a frame.</MaskLine>
          </h2>
        </header>
        <dl className="fc-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.label} className="fc-stat" index={i}>
              <dt className="fc-stat__label">{s.label}</dt>
              <dd className="fc-stat__value"><CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} /></dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="fc-proof__band">
        <p className="fc-proof__band-label fc-mono">Exports read by</p>
        <Marquee label="Renderers that read Cullet exports">
          {RENDERERS.map((r) => (
            <span key={r} className="fc-proof__chip"><span className="fc-proof__shard" aria-hidden="true" />{r}</span>
          ))}
        </Marquee>
      </div>

      <div className="fc-wrap">
        <ul className="fc-notes">
          {NOTES.map((n, i) => (
            <Reveal as="li" key={n.name} variant="scale" index={i} className="fc-note">
              <figure>
                <blockquote className="fc-note__quote">“{n.quote}”</blockquote>
                <figcaption className="fc-note__by">
                  <span className="fc-note__name">{n.name}</span>
                  <span className="fc-note__role">{n.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
