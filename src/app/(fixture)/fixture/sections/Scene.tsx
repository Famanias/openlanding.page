import type { CSSProperties } from "react";
import { FitSheet } from "../fitout/FitSheet";
import { Readout } from "../fitout/Readout";
import { SceneController } from "../fitout/SceneController";
import { Storefront } from "../fitout/Storefront";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";

const FACTS = [
  { k: "Shops fitted", v: "64" },
  { k: "Door to door", v: "4 wks" },
  { k: "Setup from", v: "€1,800" },
];

/** Hero and fit-out in one pinned scene, so the storefront you meet at the top is the one that gets built. */
export function Scene() {
  return (
    <SceneController labelledBy="fx-hero-title">
      <div className="fx-scene__stage">
        <div className="fx-scene__ghost" aria-hidden="true">
          {["00", "01", "02", "03", "04", "05"].map((n, index) => <span key={n} data-ghost={index}>{n}</span>)}
        </div>
        <div className="fx-container fx-scene__grid">
          <div className="fx-scene__copy">
            <div className="fx-hero fx-load">
              <p className="fx-eyebrow fx-load__eyebrow"><span>Shopify studio</span><span>Rotterdam</span><span>Since 2019</span></p>
              <h1 id="fx-hero-title" className="fx-hero__title">
                <SplitText delay={220}>{"Your shop,\nfitted out\nproperly."}</SplitText>
              </h1>
              <p className="fx-hero__lead fx-load__item" style={{ "--i": 0 } as CSSProperties}>
                Five people who set up, build and tune Shopify stores for independent merchants. Flat prices per stage, four weeks door to door, and someone on the floor after launch.
              </p>
              <div className="fx-hero__actions fx-load__item" style={{ "--i": 1 } as CSSProperties}>
                <Magnetic>
                  <a className="fx-button fx-button--primary fx-button--lg" href="#book">
                    <span className="fx-button__fill" aria-hidden="true" />
                    <span className="fx-button__roll"><span>Book a walk-through</span><span aria-hidden="true">Book a walk-through</span></span>
                    <span className="fx-button__arrow" aria-hidden="true">→</span>
                  </a>
                </Magnetic>
                <a className="fx-button fx-button--ghost fx-button--lg" href="#prices">
                  <span className="fx-button__fill" aria-hidden="true" />
                  <span className="fx-button__roll"><span>See the price list</span><span aria-hidden="true">See the price list</span></span>
                </a>
              </div>
              <dl className="fx-hero__facts fx-load__item" style={{ "--i": 2 } as CSSProperties}>
                {FACTS.map((fact) => (
                  <div key={fact.k}>
                    <dt className="fx-mono">{fact.k}</dt>
                    <dd>{fact.v}</dd>
                  </div>
                ))}
              </dl>
              <p className="fx-hero__cue fx-mono fx-load__item" style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
                <span className="fx-hero__cue-line" /> Scroll to fit out the shop
              </p>
            </div>
            <FitSheet />
          </div>
          <div className="fx-scene__shop fx-load__shop">
            <Storefront />
            <Readout />
          </div>
        </div>
      </div>
    </SceneController>
  );
}
