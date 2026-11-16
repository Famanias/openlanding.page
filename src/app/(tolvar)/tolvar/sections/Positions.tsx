"use client";
import { useState } from "react";
import { pad2 } from "../work/services";
import { POSITIONS } from "./content";

/** One-at-a-time accordion of open positions. Height animates through grid-template-rows, never `height`. */
export function Positions() {
  const [open, setOpen] = useState<string | null>(POSITIONS[0].id);
  return (
    <ul className="tv-acc" data-tv-positions>
      {POSITIONS.map((position, index) => {
        const isOpen = open === position.id;
        return (
          <li key={position.id} className="tv-acc-item" data-open={isOpen}>
            <h3 className="tv-acc-head">
              <button
                type="button"
                className="tv-acc-toggle"
                aria-expanded={isOpen}
                aria-controls={`tv-acc-${position.id}`}
                id={`tv-acc-btn-${position.id}`}
                onClick={() => setOpen(isOpen ? null : position.id)}
              >
                <span className="tv-acc-no tv-gauge">{pad2(index + 1)}</span>
                <span className="tv-acc-title">{position.title}</span>
                <span className="tv-acc-summary">{position.summary}</span>
                <span className="tv-acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div className="tv-acc-panel" id={`tv-acc-${position.id}`} role="region" aria-labelledby={`tv-acc-btn-${position.id}`} inert={!isOpen}>
              <div className="tv-acc-inner">
                <ul className="tv-acc-needs">
                  {position.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
