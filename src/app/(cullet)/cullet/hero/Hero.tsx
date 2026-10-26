import type { CSSProperties } from "react";
import { Mark } from "../brand/Logo";
import { HeroGlass } from "./HeroGlass";
import { Poster } from "./Poster";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * The slab. Real DOM text laid out on a cut sheet of quartz: the SVG poster draws the glass first,
 * then (desktop, idle) the WebGL slab takes over, prints this text onto its shards and keeps the DOM
 * on top, transparent, for selection and focus. Scrolling cleaves it; "Read paper" shatters it.
 */
export function Hero() {
  return (
    <section className="fc-hero" id="cullet" data-scene="hero" data-state="assembled" aria-labelledby="fc-hero-title">
      <div className="fc-hero__stage">
        <div className="fc-hero__backdrop" aria-hidden="true" />
        <div className="fc-hero__under" aria-hidden="true">
          <p className="fc-hero__under-eyebrow">Chapter 01</p>
          <p className="fc-hero__under-title">Real-time glass, in five terms.</p>
        </div>
        <canvas className="fc-hero__canvas" aria-hidden="true" />

        <div className="fc-slab">
          <Poster />
          <nav className="fc-slab__nav" aria-label="Hero">
            <a href="#cullet" className="fc-slab__brand fc-load" style={line(0)} aria-label="Cullet, home">
              <span className="fc-slab__mark" data-print="mark"><Mark /></span>
              <span className="fc-slab__word" data-print="text">Cullet</span>
            </a>
            <span className="fc-slab__links fc-load" style={line(1)}>
              <a href="#sampler" className="fc-slab__link" data-print="text">Studio</a>
              <span className="fc-slab__dot" data-print="text" aria-hidden="true">·</span>
              <a href="#materials" className="fc-slab__link" data-print="text">Materials</a>
              <span className="fc-slab__dot fc-slab__dot--wide" data-print="text" aria-hidden="true">·</span>
              <a href="#pricing" className="fc-slab__link fc-slab__link--wide" data-print="text">Pricing</a>
            </span>
            <a href="#open" className="fc-slab__signin fc-load" style={line(2)} data-print="text">Sign in</a>
          </nav>

          <div className="fc-slab__panel">
            <span className="fc-slab__ring" data-print="ring" aria-hidden="true" />
            <p className="fc-slab__eyebrow fc-load" style={line(3)} data-print="text">Real-time material studio</p>
            <h1 id="fc-hero-title" className="fc-slab__title">
              <span className="fc-mask"><span className="fc-mask__in fc-load fc-load--rise" style={line(4)} data-print="text">Designed</span></span>{" "}
              <span className="fc-mask"><span className="fc-mask__in fc-load fc-load--rise" style={line(5)} data-print="text">in glass.</span></span>
            </h1>
            <p className="fc-slab__sub fc-load" style={line(7)}>
              <span data-print="text">Author dispersion, transmission,</span>{" "}
              <span data-print="text">and refraction in the browser.</span>{" "}
              <span data-print="text">Live previews, real materials.</span>
            </p>
            <div className="fc-slab__ctas fc-load" style={line(8)}>
              <a href="#open" className="fc-slab__cta" data-print="box">
                <span className="fc-slab__cta-label" data-print="text">Open studio</span>
              </a>
              <a href="#terms" className="fc-slab__paper" data-paper-open data-print="text">Read paper →</a>
            </div>
            <p className="fc-slab__foot fc-load" style={line(9)}>
              <span data-print="text">© Cullet Lab</span>
              <span data-print="text">KHR_materials_dispersion</span>
            </p>
          </div>
        </div>

        <HeroGlass />
      </div>
    </section>
  );
}
