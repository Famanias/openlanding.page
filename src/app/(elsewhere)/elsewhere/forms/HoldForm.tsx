"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mark } from "../brand/Logo";
import { formatMoney, quote, staySummary } from "../stay/quote";
import { useStay } from "../stay/StayProvider";
import { NOTE_LIMIT, firstInvalid, hasErrors, holdReference, validateHold, type HoldErrors, type HoldFields } from "./validation";

type Phase = "idle" | "loading" | "success";

const EMPTY: HoldFields = { name: "", email: "", note: "" };

/**
 * The hold request. It validates on the client, shakes once on a bad submit, shows a short loading state and
 * then turns into a key tag. No request is made: the tag says so.
 */
export function HoldForm() {
  const { state } = useStay();
  const [fields, setFields] = useState<HoldFields>(EMPTY);
  const [errors, setErrors] = useState<HoldErrors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const [reference, setReference] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    if (phase === "success") tagRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const set = (key: keyof HoldFields) => (event: { target: { value: string } }) => {
    const next = { ...fields, [key]: event.target.value };
    setFields(next);
    // once a field has complained, re-check it as the visitor types
    if (errors[key]) setErrors((current) => ({ ...current, [key]: validateHold(next)[key] }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (phase !== "idle") return;
    const found = validateHold(fields);
    setErrors(found);
    if (hasErrors(found)) {
      setShake((count) => count + 1);
      const key = firstInvalid(found);
      if (key) formRef.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus();
      return;
    }
    setPhase("loading");
    setReference(holdReference(`${fields.email.trim().toLowerCase()}|${state.month}|${state.nights}|${state.guests}`));
    timer.current = window.setTimeout(() => setPhase("success"), 900);
  };

  const reset = () => {
    setFields(EMPTY);
    setErrors({});
    setPhase("idle");
  };

  const q = quote(state);
  const busy = phase === "loading";

  return (
    <div className="ew-hold" data-state={phase}>
      <form ref={formRef} className="ew-hold-form" onSubmit={onSubmit} noValidate aria-labelledby="ew-stay-title" inert={phase === "success"}>
        {/* two identical keyframes, alternated, so a second bad submit shakes again without remounting the inputs */}
        <div className="ew-fields" data-shake={shake > 0 ? (shake % 2 === 0 ? "a" : "b") : undefined}>
          <Field id="ew-name" name="name" label="Your name" value={fields.name} error={errors.name} autoComplete="name" onChange={set("name")} />
          <Field
            id="ew-email"
            name="email"
            type="email"
            label="Email for the lockbox code"
            value={fields.email}
            error={errors.email}
            autoComplete="email"
            onChange={set("email")}
          />
          <Field
            id="ew-note"
            name="note"
            label="Anything we should know (optional)"
            value={fields.note}
            error={errors.note}
            multiline
            hint={`${fields.note.length} / ${NOTE_LIMIT}`}
            onChange={set("note")}
          />
        </div>

        <button type="submit" className="ew-btn ew-btn-glow ew-hold-submit" data-busy={busy} aria-disabled={busy}>
          <span className="ew-btn-label">
            {busy ? "Checking the calendar" : "Request the key"}
          </span>
          <span className="ew-btn-arrow" aria-hidden="true" />
        </button>
        <p className="ew-fineprint">
          Holding {staySummary(state)}: {formatMoney(q.total)}. This form is a demonstration and sends nothing.
        </p>
      </form>

      <div className="ew-tag" ref={tagRef} tabIndex={-1} role="status" aria-live="polite" hidden={phase !== "success"}>
        {phase === "success" ? (
          <>
            <div className="ew-tag-card">
              <span className="ew-tag-hole" aria-hidden="true" />
              <Mark className="ew-tag-mark" />
              <p className="ew-post">Key tag · held, not booked</p>
              <p className="ew-tag-ref">{reference}</p>
              <p className="ew-tag-stay">{staySummary(state)}</p>
              <span className="ew-tag-stamp" aria-hidden="true">
                Held
              </span>
            </div>
            <h3 className="ew-display ew-tag-title">The light will be on, {fields.name.trim().split(/\s+/)[0]}.</h3>
            <p className="ew-tag-copy">
              In a real booking, the lockbox code would reach {fields.email.trim()} on the morning you leave. This is a template, so nothing was sent,
              stored or charged.
            </p>
            <button type="button" className="ew-link" onClick={reset}>
              Hold different dates
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

type FieldProps = {
  id: string;
  name: keyof HoldFields;
  label: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  hint?: string;
  onChange: (event: { target: { value: string } }) => void;
};

/** A floating-label field: the label rests in the box and rises when the field has focus or a value. */
function Field({ id, name, label, value, error, type = "text", autoComplete, multiline, hint, onChange }: FieldProps) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;
  const shared = {
    id,
    name,
    value,
    onChange,
    placeholder: " ",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
  };
  return (
    <div className="ew-field" data-invalid={Boolean(error)} data-filled={value.length > 0}>
      {multiline ? <textarea {...shared} rows={3} /> : <input {...shared} type={type} autoComplete={autoComplete} />}
      <label htmlFor={id}>{label}</label>
      <span className="ew-field-rule" aria-hidden="true" />
      {hint ? (
        <span className="ew-post ew-field-hint" id={`${id}-hint`}>
          {hint}
        </span>
      ) : null}
      <p className="ew-field-error" id={`${id}-error`} role={error ? "alert" : undefined}>
        {error ?? ""}
      </p>
    </div>
  );
}
