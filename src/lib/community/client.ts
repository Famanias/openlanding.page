import {
  CREATOR_NAME_MAX_LENGTH,
  DESCRIPTION_MAX_LENGTH,
  QUERY_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  URL_MAX_LENGTH,
  type CommunityError,
  type CommunityItem,
  type CommunityPage,
  type CommunityQuery,
  type SubmissionReceipt,
} from "./contracts";

export class CommunityClientError extends Error {
  readonly code: string;
  readonly status?: number;
  readonly fields?: Record<string, string>;
  readonly retryAfter?: number;

  constructor(
    code: string,
    message: string,
    options?: {
      status?: number;
      fields?: Record<string, string>;
      retryAfter?: number;
    },
  ) {
    super(message);
    this.name = "CommunityClientError";
    this.code = code;
    this.status = options?.status;
    this.fields = options?.fields;
    this.retryAfter = options?.retryAfter;
  }
}

export function normalizeBaseUrl(rawBaseUrl: string): string {
  const trimmed = (rawBaseUrl ?? "").trim();
  if (!trimmed) {
    throw new CommunityClientError(
      "missing_config",
      "Community gallery is not configured in this environment.",
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new CommunityClientError("invalid_config", "Community API URL is invalid.");
  }

  if (
    (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
    parsed.username ||
    parsed.password
  ) {
    throw new CommunityClientError("invalid_config", "Community API URL is invalid.");
  }

  return parsed.origin;
}

function isValidHttpsPublicUrl(raw: unknown): raw is string {
  if (typeof raw !== "string" || !raw.trim() || raw.length > URL_MAX_LENGTH) {
    return false;
  }
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" && !parsed.username && !parsed.password;
  } catch {
    return false;
  }
}

function isValidAssetUrl(
  raw: unknown,
  baseOrigin: string,
  id: string,
  suffix: "image" | "download",
): raw is string | null {
  if (raw === null) return true;
  if (typeof raw !== "string" || !raw.trim()) return false;
  try {
    const parsed = new URL(raw);
    if (parsed.origin !== baseOrigin) return false;
    const expectedPath = `/v1/community/${encodeURIComponent(id)}/${suffix}`;
    return parsed.pathname === expectedPath && !parsed.search && !parsed.hash;
  } catch {
    return false;
  }
}

function isValidCursor(raw: unknown): raw is string {
  return typeof raw === "string" && raw.length > 0 && raw.length <= 512 && /^[A-Za-z0-9_-]+$/.test(raw);
}

function validateCommunityItem(raw: unknown, baseOrigin: string): CommunityItem {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new CommunityClientError("invalid_response", "Invalid community item payload.");
  }

  const obj = raw as Record<string, unknown>;
  const id = typeof obj.id === "string" ? obj.id.trim() : "";
  const title = typeof obj.title === "string" ? obj.title.trim() : "";
  const description = typeof obj.description === "string" ? obj.description : "";
  const creatorName = typeof obj.creatorName === "string" ? obj.creatorName.trim() : "";
  const approvedAt = typeof obj.approvedAt === "string" ? obj.approvedAt.trim() : "";

  if (
    !id ||
    !title ||
    title.length > TITLE_MAX_LENGTH ||
    description.length > DESCRIPTION_MAX_LENGTH ||
    !creatorName ||
    creatorName.length > CREATOR_NAME_MAX_LENGTH ||
    !approvedAt ||
    !isValidHttpsPublicUrl(obj.websiteUrl) ||
    !isValidHttpsPublicUrl(obj.creditUrl) ||
    !isValidAssetUrl(obj.imageUrl, baseOrigin, id, "image") ||
    !isValidAssetUrl(obj.downloadUrl, baseOrigin, id, "download")
  ) {
    throw new CommunityClientError(
      "invalid_response",
      "Community response failed public safety validation.",
    );
  }

  return {
    id,
    title,
    description,
    websiteUrl: obj.websiteUrl,
    creatorName,
    creditUrl: obj.creditUrl,
    approvedAt,
    imageUrl: obj.imageUrl,
    downloadUrl: obj.downloadUrl,
  };
}

export async function getCommunityPage(
  baseUrl: string,
  query: CommunityQuery,
  signal?: AbortSignal,
): Promise<CommunityPage> {
  const baseOrigin = normalizeBaseUrl(baseUrl);

  if (query.cursor !== undefined && !isValidCursor(query.cursor)) {
    throw new CommunityClientError("invalid_cursor", "Invalid pagination cursor.");
  }

  const endpoint = new URL(`${baseOrigin}/v1/community`);
  const trimmedQuery = (query.query ?? "").trim().slice(0, QUERY_MAX_LENGTH);
  if (trimmedQuery) {
    endpoint.searchParams.set("q", trimmedQuery);
  }
  if (query.downloadsOnly) {
    endpoint.searchParams.set("downloads", "1");
  }
  if (query.cursor) {
    endpoint.searchParams.set("cursor", query.cursor);
  }

  let response: Response;
  try {
    response = await fetch(endpoint.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      credentials: "omit",
      signal,
    });
  } catch (err) {
    if ((err as { name?: string })?.name === "AbortError") {
      throw err;
    }
    throw new CommunityClientError(
      "network_error",
      "Unable to reach the community gallery. Please try again.",
    );
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new CommunityClientError(
      "invalid_response",
      "Community service returned an unreadable response.",
      { status: response.status },
    );
  }

  if (!response.ok) {
    const errPayload = body as Partial<CommunityError>;
    throw new CommunityClientError(
      errPayload?.error?.code ?? "service_error",
      errPayload?.error?.message ?? "Community gallery is temporarily unavailable.",
      {
        status: response.status,
        fields: errPayload?.error?.fields,
        retryAfter: errPayload?.retryAfter,
      },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new CommunityClientError("invalid_response", "Invalid community page response.");
  }

  const pageObj = body as { items?: unknown; nextCursor?: unknown };
  if (!Array.isArray(pageObj.items)) {
    throw new CommunityClientError("invalid_response", "Invalid community items list.");
  }

  if (pageObj.nextCursor !== null && !isValidCursor(pageObj.nextCursor)) {
    throw new CommunityClientError("invalid_response", "Invalid pagination cursor in response.");
  }

  const items = pageObj.items.map((item) => validateCommunityItem(item, baseOrigin));
  return {
    items,
    nextCursor: pageObj.nextCursor,
  };
}

export async function submitCommunityWebsite(
  baseUrl: string,
  form: FormData,
  idempotencyKey: string,
  signal?: AbortSignal,
): Promise<SubmissionReceipt> {
  const baseOrigin = normalizeBaseUrl(baseUrl);
  const trimmedKey = (idempotencyKey ?? "").trim();
  if (!trimmedKey) {
    throw new CommunityClientError(
      "invalid_idempotency_key",
      "A valid submission idempotency key is required.",
    );
  }

  let response: Response;
  try {
    response = await fetch(`${baseOrigin}/v1/submissions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Idempotency-Key": trimmedKey,
      },
      body: form,
      credentials: "omit",
      signal,
    });
  } catch (err) {
    if ((err as { name?: string })?.name === "AbortError") {
      throw err;
    }
    throw new CommunityClientError(
      "network_error",
      "Unable to reach the submission service. Please try again.",
    );
  }

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new CommunityClientError(
      "invalid_response",
      "Submission service returned an unreadable response.",
      { status: response.status },
    );
  }

  if (!response.ok) {
    const errPayload = body as Partial<CommunityError>;
    const headerRetryAfter = Number.parseInt(response.headers.get("Retry-After") ?? "", 10);
    const retryAfter =
      typeof errPayload?.retryAfter === "number" && Number.isFinite(errPayload.retryAfter)
        ? errPayload.retryAfter
        : Number.isFinite(headerRetryAfter) && headerRetryAfter > 0
          ? headerRetryAfter
          : undefined;

    throw new CommunityClientError(
      errPayload?.error?.code ?? "service_error",
      errPayload?.error?.message ?? "Unable to submit website right now. Please try again.",
      {
        status: response.status,
        fields: errPayload?.error?.fields,
        retryAfter,
      },
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new CommunityClientError("invalid_response", "Invalid submission receipt.");
  }

  const receiptObj = body as { receiptId?: unknown; status?: unknown };
  if (
    typeof receiptObj.receiptId !== "string" ||
    !receiptObj.receiptId.trim() ||
    receiptObj.status !== "pending"
  ) {
    throw new CommunityClientError("invalid_response", "Invalid submission receipt.");
  }

  return {
    receiptId: receiptObj.receiptId.trim(),
    status: "pending",
  };
}
