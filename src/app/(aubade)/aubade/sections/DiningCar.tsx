import { Picture } from "../assets";
import { DINING_STATS, MENU } from "../content/dining";
import { CountUp } from "../motion/CountUp";
import { Eyebrow } from "./Eyebrow";

export function DiningCar() {
  return (
    <section id="dining" className="au-dining au-field" aria-labelledby="dining-title">
      <div className="au-wrap au-dining__grid">
        <div className="au-dining__intro">
          <Eyebrow>Voiture 6 · The dining car</Eyebrow>
          <h2 id="dining-title" className="au-h2" data-reveal="mask">
            <span className="au-mask">
              <span>Dinner between</span>
            </span>
            <span className="au-mask">
              <span>two countries.</span>
            </span>
          </h2>
          <p className="au-lead" data-reveal="rise">
            A kitchen the width of a wardrobe, a chef from Beaune, and a menu that follows the line: Burgundy at dinner,
            the Jura at the bar, the Veneto at breakfast.
          </p>
          <div className="au-dining__photo" data-reveal="blind">
            <Picture
              assetKey="dining-car"
              alt="The dining car at the first seating: green banquettes, white cloths and small brass lamps down the aisle."
              className="au-dining__img"
              sizes="(min-width: 1000px) 45vw, 100vw"
            />
          </div>
          <dl className="au-dining__stats">
            {DINING_STATS.map((s, i) => (
              <div key={s.label} data-reveal="rise" style={{ "--i": i } as React.CSSProperties}>
                <dt>{s.label}</dt>
                <dd>
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="au-menu-list">
          <span className="au-menu-list__rule" data-reveal="draw-y" aria-hidden="true" />
          <ol aria-label="The menu, by the hour">
          {MENU.map((c, i) => (
            <li key={c.time} className="au-menu-list__row" data-reveal="slide" style={{ "--i": i } as React.CSSProperties}>
              <span className="au-menu-list__time">{c.time}</span>
              <div>
                <h3 className="au-menu-list__title">{c.title}</h3>
                <p className="au-menu-list__dish">{c.dish}</p>
                <p className="au-menu-list__where">{c.where}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
