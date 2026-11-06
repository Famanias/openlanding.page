"use client";

import { useState } from "react";
import { nextTestimonialIndex } from "../model/agencyLogic";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "“Before nexus, our brand sounded like every other botanical label on the shelf. They spent a week in our workshop, sculpted our new vessels in clay, and wrote a campaign that doubled our repeat customers without a single discount code.”",
    author: "Clara Vance",
    role: "Founder & Head Herbalist, Solstice Apothecary",
  },
  {
    quote:
      "“Working with nexus felt like collaborating with an indie publishing house and a master ceramicist at once. Our customers literally frame the print almanacs they designed for our autumn wool collection.”",
    author: "Julian Mercer",
    role: "Creative Director, Loom & Meadow",
  },
  {
    quote:
      "“They rebuilt our entire subscription experience around human warmth rather than dark-pattern upsells. Retention jumped 138% in six months because subscribers finally felt part of a real table.”",
    author: "Maeve O’Sullivan",
    role: "Co-Founder, Kith & Kin Roasters",
  },
];

export function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const current = TESTIMONIALS[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => nextTestimonialIndex(prev, "prev", TESTIMONIALS.length));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => nextTestimonialIndex(prev, "next", TESTIMONIALS.length));
  };

  return (
    <section className="nx-testimonials" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="nx-container">
        <div className="nx-quote-stage" data-reveal>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <span className="nx-kicker" id="testimonials-heading">
              05 · Client Love
            </span>
            <span
              id="quote-counter"
              style={{
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "var(--ink-muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              Note 0{currentIdx + 1} of 0{TESTIMONIALS.length}
            </span>
          </div>

          <blockquote className="nx-quote-text" id="testimonial-quote">
            {current.quote}
          </blockquote>

          <div className="nx-quote-footer">
            <div className="nx-quote-author">
              <strong id="testimonial-author">{current.author}</strong>
              <span id="testimonial-role">{current.role}</span>
            </div>

            <div className="nx-quote-controls">
              <button
                type="button"
                className="nx-IconBtn"
                id="testimonial-prev"
                aria-label="Previous client testimonial"
                onClick={handlePrev}
              >
                <span>← Prev</span>
              </button>
              <button
                type="button"
                className="nx-IconBtn"
                id="testimonial-next"
                aria-label="Next client testimonial"
                onClick={handleNext}
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
