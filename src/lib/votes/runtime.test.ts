import { afterEach, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });
function clearConfig() {
  for (const key of ["KV_REST_API_URL", "KV_REST_API_TOKEN", "UPSTASH_REDIS_REST_URL", "UPSTASH_REDIS_REST_TOKEN", "VOTES_HMAC_SECRET", "VERCEL", "VOTES_ALLOW_MEMORY"]) vi.stubEnv(key, "");
}
it("fails closed in production instead of silently accepting temporary votes", async () => {
  clearConfig();
  vi.stubEnv("NODE_ENV", "production");
  const { getVoteRuntime } = await import("./runtime");
  expect(() => getVoteRuntime()).toThrow("Voting requires Redis");
});
it("never permits Vercel to use the local memory override", async () => {
  clearConfig();
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("VERCEL", "1");
  vi.stubEnv("VOTES_ALLOW_MEMORY", "1");
  const { getVoteRuntime } = await import("./runtime");
  expect(() => getVoteRuntime()).toThrow("Voting requires Redis");
});
it("keeps a single development store and secret in the process", async () => {
  clearConfig();
  vi.stubEnv("NODE_ENV", "development");
  const { getVoteRuntime } = await import("./runtime");
  const first = getVoteRuntime();
  expect(getVoteRuntime()).toBe(first);
  expect(first.secret.length).toBeGreaterThanOrEqual(32);
  await first.store.vote("orrery", "test", "up");
  expect((await getVoteRuntime().store.counts(["orrery"])).orrery.up).toBe(1);
});
