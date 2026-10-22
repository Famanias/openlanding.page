"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ticketCode, type AppointmentValues, validateAppointment } from "./appointment";

const services = [
  ["testing", "Testing & commissioning"],
  ["controls", "Controls & automation"],
  ["retrofit", "Retrofit & revamp"],
  ["design", "Design & engineering"],
] as const;

type FormStatus = "idle" | "loading" | "success";

export function AppointmentForm() {
  const [values, setValues] = useState<AppointmentValues>({ name: "", email: "", service: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleService = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      setValues((current) => ({ ...current, service }));
      setErrors((current) => ({ ...current, service: undefined }));
    };
    window.addEventListener("tc:service", handleService);
    return () => {
      window.removeEventListener("tc:service", handleService);
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const update = (field: keyof AppointmentValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validateAppointment(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStatus("loading");
    timerRef.current = window.setTimeout(() => setStatus("success"), 650);
  };

  if (status === "success") {
    return (
      <div className="tc-form-success" role="status" aria-live="polite">
        <span className="tc-stamp">Site visit requested</span>
        <div className="tc-ticket">
          <h3>On the board.</h3>
          <p>Thanks, {values.name.trim()}. The TRUECUT team has the signal and will follow up with a clear next step.</p>
          <div className="tc-ticket-meta"><span>{ticketCode(values.service)}</span><span>Local / no network</span></div>
        </div>
        <p className="tc-form-footnote">This template keeps the success state local. Connect your booking endpoint when you are ready to receive the brief.</p>
      </div>
    );
  }

  return (
    <form className="tc-form" onSubmit={submit} noValidate aria-busy={status === "loading"}>
      <div className="tc-field">
        <input id="tc-name" name="name" type="text" placeholder=" " autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "tc-name-error" : undefined} />
        <label htmlFor="tc-name">Your name</label>
        {errors.name ? <span id="tc-name-error" className="tc-field-error">{errors.name}</span> : null}
      </div>
      <div className="tc-field">
        <input id="tc-email" name="email" type="email" placeholder=" " autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "tc-email-error" : undefined} />
        <label htmlFor="tc-email">Work email</label>
        {errors.email ? <span id="tc-email-error" className="tc-field-error">{errors.email}</span> : null}
      </div>
      <fieldset className="tc-service-fieldset" aria-describedby={errors.service ? "tc-service-error" : undefined}>
        <legend>What should we look at first?</legend>
        <div className="tc-service-options">
          {services.map(([id, label]) => (
            <div className="tc-service-option" key={id}>
              <input id={`tc-service-${id}`} name="service" type="radio" value={id} checked={values.service === id} onChange={() => update("service", id)} />
              <label htmlFor={`tc-service-${id}`}>{label}</label>
            </div>
          ))}
        </div>
        {errors.service ? <span id="tc-service-error" className="tc-field-error">{errors.service}</span> : null}
      </fieldset>
      <button className="tc-button tc-form-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Stamping ticket…" : "Stamp my site visit"}<span aria-hidden="true">↗</span></button>
      <p className="tc-form-footnote">Three fields. One clear next step. Nothing is sent from this demo.</p>
    </form>
  );
}
