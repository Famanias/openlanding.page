"use client";

import { FormEvent, useState } from "react";
import { validateBooking, type BookingValues } from "./booking";

const goals = [
  ["calendar", "Fill my calendar"],
  ["enquiries", "Capture enquiries"],
  ["service", "Sell one service"],
] as const;

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [values, setValues] = useState<BookingValues>({ name: "", email: "", goal: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateBooking>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const update = (key: keyof BookingValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus("idle");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateBooking(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <form className={`oh-booking-form${compact ? " oh-booking-form--compact" : ""}`} onSubmit={submit} noValidate>
      <fieldset className="oh-goal-fieldset" aria-describedby={errors.goal ? "oh-goal-error" : undefined}>
        <legend>What should the page help you do?</legend>
        <div className="oh-goals">
          {goals.map(([value, label]) => (
            <span className="oh-goal" key={value}>
              <input
                id={`oh-goal-${value}${compact ? "-compact" : ""}`}
                name="goal"
                type="radio"
                value={value}
                checked={values.goal === value}
                onChange={(event) => update("goal", event.target.value)}
              />
              <label htmlFor={`oh-goal-${value}${compact ? "-compact" : ""}`}>{label}</label>
            </span>
          ))}
        </div>
        <span className="oh-helper" id="oh-goal-error">{errors.goal ?? "Pick the one result that matters first."}</span>
      </fieldset>

      <div className="oh-field-grid">
        <label className="oh-field">
          <span>Your name <b>(required)</b></span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby="oh-name-help"
          />
          <small id="oh-name-help">{errors.name ?? ""}</small>
        </label>
        <label className="oh-field">
          <span>Work email <b>(required)</b></span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby="oh-email-help"
          />
          <small id="oh-email-help">{errors.email ?? ""}</small>
        </label>
      </div>

      <button className="oh-button oh-button--primary" type="submit" disabled={status === "success"} aria-busy={status === "error"}>
        {status === "success" ? "Door is open" : "Book my 20-minute call"}
        <span aria-hidden="true">↗</span>
      </button>
      <p className={`oh-form-status oh-form-status--${status}`} aria-live="polite">
        {status === "success" ? "Ready to connect. Nothing was sent; this template is not connected yet." : status === "error" ? "One detail still needs your attention." : "No pitch. Just a clear next step."}
      </p>
    </form>
  );
}
