import { hasAsset, Picture } from "../assets";
import { MAKERS } from "../content/makers";
import { TiltCard } from "../motion/TiltCard";
import { Scene } from "../wheel/scenes/Scene";
import { Eyebrow } from "./Eyebrow";

export function Makers() {
  return (
    <section id="makers" className="sa-makers" aria-labelledby="sa-makers-h">
      <div className="sa-wrap">
        <Eyebrow n="02">The makers</Eyebrow>
        <h2 id="sa-makers-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Handpicked hands,</span>
          </span>
          <span className="sa-mask">
            <span>
              <em>one per reel.</em>
            </span>
          </span>
        </h2>
        <p className="sa-lede" data-reveal="rise">
          Fewer than one in nine applicants make it through. Every maker shoots, cuts and captions their own work, so you always know whose eye you hired.
        </p>

        <ul className="sa-makers__grid" data-reveal="cascade">
          {MAKERS.map((m, i) => (
            <li key={m.id} style={{ "--i": i } as React.CSSProperties}>
              <TiltCard className="sa-maker">
                <div className="sa-maker__media">
                  {hasAsset(`maker-${m.id}`) ? <Picture assetKey={`maker-${m.id}`} alt={`${m.name}, ${m.craft}`} sizes="(min-width: 900px) 30vw, 90vw" /> : <Scene id={m.scene} />}
                  <span className="sa-maker__rate">from ${m.rate} / reel</span>
                </div>
                <div className="sa-maker__body">
                  <h3 className="sa-maker__name">{m.name}</h3>
                  <p className="sa-maker__craft">
                    {m.craft} · {m.city}
                  </p>
                  <p className="sa-maker__line">{m.line}</p>
                  <dl className="sa-maker__stats">
                    <div>
                      <dt>Rating</dt>
                      <dd>{m.rating.toFixed(1)}</dd>
                    </div>
                    <div>
                      <dt>Reels shipped</dt>
                      <dd>{m.reelsShipped}</dd>
                    </div>
                    <div>
                      <dt>Turnaround</dt>
                      <dd>{m.turnaroundDays} days</dd>
                    </div>
                  </dl>
                  <a className="sa-link" href="#brief" data-maker={m.name}>
                    <span>Brief {m.name.split(" ")[0]}</span>
                    <span className="sa-link__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
