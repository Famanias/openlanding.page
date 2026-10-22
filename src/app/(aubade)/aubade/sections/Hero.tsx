import { allDepartures, departureLabel } from "../content/departures";
import { ROUTE } from "../content/line";
import { Scene } from "../line/Landscape";
import { Magnetic } from "../motion/Magnetic";

const next = allDepartures().find((d) => d.status !== "complet");

/** The cabin window at dusk. Load choreography is CSS keyframes (runs before hydration); leaving is a view() timeline. */
export function Hero() {
  return (
    <section id="top" className="au-hero" aria-labelledby="hero-title">
      <div className="au-wrap au-hero__inner">
        <div className="au-hero__copy">
          <p className="au-eyebrow au-load" style={{ "--d": "250ms" } as React.CSSProperties}>
            Paris {ROUTE.departs} → Venezia {ROUTE.arrives} · {ROUTE.days}
          </p>
          <h1 id="hero-title" className="au-hero__title">
            <span className="au-mask au-load-mask" style={{ "--d": "300ms" } as React.CSSProperties}>
              <span>Leave at dusk.</span>
            </span>
            <span className="au-mask au-load-mask" style={{ "--d": "420ms" } as React.CSSProperties}>
              <span>Wake somewhere else.</span>
            </span>
          </h1>
          <p className="au-hero__lead au-load" style={{ "--d": "700ms" } as React.CSSProperties}>
            Thirty-eight cabins, one dining car, and {ROUTE.km.toLocaleString("en-GB")} km of France, Switzerland and Italy
            that you&rsquo;ll mostly sleep through. We think that&rsquo;s the point.
          </p>
          <div className="au-hero__ctas au-load" style={{ "--d": "820ms" } as React.CSSProperties}>
            <Magnetic>
              <a className="au-btn au-btn--claret" href="#reserve">
                <span className="au-btn__roll">
                  <span>Reserve a berth</span>
                  <span aria-hidden="true">Reserve a berth</span>
                </span>
                <svg className="au-btn__arrow" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </a>
            </Magnetic>
            <a className="au-btn au-btn--ghost" href="#line">
              <span className="au-btn__roll">
                <span>See the line</span>
                <span aria-hidden="true">See the line</span>
              </span>
            </a>
          </div>
        </div>

        <div className="au-hero__window-wrap">
          <div className="au-window au-hero__window" data-ambient="playing">
            <Scene id="dusk" className="au-scene--ambient" />
            <span className="au-hero__blind" aria-hidden="true" />
            <div className="au-glass" aria-hidden="true" />
          </div>
          {next && (
            <div className="au-plaque au-hero__plaque au-load" style={{ "--d": "980ms" } as React.CSSProperties}>
              <span className="au-plaque__meta">Next departure · {next.berthsLeft} berths left</span>
              <span className="au-plaque__name">
                {departureLabel(next)} · {ROUTE.departs}
              </span>
            </div>
          )}
        </div>
      </div>

      <dl className="au-wrap au-hero__facts au-load" style={{ "--d": "1100ms" } as React.CSSProperties}>
        <div>
          <dt>Distance</dt>
          <dd>{ROUTE.km.toLocaleString("en-GB")} km</dd>
        </div>
        <div>
          <dt>Carriages</dt>
          <dd>{ROUTE.carriages}</dd>
        </div>
        <div>
          <dt>Cabins</dt>
          <dd>{ROUTE.cabins}</dd>
        </div>
        <div>
          <dt>Night</dt>
          <dd>14 h 36</dd>
        </div>
      </dl>
    </section>
  );
}
