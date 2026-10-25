"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { KeepSlip } from "./KeepSlip";
import { COUNTRIES, EMPTY_REQUEST, ROLES, sheetNumber, validateRequest, type RequestErrors, type SheetRequest } from "./validation";

type Phase = "idle" | "sending" | "done";
const ORDER: (keyof SheetRequest)[] = ["name", "email", "street", "city", "country", "role"];

/** Request the printed contact sheet. Validates locally and "posts" without a network request. */
export function SheetRequestForm() {
  const [request, setRequest] = useState<SheetRequest>(EMPTY_REQUEST);
  const [errors, setErrors] = useState<RequestErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);
  const slipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (phase !== "sending") return;
    const timer = window.setTimeout(() => setPhase("done"), 1000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === "done") slipRef.current?.querySelector<HTMLElement>("[data-slip]")?.focus({ preventScroll: true });
  }, [phase]);

  const set = <K extends keyof SheetRequest>(key: K, value: SheetRequest[K]) => {
    setRequest((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const next = validateRequest(request);
    setErrors(next);
    const first = ORDER.find((key) => next[key]);
    if (first) {
      setShake((n) => n + 1);
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, [data-field="${first}"] select`)?.focus();
      return;
    }
    setPhase("sending");
  };

  const field = (key: keyof SheetRequest) => ({ "data-field": key, "data-invalid": errors[key] ? "true" : undefined, "data-shake": errors[key] ? shake % 2 : undefined });
  const describe = (key: keyof SheetRequest) => (errors[key] ? `cg-err-${key}` : undefined);
  const error = (key: keyof SheetRequest) => <p className="cg-field__error" id={`cg-err-${key}`} role={errors[key] ? "alert" : undefined}>{errors[key]}</p>;

  if (phase === "done") {
    return (
      <div ref={slipRef} className="cg-form-card" data-phase="done">
        <KeepSlip request={request} number={sheetNumber(request)} onEdit={() => setPhase("idle")} />
      </div>
    );
  }

  return (
    <div className="cg-form-card" data-phase={phase}>
      <form ref={formRef} className="cg-form" noValidate onSubmit={onSubmit} aria-describedby="cg-form-note">
        <div className="cg-form__row">
          <div className="cg-field" {...field("name")}>
            <input id="cg-name" autoComplete="name" placeholder=" " value={request.name} onChange={(e) => set("name", e.target.value)} aria-invalid={errors.name ? true : undefined} aria-describedby={describe("name")} />
            <label htmlFor="cg-name">Name</label>
            {error("name")}
          </div>
          <div className="cg-field" {...field("email")}>
            <input id="cg-email" type="email" autoComplete="email" placeholder=" " value={request.email} onChange={(e) => set("email", e.target.value)} aria-invalid={errors.email ? true : undefined} aria-describedby={describe("email")} />
            <label htmlFor="cg-email">Email</label>
            {error("email")}
          </div>
        </div>
        <div className="cg-field" {...field("street")}>
          <input id="cg-street" autoComplete="street-address" placeholder=" " value={request.street} onChange={(e) => set("street", e.target.value)} aria-invalid={errors.street ? true : undefined} aria-describedby={describe("street")} />
          <label htmlFor="cg-street">Street address</label>
          {error("street")}
        </div>
        <div className="cg-form__row">
          <div className="cg-field" {...field("city")}>
            <input id="cg-city" autoComplete="address-level2" placeholder=" " value={request.city} onChange={(e) => set("city", e.target.value)} aria-invalid={errors.city ? true : undefined} aria-describedby={describe("city")} />
            <label htmlFor="cg-city">City</label>
            {error("city")}
          </div>
          <div className="cg-field cg-field--select" {...field("country")}>
            <select id="cg-country" autoComplete="country-name" value={request.country} onChange={(e) => set("country", e.target.value)} aria-invalid={errors.country ? true : undefined} aria-describedby={describe("country")} data-filled={request.country ? "true" : "false"}>
              <option value="" disabled hidden />
              {COUNTRIES.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
            <label htmlFor="cg-country">Country</label>
            {error("country")}
          </div>
        </div>
        <fieldset className="cg-roles" {...field("role")} aria-describedby={describe("role")}>
          <legend className="cg-mono">Who is it for?</legend>
          <div className="cg-roles__list">
            {ROLES.map((role) => (
              <label key={role.id} className="cg-chip">
                <input type="radio" name="role" value={role.id} checked={request.role === role.id} onChange={() => set("role", role.id)} />
                <span>{role.label}</span>
              </label>
            ))}
          </div>
          {error("role")}
        </fieldset>
        <div className="cg-form__foot">
          <button type="submit" className="cg-button cg-button--solid cg-submit" data-state={phase} disabled={phase === "sending"}>
            <span className="cg-button__fill" aria-hidden="true" />
            <span className="cg-submit__label">Post me the sheet</span>
            <span className="cg-submit__busy" aria-hidden="true"><i />Exposing</span>
          </button>
          <p id="cg-form-note" className="cg-form__note">Free, while the run of 400 lasts. This demo form doesn&apos;t send anything.</p>
        </div>
        <p className="cg-sr" aria-live="polite">{phase === "sending" ? "Exposing the sheet" : ""}</p>
      </form>
    </div>
  );
}
