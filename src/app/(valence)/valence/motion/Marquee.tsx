"use client";

import React, { useSyncExternalStore } from "react";
import { valenceStore } from "../capsule/store";

type MarqueeProps = {
  items: string[];
  className?: string;
};

export function Marquee({ items, className = "" }: MarqueeProps) {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  return (
    <div
      className={`overflow-hidden rounded-full border border-[#1E1B2E]/15 bg-[#FBF9F5] py-3 ${className}`}
      aria-label="Key 2026 Funnel Benchmark Findings"
    >
      <div
        className="vl-marquee-track gap-8 px-4"
        data-paused={snapshot.ambientPaused ? "true" : "false"}
      >
        {[0, 1].map((copyIdx) => (
          <div
            key={copyIdx}
            className="flex items-center gap-8 shrink-0"
            aria-hidden={copyIdx === 1 ? "true" : undefined}
          >
            {items.map((item, idx) => (
              <span
                key={`${copyIdx}-${idx}`}
                className="inline-flex items-center gap-3 vl-mono text-xs text-[#1E1B2E]"
              >
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      idx % 3 === 0 ? "#E8E0F8" : idx % 3 === 1 ? "#D9F2E6" : "#FCE2D5",
                    border: "1.5px solid #1E1B2E",
                  }}
                />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
