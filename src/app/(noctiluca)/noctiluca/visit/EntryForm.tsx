"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  LATE_PRICE_EUR,
  MAX_GUESTS,
  PRICE_EUR,
  entryTotal,
  isLateSlot,
  parseDay,
  slotsFor,
  validateEntry,
  type EntryDraft,
  type EntryErrors,
} from "./visit";

const EMPTY: EntryDraft = { date: "", slot: "", guests: "2", email: "" };
const ORDER: (keyof EntryDraft)[] = ["date", "slot", "guests", "email"];

function isoToday(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function longDay(value: string): string {
  const d = parseDay(value);
  return d ? d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }) : value;
}

/** Timed entry. Validates in the browser and holds the entry without a network request. */
export function EntryForm() {
  const id = useId();
  const [draft, setDraft] = useState<EntryDraft>(EMPTY);
  const [errors, setErrors] = useState<EntryErrors>({});
  const [held, setHeld] = useState<EntryDraft | null>(null);
  const [min, setMin] = useState<string | undefined>(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => setMin(isoToday()), []);

  const slots = slotsFor(draft.date);
  const guests = Number(draft.guests);
  const validGuests = Number.isInteger(guests) && guests >= 1 && guests <= MAX_GUESTS;
  const total = draft.slot && validGuests ? entryTotal(draft.date, draft.slot, guests) : null;
  const closed = draft.date !== "" && parseDay(draft.date)?.getDay() === 1;

  const set = (key: keyof EntryDraft, value: string) => {
    setDraft((d) => {
      const next = { ...d, [key]: value };
      if (key === "date" && !slotsFor(value).includes(d.slot)) next.slot = "";
      return next;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateEntry(draft);
    setErrors(found);
    const first = ORDER.find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setHeld(draft);
  };

  useEffect(() => {
    if (held) statusRef.current?.focus();
  }, [held]);

  if (held) {
    const n = Number(held.guests);
    return (
      <div className="nl-held">
        <p className="nl-held-text" role="status" tabIndex={-1} ref={statusRef}>
          Held: {n} {n === 1 ? "guest" : "guests"} on {longDay(held.date)} at {held.slot}, €
          {entryTotal(held.date, held.slot, n)} at the door. Tickets go to {held.email}.
        </p>
        <button
          type="button"
          className="nl-button"
          data-variant="ghost"
          onClick={() => {
            setHeld(null);
            setDraft(EMPTY);
          }}
        >
          Hold another entry
        </button>
      </div>
    );
  }

  const err = (key: keyof EntryDraft) =>
    errors[key] ? (
      <p className="nl-error" id={`${id}-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;
  const describedBy = (key: keyof EntryDraft) => (errors[key] ? `${id}-${key}-error` : undefined);

  return (
    <form className="nl-form" onSubmit={onSubmit} noValidate ref={formRef} aria-label="Timed entry">
      <div className="nl-field">
        <label htmlFor={`${id}-date`}>Day</label>
        <input
          id={`${id}-date`}
          data-field="date"
          type="date"
          min={min}
          value={draft.date}
          onChange={(e) => set("date", e.target.value)}
          aria-invalid={!!errors.date}
          aria-describedby={describedBy("date")}
        />
        {err("date")}
      </div>

      <fieldset className="nl-field nl-slots" aria-describedby={describedBy("slot")}>
        <legend>Entry time</legend>
        {draft.date === "" ? <p className="nl-hint-text">Pick a day to see the entry times.</p> : null}
        {closed ? <p className="nl-hint-text">The house is closed on Mondays.</p> : null}
        {slots.length > 0 ? (
          <div className="nl-slot-grid">
            {slots.map((slot, i) => (
              <label key={slot} className="nl-slot" data-late={isLateSlot(draft.date, slot)}>
                <input
                  type="radio"
                  name={`${id}-slot`}
                  value={slot}
                  checked={draft.slot === slot}
                  onChange={() => set("slot", slot)}
                  data-field={i === 0 ? "slot" : undefined}
                />
                <span>{slot}</span>
              </label>
            ))}
          </div>
        ) : (
          <input type="hidden" data-field="slot" tabIndex={-1} />
        )}
        {err("slot")}
      </fieldset>

      <div className="nl-form-row">
        <div className="nl-field nl-guests">
          <label htmlFor={`${id}-guests`}>Guests</label>
          <div className="nl-stepper">
            <button
              type="button"
              aria-label="One fewer guest"
              onClick={() => set("guests", String(Math.max(1, (validGuests ? guests : 2) - 1)))}
              disabled={validGuests && guests <= 1}
            >
              −
            </button>
            <input
              id={`${id}-guests`}
              data-field="guests"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_GUESTS}
              value={draft.guests}
              onChange={(e) => set("guests", e.target.value)}
              aria-invalid={!!errors.guests}
              aria-describedby={describedBy("guests")}
            />
            <button
              type="button"
              aria-label="One more guest"
              onClick={() => set("guests", String(Math.min(MAX_GUESTS, (validGuests ? guests : 1) + 1)))}
              disabled={validGuests && guests >= MAX_GUESTS}
            >
              +
            </button>
          </div>
          {err("guests")}
        </div>

        <div className="nl-field nl-email">
          <label htmlFor={`${id}-email`}>Email for the tickets</label>
          <input
            id={`${id}-email`}
            data-field="email"
            type="email"
            autoComplete="email"
            value={draft.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
          />
          {err("email")}
        </div>
      </div>

      <div className="nl-form-foot">
        <p className="nl-total" aria-live="polite">
          {total !== null
            ? `${guests} × €${isLateSlot(draft.date, draft.slot) ? LATE_PRICE_EUR : PRICE_EUR} = €${total}, paid at the door`
            : `€${PRICE_EUR} a guest · €${LATE_PRICE_EUR} late Fridays`}
        </p>
        <button type="submit" className="nl-button" data-variant="solid">
          Hold my entry
        </button>
      </div>
    </form>
  );
}
