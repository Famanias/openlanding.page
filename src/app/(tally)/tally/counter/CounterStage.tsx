"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArchetypeIllustration } from "../brand/Illustrations";
import { CounterStamp, ScissorsIcon } from "../brand/Logo";
import { ARCHETYPES, TICKET_STOPS } from "../content/data";
import { isMotionLive } from "../motion/mode";
import {
  activeStopIndex,
  type ArchetypeId,
  calculateTicketBreakdown,
  formatTicketSerial,
  isStubDetached,
  runwayProgress,
} from "./ticket";

const DEPOSIT_OPTIONS = [25, 50, 100] as const;

export function CounterStage() {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const railFillRef = useRef<HTMLDivElement | null>(null);

  const [archetypeId, setArchetypeId] = useState<ArchetypeId>("tailor");
  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [depositPct, setDepositPct] = useState<number>(50);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(["darn"]);
  const [stopIdx, setStopIdx] = useState<number>(0);
  const [manualDetached, setManualDetached] = useState<boolean>(false);
  const [manualStopOverride, setManualStopOverride] = useState<boolean>(false);

  const currentArchetype =
    ARCHETYPES.find((a) => a.id === archetypeId) ?? ARCHETYPES[0];

  // Listen for hero archetype switches
  useEffect(() => {
    const onSelectArchetype = (e: Event) => {
      const detail = (e as CustomEvent<{ archetype?: ArchetypeId }>).detail;
      if (detail?.archetype) {
        const nextArch = ARCHETYPES.find((a) => a.id === detail.archetype);
        if (nextArch) {
          setArchetypeId(nextArch.id);
          setSlotIndex(0);
          setSelectedAddOns(nextArch.addOns[0] ? [nextArch.addOns[0].id] : []);
        }
      }
    };
    window.addEventListener("tally:archetype", onSelectArchetype);
    return () => window.removeEventListener("tally:archetype", onSelectArchetype);
  }, []);

  // Scroll-scrubbed runway driver (desktop fine pointer + motion live)
  useEffect(() => {
    const runwayEl = runwayRef.current;
    if (!runwayEl) return;

    let sectionTop = 0;
    let sectionHeight = 1;
    let vh = window.innerHeight;
    let rafId = 0;

    const measure = () => {
      const rect = runwayEl.getBoundingClientRect();
      sectionTop = rect.top + window.scrollY;
      sectionHeight = runwayEl.offsetHeight;
      vh = window.innerHeight;
    };

    const updateFromScroll = () => {
      rafId = 0;
      if (!isMotionLive()) return;
      const p = runwayProgress(window.scrollY, sectionTop, sectionHeight, vh);
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }
      if (!manualStopOverride) {
        const nextStop = activeStopIndex(p, 4);
        setStopIdx((prev) => (prev === nextStop ? prev : nextStop));
        const shouldDetach = isStubDetached(p, false);
        setManualDetached((prev) => (prev === shouldDetach ? prev : shouldDetach));
      }
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateFromScroll);
      }
    };

    measure();
    updateFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [manualStopOverride]);

  const handleArchetypeChange = (id: ArchetypeId) => {
    const nextArch = ARCHETYPES.find((a) => a.id === id) ?? ARCHETYPES[0];
    setArchetypeId(id);
    setSlotIndex(0);
    setSelectedAddOns(nextArch.addOns[0] ? [nextArch.addOns[0].id] : []);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleStopSelect = (idx: number) => {
    setManualStopOverride(true);
    setStopIdx(idx);
    setManualDetached(idx === 3);
    if (railFillRef.current) {
      railFillRef.current.style.transform = `scaleX(${((idx + 1) / 4).toFixed(2)})`;
    }
  };

  const handleToggleTear = () => {
    setManualStopOverride(true);
    const next = !manualDetached;
    setManualDetached(next);
    if (next) {
      setStopIdx(3);
      if (railFillRef.current) {
        railFillRef.current.style.transform = "scaleX(1)";
      }
    }
  };

  const handleCarryToForm = () => {
    window.dispatchEvent(
      new CustomEvent("tally:select-config", {
        detail: {
          archetype: currentArchetype.id,
          depositPct,
        },
      })
    );
  };

  const addOnTotal = currentArchetype.addOns
    .filter((item) => selectedAddOns.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const breakdown = calculateTicketBreakdown(
    currentArchetype.basePrice,
    depositPct,
    addOnTotal
  );
  const serial = formatTicketSerial(currentArchetype.id, slotIndex, depositPct);
  const currentStop = TICKET_STOPS[stopIdx] ?? TICKET_STOPS[0];
  const isTorn = manualDetached || stopIdx === 3;

  return (
    <div
      ref={runwayRef}
      className="tl-runway"
      data-stop={currentStop.step}
      data-detached={isTorn ? "true" : "false"}
    >
      <div className="tl-runway-sticky">
        <div className="tl-container">
          {/* Top Controls: Archetype Switcher + Stop Stepper */}
          <div className="tl-stage-toolbar">
            <div
              className="tl-archetype-tabs"
              role="tablist"
              aria-label="Small Shopify business service archetypes"
            >
              {ARCHETYPES.map((arch) => {
                const active = arch.id === currentArchetype.id;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className="tl-arch-tab"
                    data-active={active ? "true" : "false"}
                    data-tone={arch.pastelTone}
                    onClick={() => handleArchetypeChange(arch.id)}
                  >
                    <span className="tl-mono tl-arch-sku">{arch.sku}</span>
                    <span className="tl-arch-name">{arch.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="tl-stop-stepper" role="group" aria-label="Service ticket lifecycle stages">
              {TICKET_STOPS.map((stop, idx) => {
                const state =
                  idx < stopIdx ? "past" : idx === stopIdx ? "active" : "future";
                return (
                  <button
                    key={stop.step}
                    type="button"
                    className="tl-stop-pill"
                    data-state={state}
                    aria-pressed={idx === stopIdx}
                    onClick={() => handleStopSelect(idx)}
                  >
                    <span className="tl-mono tl-stop-num">{stop.step}</span>
                    <span className="tl-stop-label">{stop.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll Progress Rail */}
          <div className="tl-rail-wrap" aria-hidden="true">
            <div
              ref={railFillRef}
              className="tl-rail-fill"
              style={{ transform: `scaleX(${((stopIdx + 1) / 4).toFixed(2)})` }}
            />
          </div>

          {/* Live screen-reader status announcement */}
          <div className="tl-sr-only" aria-live="polite">
            {`Ticket ${serial} for ${currentArchetype.shopExample}: Stage ${currentStop.step} ${currentStop.title}. Deposit due now $${breakdown.depositDueNow}, balance at pickup $${breakdown.balanceAtPickup}.`}
          </div>

          {/* Main Workbench Grid: Left Configuration & Bench Feed + Right Two-Part Perforated Ticket */}
          <div className="tl-stage-grid">
            {/* Left Column: Active Bench Stage & Interactive Controls */}
            <div className="tl-bench-panel">
              <div className="tl-bench-header">
                <span className="tl-mono tl-badge-pill" data-tone={currentArchetype.pastelTone}>
                  STOP {currentStop.step} / 04 · {currentStop.tag}
                </span>
              </div>

              <h3 className="tl-bench-title">{currentStop.title}</h3>
              <p className="tl-bench-summary">{currentStop.summary}</p>

              <div className="tl-live-note-card" data-tone={currentArchetype.pastelTone}>
                <div className="tl-mono tl-live-note-kicker">
                  BENCH LOG · {currentArchetype.shopExample.toUpperCase()}
                </div>
                <p className="tl-live-note-copy">{currentArchetype.stopNotes[stopIdx]}</p>
              </div>

              {/* Interactive Configuration Controls */}
              <div className="tl-config-controls">
                <div className="tl-config-group">
                  <span className="tl-mono tl-config-label">SELECT SLOT</span>
                  <div className="tl-slot-grid" role="group" aria-label="Select booking slot">
                    {currentArchetype.slots.map((slot, idx) => (
                      <button
                        key={slot}
                        type="button"
                        className="tl-slot-chip"
                        data-selected={slotIndex === idx ? "true" : "false"}
                        aria-pressed={slotIndex === idx}
                        onClick={() => setSlotIndex(idx)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="tl-config-row">
                  <div className="tl-config-group">
                    <span className="tl-mono tl-config-label">DEPOSIT SPLIT</span>
                    <div className="tl-deposit-pills" role="group" aria-label="Checkout deposit percentage">
                      {DEPOSIT_OPTIONS.map((pct) => (
                        <button
                          key={pct}
                          type="button"
                          className="tl-deposit-btn"
                          data-selected={depositPct === pct ? "true" : "false"}
                          aria-pressed={depositPct === pct}
                          onClick={() => setDepositPct(pct)}
                        >
                          {pct === 100 ? "100% Prepay" : `${pct}% Deposit`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="tl-config-group">
                    <span className="tl-mono tl-config-label">ADD-ONS</span>
                    <div className="tl-addon-list">
                      {currentArchetype.addOns.map((addon) => {
                        const checked = selectedAddOns.includes(addon.id);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            className="tl-addon-toggle"
                            data-checked={checked ? "true" : "false"}
                            aria-pressed={checked}
                            onClick={() => toggleAddOn(addon.id)}
                          >
                            <span className="tl-addon-box" aria-hidden="true">
                              {checked ? "✓" : "+"}
                            </span>
                            <span className="tl-addon-text">{addon.label}</span>
                            <span className="tl-mono tl-addon-price">+${addon.price}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Perforated Two-Part Service Ticket */}
            <div className="tl-ticket-stage">
              <div
                className="tl-perforated-ticket"
                data-detached={isTorn ? "true" : "false"}
                data-tone={currentArchetype.pastelTone}
              >
                {/* Part A: Merchant Bench Tag (Left) */}
                <div className="tl-ticket-bench-half">
                  <div className="tl-ticket-top-row">
                    <div>
                      <span className="tl-mono tl-ticket-kicker">
                        BENCH TAG
                      </span>
                      <h4 className="tl-ticket-shop">{currentArchetype.shopExample}</h4>
                    </div>
                    <span className="tl-mono tl-ticket-serial">{serial}</span>
                  </div>

                  <div className="tl-ticket-illustration-box">
                    <ArchetypeIllustration archetype={currentArchetype.id} />
                  </div>

                  <div className="tl-ticket-service-block">
                    <div className="tl-mono tl-ticket-sku-line">
                      <span>SKU: {currentArchetype.sku}</span>
                      <span>{currentArchetype.benchStation}</span>
                    </div>
                    <div className="tl-ticket-service-title">{currentArchetype.serviceTitle}</div>
                  </div>

                  <dl className="tl-ticket-ledger-rows">
                    <div className="tl-ledger-row">
                      <dt>Slot</dt>
                      <dd className="tl-mono">{currentArchetype.slots[slotIndex]}</dd>
                    </div>
                    <div className="tl-ledger-row">
                      <dt>Base rate</dt>
                      <dd className="tl-mono">${currentArchetype.basePrice}.00</dd>
                    </div>
                    {currentArchetype.addOns
                      .filter((a) => selectedAddOns.includes(a.id))
                      .map((addon) => (
                        <div key={addon.id} className="tl-ledger-row">
                          <dt>+ {addon.label}</dt>
                          <dd className="tl-mono">${addon.price}.00</dd>
                        </div>
                      ))}
                    <div className="tl-ledger-row tl-ledger-row-total">
                      <dt>Total value</dt>
                      <dd className="tl-mono">${breakdown.total}.00</dd>
                    </div>
                  </dl>

                  {/* Circular Counter Stamp (springs in when detached / Stop 04) */}
                  <CounterStamp
                    label={isTorn ? "READY · PICKUP" : "DEPOSIT LOCKED"}
                    sublabel={currentArchetype.shopExample.toUpperCase()}
                    stamped={isTorn}
                  />
                </div>

                {/* Perforation Seam with Scalloped Notches & Scissors Icon */}
                <div className="tl-perforation-seam" aria-hidden="true">
                  <span className="tl-notch tl-notch-top" />
                  <span className="tl-perf-line" />
                  <span className="tl-perf-scissors">
                    <ScissorsIcon />
                  </span>
                  <span className="tl-notch tl-notch-bottom" />
                </div>

                {/* Part B: Detachable Customer Claim Stub (Right) */}
                <div className="tl-ticket-customer-stub">
                  <div className="tl-stub-header">
                    <span className="tl-mono tl-stub-label">CLAIM STUB</span>
                    <span className="tl-mono tl-stub-state">
                      {isTorn ? "DETACHED · READY" : `STAGE ${currentStop.step}`}
                    </span>
                  </div>

                  <div className="tl-stub-Serial-big tl-mono">{serial}</div>
                  <p className="tl-stub-slot">{currentArchetype.slots[slotIndex]}</p>
                  <p className="tl-stub-turnaround">{currentArchetype.turnaround}</p>

                  <div className="tl-stub-financials">
                    <div className="tl-stub-pay-box">
                      <span className="tl-mono">DUE NOW ({depositPct}%)</span>
                      <strong className="tl-mono tl-stub-amount">
                        ${breakdown.depositDueNow}.00
                      </strong>
                    </div>
                    <div className="tl-stub-pay-box tl-stub-pay-balance">
                      <span className="tl-mono">AT PICKUP</span>
                      <strong className="tl-mono tl-stub-amount">
                        ${breakdown.balanceAtPickup}.00
                      </strong>
                    </div>
                  </div>

                  <div className="tl-stub-protection tl-mono">
                    ✓ {breakdown.noShowProtection} · SMS status link active
                  </div>

                  {/* Barcode bars in pure SVG */}
                  <svg
                    viewBox="0 0 180 32"
                    className="tl-stub-barcode"
                    aria-hidden="true"
                  >
                    {[6, 12, 16, 24, 30, 34, 42, 48, 56, 62, 66, 74, 82, 88, 96, 102, 110, 118, 124, 132, 138, 146, 154, 160, 168].map(
                      (x, i) => (
                        <rect
                          key={x}
                          x={x}
                          y="2"
                          width={i % 3 === 0 ? "4" : "2"}
                          height="28"
                          fill="#231F2B"
                        />
                      )
                    )}
                  </svg>
                </div>
              </div>

              {/* Ticket Action Bar under the ticket */}
              <div className="tl-ticket-actions">
                <button
                  type="button"
                  className="tl-btn tl-btn-secondary"
                  onClick={handleToggleTear}
                >
                  <ScissorsIcon />
                  <span>
                    {isTorn ? "Re-attach Claim Stub" : "Stamp & Tear Claim Stub"}
                  </span>
                </button>

                <a
                  href="#open-counter"
                  className="tl-btn tl-btn-primary"
                  onClick={handleCarryToForm}
                >
                  <span>Use This Counter Setup</span>
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
