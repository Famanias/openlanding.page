"use client";

import { useState } from "react";
import { FAQ } from "../content/faq";
import { Reveal } from "../motion/Reveal";
import { SplitText } from "../motion/SplitText";

/** One question open at a time; height animates through grid rows, never `height`. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="fx-section fx-faq" aria-labelledby="fx-faq-title">
      <div className="fx-container fx-faq__grid">
        <Reveal className="fx-faq__head" kind="rise">
          <p className="fx-eyebrow"><span>FAQ</span><span>Asked on every walk-through</span></p>
          <h2 id="fx-faq-title"><SplitText>{"Before you\nbook."}</SplitText></h2>
        </Reveal>
        <ul className="fx-faq__list">
          {FAQ.map((item, index) => {
            const isOpen = open === index;
            return (
              <Reveal as="li" key={item.q} kind="rise" index={index} className="fx-faq__item">
                <h3>
                  <button type="button" className="fx-faq__q" aria-expanded={isOpen} aria-controls={`fx-faq-${index}`} id={`fx-faq-q-${index}`} onClick={() => setOpen(isOpen ? null : index)}>
                    <span className="fx-mono">0{index + 1}</span>
                    <span className="fx-faq__q-text">{item.q}</span>
                    <span className="fx-faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`fx-faq-${index}`} role="region" aria-labelledby={`fx-faq-q-${index}`} className="fx-faq__a" data-open={isOpen ? "true" : "false"}>
                  <div><p>{item.a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
