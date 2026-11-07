"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  CREATOR_NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  HTML_CONSENT,
  LISTING_CONSENT,
  TITLE_MAX_LENGTH,
  URL_MAX_LENGTH,
} from "../../../../lib/community/contracts";
import {
  formatBytes,
  type SubmissionFormState,
  type SubmissionTextField,
} from "./submission-state";

export interface SubmissionFieldsProps {
  state: SubmissionFormState;
  disabled: boolean;
  onFieldChange: (field: SubmissionTextField, value: string) => void;
  onScreenshotChange: (file: File | null) => void;
  onHtmlChange: (file: File | null) => void;
  onListingConsentChange: (accepted: boolean) => void;
  onHtmlConsentChange: (accepted: boolean) => void;
}

export function SubmissionFields({
  state,
  disabled,
  onFieldChange,
  onScreenshotChange,
  onHtmlChange,
  onListingConsentChange,
  onHtmlConsentChange,
}: SubmissionFieldsProps) {
  const screenshotInputRef = useRef<HTMLInputElement | null>(null);
  const htmlInputRef = useRef<HTMLInputElement | null>(null);

  const { fieldErrors } = state;

  return (
    <div className="community-submission-fields">
      <div className="community-field-group">
        <label htmlFor="community-website-url" className="community-field-label">
          Website URL
        </label>
        <input
          id="community-website-url"
          name="websiteUrl"
          type="url"
          inputMode="url"
          placeholder="https://example.com"
          maxLength={URL_MAX_LENGTH}
          required
          disabled={disabled}
          value={state.websiteUrl}
          aria-invalid={fieldErrors.websiteUrl ? "true" : undefined}
          aria-describedby={
            fieldErrors.websiteUrl ? "community-website-url-error" : "community-website-url-hint"
          }
          onChange={(event) => onFieldChange("websiteUrl", event.target.value)}
          className="community-field-input"
        />
        <p id="community-website-url-hint" className="community-field-hint">
          Public HTTPS address of the live landing page. No account or source code required.
        </p>
        {fieldErrors.websiteUrl ? (
          <p id="community-website-url-error" className="community-field-error" role="alert">
            {fieldErrors.websiteUrl}
          </p>
        ) : null}
      </div>

      <div className="community-field-group">
        <label htmlFor="community-creator-name" className="community-field-label">
          Creator name
        </label>
        <input
          id="community-creator-name"
          name="creatorName"
          type="text"
          placeholder="Your name or studio"
          maxLength={CREATOR_NAME_MAX_LENGTH}
          required
          disabled={disabled}
          value={state.creatorName}
          aria-invalid={fieldErrors.creatorName ? "true" : undefined}
          aria-describedby={fieldErrors.creatorName ? "community-creator-name-error" : undefined}
          onChange={(event) => onFieldChange("creatorName", event.target.value)}
          className="community-field-input"
        />
        {fieldErrors.creatorName ? (
          <p id="community-creator-name-error" className="community-field-error" role="alert">
            {fieldErrors.creatorName}
          </p>
        ) : null}
      </div>

      <fieldset className="community-optional-fieldset">
        <legend className="community-optional-legend">Optional listing &amp; upload details</legend>
        <p className="community-optional-intro">
          Defaults use your website hostname as the title and link your creator credit to your
          submitted URL. Upload a standalone HTML file only if you want to offer a free MIT-licensed
          download.
        </p>

        <div className="community-optional-grid">
          <div className="community-field-group">
            <label htmlFor="community-title" className="community-field-label">
              Title (optional)
            </label>
            <input
              id="community-title"
              name="title"
              type="text"
              placeholder="Defaults to website hostname"
              maxLength={TITLE_MAX_LENGTH}
              disabled={disabled}
              value={state.title}
              aria-invalid={fieldErrors.title ? "true" : undefined}
              aria-describedby={fieldErrors.title ? "community-title-error" : undefined}
              onChange={(event) => onFieldChange("title", event.target.value)}
              className="community-field-input"
            />
            {fieldErrors.title ? (
              <p id="community-title-error" className="community-field-error" role="alert">
                {fieldErrors.title}
              </p>
            ) : null}
          </div>

          <div className="community-field-group">
            <label htmlFor="community-credit-url" className="community-field-label">
              Creator credit URL (optional)
            </label>
            <input
              id="community-credit-url"
              name="creditUrl"
              type="url"
              inputMode="url"
              placeholder="https://example.com/about"
              maxLength={URL_MAX_LENGTH}
              disabled={disabled}
              value={state.creditUrl}
              aria-invalid={fieldErrors.creditUrl ? "true" : undefined}
              aria-describedby={fieldErrors.creditUrl ? "community-credit-url-error" : undefined}
              onChange={(event) => onFieldChange("creditUrl", event.target.value)}
              className="community-field-input"
            />
            {fieldErrors.creditUrl ? (
              <p id="community-credit-url-error" className="community-field-error" role="alert">
                {fieldErrors.creditUrl}
              </p>
            ) : null}
          </div>
        </div>

        <div className="community-field-group">
          <label htmlFor="community-description" className="community-field-label">
            Short description (optional)
          </label>
          <textarea
            id="community-description"
            name="description"
            rows={2}
            placeholder="One or two sentences about the page design or typography."
            maxLength={DESCRIPTION_MAX_LENGTH}
            disabled={disabled}
            value={state.description}
            aria-invalid={fieldErrors.description ? "true" : undefined}
            aria-describedby={fieldErrors.description ? "community-description-error" : undefined}
            onChange={(event) => onFieldChange("description", event.target.value)}
            className="community-field-textarea"
          />
          {fieldErrors.description ? (
            <p id="community-description-error" className="community-field-error" role="alert">
              {fieldErrors.description}
            </p>
          ) : null}
        </div>

        <div className="community-field-group">
          <label htmlFor="community-contact-email" className="community-field-label">
            Private contact email (optional)
          </label>
          <input
            id="community-contact-email"
            name="contactEmail"
            type="email"
            autoComplete="email"
            placeholder="you@example.com (never shown publicly)"
            maxLength={EMAIL_MAX_LENGTH}
            disabled={disabled}
            value={state.contactEmail}
            aria-invalid={fieldErrors.contactEmail ? "true" : undefined}
            aria-describedby={
              fieldErrors.contactEmail
                ? "community-contact-email-error"
                : "community-contact-email-hint"
            }
            onChange={(event) => onFieldChange("contactEmail", event.target.value)}
            className="community-field-input"
          />
          <p id="community-contact-email-hint" className="community-field-hint">
            Kept private for manual reviewer questions; no automated marketing or status emails.
          </p>
          {fieldErrors.contactEmail ? (
            <p id="community-contact-email-error" className="community-field-error" role="alert">
              {fieldErrors.contactEmail}
            </p>
          ) : null}
        </div>

        <div className="community-optional-grid">
          <div className="community-field-group">
            <label htmlFor="community-screenshot" className="community-field-label">
              Screenshot preview (optional)
            </label>
            <input
              ref={screenshotInputRef}
              id="community-screenshot"
              name="screenshot"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              disabled={disabled}
              aria-invalid={fieldErrors.screenshot ? "true" : undefined}
              aria-describedby={
                fieldErrors.screenshot
                  ? "community-screenshot-error"
                  : "community-screenshot-hint"
              }
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                onScreenshotChange(file);
              }}
              className="community-field-file"
            />
            <p id="community-screenshot-hint" className="community-field-hint">
              PNG, JPEG, or WebP up to 2 MiB. Without one, cards use a clean hostname preview.
            </p>
            {state.screenshotFile ? (
              <div className="community-file-summary">
                <span>
                  {state.screenshotFile.name} ({formatBytes(state.screenshotFile.size)})
                </span>
                <button
                  type="button"
                  disabled={disabled}
                  className="community-file-remove"
                  aria-label="Remove screenshot"
                  onClick={() => {
                    if (screenshotInputRef.current) {
                      screenshotInputRef.current.value = "";
                    }
                    onScreenshotChange(null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : null}
            {fieldErrors.screenshot ? (
              <p id="community-screenshot-error" className="community-field-error" role="alert">
                {fieldErrors.screenshot}
              </p>
            ) : null}
          </div>

          <div className="community-field-group">
            <label htmlFor="community-html" className="community-field-label">
              Standalone HTML template (optional)
            </label>
            <input
              ref={htmlInputRef}
              id="community-html"
              name="html"
              type="file"
              accept=".html,.htm,text/html"
              disabled={disabled}
              aria-invalid={fieldErrors.html ? "true" : undefined}
              aria-describedby={
                fieldErrors.html ? "community-html-error" : "community-html-hint"
              }
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null;
                onHtmlChange(file);
              }}
              className="community-field-file"
            />
            <p id="community-html-hint" className="community-field-hint">
              UTF-8 single-file HTML up to 5 MiB. Only upload if you want visitors to download and
              reuse the template.
            </p>
            {state.htmlFile ? (
              <div className="community-file-summary">
                <span>
                  {state.htmlFile.name} ({formatBytes(state.htmlFile.size)})
                </span>
                <button
                  type="button"
                  disabled={disabled}
                  className="community-file-remove"
                  aria-label="Remove HTML file"
                  onClick={() => {
                    if (htmlInputRef.current) {
                      htmlInputRef.current.value = "";
                    }
                    onHtmlChange(null);
                  }}
                >
                  Remove
                </button>
              </div>
            ) : null}
            {fieldErrors.html ? (
              <p id="community-html-error" className="community-field-error" role="alert">
                {fieldErrors.html}
              </p>
            ) : null}
          </div>
        </div>
      </fieldset>

      <div className="community-consents">
        <div className="community-consent-item">
          <label className="community-consent-label">
            <input
              type="checkbox"
              name="listingConsent"
              checked={state.listingConsentAccepted}
              disabled={disabled}
              aria-invalid={fieldErrors.listingConsentVersion ? "true" : undefined}
              aria-describedby={
                fieldErrors.listingConsentVersion ? "community-listing-consent-error" : undefined
              }
              onChange={(event) => onListingConsentChange(event.target.checked)}
            />
            <span>{LISTING_CONSENT.text}</span>
          </label>
          {fieldErrors.listingConsentVersion ? (
            <p id="community-listing-consent-error" className="community-field-error" role="alert">
              {fieldErrors.listingConsentVersion}
            </p>
          ) : null}
        </div>

        {state.htmlFile ? (
          <div className="community-consent-item community-consent-html">
            <label className="community-consent-label">
              <input
                type="checkbox"
                name="htmlConsent"
                checked={state.htmlConsentAccepted}
                disabled={disabled}
                aria-invalid={fieldErrors.htmlConsentVersion ? "true" : undefined}
                aria-describedby={
                  fieldErrors.htmlConsentVersion ? "community-html-consent-error" : undefined
                }
                onChange={(event) => onHtmlConsentChange(event.target.checked)}
              />
              <span>{HTML_CONSENT.text}</span>
            </label>
            {fieldErrors.htmlConsentVersion ? (
              <p id="community-html-consent-error" className="community-field-error" role="alert">
                {fieldErrors.htmlConsentVersion}
              </p>
            ) : null}
          </div>
        ) : null}

        <p className="community-legal-links">
          Read the <Link href="/community-terms">Community submission terms</Link> and{" "}
          <Link href="/community-privacy">Privacy notice</Link>. Submitting a link does not transfer
          ownership of your external website.
        </p>
      </div>
    </div>
  );
}
