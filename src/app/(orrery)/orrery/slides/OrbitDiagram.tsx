"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export type OrbitStep = 0 | 1 | 2 | 3 | 4;
const FINAL: OrbitStep = 4;
const STEP_MS = 450;

const C = 300; // centre of the 600×600 viewBox
const INNER = 128;
const OUTER = 228;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

const INNER_AGENTS = [polar(INNER, -150), polar(INNER, 30)];
const OUTER_AGENTS = [polar(OUTER, -40), polar(OUTER, 95), polar(OUTER, 200)];
const HANDOFF = OUTER_AGENTS[0]; // the ultramarine agent receives the task

/** Advances the build every 450 ms while `active`, like a keynote build. Fully built at once under reduced motion. */
export function useOrbitBuild(active: boolean): OrbitStep {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<OrbitStep>(0);

  useEffect(() => {
    if (reduce) return;
    if (!active) {
      setStep(0);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s >= FINAL ? s : ((s + 1) as OrbitStep)));
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [active, reduce]);

  return reduce ? FINAL : step;
}

/** Pure SVG. Step 0: core · 1: inner orbit + 2 agents · 2: outer orbit + 3 agents · 3: links · 4: task pulse. */
export function OrbitDiagram({ step }: { step: OrbitStep }) {
  const reduce = useReducedMotion();
  const shown = step;
  const on = (n: OrbitStep) => (shown >= n ? "on" : "off");
  const pulsePath = `M ${C} ${C} L ${INNER_AGENTS[1].x} ${INNER_AGENTS[1].y} L ${HANDOFF.x} ${HANDOFF.y}`;

  return (
    <svg
      className="orr-orbit"
      viewBox="0 0 600 600"
      data-orbit-step={shown}
      role="img"
      aria-label="Diagram: a conductor at the centre, two research agents on an inner orbit, three builder agents on an outer orbit, linked by shared memory, with a task passing between them."
    >
      {/* Orbits */}
      <circle className="orr-orbit__ring" data-show={on(1)} cx={C} cy={C} r={INNER} pathLength={1} />
      <circle className="orr-orbit__ring orr-orbit__ring--outer" data-show={on(2)} cx={C} cy={C} r={OUTER} pathLength={1} />

      {/* Links: shared memory */}
      <g className="orr-orbit__links" data-show={on(3)}>
        {[...INNER_AGENTS, ...OUTER_AGENTS].map((p, i) => (
          <line key={i} x1={C} y1={C} x2={p.x} y2={p.y} pathLength={1} />
        ))}
        <line x1={INNER_AGENTS[1].x} y1={INNER_AGENTS[1].y} x2={HANDOFF.x} y2={HANDOFF.y} pathLength={1} />
      </g>

      {/* Inner orbit: researchers */}
      <g className="orr-orbit__spin orr-orbit__spin--inner">
        {INNER_AGENTS.map((p, i) => (
          <circle key={i} className="orr-orbit__agent" data-show={on(1)} cx={p.x} cy={p.y} r={11} />
        ))}
      </g>

      {/* Outer orbit: builders */}
      <g className="orr-orbit__spin orr-orbit__spin--outer">
        {OUTER_AGENTS.map((p, i) => (
          <circle
            key={i}
            className={i === 0 ? "orr-orbit__agent orr-orbit__agent--accent" : "orr-orbit__agent"}
            data-show={on(2)}
            cx={p.x}
            cy={p.y}
            r={i === 0 ? 17 : 9}
          />
        ))}
      </g>

      {/* Conductor */}
      <circle className="orr-orbit__core" data-show="on" cx={C} cy={C} r={30} />

      {/* Task pulse */}
      <g className="orr-orbit__pulse" data-show={on(4)}>
        {reduce ? (
          <circle cx={INNER_AGENTS[1].x} cy={INNER_AGENTS[1].y} r={7} />
        ) : (
          <circle r={7}>
            <animateMotion dur="2.6s" repeatCount="indefinite" path={pulsePath} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
          </circle>
        )}
      </g>
    </svg>
  );
}

export const ORBIT_LEGEND = [
  { step: 0, name: "The conductor", text: "Reads the brief, splits the work and keeps time." },
  { step: 1, name: "Researchers", text: "Close orbit. They gather context and check facts." },
  { step: 2, name: "Builders", text: "Wide orbit. They write, code and produce." },
  { step: 3, name: "Shared memory", text: "Every agent reads from and writes to one record." },
  { step: 4, name: "The hand-off", text: "Work moves between agents, never dropped, always logged." },
] as const;
