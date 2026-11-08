"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRole } from "../bay/RoleProvider";
import { ROLE_LIST, type RoleId } from "../content/roles";
import { Magnetic } from "../motion/Magnetic";
import { briefAsText, briefReference, MESSAGE_MAX, validateContact, type ContactErrors, type ContactFields } from "./contact";

type Status = "idle" | "loading" | "success";

const FAKE_LATENCY_MS = 900;

export function ContactForm() {
  const { role } = useRole();
  const [fields, setFields] = useState<ContactFields>({ name: "", email: "", role: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState("");
  const roleTouched = useRef(false);
  const fieldRefs = useRef<Partial<Record<keyof ContactFields, HTMLElement | null>>>({});
  const timer = useRef<number>(0);

  // Until the visitor chooses, the form follows whichever jack the page is routed to.
  useEffect(() => {
    if (!roleTouched.current) setFields((current) => ({ ...current, role }));
  }, [role]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const update = <K extends keyof ContactFields>(key: K, value: ContactFields[K]) => {
    if (key === "role") roleTouched.current = true;
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const shake = (keys: (keyof ContactFields)[]) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const key of keys) {
      fieldRefs.current[key]?.closest(".pby-field")?.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(-3px)" }, { transform: "translateX(0)" }],
        { duration: 280, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
      );
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    const found = validateContact(fields);
    setErrors(found);
    const invalid = Object.keys(found) as (keyof ContactFields)[];
    if (invalid.length) {
      shake(invalid);
      fieldRefs.current[invalid[0]]?.focus();
      return;
    }
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      setReference(briefReference(fields));
      setStatus("success");
    }, FAKE_LATENCY_MS);
  };

  const download = () => {
    const url = URL.createObjectURL(new Blob([briefAsText(fields, reference)], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${reference}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    roleTouched.current = false;
    setFields({ name: "", email: "", role, message: "" });
    setErrors({});
    setStatus("idle");
  };

  const register = (key: keyof ContactFields) => (node: HTMLElement | null) => {
    fieldRefs.current[key] = node;
  };
  const describe = (key: keyof ContactFields) => (errors[key] ? `pby-err-${key}` : undefined);

  return (
    <div className="pby-form-stage" data-status={status}>
      <form className="pby-form" onSubmit={onSubmit} noValidate inert={status === "success"} aria-busy={status === "loading"}>
        <div className="pby-field" data-invalid={Boolean(errors.name)}>
          <input ref={register("name")} id="pby-name" name="name" autoComplete="name" placeholder=" " value={fields.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={describe("name")} />
          <label htmlFor="pby-name">Your name</label>
          {errors.name && (
            <p id="pby-err-name" className="pby-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="pby-field" data-invalid={Boolean(errors.email)}>
          <input ref={register("email")} id="pby-email" name="email" type="email" autoComplete="email" placeholder=" " value={fields.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={describe("email")} />
          <label htmlFor="pby-email">Email</label>
          {errors.email && (
            <p id="pby-err-email" className="pby-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div className="pby-field pby-field-select" data-invalid={Boolean(errors.role)}>
          <select ref={register("role")} id="pby-role" name="role" value={fields.role} onChange={(e) => update("role", e.target.value as RoleId | "")} aria-invalid={Boolean(errors.role)} aria-describedby={describe("role")}>
            <option value="" disabled>
              Chooseâ€¦
            </option>
            {ROLE_LIST.map((item) => (
              <option key={item.id} value={item.id}>
                {item.eyebrow}
              </option>
            ))}
          </select>
          <label htmlFor="pby-role">I need aâ€¦</label>
          {errors.role && (
            <p id="pby-err-role" className="pby-error" role="alert">
              {errors.role}
            </p>
          )}
        </div>
        <div className="pby-field pby-field-wide" data-invalid={Boolean(errors.message)}>
          <textarea ref={register("message")} id="pby-message" name="message" rows={5} placeholder=" " value={fields.message} onChange={(e) => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={describe("message")} />
          <label htmlFor="pby-message">What are you building?</label>
          <span className="pby-count pby-mono" aria-hidden="true">
            {fields.message.length}/{MESSAGE_MAX}
          </span>
          {errors.message && (
            <p id="pby-err-message" className="pby-error" role="alert">
              {errors.message}
            </p>
          )}
        </div>
        <Magnetic className="pby-field-wide">
          <button type="submit" className="pby-btn pby-btn-primary pby-submit" disabled={status === "loading"}>
            <span className="pby-btn-label">
              {status === "loading" ? "Routingâ€¦" : "Prepare my brief"}
            </span>
            <span className="pby-btn-arrow" aria-hidden="true">
              {status === "loading" ? <i className="pby-spinner" /> : "â†’"}
            </span>
          </button>
        </Magnetic>
      </form>

      <div className="pby-success" inert={status !== "success"} role="status" aria-live="polite">
        {status === "success" && (
          <>
            <svg className="pby-check" viewBox="0 0 48 48" aria-hidden="true" fill="none">
              <circle cx="24" cy="24" r="22" />
              <path d="M14 25 L21 32 L34 17" />
            </svg>
            <p className="pby-mono pby-success-ref">Ticket {reference}</p>
            <h3 className="pby-h3">Brief patched in.</h3>
            <p className="pby-lede">Nothing was sent. Download your brief and email it, or start another.</p>
            <div className="pby-cta-row">
              <button type="button" className="pby-btn pby-btn-primary" onClick={download}>
                <span className="pby-btn-label">
                  Download brief
                </span>
              </button>
              <button type="button" className="pby-btn pby-btn-ghost" onClick={reset}>
                <span className="pby-btn-label">
                  Start another
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
