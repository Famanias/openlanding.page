"use client";
import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { bandLayout, stageHandoff, stageTier } from "./staging";
import {
  canPinMaking,
  makingScrollDistance,
  makingSequence,
  MAKING_PARTS,
} from "./makingSequence";
import {
  CHAPTERS,
  FRAMES,
  sampleChapter,
  type DirectorState,
  type StageRect,
} from "./director";
export function ScrollDirector({
  directorRef,
  onChapter,
}: {
  directorRef: RefObject<DirectorState>;
  onChapter: (n: number) => void;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const sections = CHAPTERS.map((id) => document.getElementById(id)!);
    const copyBlocks = sections.flatMap((el) =>
      Array.from(
        el.querySelectorAll<HTMLElement>(".am-chapter-copy,.am-control"),
      ),
    );
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    let starts: number[] = [],
      slots: StageRect[] = [],
      lastChapter = -1,
      lastY = window.scrollY,
      cancelled = false;
    const initialHash = location.hash;
    let userNavigated = false;
    const noteNavigation = () => {
      userNavigated = true;
    };
    const navigationEvents = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
    ] as const;
    navigationEvents.forEach((event) =>
      window.addEventListener(event, noteNavigation, { passive: true }),
    );
    let lenis: Lenis | undefined;
    const making = sections[4];
    let pinDistance = 0;
    const layoutMaking = () => {
      const pin = canPinMaking(innerWidth, innerHeight, query.matches);
      pinDistance = pin ? makingScrollDistance(innerHeight) : 0;
      making.dataset.pinned = String(pin);
      page.dataset.makingPinned = String(pin);
      making.style.setProperty("--am-making-distance", `${pinDistance}px`);
    };
    const measure = () => {
      starts = sections.map(
        (el) => el.getBoundingClientRect().top + window.scrollY,
      );
      slots = sections.map((el, index) => {
        const anchor = el.querySelector<HTMLElement>("[data-stage-anchor]")!;
        const r = anchor.getBoundingClientRect();
        if (innerWidth <= 900) {
          const band = bandLayout(
            innerWidth,
            innerHeight,
            index,
            index === 4 && pinDistance > 0,
          );
          return {
            left: 12,
            top: band.top,
            width: innerWidth - 24,
            height: band.height,
          };
        }
        return {
          left: r.left,
          top:
            r.top -
            (
              el.querySelector<HTMLElement>("[data-chapter-frame]") ?? el
            ).getBoundingClientRect().top,
          width: r.width,
          height: r.height,
        };
      });
    };
    const update = () => {
      const y = window.scrollY;
      let chapter = 0;
      for (let i = 0; i < starts.length; i++)
        if (y >= starts[i] - 2) chapter = i;
      const end =
        starts[chapter + 1] ??
        document.documentElement.scrollHeight - window.innerHeight;
      const documentLocal = Math.max(
        0,
        Math.min(1, (y - starts[chapter]) / Math.max(1, end - starts[chapter])),
      );
      const held =
        chapter === 4 && pinDistance > 0
          ? makingSequence(y, starts[4], pinDistance, innerHeight)
          : null;
      const local = held?.progress ?? documentLocal;
      const transitionLocal = held?.transition ?? local;
      const frame = sampleChapter(chapter, transitionLocal),
        rectA = slots[chapter],
        rectB = slots[Math.min(chapter + 1, 5)];
      const t = Math.max(0, Math.min(1, (transitionLocal - 0.62) / 0.38)),
        blend = t * t * (3 - 2 * t);
      const reduced = query.matches,
        stacked = innerWidth <= 900;
      const obstacles = copyBlocks
        .map((el) => el.getBoundingClientRect())
        .filter((r) => r.bottom > 0 && r.top < innerHeight)
        .map((r) => ({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        }));
      const handoff = stageHandoff(
        rectA,
        rectB,
        blend,
        obstacles,
        reduced,
        stacked,
        chapter === 1 ? 150 : 0,
      );
      const rect = handoff.rect;
      page.dataset.stageTier = stageTier(innerWidth);
      page.style.setProperty(
        "--am-band-bottom",
        `${rect.top + rect.height + (chapter === 1 ? 154 : 30)}px`,
      );
      Object.assign(
        directorRef.current,
        reduced
          ? {
              ...FRAMES[chapter],
              open: 1,
              explode: 0,
              ...(chapter === 5 ? { camera: [2, 3, 11], scale: 0.92 } : {}),
            }
          : frame,
        {
          chapter,
          local,
          rect,
          stageOpacity: handoff.opacity,
          reduced,
          progress:
            y /
            Math.max(1, document.documentElement.scrollHeight - innerHeight),
          ready: true,
        },
      );
      if (y > 30) directorRef.current.interrupted = true;
      page.style.setProperty(
        "--scroll-progress",
        String(directorRef.current.progress),
      );
      page.style.setProperty("--am-scene-progress", String(local));
      page.dataset.chapter = String(chapter);
      page
        .querySelectorAll<HTMLElement>("[data-scene]")
        .forEach((scene, i) =>
          scene.style.setProperty(
            "--scene-opacity",
            String(
              reduced
                ? Number(i === chapter)
                : i === chapter
                  ? chapter === 5
                    ? 1
                    : 1 - blend
                  : i === chapter + 1
                    ? blend
                    : 0,
            ),
          ),
        );
      const header = page.querySelector<HTMLElement>(".am-header");
      if (header && Math.abs(y - lastY) > 2) {
        header.dataset.hidden = String(y > lastY && y > 160);
        lastY = y;
      }
      if (chapter !== lastChapter) {
        lastChapter = chapter;
        onChapter(chapter);
      }
      const steps = page.querySelectorAll<HTMLElement>(".am-making li");
      const step =
        held?.step ??
        Math.min(steps.length - 1, Math.floor(local * steps.length));
      steps.forEach((el, i) => {
        const active = chapter === 4 && i === step;
        el.classList.toggle("is-current", active);
        if (active) el.setAttribute("aria-current", "step");
        else el.removeAttribute("aria-current");
      });
      if (chapter === 4) {
        making.dataset.step = String(step + 1);
        making.dataset.holding = String(Boolean(held && held.release === 0));
        const counter = making.querySelector("[data-making-counter]");
        const label = `${String(step + 1).padStart(2, "0")} / ${steps.length}`;
        if (counter && counter.textContent !== label)
          counter.textContent = label;
      } else making.dataset.holding = "false";
      if (chapter === 4 && !reduced) {
        directorRef.current.explode = Math.sin(local * Math.PI) * 0.9;
        directorRef.current.highlight = MAKING_PARTS[step];
      }
    };
    layoutMaking();
    measure();
    update();
    const trigger = ScrollTrigger.create({
      trigger: page,
      start: "top top",
      end: "bottom bottom",
      onUpdate: update,
      onRefresh: () => {
        measure();
        update();
      },
    });
    const frame = (time: number) => lenis?.raf(time * 1000);
    const configure = () => {
      lenis?.destroy();
      lenis = undefined;
      gsap.ticker.remove(frame);
      if (!query.matches && matchMedia("(pointer:fine)").matches) {
        lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          anchors: { offset: -88 },
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(frame);
      }
      const wasHolding =
        directorRef.current.chapter === 4 && making.dataset.pinned === "true";
      layoutMaking();
      measure();
      if (wasHolding && query.matches)
        window.scrollTo({ top: starts[4], behavior: "instant" });
      ScrollTrigger.refresh();
      update();
    };
    configure();
    query.addEventListener("change", configure);
    const resize = () => {
      const chapter = directorRef.current.chapter,
        local = directorRef.current.local;
      const holding =
        chapter === 4 &&
        making.dataset.pinned === "true" &&
        making.dataset.holding === "true";
      layoutMaking();
      measure();
      lenis?.resize();
      if (holding) {
        const top = starts[4] + (pinDistance ? local * pinDistance : 0);
        if (lenis) lenis.scrollTo(top, { immediate: true });
        else window.scrollTo({ top, behavior: "instant" });
      }
      ScrollTrigger.refresh();
      update();
    };
    window.addEventListener("resize", resize);
    // Native scrolling also updates the still scene when motion is reduced.
    window.addEventListener("scroll", update, { passive: true });
    void document.fonts.ready.then(() => {
      if (!cancelled) {
        measure();
        directorRef.current.introStart = performance.now() + 650;
        // Pin spacing is added after server rendering. Honour an initial later-chapter
        // fragment against the final layout, without overriding a visitor's own input.
        const anchor = CHAPTERS.findIndex((id) => `#${id}` === initialHash);
        if (anchor > 4 && !userNavigated && location.hash === initialHash) {
          if (lenis) {
            lenis.resize();
            lenis.scrollTo(starts[anchor], { immediate: true });
          } else window.scrollTo({ top: starts[anchor], behavior: "instant" });
        }
        update();
      }
    });
    return () => {
      cancelled = true;
      trigger.kill();
      lenis?.destroy();
      gsap.ticker.remove(frame);
      query.removeEventListener("change", configure);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", update);
      navigationEvents.forEach((event) =>
        window.removeEventListener(event, noteNavigation),
      );
      delete making.dataset.pinned;
      delete making.dataset.holding;
      delete page.dataset.makingPinned;
      making.style.removeProperty("--am-making-distance");
    };
  }, [directorRef, onChapter]);
  return null;
}
