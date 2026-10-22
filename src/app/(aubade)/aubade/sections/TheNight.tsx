import { Picture } from "../assets";
import { RITUALS } from "../content/night";
import { NightStack } from "./NightStack";
import { Eyebrow } from "./Eyebrow";

/** Three rituals as full colour fields. Each pins and the next slides over it (NightStack writes --cover). */
export function TheNight() {
  return (
    <section id="night" className="au-night" aria-labelledby="night-title">
      <div className="au-wrap au-night__head">
        <Eyebrow>The Night · 21:30 to 08:15</Eyebrow>
        <h2 id="night-title" className="au-h2" data-reveal="mask">
          <span className="au-mask">
            <span>What we do</span>
          </span>
          <span className="au-mask">
            <span>while you sleep.</span>
          </span>
        </h2>
      </div>
      <NightStack>
        {RITUALS.map((r, i) => (
          <li key={r.title} className={`au-ritual au-ritual--${r.field}`} style={{ "--i": i } as React.CSSProperties}>
            <div className="au-wrap au-ritual__inner">
              <div className="au-ritual__text">
                <p className="au-ritual__time">{r.time}</p>
                <h3 className="au-ritual__title">{r.title}</h3>
                <p className="au-ritual__body">{r.body}</p>
              </div>
              <div className="au-ritual__photo">
                <Picture assetKey={r.assetKey} alt={r.alt} className="au-ritual__img" sizes="(min-width: 1000px) 34vw, 90vw" />
              </div>
            </div>
          </li>
        ))}
      </NightStack>
    </section>
  );
}
