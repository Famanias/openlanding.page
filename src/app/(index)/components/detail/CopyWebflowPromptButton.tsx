"use client";

import React, { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import {
  buildFallbackWebflowPrompt,
  type ManifestTemplateInput,
} from "../../../../lib/webflow/manifest";
import { webflowPromptPath } from "./detail-content";

export async function fetchOrBuildWebflowPrompt(template: ManifestTemplateInput): Promise<string> {
  try {
    const res = await fetch(webflowPromptPath(template.slug));
    if (res.ok) {
      const text = await res.text();
      if (text.trim().length > 0) return text;
    }
  } catch {
    // Fallback to client-side prompt generation when offline or in test environments
  }
  return buildFallbackWebflowPrompt(template);
}

/** Small client island to copy the Webflow MCP prompt for a template. */
export function CopyWebflowPromptButton({
  template,
  className = "",
}: {
  template: ManifestTemplateInput;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (state !== "copied") return;
    const timer = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      const text = await fetchOrBuildWebflowPrompt(template);
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("error");
    }
  };

  return (
    <>
      <button type="button" onClick={copy} data-copied={state === "copied"} className={className}>
        {state === "copied" ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        <span aria-live="polite">{state === "copied" ? "Copied Webflow prompt" : "Copy Webflow prompt"}</span>
      </button>
      {state === "error" && (
        <p className="copy-error" role="alert">
          Couldn&apos;t copy. Open the Webflow Markdown prompt instead.
        </p>
      )}
    </>
  );
}
