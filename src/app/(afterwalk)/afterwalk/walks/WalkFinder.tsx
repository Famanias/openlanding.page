"use client";
import { useRef, useState, type FormEvent } from "react";
import { filterWalks, makeWalkCard, WALKS, type Walk, type WalkFilter } from "./walks";
import { Together } from "../sections/Together";

const FILTERS: { value: WalkFilter; label: string }[] = [
  { value: "all", label: "All walks" },
  { value: "short", label: "An hour or less" },
  { value: "evening", label: "After work" },
];

function RouteArt({ color }: { color: Walk["color"] }) {
  return <svg className={`aw-route-art aw-route-art-${color}`} viewBox="0 0 360 210" fill="none" aria-hidden="true">
    <path className="aw-map-block" d="M-20 45 100-10l50 66-83 50zM194-15l118 25 62 61-69 42-91-50zM-10 165l103-42 63 42-20 65H-10zM224 153l115-38 39 40v78H206z" />
    <path className="aw-map-street" d="M-5 121 369 28M70-10l121 236M-5 59l369 118M254-15 144 228" />
    <path className="aw-map-route" d={color === "green" ? "M46 157c38-9 42-42 77-42s42 30 79 5 46-57 96-48" : color === "peach" ? "M45 139c33-52 62-57 90-32 27 24 48 61 80 32 20-18 29-64 81-53" : "M51 145c32-5 43-43 79-33 37 10 39 33 76 13s51-65 102-52"} />
    <circle className="aw-map-point" cx="47" cy={color === "peach" ? "139" : color === "green" ? "157" : "145"} r="7"/><circle className="aw-map-point" cx={color === "yellow" ? "307" : color === "peach" ? "296" : "298"} cy={color === "yellow" ? "73" : color === "peach" ? "86" : "72"} r="7"/>
    <path className="aw-map-spark" d="M285 28v20m-10-10h20M80 61v14m-7-7h14" />
  </svg>;
}

export function WalkFinder() {
  const [filter, setFilter] = useState<WalkFilter>("all");
  const [selected, setSelected] = useState("river");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [card, setCard] = useState<ReturnType<typeof makeWalkCard>>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const visible = filterWalks(WALKS, filter);

  function choose(id: string) {
    setSelected(id);
    setCard(null);
    setError("");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("plan")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), reducedMotion ? 0 : 350);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = makeWalkCard(name, selected);
    if (!result) {
      setError("Add your name (up to 80 characters) and choose a walk.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    setCard(result);
  }

  return <>
    <section className="aw-walks aw-section" id="walks">
      <div className="aw-container">
        <div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">02 / FIND YOUR FEET</span><span>YOUR NEXT GOOD IDEA →</span></div>
        <div className="aw-walks-heading" data-reveal="rise"><div><h2>A walk for<br /><em>any kind of day.</em></h2><p>Whether you have an hour or an entire afternoon, there&apos;s a little outside with your name on it.</p></div><div className="aw-walks-scribble" aria-hidden="true">the best part<br />is showing up <span>↙</span></div></div>
        <div className="aw-filter-row"><div className="aw-filters aw-js-only" aria-label="Filter walks">
          {FILTERS.map((item) => <button key={item.value} type="button" className={filter === item.value ? "is-active" : ""} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div><span className="aw-filter-note" aria-live="polite">{visible.length} sample {visible.length === 1 ? "walk" : "walks"}</span></div>
        <div className="aw-walk-grid">
          {visible.map((walk) => <article className="aw-walk-card" key={walk.id}>
            <div className={`aw-walk-art aw-walk-art-${walk.color}`}><div className="aw-walk-art-top"><span>THE WALK FILES / {walk.number}</span><span>↗</span></div><RouteArt color={walk.color} /><div className="aw-map-label">A GOOD WAY TO GET THERE</div></div>
            <div className="aw-walk-body"><div className="aw-walk-meta"><span>{walk.when}</span><span>{walk.duration} MIN</span></div><h3>{walk.name}</h3><p>{walk.description}</p><div className="aw-walk-bottom"><span>{walk.distance} <i>·</i> {walk.terrain}</span><button className="aw-card-action aw-js-only" type="button" aria-label={`Choose ${walk.name}`} onClick={() => choose(walk.id)}>Choose <span aria-hidden="true">↗</span></button></div></div>
          </article>)}
        </div>
        <p className="aw-sample-note">These are sample walks for a fictional club. No actual meetups are scheduled.</p>
      </div>
    </section>
    <Together />
    <section className="aw-plan aw-section" id="plan">
      <div className="aw-container aw-plan-grid">
        <div className="aw-plan-intro" data-reveal="rise"><span className="aw-kicker">A LITTLE SOMETHING TO LOOK FORWARD TO</span><h2>Shall we<br /><em>take a walk?</em></h2><p>Pick a route and make yourself a little reminder. Your shoes can take it from there.</p><div className="aw-plan-doodle" aria-hidden="true">✳</div></div>
        <div className="aw-plan-form-wrap" data-reveal="rise">
          <div className="aw-ticket-top"><span>AFTERWALK / YOUR WALK CARD</span><span>NO. 001</span></div>
          {card ? <div className="aw-success" role="status"><span className="aw-success-mark" aria-hidden="true">✳</span><span className="aw-kicker">ALL SET FOR A LITTLE OUTSIDE</span><h3>See you out there, {card.name}.</h3><p>Your sample pick: <strong>{card.walk.name}</strong>. {card.walk.when} · {card.walk.distance}.</p><p className="aw-local-note">This card is a local preview. No meetup is booked and nothing was sent.</p><button className="aw-text-button" type="button" onClick={() => setCard(null)}>Make another card ↗</button></div> : <form className="aw-js-only" onSubmit={submit} noValidate>
            <h3>Make it a walk date.</h3><p className="aw-form-intro">A small reminder to take the long way.</p>
            <label htmlFor="aw-name">Your first name</label><input ref={nameRef} id="aw-name" name="name" value={name} maxLength={81} onChange={(event) => setName(event.target.value)} placeholder="e.g. Sam" aria-invalid={!!error} aria-describedby={error ? "aw-form-error" : undefined} />
            <label htmlFor="aw-walk">Your kind of walk</label><select id="aw-walk" value={selected} onChange={(event) => setSelected(event.target.value)}>{WALKS.map((walk) => <option key={walk.id} value={walk.id}>{walk.name} · {walk.duration} min</option>)}</select>
            {error && <p className="aw-form-error" id="aw-form-error" role="alert">{error}</p>}
            <button className="aw-button aw-button-dark aw-form-button" type="submit">Make my walk card <span aria-hidden="true">↗</span></button>
            <p className="aw-local-note">Just a demo: your card stays in this browser. No booking, no messages, no data sent.</p>
          </form>}
          <noscript><p className="aw-local-note">The walk card needs JavaScript. You can still read all the sample walks above.</p></noscript>
          <div className="aw-ticket-bottom"><span>FRESH AIR IS A GOOD IDEA.</span><span>✳</span></div>
        </div>
      </div>
    </section>
  </>;
}
