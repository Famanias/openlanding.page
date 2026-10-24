import { Magnetic } from "../motion/Magnetic";
import { Reveal } from "../motion/Reveal";
import { VideoPlate } from "../assets";

export function Hero() {
  return (
    <section className="rl-hero" id="top" aria-labelledby="rl-hero-title">
      <div className="rl-hero__media" aria-hidden="true">
        <VideoPlate clipKey="storm-threshold" posterKey="hero-ridge" label="Aerial dryland ridge after rain" />
      </div>
      <div className="rl-hero__scrim" aria-hidden="true" />
      <div className="rl-container rl-hero__content">
        <Reveal className="rl-eyebrow rl-hero__eyebrow">FIELD HYDROLOGY / STORM 042</Reveal>
        <h1 id="rl-hero-title" className="rl-hero__title"><span>Read the land.</span> <em>Keep the rain.</em></h1>
        <p className="rl-hero__lead">RILL designs contour systems, low-pressure irrigation and living soil practices for farms that want a storm to last longer than the sky does.</p>
        <div className="rl-hero__actions">
          <a className="rl-button rl-button--primary" href="#field-walk"><Magnetic><span>Book a field walk</span></Magnetic><span className="rl-button__arrow">↗</span></a>
          <a className="rl-button rl-button--quiet" href="#land"><span>Read the watershed</span><span className="rl-button__arrow">↓</span></a>
        </div>
        <div className="rl-hero__meta">
          <div className="rl-hero__meta-item"><span className="rl-mono rl-hero__meta-label">Coordinates</span><span className="rl-hero__meta-value">34°17' N / 118°23' W</span></div>
          <div className="rl-hero__meta-item"><span className="rl-mono rl-hero__meta-label">Field capacity</span><span className="rl-hero__meta-value">80 mm / long hold</span></div>
          <div className="rl-hero__meta-item"><span className="rl-mono rl-hero__meta-label">Practice</span><span className="rl-hero__meta-value">Read · slow · return</span></div>
        </div>
      </div>
    </section>
  );
}

