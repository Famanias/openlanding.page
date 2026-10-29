"use client";

import React, { useState } from "react";
import { FAQS } from "../content/data";
import { Reveal } from "../motion/Reveal";

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQS[0].id);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section id="faq" className="tl-section tl-faq-section" aria-labelledby="tl-faq-heading">
      <div className="tl-container tl-faq-grid">
        <div className="tl-faq-aside">
          <Reveal as="h2" variant="mask" className="tl-h2">
            <span id="tl-faq-heading" className="tl-mask-inner">
              How Tally fits into your <em>existing Shopify stack.</em>
            </span>
          </Reveal>

          <Reveal as="p" variant="rise" delay={120} className="tl-faq-lede">
            Native Online Store 2.0 app blocks and Shopify POS extensions. Zero Liquid code edits.
          </Reveal>

          <Reveal as="div" variant="rise" delay={200} className="tl-faq-badge-card">
            <span className="tl-mono">THEME COMPATIBLE</span>
            <p>
              Works with Dawn, Prestige, Impulse, and custom themes out of the box.
            </p>
          </Reveal>
        </div>

        <div className="tl-faq-list">
          {FAQS.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <Reveal
                key={item.id}
                as="div"
                variant="cascade"
                index={idx}
                className="tl-faq-item"
              >
                <div className="tl-faq-card" data-open={isOpen ? "true" : "false"}>
                  <h3 className="tl-faq-q-wrap">
                    <button
                      type="button"
                      className="tl-faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={`tl-faq-panel-${item.id}`}
                      id={`tl-faq-btn-${item.id}`}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="tl-faq-q-left">
                        <span className="tl-mono tl-faq-tag">{item.tag}</span>
                        <span className="tl-faq-q-text">{item.question}</span>
                      </span>
                      <span className="tl-faq-icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`tl-faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`tl-faq-btn-${item.id}`}
                    className="tl-faq-answer-grid"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <div className="tl-faq-answer-inner">
                      <p className="tl-faq-answer-copy">{item.answer}</p>
                    </div>
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
