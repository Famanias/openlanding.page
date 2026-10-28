"use client";
import { paperLitAt } from "../logic/atmosphere";
import { computeTimeOfDay } from "../logic/timeOfDay";
import { useEffect, type RefObject } from "react";
import {
  getChapterStateAtProgress,
  computeCameraPoseAtProgress,
  type ChapterProgressState,
} from "../logic/chapters";
import { smoothstep } from "../logic/rng";
import { worldStageRect, stageTier } from "./staging";
import type { DirectorState } from "./director";
import { createScrollController, type ScrollController } from "./scroll";
import { MAKING_PARTS } from "./makingSequence";
export function ScrollDirector({
  directorRef,
  onChapter,
  enabled = false,
  controlsRef,
  onState,
}: {
  directorRef: RefObject<DirectorState>;
  onChapter: (n: number) => void;
  enabled?: boolean;
  controlsRef?: RefObject<ScrollController | null>;
  onState?: (s: ChapterProgressState) => void;
}) {
  useEffect(() => {
    if (!enabled) return;
    const page = document.querySelector<HTMLElement>(".am-page"),
      track = document.querySelector<HTMLElement>(".am-world-track");
    if (!page || !track) return;
    const panels = [...page.querySelectorAll<HTMLElement>(":scope > section")];
    let last = -1,
      lastSync = 0,
      trailingSync: ReturnType<typeof setTimeout> | undefined;
    const controller = createScrollController(track, (p) => {
      const world = getChapterStateAtProgress(p),
        camera = computeCameraPoseAtProgress(p),
        index = world.activeChapterIndex,
        rect = worldStageRect(p, innerWidth, innerHeight),
        step = Math.min(9, Math.floor(world.benchAssembly * 10));
      Object.assign(directorRef.current, {
        world,
        fov: camera.fov,
        focusDistance: camera.focusDistance,
        progress: p,
        chapter: index,
        local:
          (p - world.activeChapter.startProgress) /
          Math.max(
            0.001,
            world.activeChapter.endProgress - world.activeChapter.startProgress,
          ),
        rect,
        camera: camera.position,
        target: camera.target,
        position: world.anchor,
        rotation: [0, 0, world.genkanSettle * -0.28],
        scale: 1,
        open: world.open,
        explode: world.worldVisibility.bench * (1 - world.benchAssembly) * 0.9,
        rain: world.rainIntensity,
        highlight: index === 4 ? MAKING_PARTS[step] : null,
        reduced: false,
        ready: true,
        interrupted: p > 0,
      });
      page.dataset.chapter = page.dataset.activeChapter = String(index);
      page.dataset.subRest = world.subRest ?? "none";
      page.dataset.paperLit = String(
        paperLitAt(world, computeTimeOfDay(directorRef.current.timeOfDay)) >
          0.45,
      );
      page.dataset.stageTier = stageTier(innerWidth);
      page.style.setProperty("--scroll-progress", String(p));
      panels.forEach((el, i) => {
        const opacity = smoothstep(0.5, 1, world.chapterOpacities[i] ?? 0);
        el.style.setProperty("--chapter-opacity", String(opacity));
        el.style.setProperty("--chapter-rise", `${(1 - opacity) * 105}%`);
        el.inert = opacity < 0.2;
        el.setAttribute("aria-hidden", String(opacity < 0.2));
      });
      if (index !== last) {
        clearTimeout(trailingSync);
        last = index;
        onChapter(index);
        onState?.(world);
        lastSync = performance.now();
      } else if (performance.now() - lastSync > 60) {
        clearTimeout(trailingSync);
        onState?.(world);
        lastSync = performance.now();
      } else {
        // A final scrub/resize value must reach React even after input stops.
        clearTimeout(trailingSync);
        trailingSync = setTimeout(
          () => {
            onState?.(world);
            lastSync = performance.now();
          },
          Math.max(0, 60 - (performance.now() - lastSync)),
        );
      }
    });
    if (controlsRef) controlsRef.current = controller;
    return () => {
      clearTimeout(trailingSync);
      controller.dispose();
      if (controlsRef) controlsRef.current = null;
      panels.forEach((el) => {
        el.inert = false;
        el.removeAttribute("aria-hidden");
        el.style.removeProperty("--chapter-opacity");
        el.style.removeProperty("--chapter-rise");
      });
    };
  }, [enabled, directorRef, onChapter, controlsRef, onState]);
  return null;
}
