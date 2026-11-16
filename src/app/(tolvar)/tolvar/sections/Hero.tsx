import { Picture } from "../assets";
import { Ticket } from "../brand/Marks";
import { Magnetic } from "../motion/Magnetic";
import { COMPANY } from "./content";

/**
 * The hero plays a CSS keyframe load sequence (photo wipe, headline lines, copy, buttons, tickets, grade
 * line), so it runs before hydration. The photo drifts a few percent with --tv-hero as the page scrolls.
 */
export function Hero() {
  return (
    <section className="tv-hero" id="top" data-tv-hero aria-labelledby="tv-hero-title">
      <div className="tv-hero-inner">
        <div className="tv-hero-copy">
          <p className="tv-eyebrow tv-gauge tv-hero-eyebrow">Excavating · Grading · Hauling · Est. {COMPANY.founded}</p>
          <h1 className="tv-hero-title" id="tv-hero-title">
            <span className="tv-line">
              <span>Dig it right.</span>
            </span>{" "}
            <span className="tv-line">
              <span className="tv-blade-text">Move it once.</span>
            </span>
          </h1>
          <p className="tv-hero-lead">
            Basements, building pads, ponds, water line and storm drain for homes, farms and commercial sites around Aitkin.
            Family-run, and Dale still answers the phone.
          </p>
          <div className="tv-hero-actions">
            <Magnetic>
              <a className="tv-btn" href="#estimate">
                <span className="tv-btn-label">Get a free estimate</span>
              </a>
            </Magnetic>
            <a className="tv-btn tv-btn-ghost" href="#work">
              <span className="tv-btn-label">See the work</span>
            </a>
          </div>
          <ul className="tv-hero-tickets">
            <li>
              <Ticket check>Free estimates</Ticket>
            </li>
            <li>
              <Ticket check>Licensed &amp; insured</Ticket>
            </li>
          </ul>
        </div>

        <figure className="tv-hero-photo">
          <div className="tv-hero-frame">
            <Picture
              assetKey="hero-loader"
              alt="A yellow track loader pushing a bucket of red clay across a building pad under a cloudy sky"
              sizes="(min-width: 1000px) 56vw, 100vw"
              priority
            />
          </div>
          <figcaption className="tv-hero-tag tv-gauge">
            <span>Job 0219</span>
            <span>Pad build, 1,150 yd placed</span>
          </figcaption>
        </figure>
      </div>
      <span className="tv-grade" aria-hidden="true" />
    </section>
  );
}
