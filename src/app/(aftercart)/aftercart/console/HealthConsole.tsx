"use client";

import { useMemo, useState } from "react";
import { getHealthSnapshot, INITIAL_HEALTH, selectTrack, TRACKS, type TrackId } from "./health";

const signalNames = ["Journey", "Shelf", "Load", "Return"];

export function HealthConsole() {
  const [state, setState] = useState(INITIAL_HEALTH);
  const snapshot = getHealthSnapshot(state);
  const signalValues = useMemo(
    () => TRACKS.map((track, index) => Math.min(98, track.score + (track.id === state.active ? 7 : index === 2 ? 3 : 0))),
    [state.active],
  );

  return (
    <div className="ac-health-grid">
      <div className="ac-track-list" aria-label="Care tracks">
        {TRACKS.map((track, index) => (
          <button
            className="ac-console-track"
            key={track.id}
            type="button"
            data-active={track.id === state.active}
            aria-pressed={track.id === state.active}
            onClick={() => setState((current) => selectTrack(current, track.id as TrackId))}
            style={{ "--ac-index": index } as React.CSSProperties}
          >
            <span className="ac-track-index">0{index + 1}</span>
            <span className="ac-track-copy"><strong>{track.label}</strong><span>{track.detail}</span></span>
            <span className="ac-track-score">{track.score}</span>
          </button>
        ))}
        <p className="ac-health-note">Select a care track to rebalance the readout.</p>
      </div>
      <div className="ac-health-console" aria-live="polite">
        <div className="ac-console-top">
          <div><strong>Store health</strong><small>Signal check / {snapshot.signal}</small></div>
          <span className="ac-console-case">Active / {snapshot.active}</span>
        </div>
        <div className="ac-console-main">
          <div className="ac-ring" style={{ "--ac-score": snapshot.score } as React.CSSProperties}>
            <div className="ac-ring-copy"><strong>{snapshot.score}</strong><span>care score</span></div>
          </div>
          <div className="ac-console-readout">
            <h2>{snapshot.label}.</h2>
            <p>{snapshot.detail}</p>
          </div>
        </div>
        <div className="ac-console-foot">
          <div className="ac-signal-row" aria-label="Live signal levels">
            {signalValues.map((value, index) => (
              <span className="ac-signal" key={signalNames[index]}>
                <span>{signalNames[index]}</span><i style={{ "--ac-level": `${value / 100}` } as React.CSSProperties} /><b>{value}</b>
              </span>
            ))}
          </div>
          <p className="ac-console-timestamp">Next check<strong>Today / 14:20</strong></p>
        </div>
        <p className="ac-console-ticket"><span>Work log / 026</span>{snapshot.ticket}</p>
      </div>
    </div>
  );
}
