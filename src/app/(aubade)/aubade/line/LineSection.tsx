import { LEGS, ROUTE } from "../content/line";
import { Eyebrow } from "../sections/Eyebrow";
import { Scene } from "./Landscape";
import { LineStage } from "./LineStage";

/**
 * The Line: a pinned window in live mode; five finished, stacked windows for reduced motion and no-JS.
 * Which one shows is decided by html[data-au-motion], set before first paint.
 */
export function LineSection() {
  return (
    <section id="line" className="au-line" aria-labelledby="line-title">
      <div className="au-wrap au-line__head">
        <Eyebrow>The Line · {ROUTE.km.toLocaleString("en-GB")} km · 14 h 36</Eyebrow>
        <h2 id="line-title" className="au-h2" data-reveal="mask">
          <span className="au-mask">
            <span>The night, seen</span>
          </span>
          <span className="au-mask">
            <span>from the window.</span>
          </span>
        </h2>
        <p className="au-lead" data-reveal="rise">
          Five legs between dusk and dawn. Scroll and the train moves; or take the line into your own hands below.
        </p>
      </div>

      <LineStage>
        {LEGS.map((leg) => (
          <Scene key={leg.id} id={leg.id} />
        ))}
      </LineStage>

      <ol className="au-wrap au-line__static" aria-label="The five legs of the night">
        {LEGS.map((leg, i) => (
          <li key={leg.id} className="au-line__leg">
            <div className="au-window au-line__leg-window">
              <Scene id={leg.id} />
            </div>
            <div className="au-line__leg-text">
              <p className="au-eyebrow">
                Leg {i + 1} · {leg.time} · {leg.from} → {leg.to}
              </p>
              <h3 className="au-h3">{leg.title}</h3>
              <p>{leg.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
