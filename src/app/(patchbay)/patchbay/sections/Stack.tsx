"use client";

import { useRole } from "../bay/RoleProvider";
import { Reveal } from "../motion/Reveal";

const COLUMNS = [
  { key: "inputs", title: "Signal in" },
  { key: "core", title: "Patched through" },
  { key: "outputs", title: "Signal out" },
] as const;

export function Stack() {
  const { role, data } = useRole();

  return (
    <section id="stack" className="pby-section pby-shell" aria-labelledby="pby-stack-title">
      <Reveal as="header" className="pby-section-head">
        <p className="pby-eyebrow pby-mono">02 / Signal flow</p>
        <h2 id="pby-stack-title" className="pby-h2">
          What goes in, what I patch it through, what ships.
        </h2>
      </Reveal>
      <div key={role} className="pby-flow">
        {COLUMNS.map((column, columnIndex) => (
          <div key={column.key} className="pby-flow-col" data-col={column.key}>
            <Reveal as="h3" variant="slide-left" index={columnIndex * 2} className="pby-flow-title pby-mono">
              {column.title}
            </Reveal>
            <ul className="pby-flow-list">
              {data.stack[column.key].map((item, itemIndex) => (
                <Reveal as="li" key={item} variant="rise" index={columnIndex * 2 + itemIndex + 1} className="pby-flow-item">
                  <span className="pby-flow-port" aria-hidden="true" />
                  {item}
                </Reveal>
              ))}
            </ul>
            {columnIndex < COLUMNS.length - 1 && (
              <span className="pby-flow-wire" aria-hidden="true">
                <Reveal variant="draw" index={columnIndex * 3} className="pby-flow-wire-line" />
                <i className="pby-flow-pulse" />
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
