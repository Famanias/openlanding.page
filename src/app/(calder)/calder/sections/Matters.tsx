import { MATTERS } from "../content/firm";
import { TiltCard } from "../motion/TiltCard";
import { Arrow, Eyebrow, Lines, vars } from "./parts";

/** Four counts. Each card is a practice area written as a count of the brief; hovering one lifts it and dims the rest. */
export function Matters() {
  return (
    <section id="matters" className="cr-slab cr-slab--paper cr-matters" aria-labelledby="cr-matters-h">
      <div className="cr-wrap">
        <header className="cr-head">
          <Eyebrow n="§ I">Matters</Eyebrow>
          <Lines as="h2" id="cr-matters-h" className="cr-h2" lines={["Four kinds of matter,", <em key="e">argued by partners.</em>]} />
          <p className="cr-lede" data-reveal="rise">
            We take on fewer matters than we are asked to, so each one gets a partner&rsquo;s attention from the first call to the last invoice.
          </p>
        </header>

        <div className="cr-counts">
          {MATTERS.map((m, i) => (
            <TiltCard key={m.id} className="cr-count">
              <article data-reveal="cascade" style={vars({ "--i": i })}>
                <span className="cr-count__glow" aria-hidden="true" />
                <span className="cr-count__ghost" aria-hidden="true">
                  {m.numeral}
                </span>
                <p className="cr-mono cr-count__label">Count {m.numeral}</p>
                <h3 className="cr-count__title">{m.title}</h3>
                <p className="cr-count__summary">{m.summary}</p>
                <ul className="cr-count__list">
                  {m.typical.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="cr-count__ask" href="#file" data-matter={m.title} aria-label={`Ask about ${m.title}`}>
                  <span>Ask about this</span>
                  <span className="cr-count__disc" aria-hidden="true">
                    <Arrow />
                  </span>
                </a>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
