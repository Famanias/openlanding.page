"use client";

import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { ROLE_IDS, ROLE_LIST, type RoleId } from "../content/roles";
import { isSettled, springStep, type SpringState } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";
import { useRole } from "./RoleProvider";
import { cablePath, jackCenterX, stepRole } from "./routing";

const HEIGHT = 168;
const PLUG_Y = 84;
const ORIGIN = { x: 30, y: 24 };
const BASE_SAG = 34;
const MAX_EXTRA_SAG = 60;

/**
 * The page's signature control. A cable hangs from the IN jack to a plug that
 * is driven by a damped spring; the plug overshoots and latches into the jack
 * you chose. Geometry is written straight to the DOM, never through state.
 */
export function PatchBay() {
  const { role, setRole } = useRole();
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const plugRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<Partial<Record<RoleId, HTMLButtonElement | null>>>({});
  const widthRef = useRef(0);
  const springRef = useRef<SpringState>({ value: 0, velocity: 0 });
  const targetRef = useRef(0);
  const frameRef = useRef(0);
  const lastRef = useRef(0);

  const paint = useCallback(() => {
    const { value, velocity } = springRef.current;
    const sag = BASE_SAG + Math.min(MAX_EXTRA_SAG, Math.abs(velocity) * 0.05);
    pathRef.current?.setAttribute("d", cablePath(ORIGIN, { x: value, y: PLUG_Y }, sag));
    plugRef.current?.style.setProperty("--plug-x", `${value.toFixed(1)}px`);
  }, []);

  const setSeated = useCallback((seated: boolean) => {
    const plug = plugRef.current;
    if (plug) plug.dataset.seated = String(seated);
  }, []);

  const run = useCallback(() => {
    if (frameRef.current) return;
    lastRef.current = performance.now();
    setSeated(false);
    const tick = (now: number) => {
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      springRef.current = springStep(springRef.current, targetRef.current, dt);
      paint();
      if (isSettled(springRef.current, targetRef.current)) {
        springRef.current = { value: targetRef.current, velocity: 0 };
        paint();
        frameRef.current = 0;
        setSeated(true);
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [paint, setSeated]);

  const retarget = useCallback(
    (snap: boolean) => {
      if (!widthRef.current) return;
      targetRef.current = jackCenterX(ROLE_IDS.indexOf(role), ROLE_IDS.length, widthRef.current);
      if (snap || reduced) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
        springRef.current = { value: targetRef.current, velocity: 0 };
        paint();
        setSeated(true);
      } else {
        run();
      }
    },
    [paint, reduced, role, run, setSeated],
  );

  // Held in a ref so the observer is created once; re-creating it on every role change would snap the plug and cancel the spring.
  const retargetRef = useRef(retarget);
  useEffect(() => {
    retargetRef.current = retarget;
  }, [retarget]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(([entry]) => {
      widthRef.current = entry.contentRect.width;
      wrap.dataset.ready = "true";
      retargetRef.current(true);
    });
    observer.observe(wrap);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    };
  }, []);

  const mountedRef = useRef(false);
  useEffect(() => {
    // The first run is handled by the observer's initial snap.
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    retarget(false);
  }, [role, retarget]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const delta = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = stepRole(role, delta);
    setRole(next);
    buttonRefs.current[next]?.focus();
  };

  return (
    <div className="pby-bay-wrap">
      <div className="pby-bay-head pby-mono">
        <span>PATCHBAY / 04 JACKS</span>
        <span className="pby-led-row" aria-hidden="true">
          <i className="pby-led" />
          SIGNAL
        </span>
      </div>
      <div ref={wrapRef} className="pby-bay" style={{ height: HEIGHT }} data-ready="false">
        <span className="pby-bay-in pby-mono" aria-hidden="true">
          IN
        </span>
        <svg className="pby-cable" width="100%" height={HEIGHT} aria-hidden="true">
          <path ref={pathRef} d={cablePath(ORIGIN, { x: ORIGIN.x, y: PLUG_Y }, BASE_SAG)} />
        </svg>
        <span ref={plugRef} className="pby-plug" data-seated="true" aria-hidden="true" />
        <div className="pby-jacks" role="radiogroup" aria-label="Choose which discipline to route the page to" onKeyDown={onKeyDown}>
          {ROLE_LIST.map((item) => {
            const active = item.id === role;
            return (
              <button
                key={item.id}
                ref={(node) => {
                  buttonRefs.current[item.id] = node;
                }}
                type="button"
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                className="pby-jack"
                data-active={active}
                onClick={() => setRole(item.id)}
              >
                <span className="pby-jack-hole" aria-hidden="true" />
                <span className="pby-jack-label">{item.label}</span>
                <span className="pby-jack-code pby-mono" aria-hidden="true">
                  {item.code}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
