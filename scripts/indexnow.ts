import path from "node:path";
import { pathToFileURL } from "node:url";
import sitemap from "../src/app/sitemap";
import {
  buildIndexNowPayloads,
  INDEXNOW_ENDPOINT,
  type IndexNowPayload,
} from "../src/lib/indexnow";

export interface IndexNowCliOptions {
  dryRun: boolean;
  help: boolean;
}

export function parseIndexNowArgs(argv: readonly string[]): IndexNowCliOptions {
  let dryRun = false;
  let help = false;

  for (const arg of argv) {
    if (arg === "--") continue;
    if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--help" || arg === "-h") {
      help = true;
    } else {
      throw new Error(`Unknown option: ${arg}. Use --dry-run or --help.`);
    }
  }

  return { dryRun, help };
}

export function collectSitemapUrls(): string[] {
  return sitemap().map(entry => entry.url);
}

export interface SubmitIndexNowOptions {
  dryRun?: boolean;
  urls?: readonly string[];
  fetchFn?: typeof fetch;
  log?: (message: string) => void;
  errorLog?: (message: string) => void;
}

export async function submitIndexNow(
  options: SubmitIndexNowOptions = {},
): Promise<IndexNowPayload[]> {
  const dryRun = options.dryRun ?? false;
  const urls = options.urls ?? collectSitemapUrls();
  const payloads = buildIndexNowPayloads(urls);
  const log = options.log ?? console.log;
  const errorLog = options.errorLog ?? console.error;

  if (dryRun) {
    const totalUrls = payloads.reduce((sum, batch) => sum + batch.urlList.length, 0);
    errorLog(
      `[indexnow] dry-run: ${totalUrls} URL(s) in ${payloads.length} batch(es) -> ${INDEXNOW_ENDPOINT}`,
    );
    log(JSON.stringify(payloads.length === 1 ? payloads[0] : payloads, null, 2));
    return payloads;
  }

  const fetchFn = options.fetchFn ?? fetch;
  for (let i = 0; i < payloads.length; i += 1) {
    const payload = payloads[i];
    const response = await fetchFn(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "");
      throw new Error(
        `IndexNow submission failed on batch ${i + 1}/${payloads.length} (${response.status} ${response.statusText})${responseBody ? `: ${responseBody}` : ""}`,
      );
    }

    log(
      `[indexnow] submitted batch ${i + 1}/${payloads.length} (${payload.urlList.length} URLs) -> HTTP ${response.status}`,
    );
  }

  return payloads;
}

async function main(): Promise<void> {
  const { dryRun, help } = parseIndexNowArgs(process.argv.slice(2));
  if (help) {
    console.log("Usage: bun run indexnow [--dry-run]");
    console.log("Submits all sitemap URLs on SITE_URL to IndexNow.");
    return;
  }
  await submitIndexNow({ dryRun });
}

if (import.meta.url === pathToFileURL(path.resolve(process.argv[1] ?? "")).href) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
