import { connection } from "next/server";
import { TEMPLATES } from "../../(index)/data/templates";
import { getDownloadRuntime } from "../../../lib/downloads";
import { voteError } from "../../../lib/votes/http";

export async function GET() {
  await connection();
  try {
    const slugs = TEMPLATES.filter((item) => item.hasDownload).map((item) => item.slug);
    const counts = await getDownloadRuntime().store.counts(slugs);
    return Response.json(counts, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } });
  } catch {
    return voteError("Download counts are temporarily unavailable.", 503);
  }
}
