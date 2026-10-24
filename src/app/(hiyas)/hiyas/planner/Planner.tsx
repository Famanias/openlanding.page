"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { campStops, PEAKS, plannerSummary, routeSegment, SUPPORT_LABELS } from "./logic";
import { MOUNTAIN_PROFILES } from "./mountain-profiles";
import { MountainSilhouette } from "./MountainSilhouette";
import { usePlanner } from "./PlannerProvider";

export function Planner() {
  const { state, dispatch } = usePlanner();
  const peak = PEAKS.find((item) => item.id === state.peakId) ?? PEAKS[0];
  const profile = MOUNTAIN_PROFILES[peak.id] ?? MOUNTAIN_PROFILES.everest;
  const stops = useMemo(
    () => campStops(peak.elevation, state.days, state.support),
    [peak.elevation, state.days, state.support]
  );
  const selected = plannerSummary(state);

  return (
    <section className="hy-section hy-planner" id="planner" aria-labelledby="hy-planner-title">
      <div className="hy-container">
        <div className="hy-section-head hy-section-head--split">
          <div>
            <h2 id="hy-planner-title">Make the plan visible.</h2>
          </div>
          <p>Choose a peak, set the rhythm, and see how the support plan changes around the route.</p>
        </div>

        <div className="hy-planner__layout">
          <div className="hy-planner__peaks" aria-label="Select a peak">
            {PEAKS.map((item, index) => (
              <button
                key={item.id}
                className="hy-planner__peak"
                type="button"
                data-active={item.id === state.peakId ? "true" : "false"}
                onClick={() => dispatch({ type: "selectPeak", peakId: item.id })}
              >
                <span className="hy-planner__peak-index">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="hy-planner__peak-name">{item.name}</span>
                  <span className="hy-planner__peak-alt">{item.elevation.toLocaleString()} m</span>
                </span>
              </button>
            ))}
          </div>

          <div
            className="hy-planner__profile"
            style={{ "--hy-planner-progress": state.locked ? 1 : 0.8 } as CSSProperties}
          >
            <div className="hy-silhouette__meta">
              <div>
                <span className="hy-silhouette__meta-tag">{profile.region}</span>
                <h3 className="hy-silhouette__meta-title">
                  {profile.name} — {profile.routeLabel}
                </h3>
              </div>
              <div className="hy-silhouette__meta-status" data-locked={state.locked ? "true" : "false"}>
                <span className="hy-silhouette__status-dot" />
                <span>{state.locked ? "Plan locked" : "Route active"}</span>
              </div>
            </div>

            <MountainSilhouette
              peakId={peak.id}
              stops={stops}
              locked={state.locked}
              elevation={peak.elevation}
            />

            <div className="hy-planner__profile-footer">
              <span>{routeSegment(state.locked ? 1 : 0.76)}</span>
              <span>{peak.elevation.toLocaleString()} m</span>
            </div>
          </div>

          <div className="hy-planner__controls">
            <h3>{peak.name}</h3>

            <div className="hy-control">
              <label htmlFor="hy-days">Planning days</label>
              <input
                id="hy-days"
                type="range"
                min="14"
                max="70"
                step="1"
                value={state.days}
                onChange={(event) => dispatch({ type: "setDays", days: Number(event.target.value) })}
              />
              <div className="hy-range-readout">
                <span>14 days</span>
                <strong>{state.days} days</strong>
                <span>70 days</span>
              </div>
            </div>

            <div className="hy-control">
              <label htmlFor="hy-support">Support mode</label>
              <select
                id="hy-support"
                value={state.support}
                onChange={(event) =>
                  dispatch({ type: "setSupport", support: event.target.value as "route" | "guided" | "private" })
                }
              >
                {Object.entries(SUPPORT_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="hy-planner__summary">
              <span className="hy-mono">Route summary</span>
              <strong>{selected.elevation.toLocaleString()} m</strong>
              <p>
                {selected.days} planning days with {selected.supportLabel.toLowerCase()} support.
              </p>
            </div>

            <button
              className="hy-button hy-button--primary hy-planner__lock"
              type="button"
              onClick={() => dispatch({ type: "lockPlan" })}
            >
              <span>{state.locked ? "Plan locked" : "Lock this plan"}</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
