# Gallery voting

Voting needs no account. A browser can record one permanent like or dislike per template. Both totals are public. Clearing cookies, changing browsers or using a different network can bypass anonymous identity; accounts would be needed for stronger uniqueness.

## Production setup

Provision the approved Upstash Redis integration in the Vercel Marketplace and link it to the `templateflow` project. Configure all target environments:

- `KV_REST_API_URL` and `KV_REST_API_TOKEN` (or `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`). Use the write token.
- `VOTES_HMAC_SECRET`: a stable, random secret with at least 32 bytes. Generate one with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"` and save it in the environment secret manager.

Pull development variables with `vercel env pull` after provisioning. Keep secret files untracked. Changing the HMAC secret changes visitor identity and should be treated as a migration, since existing voters would otherwise be able to vote again.

Without configuration, local development uses process-local memory. Tests use the same fake. To test a local production build, explicitly set `VOTES_ALLOW_MEMORY=1`; Vercel ignores that switch and always requires Redis. Memory is lost on restart and is unsuitable for deployment. Production returns 503 when configuration or storage is unavailable.

## Storage and abuse controls

An opaque random 128-bit `olp_vid` cookie is HttpOnly, Secure, SameSite=Lax and lasts two years. Redis stores the HMAC of this identifier, never the raw identifier. Counts are stored in `counts:{slug}` and immutable votes in `votes:{slug}`; a Lua script atomically uses HSETNX and increments exactly one counter only for a new vote. There is no removal endpoint.

Requests require the same Origin as the request URL, an active registered slug, and an up/down JSON direction. Bodies are capped at 256 bytes. Rate limits allow 20 requests per minute per network and five new voter/template pairs per day per network. Existing voters can retrieve their final result without consuming the daily allowance. IPs are HMACed with a daily derived salt and never stored raw. Only Vercel's overwritten `x-vercel-forwarded-for` header is trusted; off-platform development uses a shared loopback bucket. Other hosting platforms need their own trusted proxy integration before deployment.

The Upstash rate limiter uses no analytics, no raw IP identifiers and no fail-open timeout. Expiring rate-limit keys contain only daily hashes. Permanent voter hashes have no expiry so the choice cannot be changed. Browser localStorage contains only slug/direction hints; the server is authoritative when reconciling a submitted vote.

`GET /api/votes` pipelines all counts and advertises 30-second CDN caching with 60-second stale revalidation. `GET /api/votes/me` and vote POSTs are private and no-store. The cached gallery page fetches votes on the client, so public counts can lag briefly on another visitor's screen. A submitted vote reconciles immediately with the atomic server result. Failed requests restore the optimistic count and allow retry; replaying after a lost response remains safe.

Reference: [Upstash rate limiter documentation](https://upstash.com/docs/redis/sdks/ratelimit-ts/gettingstarted) and [TypeScript Redis SDK](https://upstash.com/docs/redis/sdks/ts/getstarted).
