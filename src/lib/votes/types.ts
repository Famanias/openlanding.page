export type VoteDirection = "up" | "down";
export type VoteCounts = { up: number; down: number };
export type CountsBySlug = Record<string, VoteCounts>;
export type VotesBySlug = Record<string, VoteDirection>;
export type VoteResult = VoteCounts & { myVote: VoteDirection | null; accepted: boolean };

export interface VoteStore {
  counts(slugs: string[]): Promise<CountsBySlug>;
  mine(slugs: string[], voter: string): Promise<VotesBySlug>;
  hasVoted(slug: string, voter: string): Promise<boolean>;
  vote(slug: string, voter: string, dir: VoteDirection): Promise<VoteResult>;
  revoke(slug: string, voter: string, dir: VoteDirection): Promise<VoteResult>;
  limit(key: string, kind: "minute" | "daily"): Promise<{ success: boolean; reset: number }>;
}
