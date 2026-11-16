"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Ticket } from "../brand/Marks";
import { useJobKind, type QuoteKind } from "../work/JobKindProvider";
import { KINDS } from "../work/services";
import { EMPTY_FIELDS, firstInvalid, isValid, ticketNumber, validateEstimate, type EstimateErrors, type EstimateFields, type FieldName } from "./validation";

type Status = "idle" | "sending" | "sent";

const KIND_OPTIONS: { id: QuoteKind; label: string }[] = [...KINDS.map((kind) => ({ id: kind.id as QuoteKind, label: kind.label })), { id: "unsure", label: "Not sure" }];

const TEXT_FIELDS: { name: FieldName; label: string; type: string; autoComplete: string; required: boolean; half?: boolean }[] = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name", required: true, half: true },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name", required: true, half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", required: true, half: true },
  { name: "phone", label: "Mobile phone", type: "tel", autoComplete: "tel", required: true, half: true },
  { name: "company", label: "Company (optional)", type: "text", autoComplete: "organization", required: false },
];

/**
 * The estimate request. Validation is local, there is no network call, and "sending" is a short timer so the
 * button can show its loading state before the ticket drops in. The kind of work arrives from the work tabs.
 */
export function EstimateForm() {
  const { kind, setKind } = useJobKind();
  const [fields, setFields] = useState<EstimateFields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<EstimateErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [shake, setShake] = useState(0);
  const form = useRef<HTMLFormElement | null>(null);
  const done = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== "sending") return;
    const timer = window.setTimeout(() => setStatus("sent"), 800);
    return () => window.clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (status === "sent") done.current?.focus();
  }, [status]);

  const update = (name: FieldName, value: string) => {
    setFields((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status !== "idle") return;
    const found = validateEstimate(fields);
    setErrors(found);
    if (!isValid(found)) {
      setShake((count) => count + 1);
      const first = firstInvalid(found);
      if (first) form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
  };

  const reset = () => {
    setFields(EMPTY_FIELDS);
    setErrors({});
    setKind("unsure");
    setStatus("idle");
  };

  const kindLabel = KIND_OPTIONS.find((option) => option.id === kind)?.label ?? "Not sure";

  return (
    <div className="tv-form-shell" data-status={status} data-tv-form>
      <form ref={form} className="tv-form" onSubmit={onSubmit} noValidate aria-label="Request a free estimate" inert={status === "sent"}>
        <fieldset className="tv-kinds">
          <legend className="tv-label tv-gauge">What kind of work?</legend>
          <div className="tv-kind-row">
            {KIND_OPTIONS.map((option) => (
              <label key={option.id} className="tv-kind">
                <input type="radio" name="kind" value={option.id} checked={kind === option.id} onChange={() => setKind(option.id)} />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {TEXT_FIELDS.map((field) => {
          const error = errors[field.name];
          return (
            <div key={field.name} className="tv-field" data-half={field.half} data-invalid={Boolean(error)} data-shake={error ? shake % 2 : undefined}>
              <label className="tv-label tv-gauge" htmlFor={`tv-${field.name}`}>
                {field.label}
                {field.required ? <span aria-hidden="true"> *</span> : null}
              </label>
              <input
                id={`tv-${field.name}`}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={fields[field.name]}
                onChange={(event) => update(field.name, event.target.value)}
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `tv-${field.name}-error` : undefined}
              />
              <p className="tv-error" id={`tv-${field.name}-error`} role={error ? "alert" : undefined}>
                {error ?? ""}
              </p>
            </div>
          );
        })}

        <div className="tv-field" data-invalid={Boolean(errors.comments)}>
          <label className="tv-label tv-gauge" htmlFor="tv-comments">
            What are we digging?
          </label>
          <textarea
            id="tv-comments"
            name="comments"
            rows={4}
            value={fields.comments}
            onChange={(event) => update("comments", event.target.value)}
            placeholder="30 by 40 basement, walkout on the south side, off County Road 12."
            aria-invalid={Boolean(errors.comments)}
            aria-describedby={errors.comments ? "tv-comments-error" : undefined}
          />
          <p className="tv-error" id="tv-comments-error" role={errors.comments ? "alert" : undefined}>
            {errors.comments ?? ""}
          </p>
        </div>

        <div className="tv-form-foot">
          <button type="submit" className="tv-btn tv-btn-dark tv-submit" data-busy={status === "sending"} aria-disabled={status !== "idle"}>
            <span className="tv-btn-label">{status === "sending" ? "Writing the ticket" : "Send my request"}</span>
            <span className="tv-busy" aria-hidden="true" />
          </button>
          <p className="tv-form-note">No obligation. Dale calls back within one working day.</p>
        </div>
      </form>

      <div ref={done} className="tv-done" role="status" tabIndex={-1} aria-hidden={status !== "sent"} data-tv-done>
        {status === "sent" ? (
          <>
            <Ticket check className="tv-done-ticket">
              Estimate request {ticketNumber(fields.phone)}
            </Ticket>
            <h3 className="tv-done-title">Ticket written, {fields.firstName.trim()}.</h3>
            <p className="tv-done-text">
              Dale will call {fields.phone.trim()} within one working day to set a time to walk the site.
            </p>
            <dl className="tv-done-list tv-gauge">
              <div>
                <dt>Work</dt>
                <dd>{kindLabel}</dd>
              </div>
              <div>
                <dt>Estimate</dt>
                <dd>Free</dd>
              </div>
            </dl>
            <button type="button" className="tv-btn tv-btn-ghost tv-btn-onlight" onClick={reset}>
              <span className="tv-btn-label">Send another</span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
