import type { ReactNode } from "react";
import { CAMPS, type CampId } from "../ascent/camps";

/** One camp of the ascent. `data-camp` drives the altitude stage; the eyebrow names the camp and its height. */
export function Chapter({ camp, className = "", children }: { camp: CampId; className?: string; children: ReactNode }) {
  const c = CAMPS.find((x) => x.id === camp)!;
  return (
    <section className={`crn-chapter ${className}`} id={c.id} data-camp={c.id} data-camp-name={c.name}>
      <p className="crn-label crn-chapter__alt">
        <span>{c.altitude.toLocaleString("en-US")} m</span>
        <span aria-hidden="true">·</span>
        <span>{c.name}</span>
      </p>
      {children}
    </section>
  );
}
