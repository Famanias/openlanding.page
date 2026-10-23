import React from "react";
import { GithubLogo, ArrowDown } from "@phosphor-icons/react/dist/ssr";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="gradient-field" aria-hidden="true"><div className="gradient-ribbon" /><div className="gradient-ribbon gradient-ribbon-secondary" /></div>
      <div className="page-container hero-content items-center text-center">
        <h1
          id="hero-title"
          className="hero-title"
        >
          Landing Pages your Agent can build
        </h1>

        <p className="hero-description">
          A list of landing page one-shotted by different AI agents that you can use
        </p>

        <div className="hero-actions">
          <a href="#gallery" className="primary-action"><span>Explore the templates</span><ArrowDown size={18} aria-hidden="true" /></a>
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-action"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span>Give a star on GitHub</span>
          </a>
        </div>
        <p className="hero-license">Open source. Yours to make your own. <span>MIT License</span></p>
      </div>
    </section>
  );
}

