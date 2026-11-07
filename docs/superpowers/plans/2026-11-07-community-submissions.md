# Community Submissions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add account-free community website submissions, optional MIT HTML downloads, private moderation, and a Community gallery backed by Cloudflare while retaining Vercel hosting.

**Architecture:** The existing Next.js gallery loads approved entries from a dedicated Cloudflare Worker. The Worker owns D1 records and private R2 assets and serves a small admin application protected by Cloudflare Access. A pure TypeScript contract is shared by the browser and Worker; no upload or private admin data travels through a Vercel function.

**Tech Stack:** Existing Next.js 16.4.3, React 19.3, Bun 1.3.11, TypeScript, Vitest 5 and Playwright; Cloudflare Workers, D1, R2, Turnstile, Access; Wrangler; `@cloudflare/vitest-plugin`; `jose` for verified Access JWTs. Use browser-native forms/dialogs and a small vanilla TypeScript admin application rather than adding another UI framework.

**Spec:** [Approved community submissions design](../specs/2026-11-07-community-submissions-design.md).

## Global Constraints

- Keep Next.js on Vercel; add one Cloudflare Worker, one D1 database, and one private R2 bucket.
- A live website link and creator credit are enough to participate; HTML is optional.
- Review every submission before publication.
- Accept one HTML file up to 5 MiB and one JPEG, PNG, or WebP screenshot up to 2 MiB.
- Maximum multipart request size is 8 MiB including overhead; excess requests fail before object storage writes.
- No automatic submission/approval email in v1; optional contact email is available privately to the owner for manual follow-up.
- Do not fetch submitted websites, generate screenshots, or render uploaded HTML on the server in v1.
- Keep the standard root LICENSE unchanged. Listing/screenshot display permission is separate from the HTML license.
- No contributor editing accounts, community voting, prompt generation, or imported social posts in v1.
- Preserve the existing design-request/commission form as a separate workflow. No mockups.
- Read the installed guides in `node_modules/next/dist/docs/` before product code, as AGENTS.md requires; preserve Cache Components and template isolation.
- Never stage `.env.local`, private Cloudflare credentials, runtime state, or the pre-existing untracked `template-addition-117-1246/` directory.

## Review Focus

1. Concurrent identical multipart requests and a lost success response must create exactly one pending record and consume one daily success slot (Task 3).
2. Unknown-length/chunked requests and a stalled upload must obey the same 8 MiB ceiling and cleanup rules as requests with Content-Length (Tasks 2–3).
3. Unpublishing a listing must disable an already known asset URL on the next request, including conditional requests (Task 5).
4. Fast tab/search changes and back/forward navigation must not let a stale community response replace newer results or destroy template filters (Task 7).
5. An admin request made through an alternate Worker hostname or forged identity header must fail without a valid Access JWT, independently of gateway protection (Task 4).

## Implementation organization

This is one feature plan: intake, moderation, assets and gallery share a state machine and contract. Implement in the order below. Each task includes its own test cycle and commit. Use an isolated execution workspace via the using-git-worktrees skill when implementation begins; this planning task does not create one.

### File map

| Paths | Responsibility |
| --- | --- |
| `src/lib/community/contracts.ts` | Platform-neutral limits, consent text/version, public types, request/error types |
| `src/lib/community/client.ts`, `client.test.ts` | Browser API client and runtime validation of public responses |
| `workers/community/package.json`, `bun.lock`, `wrangler.jsonc`, `tsconfig.json`, `eslint.config.mjs`, `vitest.config.ts` | Isolated Worker scripts/tooling, local bindings and tests |
| `workers/community/src/worker-configuration.d.ts`, `env.ts`, `types.ts` | Generated runtime bindings, validated deployment config, private record types |
| `workers/community/migrations/0001_community.sql` | Submission, review, throttle and daily quota schema |
| `workers/community/src/repository.ts` | D1 persistence, explicit public projection, versioned state transitions |
| `workers/community/src/http.ts`, `validation.ts`, `abuse.ts` | Routing errors/CORS, bounded multipart parsing, field validation, Turnstile and quotas |
| `workers/community/src/intake.ts`, `objects.ts` | Idempotent receiving-to-pending orchestration and private R2 operations |
| `workers/community/src/auth.ts`, `moderation.ts` | Access/CSRF enforcement, owner edits and moderation commands |
| `workers/community/src/public.ts`, `license.ts`, `cleanup.ts`, `index.ts` | Public reads, licensed attachments, retention and Worker entry points |
| `workers/community/admin/index.html`, `admin.ts`, `admin.css`, `workers/community/scripts/build-admin.ts` | Same-origin private review UI and deterministic Bun asset build |
| `workers/community/test/*.test.ts`, `fixtures.ts`, `setup.ts`, `tsconfig.json` | Local workerd/D1/R2 integration tests and deterministic fixture helpers |
| `src/app/(index)/components/GalleryTabs.tsx`, `TemplateGallery.tsx`, `community/*.tsx`, `community/useCommunity.ts` | Top-level tabs, existing template panel, community results, public form and Turnstile integration |
| `src/app/(index)/data/gallery-view.ts`, `gallery-view.test.ts` | Top-level tab/download URL state, separate from existing template filter types |
| Existing `GalleryShell.tsx`, `useGalleryFilters.ts`, `Header.tsx`, `Footer.tsx`, `Hero.tsx`, `index.css`, `layout.tsx` | Integrate the new panel/actions and correct the scope of site-wide claims |
| `src/app/(index)/community-terms/page.tsx`, `community-privacy/page.tsx` | Listing permissions, optional MIT grant, contact and retention explanations |
| `tests/e2e/community.spec.ts`, `community-submission.spec.ts`, `community-admin.spec.ts`, `playwright.community.config.ts` | Browser tests with a local Worker and Next.js production server |
| `README.md`, `CONTRIBUTING.md`, `docs/community-backend.md`, `docs/community-env.example`, `workers/community/dev.vars.example` | Scope documentation, setup, nonsecret environment examples and rollout |

Modify root `package.json`, `tsconfig.json`, `eslint.config.mjs`, `.gitignore` and the root lockfile only as needed for scripts/tooling isolation. Root Vitest already includes only `src`/`scripts`; retain that boundary.

## Shared contracts and operational decisions

These names and values are fixed for the tasks below. Avoid creating separate lookalike frontend/backend types.

- `AssetKind = "html" | "screenshot"`; `SubmissionStatus = "receiving" | "pending" | "approved" | "rejected" | "unpublished"`.
- `CommunityItem = { id: string; title: string; description: string; websiteUrl: string; creatorName: string; creditUrl: string; approvedAt: string; imageUrl: string | null; downloadUrl: string | null }`.
- `CommunityQuery = { query: string; downloadsOnly: boolean; cursor?: string }`; `CommunityPage = { items: CommunityItem[]; nextCursor: string | null }`.
- `SubmissionReceipt = { receiptId: string; status: "pending" }`; `CommunityError = { error: { code: string; message: string; fields?: Record<string, string> }; retryAfter?: number }`.
- `ModerationCommand = { expectedVersion: number; action: "approve" | "reject" | "unpublish"; htmlApproved?: boolean; note?: string }`; metadata edit and deletion also require expectedVersion.
- Private `types.ts` defines `AssetKeys = Partial<Record<AssetKind, string>>`, `AssetBytes = { bytes: Uint8Array; sha256: string; byteLength: number; mediaType: string; filename: string }`, and `ValidatedSubmission` with normalized field values, immutable consent snapshots, `assets: Partial<Record<AssetKind, AssetBytes>>` and `payloadDigest: string`. Define `SubmissionRow` camelCase properties once and map SQL snake_case explicitly in the repository. Task 4 defines `AdminIdentity`; Task 5 defines `CleanupSummary`; Task 7 exports the named `GalleryView` type.
- Multipart names: `websiteUrl`, `creatorName`, `title`, `description`, `creditUrl`, `contactEmail`, `listingConsentVersion`, `htmlConsentVersion`, `turnstileToken`, `html`, `screenshot`. Accepted consent versions equal the current version constants and mean explicit true consent; omitted versions mean no consent. The server supplies consent timestamps. A removed HTML file clears its HTML consent.
- Limits: title 100, description 500, creator name 80, URLs 2,048, email 254, query 160 characters; files 5,242,880 and 2,097,152 bytes; request 8,388,608 bytes; cursor page 24; admin page 50. Enforce after trimming; reject over-limit values rather than silently truncating submissions.
- Header `Idempotency-Key` is a browser-generated UUID. A completed identical replay returns 200 with the original receipt; a new submission returns 201. A concurrent receiving replay or changed payload returns 409 with distinct codes `submission_in_progress` / `idempotency_conflict`.
- Export `LISTING_CONSENT` and `HTML_CONSENT` objects with version strings `listing-2026-11-07` and `html-mit-2026-11-07` and their full human-readable text; export `HTML_MAX_BYTES`, `SCREENSHOT_MAX_BYTES`, `REQUEST_MAX_BYTES`, `COMMUNITY_PAGE_SIZE` with the exact numeric values above. Use these names in validation, forms, tests and terms. Consent snapshots store both the accepted version and exact text.
- Statuses: 400 malformed input/cursor/unknown or duplicate fields; 403 invalid consent/Turnstile/origin/authorization; 401 absent/invalid authentication; 404 unavailable public record/asset; 409 stale update/idempotency conflict; 413 oversized request/file; 415 invalid media type; 429 throttle/quota; 503 retryable upstream/storage failure. Use no stack traces or private fields in public errors.
- Worker bindings `DB`, `SUBMISSION_ASSETS`, `ADMIN_ASSETS`. Config `DEPLOYMENT_ENV` (`local`, `preview`, `production`), `PUBLIC_API_ORIGIN`, `ALLOWED_ORIGINS`, `TURNSTILE_HOSTNAMES`, `TURNSTILE_ACTION=community_submit`, `ACCESS_ISSUER`, `ACCESS_AUD`, `ADMIN_EMAILS`, `SUBMISSION_LIMIT_HOURLY=5`, `SUBMISSION_LIMIT_DAILY=100`. Secrets `TURNSTILE_SECRET_KEY`, `IP_HASH_SECRET`.
- Frontend public settings `NEXT_PUBLIC_COMMUNITY_API_URL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Missing config shows a specific unavailable state and keeps Templates working; it never falls back to production/local implicitly.
- Timeouts: multipart intake 30 seconds; Turnstile verification five seconds; storage completion deadline 30 seconds after validated intake. Deadline expiry aborts/compensates and leaves only recoverable nonpublic receiving state if cleanup fails.
- Public API, images and downloads use `Cache-Control: no-store`; private responses also use no-store. Cursor is base64url JSON `{ approvedAt, id }`, validated for type/format/length; sort by `(approved_at DESC, id DESC)`.
- Moderation transitions: approve accepts pending/unpublished/approved and sets approved; an already approved listing preserves its approval date when HTML permission changes. Reapproval after unpublish gets a new approval date. Reject accepts pending/unpublished; an approved listing must first be unpublished. Unpublish accepts approved only. Other status transitions return 409. Delete accepts completed states, not an active receiving upload. Clearing htmlApproved disables downloads on the next request.
- Pin currently verified package versions at execution: Wrangler 4.158.0, `@cloudflare/vitest-plugin` 1.6.0, `jose` 6.2.15. The plugin supports root Vitest 5; use Vitest 5.0.5 in the isolated backend package. Recheck compatibility if installation reports a real mismatch; do not substitute deprecated `@cloudflare/vitest-pool-workers`.

### Task 1: Establish the contract and real D1 persistence

**Files:** Create shared `contracts.ts`; Worker package/config/types, a minimal `src/index.ts` bootstrap, migration, repository and `test/repository.test.ts`, `test/setup.ts`, `test/fixtures.ts`; modify root tooling exclusions/scripts.

**Interfaces:** Consumes the contract above. Produces `getSubmission(db: D1Database, id: string): Promise<SubmissionRow | null>`, `listApproved(db: D1Database, query: CommunityQuery, apiOrigin: string): Promise<CommunityPage>`, `toPublicItem(row: SubmissionRow, apiOrigin: string): CommunityItem`; `SubmissionRow` includes `version`, immutable original creator attribution and consent snapshots, separate `htmlApproved`, timestamp/asset fields, payload digest and unique idempotency key. `fixtures.ts` provides `seedSubmission(overrides?: Partial<SubmissionRow>): Promise<SubmissionRow>`, `makeSubmission(fields?: Record<string,string>, files?: Partial<Record<AssetKind,File>>): Request`, and fixed `NOW` for subsequent tests. makeSubmission defaults to valid link-only fields, current listing consent, allowed Origin, UUID idempotency key and mocked-valid Turnstile token; it never implicitly grants HTML consent. Test setup resets local D1/R2 between cases and fetch mocks after each case.

- [ ] **Step 1:** Create the isolated Worker package/tooling needed to run a D1 integration test, with `src/index.ts` initially exporting a 404-only module Worker so test loading/dry-run builds work before intake exists. Use `cloudflareTest({ wrangler: { configPath: "./wrangler.jsonc" } })`, actual local D1/R2 and migration application in setup; no plain in-memory repository substitution. Add `workers/community` to root TypeScript/Next-ESLint exclusions; backend has its own typecheck/lint. Root scripts `community:dev`, `community:test`, `community:typecheck`, `community:lint`, `community:build` delegate with `bun run --cwd workers/community <script>`. Ignore `.wrangler`, backend node_modules and `.dev.vars`; nonsecret examples use names not ignored by `.env*`. Keep this as a separately installed Bun package with its own lockfile, not a new monorepo/workspace migration.
- [ ] **Step 2:** Write `repository.test.ts` with `public_projection_excludes_pending_and_private_columns` and `approval_ties_paginate_without_duplicates`: seed pending/rejected/approved rows containing email, notes and R2 keys; assert returned IDs are approved only, each public object's keys equal `CommunityItem`, and two pages across tied timestamps contain every approved ID once. Assert unknown-status/invalid-consent database writes and duplicate idempotency keys fail schema constraints.

```ts
it("public_projection_excludes_pending_and_private_columns", async () => {
  await seedSubmission({ status: "pending", contactEmail: "private@example.test" });
  const page = await listApproved(env.DB, { query: "", downloadsOnly: false }, "https://community.example.test");
  expect(page).toEqual({ items: [], nextCursor: null });
});
```

Test excerpts assume Vitest/Playwright imports and the fixtures/configuration declared in the owning task. Implement every additional named assertion in the step, not only the representative excerpt.
- [ ] **Step 3:** Run `bun run community:test -- test/repository.test.ts`; expect missing migration/repository behavior to fail, not a dependency/runtime configuration error.
- [ ] **Step 4:** Implement the migration with submissions, review_events, submission_attempts and daily_quota tables. Use CHECK constraints for status/HTML consent and indexes for public/review pagination, plus unique idempotency key. Store object keys and consent snapshots before any upload begins so cleanup can recover them. Preserve original creator/year independently of later display-name edits. Use prepared SQL and explicit public column projection.
- [ ] **Step 5:** Run that test, `bun run community:typecheck`, `bun run community:lint`, and `bun run community:build` (Wrangler dry-run into an ignored local directory); expect passes without cloud credentials. Commit only Task 1 paths: `feat: add community contracts and D1 persistence`.

### Task 2: Validate anonymous input and enforce abuse limits

**Files:** Create `validation.ts`, `abuse.ts`, `http.ts`, `env.ts`, `test/validation.test.ts`, `test/abuse.test.ts`; extend private types.

**Interfaces:** Consumes Task 1 contract and `Env`. Produces `parseSubmission(request: Request, now: string): Promise<ValidatedSubmission>` (normalized fields, immutable consent snapshots, bounded file bytes/digests and a canonical payload digest); `verifyTurnstile(token: string, env: Env): Promise<void>`; `reserveAttempt(db: D1Database, ipHash: string, now: string): Promise<void>`; `reserveDailySlot(db: D1Database, submissionId: string, now: string): Promise<void>`; `settleDailySlot(db: D1Database, submissionId: string, outcome: "success" | "release"): Promise<void>`. Quota settlement is idempotent. `CommunityHttpError` in `http.ts` has `constructor(status: number, code: string, message: string, fields?: Record<string,string>)` and exposes those fields to the error serializer.

- [ ] **Step 1:** Write validation tests: `link_only_is_valid_with_listing_consent`; `html_requires_current_separate_consent`; `enforces_actual_byte_limits` (exact sizes accepted, +1 rejected); `chunked_body_stops_at_8388608_bytes`; `stalled_body_times_out`; `rejects_svg_disguised_as_png`; `normalizes_urls_without_fetching`; `rejects_duplicate_fields_and_files`. Assert HTTPS only, no credentials, loopback/private literal IPv4/IPv6/localhost rejected, no network fetch, and unknown fields rejected. Verify screenshot signatures and HTML UTF-8 validity rather than trusting extensions/MIME; review, not a parser heuristic, certifies standalone behavior.

```ts
it("enforces_actual_byte_limits", async () => {
  const html = new File([new Uint8Array(5_242_881)], "page.html", { type: "text/html" });
  const request = makeSubmission({ htmlConsentVersion: HTML_CONSENT.version }, { html });
  await expect(parseSubmission(request, NOW)).rejects.toMatchObject({ status: 413 });
});
```
- [ ] **Step 2:** Write abuse tests: five attempts accepted and sixth 429 in an hour; next hour accepted; parallel daily reservations never allow success+reserved above 100; release/settle twice does not corrupt totals; malformed/wrong-host/wrong-action/expired Turnstile fails closed. Mock only the external Siteverify HTTP response using workerd's fetch mock. Assert raw IP/token/email is absent from persisted throttle data and errors.
- [ ] **Step 3:** Run `bun run community:test -- test/validation.test.ts test/abuse.test.ts`; expect behavioral failures.
- [ ] **Step 4:** Implement a stream reader enforcing actual request bytes/deadline even without Content-Length, then parse bounded multipart bytes. Hash uploaded bytes and canonical normalized data excluding Turnstile token, multipart boundaries and server-generated timestamps. Validate screenshot signatures, count/size and field values. Use Web Crypto daily-keyed HMAC for IP hashes; take IP only from Cloudflare's trusted connecting-IP context/header in deployment, not forwarded client fields. Reserve attempts with atomic D1 UPSERT/RETURNING; track daily reservations by receiving submission so cleanup can release abandoned slots. Use UTC windows and the submission's stored quota date, not settlement's current date.
- [ ] **Step 5:** Run both files, typecheck and lint; expect green. Commit: `feat: validate and protect community submissions`.

### Task 3: Receive optional uploads without duplicates or partial publication

**Files:** Create `intake.ts`, `objects.ts`, `test/intake.test.ts`; extend `index.ts` and repository with intake routing/receiving/finalization functions.

**Interfaces:** Consumes validation/quotas and storage bindings. Produces `handleSubmission(request: Request, env: Env): Promise<Response>`; `storeAssets(bucket: R2Bucket, draft: ValidatedSubmission, keys: AssetKeys): Promise<void>`; `deleteAssets(bucket: R2Bucket, keys: AssetKeys): Promise<void>`; Worker default `fetch(request, env, ctx): Promise<Response>`. Keep any fault-injection hooks in test composition, never public request fields.

- [ ] **Step 1:** Write intake tests: link-only returns 201/pending and no R2 object; HTML+screenshot stores both privately and returns only receiptId/status; missing consent causes no R2 writes. `same_key_concurrent_requests_create_one_pending_submission` asserts one row/one daily success and second response 200 or receiving 409 followed by successful 200 replay. `lost_response_replay_needs_no_second_turnstile_validation` asserts same receipt and quota. Changed bytes/normalized field under an existing key returns 409.

```ts
it("link_only_creates_a_private_pending_receipt", async () => {
  const response = await handleSubmission(makeSubmission(), env);
  expect(response.status).toBe(201);
  expect(await response.json()).toEqual({ receiptId: expect.any(String), status: "pending" });
  expect((await env.SUBMISSION_ASSETS.list()).objects).toHaveLength(0);
});
```
- [ ] **Step 2:** Add `r2_or_d1_failure_never_exposes_partial_submission`: fail the second put and final database update separately; assert no pending/approved row, no public assets, released reservation, and cleanup-recoverable metadata if an R2 delete fails. Test deadline abort and stale receiving replay. Verify OPTIONS only allows configured origins/method/header names and never grants admin credentialed CORS.
- [ ] **Step 3:** Run `bun run community:test -- test/intake.test.ts`; expect failures.
- [ ] **Step 4:** Implement the sequence: bound/normalize/hash request; look up completed/receiving idempotency replay; reserve hourly attempt; atomically claim the unique key/receiving row; only the winning request verifies Turnstile, reserves daily capacity, persists generated object keys and stores original objects; atomically change to pending and settle success. Claiming before Siteverify prevents concurrent identical requests from independently consuming the same single-use token. Completed replays precede Turnstile; active receiving replays return 409 with Retry-After and do not run a second uploader. On failure delete staged objects, release any reservation, and remove the receiving claim only after cleanup succeeds; otherwise retain it for Task 5. The browser supplies a fresh Turnstile token for a genuinely retried new attempt.
- [ ] **Step 5:** Add exact public routing, uniform no-store JSON errors, and deadlines. Run intake/abuse/repository tests, typecheck and lint; commit `feat: receive community submissions and private uploads`.

### Task 4: Protect owner access and implement moderation

**Files:** Create `auth.ts`, `moderation.ts`, `test/auth.test.ts`, `test/moderation.test.ts`; extend repository and routing.

**Interfaces:** Defines `AdminIdentity = { email: string; subject: string; sessionBinding: string }`. Produces `requireAdmin(request: Request, env: Env): Promise<AdminIdentity>`; `requireAdminMutation(request: Request, identity: AdminIdentity, env: Env): Promise<void>`; `handleAdminApi(request: Request, env: Env): Promise<Response>`. Every admin route uses the same auth path. JSON mutations carry `X-CSRF-Token` and `expectedVersion`; `GET /admin/api/session` returns authenticated email and a 30-minute CSRF token, capped at the Access assertion's expiry.

- [ ] **Step 1:** Write auth tests using generated test signing keys/JWKS: no assertion 401; forged signature/wrong issuer/audience/expired assertion 401; valid non-owner 403; valid allowed email accepted. `alternate_hostname_and_forged_email_header_do_not_bypass_access` must cover `/admin`, static assets and private APIs. Test hostile Origin, missing/expired/mismatched CSRF and invalid deployment config. No secrets or fake authentication headers should enable production admin access.

```ts
it("alternate_hostname_and_forged_email_header_do_not_bypass_access", async () => {
  const request = new Request("https://alternate.example.test/admin", {
    headers: { "Cf-Access-Authenticated-User-Email": "owner@example.test", "Cf-Access-Jwt-Assertion": "forged.token.value" },
  });
  await expect(requireAdmin(request, env)).rejects.toMatchObject({ status: 401 });
});
```
- [ ] **Step 2:** Write moderation tests: pending approve publishes listing only by default; approve with htmlApproved true requires stored HTML/current immutable consent; reject/unpublish hides immediately; conditional version mismatch returns 409 and adds no audit event. Editing can change display metadata only. Original site URL, HTML bytes, consent, original copyright name/year cannot be replaced. Race approve/reject produces one successful version increment and one audit event. Nonpersonal deletion audit survives removal of PII.
- [ ] **Step 3:** Run `bun run community:test -- test/auth.test.ts test/moderation.test.ts`; expect failures.
- [ ] **Step 4:** Implement signature verification with `jose` and cached JWKS fetched only from configured Access issuer. Require the configured audience/owner email and fail closed. Issue a CSRF HMAC bound to signed session/email, origin and expiration using the secret with a distinct purpose label; compare safely. Local identity override is composed only by the explicit loopback local harness; production/preview rejects it. Implement GET list/detail, PATCH metadata/status, DELETE with expectedVersion, immutable audit events, and explicit htmlApproved choice. Use atomic version checks plus conditional audit inserts inside D1 batch transactions; a zero-row update is not itself an SQL error, so explicitly prevent audit insertion/side effects on a stale update.
- [ ] **Step 5:** Run auth/moderation/public-projection tests and typecheck/lint. Commit `feat: add authenticated community moderation`.

### Task 5: Publish approved assets and enforce retention

**Files:** Create `public.ts`, `license.ts`, `cleanup.ts`, `test/public.test.ts`, `test/cleanup.test.ts`; extend objects, repository and scheduled Worker handler.

**Interfaces:** Defines `CleanupSummary = { deleted: number; releasedReservations: number; failures: number; hasMore: boolean }`. Produces `handlePublic(request: Request, env: Env): Promise<Response>`; `createLicensedDownload(row: SubmissionRow, object: R2ObjectBody): Response`; `cleanupSubmissions(env: Env, now: string): Promise<CleanupSummary>`; Worker `scheduled(event, env, ctx): void`. Private original-asset routes reuse auth and force text/attachment for HTML.

- [ ] **Step 1:** Write public tests: pending/rejected/unpublished/deleted IDs return 404 for record/image/HTML; htmlApproved false returns no download. `known_asset_url_is_revoked_on_next_request` fetches approved asset, unpublishes, then repeats with prior ETag/If-None-Match and asserts 404, never 304. Assert no public bucket redirect and exact privacy projection, bounded query/cursor/page behavior, `%`/`_` search treated literally, and approved timestamp ties paginate correctly.

```ts
it("pending_submission_assets_are_not_public", async () => {
  const row = await seedSubmission({ status: "pending" });
  const response = await handlePublic(new Request(`https://community.example.test/v1/community/${row.id}/download`), env);
  expect(response.status).toBe(404);
  expect(response.headers.get("location")).toBeNull();
});
```
- [ ] **Step 2:** Write `html_is_attachment_with_preserved_original_and_mit_notice`: original bytes/digest in R2 unchanged, download includes complete standard MIT notice plus original contributor/year, existing notices and Unicode content preserved, filename cannot inject headers or `-->` escape the inserted comment, Content-Disposition attachment/octet-stream/nosniff set. An edited display name must not rewrite original copyright attribution. Private HTML review endpoint never returns executable text/html.
- [ ] **Step 3:** Write cleanup tests at the boundaries: receiving older than 24 hours releases its reservation/deletes objects; rejected 30 days and pending 180 days are deleted; approved/unpublished records are not purged as pending. `cleanup_can_resume_after_r2_failure_without_losing_keys` keeps an unpublic record and retries next run. No unbounded full-bucket listing. Test cleanup across a UTC date rollover and idempotent repeated execution.
- [ ] **Step 4:** Run `bun run community:test -- test/public.test.ts test/cleanup.test.ts`; expect failures.
- [ ] **Step 5:** Implement parameterized public queries and state checks before every asset response; stream HTML with a UTF-8 MIT comment prefix while retaining original bytes and notices. Escape dangerous comment characters in human attribution without changing original bytes. Store full original creator consent snapshot separately from editable display metadata. For deletion first make the record nonpublic, delete objects, then remove PII/row and retain minimal nonpersonal audit; keep failed deletion keys recoverable. Schedule daily cleanup in small bounded batches with durable progress for queues larger than one batch. Run these tests plus intake/moderation regressions; commit `feat: publish reviewed community assets and retention`.

### Task 6: Deliver the private admin review application

**Files:** Create admin HTML/TypeScript/CSS and `scripts/build-admin.ts`; configure Worker static assets and auth-first routing; create `test/admin-shell.test.ts`, `tests/e2e/community-admin.spec.ts`, `playwright.community.config.ts` and local integration harness.

**Interfaces:** Admin calls `/admin/api/session`, review list/detail/patch/delete, and original asset handlers from Tasks 4–5. No direct D1/R2 credentials. `scripts/build-admin.ts` uses Bun.build for a browser bundle and copies the HTML/CSS into ignored `dist/admin/`; prepend it to backend build/dev scripts. Add Wrangler's static asset binding only in this task, once the output exists. Route every `/admin` response through auth before static asset lookup; never allow the static-assets router to serve protected content first.

- [ ] **Step 1:** Write admin shell integration test asserting anonymous `/admin`, `/admin/`, JS/CSS and private asset URLs fail. Write Playwright test `owner_reviews_optional_html_separately`: locally sign in through the loopback-only harness, seed pending row, view credit/consent/email/file details, approve listing without HTML and observe no download; enable HTML explicitly through review and observe download; unpublish and verify disappearance. Test stale-version feedback and retry without erasing unsaved edits.

```ts
test("owner_reviews_optional_html_separately", async ({ page }) => {
  await page.goto("http://localhost:8787/admin");
  await page.getByRole("button", { name: "Review Example site" }).click();
  await expect(page.getByRole("checkbox", { name: "Enable HTML download" })).not.toBeChecked();
  await page.getByRole("button", { name: "Approve website", exact: true }).click();
  await expect(page.getByText("Website approved without an HTML download.", { exact: true })).toBeVisible();
});
```

The local browser harness seeds the Example site record and provides the local owner identity before this test; use port 8787 for Wrangler and the existing port 3100 for Next.js.
- [ ] **Step 2:** Run `bun run community:test -- test/admin-shell.test.ts` and `bunx playwright test --config playwright.community.config.ts tests/e2e/community-admin.spec.ts`; expect missing admin behavior, not a deployment/account blocker. The config must start local Next.js and Wrangler with local bindings, provide the public API URL at Next build time, apply local migrations, seed via a local-only test helper, and shut down owned processes. Official Turnstile test keys are used only in this isolated environment.
- [ ] **Step 3:** Implement a compact queue with status filters, paginated list, detail view, editable public metadata, private notes/audit trail and buttons for approve/reject/unpublish/delete. A separate unchecked HTML approval control is disabled if no valid HTML consent/file exists. Render user strings with textContent; view HTML as escaped text/download only; display raster screenshots. Confirm destructive deletion; show per-action progress/errors. Get CSRF from session endpoint; same-origin only; no auth secrets in bundle.
- [ ] **Step 4:** Add accessible focus/order/labels, keyboard operation, narrow-screen layout and explicit signed-in identity/logout link. Run Worker auth/admin shell tests and admin browser tests at desktop/390px with keyboard. Commit `feat: add private community review interface`.

### Task 7: Integrate Community browsing with existing gallery discovery

**Files:** Create browser client/test, gallery-view state/test, `GalleryTabs.tsx`, `TemplateGallery.tsx`, `community/CommunityGallery.tsx`, `CommunityCard.tsx`, `useCommunity.ts`; modify GalleryShell, useGalleryFilters, Header, index.css; create `tests/e2e/community.spec.ts`.

**Interfaces:** `getCommunityPage(baseUrl: string, query: CommunityQuery, signal?: AbortSignal): Promise<CommunityPage>` validates the JSON/public URL shape before returning. Define/export `GalleryView = { tab: "templates" | "community"; downloadsOnly: boolean }`, `readGalleryView(search: string): GalleryView`, `setGalleryView(patch: Partial<GalleryView>): void`; `useCommunity({ query, downloadsOnly, enabled }): { items, loading, error, nextCursor, loadMore, retry }`. Share the existing gallery URL-change event subscription through one exported helper in useGalleryFilters; do not duplicate a second unsynchronized URL store. `GalleryTabs({ activeTab, onSelect }): ReactNode` follows ARIA tab/tabpanel and keyboard conventions.

- [ ] **Step 1:** Write root unit tests for invalid public response URLs, missing config, malformed cursors and view parsing; preserve existing template filter test expectations. Write browser tests asserting Templates initially makes no community request; Community shows only returned public data/creator credit; download button exists only for downloadUrl; query uses shared header search and `downloads=1` is independent of template model/category/sort.

```ts
test("community_is_a_distinct_shareable_gallery", async ({ page }) => {
  await page.goto("/?tab=community&model=gemini");
  await expect(page.getByRole("tab", { name: "Community", exact: true })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("button", { name: "Copy prompt", exact: true })).toHaveCount(0);
  await expect(page.getByRole("group", { name: "Filter by AI model" })).toHaveCount(0);
});
```
- [ ] **Step 2:** Add `stale_search_response_cannot_replace_current_results`, load-more request deduplication and retry assertions. Add keyboard tab switching and back/forward tests preserving `q`, category/model/sort; top-level tab switches use pushState while search changes retain the existing replaceState behavior. Test no results/empty/error+retry/missing config and 390px overflow. Verify switching back to Templates works during a community outage.
- [ ] **Step 3:** Run `bun run test -- src/lib/community/client.test.ts 'src/app/(index)/data/gallery-view.test.ts'` and the Community browser test through `playwright.community.config.ts`; expect missing behavior.
- [ ] **Step 4:** Extract the existing template panel into TemplateGallery with its vote hook/filter behavior intact. Add top-level tabs, a separately mounted community panel, and existing design-token styling. Keep dynamic fetch in client effects with AbortController and request-generation guards; abort/ignore previous filters, reset cursor on query change and merge load-more IDs without duplicates. Do not fetch Cloudflare from cached IndexPage/build. Cards use real external links with safe rel attributes and no prompt/model/vote controls. Placeholder previews derive from hostname, never remote screenshot fetching.
- [ ] **Step 5:** Run unit tests and Community browser tests; run existing `gallery-discovery.spec.ts`, `gallery-votes-sort.spec.ts`, `downloads.spec.ts` and `index.spec.ts`. Adjust only selectors made ambiguous by the new top-level tablist, not behavior expectations. Commit `feat: add community gallery browsing`.

### Task 8: Add the public submission dialog and upload consent

**Files:** Create `community/SubmissionDialog.tsx`, `TurnstileWidget.tsx`, `SubmissionFields.tsx`, `community/submission-state.ts`; extend client with `submitCommunityWebsite(baseUrl: string, form: FormData, idempotencyKey: string, signal?: AbortSignal): Promise<SubmissionReceipt>`; modify header/gallery actions and styles; add `tests/e2e/community-submission.spec.ts` and pure state tests.

**Interfaces:** One dialog owner in GalleryShell receives an open request from the header through a named DOM custom event `community-submission-open`; no cross-template/global state framework. `TurnstileWidget({ siteKey, action, onToken, onExpired, onError })` loads the official script once, removes its widget on unmount, and exposes token reset to the form. Idempotency key belongs to the current normalized payload attempt; files remain selected on retry.

- [ ] **Step 1:** Write `link_only_submission_needs_no_account_or_html`: open from header and Community action, submit only live URL/name + listing permission/Turnstile, assert received-pending success and no claim of publication/email. Write upload tests for optional fields, HTML-specific unchecked consent appearing only with a selected HTML file, client size feedback, removing HTML clearing HTML consent, and backend field errors attached to correct controls.

```ts
test("link_only_submission_needs_no_account_or_html", async ({ page }) => {
  await page.goto("/?tab=community");
  await page.getByRole("button", { name: "Add your website", exact: true }).first().click();
  await page.getByLabel("Website URL", { exact: true }).fill("https://example.com");
  await page.getByLabel("Creator name", { exact: true }).fill("Example Studio");
  await page.getByRole("checkbox", { name: LISTING_CONSENT.text }).check();
  await page.getByRole("button", { name: "Send submission", exact: true }).click();
  await expect(page.getByText("Submission received. Your website is awaiting review.", { exact: true })).toBeVisible();
});
```

The local harness uses official passing Turnstile test keys; wait for the widget token before submitting. These accessible names and success messages are the implementation's exact copy.
- [ ] **Step 2:** Add `network_retry_preserves_payload_and_idempotency_key`: drop first success response, retry unchanged files/form with a fresh Turnstile token and the same key, assert the original receipt and one record. Editing a payload after an attempted send generates a new key. Reopening after success resets; cancellation does not claim the server rejected an already sent upload. Test expired challenge reset, 429 Retry-After feedback, 503 retry and 409 in-progress retry without duplicate submission. Test Escape/focus restoration, keyboard labels and mobile layout.
- [ ] **Step 3:** Run submission browser tests and pure state tests; expect failures.
- [ ] **Step 4:** Implement native accessible dialog, minimal required fields, optional-details area, file input summaries, current exact consent text and terms/privacy links. Include consent versions only after explicit acceptance. Post directly to Worker with no credentials, custom idempotency header, AbortSignal and browser-generated FormData boundary. Handle success/error/pending/retry honestly; never clear user input on recoverable error. No automatic link fetch or image generation.
- [ ] **Step 5:** Run those tests plus intake idempotency/consent tests and a commission-form regression asserting its existing POST action/options remain intact. Commit `feat: add account-free community submission form`.

### Task 9: Publish clear contribution terms and license scope

**Files:** Create terms/privacy pages and `docs/community-backend.md` terms notes; modify README, CONTRIBUTING, Hero/Footer/layout scope wording; leave LICENSE byte-for-byte intact. Add terms assertions to community-submission browser tests rather than a separate suite of copy snapshots.

**Interfaces:** Product routes `/community-terms` and `/community-privacy` correspond to immutable shared consent version constants and text snapshots from Task 1. Store new consent versions for future changed terms; existing accepted snapshots remain unchanged.

- [ ] **Step 1:** Add browser assertions: both terms links work, listing-only permission excludes an MIT grant over the linked website, optional HTML grant clearly names MIT/personal/commercial reuse and notice preservation, private email/retention/correction contact explained. Assert visible form text matches the versioned consent exported from contracts. Assert root LICENSE digest unchanged from execution baseline.

```ts
test("community_terms_distinguish_listings_from_html_contributions", async ({ page }) => {
  await page.goto("/community-terms");
  await expect(page.getByRole("heading", { name: "Community submission terms", exact: true })).toBeVisible();
  await expect(page.getByText("Linked websites keep their own terms.", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "MIT License", exact: true })).toHaveAttribute("href", "https://opensource.org/license/mit");
});
```
- [ ] **Step 2:** Run the affected browser tests; expect missing pages/scope wording.
- [ ] **Step 3:** Write the terms/privacy pages using existing fonts/tokens, explicit listing/screenshot display permission, contributor authority and MIT asset-rights acknowledgment. Clarify optional email is private/manual follow-up, rejected 30-day/pending 180-day retention, HTML irreversibility after lawful download, and correction/removal via the project's existing contact email. Update CONTRIBUTING's blanket PR/patch/issue licensing text to cover actual repository code contributions and distinguish community listings/HTML. Keep third-party license notices; do not imply included stock/font assets become MIT automatically. Rewrite global copy to avoid promising that all Community entries are downloadable or MIT-licensed.
- [ ] **Step 4:** Run the affected browser tests, lint and LICENSE digest check. Commit `docs: clarify community permissions and licensing`.

### Task 10: Verify the complete local flow and document production setup

**Files:** Finish `docs/community-backend.md`, `docs/community-env.example`, `workers/community/dev.vars.example`, README scripts and community integration fixtures; no production credentials or account resources in this task.

**Interfaces:** Uses all preceding public/private endpoints. Setup guide documents actual pinned CLI `--help` commands before resource mutation. `community:build` remains a dry-run, not a hidden production deploy.

- [ ] **Step 1:** Add an end-to-end `submission_to_owner_approval_to_public_download` test against local D1/R2: send website+HTML+screenshot, verify anonymous invisibility, inspect owner consent/attachment, approve with HTML checkbox, search/list/download from frontend, unpublish and assert old URLs fail; reject/delete a second record and inspect cleanup. Cover retained template interactions and the design-request form without mocking community API responses in this final flow.

The final test's download assertions, after its documented submit/approve flow has obtained the receipt ID:

```ts
const download = await page.request.get(`http://localhost:8787/v1/community/${receiptId}/download`);
expect(download.status()).toBe(200);
expect(download.headers()["content-disposition"]).toContain("attachment;");
expect(download.headers()["x-content-type-options"]).toBe("nosniff");
expect(await download.text()).toContain("MIT License");
```
- [ ] **Step 2:** Run the final test through `playwright.community.config.ts`. Resolve any integration failure at its owning module/test before broadening checks.
- [ ] **Step 3:** Document local startup, migration application, official test Turnstile keys, loopback-only admin harness, and two independent deployment units. Record exact production Vercel origin instead of accepting wildcard preview domains. Provide nonsecret examples for all settings/bindings, optional private email handling, retention configuration, R2 checkout/free-limit caveat and no auto-upgrade. Explain that Next's NEXT_PUBLIC settings are build-time values and require a Vercel rebuild when changed.
- [ ] **Step 4:** Run `bun run community:test`, `bun run community:typecheck`, `bun run community:lint`, `bun run community:build`, `bun run check`, `bun run lint`, `bun run test`, `bun run build`, and the Community browser suite plus existing gallery/download regressions. Root/Worker type checks stay separate. Record pass/fail and classify pre-existing failures without modifying unrelated templates. Inspect responsive/keyboard/reduced-motion behavior through actual browser tests; do not generate design mockups.
- [ ] **Step 5:** Commit reviewed Task 10 files: `test: verify and document community submission workflow`. Before reporting completion, inspect git diff/status, ensure secrets/generated state/unrelated additions are absent, and distinguish locally complete software from production setup and live verification.

## Production activation sequence (after implementation, not executed by this plan)

1. Owner signs into Cloudflare and activates R2 through its checkout; obtain acceptance before any paid plan or billing change. Verify the account's available free allowances.
2. Create separate development/preview and production D1/R2 bindings; apply the reviewed migrations. Preview must never bind production private data. Record Worker hostname; a workers.dev hostname works without moving the Vercel site.
3. Configure Turnstile for the actual frontend hostname, the production action, secrets and origin allowlist; set Access issuer/audience and explicit owner email. Configure Cloudflare Access on both `/admin` and `/admin/*`; do not protect all public submission/gallery routes accidentally. Validate actual current hostname/path support against Cloudflare docs.
4. Deploy Worker/admin assets with submissions initially disabled through missing frontend configuration. Check anonymous admin access and forged/expired/wrong-audience assertions on every available hostname. No local auth stub may work remotely. Disable unused version/preview URLs or apply the same fail-closed auth logic; keep R2 private.
5. Set the two NEXT_PUBLIC frontend values on Vercel and rebuild/deploy after normal deployment authorization. Keep existing votes/Redis settings intact. No community uploads should traverse a Vercel function.
6. Owner/live verification: submit a clearly identified smoke listing, confirm it is private, review via real Access email PIN, approve optional HTML, inspect credit/download consent/headers and the MIT notice, then unpublish/delete the smoke listing. This live write requires explicit authorization; local test fixtures are not evidence that it ran.
7. Confirm scheduled cleanup, quotas and retention are active; record real usage/latency/Worker CPU results. Validate the free CPU budget with near-limit uploads and cold Access JWKS lookup; optimize or seek an explicit paid-plan decision if the platform budget is exceeded. Never silently upgrade.
8. Rollback: remove/disable frontend community configuration to stop new submissions, roll back the Worker version if necessary, preserve D1/R2 records and migrations, and keep Access enforcement active. Do not destroy data or reverse a migration blindly.

## Self-review and coverage

- Contract/consent/schema/privacy: Tasks 1–3 and 9.
- Optional private assets, failure compensation, idempotency and quotas: Tasks 2–3 and 5.
- Owner authentication, CSRF, separate HTML approval, audit/version checks: Tasks 4–6.
- Community tab/search/history/pagination, error isolation, existing templates: Task 7.
- Public account-free form, uploads, retry/Turnstile behavior and focus: Task 8.
- Notice-preserving attachments, revocation, retention/deletion/correction: Tasks 5 and 9.
- Local D1/R2/browser evidence, free-tier limits, account setup, production/preview boundaries: Task 10 and activation sequence.

The five Review Focus cases have named tests in their owning tasks. Shared names/signatures are defined before use; runtime-only record/environment types are defined in Task 1. No independent sub-project or unassigned product requirement remains. Tests run at execution time; this plan's existence is not a passing test or a deployed backend.

## Documentation checked while planning

- Installed Next.js guides: `01-app/01-getting-started/06-fetching-data.md`, `01-app/03-api-reference/01-directives/use-cache.md`, `01-app/02-guides/environment-variables.md`.
- [Current Cloudflare Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/) uses `@cloudflare/vitest-plugin` and `cloudflareTest`; npm confirms the older pool package is deprecated.
- [D1 prepared statements/batches](https://developers.cloudflare.com/d1/worker-api/d1-database/) supplies transactional batches, not implicit rollback for zero-row conditional updates.
- [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) requires server verification; tokens expire after five minutes and are single-use.
- [Access with Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/) supports hostname/path protection, while the Worker still enforces its verified identity contract for all admin routes.

## Execution handoff

Recommended approach: **Native execution** in an isolated workspace, followed by one independent whole-branch review. The tasks share a tightly coupled contract and moderation state machine; one implementer can preserve those interfaces with less context overhead. Subagent-driven implementation remains available if the owner prefers per-task independent review. Owner review of this plan and choice of execution approach precede product implementation.
