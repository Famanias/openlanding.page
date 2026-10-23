"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check } from "../brand/Icons";
import { validateWalkthrough } from "./validate";

type Status = "idle" | "error" | "success";

export function NomiForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState({ name: "", email: "", students: "" });
  const emailRef = useRef<HTMLInputElement>(null);
  const set = (key: keyof typeof fields) => (e: { target: { value: string } }) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateWalkthrough(fields);
    if (!result.ok) {
      setMessage(result.message);
      setStatus("error");
      // Restart the shake when the same error repeats.
      const input = emailRef.current;
      if (input) {
        input.classList.remove("is-shake");
        void input.offsetWidth;
        input.classList.add("is-shake");
        input.focus();
      }
      return;
    }
    setMessage("");
    setStatus("success");
  };

  return (
    <div className="nm-form-wrap" data-status={status} data-nm-reveal="wipe">
      <div className="nm-tag" aria-hidden="true">
        <b>{fields.name.trim() || "Your studio"}</b>
        <span>{fields.email.trim() || "hello@yourstudio.com"}</span>
        <em data-on={fields.students !== ""}>{fields.students || "Students"}</em>
      </div>
      <div className="nm-tray">
        <form className="nm-form" data-endpoint="" data-status={status} onSubmit={submit} noValidate>
          <div className="nm-fields" inert={status === "success"}>
            <label>
              Your name
              <input name="name" autoComplete="name" required placeholder="Alex Morgan" value={fields.name} onChange={set("name")} />
            </label>
            <div className="nm-field">
              <label>
                Studio email
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="hello@yourstudio.com"
                  value={fields.email}
                  onChange={set("email")}
                  aria-invalid={status === "error" || undefined}
                  aria-describedby="nm-email-help"
                />
              </label>
              <p className="nm-help" id="nm-email-help" aria-live="polite" data-on={status === "error"}>{message}</p>
            </div>
            <label>
              Students you support
              <select name="students" value={fields.students} onChange={set("students")}>
                <option value="" disabled>Choose a range</option>
                <option>1–25</option>
                <option>26–75</option>
                <option>76+</option>
              </select>
            </label>
            <button className="nm-btn nm-btn--primary" type="submit">Request a walkthrough</button>
          </div>
          <div className="nm-success" role="status" aria-hidden={status !== "success"} data-on={status === "success"}>
            <span className="nm-check"><Check /></span>
            <h3>We’ll make room.</h3>
            <p>Nothing was sent: this template’s form is not connected yet.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
