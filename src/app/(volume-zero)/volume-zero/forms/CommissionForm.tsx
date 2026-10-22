"use client";

import { FormEvent, useState } from "react";
import { validateCommission, type CommissionValues } from "./validate-commission";

const initialValues: CommissionValues = { name: "", email: "", room: "", note: "" };

export function CommissionForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof CommissionValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof CommissionValues, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateCommission(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 420);
  };

  if (status === "success") {
    return <div className="vz-form vz-form__success" data-vz-success role="status"><span className="vz-form__success-mark" aria-hidden="true">✓</span><h3>Field reserved.</h3><p>Thanks, {values.name.trim()}. Your room brief is queued for the next listening session.</p><a className="vz-button vz-button--dark" href="#top" style={{ marginTop: 24 }}>Return to the field</a></div>;
  }

  return <form className="vz-form" onSubmit={submit} noValidate>
    <div className="vz-form__grid">
      <div className="vz-field"><label htmlFor="vz-name">Your name</label><input id="vz-name" name="name" autoComplete="name" value={values.name} onChange={(event) => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "vz-name-error" : undefined} placeholder="Mara / studio lead" />{errors.name && <span id="vz-name-error" className="vz-field__error">{errors.name}</span>}</div>
      <div className="vz-field"><label htmlFor="vz-email">Email</label><input id="vz-email" name="email" type="email" autoComplete="email" value={values.email} onChange={(event) => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "vz-email-error" : undefined} placeholder="mara@studio.example" />{errors.email && <span id="vz-email-error" className="vz-field__error">{errors.email}</span>}</div>
      <div className="vz-field vz-field--wide"><label htmlFor="vz-room">What are we tuning?</label><select id="vz-room" name="room" value={values.room} onChange={(event) => update("room", event.target.value)}><option value="">Choose a room type</option><option value="Listening room">Listening room</option><option value="Theatre or recital hall">Theatre or recital hall</option><option value="Archive or gallery">Archive or gallery</option></select></div>
      <div className="vz-field vz-field--wide"><label htmlFor="vz-note">First note <span aria-hidden="true">/ optional</span></label><textarea id="vz-note" name="note" value={values.note ?? ""} onChange={(event) => update("note", event.target.value)} placeholder="Tell us about the room, the seats, or the sound that should stay." /></div>
    </div>
    <button className="vz-button vz-button--fill vz-form__submit" type="submit" disabled={status === "loading"} aria-busy={status === "loading"}>{status === "loading" ? "Reserving field…" : "Send the brief"}</button>
    <p className="vz-form__status" aria-live="polite">{status === "loading" ? "Calibrating a response…" : "No network request. This is a local template interaction."}</p>
  </form>;
}
