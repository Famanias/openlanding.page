"use client";

import { useRef, useState } from "react";
import { BOOKING_FOCUS, validateBooking, type BookingValues } from "./booking";

const focusLabels = {
  conversion: "Conversion / product paths",
  merchandising: "Merchandising / collections",
  speed: "Speed / storefront weight",
  retention: "Retention / return visits",
} as const;

const initialValues: BookingValues = { name: "", email: "", shop: "", focus: "" };

export function BookingForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>>({});
  const [status, setStatus] = useState<"idle" | "error" | "loading" | "success">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const shopRef = useRef<HTMLInputElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  const update = (key: keyof BookingValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateBooking(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setStatus("error");
      requestAnimationFrame(() => {
        if (next.name) nameRef.current?.focus();
        else if (next.email) emailRef.current?.focus();
        else if (next.shop) shopRef.current?.focus();
        else focusRef.current?.focus();
      });
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 260);
  };

  if (status === "success") {
    return (
      <div className="ac-success" data-status="success" aria-live="polite">
        <span className="ac-success-mark" aria-hidden="true">✓</span>
        <h3>Good. We have a starting point.</h3>
        <p>This is a local template demo, so nothing was sent. In a real build, this brief would open the care conversation.</p>
        <button type="button" className="ac-button ac-button--quiet" onClick={() => { setValues(initialValues); setStatus("idle"); }}>Start another brief</button>
      </div>
    );
  }

  return (
    <form className="ac-form" data-status={status} onSubmit={submit} noValidate>
      <fieldset>
        <legend>Where should we start?</legend>
        <div className="ac-focus-list">
          {BOOKING_FOCUS.map((focus, index) => (
            <span className="ac-focus-option" key={focus}>
              <input ref={index === 0 ? focusRef : undefined} id={`ac-focus-${focus}`} type="radio" name="focus" value={focus} checked={values.focus === focus} onChange={(event) => update("focus", event.target.value)} />
              <label htmlFor={`ac-focus-${focus}`}>{focusLabels[focus]}</label>
            </span>
          ))}
        </div>
        <small className="ac-error">{errors.focus ?? "Choose one care track for the first conversation."}</small>
      </fieldset>
      <div className="ac-fields">
        <div className="ac-field"><label htmlFor="ac-name">Your name</label><input ref={nameRef} className="ac-input" id="ac-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} /> <small className="ac-error">{errors.name ?? ""}</small></div>
        <div className="ac-field"><label htmlFor="ac-email">Work email</label><input ref={emailRef} className="ac-input" id="ac-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} /> <small className="ac-error">{errors.email ?? ""}</small></div>
        <div className="ac-field"><label htmlFor="ac-shop">Shop name</label><input ref={shopRef} className="ac-input" id="ac-shop" name="shop" autoComplete="organization" value={values.shop} onChange={(event) => update("shop", event.target.value)} aria-invalid={Boolean(errors.shop)} /> <small className="ac-error">{errors.shop ?? ""}</small></div>
      </div>
      <button className="ac-button" type="submit" disabled={status === "loading"}>{status === "loading" ? "Opening the care note…" : "Book a care call ↗"}</button>
      <p className="ac-form-status" aria-live="polite">{status === "error" ? "One detail still needs your attention." : "20 minutes / clear next step / no commitment"}</p>
    </form>
  );
}
