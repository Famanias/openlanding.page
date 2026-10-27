"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { formatClock } from "../night/clock";
import { planNight, type NightError, type NightPlan } from "../night/your-night";

const ERRORS: Record<NightError, string> = {
  format: "Use a time like 23:30.",
  "same-time": "Bedtime and wake time can't match.",
  "too-long": "That's longer than a night.",
};

type Props = { onPlan?: (plan: NightPlan | null, times: { bed: string; wake: string }) => void; className?: string };

/** Bedtime + wake time → cycles and the smart-wake moment. The same maths drives the 3D dawn shoreline. */
export function NightCalculator({ onPlan, className }: Props) {
  const id = useId();
  const [bed, setBed] = useState("23:30");
  const [wake, setWake] = useState("07:00");
  const [win, setWin] = useState(30);
  const result = useMemo(() => planNight(bed, wake, win), [bed, wake, win]);

  useEffect(() => {
    onPlan?.(result.ok ? result.plan : null, { bed, wake });
  }, [result, bed, wake, onPlan]);

  return (
    <div className={`lt-calc ${className ?? ""}`}>
      <div className="lt-calc__fields">
        <label className="lt-field">
          <span className="lt-field__label">Bedtime</span>
          <input className="lt-input" type="time" value={bed} onChange={(e) => setBed(e.target.value)} required />
        </label>
        <label className="lt-field">
          <span className="lt-field__label">Wake by</span>
          <input className="lt-input" type="time" value={wake} onChange={(e) => setWake(e.target.value)} required />
        </label>
        <label className="lt-field lt-field--wide">
          <span className="lt-field__label">Wake window <span className="lt-mono">{win} min</span></span>
          <input className="lt-range" type="range" min={10} max={30} step={5} value={win} onChange={(e) => setWin(Number(e.target.value))} />
        </label>
      </div>
      <div className="lt-calc__out" aria-live="polite" id={`${id}-out`}>
        {result.ok ? (
          <>
            <p className="lt-calc__line">
              <span className="lt-mono">{result.plan.cycleCount} tides out and in</span>
              <span>The ring wakes you at <output className="lt-calc__wake">{formatClock(result.plan.bedMin + result.plan.smartWakeMin)}</output></span>
            </p>
            <CycleChart plan={result.plan} />
          </>
        ) : (
          <p className="lt-calc__error" role="alert">{ERRORS[result.error]}</p>
        )}
      </div>
    </div>
  );
}

/** A small tide chart: one dip per 90-minute cycle, with the smart-wake point marked. */
function CycleChart({ plan }: { plan: NightPlan }) {
  const W = 320;
  const H = 64;
  const pts: string[] = [];
  for (let i = 0; i <= 96; i++) {
    const t = (i / 96) * plan.durationMin;
    const y = H / 2 + Math.cos((t / 90) * Math.PI * 2) * (H / 2 - 8);
    pts.push(`${((t / plan.durationMin) * W).toFixed(1)},${y.toFixed(1)}`);
  }
  const wx = (plan.smartWakeMin / plan.durationMin) * W;
  const wy = H / 2 + Math.cos((plan.smartWakeMin / 90) * Math.PI * 2) * (H / 2 - 8);
  return (
    <svg className="lt-calc__chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${plan.cycleCount} sleep cycles, smart wake marked`}>
      <polyline points={pts.join(" ")} />
      <circle cx={wx} cy={wy} r="4.5" />
    </svg>
  );
}
