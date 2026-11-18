import { absoluteUrl, SITE_URL } from "./site";

export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
export const INDEXNOW_MAX_BATCH_SIZE = 10_000;

/** Public IndexNow ownership key; served verbatim at `/<key>.txt`. */
export const INDEXNOW_KEY = "e48297be6111ba712e37419eeaae877d";
export const INDEXNOW_KEY_URL = absoluteUrl(`/${INDEXNOW_KEY}.txt`);

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface BuildIndexNowOptions {
  host?: string;
  key?: string;
  keyLocation?: string;
  siteOrigin?: string;
  maxBatchSize?: number;
}

const INDEXNOW_KEY_PATTERN = /^[a-zA-Z0-9-]{8,128}$/;

function parseUrlOrigin(rawUrl: string, label: string): URL {
  try {
    return new URL(rawUrl);
  } catch {
    throw new Error(`Refusing IndexNow submission: invalid ${label} "${rawUrl}"`);
  }
}

/**
 * Validates URLs against `SITE_URL` and splits them into IndexNow request payloads
 * (at most 10,000 URLs per batch per the IndexNow protocol).
 */
export function buildIndexNowPayloads(
  urls: readonly string[],
  options: BuildIndexNowOptions = {},
): IndexNowPayload[] {
  const site = parseUrlOrigin(options.siteOrigin ?? SITE_URL, "SITE_URL");
  const expectedOrigin = site.origin;
  const host = options.host ?? site.host;
  const key = options.key ?? INDEXNOW_KEY;
  const keyLocation = options.keyLocation ?? INDEXNOW_KEY_URL;
  const maxBatchSize = options.maxBatchSize ?? INDEXNOW_MAX_BATCH_SIZE;

  if (!Number.isInteger(maxBatchSize) || maxBatchSize < 1 || maxBatchSize > INDEXNOW_MAX_BATCH_SIZE) {
    throw new Error(
      `Refusing IndexNow submission: maxBatchSize must be an integer between 1 and ${INDEXNOW_MAX_BATCH_SIZE}`,
    );
  }
  if (!INDEXNOW_KEY_PATTERN.test(key)) {
    throw new Error("Refusing IndexNow submission: invalid IndexNow key format");
  }
  if (host !== site.host) {
    throw new Error(`Refusing IndexNow submission: host "${host}" does not match ${site.host}`);
  }

  const parsedKeyLocation = parseUrlOrigin(keyLocation, "keyLocation");
  if (parsedKeyLocation.origin !== expectedOrigin) {
    throw new Error(
      `Refusing IndexNow submission: keyLocation "${keyLocation}" is not on ${expectedOrigin}`,
    );
  }

  const uniqueUrls: string[] = [];
  const seen = new Set<string>();

  for (const rawUrl of urls) {
    const parsed = parseUrlOrigin(rawUrl, "URL");
    if (parsed.origin !== expectedOrigin) {
      throw new Error(
        `Refusing IndexNow submission: URL "${rawUrl}" is not on ${expectedOrigin}`,
      );
    }
    const normalized = parsed.toString();
    if (!seen.has(normalized)) {
      seen.add(normalized);
      uniqueUrls.push(normalized);
    }
  }

  if (uniqueUrls.length === 0) {
    throw new Error("Refusing IndexNow submission: urlList is empty");
  }

  const payloads: IndexNowPayload[] = [];
  for (let i = 0; i < uniqueUrls.length; i += maxBatchSize) {
    payloads.push({
      host,
      key,
      keyLocation: parsedKeyLocation.toString(),
      urlList: uniqueUrls.slice(i, i + maxBatchSize),
    });
  }
  return payloads;
}
