import { MaterialStudio } from "../studio/MaterialStudio";

export function Hero() {
  return (
    <div className="as-hero-runway" id="top"><section className="as-hero as-container">
      <div className="as-hero-copy">
        <p className="as-kicker" data-as-reveal="hero-kicker"><span className="as-kicker-dot" /> Material studies for independent brands</p>
        <h1 data-as-reveal="hero-title">Make the idea visible <span>before you make it real.</span></h1>
        <p className="as-lead" data-as-reveal="hero-lead">Assemblage builds a tactile visual direction from the scraps, references and instincts already in the room.</p>
        <div className="as-hero-actions" data-as-reveal="hero-actions">
          <a className="as-button as-button--primary" href="#request">Request a material study <span aria-hidden="true">↗</span></a>
          <a className="as-text-link" href="#materials">See the layers <span aria-hidden="true">↓</span></a>
        </div>
        <p className="as-hero-proof" data-as-reveal="hero-proof"><span className="as-stamp">2 weeks</span> from loose idea to a launch direction your team can use.</p>
      </div>
      <div className="as-hero-art as-hero-art--interactive">
        <MaterialStudio />
      </div>
      <div className="as-hero-foot" aria-hidden="true"><span>Assemblage / 01</span><span>Scroll to sort the layers</span><span>London · Copenhagen · Remote</span></div>
    </section></div>
  );
}
