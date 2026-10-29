"use client";

import React, { useState } from "react";
import { SERVICE_MODES } from "../content/data";
import { Reveal } from "../motion/Reveal";

export function ServiceModes() {
  const [viewByCard, setViewByCard] = useState<Record<string, "storefront" | "pos">>({});

  const toggleView = (id: string, nextView: "storefront" | "pos") => {
    setViewByCard((prev) => ({ ...prev, [id]: nextView }));
  };

  return (
    <section id="modes" className="tl-section tl-modes-section" aria-labelledby="tl-modes-heading">
      <div className="tl-container">
        <div className="tl-section-head">
          <div className="tl-head-split">
            <Reveal as="h2" variant="mask" className="tl-h2">
              <span id="tl-modes-heading" className="tl-mask-inner">
                Every service format, <em>one counter ledger.</em>
              </span>
            </Reveal>

            <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
              Four flexible ways to sell time, services, and bench labor alongside physical inventory.
            </Reveal>
          </div>
        </div>

        <div className="tl-modes-bento">
          {SERVICE_MODES.map((mode, idx) => {
            const activeView = viewByCard[mode.id] ?? "storefront";
            return (
              <Reveal
                key={mode.id}
                as="article"
                variant="cascade"
                index={idx}
                className="tl-mode-card"
              >
                <div className="tl-mode-card-inner" data-tone={mode.pastel}>
                  <h3 className="tl-mode-title">{mode.title}</h3>
                  <p className="tl-mode-desc">{mode.description}</p>

                  {/* Storefront vs POS View Switcher */}
                  <div className="tl-mode-preview-box">
                    <div
                      className="tl-mode-switch-bar"
                      role="group"
                      aria-label={`${mode.title} preview mode`}
                    >
                      <button
                        type="button"
                        className="tl-mode-switch-btn tl-mono"
                        data-active={activeView === "storefront" ? "true" : "false"}
                        aria-pressed={activeView === "storefront"}
                        onClick={() => toggleView(mode.id, "storefront")}
                      >
                        Online Cart Line
                      </button>
                      <button
                        type="button"
                        className="tl-mode-switch-btn tl-mono"
                        data-active={activeView === "pos" ? "true" : "false"}
                        aria-pressed={activeView === "pos"}
                        onClick={() => toggleView(mode.id, "pos")}
                      >
                        Shopify POS Bench
                      </button>
                    </div>

                    {activeView === "storefront" ? (
                      <div className="tl-mode-snippet" data-view="storefront">
                        <div className="tl-snippet-title">{mode.storefrontLine.title}</div>
                        <div className="tl-mono tl-snippet-meta">{mode.storefrontLine.meta}</div>
                        <div className="tl-snippet-bottom">
                          <span className="tl-mono tl-snippet-badge">
                            {mode.storefrontLine.depositBadge}
                          </span>
                          <strong className="tl-mono tl-snippet-price">
                            {mode.storefrontLine.price}
                          </strong>
                        </div>
                      </div>
                    ) : (
                      <div className="tl-mode-snippet" data-view="pos">
                        <div className="tl-mono tl-snippet-station">
                          {mode.posBenchLine.station}
                        </div>
                        <div className="tl-snippet-title">{mode.posBenchLine.status}</div>
                        <div className="tl-mono tl-snippet-meta">
                          {mode.posBenchLine.inventoryLink}
                        </div>
                        <div className="tl-snippet-bottom">
                          <span className="tl-mono tl-snippet-action">
                            ✓ {mode.posBenchLine.actionLabel}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
