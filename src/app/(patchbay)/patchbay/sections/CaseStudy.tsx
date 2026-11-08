"use client";

import { Picture } from "../assets";
import { useRole } from "../bay/RoleProvider";
import { getProject } from "../content/projects";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";

export function CaseStudy() {
  const { role, data } = useRole();
  const { caseStudy } = data;
  const project = getProject(caseStudy.projectId);

  return (
    <section id="case" className="pby-case" aria-labelledby="pby-case-title">
      <div key={role} className="pby-case-inner pby-shell">
        <Reveal as="header" className="pby-section-head">
          <p className="pby-eyebrow pby-mono">04 / Case study · {data.label}</p>
          <h2 id="pby-case-title" className="pby-h2">
            {project?.title ?? "Case study"}: {project?.proof}
          </h2>
        </Reveal>
        <div className="pby-case-grid">
          <Reveal variant="wipe" className="pby-case-media-wrap">
            <Picture assetKey={`case-${caseStudy.projectId}`} alt={`${project?.title ?? "Project"} case study visual`} className="pby-case-media" sizes="(min-width: 900px) 50vw, 100vw" />
          </Reveal>
          <div className="pby-case-copy">
            <Reveal as="div" index={1}>
              <h3 className="pby-mono pby-case-label">The problem</h3>
              <p className="pby-case-problem">{caseStudy.problem}</p>
            </Reveal>
            <Reveal as="div" index={2}>
              <h3 className="pby-mono pby-case-label">What I did</h3>
              <ul className="pby-case-list">
                {caseStudy.approach.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <dl className="pby-case-results">
              {caseStudy.result.map((metric, index) => (
                <Reveal key={metric.label} as="div" variant="scale" index={index + 3} className="pby-case-result">
                  <dd>
                    <CountUp value={metric.value} suffix={metric.suffix} />
                  </dd>
                  <dt className="pby-mono">{metric.label}</dt>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
