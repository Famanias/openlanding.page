"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "../motion/Reveal";
import { sectionProgress } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";
import { GlazePicker } from "../vessel/GlazePicker";
import { ProfileEditor } from "../vessel/ProfileEditor";
import { VesselCanvas } from "../vessel/VesselCanvas";
import { useVessel } from "../vessel/VesselProvider";
import { glazeById } from "../vessel/glazes";
import { formById } from "../vessel/forms";

const STEPS = [
  { id: "tn-throw", key: "throw", label: "Throw" },
  { id: "tn-shape", key: "shape", label: "Shape" },
  { id: "tn-glaze", key: "glaze", label: "Glaze" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const CLAY_GRAMS = 1240;

/**
 * The signature moment. Scrolling the throw block pulls the clay from a lump into the vessel
 * (progress is a pure function of real offsets, written to a ref and to --throw, never to state).
 */
export function Workshop() {
  const { state, dispatch, throwRef } = useVessel();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const throwBlockRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState<StepKey>("throw");

  useEffect(() => {
    const section = sectionRef.current;
    const block = throwBlockRef.current;
    if (!section || !block) return;
    if (reduced) {
      throwRef.current = 1;
      section.style.setProperty("--throw", "1");
      return;
    }
    let top = 0;
    let height = 1;
    let frame = 0;
    const measure = () => {
      const box = block.getBoundingClientRect();
      top = box.top + window.scrollY;
      height = box.height;
    };
    const update = () => {
      frame = 0;
      const p = sectionProgress(window.scrollY, top, height, window.innerHeight);
      throwRef.current = p;
      section.style.setProperty("--throw", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const settle = window.setTimeout(() => {
      measure();
      update();
    }, 600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(settle);
      cancelAnimationFrame(frame);
      throwRef.current = 1;
    };
  }, [reduced, throwRef]);

  useEffect(() => {
    const nodes = STEPS.map((s) => document.getElementById(s.id)).filter((n): n is HTMLElement => n !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const match = STEPS.find((s) => s.id === entry.target.id);
          if (match) setStep(match.key);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const glaze = glazeById(state.glazeId);
  const formName = state.formId ? formById(state.formId)?.name : "Your own form";

  return (
    <section id="workshop" ref={sectionRef} className="tn-workshop" data-step={step} aria-labelledby="tn-workshop-title">
      <div className="tn-workshop-stage">
        <div className="tn-stage-card">
          <VesselCanvas />
          <p className="tn-stage-caption tn-mono" aria-live="polite">
            {formName} · {glaze.name}
          </p>
          <div className="tn-throw-meter" aria-hidden="true">
            <i />
          </div>
        </div>
        <ol className="tn-step-rail" aria-label="Workshop steps">
          {STEPS.map((s, i) => (
            <li key={s.key}>
              <a href={`#${s.id}`} aria-current={step === s.key ? "step" : undefined}>
                <span className="tn-mono">0{i + 1}</span>
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="tn-workshop-panel">
        <article id="tn-throw" ref={throwBlockRef} className="tn-step tn-step-throw">
          <div className="tn-step-sticky">
            <p className="tn-eyebrow">01 · Throw</p>
            <h2 id="tn-workshop-title" className="tn-display tn-h2">
              Keep scrolling. The clay rises.
            </h2>
            <p className="tn-body-copy">
              {CLAY_GRAMS.toLocaleString("en-US")} g of stoneware, centred on the wheel. Scroll to open it and pull the walls up. The wheel spins faster when you do.
            </p>
            <ol className="tn-throw-steps">
              <li style={{ "--at": 0.08 } as CSSProperties}>Centre</li>
              <li style={{ "--at": 0.3 } as CSSProperties}>Open</li>
              <li style={{ "--at": 0.58 } as CSSProperties}>Pull</li>
              <li style={{ "--at": 0.85 } as CSSProperties}>Shape</li>
            </ol>
          </div>
        </article>

        <article id="tn-shape" className="tn-step tn-step-shape">
          <Reveal variant="rise">
            <p className="tn-eyebrow">02 · Shape</p>
            <h2 className="tn-display tn-h2">Drag the pinch points.</h2>
            <p className="tn-body-copy">Four handles and a height bar. Arrow keys work on every handle. The spec below is what the potters will aim for.</p>
          </Reveal>
          <ProfileEditor />
          <button type="button" className="tn-btn tn-btn-ghost tn-btn-small" onClick={() => dispatch({ type: "reset" })}>
            <span className="tn-btn-label" data-label="Back to the Moon Jar">
              Back to the Moon Jar
            </span>
          </button>
        </article>

        <article id="tn-glaze" className="tn-step tn-step-glaze">
          <Reveal variant="rise">
            <p className="tn-eyebrow">03 · Glaze</p>
            <h2 className="tn-display tn-h2">Choose how it comes out of the fire.</h2>
            <p className="tn-body-copy">Six glazes, each fired the way it was meant to be. Colours shift a little in the kiln. That is the point.</p>
          </Reveal>
          <GlazePicker />
          <a href="#order" className="tn-btn tn-btn-clay">
            <span className="tn-btn-label" data-label="Order this vessel">
              Order this vessel
            </span>
            <span className="tn-btn-arrow" aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  );
}
