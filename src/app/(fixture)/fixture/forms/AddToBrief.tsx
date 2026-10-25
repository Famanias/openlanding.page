"use client";

import { useEffect, useState } from "react";
import { NEEDS_CHANGED, sendNeed, type NeedsChangedDetail } from "./brief-events";

/** A toggle on a price tag: adds that stage's need to the walk-through brief. */
export function AddToBrief({ need, label }: { need: string; label: string }) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const onChange = (event: Event) => setOn((event as CustomEvent<NeedsChangedDetail>).detail.needs.includes(need));
    window.addEventListener(NEEDS_CHANGED, onChange);
    return () => window.removeEventListener(NEEDS_CHANGED, onChange);
  }, [need]);

  return (
    <button type="button" className="fx-add" aria-pressed={on} onClick={() => { sendNeed(need, !on); setOn(!on); }}>
      <span className="fx-add__roll">
        <span className="fx-add__label">Add to brief</span>
        <span className="fx-add__label fx-add__label--on" aria-hidden="true">Added ✓</span>
      </span>
      <span className="fx-sr"> {label}</span>
    </button>
  );
}
