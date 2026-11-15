"use client";
import { useEffect } from "react";
import { clamp, damp, progress, round } from "../motion/math";
import { doorFocal, doorRect, thresholdFrame, type Rect, type Size } from "../threshold/geometry";
import { TRAIL_LENGTH, formatMetres, metresAt, metresToDoor, readoutLabel, signalBars, signalLabel, type Anchor } from "./trail";

/**
 * The page's one scroll engine. It measures the waypoint posts once per resize, then on each scrolled frame
 * turns the scroll offset into metres walked and writes the results straight to the DOM: custom properties
 * for the scrubbed scenes, attributes for state, text for the readout. Nothing here touches React state.
 */
export function WalkEngine() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("[data-ew-header]");
    const meter = document.querySelector<HTMLElement>("[data-ew-meter]");
    const readout = document.querySelector<HTMLElement>("[data-ew-readout]");
    const walkedOut = document.querySelector<HTMLElement>("[data-ew-walked]");
    const hero = document.querySelector<HTMLElement>("[data-ew-hero]");
    // hero progress is written on the wrapper it shares with the walk section, so both can read it
    const approach = hero?.parentElement ?? hero;
    const walk = document.querySelector<HTMLElement>("[data-ew-walk]");
    const threshold = document.querySelector<HTMLElement>("[data-ew-threshold]");
    const stage = document.querySelector<HTMLElement>("[data-ew-stage]");
    const navbar = document.querySelector<HTMLElement>("[data-ew-navbar]");
    const posts = [...document.querySelectorAll<HTMLElement>("[data-ew-post]")];
    const navLinks = [...document.querySelectorAll<HTMLElement>("[data-ew-nav]")];
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let anchors: Anchor[] = [];
    let sections: { id: string; top: number }[] = [];
    let viewport = { w: 0, h: 0 };
    let heroBox = { top: 0, height: 1 };
    let thresholdBox = { top: 0, height: 1 };
    let stageSize: Size = { w: 1, h: 1 };
    let door: Rect = { x: 0, y: 0, w: 1, h: 1 };
    let scrubbing = false;
    let maxScroll = 1;

    // last written values, so a frame that changes nothing writes nothing
    const last = { toDoor: -1, bars: -1, inside: "", reached: -1, beat: -1, active: "", state: "", walked: -1, hero: -1, trail: -1, page: -1 };
    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;

    const pageTop = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;

    const measure = () => {
      viewport = { w: window.innerWidth, h: window.innerHeight };
      maxScroll = Math.max(1, root.scrollHeight - viewport.h);
      // a post counts as reached when its head crosses 55% of the way down the viewport
      anchors = posts.map((post) => ({ y: pageTop(post) - viewport.h * 0.55, metres: Number(post.dataset.metres ?? 0) }));
      // the hero is sticky, so its own rect lies once it is stuck: measure its unpinned wrapper instead
      if (hero) heroBox = { top: pageTop(hero.parentElement ?? hero), height: hero.offsetHeight };
      if (threshold) thresholdBox = { top: pageTop(threshold), height: threshold.offsetHeight };
      sections = navLinks
        .map((link) => document.getElementById(link.dataset.ewNav ?? ""))
        .filter((section): section is HTMLElement => section !== null)
        .map((section) => ({ id: section.id, top: pageTop(section) }));

      if (stage) {
        // the stage only pins when the CSS has switched it to the scrubbed layout
        scrubbing = !reducedQuery.matches && getComputedStyle(stage).position === "sticky";
        if (scrubbing) {
          stageSize = { w: stage.clientWidth, h: stage.clientHeight };
          const focal = doorFocal(stageSize);
          door = doorRect(stageSize, focal);
          stage.style.setProperty("--ew-focal", `${round(focal * 100, 2)}%`);
          stage.style.setProperty("--ew-ox", `${round(door.x + door.w / 2, 1)}px`);
          stage.style.setProperty("--ew-oy", `${round(door.y + door.h / 2, 1)}px`);
        }
      }
      last.active = ""; // re-place the nav indicator after a resize
    };

    const writeThreshold = (p: number) => {
      if (!stage) return;
      const f = thresholdFrame(p, stageSize, door);
      const style = stage.style;
      style.setProperty("--ew-ws", `${round(f.worldScale, 4)}`);
      style.setProperty("--ew-wx", `${round(f.worldX, 1)}px`);
      style.setProperty("--ew-wy", `${round(f.worldY, 1)}px`);
      style.setProperty("--ew-is", `${round(f.interiorScale, 4)}`);
      style.setProperty("--ew-ix", `${round(f.interiorX, 1)}px`);
      style.setProperty("--ew-iy", `${round(f.interiorY, 1)}px`);
      style.setProperty("--ew-io", `${round(f.interiorOpacity, 3)}`);
      style.setProperty("--ew-clip", `${round(f.clipTop, 1)}px ${round(f.clipRight, 1)}px ${round(f.clipBottom, 1)}px ${round(f.clipLeft, 1)}px`);
      style.setProperty("--ew-bx", `${round(f.boughsX, 1)}px`);
      style.setProperty("--ew-bs", `${round(f.boughsScale, 3)}`);
      style.setProperty("--ew-bo", `${round(f.boughsOpacity, 3)}`);
      if (f.beat !== last.beat) {
        last.beat = f.beat;
        stage.dataset.beat = String(f.beat);
      }
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const reduced = reducedQuery.matches;

      // the walk: metres, signal, posts
      const walked = metresAt(y, anchors);
      const toDoor = metresToDoor(walked);
      const thresholdP = progress(y, thresholdBox.top, thresholdBox.top + Math.max(1, thresholdBox.height - viewport.h));
      const inside = toDoor === 0 && thresholdP >= 0.7 ? "inside" : "outside";
      if (toDoor !== last.toDoor || inside !== last.inside) {
        last.toDoor = toDoor;
        last.inside = inside;
        if (readout) readout.textContent = inside === "inside" ? "Inside" : readoutLabel(toDoor);
        header?.setAttribute("data-place", inside);
      }
      const bars = signalBars(walked);
      if (bars !== last.bars) {
        last.bars = bars;
        if (meter) {
          meter.dataset.bars = String(bars);
          meter.title = signalLabel(bars);
        }
      }
      const walkedRounded = Math.round(walked / 10) * 10;
      if (walkedRounded !== last.walked) {
        last.walked = walkedRounded;
        if (walkedOut) walkedOut.textContent = formatMetres(walkedRounded);
      }
      let reached = 0;
      for (const anchor of anchors) if (y >= anchor.y - 1) reached++;
      reached = Math.max(1, reached);
      if (reached !== last.reached) {
        last.reached = reached;
        posts.forEach((post, index) => post.setAttribute("data-reached", String(index < reached)));
      }

      // the header: where we are, and whether to step aside
      // the sign stays up for the whole walk, because its readout is the point; it only steps aside once inside
      const direction = y > lastY + 2 ? "down" : y < lastY - 2 ? "up" : "";
      const pastTheDoor = y > thresholdBox.top + thresholdBox.height - viewport.h * 0.5;
      if (direction === "down" && pastTheDoor) hidden = true;
      else if (direction === "up" || !pastTheDoor) hidden = false;
      lastY = y;
      const state = y < 80 ? "top" : hidden && header?.dataset.menu !== "true" ? "hidden" : "pinned";
      if (state !== last.state) {
        last.state = state;
        header?.setAttribute("data-state", state);
      }
      let active = "none";
      for (const section of sections) if (y >= section.top - viewport.h * 0.4) active = section.id;
      if (active !== last.active && navbar) {
        last.active = active;
        navbar.dataset.active = active;
        const link = navLinks.find((candidate) => candidate.dataset.ewNav === active);
        for (const candidate of navLinks) {
          if (candidate === link) candidate.setAttribute("aria-current", "true");
          else candidate.removeAttribute("aria-current");
        }
        if (link) {
          // the indicator is 100 px wide and scaled, so sliding between links only ever animates a transform
          const item = link.parentElement ?? link;
          navbar.style.setProperty("--ew-nav-x", `${item.offsetLeft + 12}px`);
          navbar.style.setProperty("--ew-nav-s", String(round((item.offsetWidth - 24) / 100, 3)));
        }
      }

      // scrubbed values: custom properties only, and none of them under reduced motion
      const page = round(clamp(y / maxScroll), 4);
      if (page !== last.page) {
        last.page = page;
        root.style.setProperty("--ew-page", String(page));
      }
      if (reduced) {
        if (last.hero !== -1) {
          last.hero = -1;
          hero?.removeAttribute("data-away");
          approach?.style.removeProperty("--ew-hero");
        }
        if (last.trail !== -1) {
          last.trail = -1;
          walk?.style.removeProperty("--ew-trail");
        }
        return;
      }
      const heroP = round(progress(y, heroBox.top, heroBox.top + heroBox.height), 4);
      if (heroP !== last.hero) {
        // the hero is pinned beneath the walk section: once fully covered it stops painting
        if ((heroP >= 1) !== (last.hero >= 1)) hero?.setAttribute("data-away", String(heroP >= 1));
        last.hero = heroP;
        approach?.style.setProperty("--ew-hero", String(heroP));
      }
      const trail = round(walked / TRAIL_LENGTH, 4);
      if (trail !== last.trail) {
        last.trail = trail;
        walk?.style.setProperty("--ew-trail", String(trail));
      }
      if (scrubbing) writeThreshold(thresholdP);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    // the hero's layers lean a few pixels toward a fine pointer; eased here so it shares the engine's clock
    let pointerFrame = 0;
    let pointerLast = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const pointerTick = (now: number) => {
      const dt = Math.min(0.05, (now - pointerLast) / 1000 || 0.016);
      pointerLast = now;
      pointer.x = damp(pointer.x, pointer.tx, 5, dt);
      pointer.y = damp(pointer.y, pointer.ty, 5, dt);
      const settled = Math.abs(pointer.tx - pointer.x) < 0.002 && Math.abs(pointer.ty - pointer.y) < 0.002;
      if (settled) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
      hero?.style.setProperty("--ew-px", pointer.x.toFixed(4));
      hero?.style.setProperty("--ew-py", pointer.y.toFixed(4));
      pointerFrame = settled ? 0 : requestAnimationFrame(pointerTick);
    };
    const wakePointer = () => {
      if (!pointerFrame) {
        pointerLast = performance.now();
        pointerFrame = requestAnimationFrame(pointerTick);
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      if (reducedQuery.matches || !finePointer.matches) return;
      pointer.tx = clamp(event.clientX / viewport.w, 0, 1) - 0.5;
      pointer.ty = clamp(event.clientY / viewport.h, 0, 1) - 0.5;
      wakePointer();
    };
    const onPointerLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
      wakePointer();
    };

    // sections past the door are content-visibility: auto, so their heights are estimates until rendered.
    // Before an in-page link scrolls, lay everything out, so the scroll aims at real offsets. Capture phase:
    // this has to run before Lenis reads the target's position.
    const onAnchorClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (link) root.dataset.ewLayout = "all";
    };
    document.addEventListener("click", onAnchorClick, { capture: true });

    measure();
    update();
    root.dataset.ewEngine = "on";

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    reducedQuery.addEventListener("change", onResize);
    hero?.addEventListener("pointermove", onPointerMove, { passive: true });
    hero?.addEventListener("pointerleave", onPointerLeave, { passive: true });
    // fonts and lazy images move the posts: re-measure when the page's height settles
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    void document.fonts?.ready.then(onResize);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reducedQuery.removeEventListener("change", onResize);
      hero?.removeEventListener("pointermove", onPointerMove);
      hero?.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver.disconnect();
      document.removeEventListener("click", onAnchorClick, { capture: true });
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
      delete root.dataset.ewEngine;
    };
  }, []);

  return null;
}
