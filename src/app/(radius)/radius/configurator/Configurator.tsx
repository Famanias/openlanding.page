"use client";

import { useEffect, useReducer, useState } from "react";
import {
  INITIAL_BUILD,
  buildReducer,
  buildSummary,
  type Accessory,
  type Finish,
  type Tire,
} from "./logic";

const FINISHES: { value: Finish; label: string; asset: string }[] = [
  { value: "graphite", label: "Graphite", asset: "02-bike-side-graphite-alpha" },
  { value: "tangerine", label: "Tangerine", asset: "03-bike-side-tangerine-alpha" },
  { value: "cream", label: "Cream", asset: "04-bike-side-cream-alpha" },
];

const TIRES: { value: Tire; label: string; detail: string }[] = [
  { value: "city", label: "City", detail: "Fine tread" },
  { value: "gravel", label: "Gravel", detail: "Raised tread" },
];

const ACCESSORIES: { value: Accessory; label: string; number: string }[] = [
  { value: "rack", label: "Rear rack", number: "01" },
  { value: "basket", label: "Front basket", number: "02" },
  { value: "lights", label: "Lights", number: "03" },
];

export function Configurator() {
  const [build, dispatch] = useReducer(buildReducer, INITIAL_BUILD);
  const [ready, setReady] = useState(false);
  const [previousFinish, setPreviousFinish] = useState<Finish | null>(null);
  useEffect(() => setReady(true), []);
  useEffect(() => {
    if (previousFinish === null) return;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450;
    const timer = window.setTimeout(() => setPreviousFinish(null), delay);
    return () => window.clearTimeout(timer);
  }, [previousFinish, build.finish]);

  function selectFinish(finish: Finish) {
    if (finish === build.finish) return;
    setPreviousFinish(build.finish);
    dispatch({ type: "finish", finish });
  }

  function resetBuild() {
    if (build.finish !== INITIAL_BUILD.finish) setPreviousFinish(build.finish);
    dispatch({ type: "reset" });
  }

  return (
    <section className="rd-build" id="build" aria-labelledby="rd-build-title">
      <div className="rd-build__heading" data-reveal="rise">
        <div>
          <p className="rd-build__eyebrow">03 / THE BUILD SHEET</p>
          <h2 id="rd-build-title">Build your<br />ride<span>.</span></h2>
        </div>
        <p className="rd-build__intro">
          Start with the frame. Add the details that make it yours.
        </p>
      </div>

      <div className="rd-build__workbench">
        <div className="rd-build__stage" data-reveal="wipe">
          <div className="rd-build__stage-meta" aria-hidden="true">
            <span>RADIUS / R.01</span>
            <span>PRODUCT VIEW / SIDE</span>
          </div>
          <div className="rd-build__bike">
            {FINISHES.map((finish) => (
              <picture
                className="rd-build__bike-image"
                data-active={build.finish === finish.value}
                data-previous={previousFinish === finish.value && build.finish !== finish.value}
                key={finish.value}
              >
                {/* The images are prepared in two local sizes and share the same canvas. */}
                <img
                  src={`/templates/radius/${finish.asset}-1600.webp`}
                  srcSet={`/templates/radius/${finish.asset}-800.webp 800w, /templates/radius/${finish.asset}-1600.webp 1600w`}
                  sizes="(max-width: 800px) 100vw, 60vw"
                  width="1500"
                  height="1000"
                  loading="lazy"
                  alt={build.finish === finish.value ? `RADIUS bicycle in ${finish.label.toLowerCase()} finish, viewed from the side` : ""}
                />
              </picture>
            ))}
            <svg className="rd-build__bike-overlay" viewBox="0 0 1500 1000" aria-hidden="true">
              <defs>
                <mask id="rd-build-tire-mask" x="0" y="0" width="1500" height="1000" maskUnits="userSpaceOnUse">
                  <path d="M0 0H1500V1000H0Z M474 438 511 408 548 449 510 485Z M559 600 621 602 621 691 559 691Z M1023 347 1061 326 1120 453 1079 473Z" fill="#F3F0E8" fillRule="evenodd" />
                </mask>
              </defs>
              <g className="rd-build__part rd-build__part--tire" data-active={build.tire === "gravel"} mask="url(#rd-build-tire-mask)" fill="none">
                <circle className="rd-build__tire-base" cx="344" cy="637" r="263" />
                <circle className="rd-build__tire-base" cx="1181" cy="634" r="263" />
                <circle className="rd-build__tire-tread" cx="344" cy="637" r="263" />
                <circle className="rd-build__tire-tread" cx="1181" cy="634" r="263" />
              </g>
              <g className="rd-build__part rd-build__part--rack" data-active={build.accessories.rack} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path className="rd-build__rack-shadow" d="M169 317h317l66 21 M193 329l143 295 M457 329 336 624" />
                <path className="rd-build__rack-line" d="M169 317h317l66 21 M193 329l143 295 M457 329 336 624" />
                <path className="rd-build__rack-deck" d="M166 304h316l14 13H160Z M205 304l-7 13 M272 304l-5 13 M339 304l-4 13 M406 304l-3 13" />
              </g>
              <g className="rd-build__part rd-build__part--basket" data-active={build.accessories.basket} fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path className="rd-build__basket-mount" d="M1063 165h52 M1092 185l-45 91" />
                <path className="rd-build__basket-outline" d="M1088 153h228l-23 119q-3 15-18 15h-139q-15 0-18-15Z M1082 146h241v16h-241Z" />
                <path className="rd-build__basket-wire" d="M1120 184h179 M1125 218h168 M1130 251h157 M1144 164l14 120 M1182 164l6 120 M1220 164l-2 120 M1258 164l-10 120" />
              </g>
              <g className="rd-build__part rd-build__part--lights" data-active={build.accessories.lights}>
                <path className="rd-build__light-mount" d="M1057 248v22 M538 242l12 30" />
                <rect className="rd-build__light-body" x="1039" y="219" width="67" height="31" rx="9" />
                <rect className="rd-build__light-front" x="1091" y="224" width="16" height="21" rx="4" />
                <rect className="rd-build__light-body" x="507" y="226" width="35" height="20" rx="6" />
                <rect className="rd-build__light-rear" x="508" y="230" width="10" height="12" rx="3" />
              </g>
            </svg>
          </div>
          <div className="rd-build__stage-footer">
            <span>FRAME / {build.finish.toUpperCase()}</span>
            <span>CONFIGURATION STUDY</span>
          </div>
        </div>

        <div className="rd-build__controls">
          <noscript><p className="rd-build__noscript">Enable JavaScript to change the build.</p></noscript>
          <fieldset className="rd-build__field" disabled={!ready} data-reveal="rise">
            <legend><span>01</span> Frame finish</legend>
            <div className="rd-build__finish-options">
              {FINISHES.map((finish) => (
                <label className="rd-build__finish-label" key={finish.value}>
                  <input
                    className="rd-build__input"
                    type="radio"
                    name="rd-frame-finish"
                    value={finish.value}
                    checked={build.finish === finish.value}
                    onChange={() => selectFinish(finish.value)}
                  />
                  <span className="rd-build__finish-card">
                    <span className={`rd-build__swatch rd-build__swatch--${finish.value}`} aria-hidden="true" />
                    <span>{finish.label}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rd-build__field" disabled={!ready} data-reveal="rise">
            <legend><span>02</span> Tires</legend>
            <div className="rd-build__tire-options">
              {TIRES.map((tire) => (
                <label className="rd-build__tire-label" key={tire.value}>
                  <input
                    className="rd-build__input"
                    type="radio"
                    name="rd-tires"
                    value={tire.value}
                    checked={build.tire === tire.value}
                    onChange={() => dispatch({ type: "tire", tire: tire.value })}
                  />
                  <span className="rd-build__tire-card">
                    <svg className="rd-build__tire-icon" viewBox="0 0 48 48" aria-hidden="true">
                      <circle cx="24" cy="24" r="17" />
                      <circle className={tire.value === "gravel" ? "rd-build__icon-gravel" : "rd-build__icon-city"} cx="24" cy="24" r="17" />
                    </svg>
                    <span><strong>{tire.label}</strong><small>{tire.detail}</small></span>
                    <span className="rd-build__radio-mark" aria-hidden="true" />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rd-build__field rd-build__field--accessories" disabled={!ready} data-reveal="rise">
            <legend><span>03</span> Accessories</legend>
            <div className="rd-build__accessories">
              {ACCESSORIES.map((accessory) => (
                <label className="rd-build__accessory-label" key={accessory.value}>
                  <input
                    className="rd-build__input"
                    type="checkbox"
                    name={accessory.value}
                    checked={build.accessories[accessory.value]}
                    onChange={(event) => dispatch({
                      type: "accessory",
                      accessory: accessory.value,
                      checked: event.currentTarget.checked,
                    })}
                  />
                  <span className="rd-build__accessory-card">
                    <span className="rd-build__accessory-number" aria-hidden="true">{accessory.number}</span>
                    <span>{accessory.label}</span>
                    <span className="rd-build__switch" aria-hidden="true"><span /></span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <div className="rd-build__summary">
        <div>
          <p className="rd-build__summary-label">YOUR CONFIGURATION / 01</p>
          <p className="rd-build__summary-text" aria-live="polite" aria-atomic="true">{buildSummary(build)}</p>
        </div>
        <button className="rd-build__reset" type="button" disabled={!ready} onClick={resetBuild}>
          <span aria-hidden="true">↺</span> Reset build
        </button>
      </div>
    </section>
  );
}

