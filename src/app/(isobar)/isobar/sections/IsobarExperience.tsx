"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { PressureField } from "../field/PressureField";
import { CHAMBERS, DEFAULT_WEATHER_MAP, chamberForProgress, mapSliderStateToFieldTuning, updateWeatherMap, volumeGestureToFieldTuning, type VolumeGestureTuning } from "../field/controls";
import { Reveal } from "../motion/Reveal";
import { validateBrief } from "../forms/validate-brief";

const chambers = CHAMBERS;

const recipes = [
  { name: "Sunbreak", meta: "coral · 02.14", code: "A-01" },
  { name: "Night Pressure", meta: "violet · 05.08", code: "A-02" },
  { name: "Tidal Mint", meta: "mint · 07.23", code: "A-03" },
  { name: "High Noon", meta: "sun · 11.04", code: "A-04" },
  { name: "Faultline", meta: "coral/mint · 12.09", code: "A-05" },
];

export function IsobarExperience() {
  const [seed, setSeed] = useState(4);
  const [fieldMounted, setFieldMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [navState, setNavState] = useState<"top" | "scrolled">("top");
  const [weatherMap, setWeatherMap] = useState(DEFAULT_WEATHER_MAP);
  const [chamberOverride, setChamberOverride] = useState<number | null>(null);
  const chamberOverrideRef = useRef<number | null>(null);
  const [volumeProgress, setVolumeProgress] = useState<number | null>(null);
  const volumeGestureActiveRef = useRef(false);
  const lastGestureProgressRef = useRef<number | null>(null);
  const volumeGraphicDragRef = useRef(false);
  const [formState, setFormState] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setMounted = useCallback((mounted: boolean) => setFieldMounted(mounted), []);

  useEffect(() => {
    let frame = 0;
    let lastProgress = -1;
    let lastUpdate = 0;
    let lastNav: "top" | "scrolled" = "top";
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, window.scrollY / max));
      const nav = window.scrollY > 60 ? "scrolled" : "top";
      const now = performance.now();
      if (now - lastUpdate > 100 || Math.abs(next - lastProgress) > 0.08) {
        lastUpdate = now;
        lastProgress = next;
        setProgress(next);
        const sampled = chamberForProgress(next).index;
        if (chamberOverrideRef.current !== null && sampled === chamberOverrideRef.current) {
          chamberOverrideRef.current = null;
          setChamberOverride(null);
        }
      }
      if (nav !== lastNav) { lastNav = nav; setNavState(nav); }
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const resetVolumeGesture = () => {
      if (!volumeGestureActiveRef.current) return;
      volumeGestureActiveRef.current = false;
      lastGestureProgressRef.current = null;
      setVolumeProgress(null);
      chamberOverrideRef.current = null;
      setChamberOverride(null);
    };
    window.addEventListener("scroll", resetVolumeGesture, { passive: true });
    return () => window.removeEventListener("scroll", resetVolumeGesture);
  }, []);

  const tunedField = useMemo(() => mapSliderStateToFieldTuning(weatherMap), [weatherMap]);
  const activeChamber = chamberOverride ?? chamberForProgress(progress).index;
  const displayedProgress = volumeProgress ?? progress;
  const readout = useMemo(() => {
    const pressure = Math.round(18 + displayedProgress * 74);
    const latitude = (42.34 - displayedProgress * 3.2).toFixed(2);
    return { pressure, latitude };
  }, [displayedProgress]);

  const jumpToChamber = (index: number) => {
    volumeGestureActiveRef.current = false;
    setVolumeProgress(null);
    chamberOverrideRef.current = index;
    setChamberOverride(index);
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: max * (index / Math.max(1, chambers.length - 1)), behavior: "smooth" });
  };

  const handleVolumeGesture = useCallback((tuning: VolumeGestureTuning) => {
    volumeGestureActiveRef.current = true;
    setVolumeProgress(tuning.progress);
    const nextChamber = chamberForProgress(tuning.progress).index;
    chamberOverrideRef.current = nextChamber;
    setChamberOverride(nextChamber);
    setWeatherMap({ density: tuning.density, drift: tuning.drift, contour: tuning.contour });
    const previous = lastGestureProgressRef.current;
    if (previous === null || Math.abs(previous - tuning.progress) > .08) {
      lastGestureProgressRef.current = tuning.progress;
      setSeed((value) => value + tuning.seedDelta);
    }
  }, []);

  const readVolumeGraphicGesture = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(1, rect.width)));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(1, rect.height)));
    handleVolumeGesture(volumeGestureToFieldTuning(x, y));
  }, [handleVolumeGesture]);

  const onVolumeGraphicDown = (event: React.PointerEvent<HTMLDivElement>) => {
    volumeGraphicDragRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    readVolumeGraphicGesture(event);
  };
  const onVolumeGraphicMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (volumeGraphicDragRef.current) readVolumeGraphicGesture(event);
  };
  const onVolumeGraphicUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (volumeGraphicDragRef.current) readVolumeGraphicGesture(event);
    volumeGraphicDragRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const validation = validateBrief({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      field: String(data.get("focus") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    const nextErrors: Record<string, string> = { ...validation };
    if (nextErrors.field) { nextErrors.focus = nextErrors.field; delete nextErrors.field; }
    setErrors(nextErrors);
    if (Object.keys(validation).length > 0) return;
    setFormState("loading");
    window.setTimeout(() => setFormState("success"), 620);
  };

  return (
    <div className="iso-shell">
      <PressureField seed={seed} density={tunedField.density} drift={tunedField.drift} contour={tunedField.contour} depth={tunedField.depth} amplitude={tunedField.amplitude} frequency={tunedField.frequency} speed={tunedField.speed} onMount={setMounted} onGesture={handleVolumeGesture} />
      <div className="iso-grain" aria-hidden="true" />

      <header className="iso-nav" data-state={navState}>
        <a href="#surface" aria-label="ISOBAR home"><Logo /></a>
        <nav className="iso-nav__links" aria-label="Primary navigation">
          <a href="#transects">Transects</a>
          <a href="#materials">Materials</a>
          <a href="#instrument">Instrument</a>
        </nav>
        <span className="iso-nav__status"><i aria-hidden="true" /> {fieldMounted ? "field live" : "field ready"}</span>
      </header>

      <main className="iso-main">
        <section id="surface" className="iso-section iso-section--hero" aria-labelledby="iso-hero-title">
          <div className="iso-section__inner iso-section__inner--wide">
            <div className="iso-split">
              <div>
                <Reveal as="span" variant="mask" className="iso-kicker iso-mono">Spatial systems / 2026</Reveal>
                <h1 id="iso-hero-title" className="iso-title" aria-label="Shape the atmosphere."><span className="iso-title__line" aria-hidden="true">Shape the</span><span className="iso-title__line" aria-hidden="true"><em>atmosphere.</em></span></h1>
                <p className="iso-lead">ISOBAR makes pressure visible. We build living fields for teams working with motion, light and the unknown.</p>
                <div className="iso-actions">
                  <a className="iso-button" href="#transects"><span>Enter the field</span><span aria-hidden="true">↘</span></a>
                  <button className="iso-button" type="button" onClick={() => setSeed((value) => value + 1)}><span>Reseed membrane</span><span aria-hidden="true">✳</span></button>
                </div>
              </div>
              <div className="iso-readout" aria-live="polite">
                <span className="iso-readout__label iso-mono">Live pressure</span>
                <span className="iso-readout__value"><i className="iso-readout__dot" aria-hidden="true" />{readout.pressure}<small>kPa</small></span>
                <span className="iso-readout__meta">lat {readout.latitude}° · membrane AETHER-{String(seed).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="iso-scrollhint iso-mono">Scroll to shear the field</div>
          </div>
        </section>

        <section className="iso-section" aria-labelledby="iso-reading-title">
          <div className="iso-section__inner">
            <div className="iso-split">
              <div>
                <Reveal as="span" variant="wipe" className="iso-kicker iso-mono">The reading</Reveal>
                <h2 id="iso-reading-title" className="iso-section__heading">A gradient is a <em>weather system.</em></h2>
              </div>
              <div>
                <p className="iso-copy">Stop treating color like a surface. A pressure pin moves through our field and reveals the forces underneath: drag, density, warmth, release.</p>
                <div className="iso-note-list" aria-label="Field observations">
                  {[
                    ["01", "Feel the edge", "perception / 12ms"],
                    ["02", "Hold the center", "stability / 42%"],
                    ["03", "Let it shear", "motion / 88%"],
                  ].map(([index, title, meta], itemIndex) => <Reveal key={index} as="div" variant="rise" index={itemIndex} className="iso-note"><span className="iso-note__index iso-mono">{index}</span><span className="iso-note__title">{title}</span><span className="iso-note__meta iso-mono">{meta}</span></Reveal>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="transects" className="iso-section iso-transect" aria-labelledby="iso-transect-title">
          <div className="iso-section__inner iso-transect__stage">
            <Reveal variant="scale" className="iso-transect__graphic">
              <div className="iso-volume-hit" role="application" aria-label="Interactive pressure volume. Click or drag to retune the active transect." onPointerDown={onVolumeGraphicDown} onPointerMove={onVolumeGraphicMove} onPointerUp={onVolumeGraphicUp} onPointerCancel={onVolumeGraphicUp}>
                <span className="iso-transect__ring" /><span className="iso-transect__ring" /><span className="iso-transect__ring" />
                <span className="iso-transect__core" />
                <i className="iso-transect__point iso-transect__point--a" /><i className="iso-transect__point iso-transect__point--b" /><i className="iso-transect__point iso-transect__point--c" />
              </div>
            </Reveal>
            <div className="iso-transect__copy">
              <Reveal as="span" variant="mask" className="iso-kicker iso-mono">Transects / 04 views</Reveal>
              <h2 id="iso-transect-title" className="iso-section__heading">Read the <em>whole volume.</em></h2>
              <p>Scroll through one membrane. The camera changes altitude, the contours recompose, and the same idea appears with new pressure.</p>
              <span className="iso-gesture-hint iso-mono">Click / drag the volume to retune it</span>
              <div className="iso-chamber-list" role="list" aria-label="Field chambers">
                {chambers.map((chamber, index) => <button key={chamber.id} className="iso-chamber" data-active={index === activeChamber} type="button" aria-pressed={index === activeChamber} onClick={() => jumpToChamber(index)}><span className="iso-chamber__index iso-mono">{chamber.number}</span><span className="iso-chamber__name">{chamber.label}</span><span className="iso-chamber__value">{chamber.note}</span></button>)}
                <p className="iso-sr-only" aria-live="polite">Reading {chambers[activeChamber].label}: {chambers[activeChamber].note}.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="materials" className="iso-section" aria-labelledby="iso-materials-title">
          <div className="iso-section__inner iso-recipes">
            <div className="iso-recipes__intro">
              <Reveal as="span" variant="wipe" className="iso-kicker iso-mono">Material studies</Reveal>
              <h2 id="iso-materials-title" className="iso-section__heading">Five ways to <em>hold light.</em></h2>
              <p className="iso-copy">Each material is a different pressure recipe. Pick one and watch the same field take a new temperature.</p>
            </div>
            <div className="iso-recipes__grid">
              {recipes.map((recipe, index) => <Reveal key={recipe.code} variant="scale" index={index}><button className="iso-recipe" type="button" onClick={() => setSeed((value) => value + index + 1)}><span className="iso-recipe__name">{recipe.name}</span><span className="iso-recipe__meta">{recipe.meta} · {recipe.code}</span><span className="iso-recipe__pin" aria-hidden="true" /></button></Reveal>)}
            </div>
          </div>
        </section>

        <section id="instrument" className="iso-section iso-section--dark iso-instrument" aria-labelledby="iso-instrument-title">
          <div className="iso-section__inner iso-instrument__grid">
            <div>
              <Reveal as="span" variant="mask" className="iso-kicker iso-mono">The instrument</Reveal>
              <h2 id="iso-instrument-title" className="iso-section__heading">Make a <em>weather map</em> for your idea.</h2>
              <p className="iso-lead">A small control surface for the parts that matter: how much the field moves, how tightly it gathers, and where the contour breaks.</p>
            </div>
            <div className="iso-instrument__panel">
              <div className="iso-control"><label htmlFor="iso-density">Density</label><input id="iso-density" style={{ "--iso-value": `${weatherMap.density}%` } as React.CSSProperties} type="range" min="0" max="100" value={weatherMap.density} aria-valuetext={`${weatherMap.density} percent density`} onChange={(event) => setWeatherMap((state) => updateWeatherMap(state, "density", Number(event.target.value)))} /><output htmlFor="iso-density">{weatherMap.density}%</output></div>
              <div className="iso-control"><label htmlFor="iso-drift">Drift</label><input id="iso-drift" style={{ "--iso-value": `${weatherMap.drift}%` } as React.CSSProperties} type="range" min="0" max="100" value={weatherMap.drift} aria-valuetext={`${weatherMap.drift} percent drift`} onChange={(event) => setWeatherMap((state) => updateWeatherMap(state, "drift", Number(event.target.value)))} /><output htmlFor="iso-drift">{weatherMap.drift}%</output></div>
              <div className="iso-control"><label htmlFor="iso-contour">Contour</label><input id="iso-contour" style={{ "--iso-value": `${weatherMap.contour}%` } as React.CSSProperties} type="range" min="0" max="100" value={weatherMap.contour} aria-valuetext={`${weatherMap.contour} percent contour`} onChange={(event) => setWeatherMap((state) => updateWeatherMap(state, "contour", Number(event.target.value)))} /><output htmlFor="iso-contour">{weatherMap.contour}%</output></div>
              <div className="iso-tuning-readout"><span className="iso-mono">Field tuning</span><strong>{tunedField.frequency.toFixed(2)}× frequency</strong><span>{tunedField.depth.toFixed(2)} depth · {tunedField.amplitude.toFixed(2)} amplitude</span></div>
              <div className="iso-pin"><button className="iso-pin__button" type="button" onPointerMove={(event) => { if (event.buttons) setSeed((value) => value + Math.max(1, Math.round(event.movementX + event.movementY))); }} onClick={() => setSeed((value) => value + 1)} aria-label="Drag or click to inject a new pressure pin">Inject</button><span className="iso-pin__label iso-mono">pressure pin / {String(seed).padStart(2, "0")}</span></div>
            </div>
          </div>
        </section>

        <section id="invitation" className="iso-section iso-invite" aria-labelledby="iso-invite-title">
          <div className="iso-section__inner iso-invite__grid">
            <div>
              <Reveal as="span" variant="wipe" className="iso-kicker iso-mono">Commission a field study</Reveal>
              <h2 id="iso-invite-title" className="iso-section__heading">Bring us the <em>weather.</em></h2>
              <p className="iso-copy">Tell us what is moving under the surface. We will return with a field you can feel.</p>
            </div>
            <div className="iso-form" aria-live="polite">
              {formState === "success" ? <div className="iso-form__success"><span className="iso-mono">Signal received / 2026</span><h3>Your field is on the map.</h3><p>We will send a first reading within two working days.</p></div> : <form onSubmit={handleSubmit} noValidate>
                <label className="iso-field-label" data-invalid={Boolean(errors.name)}><span>Name</span><input name="name" placeholder="Your name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="iso-error">{errors.name}</span>}</label>
                <label className="iso-field-label" data-invalid={Boolean(errors.email)}><span>Work email</span><input name="email" type="email" placeholder="you@studio.com" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="iso-error">{errors.email}</span>}</label>
                <label className="iso-field-label" data-invalid={Boolean(errors.focus)}><span>What is moving?</span><input name="focus" placeholder="A product, a place, a feeling" aria-invalid={Boolean(errors.focus)} />{errors.focus && <span className="iso-error">{errors.focus}</span>}</label>
                <label className="iso-field-label" data-invalid={Boolean(errors.message)}><span>First signal</span><input name="message" placeholder="Give us one line" aria-invalid={Boolean(errors.message)} />{errors.message && <span className="iso-error">{errors.message}</span>}</label>
                <button className="iso-button" type="submit" disabled={formState === "loading"}><span>{formState === "loading" ? "Reading field…" : "Send a signal"}</span><span aria-hidden="true">↗</span></button>
              </form>}
            </div>
          </div>
        </section>
      </main>

      <footer className="iso-footer"><div className="iso-footer__meta"><Logo compact /><span className="iso-mono">Living fields for moving ideas.</span></div><nav className="iso-footer__links iso-mono" aria-label="Footer navigation"><a href="#surface">Top</a><a href="#instrument">Instrument</a><a href="mailto:hello@isobar.studio">hello@isobar.studio</a></nav></footer>
    </div>
  );
}
