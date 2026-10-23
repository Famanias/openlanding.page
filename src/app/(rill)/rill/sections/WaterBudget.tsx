"use client";

import type { CSSProperties } from "react";
import { Reveal } from "../motion/Reveal";
import { useWatershed } from "../watershed/provider";
import { waterBudget } from "../watershed/water";

export function WaterBudget() {
  const { rain } = useWatershed();
  const budget = waterBudget(rain);
  const meter = (value: number) => ({ "--rl-meter": value } as CSSProperties);
  return (
    <section className="rl-section rl-budget" id="budget" data-status={budget.status} aria-labelledby="rl-budget-title">
      <div className="rl-container rl-budget__grid">
        <div className="rl-budget__intro">
          <Reveal className="rl-eyebrow">02 / WATER BUDGET</Reveal>
          <h2 id="rl-budget-title">Keep the storm in the field.</h2>
          <p>RILL turns a rainfall event into three readable decisions: what leaves, what stays in storage, and what reaches the root zone.</p>
          <div className="rl-rule" data-reveal="line" />
          <p className="rl-mono">{budget.status === "ready" ? "42 mm / ready to grow" : budget.status === "holding" ? "18–41 mm / holding the line" : "0–17 mm / waiting for rain"}</p>
        </div>
        <div className="rl-budget__readout">
          <div className="rl-budget__readout-head"><span className="rl-budget__readout-title">Live field readout</span><span className="rl-mono">{budget.status}</span></div>
          <div className="rl-budget__readout-mm" aria-live="polite">{rain} <span className="rl-mono">mm</span></div>
          <div className="rl-budget__stats">
            <div className="rl-budget__stat"><span className="rl-budget__stat-label">Runoff</span><strong className="rl-budget__stat-value">{budget.runoff}%</strong><div className="rl-budget__meter"><span style={meter(budget.runoff)} /></div></div>
            <div className="rl-budget__stat"><span className="rl-budget__stat-label">Storage</span><strong className="rl-budget__stat-value">{budget.storage}%</strong><div className="rl-budget__meter"><span style={meter(budget.storage)} /></div></div>
            <div className="rl-budget__stat"><span className="rl-budget__stat-label">Root zone</span><strong className="rl-budget__stat-value">{budget.rootZone}%</strong><div className="rl-budget__meter"><span style={meter(budget.rootZone)} /></div></div>
          </div>
          <div className="rl-budget__note"><span>Runoff leaves the contour</span><span>Root zone keeps the future</span></div>
        </div>
      </div>
    </section>
  );
}

