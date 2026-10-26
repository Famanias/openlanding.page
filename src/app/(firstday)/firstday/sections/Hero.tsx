import { Arrow } from "../brand/Arrow";
import { Campus } from "../campus/Campus";
export function Hero() {
  return (
    <section id="top" className="fd-hero" aria-labelledby="fd-hero-title">
      <div className="fd-hero-copy">
        <p className="fd-eyebrow fd-hero-enter">
          <span className="fd-dot" /> YOUR FUTURE IS OPEN.
        </p>
        <h1 id="fd-hero-title">
          <span className="fd-line">
            <span>Big futures.</span>
          </span>
          <span className="fd-line">
            <span>
              Small first steps<span className="fd-period">.</span>
            </span>
          </span>
        </h1>
        <p className="fd-hero-lead fd-hero-enter">
          You don’t need it all figured out.
          <br />
          Just a place to start doing.
        </p>
        <a href="#paths" className="fd-button fd-hero-button fd-hero-enter">
          Find your first day <Arrow diagonal />
        </a>
      </div>
      <Campus />
      <a className="fd-scroll-cue" href="#network">
        <span className="fd-mouse" aria-hidden="true" />
        <span>A little scroll. A new possibility.</span>
        <span aria-hidden="true">↓</span>
      </a>
      <div className="fd-hero-caption fd-label">
        LEARN BY DOING.
        <br />
        BECOME BY BEGINNING.
      </div>
    </section>
  );
}
