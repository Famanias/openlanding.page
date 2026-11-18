"use client";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Stamp } from "../brand/Stamp";
import { ButtonFace } from "../motion/Button";
import { REASONS, SPECIES_OPTIONS, bookingSummary, emptyBooking, nextDays, validateBooking, type Booking, type BookingErrors, type DayOption } from "./validation";

type Phase = "idle" | "sending" | "done";

/** Fired on success; the 3D ball (or its poster) listens and gets thrown. */
export const FETCH_EVENT = "snoot:fetch";

/**
 * "Fetch an appointment". Validates on blur and on submit (invalid fields shake once and their message
 * slides down), the button morphs to a loading state, then the form folds away and a dog tag drops in
 * with a wag and a stamp. No network request: this is a template.
 */
export function BookingForm() {
  const [values, setValues] = useState<Booking>(emptyBooking);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Booking, boolean>>>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [attempt, setAttempt] = useState(0);
  const [days, setDays] = useState<DayOption[]>([]);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // the visitor's own calendar, read after mount (the server doesn't know their date)
  useEffect(() => {
    const id = window.setTimeout(() => setDays(nextDays(new Date(), 5)), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (phase === "done") tagRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const set = (key: keyof Booking) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...values, [key]: event.target.value };
    setValues(next);
    if (touched[key] || errors[key]) setErrors((e) => ({ ...e, [key]: validateBooking(next)[key] }));
  };
  const blur = (key: keyof Booking) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    if (values[key]) setErrors((e) => ({ ...e, [key]: validateBooking(values)[key] }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const found = validateBooking(values);
    setErrors(found);
    setAttempt((a) => a + 1);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstBad}"]`)?.focus();
      return;
    }
    setPhase("sending");
    window.setTimeout(() => {
      setPhase("done");
      window.dispatchEvent(new CustomEvent(FETCH_EVENT));
    }, 900);
  };

  const reset = () => {
    setValues(emptyBooking());
    setErrors({});
    setTouched({});
    setPhase("idle");
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>('[name="petName"]')?.focus(), 50);
  };

  const field = (key: keyof Booking) => ({
    "data-invalid": errors[key] ? "true" : undefined,
    "data-shake": errors[key] ? attempt % 2 : undefined,
  });
  const describe = (key: keyof Booking) => (errors[key] ? { "aria-invalid": true as const, "aria-describedby": `sn-err-${key}` } : {});
  const message = (key: keyof Booking) => (
    <p className="sn-field-error" id={`sn-err-${key}`} data-show={Boolean(errors[key])} aria-live="polite">
      <span>{errors[key] ?? ""}</span>
    </p>
  );

  return (
    <div className="sn-booking" data-phase={phase}>
      <form ref={formRef} className="sn-form" noValidate onSubmit={submit} aria-label="Book an appointment" inert={phase === "done"}>
        <div className="sn-field sn-float" {...field("petName")}>
          <input id="sn-petName" name="petName" placeholder=" " autoComplete="off" value={values.petName} onChange={set("petName")} onBlur={blur("petName")} {...describe("petName")} />
          <label htmlFor="sn-petName">Pet&apos;s name</label>
          <svg className="sn-field-check" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
          {message("petName")}
        </div>

        <fieldset className="sn-field sn-chipset" {...field("species")}>
          <legend>Who are they?</legend>
          <div className="sn-chip-row">
            {SPECIES_OPTIONS.map((s) => (
              <label key={s.id} className="sn-chip">
                <input type="radio" name="species" value={s.id} checked={values.species === s.id} onChange={set("species")} {...describe("species")} />
                <span>{s.label}</span>
              </label>
            ))}
          </div>
          {message("species")}
        </fieldset>

        <div className="sn-field sn-select" {...field("reason")}>
          <label htmlFor="sn-reason">What&apos;s it for?</label>
          <select id="sn-reason" name="reason" value={values.reason} onChange={set("reason")} onBlur={blur("reason")} {...describe("reason")}>
            <option value="">Choose one</option>
            {REASONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          {message("reason")}
        </div>

        <fieldset className="sn-field sn-chipset" {...field("day")}>
          <legend>Which day?</legend>
          <div className="sn-chip-row sn-days" data-ready={days.length > 0}>
            {days.length
              ? days.map((d) => (
                  <label key={d.id} className="sn-chip sn-day">
                    <input type="radio" name="day" value={d.id} checked={values.day === d.id} onChange={set("day")} {...describe("day")} />
                    <span>
                      <small>{d.label}</small>
                      <b>{d.date}</b>
                      <small>{d.month}</small>
                    </span>
                  </label>
                ))
              : Array.from({ length: 5 }, (_, i) => <span key={i} className="sn-chip sn-day sn-day-wait" aria-hidden="true" />)}
          </div>
          {message("day")}
        </fieldset>

        <div className="sn-form-pair">
          <div className="sn-field sn-float" {...field("owner")}>
            <input id="sn-owner" name="owner" placeholder=" " autoComplete="name" value={values.owner} onChange={set("owner")} onBlur={blur("owner")} {...describe("owner")} />
            <label htmlFor="sn-owner">Your name</label>
            <svg className="sn-field-check" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {message("owner")}
          </div>
          <div className="sn-field sn-float" {...field("contact")}>
            <input id="sn-contact" name="contact" placeholder=" " autoComplete="email" value={values.contact} onChange={set("contact")} onBlur={blur("contact")} {...describe("contact")} />
            <label htmlFor="sn-contact">Email or phone</label>
            <svg className="sn-field-check" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
            {message("contact")}
          </div>
        </div>

        <button type="submit" className="sn-btn sn-submit" data-variant="pink" data-phase={phase} aria-busy={phase === "sending"} disabled={phase === "sending"}>
          <ButtonFace>{phase === "sending" ? "Fetching…" : "Fetch an appointment"}</ButtonFace>
          <span className="sn-submit-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>
        <p className="sn-form-note sn-chart">We text to confirm within the hour. Nothing is sent from this demo.</p>
      </form>

      <div className="sn-done" data-show={phase === "done"} inert={phase !== "done"}>
        <div className="sn-done-tag" ref={tagRef} tabIndex={-1} role="status" aria-label="Booking confirmed">
          <span className="sn-tag-hole" aria-hidden="true" />
          <p className="sn-chart">Appointment fetched</p>
          <p className="sn-done-name">{values.petName.trim() || "Your pet"}</p>
          <p className="sn-done-summary" data-sn-summary>
            {phase === "done" ? bookingSummary(values) : ""}
          </p>
          <p className="sn-done-next">We&apos;ll text {values.contact.trim() || "you"} with a time within the hour. Bring treats; we have spares.</p>
          <div className="sn-done-stamp">
            <Stamp id="sn-booked" top="BOOKED" bottom="SEE YOU SOON" />
          </div>
        </div>
        <button type="button" className="sn-link-btn" onClick={reset}>
          Book another pet
        </button>
      </div>
    </div>
  );
}
