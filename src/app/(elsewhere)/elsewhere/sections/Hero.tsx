import { Picture } from "../assets";
import { Blaze } from "../brand/Signal";
import { Lines } from "../motion/Lines";
import { Magnetic } from "../motion/Magnetic";
import { HERO_FACTS } from "./content";

/**
 * The overlook at the road's end. The plate is laid out as a CSS cover box so the tag can sit on the cabin
 * door in plate percentages; the bough cutout is the layer nearest the lens. Everything above the fold plays
 * from CSS keyframes, so the sequence runs before hydration.
 */
export function Hero() {
  return (
    <section className="ew-hero" id="top" data-ew-hero aria-labelledby="ew-hero-title">
      <div className="ew-hero-media">
        <div className="ew-hero-plate">
          <div className="ew-hero-plate-in">
            <Picture
              assetKey="overlook"
              className="ew-hero-img"
              sizes="(min-aspect-ratio: 16/9) 100vw, 180vh"
              priority
              alt="A misty evergreen valley seen from above. On a mossy rock shelf at the right stands a small dark timber cabin with one lit glass door."
            />
            <div className="ew-hero-tag" aria-hidden="true">
              <Blaze className="ew-hero-tag-blaze" />
              <span className="ew-hero-tag-line" />
              <span className="ew-hero-tag-label ew-post">The cabin · 1,900 m</span>
            </div>
          </div>
        </div>
        <div className="ew-hero-mist" aria-hidden="true" />
        <div className="ew-hero-boughs" aria-hidden="true">
          <Picture assetKey="boughs-soft" alt="" sizes="150vw" className="ew-hero-boughs-img" />
        </div>
        <div className="ew-hero-scrim" aria-hidden="true" />
      </div>

      <div className="ew-hero-copy">
        <p className="ew-post ew-hero-post">
          <Blaze /> Road&apos;s end · 0 m · elev. 400 m
        </p>
        <h1 id="ew-hero-title" className="ew-display ew-hero-title">
          <Lines lines={["Past the last bar", "of signal."]} />
        </h1>
        <p className="ew-hero-lede">
          Elsewhere is one small cabin at the end of a 1,900-metre footpath above the Hollin Fork. No road reaches it. No network does either. Scroll
          to walk in.
        </p>
        <div className="ew-hero-actions">
          <Magnetic>
            <a className="ew-btn ew-btn-glow" href="#walk">
              <span className="ew-btn-label">
                Start walking
              </span>
              <span className="ew-btn-arrow" aria-hidden="true" />
            </a>
          </Magnetic>
          <a className="ew-link ew-link-light" href="#stay">
            Hold the cabin
          </a>
        </div>
      </div>

      <dl className="ew-hero-facts">
        {HERO_FACTS.map((fact) => (
          <div key={fact.label}>
            <dt className="ew-post">{fact.label}</dt>
            {/* above the fold: plain numbers, so nothing re-counts when hydration lands */}
            <dd className="ew-count">
              {fact.value.toLocaleString("en-US")}
              {fact.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
