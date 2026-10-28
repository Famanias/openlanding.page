import React from "react";
import { GithubLogo, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { ActionLabel } from "./ActionLabel";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="gradient-field" aria-hidden="true"><div className="gradient-ribbon" /><div className="gradient-ribbon gradient-ribbon-secondary" /></div>
      <div className="page-container hero-content items-center text-center">
        <h1
          id="hero-title"
          className="hero-title"
        >
          Landing Pages, from Header to Footer.
        </h1>

        <p className="hero-description">
          Not Just A Hero Section. One Click Download, 100% Free, No Paywalls.
        </p>

        <div className="hero-actions">
          <a href="#gallery" className="primary-action"><ActionLabel>Explore the templates</ActionLabel><ArrowDown size={18} aria-hidden="true" /></a>
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-action"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <ActionLabel>Give a star on GitHub</ActionLabel>
          </a>
        </div>
        <p className="hero-license">Open source. Yours to make your own. <span>MIT License</span></p>
      </div>
    </section>
  );
}

