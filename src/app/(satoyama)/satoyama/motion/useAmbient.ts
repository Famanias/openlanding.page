"use client";

import { useEffect, useState } from "react";

export function useAmbient() {
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  return { paused, stopped: paused || hidden, toggle: () => setPaused((value) => !value) };
}
