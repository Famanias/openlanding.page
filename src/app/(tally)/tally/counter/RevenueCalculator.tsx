"use client";

import React, { useState } from "react";
import { PLANS } from "../content/data";
import { calculateLedgerRecovery, type PlanId } from "./ticket";

export function RevenueCalculator() {
  const [weeklyBookings, setWeeklyBookings] = useState<number>(28);
  const [avgTicketPrice, setAvgTicketPrice] = useState<number>(85);
  const [depositPct, setDepositPct] = useState<number>(50);

  const recovery = calculateLedgerRecovery(
    weeklyBookings,
    avgTicketPrice,
    depositPct
  );

  const handleSelectPlan = (planId: PlanId) => {
    window.dispatchEvent(
      new CustomEvent("tally:select-config", {
        detail: {
          plan: planId,
          depositPct,
        },
      })
    );
  };

  return (
    <div className="tl-revenue-wrap">
      {/* Interactive Ledger Calculator */}
      <div className="tl-calc-board">
        <div className="tl-calc-sliders">
          <div className="tl-calc-head">
            <span className="tl-mono tl-kicker-tag">NO-SHOW & DEPOSIT LEDGER</span>
            <h3 className="tl-calc-title">
              See what upfront deposits recover for your bench each month.
            </h3>
          </div>

          <div className="tl-slider-field">
            <div className="tl-slider-label-row">
              <label htmlFor="tl-weekly-bookings">Weekly service bookings or repairs</label>
              <output htmlFor="tl-weekly-bookings" className="tl-mono tl-slider-readout">
                {weeklyBookings} tickets / wk
              </output>
            </div>
            <input
              id="tl-weekly-bookings"
              type="range"
              min={4}
              max={120}
              step={2}
              value={weeklyBookings}
              onChange={(e) => setWeeklyBookings(Number(e.target.value))}
              className="tl-range-input"
            />
            <div className="tl-slider-scale tl-mono">
              <span>4 / wk (Solo studio)</span>
              <span>60 / wk (Busy shop)</span>
              <span>120 / wk (Multi-bay)</span>
            </div>
          </div>

          <div className="tl-slider-field">
            <div className="tl-slider-label-row">
              <label htmlFor="tl-avg-ticket">Average service ticket value</label>
              <output htmlFor="tl-avg-ticket" className="tl-mono tl-slider-readout">
                ${avgTicketPrice} / ticket
              </output>
            </div>
            <input
              id="tl-avg-ticket"
              type="range"
              min={25}
              max={300}
              step={5}
              value={avgTicketPrice}
              onChange={(e) => setAvgTicketPrice(Number(e.target.value))}
              className="tl-range-input"
            />
            <div className="tl-slider-scale tl-mono">
              <span>$25 (Hem / trim)</span>
              <span>$120 (Tune-up)</span>
              <span>$300 (Overhaul)</span>
            </div>
          </div>

          <div className="tl-slider-field">
            <div className="tl-slider-label-row">
              <label htmlFor="tl-calc-deposit">Checkout deposit collected upfront</label>
              <output htmlFor="tl-calc-deposit" className="tl-mono tl-slider-readout">
                {depositPct}% at checkout
              </output>
            </div>
            <input
              id="tl-calc-deposit"
              type="range"
              min={25}
              max={100}
              step={25}
              value={depositPct}
              onChange={(e) => setDepositPct(Number(e.target.value))}
              className="tl-range-input"
            />
            <div className="tl-slider-scale tl-mono">
              <span>25% hold</span>
              <span>50% standard</span>
              <span>75%</span>
              <span>100% prepay</span>
            </div>
          </div>
        </div>

        {/* Right Receipt Output */}
        <div className="tl-calc-receipt" aria-live="polite">
          <div className="tl-mono tl-calc-receipt-top">
            <span>MONTHLY BENCH PROJECTION</span>
            <span>{recovery.monthlyBookings} TICKETS / MO</span>
          </div>

          <div className="tl-calc-big-metric">
            <span className="tl-mono tl-calc-big-label">
              RECOVERED NO-SHOW BENCH REVENUE
            </span>
            <strong className="tl-calc-big-value">
              +${recovery.recoveredMonthlyRevenue.toLocaleString()}
              <span className="tl-calc-per-mo"> / mo</span>
            </strong>
            <p className="tl-calc-big-note">
              Protected by {depositPct}% upfront Shopify Checkout deposits and automated 24-hr SMS reminders.
            </p>
          </div>

          <dl className="tl-calc-breakdown">
            <div className="tl-calc-row">
              <dt>Monthly Service Gross Volume</dt>
              <dd className="tl-mono">${recovery.monthlyVolume.toLocaleString()}</dd>
            </div>
            <div className="tl-calc-row">
              <dt>Upfront Cashflow Collected at Booking</dt>
              <dd className="tl-mono">${recovery.depositFloatCollected.toLocaleString()}</dd>
            </div>
            <div className="tl-calc-row">
              <dt>Tally Per-Ticket Commission</dt>
              <dd className="tl-mono">$0 (Flat monthly ledger)</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Three Flat-Rate Merchant Plans */}
      <div className="tl-plans-grid">
        {PLANS.map((plan) => {
          const isRecommended = recovery.recommendedPlan === plan.id;
          return (
            <article
              key={plan.id}
              className="tl-plan-card"
              data-tone={plan.pastel}
              data-recommended={isRecommended ? "true" : "false"}
            >
              <div className="tl-plan-top">
                <span className="tl-mono tl-plan-badge">
                  {isRecommended ? `★ RECOMMENDED · ${plan.badge}` : plan.badge}
                </span>
                <h3 className="tl-plan-name">{plan.name}</h3>
                <div className="tl-plan-price-row">
                  <span className="tl-plan-price">${plan.price}</span>
                  <span className="tl-mono tl-plan-cadence">{plan.cadence}</span>
                </div>
                <p className="tl-plan-ideal">{plan.idealFor}</p>
              </div>

              <div className="tl-mono tl-plan-allowance">{plan.includedTickets}</div>

              <ul className="tl-plan-features">
                {plan.features.map((feat) => (
                  <li key={feat} className="tl-plan-feature-item">
                    <span className="tl-plan-check" aria-hidden="true">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`#open-counter`}
                className="tl-btn tl-btn-primary tl-plan-cta"
                data-plan={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
              >
                <span>Start with {plan.name}</span>
                <span aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}
