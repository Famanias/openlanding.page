"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PACKAGES } from "../data";
import { Arrow, Lantern } from "../brand/Icons";
import { validateBrief, type Brief, type BriefErrors } from "./validate";
const EMPTY: Brief = { name: "", email: "", package: "unsure", story: "" };
export function CommissionForm() {
  const [brief, setBrief] = useState<Brief>(EMPTY);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const choose = (id: string | null | undefined) => { if (PACKAGES.some(item => item.id === id)) setBrief(current => ({ ...current, package: id! })); };
    choose(new URL(location.href).searchParams.get("commission"));
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-mh-package]");
      if (!link) return;
      event.preventDefault();
      choose(link.dataset.mhPackage);
      history.pushState(null, "", link.href);
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { if (status === "success") success.current?.focus({ preventScroll: true }); }, [status]);
  const update = (key: keyof Brief, value: string) => { setBrief(current => ({ ...current, [key]: value })); if (errors[key]) setErrors(current => ({ ...current, [key]: undefined })); };
  function submit(event: FormEvent) {
    event.preventDefault();
    if (status !== "idle") return;
    const next = validateBrief(brief); setErrors(next);
    if (Object.keys(next).length) {
      const key = Object.keys(next)[0]; form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus(); return;
    }
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 700);
  }
  const text = `Commission idea for Mio Hazuki\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\nCommission: ${PACKAGES.find(item => item.id === brief.package)?.name ?? "Not sure yet"}\n\n${brief.story.trim()}`;
  async function copyBrief() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  if (status === "success") return <div className="mh-form-success" ref={success} tabIndex={-1} role="status"><div className="mh-success-lantern"><Lantern/></div><h3>A small beginning.<br/>A world of possibilities.</h3><p>Your daydream is ready to share, {brief.name.trim()}.</p><p className="mh-form-disclaimer">This is a portfolio demo. Your message hasn&apos;t been sent or stored. Copy your brief below to keep it.</p><button className="mh-button mh-button-light" type="button" onClick={copyBrief}>{copied ? "Brief copied" : "Copy my commission brief"}<Arrow/></button>{copyError && <p className="mh-small">Copy isn&apos;t available in this browser. Select your brief below to save it.</p>}<details className="mh-brief-preview"><summary>Read my brief</summary><pre>{text}</pre></details><button className="mh-text-link" type="button" onClick={() => { setStatus("idle"); setCopied(false); setCopyError(false); setTimeout(() => form.current?.querySelector<HTMLElement>("input")?.focus(), 0); }}>Start another idea</button></div>;
  return <form className="mh-form" ref={form} onSubmit={submit} noValidate aria-label="Commission inquiry" aria-busy={status === "loading"}>
    <div className="mh-form-row"><div className="mh-field"><label htmlFor="mh-name">What should I call you?</label><input id="mh-name" name="name" autoComplete="name" placeholder="Your name" maxLength={100} value={brief.name} onChange={e => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "mh-name-error" : undefined} required/>{errors.name && <span className="mh-error" id="mh-name-error">{errors.name}</span>}</div><div className="mh-field"><label htmlFor="mh-email">Where can I find you?</label><input id="mh-email" name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" maxLength={254} value={brief.email} onChange={e => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "mh-email-error" : undefined} required/>{errors.email && <span className="mh-error" id="mh-email-error">{errors.email}</span>}</div></div>
    <div className="mh-field"><label htmlFor="mh-package">What are you dreaming of?</label><select id="mh-package" name="package" value={brief.package} onChange={e => update("package", e.target.value)} aria-invalid={Boolean(errors.package)} aria-describedby={errors.package ? "mh-package-error" : undefined}>{PACKAGES.map(item => <option key={item.id} value={item.id}>{item.name} — from ${item.price}</option>)}<option value="unsure">Not sure yet — let&apos;s figure it out</option></select>{errors.package && <span className="mh-error" id="mh-package-error">{errors.package}</span>}</div>
    <div className="mh-field"><label htmlFor="mh-story">Tell me a little about your idea</label><textarea id="mh-story" name="story" rows={4} maxLength={3000} placeholder="A character, a memory, a very specific kind of magic…" value={brief.story} onChange={e => update("story", e.target.value)} aria-invalid={Boolean(errors.story)} aria-describedby={errors.story ? "mh-story-error" : "mh-story-hint"} required/>{errors.story ? <span className="mh-error" id="mh-story-error">{errors.story}</span> : <span className="mh-field-hint" id="mh-story-hint">No perfect brief needed. Just a little spark.</span>}</div>
    <div className="mh-submit-row"><button className="mh-button mh-button-light" type="submit" disabled={status === "loading"}>{status === "loading" ? "Gathering your daydream…" : "Let's make a little magic"}<Arrow/></button><span>Made with care.<br/>Always, by a human.</span></div>
    <p className="mh-form-disclaimer">A working demo: this prepares your brief locally and doesn&apos;t send a message.</p>
  </form>;
}
