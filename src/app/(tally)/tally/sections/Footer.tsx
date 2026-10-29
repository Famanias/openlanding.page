import React from "react";
import { FooterShopfrontScene } from "../brand/Illustrations";
import { TallyLogo } from "../brand/Logo";
import { Reveal } from "../motion/Reveal";
import { MotionPauseButton } from "../motion/SmoothScroll";

export function Footer() {
  return (
    <footer className="tl-footer">
      <div className="tl-container">
        <div className="tl-footer-top">
          <div className="tl-footer-brand">
            <TallyLogo />
            <p className="tl-footer-motto">
              Sell your hours like your goods. The service-counter layer for small Shopify businesses.
            </p>
            <div className="tl-mono tl-footer-status">
              <span className="tl-live-dot" aria-hidden="true" />
              ONLINE STORE 2.0 + SHOPIFY POS READY
            </div>
          </div>

          <div className="tl-footer-nav-cols">
            <div className="tl-footer-col">
              <h3 className="tl-mono tl-footer-heading">SECTIONS</h3>
              <ul className="tl-footer-links">
                <li>
                  <a href="#top" className="tl-footer-link">
                    Front Counter
                  </a>
                </li>
                <li>
                  <a href="#ledger" className="tl-footer-link">
                    Ticket Runway
                  </a>
                </li>
                <li>
                  <a href="#modes" className="tl-footer-link">
                    Service Modes
                  </a>
                </li>
                <li>
                  <a href="#merchants" className="tl-footer-link">
                    Merchant Stories
                  </a>
                </li>
              </ul>
            </div>

            <div className="tl-footer-col">
              <h3 className="tl-mono tl-footer-heading">LEDGER & FAQ</h3>
              <ul className="tl-footer-links">
                <li>
                  <a href="#calculator" className="tl-footer-link">
                    Recovery Calculator
                  </a>
                </li>
                <li>
                  <a href="#faq" className="tl-footer-link">
                    Shopify Stack FAQ
                  </a>
                </li>
                <li>
                  <a href="#open-counter" className="tl-footer-link">
                    Issue a Trial Pass
                  </a>
                </li>
              </ul>
            </div>

            <div className="tl-footer-col">
              <h3 className="tl-mono tl-footer-heading">WORKSHOPS</h3>
              <ul className="tl-footer-meta-list tl-mono">
                <li>Denim & Tailoring</li>
                <li>Bicycle & Ski Bays</li>
                <li>Ceramic Studios</li>
                <li>Watch & Horology</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Illustrated Pastel Street of Small Service Storefronts */}
        <Reveal as="div" variant="wipe" className="tl-footer-scene-wrap">
          <div className="tl-wipe-child">
            <FooterShopfrontScene />
          </div>
        </Reveal>

        <div className="tl-footer-bottom">
          <p className="tl-mono tl-footer-copy">
            © 2026 TALLY · OPENLANDINGPAGE TEMPLATE
          </p>

          <div className="tl-footer-bottom-right">
            <MotionPauseButton />
            <a href="#top" className="tl-mono tl-back-top">
              Back to Counter ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
