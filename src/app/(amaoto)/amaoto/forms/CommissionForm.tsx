"use client";
import { useState } from "react";
import { validateCommission } from "./validation";

export function CommissionForm({ canopy }: { canopy: string }) {
  const [fields, setFields] = useState({ name: "", email: "", occasion: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  if (sent) return <div className="am-success" role="status"><span className="am-kicker">雨音 / received</span><h3>Your umbrella is on the bench.</h3><p>We saved your {canopy} canopy request. Amaoto will write within one working day.</p></div>;
  return <form className="am-form" onSubmit={(event) => { event.preventDefault(); const next = validateCommission(fields); setErrors(next); if (!Object.keys(next).length) setSent(true); }} noValidate>
    <label>Name<input value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
    <label>Email<input type="email" value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
    <label>Occasion<input value={fields.occasion} onChange={(e) => setFields({ ...fields, occasion: e.target.value })} aria-invalid={Boolean(errors.occasion)} />{errors.occasion && <small>{errors.occasion}</small>}</label>
    <button type="submit" className="am-button am-button--red">Reserve a commission <span>↗</span></button>
  </form>;
}
