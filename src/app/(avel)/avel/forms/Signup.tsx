"use client";
import { useState } from "react";
import { isValidEmail } from "./validation";

export function Signup() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) { setError(true); return; }
    setError(false); setSuccess(true);
  }
  if (success) return <div className="avl-form-success" role="status"><span>✳</span><div><strong>Here’s to good thinking.</strong><p>This is a template demo. No email was sent or stored.</p><button type="button" onClick={() => { setSuccess(false); setEmail(""); }}>Try another email ↗</button></div></div>;
  return <form className="avl-form" onSubmit={submit} noValidate><label className="avl-sr-only" htmlFor="avl-email">Email address</label><input id="avl-email" type="email" autoComplete="email" placeholder="Your email address" value={email} onChange={(e) => { setEmail(e.target.value); setError(false); }} aria-invalid={error} aria-describedby={error ? "avl-email-error" : "avl-demo-note"}/><button className="avl-btn avl-btn-dark" type="submit">Get started <span>↗</span></button>{error && <p id="avl-email-error" className="avl-error" role="alert">Please enter a valid email address.</p>}<p id="avl-demo-note" className="avl-form-note">A little preview only. No account will be created.</p></form>;
}
