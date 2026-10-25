"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ADD_NEED, announceNeeds, type AddNeedDetail } from "./brief-events";
import { FitSlip } from "./FitSlip";
import { BUDGETS, EMPTY_BRIEF, NEEDS, bookingReference, validateBrief, type Brief, type BriefErrors } from "./validation";

type Phase = "idle" | "sending" | "done";
const FIELD_ORDER: (keyof Brief)[] = ["name", "email", "store", "needs", "budget", "note"];

/** The walk-through brief. Validates locally and "books" without a network request: it is a template. */
export function WalkthroughForm() {
  const [brief, setBrief] = useState<Brief>(EMPTY_BRIEF);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);
  const slipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onAdd = (event: Event) => {
      const { need, on } = (event as CustomEvent<AddNeedDetail>).detail;
      setBrief((current) => ({ ...current, needs: on ? [...new Set([...current.needs, need])] : current.needs.filter((item) => item !== need) }));
    };
    window.addEventListener(ADD_NEED, onAdd);
    return () => window.removeEventListener(ADD_NEED, onAdd);
  }, []);

  useEffect(() => { announceNeeds(brief.needs); }, [brief.needs]);

  useEffect(() => {
    if (phase === "done") slipRef.current?.querySelector<HTMLElement>("[data-slip]")?.focus({ preventScroll: true });
  }, [phase]);

  const set = <K extends keyof Brief>(key: K, value: Brief[K]) => {
    setBrief((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const toggleNeed = (id: string) => set("needs", brief.needs.includes(id) ? brief.needs.filter((item) => item !== id) : [...brief.needs, id]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase === "sending") return;
    const next = validateBrief(brief);
    setErrors(next);
    const first = FIELD_ORDER.find((key) => next[key]);
    if (first) {
      setShake((count) => count + 1);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] textarea`)?.focus();
      return;
    }
    setPhase("sending");
    window.setTimeout(() => setPhase("done"), 900);
  };

  const fieldProps = (key: keyof Brief) => ({
    "data-field": key,
    "data-invalid": errors[key] ? "true" : undefined,
    "data-shake": errors[key] ? shake % 2 : undefined,
  });

  const errorId = (key: keyof Brief) => `fx-err-${key}`;

  return (
    <div className="fx-form-card" data-phase={phase}>
      {phase !== "done" ? (
        <form ref={formRef} className="fx-form" noValidate onSubmit={onSubmit} aria-describedby="fx-form-note">
          <div className="fx-form__row">
            <div className="fx-field" {...fieldProps("name")}>
              <input id="fx-name" name="name" autoComplete="name" placeholder=" " value={brief.name} onChange={(e) => set("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? errorId("name") : undefined} />
              <label htmlFor="fx-name">Your name</label>
              <p className="fx-field__error" id={errorId("name")} role={errors.name ? "alert" : undefined}>{errors.name}</p>
            </div>
            <div className="fx-field" {...fieldProps("email")}>
              <input id="fx-email" name="email" type="email" autoComplete="email" placeholder=" " value={brief.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? errorId("email") : undefined} />
              <label htmlFor="fx-email">Email</label>
              <p className="fx-field__error" id={errorId("email")} role={errors.email ? "alert" : undefined}>{errors.email}</p>
            </div>
          </div>

          <div className="fx-field fx-field--prefixed" {...fieldProps("store")}>
            <span className="fx-field__prefix" aria-hidden="true">https://</span>
            <input id="fx-store" name="store" inputMode="url" autoComplete="url" placeholder=" " value={brief.store} onChange={(e) => set("store", e.target.value)} aria-invalid={errors.store ? true : undefined} aria-describedby={errors.store ? errorId("store") : undefined} />
            <label htmlFor="fx-store">Store address</label>
            <p className="fx-field__error" id={errorId("store")} role={errors.store ? "alert" : undefined}>{errors.store}</p>
          </div>

          <fieldset className="fx-choices" {...fieldProps("needs")} aria-describedby={errors.needs ? errorId("needs") : undefined}>
            <legend className="fx-mono">What needs fitting?</legend>
            <div className="fx-choices__list">
              {NEEDS.map((need, index) => (
                <label key={need.id} className="fx-chip">
                  <input type="checkbox" name="needs" value={need.id} checked={brief.needs.includes(need.id)} onChange={() => toggleNeed(need.id)} />
                  <span><b>0{index + 1}</b>{need.label}</span>
                </label>
              ))}
            </div>
            <p className="fx-field__error" id={errorId("needs")} role={errors.needs ? "alert" : undefined}>{errors.needs}</p>
          </fieldset>

          <fieldset className="fx-choices" {...fieldProps("budget")} aria-describedby={errors.budget ? errorId("budget") : undefined}>
            <legend className="fx-mono">Budget</legend>
            <div className="fx-choices__list">
              {BUDGETS.map((budget) => (
                <label key={budget.id} className="fx-chip fx-chip--radio">
                  <input type="radio" name="budget" value={budget.id} checked={brief.budget === budget.id} onChange={() => set("budget", budget.id)} />
                  <span>{budget.label}</span>
                </label>
              ))}
            </div>
            <p className="fx-field__error" id={errorId("budget")} role={errors.budget ? "alert" : undefined}>{errors.budget}</p>
          </fieldset>

          <div className="fx-field fx-field--area" {...fieldProps("note")}>
            <textarea id="fx-note" name="note" rows={3} placeholder=" " value={brief.note} onChange={(e) => set("note", e.target.value)} aria-invalid={errors.note ? true : undefined} aria-describedby={errors.note ? errorId("note") : undefined} />
            <label htmlFor="fx-note">Anything we should look at first? (optional)</label>
            <p className="fx-field__error" id={errorId("note")} role={errors.note ? "alert" : undefined}>{errors.note}</p>
          </div>

          <div className="fx-form__foot">
            <button className="fx-button fx-button--primary fx-submit" type="submit" disabled={phase === "sending"} data-state={phase}>
              <span className="fx-button__fill" aria-hidden="true" />
              <span className="fx-submit__label">Book the walk-through</span>
              <span className="fx-submit__busy" aria-hidden="true"><i />Checking the shelves</span>
            </button>
            <p id="fx-form-note" className="fx-form__note">Free, 30 minutes on video. This demo form doesn&apos;t send anything.</p>
          </div>
          <p className="fx-sr" aria-live="polite">{phase === "sending" ? "Checking the shelves" : ""}</p>
        </form>
      ) : (
        <div ref={slipRef}>
          <FitSlip brief={brief} reference={bookingReference(brief)} onEdit={() => setPhase("idle")} />
        </div>
      )}
    </div>
  );
}
