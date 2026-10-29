"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import { Soundscape } from "./soundscape";
import type { DirectorState } from "../scene/director";
export function SoundToggle({
  director,
}: {
  director: RefObject<DirectorState>;
}) {
  const [enabled, setEnabled] = useState(false),
    [preferred, setPreferred] = useState(false),
    audio = useRef<Soundscape | null>(null);
  useEffect(() => {
    try {
      setPreferred(localStorage.getItem("amaoto-rain-sound") === "on");
    } catch {}
    const timer = setInterval(() => {
      const state = director.current;
      audio.current?.updateProgress(
        state.world,
        state.rainIntensity,
        state.timeOfDay,
      );
    }, 120);
    const visibility = () => audio.current?.visibility();
    document.addEventListener("visibilitychange", visibility);
    const gust = () => audio.current?.gust();
    document.addEventListener("amaoto-gust", gust);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
      document.removeEventListener("amaoto-gust", gust);
      audio.current?.dispose();
      audio.current = null;
    };
  }, [director]);
  return (
    <button
      className="am-sound"
      type="button"
      aria-pressed={enabled}
      aria-label={`Atelier sound: ${enabled ? "on" : "off"}`}
      title={
        !enabled && preferred
          ? "Your saved preference is on. Click to start sound."
          : undefined
      }
      onClick={() => {
        const next = !enabled;
        try {
          audio.current ??= new Soundscape();
          void audio.current
            .setEnabled(next)
            .then(() => setEnabled(next))
            .catch(() => setEnabled(false));
        } catch {
          setEnabled(false);
        }
        try {
          localStorage.setItem("amaoto-rain-sound", next ? "on" : "off");
        } catch {}
      }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 10V14M8 6V18M12 3V21M16 7V17M20 10V14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
      <span>Sound: {enabled ? "on" : "off"}</span>
    </button>
  );
}
