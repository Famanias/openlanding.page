import { AUTHORITIES, MARQUEE_ITEMS } from "../content/firm";
import { Marquee } from "../motion/Marquee";
import { Eyebrow, Lines, vars } from "./parts";

/** A client's words, three anonymised outcomes written like citations, and a slow band of the matters we take. */
export function Authorities() {
  return (
    <section id="authorities" className="cr-slab cr-slab--slab cr-auth" aria-labelledby="cr-auth-h">
      <div className="cr-grain" aria-hidden="true" />
      <div className="cr-wrap">
        <Eyebrow n="§ IV" tone="slab">
          Authorities
        </Eyebrow>
        <h2 id="cr-auth-h" className="cr-sr">
          What clients say, and how some matters ended
        </h2>
        <figure className="cr-quote">
          <blockquote>
            <Lines
              className="cr-quote__text"
              lines={["“Mara gave us a plan we could", "understand and act on. We felt", <em key="e">represented from the first call.”</em>]}
            />
          </blockquote>
          <figcaption data-reveal="rise">
            <span className="cr-quote__rule" aria-hidden="true" />
            Founder, private technology company
          </figcaption>
        </figure>

        <ul className="cr-cites">
          {AUTHORITIES.map((a, i) => (
            <li key={a.cite} className="cr-cite" data-reveal="cascade" style={vars({ "--i": i })}>
              <span className="cr-mono cr-cite__no">{a.cite}</span>
              <h3 className="cr-cite__title">{a.title}</h3>
              <p>{a.outcome}</p>
            </li>
          ))}
        </ul>
        <p className="cr-fine" data-reveal="rise">
          Matters anonymised with client consent. Attorney advertising. Prior results do not guarantee a similar outcome.
        </p>
      </div>
      <Marquee items={MARQUEE_ITEMS} className="cr-auth__band" label="Kinds of matter we take" />
    </section>
  );
}
