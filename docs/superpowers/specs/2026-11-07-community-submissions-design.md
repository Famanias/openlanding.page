# Community submissions

Date: 2026-11-07
Status: Proposed design for owner review. Product implementation has not started.
Builder check: An independent software-engineer reviewer reported "nothing important left" on 2026-11-07.

## Intent

Let creators share a live landing page with visible credit without contributing its source code. Creators may separately contribute a standalone HTML file that others can download and reuse. The owner reviews every submission before it appears in the gallery. Submission and review happen through the product, not GitHub pull requests.

The contributor experience should be a short public form, inspired by the simplicity of MotionSites' submission popup. It does not require an account or GitHub knowledge. A website listing does not grant a license to the linked website.

## Decisions made by the owner

- Add a Community tab alongside the existing template gallery.
- A live website link and creator credit are enough to participate; HTML is optional.
- Contributors who upload HTML must acknowledge reuse, including personal and commercial use.
- Review every submission before publication.
- Use a backend instead of pull requests for submissions and review.
- Use Cloudflare services with free allowances; the existing website is hosted on Vercel.
- Do not make visual mockups. Continue through a written design.

## Proposed implementation defaults

These are the author's calls, not prior owner decisions. They are part of this proposal for approval.

- Keep Next.js on Vercel; add one Cloudflare Worker, one D1 database, and one private R2 bucket.
- Serve the small admin application from the Worker, protected by Cloudflare Access with email one-time PIN and an explicit owner email allowlist. The public gallery stays in Next.js.
- Use the standard MIT license for contributed HTML, with notices included in downloads. Keep the repository's standard MIT text intact and clarify its scope in documentation and product copy.
- Require only the live website URL and creator display name. Title, description, credit URL, private contact email, screenshot, and HTML are optional. Default the title to the website hostname and the credit link to the submitted website.
- Accept one HTML file up to 5 MiB and one JPEG, PNG, or WebP screenshot up to 2 MiB. Maximum multipart request size is 8 MiB including overhead; excess requests fail before object storage writes.
- Do not fetch submitted websites, generate screenshots, or render uploaded HTML on the server in v1. A missing screenshot gets a deliberate hostname-based placeholder. Optional screenshots let contributors supply a useful card preview.
- No automatic submission/approval email in v1; optional contact email is available privately to the owner for manual follow-up.
- No contributor editing accounts, community voting, prompt generation, or imported social posts in v1.
- Preserve the existing design-request/commission form as a separate workflow. Add a dedicated community submission action.

## Public gallery

Templates remains the default tab and continues to use the existing local template metadata, downloads, prompts, filters, and votes. Community uses separate records and rendering; submitted websites do not become TemplateItem entries, new Next.js template routes, or repository downloads.

Use a shareable `tab=community` query parameter. Tab selection must work with keyboard controls, browser navigation, and the existing header search. The shared `q` search filters the active tab. Existing template category/model/sort query values remain available when returning to Templates but do not filter Community. Community sorts by most recently approved and supports a download-available filter. Do not expose AI model filters, prompt-copy controls, or voting on Community cards.

Each community card displays its title, optional short description, preview/placeholder, and visible creator credit linked to the configured credit URL. Visit website opens the submitted HTTPS site. A Download HTML action appears only when an approved HTML asset exists. No public contact email, internal storage key, review notes, or consent log is returned.

Fetch approved community records from the Worker when opening the Community tab. Use cursor pagination of 24 items, bounded server-side search, and a Load more control. Return approval date and stable ID for cursor ordering. Display loading, empty, failed-with-retry, and no-search-results states. A Cloudflare outage must leave Templates usable. No community API request is required during the Next.js production build.

Use uncached public listing responses initially, so approve/unpublish decisions are visible on the next gallery fetch without a Vercel deployment. Image and download routes must check current approval state; do not redirect visitors to public bucket URLs. Already downloaded copies cannot be revoked.

Adjust surrounding gallery, footer, and metadata wording that currently implies every item on the site is an MIT-licensed downloadable template. Explain that Templates and contributed HTML are reusable, while external community websites retain their own terms.

## Submission form and consent

Provide an Add your website action in the Community panel and a discoverable header action. Use the site's existing visual language and an accessible dialog with focus management, labeled errors, upload feedback, pending/success states, and preserved input after recoverable failures.

Minimum fields are website URL and creator display name. Additional optional fields are title, description, credit URL, private contact email, screenshot, and standalone HTML. Explain optional fields plainly, especially that HTML is only needed to offer a download.

Every submission requires an unchecked confirmation that the submitter created the work or has permission to submit it, and grants permission to display the submitted listing, credit, and screenshot. Link the community submission terms and privacy explanation.

Selecting HTML reveals a second, independently unchecked agreement: the contributor has the rights to distribute the file and its included assets; the uploaded template is contributed under MIT, including modification, redistribution, personal and commercial reuse subject to MIT's notice requirements. This agreement applies to the uploaded artifact, not the entire linked website. It must be impossible to submit HTML without this consent. Store consent text versions and timestamps.

On success, state that the submission was received and awaits review. Do not promise publication or an email. Return an opaque receipt ID, not a public pending-submission URL. Closing and reopening after success starts a new submission; retries after an uncertain network result must not create duplicate records.

## Submission processing and storage

The Next.js browser submits multipart form data directly to the Worker's public endpoint; large files do not pass through a Vercel function. Limit allowed browser origins to the configured production frontend and explicitly configured development hosts. CORS is a browser boundary, not authentication.

The Worker validates fields, checks Cloudflare Turnstile server-side (including expected hostname/action), enforces a submission throttle, checks upload size/type, and generates all IDs and object keys. Accept HTTPS website/credit URLs without embedded credentials; reject invalid schemes and localhost/private literal targets. Do not perform URL fetches or redirect expansion. Validate actual screenshot bytes, disallow SVG, and serve screenshots with their verified image type. Never accept repository paths, arbitrary R2 keys, or HTML injected into listing text.

Store each received file under an unpredictable submission-specific key in the private bucket. Store SHA-256, byte length, media type, original sanitized filename, and object key in D1. Use parameterized SQL for all data operations.

A submission becomes pending only after all declared uploads have been stored successfully. Object storage and D1 are not an atomic transaction: use a nonpublic receiving state while processing; on failure compensate by deleting created objects and discarding the incomplete row. Use a scheduled cleanup for abandoned receiving rows/objects older than 24 hours. Apply a request deadline and expose explicit retryable errors.

Support an idempotency key bound to the normalized fields and file digests. Repeating a completed identical request returns its receipt; the same key with a different payload returns a conflict. Do not reuse a completed submission's consumed Turnstile token to create a second submission.

Author's proposed abuse budget: five submission attempts per IP per hour and 100 successful submissions per day across the service, with 429 feedback. Store only a rotating keyed IP hash for short-lived throttle records, never the raw IP. Apply the hourly reservation before file writes and enforce the daily success cap atomically. Purge expired throttle records daily. Limits are configurable and documented; Turnstile and payload caps remain mandatory.

## Data model

One submission record is the canonical source for review and publication; do not maintain an independently synchronized gallery table.

Record fields include: UUID; status (`receiving`, `pending`, `approved`, `rejected`, `unpublished`); normalized website URL; creator name; optional credit URL; display title; description; private optional email; created/updated/reviewed/approved timestamps; reviewer identity; private review note; listing and HTML consent versions/timestamps; HTML and screenshot asset metadata; and the idempotency binding.

Keep immutable consent evidence and a small review audit table recording actor, action, time, and old/new status. Admin edits can adjust title, description, creator display name, and credit URL. Website URL and uploaded bytes are immutable for a submission; replacing them requires a new submission and review. Editing public metadata after approval does not retroactively change the recorded consent.

Store HTML asset approval separately from listing status. The owner may approve a website while declining its optional HTML; then the listing appears without a download. Approval cannot make missing, failed, or unconsented HTML downloadable.

Index status plus approval timestamp and stable ID for public pagination; index status plus creation time for the review queue. Public serializers must explicitly allowlist fields. Email and consent/audit records are never exposed by list, image, or download endpoints.

## Review and administration

The Worker serves an admin page under `/admin`, with all private data and mutations under `/admin/api/*`. Cloudflare Access protects `/admin` and its descendants using email PIN sign-in restricted to the configured owner email. The Worker independently verifies the Access JWT signature, issuer, audience, expiry, and allowed email on every admin route. Misconfigured authentication fails closed. Do not trust an identity header without verifying its signed assertion. Validate same-origin mutations and a CSRF token; private responses use no-store.

The review queue supports Pending, Approved, Rejected, and Unpublished filters. Show submitted fields, consent evidence, asset names/sizes, original website and credit links, private email when provided, and previous review actions. Offer explicit Approve, Reject, Unpublish, and Delete controls with error feedback. Use row version checks so stale screens cannot silently overwrite another decision.

Approve publishes the listing immediately. For HTML, require a distinct reviewer choice to enable the download after checking the file and consent. Review uploaded HTML as text or an attachment, never execute it inside the admin or gallery origin. Screenshots may be displayed as validated raster images. The owner can contact a creator manually using the supplied email.

Reject keeps the record out of the public API and schedules private asset deletion after 30 days. Unpublish immediately removes a previously approved listing and disables its assets on subsequent requests while retaining the record for review. Delete removes personal/listing data and objects, retaining only a minimal nonpersonal deletion audit event. Record retention: delete rejected submissions after 30 days and unreviewed pending submissions after 180 days. Approved records and license evidence are retained while published; unpublish alone is not a deletion request. Document the contact method for correction/removal requests.

## Downloads and licensing boundaries

Keep R2 private with no public bucket endpoint. Public image/download handlers resolve an approved submission by ID and then resolve a server-owned object key. Pending, rejected, unpublished, deleted, or HTML-declined records return 404 through the public routes.

HTML responses use `Content-Disposition: attachment` with a generated filename, `application/octet-stream`, and `X-Content-Type-Options: nosniff`. Do not serve contributor HTML as an executable page under the frontend or admin hostname. Prepend an HTML comment containing the standard MIT notice and the contributor's copyright attribution to the downloadable copy, preserving existing notices. Store the immutable original and its digest privately; the download adds the notice without otherwise rewriting the template. Do not market uploads as automatically certified standalone: the reviewer checks that the HTML works independently before enabling its download.

Update CONTRIBUTING.md to distinguish repository code contributions from community listings and optional HTML grants. Add community terms/privacy and license-scope explanations in the product and README. MIT applies to project code and explicitly contributed HTML, except separately identified third-party material. Merely listing a website does not license its source, text, branding, or assets. Listing/screenshot display permission is separate from the HTML license. Keep the standard root LICENSE unchanged.

## API boundaries

- `POST /v1/submissions`: bounded multipart submission, Turnstile and consent validation, idempotency, private asset receipt; returns 201 for a newly pending submission or the existing receipt for an identical retry.
- `GET /v1/community`: approved public projection, bounded query, optional download filter, opaque cursor, maximum 24 records.
- `GET /v1/community/:id/image`: approved validated raster screenshot only, or 404; no raw R2 key input.
- `GET /v1/community/:id/download`: currently approved HTML with license notice as an attachment, or 404.
- `/admin` and `/admin/*`: protected admin shell and assets.
- `/admin/api/submissions`: protected paginated review data.
- `/admin/api/submissions/:id`: authenticated detail, explicit metadata edits, versioned moderation operations, and deletion.
- `/admin/api/submissions/:id/assets/:kind`: authenticated original asset attachment/text access for review; never HTML execution.

The builder chooses precise JSON envelopes, cursor encoding, library names, and internal module boundaries. Specify and test error statuses for invalid input, missing consent, oversized payload, authentication failure, stale moderation, quota limits, and storage failures.

## Deployment and development

Keep a dedicated Cloudflare backend directory with its own Wrangler configuration, TypeScript target, D1 migrations, and local development instructions. Do not apply Next.js ESLint/browser globals blindly to the Worker. Keep frontend integration within the existing gallery group; no cross-template imports.

Configure the frontend with a public Worker base URL and Turnstile site key only. Configure Cloudflare with D1/R2 bindings, Turnstile secret, allowed frontend origins, Access team/issuer and application audience, allowed admin email, and a secret IP-hash key. No Cloudflare API token, storage secret, or Access private credential goes in public environment variables.

A chosen Worker hostname can be a workers.dev hostname or a dedicated custom hostname. The frontend's Vercel domain does not need to move. Document the exact Access destinations for the deployed hostname and verify alternative Worker/preview hostnames cannot bypass JWT enforcement. The builder confirms current supported Access hostname/path configuration against official docs before deployment.

Local development uses Wrangler's local D1/R2 and official Turnstile test keys. An explicit local-only admin identity stub is allowed only on loopback under the local runtime; production must reject it even if a request supplies matching headers. Preview environments cannot access production private records. Apply migrations before enabling the frontend and verify Access before inviting public submissions.

Free usage is a target, not an unconditional cost guarantee. R2 activation requires its checkout/subscription flow and can incur charges beyond included usage. Do not upgrade to a paid Workers plan automatically. Use explicit upload limits, retention, and throttling to bound avoidable storage consumption. Account login, R2 activation, and any billing acceptance are owner setup steps; do not provision or deploy production resources merely by writing this design.

## Verification and delivery criteria

- Link-only submission works without an account and creates only a pending private record.
- Consent is required; HTML additionally requires the MIT/rights acknowledgment.
- File-size/type limits, throttling, idempotency, failed-upload cleanup, and retention are exercised against the local Worker/D1/R2 environment.
- An anonymous client cannot read pending records, private emails, consent evidence, assets, or admin routes; forged/expired/wrong-audience Access tokens fail.
- Approval publishes only approved public fields and assets; HTML needs separate approval. Reject/unpublish/delete disable public access on subsequent requests.
- Download responses include the correct license notice, preserve the original template, and force attachment delivery.
- Community search, pagination, keyboard tabs, browser URL state, empty/error/loading states, and responsive layouts work. Existing template filtering, voting, copy/download actions, and commission form continue working.
- Run focused Worker integration tests and frontend behavior tests, then existing repository checks, lint, tests, and production build. Check installed Next.js documentation before implementation, as AGENTS.md requires.
- Deliver a backend setup guide, environment examples without secrets, reviewed D1 migrations, community terms, and a deployment checklist that distinguishes completed local work from owner account configuration and live verification.

## References

- [Cloudflare D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/)
- [Cloudflare R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [Cloudflare R2 activation](https://developers.cloudflare.com/r2/get-started/)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare Access with Workers](https://developers.cloudflare.com/workers/configuration/cloudflare-access/)
- [Cloudflare Access email PIN](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/one-time-pin/)
- [Cloudflare Turnstile plans](https://developers.cloudflare.com/turnstile/plans/)
- [MIT license terms](https://choosealicense.com/licenses/mit/)

## Approval boundary

This document is the complete proposed design. The next step after owner approval is an implementation plan using the writing-plans skill. No mockups are needed. Implementation and live resource setup have not been authorized by this document alone.
