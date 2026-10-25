import React from "react";
import { CounterStage } from "./counter/CounterStage";
import { RevenueCalculator } from "./counter/RevenueCalculator";
import { Reveal } from "./motion/Reveal";
import { SmoothScroll } from "./motion/SmoothScroll";
import { FaqSection } from "./sections/FaqSection";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { IntakeSection } from "./sections/IntakeSection";
import { MerchantStories } from "./sections/MerchantStories";
import { ServiceModes } from "./sections/ServiceModes";

export default function TallyPage() {
  return (
    <div className="tl-page">
      <SmoothScroll />
      <Header />

      <main id="main-content">
        <Hero />

        {/* § I · The Signature Mechanic: Pinned & Interactive Perforated Ticket Runway */}
        <section
          id="ledger"
          className="tl-section tl-ledger-section"
          aria-labelledby="tl-ledger-heading"
        >
          <div className="tl-container tl-ledger-intro">
            <Reveal as="div" variant="draw" className="tl-eyebrow-row">
              <span className="tl-eyebrow-rule" aria-hidden="true" />
              <span className="tl-mono">
                § I · THE PERFORATED TICKET RUNWAY (STOPS 01–04)
              </span>
            </Reveal>

            <div className="tl-head-split">
              <Reveal as="h2" variant="mask" className="tl-h2">
                <span id="tl-ledger-heading" className="tl-mask-inner">
                  One claim ticket from checkout <em>to bench pickup.</em>
                </span>
              </Reveal>

              <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
                Scroll or click through the four workbench stops below. Switch merchant archetypes, adjust the checkout deposit split, and tear the customer claim stub along the perforation.
              </Reveal>
            </div>
          </div>

          <CounterStage />
        </section>

        {/* § II · Four Ways to Sell Time */}
        <ServiceModes />

        {/* § III · Small Shopify Business Dossiers */}
        <MerchantStories />

        {/* § IV · Rate & Deposit Calculator + Merchant Plans */}
        <section
          id="calculator"
          className="tl-section tl-calc-section"
          aria-labelledby="tl-calc-heading"
        >
          <div className="tl-container">
            <div className="tl-section-head">
              <Reveal as="div" variant="draw" className="tl-eyebrow-row">
                <span className="tl-eyebrow-rule" aria-hidden="true" />
                <span className="tl-mono">§ IV · RATE & DEPOSIT RECOVERY LEDGER</span>
              </Reveal>

              <div className="tl-head-split">
                <Reveal as="h2" variant="mask" className="tl-h2">
                  <span id="tl-calc-heading" className="tl-mask-inner">
                    Priced like a shop ledger, <em>never a tax on your labor.</em>
                  </span>
                </Reveal>

                <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
                  Other booking apps take a percentage of every appointment. Tally charges one flat monthly fee for your shop counter while recovering thousands in missed bench hours.
                </Reveal>
              </div>
            </div>

            <RevenueCalculator />
          </div>
        </section>

        {/* § V · Counter Questions */}
        <FaqSection />

        {/* § VI · Open Your Counter */}
        <IntakeSection />
      </main>

      <Footer />
    </div>
  );
}
