"use client";

import React, { useEffect, useRef, useState } from "react";
import { MerchantDossierArt } from "../brand/Illustrations";
import { CounterStamp } from "../brand/Logo";
import { MERCHANT_STORIES, type MerchantStory } from "../content/data";
import { CountUp, Reveal } from "../motion/Reveal";

const MARQUEE_TAGS = [
  "DENIM CHAIN-STITCH HEMMING",
  "BICYCLE DRIVETRAIN OVERHAULS",
  "ESPRESSO GROUPHEAD DESCALING",
  "WATCH MOVEMENT REGULATION",
  "CUSTOM PICTURE FRAMING",
  "GOODYEAR WELT BOOT RESOLING",
  "CERAMIC KILN SHELF FIRING",
  "BRIDAL PIN FITTINGS",
  "KNIFE WHETSTONE SHARPENING",
  "TENNIS RACQUET STRINGING",
];

export function MerchantStories() {
  const [activeStory, setActiveStory] = useState<MerchantStory | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeStory) {
      if (!dialog.open) {
        try {
          dialog.showModal();
        } catch {
          dialog.setAttribute("open", "");
        }
      }
    } else if (dialog.open) {
      try {
        dialog.close();
      } catch {
        dialog.removeAttribute("open");
      }
    }
  }, [activeStory]);

  const closeReceipt = () => {
    setActiveStory(null);
    window.setTimeout(() => {
      lastTriggerRef.current?.focus();
    }, 10);
  };

  return (
    <section
      id="merchants"
      className="tl-section tl-merchants-section"
      aria-labelledby="tl-merchants-heading"
    >
      {/* Ambient Service Ticker Band */}
      <div className="tl-marquee-band" aria-label="Supported small Shopify service categories">
        <div className="tl-marquee-track">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
            <span key={`${tag}-${idx}`} className="tl-mono tl-marquee-item">
              <span className="tl-marquee-dot" aria-hidden="true">
                ◆
              </span>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="tl-container">
        <div className="tl-section-head">
          <Reveal as="div" variant="draw" className="tl-eyebrow-row">
            <span className="tl-eyebrow-rule" aria-hidden="true" />
            <span className="tl-mono">§ III · THE MERCHANT BENCH</span>
          </Reveal>

          <div className="tl-head-split">
            <Reveal as="h2" variant="mask" className="tl-h2">
              <span id="tl-merchants-heading" className="tl-mask-inner">
                Built for shops where the back room <em>is a workshop.</em>
              </span>
            </Reveal>

            <Reveal as="p" variant="rise" delay={120} className="tl-section-lede">
              Over 1,400 independent Shopify merchants run their fitting rooms, repair stands, and studio kilns on Tally. Inspect an actual counter receipt from three of them.
            </Reveal>
          </div>
        </div>

        <div className="tl-dossier-grid">
          {MERCHANT_STORIES.map((story, idx) => (
            <Reveal
              key={story.id}
              as="article"
              variant="cascade"
              index={idx}
              className="tl-dossier-card"
            >
              <div className="tl-dossier-inner" data-tone={story.pastel}>
                <Reveal as="div" variant="wipe" className="tl-dossier-media">
                  <div className="tl-wipe-child">
                    <MerchantDossierArt type={story.illustrationType} />
                  </div>
                </Reveal>

                <div className="tl-dossier-body">
                  <div className="tl-dossier-meta tl-mono">
                    <span>{story.category.toUpperCase()}</span>
                    <span>{story.location.toUpperCase()}</span>
                  </div>

                  <h3 className="tl-dossier-title">{story.shopName}</h3>

                  <div className="tl-dossier-stat-box">
                    <div className="tl-dossier-stat-big">
                      <CountUp value={story.metricValue} suffix={story.metricSuffix} />
                    </div>
                    <div className="tl-dossier-stat-copy">
                      <p className="tl-dossier-stat-label">{story.metricLabel}</p>
                      <p className="tl-mono tl-dossier-stat-sub">{story.secondaryStat}</p>
                    </div>
                  </div>

                  <blockquote className="tl-dossier-quote">
                    “{story.quote}”
                    <footer className="tl-mono tl-dossier-owner">— {story.owner}</footer>
                  </blockquote>

                  <button
                    type="button"
                    className="tl-btn tl-btn-secondary tl-dossier-btn"
                    onClick={(e) => {
                      lastTriggerRef.current = e.currentTarget;
                      setActiveStory(story);
                    }}
                  >
                    <span className="tl-mono">Inspect Receipt #{story.receipt.serial}</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Accessible Receipt Inspection Modal Dialog */}
      <dialog
        ref={dialogRef}
        className="tl-receipt-dialog"
        aria-labelledby="tl-modal-receipt-title"
        onCancel={(e) => {
          e.preventDefault();
          closeReceipt();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeReceipt();
        }}
      >
        {activeStory && (
          <div className="tl-receipt-modal-card" data-tone={activeStory.pastel}>
            <div className="tl-receipt-modal-top">
              <div>
                <span className="tl-mono tl-receipt-serial">
                  COUNTER ARCHIVE · {activeStory.receipt.serial}
                </span>
                <h3 id="tl-modal-receipt-title" className="tl-receipt-shop">
                  {activeStory.shopName}
                </h3>
                <p className="tl-mono tl-receipt-sub">
                  {activeStory.receipt.date} · {activeStory.receipt.station}
                </p>
              </div>
              <button
                type="button"
                className="tl-receipt-close"
                aria-label="Close receipt dialog"
                onClick={closeReceipt}
              >
                ✕
              </button>
            </div>

            <div className="tl-receipt-customer tl-mono">
              CUSTOMER: {activeStory.receipt.customer}
            </div>

            <div className="tl-receipt-items">
              {activeStory.receipt.items.map((item) => (
                <div key={item.code} className="tl-receipt-line">
                  <span className="tl-mono tl-receipt-code">{item.code}</span>
                  <span className="tl-receipt-label">{item.label}</span>
                  <strong className="tl-mono tl-receipt-amt">{item.amount}</strong>
                </div>
              ))}
            </div>

            <div className="tl-receipt-splits">
              <div className="tl-receipt-split-row">
                <span>Shopify Checkout Deposit</span>
                <strong className="tl-mono">{activeStory.receipt.depositPaid}</strong>
              </div>
              <div className="tl-receipt-split-row">
                <span>Counter Pickup Settlement</span>
                <strong className="tl-mono">{activeStory.receipt.balancePaid}</strong>
              </div>
            </div>

            <div className="tl-receipt-footer-row">
              <p className="tl-mono tl-receipt-note">✓ {activeStory.receipt.pickupNote}</p>
              <CounterStamp
                label="SETTLED IN POS"
                sublabel={activeStory.receipt.serial}
                stamped={true}
              />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
