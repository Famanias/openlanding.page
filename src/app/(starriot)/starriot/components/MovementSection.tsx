"use client";

import React, { useState, useRef } from "react";

export function MovementSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({ 0: true });

  const scrollGallery = (direction: "left" | "right") => {
    if (trackRef.current) {
      trackRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqs((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section className="sr-movement-section" aria-labelledby="movement-heading">
      <div className="sr-container">
        <div className="sr-section-header-split">
          <div>
            <div className="sr-kicker-label">
              <span>VOICES FROM THE 3 AM FLOOR</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="movement-heading" className="sr-display-type sr-section-title">
              COME FOR ONE SONG. STAY FOR THE WHOLE NIGHT.
            </h2>
          </div>

          <div className="sr-carousel-controls">
            <button
              type="button"
              className="sr-carousel-arrow-btn"
              id="gallery-prev"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery("left")}
            >
              ←
            </button>
            <button
              type="button"
              className="sr-carousel-arrow-btn"
              id="gallery-next"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery("right")}
            >
              →
            </button>
          </div>
        </div>

        <div className="sr-sticker-wall-track" id="sticker-wall-track" ref={trackRef}>
          {/* Sticker 1 */}
          <article className={`sr-sticker-card ${flippedCards[1] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--electric-mint)", marginBottom: "0.5rem" }}>
                STAMP #014 · FRIDAY FREQUENCY
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;NOBODY STARING AT PHONES—JUST 500 PEOPLE GROOVING.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — MARA K., REGULAR SINCE OPENING NIGHT
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(1)}>
                {flippedCards[1] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>2:15 AM Memory:</strong> When DJ Orbit dropped a 1979 brass edit and the whole room sang the
                bassline together.
              </div>
            </div>
          </article>

          {/* Sticker 2 */}
          <article className={`sr-sticker-card ${flippedCards[2] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--hot-pink)", marginBottom: "0.5rem" }}>
                STAMP #029 · SATURDAY STARBURST
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;THE SOUND SYSTEM FEELS LIKE A WARM NEON HUG.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — DEVON &amp; JULES, EAST SIDE CREW
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(2)}>
                {flippedCards[2] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Crystal Clear Highs:</strong> You can actually talk to your friends by the bar and still feel
                the sub-bass in your shoes.
              </div>
            </div>
          </article>

          {/* Sticker 3 */}
          <article className={`sr-sticker-card ${flippedCards[3] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--acid-lime)", marginBottom: "0.5rem" }}>
                STAMP #042 · SUNDAY SLOWBURN
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;CAME SOLO AT 10 PM, LEFT WITH A WHOLE NEW DANCE CREW.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — TARIQ S., VINYL COLLECTOR
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(3)}>
                {flippedCards[3] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Floor Host Tip:</strong> Ask the booth crew for the handwritten tracklist zine at closing time!
              </div>
            </div>
          </article>

          {/* Sticker 4 */}
          <article className={`sr-sticker-card ${flippedCards[4] ? "sr-flipped" : ""}`}>
            <div>
              <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--warm-coral)", marginBottom: "0.5rem" }}>
                STAMP #058 · LATE HOURS
              </div>
              <h3 className="sr-display-type" style={{ fontSize: "1.55rem", marginBottom: "0.6rem" }}>
                &ldquo;GLITTER, PLATFORM BOOTS, AND ZERO PRETENSION.&rdquo;
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--muted-lilac)" }}>
                — SASHA V., DESIGNER &amp; DANCER
              </p>
            </div>
            <div>
              <button type="button" className="sr-sticker-flip-btn" onClick={() => toggleFlip(4)}>
                {flippedCards[4] ? "Hide Backside Note ↺" : "Peel Backside Note ↺"}
              </button>
              <div className="sr-sticker-back-note">
                <strong>Dress Vibe:</strong> Wear whatever makes you move—sequins, vintage track jackets, or neon
                shades.
              </div>
            </div>
          </article>
        </div>

        {/* FAQ Accordion */}
        <div id="faq" className="sr-faq-wrap">
          <div className="sr-kicker-label">
            <span>KNOW BEFORE YOU GO</span>
            <span className="sr-spark" aria-hidden="true">✦</span>
          </div>
          <h2 className="sr-display-type sr-section-title">FREQUENTLY ASKED QUESTIONS.</h2>

          <div className="sr-faq-list">
            <div className={`sr-faq-item ${openFaqs[0] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[0])}
                onClick={() => toggleFaq(0)}
              >
                <span>HOW DOES THE GUESTLIST WORK?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                Drop your name and preferred night in the form below to generate a demo STAR RIOT Club Pass. (Note:
                STAR RIOT is a fictional nightlife concept built as an interactive design showcase—no real personal
                data is transmitted or stored externally.)
              </div>
            </div>

            <div className={`sr-faq-item ${openFaqs[1] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[1])}
                onClick={() => toggleFaq(1)}
              >
                <span>IS THERE A DRESS CODE?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                Expressive, comfortable, and ready to sweat. Platform boots, vintage tracksuits, holographic jackets,
                and sneakers are all welcome. We only ask that you leave corporate suits and bad attitudes at home.
              </div>
            </div>

            <div className={`sr-faq-item ${openFaqs[2] ? "sr-open" : ""}`}>
              <button
                type="button"
                className="sr-faq-trigger"
                aria-expanded={Boolean(openFaqs[2])}
                onClick={() => toggleFaq(2)}
              >
                <span>WHY NO FLASH PHOTOS ON THE DANCE FLOOR?</span>
                <span className="sr-faq-icon" aria-hidden="true">+</span>
              </button>
              <div className="sr-faq-answer">
                The dance floor works best when everyone is inside the moment rather than on someone else&apos;s feed. Keep
                phones tucked away on the main floor; our illustrated photobooth in the lounge is open all night.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
