"use client";
import { useEffect, useState } from "react";
import { clinicStatus, type ClinicStatus } from "./hours";

/**
 * The live door sign. The server renders a neutral line (the visitor's clock is unknown there); after mount
 * it reads the local time and re-checks every minute. The dot breathes while the doors are open.
 */
export function OpenNow() {
  const [status, setStatus] = useState<ClinicStatus | null>(null);

  useEffect(() => {
    const tick = () => setStatus(clinicStatus(new Date()));
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 60_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  return (
    <p className="sn-open" data-open={status ? String(status.open) : "unknown"} data-sn-open>
      <span className="sn-open-dot" aria-hidden="true" />
      <span className="sn-open-label">{status ? status.label : "Open seven days"}</span>
      <span className="sn-open-detail sn-chart">{status ? status.detail : "Night vet on call, every night"}</span>
    </p>
  );
}
