import type { NextRequest } from "next/server";
import { TEMPLATES } from "../../../(index)/data/templates";
import { getDownloadRuntime, handleDownloadTrack } from "../../../../lib/downloads";
import { voteError } from "../../../../lib/votes/http";

const downloadableSlugs = new Set<string>(TEMPLATES.filter((item) => item.hasDownload).map((item) => item.slug));

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const { store, secret } = getDownloadRuntime();
    return await handleDownloadTrack(request, slug, downloadableSlugs, store, secret);
  } catch {
    return voteError("Download tracking is temporarily unavailable.", 503);
  }
}
