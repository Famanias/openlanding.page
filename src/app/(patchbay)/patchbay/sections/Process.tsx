"use client";

import { useRole } from "../bay/RoleProvider";
import { Reveal } from "../motion/Reveal";

export function Process() {
  const { role, data } = useRole();

  return (
    <section id="process" className="pby-section pby-shell" aria-labelledby="pby-process-title">
      <Reveal as="header" className="pby-section-head">
        <p className="pby-eyebrow pby-mono">03 / How I work</p>
        <h2 id="pby-process-title" className="pby-h2">
          Four steps, the same every time.
        </h2>
      </Reveal>
      <ol key={role} className="pby-steps">
        {data.process.map((step, index) => (
          <li key={step.title} className="pby-step">
            <Reveal variant="draw" index={index} className="pby-step-rule" />
            <Reveal variant="slide-left" index={index} className="pby-step-num pby-mono">
              {String(index + 1).padStart(2, "0")}
            </Reveal>
            <Reveal as="h3" variant="rise" index={index + 1} className="pby-h3">
              {step.title}
            </Reveal>
            <Reveal as="p" variant="rise" index={index + 2} className="pby-step-body">
              {step.body}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
