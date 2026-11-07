"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr";
import { submitCommunityWebsite } from "../../../../lib/community/client";
import { SubmissionFields } from "./SubmissionFields";
import {
  applySubmissionError,
  applySubmissionSuccess,
  beginSubmissionAttempt,
  buildSubmissionFormData,
  cancelSubmissionAttempt,
  createInitialSubmissionState,
  setHtmlConsent,
  setHtmlFile,
  setListingConsent,
  setScreenshotFile,
  setSubmissionField,
  setTurnstileToken,
  type SubmissionFormState,
  type SubmissionTextField,
} from "./submission-state";
import { TurnstileWidget, type TurnstileWidgetHandle } from "./TurnstileWidget";

export interface SubmissionDialogProps {
  openEventName?: string;
  baseUrl?: string;
  turnstileSiteKey?: string;
}

export function SubmissionDialog({
  openEventName = "community-submission-open",
  baseUrl = process.env.NEXT_PUBLIC_COMMUNITY_API_URL ?? "",
  turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
}: SubmissionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<SubmissionFormState>(() =>
    createInitialSubmissionState(() => ""),
  );

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const activeControllerRef = useRef<AbortController | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);

  const handleClose = useCallback(() => {
    if (activeControllerRef.current) {
      activeControllerRef.current.abort();
      activeControllerRef.current = null;
      setState((prev) => cancelSubmissionAttempt(prev));
    } else {
      setState((prev) => (prev.status === "succeeded" ? createInitialSubmissionState() : prev));
    }
    setIsOpen(false);
    const previousTrigger = triggerRef.current;
    if (previousTrigger && typeof previousTrigger.focus === "function") {
      requestAnimationFrame(() => {
        previousTrigger.focus();
      });
    }
  }, []);

  useEffect(() => {
    const handleOpenRequest = () => {
      if (document.activeElement instanceof HTMLElement) {
        triggerRef.current = document.activeElement;
      }
      setState((prev) =>
        prev.status === "succeeded" || !prev.idempotencyKey
          ? createInitialSubmissionState()
          : prev,
      );
      setIsOpen(true);
    };

    window.addEventListener(openEventName, handleOpenRequest);
    return () => {
      window.removeEventListener(openEventName, handleOpenRequest);
    };
  }, [openEventName]);

  useEffect(() => {
    if (!isOpen) return;

    const firstInput = dialogRef.current?.querySelector<HTMLElement>(
      "#community-website-url, button",
    );
    firstInput?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  const handleFieldChange = useCallback((field: SubmissionTextField, value: string) => {
    setState((prev) => setSubmissionField(prev, field, value));
  }, []);

  const handleScreenshotChange = useCallback((file: File | null) => {
    setState((prev) => setScreenshotFile(prev, file));
  }, []);

  const handleHtmlChange = useCallback((file: File | null) => {
    setState((prev) => setHtmlFile(prev, file));
  }, []);

  const handleListingConsentChange = useCallback((accepted: boolean) => {
    setState((prev) => setListingConsent(prev, accepted));
  }, []);

  const handleHtmlConsentChange = useCallback((accepted: boolean) => {
    setState((prev) => setHtmlConsent(prev, accepted));
  }, []);

  const handleTurnstileToken = useCallback((token: string) => {
    setState((prev) => setTurnstileToken(prev, token));
  }, []);

  const handleTurnstileExpired = useCallback(() => {
    setState((prev) => ({
      ...prev,
      turnstileToken: "",
      fieldErrors: {
        ...prev.fieldErrors,
        turnstileToken: "Verification challenge expired. Please complete it again.",
      },
    }));
  }, []);

  const handleTurnstileError = useCallback((message: string) => {
    setState((prev) => ({
      ...prev,
      turnstileToken: "",
      fieldErrors: {
        ...prev.fieldErrors,
        turnstileToken: message,
      },
    }));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state.status === "submitting") {
      return;
    }

    if (state.fieldErrors.screenshot || state.fieldErrors.html) {
      return;
    }

    if (!state.turnstileToken.trim()) {
      setState((prev) => ({
        ...prev,
        fieldErrors: {
          ...prev.fieldErrors,
          turnstileToken: "Complete the verification challenge.",
        },
      }));
      return;
    }

    const nextState = beginSubmissionAttempt(state);
    setState(nextState);

    const controller = new AbortController();
    activeControllerRef.current = controller;

    try {
      const formData = buildSubmissionFormData(nextState);
      const receipt = await submitCommunityWebsite(
        baseUrl,
        formData,
        nextState.idempotencyKey,
        controller.signal,
      );
      if (activeControllerRef.current === controller) {
        activeControllerRef.current = null;
      }
      setState((prev) => applySubmissionSuccess(prev, receipt));
    } catch (err) {
      if (activeControllerRef.current === controller) {
        activeControllerRef.current = null;
      }
      if ((err as { name?: string })?.name === "AbortError" || controller.signal.aborted) {
        setState((prev) => cancelSubmissionAttempt(prev));
        return;
      }
      setState((prev) => applySubmissionError(prev, err));
      turnstileRef.current?.reset();
    }
  };

  if (!isOpen) {
    return null;
  }

  const isSubmitting = state.status === "submitting";

  return (
    <div
      className="community-dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-submission-title"
        className="community-dialog"
      >
        <div className="community-dialog-header">
          <div>
            <h2 id="community-submission-title" className="community-dialog-title">
              Add your website
            </h2>
            <p className="community-dialog-subtitle">
              Share a live landing page with creator credit. Every submission is reviewed before
              appearing in the Community tab.
            </p>
          </div>
          <button
            type="button"
            className="community-dialog-close"
            aria-label="Close"
            onClick={handleClose}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {state.status === "succeeded" && state.receipt ? (
          <div className="community-dialog-success" role="status" aria-live="polite">
            <p className="community-success-heading">
              Submission received. Your website is awaiting review.
            </p>
            <p className="community-success-copy">
              Receipt ID: <code>{state.receipt.receiptId}</code>. Approved listings appear in the
              Community tab after manual review. Submitting does not guarantee publication, and we
              do not send automated status emails.
            </p>
            <div className="community-dialog-actions">
              <button
                type="button"
                className="community-secondary-btn"
                onClick={() => setState(createInitialSubmissionState())}
              >
                Submit another website
              </button>
              <button type="button" className="primary-action" onClick={handleClose}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="community-submission-form">
            {state.errorBanner ? (
              <div className="community-error-banner" role="alert">
                {state.errorBanner}
              </div>
            ) : null}

            <SubmissionFields
              state={state}
              disabled={isSubmitting}
              onFieldChange={handleFieldChange}
              onScreenshotChange={handleScreenshotChange}
              onHtmlChange={handleHtmlChange}
              onListingConsentChange={handleListingConsentChange}
              onHtmlConsentChange={handleHtmlConsentChange}
            />

            <div className="community-verification-row">
              <TurnstileWidget
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                action="community_submit"
                onToken={handleTurnstileToken}
                onExpired={handleTurnstileExpired}
                onError={handleTurnstileError}
              />
              {state.fieldErrors.turnstileToken ? (
                <p className="community-field-error" role="alert">
                  {state.fieldErrors.turnstileToken}
                </p>
              ) : null}
            </div>

            <div className="community-dialog-actions">
              {isSubmitting ? (
                <button
                  type="button"
                  className="community-secondary-btn"
                  onClick={() => {
                    activeControllerRef.current?.abort();
                    activeControllerRef.current = null;
                    setState((prev) => cancelSubmissionAttempt(prev));
                  }}
                >
                  Cancel upload
                </button>
              ) : (
                <button
                  type="button"
                  className="community-secondary-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="primary-action" disabled={isSubmitting}>
                {isSubmitting ? "Sending submission…" : "Send submission"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
