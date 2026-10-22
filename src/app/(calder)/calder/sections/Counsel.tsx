import { Picture } from "../assets";
import { FACTS, PARTNERS } from "../content/firm";
import { CountUp } from "../motion/CountUp";
import { Eyebrow, Lines, vars } from "./parts";

/** The partners, then the firm in four numbers that count up. Portraits wipe in; they are placeholders until generated. */
export function Counsel() {
  return (
    <section id="counsel" className="cr-slab cr-slab--paper cr-counsel" aria-labelledby="cr-counsel-h">
      <div className="cr-wrap">
        <header className="cr-head cr-head--split">
          <div>
            <Eyebrow n="§ III">Counsel</Eyebrow>
            <Lines as="h2" id="cr-counsel-h" className="cr-h2" lines={["The people who", <em key="e">answer the phone.</em>]} />
          </div>
          <p className="cr-lede" data-reveal="rise">
            A smaller firm by design. You will not be handed to an associate you have not met: the partners on your matter are the partners you hired.
          </p>
        </header>

        <div className="cr-partners">
          {PARTNERS.map((p, i) => (
            <article key={p.id} className="cr-partner" data-reveal="cascade" style={vars({ "--i": i })}>
              <div className="cr-partner__photo" data-reveal="wipe">
                <Picture assetKey={p.asset} alt={`Portrait of ${p.name}`} sizes="(min-width: 900px) 40vw, 100vw" />
              </div>
              <div className="cr-partner__body">
                <h3 className="cr-partner__name">{p.name}</h3>
                <p className="cr-mono cr-partner__role">{p.role}</p>
                <p className="cr-partner__summary">{p.summary}</p>
                <ul className="cr-partner__creds">
                  {p.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <dl className="cr-facts">
          {FACTS.map((f, i) => (
            <div key={f.label} className="cr-fact" data-reveal="rise" style={vars({ "--i": i })}>
              <dt className="cr-fact__label">{f.label}</dt>
              <dd className="cr-fact__value">
                <CountUp value={f.value} suffix={f.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
