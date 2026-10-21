import { Eyebrow } from "./Eyebrow";
import { Picture } from "../assets";

const STATS = [
  { value: "12 kg", label: "per batch, never more" },
  { value: "24%", label: "development at the drop" },
  { value: "12 h", label: "from drum to your door" },
];

export function Hero() {
  return (
    <section id="top" className="sd-hero">
      <div className="sd-sunburst sd-hero__ground" aria-hidden="true" />
      <div className="sd-hero__fade" aria-hidden="true" />
      <div className="sd-wrap sd-hero__inner">
        <div className="sd-hero__copy">
          <div>
            <Eyebrow>Batch 041 · Roasted 06:12 Monday</Eyebrow>
            <h1 className="sd-display sd-hero__h1">
              Every batch has a <span className="sd-turn">curve.</span>
            </h1>
          </div>
          <p className="sd-hero__lead">
            SUNDIAL roasts twelve kilos at a time, logs every second of the roast, and prints
            the curve on the bag. This week&apos;s lots are on the counter — read them the way
            we roast them: time against temperature.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href="#subscribe" className="sd-btn sd-btn--tangerine">
              Order bags
            </a>
            <a href="#roast" className="sd-btn sd-btn--outline">
              Watch a roast
            </a>
          </div>
        </div>
        <figure className="sd-photo sd-photo--43 sd-hero__media">
          <Picture
            assetKey="hero-bag"
            alt="Three kraft coffee bags in a row on a crema-white counter in morning light"
            priority
            sizes="(min-width: 900px) 42vw, 100vw"
          />
        </figure>
        <dl className="sd-hero__stats">
          {STATS.map((stat) => (
            <div key={stat.value} className="sd-hero__stat">
              <dt className="sd-readout__value" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
                {stat.value}
              </dt>
              <dd className="sd-mono" style={{ color: "var(--color-husk)", margin: "8px 0 0" }}>
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
