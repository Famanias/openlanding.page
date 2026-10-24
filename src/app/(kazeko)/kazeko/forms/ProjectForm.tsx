"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateBrief, type Brief, type BriefErrors } from "./validation";
import { Arrow } from "../brand/Arrow";
import { BirdMark } from "../brand/Logo";
const empty: Brief = { name: "", email: "", story: "" };
export function ProjectForm() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (status === "success") success.current?.focus(); }, [status]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateBrief(brief);
    setErrors(next);
    const first = (Object.keys(next) as (keyof Brief)[])[0];
    if (first) { document.getElementById(`kz-${first}`)?.focus(); return; }
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 650);
  }
  function download() {
    const body = `STUDIO KAZEKO — PROJECT BRIEF\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\n\nThe story\n${brief.story.trim()}\n\nPrepared locally. Nothing was sent.`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "kazeko-project-brief.txt"; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="kz-form-shell" data-state={status}>
    {status === "success" ? <div className="kz-form-success" tabIndex={-1} ref={success} role="status"><BirdMark /><span className="kz-eyebrow">A FIRST PAGE, READY.</span><h3>Your story<br />has a beginning.</h3><p>Thanks, {brief.name.trim()}. Your brief is ready to keep. This demo prepares it on your device; nothing has been sent.</p><button className="kz-button kz-button-light" type="button" onClick={download}>Download your brief <Arrow /></button><button className="kz-text-link" type="button" onClick={() => { setStatus("idle"); setBrief(empty); setErrors({}); }}>Start another story</button></div> : <form className="kz-form" noValidate onSubmit={submit} aria-busy={status === "loading"}>
      <div className="kz-form-row">{([{ key: "name", label: "Your name", type: "text", complete: "name", max: 100 }, { key: "email", label: "Email address", type: "email", complete: "email", max: 254 }] as const).map(({ key, label, type, complete, max }) => <div className="kz-field" key={key} data-invalid={Boolean(errors[key])}><input id={`kz-${key}`} type={type} autoComplete={complete} maxLength={max} placeholder=" " value={brief[key]} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `kz-${key}-error` : undefined} onChange={(e) => { setBrief({ ...brief, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: undefined }); }} /><label htmlFor={`kz-${key}`}>{label}</label>{errors[key] && <span id={`kz-${key}-error`} className="kz-field-error">{errors[key]}</span>}</div>)}</div>
      <div className="kz-field kz-field-story" data-invalid={Boolean(errors.story)}><textarea id="kz-story" rows={3} placeholder=" " maxLength={2000} required value={brief.story} aria-invalid={Boolean(errors.story)} aria-describedby={errors.story ? "kz-story-error" : undefined} onChange={(e) => { setBrief({ ...brief, story: e.target.value }); if (errors.story) setErrors({ ...errors, story: undefined }); }} /><label htmlFor="kz-story">What’s the story you’d like to tell?</label>{errors.story && <span id="kz-story-error" className="kz-field-error">{errors.story}</span>}</div>
      <div className="kz-form-bottom"><p>A seed of an idea is plenty.<br />Let’s see where it goes.</p><button className="kz-button kz-button-light" type="submit" disabled={status === "loading"}><span>{status === "loading" ? "Gathering your thoughts…" : "Start a conversation"}</span><Arrow diagonal /></button></div>
      <p className="kz-form-note">Demo form — prepares a downloadable brief. Nothing is sent or stored.</p>
    </form>}
  </div>;
}
