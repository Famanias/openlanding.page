import type { NextRequest } from "next/server";
import { TEMPLATES } from "../../../(index)/data/templates";
import { getVoteRuntime, voterHash } from "../../../../lib/votes/runtime";
import { privateHeaders, readVisitor, voteError } from "../../../../lib/votes/http";

export async function GET(request: NextRequest) {
  const vid = readVisitor(request);
  if (!vid) return Response.json({}, { headers: privateHeaders });
  try {
    const { store, secret } = getVoteRuntime();
    return Response.json(await store.mine(TEMPLATES.map((item) => item.slug), voterHash(secret, vid)), { headers: privateHeaders });
  } catch { return voteError("Voting is temporarily unavailable.", 503); }
}
