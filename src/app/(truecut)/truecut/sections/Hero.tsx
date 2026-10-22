import { VideoFrame } from "../assets";

export function Hero() {
  return (
    <section id="site" className="tc-hero tc-field-section" data-field-section="site" aria-labelledby="truecut-title">
      <VideoFrame className="tc-hero-media" videoKey="hero-site-reel" posterKey="hero-site-walk" posterAlt="Industrial control room and switchyard arrival" label="Opening site reel" priority />
      <div className="tc-container tc-hero-copy">
        <div className="tc-hero-content">
          <span className="tc-eyebrow">Project 0427 / site walk</span>
          <h1 id="truecut-title">See the work. Book the next step.</h1>
          <p className="tc-hero-lead">Electrical systems, controls, testing, and commissioning for teams who need a field partner that makes the handoff obvious.</p>
          <div className="tc-hero-actions">
            <a className="tc-button" href="#book">Book a site visit <span aria-hidden="true">↗</span></a>
            <a className="tc-button tc-button--outline" href="#proof">See the proof <span aria-hidden="true">↓</span></a>
          </div>
          <div className="tc-hero-meta">
            <span><b>01</b> Read the site</span>
            <span><b>02</b> Show the proof</span>
            <span><b>03</b> Make the handoff</span>
          </div>
        </div>
      </div>
      <span className="tc-scroll-prompt">Scroll the field log</span>
    </section>
  );
}
