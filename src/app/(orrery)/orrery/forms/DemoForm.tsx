"use client";

import { useRef, useState, type FormEvent } from "react";
import { validateDemo, type DemoErrors, type DemoInput } from "./demo-form";

const FIELDS: { name: keyof DemoInput; label: string; type: string; autoComplete: string }[] = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Work email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company", type: "text", autoComplete: "organization" },
];

/** Demo request form. Validates in the browser and shows a success state; it never sends anything. */
export function DemoForm() {
  const [values, setValues] = useState<DemoInput>({ name: "", email: "", company: "" });
  const [errors, setErrors] = useState<DemoErrors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = validateDemo(values);
    setErrors(next);
    const firstInvalid = FIELDS.find((f) => next[f.name]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus();
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="orr-form orr-form--sent" role="status">
        <span className="orr-label orr-accent">Request received</span>
        <p className="orr-h3">Thanks — we&apos;ll be in touch within one working day.</p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="orr-form" onSubmit={onSubmit} noValidate>
      {FIELDS.map((f) => {
        const error = errors[f.name];
        const id = `demo-${f.name}`;
        return (
          <div key={f.name} className="orr-field" data-invalid={error ? "" : undefined}>
            <label htmlFor={id} className="orr-label">
              {f.label}
            </label>
            <input
              id={id}
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              value={values[f.name]}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              onChange={(e) => {
                setValues((v) => ({ ...v, [f.name]: e.target.value }));
                if (error) setErrors((x) => ({ ...x, [f.name]: undefined }));
              }}
            />
            {error ? (
              <p id={`${id}-error`} className="orr-field__error">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}
      <button type="submit" className="orr-btn orr-btn--solid orr-form__submit">
        Book a demo
      </button>
    </form>
  );
}
