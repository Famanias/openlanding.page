"use client";

import { useEffect, useState } from "react";

export type StageMode = "pinned" | "flow";

export function useStageMode(): StageMode {
  const [mode, setMode] = useState<StageMode>("flow");

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    );

    const update = () => {
      setMode(mq.matches ? "pinned" : "flow");
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return mode;
}
