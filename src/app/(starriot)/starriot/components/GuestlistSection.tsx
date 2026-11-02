"use client";

import React, { useState } from "react";
import { validateGuestlistSubmission } from "../utils/clubLogic";

interface GuestlistSectionProps {
  nightPreference?: string;
}

export function GuestlistSection({ nightPreference }: GuestlistSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [night, setNight] = useState(nightPreference || "friday-frequency");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [passCode, setPassCode] = useState("SR-NOVA-412");
  const [counter, setCounter] = useState(418);

  // Sync prop changes if nightPreference changes
  React.useEffect(() => {
    if (nightPreference) {
      setNight(nightPreference);
    }
  }, [nightPreference]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateGuestlistSubmission({
      name,
      email,
      nightPreference: night,
    });

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    if (result.passCode) {
      setPassCode(result.passCode);
    }
    setCounter((prev) => prev + 1);
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setErrors({});
    setSubmitted(false);
  };

  const nightLabels: Record<string, string> = {
    "friday-frequency": "Friday Frequency — House & Disco Edits",
    "saturday-starburst": "Saturday Starburst — Disco Classics Recharged",
    "sunday-slowburn": "Sunday Slowburn — Groove, Boogie & Soul",
    "all-nights": "All Weekend Supernova Pass",
  };

  return (
    <section id="guestlist" className="sr-conversion-section" aria-labelledby="conversion-heading">
      <div className="sr-container">
        <div className="sr-conversion-shell">
          <div>
            <div className="sr-kicker-label">
              <span>PRIORITY FLOOR ACCESS</span>
              <span className="sr-spark" aria-hidden="true">✦</span>
            </div>
            <h2 id="conversion-heading" className="sr-display-type sr-section-title" style={{ marginBottom: "1rem" }}>
              SAVE YOUR SPOT ON THE FLOOR.
            </h2>
            <p style={{ color: "var(--muted-lilac)", fontSize: "1.05rem", marginBottom: "1.5rem", maxWidth: "46ch" }}>
              Join the after-dark frequency for secret vinyl sets, early lineup drops, and instant guestlist pass
              generation for your crew.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginTop: "1.25rem" }}>
              <svg
                width="74"
                height="74"
                viewBox="0 0 100 100"
                className="sr-spin-vinyl"
                aria-hidden="true"
                style={{ flexShrink: 0 }}
              >
                <circle cx="50" cy="50" r="46" fill="#12041B" stroke="#30F0CC" strokeWidth="3" />
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="none"
                  stroke="#FC3CCC"
                  strokeWidth="2"
                  strokeDasharray="10 6"
                />
                <circle cx="50" cy="50" r="18" fill="#FCF03C" stroke="#12041B" strokeWidth="3" />
                <circle cx="50" cy="50" r="5" fill="#12041B" />
              </svg>
              <div style={{ fontSize: "0.84rem", fontWeight: 800, color: "var(--acid-lime)", letterSpacing: "0.1em" }}>
                ✦ <span id="guest-counter-num">{counter}</span> DANCERS ON THIS WEEKEND&apos;S DEMO LIST
              </div>
            </div>
          </div>

          <div>
            {/* Validated Guestlist Form */}
            {!submitted ? (
              <form id="guestlist-form" className="sr-guestlist-form" onSubmit={handleSubmit} noValidate>
                <div className="sr-form-group">
                  <label htmlFor="guest-name" className="sr-form-label">
                    Your Name or Floor Alias *
                  </label>
                  <input
                    type="text"
                    id="guest-name"
                    name="name"
                    className="sr-form-input"
                    placeholder="e.g. Nova Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <div
                    id="error-name"
                    className={`sr-form-error ${errors.name ? "sr-visible" : ""}`}
                    role="alert"
                  >
                    {errors.name || "Please enter your name or dance-floor alias (at least 2 characters)."}
                  </div>
                </div>

                <div className="sr-form-group">
                  <label htmlFor="guest-email" className="sr-form-label">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="guest-email"
                    name="email"
                    className="sr-form-input"
                    placeholder="you@afterglow.club"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div
                    id="error-email"
                    className={`sr-form-error ${errors.email ? "sr-visible" : ""}`}
                    role="alert"
                  >
                    {errors.email || "Please enter a valid email address (e.g. you@domain.com)."}
                  </div>
                </div>

                <div className="sr-form-group">
                  <label htmlFor="guest-night" className="sr-form-label">
                    Pick Your Night Frequency
                  </label>
                  <select
                    id="guest-night"
                    name="nightPreference"
                    className="sr-form-select"
                    value={night}
                    onChange={(e) => setNight(e.target.value)}
                  >
                    <option value="friday-frequency">Friday Frequency — House &amp; Disco Edits</option>
                    <option value="saturday-starburst">Saturday Starburst — Disco Classics Recharged</option>
                    <option value="sunday-slowburn">Sunday Slowburn — Groove, Boogie &amp; Soul</option>
                    <option value="all-nights">All Weekend Supernova Pass</option>
                  </select>
                </div>

                <button type="submit" className="sr-btn-neon-pill" style={{ width: "100%", marginTop: "0.5rem" }}>
                  <span>GENERATE DEMO CLUB PASS</span>
                  <span className="sr-btn-arrow" aria-hidden="true">↗</span>
                </button>

                <p style={{ fontSize: "0.74rem", color: "var(--muted-lilac)", marginTop: "0.85rem", textAlign: "center" }}>
                  DEMO PROTOTYPE — No backend or real mailing-list subscription is triggered.
                </p>
              </form>
            ) : (
              /* Demo Pass Confirmation Card */
              <div
                id="demo-pass-confirmation"
                className="sr-demo-pass-confirmation sr-visible"
                aria-live="polite"
              >
                <div className="sr-kicker-label" style={{ marginBottom: "0.4rem" }}>
                  <span>YOU&apos;RE ON THE DEMO LIST</span>
                  <span className="sr-spark" aria-hidden="true">✦</span>
                </div>
                <h3 className="sr-display-type" style={{ fontSize: "2rem", marginBottom: "0.5rem" }} id="pass-holder-heading">
                  WELCOME TO THE FLOOR, {name.toUpperCase()}!
                </h3>
                <p style={{ color: "var(--muted-lilac)", fontSize: "0.92rem", marginBottom: "1rem" }} id="pass-night-summary">
                  Selected Frequency: {nightLabels[night] || night}
                </p>
                <div
                  style={{
                    background: "var(--night-2)",
                    border: "1.5px solid var(--electric-mint)",
                    borderRadius: "12px",
                    padding: "0.85rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "var(--muted-lilac)" }}>PASS CODE</span>
                  <span
                    id="pass-code-value"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1rem",
                      fontWeight: 900,
                      color: "var(--acid-lime)",
                    }}
                  >
                    {passCode}
                  </span>
                </div>

                <div className="sr-demo-disclaimer-banner">
                  <strong>DEMO — connect your mailing-list service to enable subscriptions.</strong> This static
                  prototype generated a local preview pass only; no real ticket was issued or email sent.
                </div>

                <button
                  type="button"
                  id="reset-guestlist-btn"
                  className="sr-btn-outline-trace"
                  style={{ width: "100%", marginTop: "1.15rem" }}
                  onClick={handleReset}
                >
                  <span>ADD ANOTHER FRIEND TO THE LIST</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
