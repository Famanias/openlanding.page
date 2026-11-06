"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { SuppliedArtwork } from "./SuppliedArtwork";

export function Hero() {
  return (
    <section id="top" className="wyp-hero">
      <div className="wyp-hero-landscape" aria-hidden="true" />
      <div className="wyp-hero-copy wyp-container">
        <p className="wyp-hero-intro">
          A little direction. A world of possibility.
        </p>
        <h1 id="hero-heading" className="max-w-6xl">
          <span className="wyp-line">
            <span data-hero-line>Pitch with intention.</span>
          </span>
          <span className="wyp-line">
            <span data-hero-line className="text-[#836953] wyp-hero-accent" style={{ color: "#836953" }}>
              Land the offer.
            </span>
          </span>
        </h1>
        <p className="wyp-hero-description">
          Your next chapter deserves more than a spreadsheet. A personal flight
          deck for senior engineers and designers, from the first pitch to the
          right offer.
        </p>
        <div className="wyp-hero-actions">
          <a href="#get-started" className="wyp-button wyp-button-dark">
            Start your pipeline <ArrowUpRight size={18} />
          </a>
          <a href="#features" className="wyp-button wyp-button-light">
            Explore the flight deck <ArrowDown size={17} />
          </a>
        </div>
      </div>
      <div className="wyp-hero-deck wyp-container" id="pipeline">
        <div className="wyp-deck-caption">
          <span>Less scattered. More intentional.</span>
          <span>A view of what comes next</span>
        </div>
        <figure className="wyp-hero-artwork">
          <SuppliedArtwork
            id={1}
            priority
            sizes="(max-width: 1200px) 100vw, 1104px"
          />
          <figcaption>
            Waypoint interface concept · Explore the interactive flight deck
            below
          </figcaption>
        </figure>
      </div>
      <div className="wyp-horizon" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
