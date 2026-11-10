"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { validateInquiry, type Inquiry, type InquiryErrors } from "./inquiry";

const EMPTY: Inquiry = { name: "", email: "", project: "" };
const subscribeToHydration = () => () => {};

export function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle");
  const interactive = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);

  const change = (field: keyof Inquiry, value: string) => { setValues((previous) => ({ ...previous, [field]: value })); setErrors((previous) => ({ ...previous, [field]: undefined })); };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("preparing");
    timer.current = window.setTimeout(() => setStatus("ready"), 450);
  };

  return status === "ready" ? <div className="fo-form-success" role="status"><span className="fo-form-success__stamp">PREPARED<br />LOCALLY</span><p className="fo-kicker">INQUIRY / 001</p><h3>Thank you, {values.name.trim()}.</h3><p>Your inquiry is ready as a local demonstration. It has not been sent.</p><button type="button" className="fo-text-link" onClick={() => setStatus("idle")}>Edit details ↗</button></div> :
    <form className="fo-form" onSubmit={submit} noValidate>
      <p className="fo-form__number fo-mono">PROJECT INQUIRY / 001</p>
      <fieldset disabled={!interactive || status === "preparing"}>
      <label htmlFor="fo-name">Name</label><input id="fo-name" name="name" value={values.name} onChange={(event) => change("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "fo-name-error" : undefined} maxLength={100} autoComplete="name" placeholder="Your name" />{errors.name && <p className="fo-error" id="fo-name-error">{errors.name}</p>}
      <label htmlFor="fo-email">Email</label><input id="fo-email" name="email" type="email" value={values.email} onChange={(event) => change("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "fo-email-error" : undefined} maxLength={254} autoComplete="email" placeholder="you@example.com" />{errors.email && <p className="fo-error" id="fo-email-error">{errors.email}</p>}
      <label htmlFor="fo-project">Project details</label><textarea id="fo-project" name="project" value={values.project} onChange={(event) => change("project", event.target.value)} aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "fo-project-error" : undefined} maxLength={2000} rows={3} placeholder="Tell us a little about the story." />{errors.project && <p className="fo-error" id="fo-project-error">{errors.project}</p>}
      <button className="fo-action fo-magnetic" data-pointer type="submit" disabled={status === "preparing"}>{status === "preparing" ? "Preparing…" : "Prepare inquiry"} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <noscript><p className="fo-form__disclaimer">Enable JavaScript to prepare this local demonstration. No information is sent.</p></noscript>
      <p className="fo-form__disclaimer">This is a portfolio demonstration. No message is sent.</p>
    </form>;
}
