"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";

/** Small client island; its label is server-rendered, so the action is visible in the initial HTML. */
export function CopyPromptButton({ prompt, className = "" }: { prompt: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state !== "copied") return;
    const timer = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(prompt);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <button type="button" onClick={copy} data-copied={state === "copied"} className={className}>
        {state === "copied" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        <span aria-live="polite">{state === "copied" ? "Copied prompt" : "Copy prompt"}</span>
      </button>
      {state === "error" && <p className="copy-error" role="alert">Couldn&apos;t copy. Open the Markdown prompt instead.</p>}
    </>
  );
}
