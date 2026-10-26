"use client";

import { FormEvent, useState } from "react";

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Enter a valid email to receive the starter scene."); return; }
    setError(""); setSent(true);
  }
  if (sent) return <div className="stl-form-success" aria-live="polite"><span className="stl-kicker">Scene unlocked</span><h3>Your WebGL starter is ready.</h3><p>Open your editor and begin with the same 2.4 KB shader core used above.</p></div>;
  return <form className="stl-form" onSubmit={submit} noValidate>
    <label htmlFor="stl-email">Work email</label>
    <div className="stl-form-row"><input id="stl-email" name="email" type="email" placeholder="you@studio.com" required aria-describedby={error ? "stl-email-error" : undefined} /><button className="stl-button stl-button--solid" type="submit">Get the starter <span aria-hidden="true">↗</span></button></div>
    {error && <p id="stl-email-error" className="stl-form-error" role="alert">{error}</p>}
    <p className="stl-form-note">No account, install or mailing list. The file stays in your browser.</p>
  </form>;
}
