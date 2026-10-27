"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WORLD_FILES } from "../assets";
import { Logo } from "../brand/Logo";
import { chapter } from "../content/story";
import type { World } from "../engine/types";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";
import { Finale } from "./Finale";
import { stepCalm, stepRoughness } from "../night/sea-state";
import { stepChapter, tideLevel } from "../night/tide";
import { canMountExperience, readEnvironment } from "./gate";
import { createInputs } from "./inputs";
import { MoonDial, type MoonDialHandle } from "./MoonDial";
import { createNightScroll, type NightScroll } from "./nightScroll";
import type { Soundscape } from "../sound/soundscape";
import { createSoundSwitch } from "../sound/switch";
import { SoundToggle } from "./SoundToggle";

type Mode = "table" | "booting" | "experience";

/** Interactive parts of the tide table that must not take focus while they are visually hidden. */
const MIRROR_INERT = [".lt-dawn", ".lt-foot"];

function setMode(mode: "table" | "experience") {
  document.documentElement.dataset.ltMode = mode;
  for (const sel of MIRROR_INERT) {
    document.querySelectorAll(sel).forEach((el) => (mode === "experience" ? el.setAttribute("inert", "") : el.removeAttribute("inert")));
  }
}

export function Experience() {
  const [mode, setLocalMode] = useState<Mode>("table");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<World | null>(null);

  // Decide whether to boot, and when: on idle for fine pointers, on the first touch/scroll for touch screens.
  useEffect(() => {
    if (!canMountExperience(readEnvironment())) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      setLocalMode("booting");
    };
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (coarse) {
      window.addEventListener("touchstart", start, { once: true, passive: true });
      window.addEventListener("scroll", start, { once: true, passive: true });
      return () => {
        window.removeEventListener("touchstart", start);
        window.removeEventListener("scroll", start);
      };
    }
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const id = ric(start, { timeout: 1200 });
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
  }, []);

  // Booting: load the engine onto the canvas; any failure leaves the tide table as the page.
  useEffect(() => {
    if (mode !== "booting" || !canvasRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const { createWorld } = await import("../engine/createWorld");
        const world = await createWorld(canvasRef.current!, { fonts: WORLD_FILES.fonts, moonUrl: WORLD_FILES.moon });
        if (cancelled) return world.dispose();
        worldRef.current = world;
        world.onContextLost(() => {
          world.dispose();
          worldRef.current = null;
          setMode("table");
          setLocalMode("table");
        });
        setMode("experience");
        setLocalMode("experience");
      } catch (err) {
        console.warn("LOWTIDE: staying on the tide table", err);
        setMode("table");
        setLocalMode("table");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [mode]);

  useEffect(
    () => () => {
      worldRef.current?.dispose();
      worldRef.current = null;
      setMode("table");
    },
    [],
  );

  if (mode === "table") return null;
  return (
    <div className="lt-xp" data-ready={mode === "experience"}>
      <canvas ref={canvasRef} className="lt-canvas" aria-hidden="true" tabIndex={-1} />
      {mode === "experience" && worldRef.current && <Night world={worldRef.current} canvas={canvasRef.current!} />}
    </div>
  );
}

/** The running night: scroll clock, inputs, sea state, dial and the per-frame call into the world. */
function Night({ world, canvas }: { world: World; canvas: HTMLCanvasElement }) {
  const dialRef = useRef<MoonDialHandle>(null);
  const announcerRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<NightScroll | null>(null);
  const [sound, setSound] = useState(false);
  // The finale mounts once dawn is reached and then stays mounted (resting, inert) so a small rewind never
  // throws away what the visitor typed. Hysteresis: active from 0.995, resting only below 0.98.
  const [finale, setFinale] = useState<"none" | "active" | "resting">("none");
  const finaleRef = useRef<"none" | "active" | "resting">("none");
  // the first press creates the soundscape inside the gesture; later presses fade it in and out
  const soundSwitch = useRef<ReturnType<typeof createSoundSwitch<Soundscape>> | null>(null);
  useEffect(() => {
    const sw = createSoundSwitch<Soundscape>(async () => {
      const { createSoundscape } = await import("../sound/soundscape");
      return createSoundscape();
    }, setSound);
    soundSwitch.current = sw;
    return () => {
      sw.dispose();
      soundSwitch.current = null;
    };
  }, []);
  const soundOn = () => Boolean(soundSwitch.current?.isOn());

  const announce = useCallback((id: ChapterId) => {
    const c = chapter(id);
    if (announcerRef.current) announcerRef.current.textContent = `${c.label}. ${c.headline} ${c.quietLine}`;
    if (soundSwitch.current?.isOn()) soundSwitch.current.get()?.chime();
  }, []);

  useEffect(() => {
    const night = createNightScroll({ onSettle: announce });
    scrollRef.current = night;
    const inputs = createInputs(window);
    night.restore();

    const onResize = () => world.resize(window.innerWidth, window.innerHeight, window.devicePixelRatio || 1);
    window.addEventListener("resize", onResize);
    onResize();

    // Space / arrows / Page keys step between low tides, but never while a control has focus.
    const onKey = (e: KeyboardEvent) => {
      const a = document.activeElement;
      if (a && a !== document.body && a !== canvas) return;
      const p = night.progress();
      const next = [" ", "ArrowDown", "PageDown"].includes(e.key) && !(e.key === " " && e.shiftKey);
      const prev = ["ArrowUp", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey);
      let to: ChapterId | null = next ? stepChapter(p, 1) : prev ? stepChapter(p, -1) : null;
      if (e.key === "Home") to = "hook";
      if (e.key === "End") to = "dawn";
      if (!to) return;
      e.preventDefault();
      night.goTo(to);
    };
    window.addEventListener("keydown", onKey);

    let roughness = 0;
    let calm = 0;
    let last = performance.now();
    const t0 = last;
    let raf = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const { p, velocity } = night.frame(now, dt);
      roughness = stepRoughness(roughness, velocity, dt);
      calm = stepCalm(calm, inputs.stillForMs(), dt);
      const tide = tideLevel(p);
      world.setFrame({ p, tide, roughness, calm, lantern: inputs.lantern(), time: (now - t0) / 1000, dt });
      if (soundOn()) soundSwitch.current?.get()?.update({ tide, roughness, calm, p });
      dialRef.current?.update(p);
      document.documentElement.style.setProperty("--lt-p", p.toFixed(4));
      const was = finaleRef.current;
      const next = p >= CHAPTER_POINTS.dawn - 0.005 ? "active" : was !== "none" && p < CHAPTER_POINTS.dawn - 0.02 ? "resting" : was;
      if (next !== was) {
        finaleRef.current = next;
        setFinale(next);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      inputs.dispose();
      night.destroy();
      scrollRef.current = null;
    };
  }, [world, canvas, announce]);

  return (
    <>
      <div className="lt-track" aria-hidden="true" />
      <div className="lt-hud">
        <Logo className="lt-hud__logo" />
        <SoundToggle on={sound} onToggle={() => soundSwitch.current?.toggle()} />
        <MoonDial
          handleRef={dialRef}
          getProgress={() => scrollRef.current?.progress() ?? 0}
          onGoTo={(id) => scrollRef.current?.goTo(id)}
          onScrub={(p) => scrollRef.current?.scrubTo(p)}
          onHold={(held) => scrollRef.current?.hold(held)}
        />
      </div>
      {finale !== "none" && <Finale world={world} active={finale === "active"} />}
      <p ref={announcerRef} className="lt-sr lt-announcer" aria-live="polite" />
    </>
  );
}
