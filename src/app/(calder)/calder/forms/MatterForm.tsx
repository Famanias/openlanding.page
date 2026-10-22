"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Seal } from "../brand/Seal";
import { isLive } from "../motion/mode";
import { docketNumber, isValid, MATTER_OPTIONS, MESSAGE_MAX, validateMatter, type MatterErrors, type MatterField, type MatterInput } from "./matter";

const ORDER: MatterField[] = ["name", "email", "matter", "message"];
const INITIAL: MatterInput = { name: "", email: "", matter: "", message: "" };

type Phase = "idle" | "loading" | "success";

/**
 * "File a matter": validates on the client, shakes once on error, turns the button into a loading state, then the form
 * dissolves and the firm's seal presses down onto a docket number. Nothing is sent anywhere. The "Ask about this"
 * links on the matter cards pre-select the kind of matter through data-matter.
 */
export function MatterForm() {
  const uid = useId();
  const [values, setValues] = useState<MatterInput>(INITIAL);
  const [errors, setErrors] = useState<MatterErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (field: MatterField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateMatter(next));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-matter]");
      const matter = el?.dataset.matter;
      if (!matter || !MATTER_OPTIONS.includes(matter)) return;
      setPhase((p) => (p === "success" ? "idle" : p));
      setValues((v) => ({ ...v, matter }));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (phase === "success") doneRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const errs = validateMatter(values);
    setErrors(errs);
    if (!isValid(errs)) {
      setShake((n) => n + 1);
      const first = ORDER.find((f) => errs[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    window.setTimeout(() => setPhase("success"), isLive() ? 1300 : 200);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  const err = (f: MatterField) => (errors[f] ? `${uid}-${f}-err` : undefined);
  const docket = docketNumber(values);
  const firstName = values.name.trim().split(/\s+/)[0] || "there";

  return (
    <div className="cr-file__card" data-phase={phase}>
      <form ref={formRef} className="cr-form" noValidate onSubmit={onSubmit} data-shake={shake % 2} aria-hidden={phase === "success"} inert={phase === "success"}>
        <div className="cr-field" data-invalid={!!errors.name} data-filled={values.name ? "true" : "false"}>
          <input id={`${uid}-name`} name="name" className="cr-input" placeholder=" " autoComplete="name" value={values.name} aria-invalid={!!errors.name} aria-describedby={err("name")} onChange={(e) => set("name", e.target.value)} />
          <label htmlFor={`${uid}-name`}>Your name</label>
          {errors.name && (
            <p id={err("name")} className="cr-field__error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className="cr-field" data-invalid={!!errors.email} data-filled={values.email ? "true" : "false"}>
          <input id={`${uid}-email`} name="email" type="email" className="cr-input" placeholder=" " autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={err("email")} onChange={(e) => set("email", e.target.value)} />
          <label htmlFor={`${uid}-email`}>Email address</label>
          {errors.email && (
            <p id={err("email")} className="cr-field__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="cr-field cr-field--select" data-invalid={!!errors.matter} data-filled={values.matter ? "true" : "false"}>
          <select id={`${uid}-matter`} name="matter" className="cr-input" value={values.matter} aria-invalid={!!errors.matter} aria-describedby={err("matter")} onChange={(e) => set("matter", e.target.value)}>
            <option value="" disabled />
            {MATTER_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <label htmlFor={`${uid}-matter`}>Kind of matter</label>
          {errors.matter && (
            <p id={err("matter")} className="cr-field__error" role="alert">
              {errors.matter}
            </p>
          )}
        </div>

        <div className="cr-field cr-field--area" data-invalid={!!errors.message} data-filled={values.message ? "true" : "false"}>
          <textarea id={`${uid}-message`} name="message" className="cr-input" placeholder=" " rows={4} value={values.message} aria-invalid={!!errors.message} aria-describedby={err("message")} onChange={(e) => set("message", e.target.value)} />
          <label htmlFor={`${uid}-message`}>What are you facing?</label>
          <span className="cr-field__count" aria-hidden="true">
            {values.message.length}/{MESSAGE_MAX}
          </span>
          {errors.message && (
            <p id={err("message")} className="cr-field__error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <button type="submit" className="cr-submit" data-loading={phase === "loading"} disabled={phase === "loading"}>
          <span className="cr-submit__label">File this matter</span>
          <span className="cr-submit__busy" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cr-sr" aria-live="polite">
            {phase === "loading" ? "Filing your matter" : ""}
          </span>
        </button>
        <p className="cr-form__fine">General enquiries only. Sending this does not create an attorney-client relationship.</p>
      </form>

      <div ref={doneRef} className="cr-done" tabIndex={-1} aria-hidden={phase !== "success"} inert={phase !== "success"}>
        <div className="cr-done__seal">
          <Seal id="done" caption={docket} />
        </div>
        <h3 className="cr-done__title">Filed, {firstName}.</h3>
        <p className="cr-done__body">
          Your matter is on a partner&rsquo;s desk under <span className="cr-mono cr-done__docket">{docket}</span>. We will reply to {values.email.trim() || "your email"} within one business day.
        </p>
        <button type="button" className="cr-done__again" onClick={reset}>
          File another matter
        </button>
      </div>
    </div>
  );
}
