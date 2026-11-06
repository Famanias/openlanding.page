"use client";

import { useState } from "react";
import { ArrowUpRight, Check, NavigationArrow } from "@phosphor-icons/react";

const companies = [
  "Linear",
  "Stripe",
  "Figma",
  "Anthropic",
  "Vercel",
  "Airbnb",
];

export function ConversionCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [employer, setEmployer] = useState("Anthropic");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address, such as you@domain.com.");
      return;
    }
    setError("");
    setSubmitted(true);
  }
  return (
    <section id="early-access" className="wyp-conversion wyp-chapter">
      <div className="wyp-container wyp-conversion-grid">
        <div>
          <p className="wyp-kicker">
            <NavigationArrow size={16} weight="fill" /> Your next chapter starts
            here
          </p>
          <h2>
            Give every outreach
            <br />
            conversation a<br />
            clear paper trail.
          </h2>
          <p className="wyp-conversion-copy">
            A little less scattered. A little more certain.
            <br />
            Make space for the work you want to do next.
          </p>
          {submitted ? (
            <div className="wyp-form-success" role="status">
              <Check size={20} />
              <div>
                <strong>Your early access preview is ready.</strong>
                <p>
                  {email.trim()} is confirmed in this local demo. No signup or
                  email has been sent.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="wyp-email-form">
              <label className="sr-only" htmlFor="early-access-email">
                Email address
              </label>
              <div>
                <input
                  id="early-access-email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? "early-access-error" : "early-access-note"
                  }
                  placeholder="Enter your personal work email"
                />
                <button type="submit">
                  Join early access <ArrowUpRight size={18} />
                </button>
              </div>
              {error && (
                <p id="early-access-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="wyp-form-note" id="early-access-note">
            Starter stays free. No credit card required.
            <br />
            Local demo only · No information is transmitted.
          </p>
        </div>
        <div className="wyp-destination">
          <span className="wyp-destination-route" aria-hidden="true" />
          <NavigationArrow
            className="wyp-destination-mark"
            size={36}
            weight="light"
          />
          <p>
            Where do you want
            <br />
            to go next?
          </p>
          <div className="wyp-employer-grid">
            {companies.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={employer === name}
                onClick={() => setEmployer(name)}
              >
                {name}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div className="wyp-employer-readout" role="status">
            Your next possibility: <strong>{employer}</strong>
          </div>
          <small>
            Illustrative destinations. No affiliation or endorsement.
          </small>
        </div>
      </div>
    </section>
  );
}
