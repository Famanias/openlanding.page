import React from "react";
import { GithubLogo, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function Contribute() {
  return (
    <section id="contribute" className="contribute-section" aria-labelledby="contribute-title">
      <div className="gradient-field" aria-hidden="true"><div className="gradient-ribbon" /></div>
      <div className="page-container contribute-inner">
        <div>
        <h2
          id="contribute-title"
        >
          Want to Contribute?
        </h2>
        <p>
          OpenLanding.page is open-sourced, share your landing page for everyone to use.
        </p>
        </div>
        <div className="pt-2">
          <a
            href="https://github.com/Famanias/openlanding.page"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-action"
          >
            <GithubLogo className="size-4" weight="bold" aria-hidden="true" />
            <span>Contribute on GitHub</span>
            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
