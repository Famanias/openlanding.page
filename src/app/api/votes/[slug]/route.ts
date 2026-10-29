import type { NextRequest } from "next/server";
import { TEMPLATES } from "../../../(index)/data/templates";
import { getVoteRuntime } from "../../../../lib/votes/runtime";
import { handleVote, voteError } from "../../../../lib/votes/http";

async function mutate(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const { store, secret } = getVoteRuntime();
    return await handleVote(request, slug, TEMPLATES.map((item) => item.slug), store, secret);
  } catch { return voteError("Voting is temporarily unavailable. Please try again.", 503); }
}

export async function POST(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  return mutate(request, context);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  return mutate(request, context);
}
