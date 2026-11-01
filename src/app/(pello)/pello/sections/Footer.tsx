"use client";
import { useRef, useState } from "react";
import { Logo } from "../brand/Logo";
const policies = {
  privacy: { title: "A little privacy", copy: "Pello is a fictional interactive template. The sample planner runs in your browser. The welcome form shows a local confirmation and does not send your email, connect to accounts or store personal data. No analytics or advertising trackers are included in this template." },
  terms: { title: "A few clear terms", copy: "This is a creative product demonstration, not a bank, financial service or financial advice. All balances, stories and plans are fictional examples. No real money moves, no account is opened, and no subscription or payment is created." },
};
export function Footer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [policy, setPolicy] = useState<keyof typeof policies>("privacy");
  return <footer className="pel-footer"><div className="pel-container"><div className="pel-footer-top"><a href="/pello" aria-label="Pello home"><Logo/></a><p>Money for the life you want.</p><a className="pel-text-link" href="#main">Back to the beginning ↑</a></div><div className="pel-footer-word" aria-hidden="true">pello<span>·</span></div><div className="pel-footer-bottom"><span>© 2026 Pello. A fictional product concept.</span><div>{(["privacy", "terms"] as const).map(key=><a key={key} href={"#pel-"+key} onClick={event=>{event.preventDefault();setPolicy(key);dialog.current?.showModal();}}>{key === "privacy" ? "Privacy" : "Terms"}</a>)}</div></div><div className="pel-nojs pel-legal-fallback"><h3 id="pel-privacy">Privacy</h3><p>{policies.privacy.copy}</p><h3 id="pel-terms">Terms</h3><p>{policies.terms.copy}</p></div></div><dialog className="pel-legal" ref={dialog} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}><div><Logo mark/><h2>{policies[policy].title}</h2><p>{policies[policy].copy}</p><button className="pel-button" type="button" onClick={()=>dialog.current?.close()}><span>That’s clear <span aria-hidden="true">✓</span></span></button></div></dialog></footer>;
}
