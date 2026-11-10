'use client';

import { useEffect, useRef, useState } from "react";
import { classes, validatePreview, type ClassId } from "../study/model";
import { SectionIntro } from "../motion/SectionIntro";

function localDate() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

export function SessionPicker({ selectedClass, onSelect }: { selectedClass: ClassId; onSelect: (id: ClassId) => void }) {
  const [date, setDate] = useState("");
  const dateInput = useRef<HTMLInputElement>(null);
  const classInput = useRef<HTMLSelectElement>(null);
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ classId: ClassId; date: string } | null>(null);
  const selected = classes.find((item) => item.id === selectedClass) ?? classes[0];
  const confirmed = preview?.classId === selectedClass && preview.date === date;

  useEffect(() => {
    const enteredBeforeHydration = dateInput.current?.value;
    if (enteredBeforeHydration) setDate(enteredBeforeHydration);
    setToday(localDate());
  }, []);

  useEffect(() => {
    const selectedBeforeHydration = classes.find((item) => item.id === classInput.current?.value);
    if (selectedBeforeHydration && selectedBeforeHydration.id !== selectedClass) onSelect(selectedBeforeHydration.id);
  }, [onSelect, selectedClass]);

  return (
    <section className="kf-section kf-session-section" id="session" tabIndex={-1}>
      <div className="kf-section-heading"><span>05 / MAKE SOME SPACE</span><span>THIS ONE IS FOR YOU</span></div>
      <div className="kf-session-heading"><SectionIntro eyebrow="A MOMENT, JUST FOR YOU" title={<>Let&apos;s make<br /><em>some room.</em></>} description="See how a session could fit into your day. This is a preview, with no reservation or payment." /></div>
      <div className="kf-booking">
        <div className="kf-booking-form">
          <div className="kf-booking-top"><span>KINFIELD / SESSION SHEET</span><span>NO. 085</span></div>
          <h3>Your practice,<br /><em>your pace.</em></h3>
          <p>Choose a class and a date to make an illustrative preview.</p>
          <form noValidate onSubmit={(event) => {
            event.preventDefault();
            const problem = validatePreview(date, selectedClass, localDate());
            setError(problem);
            if (!problem) setPreview({ classId: selectedClass, date });
          }}>
            <label htmlFor="kf-class">01 / CHOOSE YOUR PRACTICE</label>
            <select ref={classInput} id="kf-class" value={selectedClass} onChange={(event) => { onSelect(event.target.value as ClassId); setPreview(null); }}>
              {classes.map((item) => <option value={item.id} key={item.id}>{item.name} — {item.duration}</option>)}
            </select>
            <label htmlFor="kf-date">02 / CHOOSE A DATE</label>
            <input ref={dateInput} id="kf-date" type="date" min={today || undefined} value={date} aria-describedby={error ? "kf-date-error" : "kf-date-hint"} aria-invalid={Boolean(error)} onChange={(event) => { setDate(event.target.value); setError(""); setPreview(null); }} />
            <p className="kf-input-hint" id="kf-date-hint">Any date today or later. This does not indicate availability.</p>
            {error && <p className="kf-error" id="kf-date-error" role="alert">{error}</p>}
            <button className="kf-button kf-button-dark" type="submit">Review your preview <span>↗</span></button>
          </form>
          <p className="kf-demo-note">DEMO ONLY — NO RESERVATION IS MADE.</p>
        </div>
        <div className="kf-booking-review" aria-live="polite">
          <div className="kf-review-top"><span>YOUR SESSION / PREVIEW</span><span>✳</span></div>
          {confirmed ? <div className="kf-confirmation"><span className="kf-stamp">PREVIEW<br />ONLY</span><p className="kf-small-label">A LITTLE SPACE FOR YOU</p><h3>Looks like<br /><em>your kind of time.</em></h3><p>Preview only — no reservation made.</p><button className="kf-text-link" onClick={() => setPreview(null)}>Adjust your selection ↗</button></div> : <div className="kf-review-body"><span className="kf-small-label">A MOMENT TO MOVE</span><h3>{selected.name}<br /><em>at your pace.</em></h3><p>Every practice is an invitation to meet yourself where you are.</p></div>}
          <div className="kf-review-details"><div><span>YOUR PRACTICE</span><strong>{selected.name}</strong></div><div><span>YOUR DATE</span><strong>{date || "Choose a date"}</strong></div><div><span>DURATION / FOCUS</span><strong>{selected.duration} / {selected.focus}</strong></div></div>
          <div className="kf-review-bottom"><span>THIS IS AN ILLUSTRATIVE DEMO</span><span>↗</span></div>
        </div>
      </div>
    </section>
  );
}
