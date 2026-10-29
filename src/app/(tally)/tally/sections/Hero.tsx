"use client";

import React, { useState } from "react";
import { CounterBellSvg } from "../brand/Illustrations";
import { CounterStamp, ScissorsIcon } from "../brand/Logo";
import { ARCHETYPES } from "../content/data";
import type { ArchetypeId } from "../counter/ticket";
import { Magnetic } from "../motion/Reveal";

export function Hero() {
  const [activeArchId, setActiveArchId] = useState<ArchetypeId>("tailor");
  const [bellRinging, setBellRinging] = useState<boolean>(false);
  const [heroStamped, setHeroStamped] = useState<boolean>(false);

  const activeArch =
    ARCHETYPES.find((a) => a.id === activeArchId) ?? ARCHETYPES[0];

  const handleRingAndStamp = () => {
    setBellRinging(true);
    setHeroStamped((prev) => !prev);
    window.setTimeout(() => setBellRinging(false), 700);
  };

  const handleQuickPick = (id: ArchetypeId) => {
    setActiveArchId(id);
    window.dispatchEvent(
      new CustomEvent("tally:archetype", { detail: { archetype: id } })
    );
  };

  return (
    <section id="top" className="tl-hero" aria-labelledby="tl-hero-heading">
      <div className="tl-container tl-hero-grid">
        {/* Left Editorial Column */}
        <div className="tl-hero-copy">
          <h1 id="tl-hero-heading" className="tl-hero-h1">
            <span className="tl-mask-line tl-load-2">
              <span className="tl-mask-inner">Sell your hours</span>
            </span>
            <span className="tl-mask-line tl-load-3">
              <span className="tl-mask-inner">
                <em>like your goods.</em>
              </span>
            </span>
          </h1>

          <p className="tl-hero-lead tl-load-4">
            Turn Shopify checkouts into booked appointments, repair intakes, and bench claim tickets. Capture upfront deposits and sync seamlessly with Shopify POS.
          </p>

          <div className="tl-hero-ctas tl-load-4">
            <Magnetic>
              <a href="#ledger" className="tl-btn tl-btn-primary tl-btn-lg">
                <ScissorsIcon />
                <span>Try the Live Counter</span>
              </a>
            </Magnetic>

            <a href="#calculator" className="tl-btn tl-btn-secondary tl-btn-lg">
              <span>Calculate Recovery</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Merchant Archetype Quick-Switcher */}
          <div className="tl-hero-archetypes tl-load-5">
            <span className="tl-mono tl-hero-arch-label">
              SHOP PREVIEW:
            </span>
            <div className="tl-hero-arch-pills" role="group" aria-label="Preview merchant counter">
              {ARCHETYPES.map((arch) => (
                <button
                  key={arch.id}
                  type="button"
                  className="tl-arch-chip"
                  data-active={arch.id === activeArch.id ? "true" : "false"}
                  data-tone={arch.pastelTone}
                  aria-pressed={arch.id === activeArch.id}
                  onClick={() => handleQuickPick(arch.id)}
                >
                  {arch.shopExample}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Interactive Counter Mat & Two-Part Claim Stub */}
        <div className="tl-hero-mat-wrap tl-load-5" data-tl-hero-mat>
          <div className="tl-hero-mat" data-tone={activeArch.pastelTone}>
            <div className="tl-mat-top">
              <div>
                <span className="tl-mono tl-mat-tag">
                  FRONT COUNTER MAT · {activeArch.city.toUpperCase()}
                </span>
                <div className="tl-mat-shop-title">{activeArch.shopExample}</div>
              </div>
              <button
                type="button"
                className="tl-bell-trigger"
                onClick={handleRingAndStamp}
                aria-pressed={heroStamped}
              >
                <span className="tl-mono">
                  {heroStamped ? "✓ Stamped · Ring Again" : "🔔 Ring Bell & Stamp"}
                </span>
              </button>
            </div>

            <div className="tl-mat-bell-row">
              <CounterBellSvg ringing={bellRinging} />
              <div className="tl-mat-bell-caption">
                <div className="tl-mono tl-mat-sku">{activeArch.sku} · ONLINE + POS</div>
                <p className="tl-mat-service-name">{activeArch.serviceTitle}</p>
                <span className="tl-mono tl-mat-slot-pill">
                  NEXT SLOT: {activeArch.slots[0]} · ${activeArch.basePrice}.00
                </span>
              </div>
            </div>

            {/* Hero Mini Two-Part Perforated Ticket */}
            <div
              className="tl-hero-ticket"
              data-stamped={heroStamped ? "true" : "false"}
            >
              <div className="tl-hero-ticket-left">
                <div className="tl-mono tl-hero-ticket-head">
                  <span>BENCH COPY · {activeArch.benchStation}</span>
                  <span>50% DEPOSIT</span>
                </div>
                <div className="tl-hero-ticket-rows">
                  <div className="tl-hero-ticket-row">
                    <span>Deposit at checkout</span>
                    <strong className="tl-mono">
                      ${Math.round(activeArch.basePrice * 0.5)}.00 PAID
                    </strong>
                  </div>
                  <div className="tl-hero-ticket-row">
                    <span>Due at pickup</span>
                    <strong className="tl-mono">
                      ${Math.round(activeArch.basePrice * 0.5)}.00 HELD
                    </strong>
                  </div>
                </div>
                <CounterStamp
                  label={heroStamped ? "BENCH READY" : "50% PAID"}
                  sublabel="SHOPIFY POS"
                  stamped={heroStamped}
                  className="tl-hero-stamp-pos"
                />
              </div>

              <div className="tl-hero-ticket-seam" aria-hidden="true" />

              <div className="tl-hero-ticket-right">
                <span className="tl-mono">CLAIM STUB</span>
                <strong className="tl-mono tl-hero-stub-num">
                  #TLY-{activeArch.sku.slice(-3)}
                </strong>
                <span className="tl-mono tl-hero-stub-turn">
                  {activeArch.turnaround}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4-up Ledger Strip */}
      <div className="tl-hero-ledger-strip">
        <div className="tl-container tl-strip-grid">
          <div className="tl-strip-item">
            <span className="tl-mono tl-strip-label">MIXED CARTS</span>
            <p className="tl-strip-val">Goods and service labor in one checkout</p>
          </div>
          <div className="tl-strip-item">
            <span className="tl-mono tl-strip-label">UPFRONT DEPOSITS</span>
            <p className="tl-strip-val">Cut no-shows with 25–100% upfront deposits</p>
          </div>
          <div className="tl-strip-item">
            <span className="tl-mono tl-strip-label">SHOPIFY POS</span>
            <p className="tl-strip-val">Scan stubs, pull parts, and print bench tags</p>
          </div>
          <div className="tl-strip-item">
            <span className="tl-mono tl-strip-label">ZERO COMMISSION</span>
            <p className="tl-strip-val">Flat monthly rate—keep 100% of your labor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
