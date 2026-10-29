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

        {/* The Signature Mechanic: Pinned & Interactive Perforated Ticket Runway */}
        <section
          id="ledger"
          className="tl-section tl-ledger-section"
          aria-labelledby="tl-ledger-heading"
        >
          <div className="tl-container tl-ledger-intro">
            <div className="tl-head-split">
              <Reveal as="h2" variant="mask" className="tl-h2">
                <span id="tl-ledger-heading" className="tl-mask-inner">
                  One claim ticket from checkout <em>to bench pickup.</em>
                </span>
              </Reveal>

              <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
                Track every order across four workbench stages. Adjust deposit splits and detach customer claim stubs.
              </Reveal>
            </div>
          </div>

          <CounterStage />
        </section>

        {/* Four Ways to Sell Time */}
        <ServiceModes />

        {/* Small Shopify Business Dossiers */}
        <MerchantStories />

        {/* Rate & Deposit Calculator + Merchant Plans */}
        <section
          id="calculator"
          className="tl-section tl-calc-section"
          aria-labelledby="tl-calc-heading"
        >
          <div className="tl-container">
            <div className="tl-section-head">
              <div className="tl-head-split">
                <Reveal as="h2" variant="mask" className="tl-h2">
                  <span id="tl-calc-heading" className="tl-mask-inner">
                    Priced like a shop ledger, <em>never a tax on your labor.</em>
                  </span>
                </Reveal>

                <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
                  No percentage cut on your hours. One flat monthly rate while recovering missed bench time.
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
