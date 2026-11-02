"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import type { MercerSceneController } from "../scene/MercerSceneController";
import { ExperimentStatusCard, FpsBadge, TerminalCodeCard } from "./HudCards";
import TorusKnotFallback from "./TorusKnotFallback";

type RenderState = "preview" | "running" | "paused" | "static" | "unavailable" | "lost";
const ARROW_DIRECTIONS = new Map<string, [number, number]>([
  ["ArrowLeft", [1, 0]], ["ArrowRight", [-1, 0]], ["ArrowUp", [0, 1]], ["ArrowDown", [0, -1]],
]);

export default function MercerTorusKnotCanvas({ suspended = false, onOpenExperiment }: { suspended?: boolean; onOpenExperiment?: () => void }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<MercerSceneController | null>(null);
  const syncRef = useRef<(() => void) | null>(null);
  const playbackRef = useRef({ paused: false, suspended });
  const [state, setState] = useState<RenderState>("preview");
  const [fps, setFps] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    playbackRef.current = { paused, suspended };
    syncRef.current?.();
  }, [paused, suspended]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let visible = true;
    let lost = false;
    let generation = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const controller = controllerRef.current;
      if (!controller || lost) return;
      const shouldRun = !motion.matches && visible && !document.hidden && !playbackRef.current.paused && !playbackRef.current.suspended;
      if (shouldRun) controller.start();
      else controller.stop();
      setState(shouldRun ? "running" : "paused");
    };
    syncRef.current = sync;

    const resize = () => controllerRef.current?.resize(host.clientWidth, host.clientHeight);
    const mount = async () => {
      const currentGeneration = ++generation;
      if (motion.matches) {
        controllerRef.current?.dispose();
        controllerRef.current = null;
        setState("static");
        return;
      }
      try {
        const { MercerSceneController: Controller } = await import("../scene/MercerSceneController");
        if (cancelled || motion.matches || currentGeneration !== generation) return;
        controllerRef.current?.dispose();
        lost = false;
        const controller = new Controller({
          onFps: (measured) => { if (!cancelled) setFps(measured); },
          onInteractionChange: (active) => { if (!cancelled) setDragging(active); },
          onContextChange: (context) => {
            if (cancelled) return;
            lost = context === "lost";
            if (lost) setState("lost");
            else sync();
          },
        });
        controllerRef.current = controller;
        controller.init(host);
        resize();
        sync();
      } catch {
        controllerRef.current?.dispose();
        controllerRef.current = null;
        if (!cancelled) setState("unavailable");
      }
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.01 });
    intersection.observe(host);
    motion.addEventListener("change", mount);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("resize", resize);
    void mount();

    return () => {
      cancelled = true;
      generation++;
      syncRef.current = null;
      observer.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", mount);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("resize", resize);
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, []);

  const movePointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (bounds.width > 0 && bounds.height > 0) {
      controllerRef.current?.setPointer((event.clientX - bounds.left) / bounds.width * 2 - 1, (event.clientY - bounds.top) / bounds.height * 2 - 1);
    }
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.ctrlKey || event.metaKey || event.altKey) return;
    const direction = ARROW_DIRECTIONS.get(event.key);
    if (direction) {
      event.preventDefault();
      if (event.shiftKey) controllerRef.current?.panView(-direction[0], -direction[1]);
      else controllerRef.current?.rotateView(direction[0], direction[1]);
    } else if (event.key.toLowerCase() === "r" || event.key === "Home") {
      event.preventDefault();
      controllerRef.current?.resetView();
    }
  };
  const online = state === "running" || state === "paused";

  return (
    <figure id="experiment" className="jm-stage" data-state={state} data-dragging={dragging} onPointerMove={movePointer} onPointerLeave={() => controllerRef.current?.setPointer(0, 0)}>
      <figcaption id="jm-knot-help" className="jm-sr-only">Procedural (2,3) torus knot in cyan and chartreuse. Drag to rotate; Shift+drag to move. Arrow keys rotate the view, Shift+Arrow keys move it, and R or Home resets it. On touch screens, drag horizontally to rotate and swipe vertically to scroll.</figcaption>
      <div className="jm-canvas-host" ref={hostRef} data-testid="mercer-canvas-container" role="group" aria-label="Interactive torus knot" aria-describedby="jm-knot-help" tabIndex={online ? 0 : -1} onKeyDown={handleKeyDown} />
      <TorusKnotFallback />
      <div className="jm-stage-reticle jm-reticle-one" aria-hidden="true" />
      <div className="jm-stage-reticle jm-reticle-two" aria-hidden="true" />
      <FpsBadge fps={state === "running" ? fps : 0} />
      <TerminalCodeCard onOpen={onOpenExperiment} />
      <ExperimentStatusCard online={online} paused={state === "paused"} />
      <div className="jm-stage-controls jm-mono">
        <span>{state === "static" ? "REDUCED MOTION / STATIC VIEW" : state === "unavailable" ? "WEBGL UNAVAILABLE / STATIC VIEW" : state === "lost" ? "RESTORING WEBGL / STATIC VIEW" : dragging ? "DRAGGING / RELEASE TO SET VIEW" : <>DRAG TO ROTATE<span className="jm-pan-hint"> / SHIFT+DRAG TO MOVE</span></>}</span>
        {online && <button type="button" onClick={() => controllerRef.current?.resetView()} aria-label="Reset view" title="Reset view (R)"><RotateCcw size={12} aria-hidden="true" /></button>}
        {online && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play animation" : "Pause animation"} aria-pressed={paused}>
          {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        </button>}
      </div>
    </figure>
  );
}
