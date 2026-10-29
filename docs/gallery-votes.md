# Gallery voting

Voting needs no account. A browser can hold one active like or dislike per template. Clicking the selected thumb removes it; the visitor can then choose either direction again. Both totals are public. Clearing cookies, changing browsers or using a different network can bypass anonymous identity; accounts would be needed for stronger uniqueness.

## Production setup

Provision the approved Upstash Redis integration in the Vercel Marketplace and link it to the `templateflow` project. Configure all target environments:

- `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`). Use the write token.
- `VOTES_HMAC_SECRET`: a stable, random secret with at least 32 bytes. Generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and save it in the environment secret manager.

Pull development variables with `vercel env pull` after provisioning. Keep secret files untracked. Changing the HMAC secret changes visitor identity and should be treated as a migration, since existing voters would otherwise be able to vote again.

Without configuration, local development uses process-local memory. Tests use the same fake. To test a local production build, explicitly set `VOTES_ALLOW_MEMORY=1`; Vercel ignores that switch and always requires Redis. Memory is lost on restart and is unsuitable for deployment. Production returns 503 when configuration or storage is unavailable.

## Storage and abuse controls

An opaque random 128-bit `olp_vid` cookie is HttpOnly, Secure, SameSite=Lax and lasts two years. Redis stores the HMAC of this identifier, never the raw identifier. Counts are stored in `counts:{slug}` and visitor choices in `votes:{slug}`. An atomic Lua script records a vote only when no active vote exists. A separate atomic revocation script matches the requested direction, decrements its counter once and writes a `none` tombstone. Repeated revocations are no-ops, counters stay nonnegative, and a stale request for one direction cannot remove the opposite direction. Existing up/down records remain compatible without migration.

Requests require the same Origin as the request URL, an active registered slug, and an up/down JSON direction. Bodies are capped at 256 bytes. Rate limits allow 20 requests per minute per network and five new voter/template pairs per day per network. Known visitors can revoke and cast again without consuming the new-voter daily allowance. Both POST and DELETE requests count toward the minute limit. DELETE requires the existing visitor cookie and a matching up/down direction; it never creates a new identity. IPs are HMACed with a daily derived salt and never stored raw. Only Vercel's overwritten `x-vercel-forwarded-for` header is trusted; off-platform development uses a shared loopback bucket. Other hosting platforms need their own trusted proxy integration before deployment.

The Upstash rate limiter uses no analytics, no raw IP identifiers and no fail-open timeout. Expiring rate-limit keys contain only daily hashes. Voter hashes and tombstones have no expiry, allowing returning voters to be recognized without resetting the new-voter abuse limit. Browser localStorage contains only slug/direction hints; the server is authoritative on restoration as well as submission. Server restoration replaces stale hints and storage events refresh other tabs, including removals.

`GET /api/votes` pipelines all counts and advertises 30-second CDN caching with 60-second stale revalidation. `GET /api/votes/me`, vote POSTs and revocation DELETEs are private and no-store. `DELETE /api/votes/{slug}` takes `{ dir: "up" | "down" }` and returns the updated counts, `myVote` (null when removed) and `accepted`. The cached gallery page fetches votes on the client, so public counts can lag briefly on another visitor's screen. A submitted vote reconciles immediately with the atomic server result. Failed requests restore the optimistic count and allow retry; replaying after a lost response remains safe.

Reference: [Upstash rate limiter documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted) and [TypeScript Redis SDK](https://upstash.com/docs/redis/sdks/ts/getstarted).
