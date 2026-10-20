"use client";

import { useRef, useState, type FormEvent } from "react";
import { MAX_GUESTS, SEATINGS, validateReservation, type Reservation, type ReservationErrors } from "./reservation";

const ORDER: (keyof Reservation)[] = ["date", "time", "guests", "name", "email"];

/** Reservation request. Validates in the browser and shows a success state; it never sends anything. */
export function ReservationForm() {
  const [values, setValues] = useState<Reservation>({ date: "", time: "", guests: 2, name: "", email: "" });
  const [errors, setErrors] = useState<ReservationErrors>({});
  const [held, setHeld] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Reservation>(key: K, value: Reservation[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validateReservation(values);
    setErrors(next);
    const first = ORDER.find((k) => next[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setHeld(true);
  };

  if (held) {
    return (
      <div className="kj-form kj-form--held" role="status">
        <p className="kj-mono kj-shu">予約 · Request received</p>
        <p className="kj-h3">Your seats are held. A confirmation will follow by email.</p>
      </div>
    );
  }

  const field = (key: keyof Reservation, label: string, control: React.ReactNode) => (
    <div className="kj-field" data-invalid={errors[key] ? "" : undefined}>
      <label htmlFor={`res-${key}`} className="kj-mono">
        {label}
      </label>
      {control}
      {errors[key] ? (
        <p id={`res-${key}-error`} className="kj-field__error kj-mono">
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  const aria = (key: keyof Reservation) => ({
    id: `res-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `res-${key}-error` : undefined,
  });

  return (
    <form ref={formRef} className="kj-form" onSubmit={onSubmit} noValidate>
      <div className="kj-form__row">
        {field("date", "Date", <input type="date" {...aria("date")} value={values.date} onChange={(e) => set("date", e.target.value)} />)}
        {field(
          "time",
          "Seating",
          <select {...aria("time")} value={values.time} onChange={(e) => set("time", e.target.value)}>
            <option value="">Choose</option>
            {SEATINGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>,
        )}
        {field(
          "guests",
          "Guests",
          <select {...aria("guests")} value={values.guests} onChange={(e) => set("guests", Number(e.target.value))}>
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>,
        )}
      </div>
      <div className="kj-form__row kj-form__row--two">
        {field("name", "Name", <input type="text" autoComplete="name" {...aria("name")} value={values.name} onChange={(e) => set("name", e.target.value)} />)}
        {field("email", "Email", <input type="email" autoComplete="email" {...aria("email")} value={values.email} onChange={(e) => set("email", e.target.value)} />)}
      </div>
      <button type="submit" className="kj-btn kj-btn--shu">
        Hold my seats
      </button>
    </form>
  );
}
