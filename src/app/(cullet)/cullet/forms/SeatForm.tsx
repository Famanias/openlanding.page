"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { firstError, ROLES, seatNumber, starterFor, TEAMS, validate, type SeatErrors, type SeatRequest } from "./request";

type Phase = "idle" | "sending" | "done";

/**
 * The seat request. Validates on submit (fields that fail shake once and say why), then the button
 * turns to a cutting state, the form cleaves away and a glass check settles with the seat number.
 * No network request: this is a template.
 */
export function SeatForm() {
  const [req, setReq] = useState<SeatRequest>({ email: "", role: "", team: "" });
  const [errors, setErrors] = useState<SeatErrors>({});
  const [shake, setShake] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { if (phase === "done") doneRef.current?.focus(); }, [phase]);

  const set = (k: keyof SeatRequest, v: string) => {
    setReq((r) => ({ ...r, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    const found = validate(req);
    setErrors(found);
    const first = firstError(found);
    if (first) {
      setShake((n) => n + 1);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("sending");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(() => setPhase("done"), reduced ? 200 : 1100);
  };

  const reset = () => {
    setReq({ email: "", role: "", team: "" });
    setErrors({});
    setPhase("idle");
    window.setTimeout(() => formRef.current?.querySelector<HTMLElement>("input")?.focus(), 0);
  };

  return (
    <div className="fc-seat" data-phase={phase}>
      {phase !== "done" ? (
        <form ref={formRef} className="fc-seat__form" noValidate onSubmit={submit} aria-describedby="fc-seat-note">
          <div className="fc-field" data-invalid={!!errors.email || undefined} data-shake={errors.email ? shake : undefined}>
            <input id="fc-seat-email" name="email" type="email" autoComplete="email" placeholder=" " className="fc-field__input"
              value={req.email} onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? "fc-seat-email-err" : undefined} />
            <label htmlFor="fc-seat-email" className="fc-field__label">Work email</label>
            <p id="fc-seat-email-err" className="fc-field__err" role="alert">{errors.email ?? ""}</p>
          </div>

          <fieldset className="fc-field fc-field--chips" data-invalid={!!errors.role || undefined} data-shake={errors.role ? shake : undefined}
            aria-describedby={errors.role ? "fc-seat-role-err" : undefined}>
            <legend className="fc-field__legend">You&apos;ll use glass for</legend>
            <div className="fc-chips">
              {ROLES.map((r) => (
                <label key={r} className="fc-chip">
                  <input type="radio" name="role" value={r} checked={req.role === r} onChange={() => set("role", r)} className="fc-chip__input" />
                  <span className="fc-chip__label">{r}</span>
                </label>
              ))}
            </div>
            <p id="fc-seat-role-err" className="fc-field__err" role="alert">{errors.role ?? ""}</p>
          </fieldset>

          <div className="fc-field fc-field--select" data-invalid={!!errors.team || undefined} data-shake={errors.team ? shake : undefined}>
            <select id="fc-seat-team" name="team" className="fc-field__input" value={req.team} onChange={(e) => set("team", e.target.value)}
              aria-invalid={!!errors.team} aria-describedby={errors.team ? "fc-seat-team-err" : undefined} data-filled={!!req.team || undefined}>
              <option value="" disabled>Choose…</option>
              {TEAMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <label htmlFor="fc-seat-team" className="fc-field__label">Team size</label>
            <p id="fc-seat-team-err" className="fc-field__err" role="alert">{errors.team ?? ""}</p>
          </div>

          <button type="submit" className="fc-btn fc-btn--emerald fc-seat__submit" disabled={phase === "sending"}>
            <span className="fc-btn__label" data-text={phase === "sending" ? "Cutting your seat…" : "Request a seat"}><span>{phase === "sending" ? "Cutting your seat…" : "Request a seat"}</span></span>
            <span className="fc-seat__spinner" aria-hidden="true" />
          </button>
          <p id="fc-seat-note" className="fc-seat__note">Studio is free for 14 days. No card, and you can export everything you cut.</p>
        </form>
      ) : (
        <div ref={doneRef} className="fc-seat__done" tabIndex={-1} role="status" aria-live="polite">
          <svg className="fc-seat__check" viewBox="0 0 96 96" aria-hidden="true">
            <path className="fc-seat__shard" d="M16 38 46 12 82 30 74 80 26 84Z" />
            <path className="fc-seat__tick" pathLength={1} d="M32 50 44 62 66 36" />
          </svg>
          <p className="fc-seat__title">Your seat is cut.</p>
          <p className="fc-seat__meta">
            Seat <strong>No. {seatNumber(req.email)}</strong> · {req.team} · starts on <strong>{starterFor(req.role)}</strong>
          </p>
          <p className="fc-seat__body">The studio link is on its way to {req.email.trim()}. Open it on any browser with WebGL 2.</p>
          <button type="button" className="fc-link" onClick={reset}>Request another seat</button>
        </div>
      )}
    </div>
  );
}
