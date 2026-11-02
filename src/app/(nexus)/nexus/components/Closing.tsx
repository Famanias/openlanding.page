"use client";

import { useState } from "react";
import {
  buildMailtoUrl,
  formatBriefSummary,
  validateBriefInput,
  type BriefInput,
} from "../model/agencyLogic";

const AVAILABLE_SCOPES = [
  "Brand Strategy",
  "Campaign Creative",
  "Social & Editorial",
  "Web & Experiences",
];

export function Closing() {
  const [scopes, setScopes] = useState<string[]>(["Brand Strategy"]);
  const [formData, setFormData] = useState<BriefInput>({
    name: "",
    email: "",
    company: "",
    scopes: ["Brand Strategy"],
    message: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string>("#");
  const [copied, setCopied] = useState(false);

  const toggleScope = (scope: string) => {
    setScopes((prev) => {
      const next = prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope];
      setFormData((f) => ({ ...f, scopes: next }));
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateBriefInput({ ...formData, scopes });
    setErrors(result.errors);

    if (result.valid) {
      const summary = formatBriefSummary({ ...formData, scopes });
      setSubmittedSummary(summary);
      setMailtoUrl(buildMailtoUrl({ ...formData, scopes }));
    } else {
      setSubmittedSummary(null);
    }
  };

  const handleCopy = () => {
    if (!submittedSummary) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(submittedSummary).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="nx-closing" id="contact" aria-labelledby="closing-heading">
      <div className="nx-container">
        <div className="nx-closing-grid">
          <div data-reveal>
            <span className="nx-kicker">06 · Start a Conversation</span>
            <h2 className="nx-closing-title" id="closing-heading">
              Let’s make something people <span>feel.</span>
            </h2>
            <p
              style={{
                fontSize: "1.18rem",
                color: "var(--ink-muted)",
                maxWidth: "46ch",
                margin: "0 0 2rem 0",
              }}
            >
              Whether you are planting a brand from scratch or helping an established story bloom
              again, our table is open.
            </p>

            <div style={{ marginBottom: "2rem" }}>
              <div
                style={{
                  fontSize: "0.92rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--olive)",
                  fontWeight: 700,
                  marginBottom: "0.35rem",
                }}
              >
                Direct Studio Post
              </div>
              <a
                href="mailto:hello@nexus-studio.example"
                className="nx-drawn-link"
                style={{ fontSize: "1.45rem", fontWeight: 700, fontStyle: "normal" }}
              >
                hello@nexus-studio.example
              </a>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
              <img
                src="/templates/nexus/clay-flower.webp"
                alt=""
                aria-hidden="true"
                width={148}
                height={124}
                style={{ width: "148px", height: "auto", flexShrink: 0 }}
              />
              <p
                style={{
                  fontSize: "0.98rem",
                  fontStyle: "italic",
                  color: "var(--ink-muted)",
                  margin: 0,
                  maxWidth: "28ch",
                }}
              >
                Every inquiry is read by our founding partners—never routed to a chatbot.
              </p>
            </div>
          </div>

          {/* Interactive Project Seed Form */}
          <div className="nx-brief-card" data-reveal>
            <h3 style={{ fontSize: "1.65rem", margin: "0 0 0.4rem 0", color: "var(--ink-deep)" }}>
              Plant a project seed
            </h3>
            <p style={{ fontSize: "0.98rem", color: "var(--ink-muted)", margin: "0 0 1.1rem 0" }}>
              Select what we are cultivating together and prepare a bespoke studio note:
            </p>

            <form id="seed-brief-form" noValidate onSubmit={handleSubmit}>
              <div>
                <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--ink-deep)" }}>
                  Focus Areas (optional)
                </span>
                <div className="nx-scope-chips" role="group" aria-label="Project focus areas">
                  {AVAILABLE_SCOPES.map((scope) => {
                    const isPressed = scopes.includes(scope);
                    return (
                      <button
                        key={scope}
                        type="button"
                        className="nx-scope-chip"
                        aria-pressed={isPressed}
                        data-scope={scope}
                        onClick={() => toggleScope(scope)}
                      >
                        {scope}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-name">Your Name</label>
                <input
                  type="text"
                  id="brief-name"
                  className="nx-input"
                  placeholder="e.g. Clara Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.name ? "is-visible" : ""}`}
                  id="error-name"
                  role="alert"
                >
                  {errors.name}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-email">Email Address</label>
                <input
                  type="email"
                  id="brief-email"
                  className="nx-input"
                  placeholder="clara@solstice-apothecary.example"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.email ? "is-visible" : ""}`}
                  id="error-email"
                  role="alert"
                >
                  {errors.email}
                </div>
              </div>

              <div className="nx-field">
                <label htmlFor="brief-company">Brand or Organization (optional)</label>
                <input
                  type="text"
                  id="brief-company"
                  className="nx-input"
                  placeholder="Solstice Apothecary"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="nx-field">
                <label htmlFor="brief-message">What are you hoping to grow?</label>
                <textarea
                  id="brief-message"
                  className="nx-textarea"
                  rows={3}
                  placeholder="Tell us about your brand, timeline, or the story you want people to feel..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <div
                  className={`nx-field-error ${errors.message ? "is-visible" : ""}`}
                  id="error-message"
                  role="alert"
                >
                  {errors.message}
                </div>
              </div>

              <button type="submit" className="nx-btn" style={{ width: "100%" }}>
                <span>PREPARE STUDIO NOTE</span>
                <svg className="nx-btn-arrow" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                  <path
                    d="M1.5 7H17.5M17.5 7L12 1.5M17.5 7L12 12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {/* Generated Mailto Draft & Copy Confirmation */}
            <div
              className={`nx-brief-result ${submittedSummary ? "is-visible" : ""}`}
              id="brief-result"
              aria-live="polite"
            >
              <strong
                style={{
                  display: "block",
                  fontSize: "1.08rem",
                  color: "var(--ink-deep)",
                  marginBottom: "0.35rem",
                }}
              >
                Your project seed note is ready!
              </strong>
              <p
                id="brief-preview-text"
                style={{
                  fontSize: "0.94rem",
                  color: "var(--ink)",
                  margin: "0 0 0.9rem 0",
                  fontStyle: "italic",
                }}
              >
                {submittedSummary
                  ? `“${formData.name}${formData.company ? ` (${formData.company})` : ""} — ${scopes.length ? scopes.join(", ") : "General Partnership"}: ${formData.message}”`
                  : ""}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                <a
                  href={mailtoUrl}
                  id="brief-mailto-link"
                  className="nx-btn"
                  style={{ padding: "0.65rem 1.35rem", fontSize: "0.9rem" }}
                >
                  <span>Open in Email Client</span>
                </a>
                <button
                  type="button"
                  id="brief-copy-btn"
                  className="nx-IconBtn"
                  style={{ minHeight: "40px", fontSize: "0.88rem" }}
                  onClick={handleCopy}
                >
                  {copied ? "Copied to Clipboard ✓" : "Copy Note Text"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
