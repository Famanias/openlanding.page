# Gallery votes, sorting and standalone downloads

Agreed 2026-10-28. Work only in this worktree; leave LOAM unchanged. No commit, push or deployment without a request.

## 1. Dates and sorting

Backfill literal ISO creation dates from the first Git addition of each template route group. Require creation dates in gallery registration. Preserve append order as the same-day tie breaker and remove the AMAOTO pin. Add URL-backed date/likes and ascending/descending sorting; default to latest added with no URL parameters. Reset filters preserves sorting. Like sorting falls back to latest added while counts load.

## 2. Permanent anonymous votes

Add the approved @upstash/redis and @upstash/ratelimit packages. Implement a small VoteStore with Upstash and development/test memory implementations. One atomic first-write-wins operation records either an up or down vote and increments its count once. There is no delete or switch operation.

Validate slugs, direction, origin and bounded JSON bodies. Issue a random 128-bit HttpOnly, Secure, SameSite=Lax visitor cookie on voting; store only its HMAC. Rate limit with daily HMAC IP identifiers, including a per-template daily limit on new voters. Trust platform-provided IP headers only on Vercel. Production requires Redis and a strong HMAC secret and fails closed without them.

Expose public counts with brief CDN caching, private no-store vote restoration, and a no-store POST endpoint. Fetch counts on the client to preserve the cached gallery page. Restore vote state from the server and localStorage, optimistically update counts, reconcile responses and handle failures. Show both counts; permanently disable both buttons after voting, highlight the chosen vote, and provide accessible names, status and error text.

## 3. Readable HTML downloads, in batches

The user chose readable vanilla files over automated bundles. Start the batch with the supplied Alpine Reel reference, moved to public/downloads/alpine-reel.html. Show Download HTML only for files declared available; downloads never scrape live pages or copy HTML to the clipboard. Keep prompt copying separate. Additional faithful vanilla ports can land as later batches; do not claim that unavailable downloads exist.

Require new templates to register their creation date and ship a readable public/downloads/{slug}.html file. Update registration documentation, generator metadata and media checks. Standalone files use inline CSS/JS and remote assets or pinned CDNs and work under file:// without site-origin or /_next requests.

## Verification

Test date and URL sorting, immutable votes and concurrency, rate-limit rejection and route validation, private/public caching, client persistence and errors, download content and clipboard preservation. Run repository checks, Vitest, TypeScript, lint, the index/discovery/motion browser suites and file:// download smoke tests. Inspect desktop/mobile controls and reduced motion. Document infrastructure variables and remaining Marketplace provisioning without accessing or exposing secrets.
