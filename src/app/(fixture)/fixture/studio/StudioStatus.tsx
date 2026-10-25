"use client";

import { useEffect, useState } from "react";
import { studioStatus, type StudioStatus as Status } from "./hours";

/** The shop sign, for the studio itself. Renders the plain hours on the server, then the live state each minute. */
export function StudioStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const tick = () => setStatus(studioStatus(new Date()));
    tick();
    const timer = window.setInterval(tick, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={`fx-status ${className ?? ""}`} data-open={status ? String(status.open) : undefined}>
      <span className="fx-status__dot" aria-hidden="true" />
      <span className="fx-status__label">{status ? status.label : "Mon–Fri 09–18 CET"}</span>
    </span>
  );
}
