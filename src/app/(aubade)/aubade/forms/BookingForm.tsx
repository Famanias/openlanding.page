"use client";

import { useEffect, useId, useRef, useState } from "react";
import { BERTHS, berthById, formatEuro } from "../content/berths";
import { allDepartures, DEPARTURE_MONTHS, departureLabel, departuresIn } from "../content/departures";
import { cabinFor, fareFor, isValid, NOTES_MAX, ticketNumber, validateBooking, type BookingErrors, type BookingField, type BookingInput } from "./booking";
import { Ticket } from "./Ticket";

const DEPARTURES = allDepartures();
const ON_SALE = new Set(DEPARTURES.filter((d) => d.status !== "complet").map((d) => d.id));
const FIRST_OPEN = DEPARTURES.find((d) => d.status !== "complet")?.id ?? "";
const ORDER: BookingField[] = ["departure", "berth", "guests", "name", "email", "notes"];

const INITIAL: BookingInput = { departure: FIRST_OPEN, berth: "cabine", guests: "2", name: "", email: "", notes: "" };

type Phase = "idle" | "loading" | "success";

export function BookingForm() {
  const uid = useId();
  const [values, setValues] = useState<BookingInput>(INITIAL);
  const [errors, setErrors] = useState<BookingErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (field: BookingField, value: string) => {
    const next = { ...values, [field]: value };
    if (field === "berth" && berthById(value)?.maxGuests === 1) next.guests = "1";
    setValues(next);
    if (submitted) setErrors(validateBooking(next, ON_SALE));
  };

  // "Choose this berth" and "Reserve" links elsewhere on the page pre-fill the form.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-berth], [data-departure]");
      if (!el) return;
      setPhase((p) => (p === "success" ? "idle" : p));
      setValues((v) => {
        const next = { ...v };
        if (el.dataset.berth) {
          next.berth = el.dataset.berth;
          if (berthById(next.berth)?.maxGuests === 1) next.guests = "1";
        }
        if (el.dataset.departure && ON_SALE.has(el.dataset.departure)) next.departure = el.dataset.departure;
        return next;
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (phase === "success") successRef.current?.focus();
  }, [phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const errs = validateBooking(values, ON_SALE);
    setErrors(errs);
    if (!isValid(errs)) {
      setShake((n) => n + 1);
      const first = ORDER.find((f) => errs[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    const live = document.documentElement.dataset.auMotion === "live";
    window.setTimeout(() => setPhase("success"), live ? 1300 : 200);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  const berth = berthById(values.berth);
  const departure = DEPARTURES.find((d) => d.id === values.departure);
  const fare = formatEuro(fareFor(values.berth));
  const issued = phase === "success";
  const seat = issued ? cabinFor(values.berth, values.departure, values.email) : null;

  const err = (f: BookingField) =>
    errors[f] ? (
      <p className="au-error" id={`${uid}-${f}-err`}>
        {errors[f]}
      </p>
    ) : null;
  const a11y = (f: BookingField) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
  });
  const groupA11y = (f: BookingField) => ({ "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined });
  const fieldState = (f: BookingField) => (errors[f] ? "invalid" : submitted ? "valid" : "idle");

  return (
    <div className="au-reserve__grid" data-phase={phase}>
      <div className="au-reserve__ticket">
        <Ticket
          departure={departure ? departureLabel(departure) : ""}
          berth={berth?.name ?? ""}
          seat={seat ? `${seat.voiture} · ${seat.cabine}` : berth ? `${berth.voiture} · —` : "—"}
          guests={values.guests}
          fare={fare}
          name={values.name.trim()}
          number={issued ? ticketNumber(values.departure, values.email) : "AU-····-····"}
          issued={issued}
        />
      </div>

      <div className="au-reserve__panel">
        {phase !== "success" ? (
          <form ref={formRef} className="au-form" noValidate onSubmit={onSubmit} data-shake={shake % 2 ? "a" : "b"} aria-busy={phase === "loading"}>
            <div className="au-form__row" data-reveal="rise" style={{ "--i": 0 } as React.CSSProperties} data-field={fieldState("departure")}>
              <label className="au-form__label" htmlFor={`${uid}-departure`}>
                Departure
              </label>
              <div className="au-select">
                <select id={`${uid}-departure`} name="departure" value={values.departure} onChange={(e) => set("departure", e.target.value)} {...a11y("departure")}>
                  <option value="">Choose a night</option>
                  {DEPARTURE_MONTHS.map((m) => (
                    <optgroup key={m.label} label={`${m.label} ${m.year}`}>
                      {departuresIn(m.year, m.month).map((d) => (
                        <option key={d.id} value={d.id} disabled={d.status === "complet"}>
                          {departureLabel(d)} · {d.status === "complet" ? "complet" : `${d.berthsLeft} berths left`}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              {err("departure")}
            </div>

            <fieldset className="au-form__row" data-reveal="rise" style={{ "--i": 1 } as React.CSSProperties} data-field={fieldState("berth")} {...groupA11y("berth")}>
              <legend className="au-form__label">Berth</legend>
              <div className="au-choices">
                {BERTHS.map((b) => (
                  <label key={b.id} className="au-choice">
                    <input type="radio" name="berth" value={b.id} checked={values.berth === b.id} onChange={() => set("berth", b.id)} />
                    <span className="au-choice__box">
                      <span className="au-choice__voiture">Voiture {b.voiture}</span>
                      <span className="au-choice__name">{b.name}</span>
                      <span className="au-choice__price">{formatEuro(b.price)}</span>
                    </span>
                  </label>
                ))}
              </div>
              {err("berth")}
            </fieldset>

            <fieldset className="au-form__row" data-reveal="rise" style={{ "--i": 2 } as React.CSSProperties} data-field={fieldState("guests")} {...groupA11y("guests")}>
              <legend className="au-form__label">Guests</legend>
              <div className="au-segment">
                {["1", "2"].map((g) => (
                  <label key={g} className="au-segment__opt">
                    <input
                      type="radio"
                      name="guests"
                      value={g}
                      checked={values.guests === g}
                      disabled={g === "2" && berth?.maxGuests === 1}
                      onChange={() => set("guests", g)}
                    />
                    <span>{g === "1" ? "One guest" : "Two guests"}</span>
                  </label>
                ))}
              </div>
              {err("guests")}
            </fieldset>

            <div className="au-form__pair">
              <div className="au-form__row au-float" data-reveal="rise" style={{ "--i": 3 } as React.CSSProperties} data-field={fieldState("name")}>
                <input id={`${uid}-name`} name="name" autoComplete="name" placeholder=" " value={values.name} onChange={(e) => set("name", e.target.value)} {...a11y("name")} />
                <label htmlFor={`${uid}-name`}>Name for the cabin door</label>
                <span className="au-float__line" aria-hidden="true" />
                <svg className="au-float__check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {err("name")}
              </div>
              <div className="au-form__row au-float" data-reveal="rise" style={{ "--i": 4 } as React.CSSProperties} data-field={fieldState("email")}>
                <input id={`${uid}-email`} name="email" type="email" autoComplete="email" placeholder=" " value={values.email} onChange={(e) => set("email", e.target.value)} {...a11y("email")} />
                <label htmlFor={`${uid}-email`}>Email for the ticket</label>
                <span className="au-float__line" aria-hidden="true" />
                <svg className="au-float__check" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                {err("email")}
              </div>
            </div>

            <div className="au-form__row au-float au-float--area" data-reveal="rise" style={{ "--i": 5 } as React.CSSProperties} data-field={errors.notes ? "invalid" : "idle"}>
              <textarea id={`${uid}-notes`} name="notes" rows={3} placeholder=" " value={values.notes} onChange={(e) => set("notes", e.target.value)} {...a11y("notes")} />
              <label htmlFor={`${uid}-notes`}>Anything we should know? (optional)</label>
              <span className="au-float__line" aria-hidden="true" />
              <span className="au-form__count" data-over={values.notes.length > NOTES_MAX}>
                {values.notes.length}/{NOTES_MAX}
              </span>
              {err("notes")}
            </div>

            <div className="au-form__submit" data-reveal="rise" style={{ "--i": 6 } as React.CSSProperties}>
              <button type="submit" className="au-btn au-btn--claret au-btn--submit" data-loading={phase === "loading"} disabled={phase === "loading"}>
                <span className="au-btn__idle">
                  Reserve a berth · <span className="au-tabular">{fare}</span>
                </span>
                <span className="au-btn__busy" aria-hidden={phase !== "loading"}>
                  Coupling the carriages
                  <span className="au-btn__track">
                    <span />
                  </span>
                </span>
              </button>
              <p className="au-form__fine">No payment now. We hold the cabin for 48 hours.</p>
            </div>
          </form>
        ) : (
          <div className="au-success" ref={successRef} tabIndex={-1} role="status">
            <p className="au-eyebrow">Ticket issued · {ticketNumber(values.departure, values.email)}</p>
            <h3 className="au-success__title">
              <span className="au-mask au-success__mask">
                <span>Your berth is held,</span>
              </span>
              <span className="au-mask au-success__mask" style={{ "--d": "120ms" } as React.CSSProperties}>
                <span>{values.name.trim().split(" ")[0]}.</span>
              </span>
            </h3>
            <p className="au-success__body">
              {berth?.name}, Voiture {seat?.voiture}, Cabine {seat?.cabine}, on {departure && departureLabel(departure)}. Boarding opens at
              18:40 on quai 3. The ticket is on its way to {values.email.trim()}.
            </p>
            <button type="button" className="au-btn au-btn--ghost-dark" onClick={reset}>
              <span className="au-btn__roll">
                <span>Reserve another berth</span>
                <span aria-hidden="true">Reserve another berth</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
