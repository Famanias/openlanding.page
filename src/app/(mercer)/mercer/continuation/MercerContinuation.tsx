"use client";

import { useEffect, useRef } from "react";
import { CONTINUATION_MARKUP } from "./continuationMarkup";
import { mountContinuation } from "./continuationRuntime";

export default function MercerContinuation() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (root) return mountContinuation(root);
  }, []);

  return (
    <>
      {/* Reviewed static authored markup, never runtime input. Its original script is mounted with cleanup above. */}
      <section id="jm-continuation" aria-label="Jules Mercer — portfolio continuation" ref={rootRef} dangerouslySetInnerHTML={{ __html: CONTINUATION_MARKUP }} />
      <noscript><style>{`#jm-continuation .jmc-reveal{opacity:1;transform:none;clip-path:none}`}</style></noscript>
    </>
  );
}
