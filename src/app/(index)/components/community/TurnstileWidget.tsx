"use client";

import React, { useEffect, useImperativeHandle, useRef } from "react";

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_TEST_PASS_SITE_KEY = "1x00000000000000000000AA";

interface TurnstileRenderOptions {
  sitekey: string;
  action?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: (errorCode?: string) => void;
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export interface TurnstileWidgetHandle {
  reset: () => void;
}

export interface TurnstileWidgetProps {
  siteKey: string;
  action?: string;
  onToken: (token: string) => void;
  onExpired: () => void;
  onError: (message: string) => void;
}

let scriptPromise: Promise<TurnstileApi | null> | null = null;

function loadTurnstileScript(): Promise<TurnstileApi | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise<TurnstileApi | null>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
    );
    if (existing) {
      if (window.turnstile) {
        resolve(window.turnstile);
        return;
      }
      existing.addEventListener("load", () => resolve(window.turnstile ?? null), {
        once: true,
      });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => resolve(window.turnstile ?? null), {
      once: true,
    });
    script.addEventListener("error", () => resolve(null), { once: true });
    document.head.appendChild(script);
  });

  return scriptPromise;
}

function isLocalhostPassKey(siteKey: string): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  return (
    siteKey === TURNSTILE_TEST_PASS_SITE_KEY &&
    (host === "localhost" || host === "127.0.0.1")
  );
}

export const TurnstileWidget = React.forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget({ siteKey, action = "community_submit", onToken, onExpired, onError }, ref) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacksRef = useRef({ onToken, onExpired, onError });
    const nonceRef = useRef(0);

    useEffect(() => {
      callbacksRef.current = { onToken, onExpired, onError };
    }, [onToken, onExpired, onError]);

    useImperativeHandle(
      ref,
      () => ({
        reset() {
          nonceRef.current += 1;
          if (isLocalhostPassKey(siteKey)) {
            callbacksRef.current.onToken(`local-test-pass-${nonceRef.current}`);
          } else {
            callbacksRef.current.onToken("");
          }
          if (widgetIdRef.current && window.turnstile) {
            try {
              window.turnstile.reset(widgetIdRef.current);
            } catch {
              // Ignore widget reset errors if script hasn't finished initializing
            }
          }
        },
      }),
      [siteKey],
    );

    useEffect(() => {
      const trimmedSiteKey = (siteKey ?? "").trim();
      if (!trimmedSiteKey) {
        callbacksRef.current.onError("Verification challenge is not configured.");
        return;
      }

      let disposed = false;

      if (isLocalhostPassKey(trimmedSiteKey)) {
        nonceRef.current += 1;
        callbacksRef.current.onToken(`local-test-pass-${nonceRef.current}`);
      }

      void loadTurnstileScript().then((api) => {
        if (disposed || !containerRef.current) {
          return;
        }
        if (!api) {
          if (!isLocalhostPassKey(trimmedSiteKey)) {
            callbacksRef.current.onError(
              "Unable to load verification challenge. Please check your connection and try again.",
            );
          }
          return;
        }

        try {
          const id = api.render(containerRef.current, {
            sitekey: trimmedSiteKey,
            action,
            callback: (token: string) => {
              if (!disposed) {
                callbacksRef.current.onToken(token);
              }
            },
            "expired-callback": () => {
              if (!disposed) {
                callbacksRef.current.onToken("");
                callbacksRef.current.onExpired();
              }
            },
            "error-callback": () => {
              if (!disposed && !isLocalhostPassKey(trimmedSiteKey)) {
                callbacksRef.current.onToken("");
                callbacksRef.current.onError(
                  "Verification challenge failed. Please reset the challenge and try again.",
                );
              }
            },
          });
          widgetIdRef.current = id;
        } catch {
          if (!isLocalhostPassKey(trimmedSiteKey)) {
            callbacksRef.current.onError("Unable to initialize verification challenge.");
          }
        }
      });

      return () => {
        disposed = true;
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // Ignore cleanup errors
          }
          widgetIdRef.current = null;
        }
      };
    }, [siteKey, action]);

    return (
      <div className="community-turnstile-block">
        <div
          ref={containerRef}
          className="community-turnstile-container"
          data-testid="turnstile-widget"
        />
      </div>
    );
  },
);
