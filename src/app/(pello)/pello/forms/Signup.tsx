"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUpRight, Check } from "@phosphor-icons/react/dist/ssr";
import { validateEmail } from "./validation";
import { getPlan, money } from "../allocator/model";
import { usePlan } from "../allocator/usePlan";
const subscribe = () => () => {};
export function Signup() {
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const { plan, goal } = usePlan();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const input = useRef<HTMLInputElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <div className="pel-signup-shell">{status === "success" ? <div className="pel-welcome" ref={success} tabIndex={-1} role="status"><span className="pel-welcome-check"><Check size={25} weight="bold"/></span><p className="pel-eyebrow">A LITTLE NEW BEGINNING</p><h3>Your next chapter<br/>starts with a little clarity.</h3><p>{getPlan(plan).label} · {money(goal)} for someday soon.</p><small>Preview prepared for {email.trim()}.<br/>This is a local demo. No email was sent or stored.</small><button className="pel-text-link" type="button" onClick={() => { setStatus("idle"); setEmail(""); requestAnimationFrame(() => input.current?.focus()); }}>Try a different beginning <ArrowUpRight size={16}/></button></div> : <form className="pel-signup" noValidate onSubmit={event => {
    event.preventDefault(); if (status === "loading") return;
    const issue = validateEmail(email); setError(issue);
    if (issue) { input.current?.focus(); return; }
    setStatus("loading");
    timer.current = setTimeout(() => { setStatus("success"); requestAnimationFrame(() => success.current?.focus()); }, 650);
  }}><p className="pel-signup-plan">Your starting point: <strong>{getPlan(plan).label}</strong></p><div className="pel-signup-row"><div className="pel-input-wrap" data-invalid={Boolean(error)}><input ref={input} id="pel-email" name="email" type="email" autoComplete="email" maxLength={254} placeholder=" " value={email} disabled={!hydrated || status === "loading"} onChange={event => { setEmail(event.target.value); if (error) setError(null); }} aria-invalid={Boolean(error)} aria-describedby={error ? "pel-email-error pel-email-note" : "pel-email-note"}/><label htmlFor="pel-email">Your email address</label></div><button className="pel-button" type="submit" disabled={!hydrated || status === "loading"} aria-busy={status === "loading"}><span>{status === "loading" ? "Making a little room…" : "Make room for what’s next"}<ArrowUpRight size={18} aria-hidden="true"/></span></button></div>{error && <p className="pel-form-error" id="pel-email-error" role="alert">{error}</p>}<p className="pel-form-note" id="pel-email-note">A free, local preview. Your email stays right here.</p><p className="pel-nojs">This interactive preview needs JavaScript. You can still explore the complete balanced example above.</p></form>}</div>;
}
