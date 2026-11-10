"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateInquiry, type InquiryErrors } from "./validation";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [state, setState] = useState<"idle" | "preparing" | "success">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state !== "idle") return;
    const nextErrors = validateInquiry({ name, email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setState("preparing");
    timer.current = setTimeout(() => setState("success"), 450);
  };

  if (state === "success") return <div className="ar-form-success" role="status"><span aria-hidden="true">✓</span><div><strong>Your demo request is ready.</strong><p>This is a local preview and has not been sent or saved.</p><button type="button" onClick={() => { setName(""); setEmail(""); setErrors({}); setState("idle"); }}>Prepare another ↗</button></div></div>;

  return <form className="ar-form" noValidate onSubmit={submit}>
    <div className="ar-form__field"><label htmlFor="ar-name">Your name</label><input id="ar-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "ar-name-error" : undefined} placeholder="Your name" maxLength={100} />{errors.name && <p id="ar-name-error" role="alert">{errors.name}</p>}</div>
    <div className="ar-form__field"><label htmlFor="ar-email">Work email</label><input id="ar-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "ar-email-error" : undefined} placeholder="you@company.com" maxLength={254} />{errors.email && <p id="ar-email-error" role="alert">{errors.email}</p>}</div>
    <button className="ar-action ar-form__submit" type="submit" disabled={state === "preparing"}><span>{state === "preparing" ? "Preparing preview…" : "Prepare demo request"}</span><span className="ar-action__arrow" aria-hidden="true">↗</span></button>
    <p className="ar-form__disclaimer">A local preview only. Your information is not sent or saved.</p>
  </form>;
}
