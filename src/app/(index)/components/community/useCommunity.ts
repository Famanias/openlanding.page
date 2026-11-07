"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CommunityClientError, getCommunityPage } from "../../../../lib/community/client";
import type { CommunityItem } from "../../../../lib/community/contracts";

export interface UseCommunityOptions {
  query: string;
  downloadsOnly: boolean;
  enabled: boolean;
  baseUrl?: string;
}

export interface UseCommunityResult {
  items: CommunityItem[];
  loading: boolean;
  error: string | null;
  errorCode: string | null;
  nextCursor: string | null;
  loadMore: () => void;
  retry: () => void;
}

export function useCommunity({
  query,
  downloadsOnly,
  enabled,
  baseUrl = process.env.NEXT_PUBLIC_COMMUNITY_API_URL ?? "",
}: UseCommunityOptions): UseCommunityResult {
  const [items, setItems] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const generationRef = useRef<number>(0);
  const activeControllerRef = useRef<AbortController | null>(null);
  const loadingMoreCursorRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      activeControllerRef.current?.abort();
      activeControllerRef.current = null;
      loadingMoreCursorRef.current = null;
      return;
    }

    generationRef.current += 1;
    const currentGen = generationRef.current;

    activeControllerRef.current?.abort();
    const controller = new AbortController();
    activeControllerRef.current = controller;
    loadingMoreCursorRef.current = null;

    setLoading(true);
    setError(null);
    setErrorCode(null);

    void (async () => {
      try {
        const page = await getCommunityPage(
          baseUrl,
          { query, downloadsOnly },
          controller.signal,
        );
        if (controller.signal.aborted || generationRef.current !== currentGen) {
          return;
        }
        setItems(page.items);
        setNextCursor(page.nextCursor);
        setLoading(false);
      } catch (err) {
        if (
          controller.signal.aborted ||
          generationRef.current !== currentGen ||
          (err as { name?: string })?.name === "AbortError"
        ) {
          return;
        }
        setItems([]);
        setNextCursor(null);
        setError(
          err instanceof Error
            ? err.message
            : "Community gallery is temporarily unavailable.",
        );
        setErrorCode(err instanceof CommunityClientError ? err.code : "service_error");
        setLoading(false);
      }
    })();

    return () => {
      controller.abort();
    };
  }, [baseUrl, query, downloadsOnly, enabled, reloadNonce]);

  const loadMore = useCallback(() => {
    if (!enabled || !nextCursor || loading) {
      return;
    }
    if (loadingMoreCursorRef.current === nextCursor) {
      return;
    }

    const cursorToFetch = nextCursor;
    loadingMoreCursorRef.current = cursorToFetch;
    const currentGen = generationRef.current;

    const controller = new AbortController();
    activeControllerRef.current = controller;
    setLoading(true);
    setError(null);
    setErrorCode(null);

    void (async () => {
      try {
        const page = await getCommunityPage(
          baseUrl,
          { query, downloadsOnly, cursor: cursorToFetch },
          controller.signal,
        );
        if (controller.signal.aborted || generationRef.current !== currentGen) {
          return;
        }
        setItems((prev) => {
          const seen = new Set(prev.map((item) => item.id));
          const merged = [...prev];
          for (const item of page.items) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              merged.push(item);
            }
          }
          return merged;
        });
        setNextCursor(page.nextCursor);
        loadingMoreCursorRef.current = null;
        setLoading(false);
      } catch (err) {
        if (
          controller.signal.aborted ||
          generationRef.current !== currentGen ||
          (err as { name?: string })?.name === "AbortError"
        ) {
          return;
        }
        loadingMoreCursorRef.current = null;
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load more community websites.",
        );
        setErrorCode(err instanceof CommunityClientError ? err.code : "service_error");
        setLoading(false);
      }
    })();
  }, [baseUrl, downloadsOnly, enabled, loading, nextCursor, query]);

  const retry = useCallback(() => {
    if (nextCursor && items.length > 0) {
      loadingMoreCursorRef.current = null;
      loadMore();
      return;
    }
    setReloadNonce((n) => n + 1);
  }, [items.length, loadMore, nextCursor]);

  return {
    items,
    loading,
    error,
    errorCode,
    nextCursor,
    loadMore,
    retry,
  };
}
