'use client';

import { useState } from "react";
import { classes, type ClassId } from "../study/model";
import { SectionIntro } from "../motion/SectionIntro";

export function Ledger({ selectedClass, onSelect }: { selectedClass: ClassId; onSelect: (id: ClassId) => void }) {
  const [expanded, setExpanded] = useState<ClassId | null>(null);
  return (
    <section className="kf-section kf-programs" id="programs" tabIndex={-1}>
      <div className="kf-section-heading"><span>03 / THE PROGRAM</span><span>A LITTLE SOMETHING FOR EVERY BODY</span></div>
      <div className="kf-ledger-heading"><SectionIntro eyebrow="FIND YOUR KIND OF MOVEMENT" title={<>Make a date<br /><em>with yourself.</em></>} description="A thoughtful mix of movement and stillness. Find the kind of practice that meets you where you are." /></div>
      <div className="kf-schedule">
        <div className="kf-schedule-top"><div><span className="kf-small-label">KINFIELD / THE WEEKLY STUDY</span><h3>The program<span> / 01—04</span></h3></div><p>AN ILLUSTRATIVE TIMETABLE<br />DEMO ONLY — NO RESERVATION IS MADE.</p></div>
        <div className="kf-schedule-columns" aria-hidden="true"><span>DAY / TIME</span><span>THE PRACTICE</span><span>INTENSITY</span><span>MORE</span></div>
        <div className="kf-schedule-list">{classes.map((item, index) => {
          const open = expanded === item.id;
          return <div className="kf-schedule-item" key={item.id} data-selected={selectedClass === item.id}>
            <button className="kf-schedule-row" onClick={() => { setExpanded(open ? null : item.id); onSelect(item.id); }} aria-expanded={open} aria-controls={"kf-class-" + item.id}>
              <span className="kf-class-time"><b>{item.day}</b><small>{item.time}</small></span>
              <span className="kf-class-name">{item.name}<small>0{index + 1} / {item.focus}</small></span>
              <span className="kf-class-intensity">{item.intensity}</span><span className="kf-class-plus">{open ? "−" : "+"}</span>
              <span className="kf-hinge" aria-hidden="true">{item.duration} / {item.focus}</span>
            </button>
            <div className="kf-class-detail" id={"kf-class-" + item.id} hidden={!open}><span>{item.duration} · {item.focus} · {item.intensity}</span><span>Illustrative availability</span><a href="#session" onClick={() => onSelect(item.id)}>Preview session ↗</a></div>
          </div>;
        })}</div>
        <div className="kf-schedule-footer"><p>All classes and times are fictional examples.</p><a className="kf-button kf-button-dark" href="#session">Preview a session <span>↗</span></a></div>
      </div>
    </section>
  );
}
