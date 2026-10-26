"use client";
import { useEffect, useRef, useState } from "react";
import { validateSignup, type SignupErrors } from "./validation";
import { PROJECTS, projectById } from "../projects/model";
import { Arrow } from "../brand/Arrow";
import { DoorMark } from "../brand/Logo";
export function SignupForm() {
  const [errors, setErrors] = useState<SignupErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const receipt = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const selected = projectById(
      new URLSearchParams(location.search).get("path"),
    );
    if (selected) setPath(selected.id);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  useEffect(() => {
    if (status === "success") receipt.current?.focus();
  }, [status]);
  if (status === "success")
    return (
      <div className="fd-success" ref={receipt} tabIndex={-1} role="status">
        <DoorMark />
        <span className="fd-label">YOUR FIRST-DAY PREVIEW</span>
        <h3>You’re at the door, {name}.</h3>
        <p>
          {projectById(path)?.title ?? "A new possibility"} looks good on you.
          <br />
          Your next chapter starts with one small step.
        </p>
        <span className="fd-demo-note">
          Demo complete. No email was sent or enrollment created.
        </span>
        <button
          className="fd-text-link"
          onClick={() => {
            setStatus("idle");
            requestAnimationFrame(() =>
              form.current?.querySelector("input")?.focus(),
            );
          }}
        >
          Try another path <Arrow />
        </button>
      </div>
    );
  return (
    <form
      ref={form}
      className="fd-signup-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (status === "loading") return;
        const data = new FormData(event.currentTarget);
        const firstName = String(data.get("name") ?? "");
        const nextErrors = validateSignup(
          firstName,
          String(data.get("email") ?? ""),
        );
        setErrors(nextErrors);
        if (Object.keys(nextErrors).length) {
          requestAnimationFrame(() =>
            form.current
              ?.querySelector<HTMLElement>("[aria-invalid=true]")
              ?.focus(),
          );
          return;
        }
        setName(firstName.trim());
        setStatus("loading");
        timer.current = setTimeout(() => setStatus("success"), 650);
      }}
    >
      <div className="fd-form-row">
        <div className="fd-field">
          <label htmlFor="fd-name">Your first name</label>
          <input
            id="fd-name"
            name="name"
            autoComplete="given-name"
            placeholder="Alex"
            required
            maxLength={80}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "fd-name-error" : undefined}
          />
          {errors.name && (
            <p id="fd-name-error" className="fd-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="fd-field">
          <label htmlFor="fd-email">Your email</label>
          <input
            id="fd-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@somewhere.good"
            required
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "fd-email-error" : undefined}
          />
          {errors.email && (
            <p id="fd-email-error" className="fd-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>
      <div className="fd-field">
        <label htmlFor="fd-path">What are you curious about?</label>
        <select
          id="fd-path"
          name="path"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        >
          <option value="">A little bit of everything</option>
          {PROJECTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="fd-button"
        disabled={status === "loading"}
        aria-busy={status === "loading"}
      >
        {status === "loading"
          ? "Opening your next chapter…"
          : "Let’s find your first day"}
        <Arrow diagonal />
      </button>
      <p className="fd-form-note">
        A small step. No big commitment.
        <br />
        <span>Interactive demo only. Your details stay in this page.</span>
      </p>
      <noscript>
        <p>
          This preview form needs JavaScript. You can still explore every
          learning path and project on this page.
        </p>
      </noscript>
    </form>
  );
}
