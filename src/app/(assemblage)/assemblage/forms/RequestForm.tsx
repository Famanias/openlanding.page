"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { validateRequest, type RequestValues } from "./request";

const initial: RequestValues = { name: "", email: "", company: "", note: "" };

export function RequestForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ReturnType<typeof validateRequest>>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) successRef.current?.focus();
  }, [sent]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateRequest(values);
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  const update = (field: keyof RequestValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((current) => ({ ...current, [field]: event.target.value }));
  return <div className="as-form-shell" data-state={sent ? "success" : "idle"}>
    <form className="as-form as-form-fields" onSubmit={submit} noValidate aria-hidden={sent}>
      <div className="as-form-heading"><span className="as-mono">Material study / 01</span><p>Leave the useful bits. We do not need a polished brief.</p></div>
      <label>Name<input value={values.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" />{errors.name && <span className="as-error" id="name-error">{errors.name}</span>}</label>
      <label>Work email<input type="email" value={values.email} onChange={update("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" />{errors.email && <span className="as-error" id="email-error">{errors.email}</span>}</label>
      <label>Company<input value={values.company} onChange={update("company")} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} autoComplete="organization" />{errors.company && <span className="as-error" id="company-error">{errors.company}</span>}</label>
      <label>What are you making?<textarea rows={3} value={values.note} onChange={update("note")} placeholder="A sentence is enough." /></label>
      <button className="as-button as-button--primary" type="submit">Request a study <span aria-hidden="true">???</span></button>
      <p className="as-form-foot">No mailing list. No sales sequence. Just a reply from a person.</p>
    </form>
    <div ref={successRef} tabIndex={-1} className="as-form as-form-success" role="status" aria-live="polite" aria-hidden={!sent} inert={!sent}>
      <span className="as-success-mark">???</span><p className="as-kicker">Request received</p><h3>We will bring a useful first question.</h3><p>Thanks, {values.name.split(" ")[0] || "there"}. We will write to {values.email} within two working days.</p><a className="as-text-link" href="#top">Back to the top <span aria-hidden="true">???</span></a>
    </div>
  </div>;
}
