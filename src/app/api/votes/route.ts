import { connection } from "next/server";
import { TEMPLATES } from "../../(index)/data/templates";
import { getVoteRuntime } from "../../../lib/votes/runtime";
import { voteError } from "../../../lib/votes/http";

export async function GET() {
  await connection();
  try {
    const counts = await getVoteRuntime().store.counts(TEMPLATES.map((item) => item.slug));
    return Response.json(counts, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } });
  } catch { return voteError("Voting is temporarily unavailable.", 503); }
}
