"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { getTerrain, validateInterest, type TerrainZone } from "./experienceLogic";

const terrainCopy: Record<TerrainZone, { label: string; note: string; path: string; tread: string; tireWidth: number }> = {
  city: {
    label: "City streets",
    note: "A smooth line through the everyday grid. The road and tire drawing are illustrative.",
    path: "M -20 330 H 820",
    tread: "4 13",
    tireWidth: 5,
  },
  mixed: {
    label: "Mixed route",
    note: "A few turns and a little more texture. Move the slider to explore the street plan.",
    path: "M -20 330 H 190 L 280 240 H 530 L 620 150 H 820",
    tread: "9 10",
    tireWidth: 9,
  },
  rough: {
    label: "Rougher ground",
    note: "An imagined route with a more irregular surface. This is not a performance test.",
    path: "M -20 338 L 115 338 L 170 300 L 222 314 L 280 240 L 390 240 L 438 211 L 485 226 L 544 174 L 610 185 L 670 139 H 820",
    tread: "15 7",
    tireWidth: 14,
  },
};

export function TerrainSimulation() {
  const [ready, setReady] = useState(false);
  const [value, setValue] = useState(12);
  useEffect(() => setReady(true), []);
  const { zone, progress } = getTerrain(value);
  const terrain = terrainCopy[zone];

  return (
    <div className={`rd-terrain rd-terrain--${zone}`}>
      <div className="rd-terrain__visual" aria-hidden="true" data-reveal="wipe">
        <div className="rd-terrain__map-label"><span>ROUTE STUDY / 04</span><span>STREET PLAN</span></div>
        <svg className="rd-terrain__map" viewBox="0 0 800 460" preserveAspectRatio="xMidYMid meet">
          <g className="rd-map-grid">
            <path d="M0 78H800 M0 160H800 M0 242H800 M0 324H800 M0 406H800 M100 0V460 M200 0V460 M300 0V460 M400 0V460 M500 0V460 M600 0V460 M700 0V460" />
            <path d="M-40 112 200 352 M68 -20 380 292 M326 -20 720 374 M560 -20 840 260" />
          </g>
          <g className="rd-map-blocks">
            <path d="M34 23h132v58H34z M231 26h110v94H231z M405 26h114v79H405z M570 24h191v75H570z" />
            <path d="M35 190h110v74H35z M351 142h115v70H351z M667 265h102v118H667z M220 366h140v61H220z" />
          </g>
          <path className="rd-map-route-edge" d={terrain.path} />
          <path className="rd-map-route" d={terrain.path} />
          <path className="rd-map-route-dash" d={terrain.path} />
          <circle className="rd-map-pin" cx="92" cy="330" r="18" />
          <circle className="rd-map-pin-center" cx="92" cy="330" r="5" />
          <path className="rd-map-arrow" d="m699 129 28 10-21 22" />
          <g className="rd-map-progress">
            <path d="M48 421H752" />
            <path d={`M48 421H${48 + progress * 7.04}`} />
            <circle cx={48 + progress * 7.04} cy="421" r="7" />
          </g>
        </svg>
        <div className="rd-terrain__map-foot"><span>START / HERE</span><span>THE LONG WAY ↗</span></div>
      </div>

      <div className="rd-terrain__control" data-reveal="rise">
        <div className="rd-terrain__control-top"><span>01 / SURFACE STUDY</span><span>↗</span></div>
        <svg className="rd-tire-diagram" viewBox="0 0 230 230" aria-hidden="true">
          <circle className="rd-tire-diagram__outer" cx="115" cy="115" r="88" strokeWidth={terrain.tireWidth} strokeDasharray={terrain.tread} />
          <circle cx="115" cy="115" r="73" />
          <circle cx="115" cy="115" r="56" />
          <path d="M115 17v196M17 115h196M45 45l140 140M185 45 45 185" />
          <circle className="rd-tire-diagram__hub" cx="115" cy="115" r="16" />
          <path className="rd-tire-diagram__arrow" d="m161 38 19 2-4 19" />
        </svg>
        <div className="rd-terrain__readout" aria-live="polite" aria-atomic="true">
          <span className="rd-exp-label">CURRENT TERRAIN</span>
          <strong>{terrain.label}</strong>
          <p>{terrain.note}</p>
        </div>
        <label className="rd-terrain__label" htmlFor="rd-terrain-slider">Change the terrain <span>← →</span></label>
        <input
          id="rd-terrain-slider"
          className="rd-terrain__range"
          type="range"
          disabled={!ready}
          min="0"
          max="100"
          value={progress}
          aria-valuetext={terrain.label}
          aria-describedby="rd-terrain-help"
          onChange={(event) => setValue(Number(event.currentTarget.value))}
        />
        <p id="rd-terrain-help" className="rd-terrain__help">Drag the slider or use your arrow keys.</p>
        <div className="rd-terrain__presets" aria-label="Terrain presets">
          <button type="button" disabled={!ready} aria-pressed={zone === "city"} onClick={() => setValue(0)}>CITY</button>
          <button type="button" disabled={!ready} aria-pressed={zone === "mixed"} onClick={() => setValue(50)}>MIXED</button>
          <button type="button" disabled={!ready} aria-pressed={zone === "rough"} onClick={() => setValue(100)}>ROUGH</button>
        </div>
        <noscript><p className="rd-terrain__help">The route illustration is interactive when JavaScript is enabled.</p></noscript>
      </div>
    </div>
  );
}

export function InterestForm() {
  const [ready, setReady] = useState(false);
  const [values, setValues] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateInterest>>({});
  const [complete, setComplete] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (complete) successRef.current?.focus();
  }, [complete]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateInterest(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setValues({ name: "", email: "" });
      setComplete(true);
    } else if (nextErrors.name) {
      nameRef.current?.focus();
    } else {
      emailRef.current?.focus();
    }
  }

  if (complete) {
    return (
      <div className="rd-interest__success" ref={successRef} role="status" tabIndex={-1}>
        <span className="rd-exp-label">DEMO COMPLETE / 01</span>
        <h3>Your interest is noted in this preview.</h3>
        <p>Nothing was sent or saved. This is a local demonstration, not an order.</p>
        <button type="button" onClick={() => setComplete(false)}>Try the form again <span aria-hidden="true">↗</span></button>
      </div>
    );
  }

  return (
    <form className="rd-interest__form" onSubmit={handleSubmit} noValidate data-reveal="rise">
      <div className="rd-interest__form-head"><span>INTEREST FORM / DEMO</span><span>01 — 02</span></div>
      <p>Leave a note of interest to try the experience. This demo does not send or save your details.</p>
      {Object.keys(errors).length > 0 && <p className="rd-interest__validation" role="alert">Check the highlighted fields and try again.</p>}
      <label htmlFor="rd-interest-name">Your name</label>
      <input
        id="rd-interest-name"
        ref={nameRef}
        value={values.name}
        onChange={(event) => setValues({ ...values, name: event.currentTarget.value })}
        autoComplete="name"
        maxLength={120}
        required
        aria-invalid={Boolean(errors.name)}
        aria-describedby={errors.name ? "rd-name-error" : undefined}
        placeholder="How should we call you?"
      />
      {errors.name && <span className="rd-interest__error" id="rd-name-error">{errors.name}</span>}
      <label htmlFor="rd-interest-email">Email address</label>
      <input
        id="rd-interest-email"
        ref={emailRef}
        type="email"
        value={values.email}
        onChange={(event) => setValues({ ...values, email: event.currentTarget.value })}
        autoComplete="email"
        maxLength={254}
        required
        aria-invalid={Boolean(errors.email)}
        aria-describedby={errors.email ? "rd-email-error" : undefined}
        placeholder="you@example.com"
      />
      {errors.email && <span className="rd-interest__error" id="rd-email-error">{errors.email}</span>}
      <button className="rd-interest__submit" type="submit" disabled={!ready}>Preview interest <span aria-hidden="true">↗</span></button>
      <span className="rd-interest__disclaimer">LOCAL DEMO / NO ORDER WILL BE PLACED</span>
      <noscript><p>JavaScript is needed to preview this local demo. Nothing is sent or saved.</p></noscript>
    </form>
  );
}
