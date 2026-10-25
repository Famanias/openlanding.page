"use client";
import { useId, useState } from "react";
import { FAQS } from "../data/shop";
import { Reveal } from "../motion/Reveal";
import { SectionHead } from "./SectionHead";

/** Shipping Q&A. Panels open through grid-template-rows (no height animation), one at a time. */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  const uid = useId();
  return (
    <section id="faq" className="pk-sec pk-sec--cream" aria-labelledby="faq-title">
      <div className="pk-wrap pk-wrap--narrow">
        <SectionHead id="faq-title" eyebrow="Questions" title="Things people [[ask us.]]" />
        <ul className="pk-faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={f.q} variant="rise" index={i} className="pk-faq-item">
                <h3 className="pk-faq-h">
                  <button type="button" className="pk-faq-q" aria-expanded={isOpen} aria-controls={`${uid}-${i}`} id={`${uid}-q${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="pk-faq-plus" aria-hidden="true"><i /><i /></span>
                  </button>
                </h3>
                <div id={`${uid}-${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="pk-faq-a" data-open={isOpen ? "true" : "false"} inert={!isOpen}>
                  <div><p>{f.a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
