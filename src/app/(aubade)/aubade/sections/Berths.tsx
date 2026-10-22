import { Picture } from "../assets";
import { BERTHS, formatEuro } from "../content/berths";
import { TiltCard } from "../motion/TiltCard";
import { Eyebrow } from "./Eyebrow";

export function Berths() {
  return (
    <section id="berths" className="au-berths" aria-labelledby="berths-title">
      <div className="au-wrap">
        <div className="au-section-head">
          <Eyebrow>Berths · Voitures 3, 5 &amp; 7</Eyebrow>
          <h2 id="berths-title" className="au-h2" data-reveal="mask">
            <span className="au-mask">
              <span>Three ways</span>
            </span>
            <span className="au-mask">
              <span>to sleep through Switzerland.</span>
            </span>
          </h2>
          <p className="au-lead" data-reveal="rise">
            Every fare is per cabin, not per person, and includes dinner in the dining car and breakfast before Venezia.
          </p>
        </div>

        <ul className="au-berths__list">
          {BERTHS.map((b, i) => (
            <li key={b.id} className="au-berths__item" data-reveal="cascade" style={{ "--i": i } as React.CSSProperties}>
              <TiltCard className="au-berth">
                <div className="au-berth__media">
                  <Picture assetKey={b.assetKey} alt={b.alt} className="au-berth__img" sizes="(min-width: 1000px) 30vw, 100vw" />
                </div>
                <div className="au-berth__body">
                  <p className="au-berth__voiture">
                    Voiture {b.voiture} · {b.name}
                  </p>
                  <h3 className="au-h3">{b.title}</h3>
                  <p className="au-berth__blurb">{b.blurb}</p>
                  <dl className="au-berth__specs">
                    {b.specs.map((s) => (
                      <div key={s.label}>
                        <dt>{s.label}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="au-berth__foot">
                    <p className="au-berth__price">
                      <span className="au-berth__from">from</span> {formatEuro(b.price)}
                    </p>
                    <a className="au-link-arrow au-berth__choose" href="#reserve" data-berth={b.id}>
                      Choose this berth
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                  <p className="au-berth__count">
                    {b.cabins} cabins on every train
                  </p>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
