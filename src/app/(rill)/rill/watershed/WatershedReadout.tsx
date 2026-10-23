"use client";

import { waterBudget, watershedPhase } from "./water";

const phaseCopy = {
  ridge: { title: "Read the ridge.", body: "Start above the contour. The first job is to notice where a storm wants to run." },
  swale: { title: "Find the swale.", body: "The line slows the water without turning the field into a channel." },
  storage: { title: "Give it somewhere to stay.", body: "At the middle of the storm, storage is a field decision you can see." },
  "root-zone": { title: "Let roots keep it.", body: "The long way ends below the surface, where water becomes another growing day." },
} as const;

export function WatershedReadout({ rain }: { rain: number }) {
  const phase = watershedPhase(rain / 80);
  const budget = waterBudget(rain);
  const copy = phaseCopy[phase];
  return (
    <div className="rl-land__copy">
      <span className="rl-land__phase"><span aria-live="polite">{phase.replace("-", " ")}</span></span>
      <h2>{copy.title}</h2>
      <p>{copy.body}</p>
      <p className="rl-mono" style={{ marginTop: 18, color: "var(--color-riverstone)" }}>
        {budget.status === "ready" ? "ROOT ZONE / READY" : budget.status === "holding" ? "FIELD / HOLDING" : "FIELD / WAITING"}
      </p>
    </div>
  );
}

