"use client";

import { useState } from "react";

const PRINCIPLE_NOTES = {
  care: "“We never ship a campaign that feels like homework. Every headline, illustration, and launch ritual is tended like a living garden—rooted in research and pruned for clarity.”",
  feeling:
    "“People remember how a brand made them feel long after they forget a feature list. We sculpt tactile worlds in paper, clay, and ink so your story lingers.”",
};

export function Manifesto() {
  const [activePrinciple, setActivePrinciple] = useState<"care" | "feeling">("care");

  return (
    <section className="nx-manifesto" id="about" aria-labelledby="manifesto-heading">
      <div className="nx-container">
        <div className="nx-manifesto-grid">
          <div data-reveal>
            <span className="nx-kicker">01 · Our Philosophy</span>
            <h2 className="nx-manifesto-statement" id="manifesto-heading">
              Good ideas <em>grow</em> on people.
            </h2>
            <p className="nx-manifesto-lead">
              Most modern marketing shouts from a template. It measures clicks while forgetting pulse,
              trading warmth for sterile funnels that everyone scrolls right past.
            </p>
            <p className="nx-manifesto-lead" style={{ color: "var(--ink-muted)", fontSize: "1.12rem" }}>
              At <strong>nexus</strong>, we shape brands by hand—combining sharp editorial strategy,
              tactile storytelling, and unmistakable visual worlds that earn genuine affection.
            </p>

            {/* Unboxed Editorial Proof Metadata */}
            <div className="nx-manifesto-proof" aria-label="Agency impact metrics">
              <span>
                <strong>+148%</strong> Average Brand Recall Lift in 12 Months
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong>94%</strong> Multi-Year Client Partnerships
              </span>
              <span aria-hidden="true">·</span>
              <span>
                <strong>100%</strong> Hand-Crafted Studio Work
              </span>
            </div>
          </div>

          {/* Interactive Botanical Seal & Studio Note Card */}
          <div className="nx-manifesto-card" data-reveal>
            <div className="nx-manifesto-seals" role="tablist" aria-label="Studio principles">
              <button
                type="button"
                className={`nx-stamp-btn ${activePrinciple === "care" ? "is-active" : ""}`}
                role="tab"
                aria-selected={activePrinciple === "care"}
                onClick={() => setActivePrinciple("care")}
              >
                <span>✽ GROW WITH CARE</span>
              </button>
              <button
                type="button"
                className={`nx-stamp-btn ${activePrinciple === "feeling" ? "is-active" : ""}`}
                role="tab"
                aria-selected={activePrinciple === "feeling"}
                onClick={() => setActivePrinciple("feeling")}
              >
                <span>✿ MADE WITH FEELING</span>
              </button>
            </div>

            <blockquote className="nx-manifesto-note" id="manifesto-note-text">
              {PRINCIPLE_NOTES[activePrinciple]}
            </blockquote>

            <div className="nx-manifesto-art-footer">
              <div>
                <div style={{ fontWeight: 700, color: "var(--ink-deep)" }}>
                  Studio Almanac · Issue No. 04
                </div>
                <div style={{ fontSize: "0.92rem", color: "var(--ink-muted)" }}>
                  Portland · Kyoto · Independent Since 2019
                </div>
              </div>
              <img
                src="/templates/nexus/clay-flower.webp"
                alt=""
                aria-hidden="true"
                width={104}
                height={86}
                style={{ width: "104px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
