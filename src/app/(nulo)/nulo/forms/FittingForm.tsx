"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FITTING_FRAMES, FITTING_REASONS, frameReference, isValid, NOTE_MAX, validateFitting, type FittingErrors, type FittingField, type FittingInput } from "./fitting";

type Phase = "idle" | "loading" | "success";
const ORDER: FittingField[] = ["name", "email", "reason", "frame", "note"];
const INITIAL: FittingInput = { name: "", email: "", reason: "Screen work", frame: "Arc 01", note: "" };

export function FittingForm() {
  const uid = useId();
  const [values, setValues] = useState<FittingInput>(INITIAL);
  const [errors, setErrors] = useState<FittingErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [submitted, setSubmitted] = useState(false);
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (field: FittingField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateFitting(next));
  };

  useEffect(() => {
    const onFrameClick = (event: MouseEvent) => {
      const trigger = (event.target as HTMLElement).closest<HTMLElement>("[data-frame]");
      const label = trigger?.dataset.frame;
      if (!label || !FITTING_FRAMES.includes(label as (typeof FITTING_FRAMES)[number])) return;
      set("frame", label);
    };
    document.addEventListener("click", onFrameClick);
    return () => document.removeEventListener("click", onFrameClick);
  });

  useEffect(() => {
    if (phase === "success") successRef.current?.focus();
  }, [phase]);

  const errorId = (field: FittingField) => (errors[field] ? `${uid}-${field}-error` : undefined);
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const nextErrors = validateFitting(values);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) {
      setShake((value) => value + 1);
      const first = ORDER.find((field) => nextErrors[field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    const duration = document.documentElement.dataset.nuloMotion === "live" ? 1100 : 180;
    window.setTimeout(() => setPhase("success"), duration);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  return (
    <div className="nu-form-card" data-phase={phase}>
      {phase !== "success" ? (
        <form ref={formRef} className="nu-form" noValidate onSubmit={onSubmit} data-shake={shake % 2}>
          <div className="nu-form-card__top"><h3 className="nu-form-card__title">Request a fitting</h3><span className="nu-form-card__code">NU / intake</span></div>
          <div className="nu-form__row">
            <div className="nu-field" data-filled={values.name ? "true" : "false"}>
              <input id={`${uid}-name`} name="name" className="nu-input" placeholder=" " autoComplete="name" value={values.name} aria-invalid={!!errors.name} aria-describedby={errorId("name")} onChange={(event) => set("name", event.target.value)} />
              <label htmlFor={`${uid}-name`}>Your name</label>
              {errors.name && <p className="nu-field__error" id={errorId("name")} role="alert">{errors.name}</p>}
            </div>
            <div className="nu-field" data-filled={values.email ? "true" : "false"}>
              <input id={`${uid}-email`} name="email" type="email" className="nu-input" placeholder=" " autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={errorId("email")} onChange={(event) => set("email", event.target.value)} />
              <label htmlFor={`${uid}-email`}>Email</label>
              {errors.email && <p className="nu-field__error" id={errorId("email")} role="alert">{errors.email}</p>}
            </div>
          </div>
          <div className="nu-field nu-field--select" data-filled="true">
            <select id={`${uid}-reason`} name="reason" className="nu-input" value={values.reason} aria-invalid={!!errors.reason} aria-describedby={errorId("reason")} onChange={(event) => set("reason", event.target.value)}>
              {FITTING_REASONS.map((reason) => <option key={reason} value={reason}>{reason}</option>)}
            </select>
            <label htmlFor={`${uid}-reason`}>Your main mode</label>
            {errors.reason && <p className="nu-field__error" id={errorId("reason")} role="alert">{errors.reason}</p>}
          </div>
          <fieldset className="nu-fieldset" aria-describedby={errorId("frame")}>
            <legend className="nu-form__legend">First frame</legend>
            <div className="nu-choice-row">
              {FITTING_FRAMES.map((frame) => <label className="nu-choice" key={frame}><input type="radio" name="frame" value={frame} checked={values.frame === frame} onChange={() => set("frame", frame)} /><span>{frame}</span></label>)}
            </div>
            {errors.frame && <p className="nu-field__error" id={errorId("frame")} role="alert">{errors.frame}</p>}
          </fieldset>
          <div className="nu-field" data-filled={values.note ? "true" : "false"}>
            <textarea id={`${uid}-note`} name="note" className="nu-input nu-input--area" placeholder=" " rows={3} maxLength={NOTE_MAX + 20} value={values.note} aria-invalid={!!errors.note} aria-describedby={errorId("note")} onChange={(event) => set("note", event.target.value)} />
            <label htmlFor={`${uid}-note`}>What should we tune? (optional)</label>
            <span className="nu-form__count nu-mono" aria-hidden="true">{values.note.length}/{NOTE_MAX}</span>
            {errors.note && <p className="nu-field__error" id={errorId("note")} role="alert">{errors.note}</p>}
          </div>
          <button type="submit" className="nu-button nu-button--dark nu-form__submit" data-loading={phase === "loading"} disabled={phase === "loading"}><span className="nu-form__submit-label">Send the request <span className="nu-button__arrow" aria-hidden="true">↗</span></span><span className="nu-form__busy" aria-hidden="true"><i /><i /><i /></span><span className="nu-sr-only" aria-live="polite">{phase === "loading" ? "Sending request" : ""}</span></button>
          <p className="nu-form__fine">No account. No pressure. Just a measured reply.</p>
        </form>
      ) : (
        <div ref={successRef} className="nu-success" tabIndex={-1} role="status">
          <span className="nu-success__stamp">calibrated<br />for reply</span>
          <p className="nu-success__code">reference / {frameReference(values)}</p>
          <h3>We’ve got the signal.</h3>
          <p>Thanks, {values.name.trim() || "there"}. NULO will send a first frame suggestion to {values.email.trim() || "your inbox"} within 48 hours.</p>
          <button className="nu-button nu-button--ghost" type="button" onClick={reset}><span>Start another</span></button>
        </div>
      )}
    </div>
  );
}
