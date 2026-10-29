"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";
import { TEMPLATES } from "../data/templates";
import type { CountsBySlug, VoteCounts, VoteDirection, VoteResult, VotesBySlug } from "../../../lib/votes/types";

const storageKey = "olp-votes-v1";
const knownSlugs = new Set<string>(TEMPLATES.map((item) => item.slug));
function validVotes(value: unknown): VotesBySlug {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).filter(([slug, dir]) => knownSlugs.has(slug) && (dir === "up" || dir === "down")));
}
function readLocalVotes() {
  try { return validVotes(JSON.parse(localStorage.getItem(storageKey) ?? "{}")); } catch { return {}; }
}
function saveVotes(mine: VotesBySlug) {
  try { localStorage.setItem(storageKey, JSON.stringify(mine)); } catch { /* Private mode may block storage. */ }
}
function saveVote(slug: string, dir: VoteDirection | null) {
  const mine = readLocalVotes();
  if (dir) mine[slug] = dir;
  else delete mine[slug];
  saveVotes(mine);
}
type State = { counts?: CountsBySlug; mine: VotesBySlug; pending?: string; errors: Record<string, string>; ready: boolean; unavailable: boolean };
type Action =
  | { type: "load"; counts: CountsBySlug; mine: VotesBySlug }
  | { type: "local"; mine: VotesBySlug }
  | { type: "unavailable" }
  | { type: "start"; slug: string; dir: VoteDirection; revoking: boolean }
  | { type: "finish"; slug: string; result: VoteResult }
  | { type: "error"; slug: string; previous: VoteCounts; message: string };
function reducer(state: State, action: Action): State {
  if (action.type === "load") return { ...state, counts: action.counts, mine: action.mine, ready: true, unavailable: false };
  if (action.type === "local") return { ...state, mine: action.mine, ready: false };
  if (action.type === "unavailable") return { ...state, ready: false, unavailable: true };
  const counts = { ...state.counts };
  const value = { ...(counts[action.slug] ?? { up: 0, down: 0 }) };
  if (action.type === "start") {
    value[action.dir] = Math.max(0, value[action.dir] + (action.revoking ? -1 : 1));
    counts[action.slug] = value;
    return { ...state, counts, pending: action.slug, errors: { ...state.errors, [action.slug]: "" } };
  }
  if (action.type === "finish") {
    counts[action.slug] = { up: action.result.up, down: action.result.down };
    const mine = { ...state.mine };
    if (action.result.myVote) mine[action.slug] = action.result.myVote;
    else delete mine[action.slug];
    return { ...state, counts, pending: undefined, mine };
  }
  counts[action.slug] = action.previous;
  return { ...state, counts, pending: undefined, errors: { ...state.errors, [action.slug]: action.message } };
}

export function useGalleryVotes() {
  const [state, dispatch] = useReducer(reducer, { mine: {}, errors: {}, ready: false, unavailable: false });
  const inFlight = useRef(false);
  const [reload, retry] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    const controller = new AbortController();
    dispatch({ type: "local", mine: readLocalVotes() });
    const syncStorage = () => { if (!inFlight.current) retry(); };
    window.addEventListener("storage", syncStorage);
    const get = async (url: string) => {
      const response = await fetch(url, { signal: controller.signal, cache: "no-store" });
      if (!response.ok) throw new Error("Voting unavailable");
      return response.json();
    };
    Promise.all([get("/api/votes"), get("/api/votes/me")]).then(([counts, mine]) => {
      if (!controller.signal.aborted) {
        const restored = validVotes(mine);
        saveVotes(restored);
        dispatch({ type: "load", counts, mine: restored });
      }
    }).catch(() => { if (!controller.signal.aborted) dispatch({ type: "unavailable" }); });
    return () => { controller.abort(); window.removeEventListener("storage", syncStorage); };
  }, [reload]);

  const vote = useCallback(async (slug: string, dir: VoteDirection) => {
    if (!state.ready || inFlight.current || state.mine[slug] && state.mine[slug] !== dir) return;
    const revoking = state.mine[slug] === dir;
    const previous = state.counts?.[slug] ?? { up: 0, down: 0 };
    inFlight.current = true;
    dispatch({ type: "start", slug, dir, revoking });
    try {
      const response = await fetch(`/api/votes/${slug}`, { method: revoking ? "DELETE" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ dir }) });
      const result = await response.json();
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Couldn't vote. Please try again.");
      if ((result.myVote !== "up" && result.myVote !== "down" && result.myVote !== null) || !Number.isSafeInteger(result.up) || !Number.isSafeInteger(result.down) || result.up < 0 || result.down < 0) throw new Error("Couldn't confirm your vote. Please try again.");
      saveVote(slug, result.myVote);
      dispatch({ type: "finish", slug, result });
    } catch (error) {
      dispatch({ type: "error", slug, previous, message: error instanceof Error ? error.message : "Couldn't vote. Please try again." });
    } finally { inFlight.current = false; }
  }, [state.ready, state.mine, state.counts]);
  return { ...state, vote, retry };
}
