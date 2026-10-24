"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { campStops, PEAKS, plannerSummary, routeSegment, SUPPORT_LABELS } from "./logic";
import { MOUNTAIN_PROFILES } from "./mountain-profiles";
import { MountainSilhouette } from "./MountainSilhouette";
import { MountainOverview } from "./MountainOverview";
import { usePlanner } from "./PlannerProvider";
import "./expedition-timing.css";

export function Planner() {
  const { state, dispatch } = usePlanner();
  const peak = PEAKS.find((item) => item.id === state.peakId) ?? PEAKS[0];
  const profile = MOUNTAIN_PROFILES[peak.id] ?? MOUNTAIN_PROFILES.everest;
  const selected = plannerSummary(state);
  const stops = useMemo(() => campStops(profile), [profile]);

  return (
    <section className="hy-section hy-planner" id="planner" aria-labelledby="hy-planner-title">
      <div className="hy-container">
        <div className="hy-section-head hy-section-head--split">
          <div>
            <h2 id="hy-planner-title">Make the plan visible.</h2>
          </div>
          <p>Choose a peak to see its estimated expedition length, summit push, and support plan.</p>
        </div>

        <div className="hy-planner__layout">
          <div className="hy-planner__peaks" aria-label="Select a peak">
            <button
              className="hy-planner__peak"
              type="button"
              data-active={state.overview ? "true" : "false"}
              aria-pressed={state.overview}
              onClick={() => dispatch({ type: "setOverview", overview: true })}
            >
              <span className="hy-planner__peak-index">00</span>
              <span>
                <span className="hy-planner__peak-name">All mountains</span>
                <span className="hy-planner__peak-alt">The fourteen</span>
              </span>
            </button>
            {PEAKS.map((item, index) => (
              <button
                key={item.id}
                className="hy-planner__peak"
                type="button"
                data-active={!state.overview && item.id === state.peakId ? "true" : "false"}
                aria-pressed={!state.overview && item.id === state.peakId}
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
                <span className="hy-silhouette__meta-tag">{state.overview ? "Himalaya / Karakoram" : profile.region}</span>
                <h3 className="hy-silhouette__meta-title">
                  {state.overview ? "The fourteen — all mountains" : `${profile.name} — ${profile.routeLabel}`}
                </h3>
              </div>
              <div className="hy-silhouette__meta-status" data-locked={!state.overview && state.locked ? "true" : "false"}>
                <span className="hy-silhouette__status-dot" />
                <span>{state.overview ? "Overview" : state.locked ? "Plan locked" : "Route active"}</span>
              </div>
            </div>

            {state.overview ? (
              <MountainOverview onSelectPeak={(peakId) => dispatch({ type: "selectPeak", peakId })} />
            ) : (
              <MountainSilhouette
                peakId={peak.id}
                stops={stops}
                locked={state.locked}
                elevation={peak.elevation}
              />
            )}

            <div className="hy-planner__profile-footer">
              <span>{state.overview ? "14 mountains" : routeSegment(state.locked ? 1 : 0.76)}</span>
              <span>{state.overview ? "8,027–8,849 m" : `${peak.elevation.toLocaleString()} m`}</span>
            </div>
          </div>

          <div className="hy-planner__controls">
            {state.overview ? (
              <>
                <h3>The fourteen</h3>
                <p className="hy-mountain-overview__intro">
                  Every face, its own shade. Select a mountain to explore its route and camps.
                </p>
                <div className="hy-planner__summary">
                  <span className="hy-mono">Current expedition</span>
                  <strong>{peak.name}</strong>
                  <p>{selected.expeditionDuration} with {selected.supportLabel.toLowerCase()} support.</p>
                </div>
                <button
                  className="hy-button hy-button--primary"
                  type="button"
                  onClick={() => dispatch({ type: "setOverview", overview: false })}
                >
                  <span>Return to {peak.name}</span>
                  <span aria-hidden="true">↗</span>
                </button>
              </>
            ) : (
              <>
                <h3>{peak.name}</h3>

                <div>
                  <dl className="hy-expedition-timing" aria-label={`${peak.name} expedition estimates`}>
                    <div>
                      <dt>Estimated expedition</dt>
                      <dd data-duration="expedition">{selected.expeditionDuration}</dd>
                    </div>
                    <div className="hy-expedition-timing__summit">
                      <dt>Summit push</dt>
                      <dd data-duration="summit-push">{selected.summitPushDuration}</dd>
                    </div>
                  </dl>
                  <p className="hy-expedition-timing__note">
                    Includes approach, acclimatization and return. The summit push is part of this total.
                  </p>
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
                    {selected.expeditionDuration} with {selected.supportLabel.toLowerCase()} support.
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
