"use client";

import { useCallback, useRef, useState } from "react";
import { CALIBRATION_MODES, focusState, modeAt, snapAngle, type CalibrationMode } from "./geometry";

type DialVars = React.CSSProperties & { "--nu-angle"?: string; "--nu-aperture"?: number };

function angleFromPointer(event: PointerEvent | React.PointerEvent, element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  return (Math.atan2(y, x) * 180) / Math.PI + 90;
}

export function CalibrationDial() {
  const dialRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pendingRef = useRef(0);
  const draggingRef = useRef(false);
  const [mode, setMode] = useState<CalibrationMode>("screen");
  const [angle, setAngle] = useState(0);
  const state = focusState(mode, angle);

  const writeLive = useCallback((nextAngle: number) => {
    const element = dialRef.current;
    if (!element) return;
    const liveMode = modeAt(nextAngle);
    const live = focusState(liveMode, nextAngle);
    element.style.setProperty("--nu-angle", `${live.rotation}deg`);
    element.style.setProperty("--nu-aperture", String(live.aperture));
    element.dataset.dragMode = liveMode;
  }, []);

  const scheduleLive = (nextAngle: number) => {
    pendingRef.current = nextAngle;
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      writeLive(pendingRef.current);
    });
  };

  const commit = (rawAngle: number) => {
    const nextAngle = snapAngle(rawAngle);
    const nextMode = modeAt(nextAngle);
    setAngle(nextAngle);
    setMode(nextMode);
    writeLive(nextAngle);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    scheduleLive(angleFromPointer(event, event.currentTarget));
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    scheduleLive(angleFromPointer(event, event.currentTarget));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const raw = angleFromPointer(event, event.currentTarget);
    commit(raw);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const chooseMode = (nextMode: CalibrationMode) => {
    const marker = CALIBRATION_MODES.find((item) => item.id === nextMode)?.marker ?? 0;
    setMode(nextMode);
    setAngle(marker);
    writeLive(marker);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    if (event.key === "Home") return chooseMode("screen");
    if (event.key === "End") return chooseMode("night");
    const direction = event.key === "ArrowRight" ? 1 : -1;
    commit(angle + direction * 15);
  };

  const style: DialVars = { "--nu-angle": `${state.rotation}deg`, "--nu-aperture": state.aperture };

  return (
    <div className="nu-dial" ref={dialRef} style={style} role="slider" tabIndex={0} aria-label="Calibration focus dial" aria-valuemin={0} aria-valuemax={360} aria-valuenow={state.rotation} aria-valuetext={`${state.mode} calibration`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onKeyDown={onKeyDown}>
      <div className="nu-dial__shadow" aria-hidden="true" />
      <div className="nu-dial__face" aria-hidden="true">
        <div className="nu-dial__ticks" />
        <div className="nu-dial__ring" />
        <div className="nu-dial__lens"><div className="nu-dial__crosshair" /></div>
        <div className="nu-dial__readout"><strong>{state.mode}</strong><span>{Math.round(state.transmission * 100)}% light</span></div>
      </div>
      <span className="nu-dial__hint">drag / ← →</span>
      <div className="nu-dial__mode-buttons" role="group" aria-label="Choose calibration mode">
        {CALIBRATION_MODES.map((item) => (
          <button key={item.id} type="button" className="nu-mode-button" aria-pressed={mode === item.id} onClick={(event) => { event.stopPropagation(); chooseMode(item.id); }}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
