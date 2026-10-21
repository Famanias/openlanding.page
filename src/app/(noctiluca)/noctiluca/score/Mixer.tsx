"use client";

import { useEffect, useId, useState, type CSSProperties } from "react";
import { setScore } from "../house/frame";
import { DEFAULT_SCORE, scorePalette, scoreReadout, srgbToCss, type Score } from "./score";

const PRESETS: { name: string; score: Score }[] = [
  { name: "Orchid", score: DEFAULT_SCORE },
  { name: "Glacier", score: { hue: 215, drift: 18, bloom: 78 } },
  { name: "Moss", score: { hue: 148, drift: 30, bloom: 46 } },
  { name: "Ember", score: { hue: 42, drift: 62, bloom: 34 } },
];

const DIALS: { key: keyof Score; label: string; max: number; unit: (v: number) => string }[] = [
  { key: "hue", label: "Hue", max: 359, unit: (v) => `${v}°` },
  { key: "drift", label: "Drift", max: 100, unit: (v) => (v / 100).toFixed(2) },
  { key: "bloom", label: "Bloom", max: 100, unit: (v) => `${v}%` },
];

/** Paint the Score Room's still light (poster, plaque edge, the doorway into it) to match. */
function paint(stops: string[]) {
  const keys = ["a", "b", "c", "d"];
  document.querySelectorAll<HTMLElement>('[data-room="score"]').forEach((el) => {
    stops.forEach((c, i) => el.style.setProperty(`--nl-${keys[i]}`, c));
  });
  document.querySelectorAll<HTMLElement>('[data-room="alpenglow"]').forEach((el) => {
    stops.forEach((c, i) => el.style.setProperty(`--nl-next-${keys[i]}`, c));
  });
}

export function Mixer() {
  const [score, setLocal] = useState<Score>(DEFAULT_SCORE);
  const id = useId();
  const stops = scorePalette(score.hue).map(srgbToCss);

  useEffect(() => {
    setScore(score);
    paint(stops);
    // stops derive from score.hue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const update = (key: keyof Score, value: number) => setLocal((s) => ({ ...s, [key]: value }));
  const active = PRESETS.find((p) => p.score.hue === score.hue && p.score.drift === score.drift && p.score.bloom === score.bloom);

  return (
    <div className="nl-mixer">
      <div className="nl-mixer-presets" role="group" aria-label="Starting scores">
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            className="nl-chip"
            aria-pressed={active?.name === p.name}
            onClick={() => setLocal(p.score)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="nl-dials">
        {DIALS.map((dial) => (
          <div className="nl-dial" key={dial.key}>
            <label htmlFor={`${id}-${dial.key}`} className="nl-dial-label">
              {dial.label}
            </label>
            {/* Not <output>: its implicit live region would announce every step of the drag. */}
            <span className="nl-dial-value" aria-hidden="true">
              {dial.unit(score[dial.key])}
            </span>
            <input
              id={`${id}-${dial.key}`}
              type="range"
              min={0}
              max={dial.max}
              step={1}
              value={score[dial.key]}
              aria-valuetext={dial.unit(score[dial.key])}
              onChange={(e) => update(dial.key, Number(e.target.value))}
              className="nl-range"
              data-dial={dial.key}
              style={dial.key === "hue" ? undefined : ({ "--nl-fill": `${score[dial.key]}%` } as CSSProperties)}
            />
          </div>
        ))}
      </div>

      <div className="nl-score-sheet">
        <div className="nl-score-strip" aria-hidden="true">
          {stops.map((c, i) => (
            <span key={i} style={{ background: c }} />
          ))}
        </div>
        <p className="nl-score-readout" data-testid="score-readout">
          {scoreReadout(score)}
        </p>
      </div>
    </div>
  );
}
