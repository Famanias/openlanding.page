import { CommunityClientError } from "../../../../lib/community/client";
import {
  HTML_CONSENT,
  HTML_MAX_BYTES,
  LISTING_CONSENT,
  REQUEST_MAX_BYTES,
  SCREENSHOT_MAX_BYTES,
  type SubmissionReceipt,
} from "../../../../lib/community/contracts";

export type SubmissionTextField =
  | "websiteUrl"
  | "creatorName"
  | "title"
  | "description"
  | "creditUrl"
  | "contactEmail";

export interface SubmissionFormState {
  websiteUrl: string;
  creatorName: string;
  title: string;
  description: string;
  creditUrl: string;
  contactEmail: string;
  screenshotFile: File | null;
  htmlFile: File | null;
  listingConsentAccepted: boolean;
  htmlConsentAccepted: boolean;
  turnstileToken: string;
  idempotencyKey: string;
  hasAttemptedCurrentKey: boolean;
  status: "idle" | "submitting" | "succeeded" | "error";
  receipt: SubmissionReceipt | null;
  errorBanner: string | null;
  errorCode: string | null;
  fieldErrors: Record<string, string>;
}

function defaultUuidGenerator(): string {
  return crypto.randomUUID();
}

export function createInitialSubmissionState(
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  return {
    websiteUrl: "",
    creatorName: "",
    title: "",
    description: "",
    creditUrl: "",
    contactEmail: "",
    screenshotFile: null,
    htmlFile: null,
    listingConsentAccepted: false,
    htmlConsentAccepted: false,
    turnstileToken: "",
    idempotencyKey: makeIdempotencyKey(),
    hasAttemptedCurrentKey: false,
    status: "idle",
    receipt: null,
    errorBanner: null,
    errorCode: null,
    fieldErrors: {},
  };
}

function rotateKeyIfAttempted(
  state: SubmissionFormState,
  makeIdempotencyKey: () => string,
): Pick<SubmissionFormState, "idempotencyKey" | "hasAttemptedCurrentKey"> {
  if (!state.hasAttemptedCurrentKey) {
    return {
      idempotencyKey: state.idempotencyKey,
      hasAttemptedCurrentKey: false,
    };
  }
  return {
    idempotencyKey: makeIdempotencyKey(),
    hasAttemptedCurrentKey: false,
  };
}

function validateSelectedFileSizes(
  screenshotFile: File | null,
  htmlFile: File | null,
  existingErrors: Record<string, string>,
): { fieldErrors: Record<string, string>; errorBanner: string | null } {
  const nextErrors = { ...existingErrors };
  delete nextErrors.screenshot;
  delete nextErrors.html;
  let errorBanner: string | null = null;

  if (screenshotFile) {
    if (screenshotFile.size === 0) {
      nextErrors.screenshot = "Screenshot file cannot be empty.";
    } else if (screenshotFile.size > SCREENSHOT_MAX_BYTES) {
      nextErrors.screenshot = "Screenshot must be 2 MiB or smaller.";
    }
  }

  if (htmlFile) {
    if (htmlFile.size === 0) {
      nextErrors.html = "HTML file cannot be empty.";
    } else if (htmlFile.size > HTML_MAX_BYTES) {
      nextErrors.html = "HTML file must be 5 MiB or smaller.";
    }
  }

  const totalBytes = (screenshotFile?.size ?? 0) + (htmlFile?.size ?? 0);
  if (totalBytes > REQUEST_MAX_BYTES) {
    errorBanner = "Combined upload exceeds the 8 MiB request limit.";
    if (!nextErrors.screenshot && screenshotFile) {
      nextErrors.screenshot = "Combined upload exceeds the 8 MiB request limit.";
    }
  }

  return { fieldErrors: nextErrors, errorBanner };
}

export function setSubmissionField(
  state: SubmissionFormState,
  field: SubmissionTextField,
  value: string,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  if (state[field] === value) {
    return state;
  }
  const nextFieldErrors = { ...state.fieldErrors };
  delete nextFieldErrors[field];
  return {
    ...state,
    [field]: value,
    ...rotateKeyIfAttempted(state, makeIdempotencyKey),
    fieldErrors: nextFieldErrors,
    errorBanner: null,
    errorCode: null,
  };
}

export function setListingConsent(
  state: SubmissionFormState,
  accepted: boolean,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  if (state.listingConsentAccepted === accepted) {
    return state;
  }
  const nextFieldErrors = { ...state.fieldErrors };
  delete nextFieldErrors.listingConsentVersion;
  return {
    ...state,
    listingConsentAccepted: accepted,
    ...rotateKeyIfAttempted(state, makeIdempotencyKey),
    fieldErrors: nextFieldErrors,
    errorBanner: null,
    errorCode: null,
  };
}

export function setHtmlConsent(
  state: SubmissionFormState,
  accepted: boolean,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  if (state.htmlConsentAccepted === accepted) {
    return state;
  }
  const nextFieldErrors = { ...state.fieldErrors };
  delete nextFieldErrors.htmlConsentVersion;
  return {
    ...state,
    htmlConsentAccepted: accepted,
    ...rotateKeyIfAttempted(state, makeIdempotencyKey),
    fieldErrors: nextFieldErrors,
    errorBanner: null,
    errorCode: null,
  };
}

export function setScreenshotFile(
  state: SubmissionFormState,
  file: File | null,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  const { fieldErrors, errorBanner } = validateSelectedFileSizes(
    file,
    state.htmlFile,
    state.fieldErrors,
  );
  return {
    ...state,
    screenshotFile: file,
    ...rotateKeyIfAttempted(state, makeIdempotencyKey),
    fieldErrors,
    errorBanner,
    errorCode: null,
  };
}

export function setHtmlFile(
  state: SubmissionFormState,
  file: File | null,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  const { fieldErrors, errorBanner } = validateSelectedFileSizes(
    state.screenshotFile,
    file,
    state.fieldErrors,
  );
  delete fieldErrors.htmlConsentVersion;
  return {
    ...state,
    htmlFile: file,
    // Selecting or removing HTML always requires explicit fresh HTML consent
    htmlConsentAccepted: false,
    ...rotateKeyIfAttempted(state, makeIdempotencyKey),
    fieldErrors,
    errorBanner,
    errorCode: null,
  };
}

export function setTurnstileToken(
  state: SubmissionFormState,
  token: string,
): SubmissionFormState {
  const nextFieldErrors = { ...state.fieldErrors };
  delete nextFieldErrors.turnstileToken;
  return {
    ...state,
    turnstileToken: token,
    fieldErrors: nextFieldErrors,
  };
}

export function beginSubmissionAttempt(
  state: SubmissionFormState,
  makeIdempotencyKey: () => string = defaultUuidGenerator,
): SubmissionFormState {
  return {
    ...state,
    idempotencyKey: state.idempotencyKey || makeIdempotencyKey(),
    hasAttemptedCurrentKey: true,
    status: "submitting",
    errorBanner: null,
    errorCode: null,
  };
}

export function cancelSubmissionAttempt(state: SubmissionFormState): SubmissionFormState {
  return {
    ...state,
    status: "idle",
    errorBanner:
      "Upload canceled locally. If the request already reached the server, retrying with the same details will check its status.",
    errorCode: "canceled",
  };
}

export function applySubmissionSuccess(
  state: SubmissionFormState,
  receipt: SubmissionReceipt,
): SubmissionFormState {
  return {
    ...state,
    status: "succeeded",
    receipt,
    errorBanner: null,
    errorCode: null,
    fieldErrors: {},
  };
}

export function applySubmissionError(
  state: SubmissionFormState,
  error: unknown,
): SubmissionFormState {
  if (error instanceof CommunityClientError) {
    const fieldErrors = error.fields ? { ...error.fields } : {};
    let errorBanner = error.message;

    if (error.code === "submissions_disabled") {
      errorBanner = "Submissions are temporarily paused. Please try again later.";
    } else if (error.code === "submission_outcome_unknown") {
      errorBanner =
        "Your submission outcome is being checked. Please retry without changing your details to confirm whether it was received.";
    } else if (error.code === "submission_in_progress") {
      errorBanner =
        "This submission is already being processed. Please wait a moment and retry if needed.";
    } else if (
      (error.status === 429 || error.code === "rate_limited" || error.code === "daily_quota_exceeded") &&
      typeof error.retryAfter === "number" &&
      error.retryAfter > 0
    ) {
      errorBanner = `${error.message} Please try again in ${error.retryAfter} seconds.`;
    }

    return {
      ...state,
      status: "error",
      errorBanner,
      errorCode: error.code,
      fieldErrors,
    };
  }

  return {
    ...state,
    status: "error",
    errorBanner:
      error instanceof Error
        ? error.message
        : "Unable to send submission right now. Please try again.",
    errorCode: "network_error",
  };
}

export function buildSubmissionFormData(state: SubmissionFormState): FormData {
  const form = new FormData();
  form.set("websiteUrl", state.websiteUrl.trim());
  form.set("creatorName", state.creatorName.trim());

  if (state.title.trim()) {
    form.set("title", state.title.trim());
  }
  if (state.description.trim()) {
    form.set("description", state.description.trim());
  }
  if (state.creditUrl.trim()) {
    form.set("creditUrl", state.creditUrl.trim());
  }
  if (state.contactEmail.trim()) {
    form.set("contactEmail", state.contactEmail.trim());
  }

  if (state.listingConsentAccepted) {
    form.set("listingConsentVersion", LISTING_CONSENT.version);
  }

  if (state.screenshotFile) {
    form.set("screenshot", state.screenshotFile, state.screenshotFile.name);
  }

  if (state.htmlFile) {
    form.set("html", state.htmlFile, state.htmlFile.name);
    if (state.htmlConsentAccepted) {
      form.set("htmlConsentVersion", HTML_CONSENT.version);
    }
  }

  if (state.turnstileToken.trim()) {
    form.set("turnstileToken", state.turnstileToken.trim());
  }

  return form;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MiB`;
}
