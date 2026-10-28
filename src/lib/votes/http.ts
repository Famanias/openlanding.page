import { randomBytes } from "node:crypto";
import { isIP } from "node:net";
import { NextRequest, NextResponse } from "next/server";
import { dailyIpHash, voterHash } from "./runtime";
import type { VoteStore } from "./types";

export const privateHeaders = { "Cache-Control": "private, no-store" };
export function voteError(message: string, status: number, extra: Record<string, string> = {}) {
  return NextResponse.json({ error: message }, { status, headers: { ...privateHeaders, ...extra } });
}
export function readVisitor(request: NextRequest) {
  const value = request.cookies.get("olp_vid")?.value;
  return value && /^[a-f0-9]{32}$/.test(value) ? value : undefined;
}

async function readDirection(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return null;
  const reader = request.body?.getReader();
  if (!reader) return null;
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > 256) { await reader.cancel(); return null; }
      chunks.push(part.value);
    }
    const body: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!body || typeof body !== "object" || !("dir" in body)) return null;
    return body.dir === "up" || body.dir === "down" ? body.dir : null;
  } catch { return null; }
  finally { reader.releaseLock(); }
}

export async function handleVote(request: NextRequest, slug: string, slugs: string[], store: VoteStore, secret: string) {
  if (!slugs.includes(slug)) return voteError("Template not found.", 404);
  if (request.headers.get("origin") !== new URL(request.url).origin) return voteError("Vote from the gallery page.", 403);
  const dir = await readDirection(request);
  if (!dir) return voteError("Choose a like or dislike.", 400);

  // Vercel overwrites this header. Never accept arbitrary forwarded IPs off-platform.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.trim() : "127.0.0.1";
  if (!ip || !isIP(ip)) return voteError("Voting is temporarily unavailable.", 503);
  const ipHash = dailyIpHash(secret, ip);
  const minute = await store.limit(ipHash, "minute");
  if (!minute.success) return voteError("Too many votes. Please try again later.", 429,
    { "Retry-After": String(Math.max(1, Math.ceil((minute.reset - Date.now()) / 1000))) });

  const vid = readVisitor(request) ?? randomBytes(16).toString("hex");
  const voter = voterHash(secret, vid);
  const existing = await store.mine([slug], voter);
  if (!existing[slug]) {
    const daily = await store.limit(`${ipHash}:${slug}`, "daily");
    if (!daily.success) return voteError("This network has reached its daily limit for this template. Try again tomorrow.", 429,
      { "Retry-After": String(Math.max(1, Math.ceil((daily.reset - Date.now()) / 1000))) });
  }
  const result = await store.vote(slug, voter, dir);
  const response = NextResponse.json(result, { headers: privateHeaders });
  response.cookies.set("olp_vid", vid, { httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 730, path: "/" });
  return response;
}
