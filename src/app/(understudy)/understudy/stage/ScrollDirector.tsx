"use client";
import { useEffect } from "react";
import { range } from "../motion/math";
import { archInset, type ArchRest } from "./arch";
import { lensPlace, rowLayout } from "./lens";
import { callbacksAt, digitsOf } from "./odometer";
import { flowProgress, pinProgress, toneAt, type SceneBox, type Tone } from "./progress";

type Scene = SceneBox & { el: HTMLElement; name: string; flow: boolean; line: number; p: number; feeds: HTMLElement | null };

const q = <T extends Element = HTMLElement>(sel: string) => document.querySelector<T>(sel);
const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/**
 * The page's stage manager. One scroll-driven rAF writes `--p` (0..1) on every `[data-scene]`;
 * the CSS turns that into the push-in, the waves, the drawn lines and the lit house.
 * It also runs the reveal observer, the ambient observer, the chrome tone and the lens rows.
 * Under reduced motion it writes nothing spatial and removes what it wrote.
 */
export function ScrollDirector() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let live = motion.matches;
    let scenes: Scene[] = [];
    let vh = innerHeight;
    let frame = 0;

    // hero: the proscenium
    const stage = q(".us-hero__stage");
    const slot = q(".us-hero__slot");
    const house = q(".us-house");
    let rest: ArchRest = { w: 100, h: 125, y: 0 };
    let stageW = innerWidth, stageH = innerHeight;
    let heroP = 0, heroBottom = 0;

    // the cue line's lead-in
    const thread = q(".us-thread");
    const lead = q<SVGPathElement>(".us-thread__lead path");

    // casting
    const castScene = q(".us-casting");
    let lastCallbacks = -1;

    // lens rows
    const rows = qa(".us-house__row").map((row) => ({ row, items: qa(".us-house__item", row), dir: row.dataset.dir === "-1" ? -1 : 1 }));
    let lensFrame = 0, lensOffset = 0, lensLast = 0;
    const slot0 = () => (innerWidth < 720 ? 150 : 200);

    const collect = () => {
      scenes = qa("[data-scene]").map((el) => ({
        el, name: el.dataset.scene ?? "", flow: el.hasAttribute("data-flow"), line: Number(el.dataset.line ?? 0.6),
        tone: (el.dataset.tone as Tone) ?? "light", darkFrom: el.dataset.darkFrom ? Number(el.dataset.darkFrom) : undefined,
        top: 0, height: 0, p: -1, feeds: el.dataset.feeds ? q(el.dataset.feeds) : null,
      }));
    };

    const measure = () => {
      vh = innerHeight;
      scenes.forEach((s) => {
        s.top = s.el.getBoundingClientRect().top + scrollY;
        s.height = s.el.offsetHeight;
        s.p = -1;
      });
      const hero = scenes.find((s) => s.name === "hero");
      heroBottom = hero ? hero.top + hero.height : 0;
      if (stage && slot) {
        stageW = stage.clientWidth; stageH = stage.clientHeight;
        rest = { w: slot.offsetWidth, h: slot.offsetHeight, y: slot.offsetTop + slot.offsetHeight / 2 };
      }
      if (thread && lead) {
        const w = thread.clientWidth;
        const rail = q(".us-thread__rail");
        const x = rail ? rail.offsetLeft + rail.offsetWidth / 2 : 24;
        const h = (lead.ownerSVGElement?.clientHeight ?? 200) - 2;
        lead.ownerSVGElement?.setAttribute("viewBox", `0 0 ${w} ${h + 2}`);
        lead.setAttribute("d", `M${w / 2} 0C${w / 2} ${h * 0.62} ${x} ${h * 0.38} ${x} ${h}`);
      }
      lastCallbacks = -1;
    };

    const writeHero = (p: number) => {
      heroP = p;
      if (!house) return;
      const t = range(p, 0.04, 0.52);
      const a = archInset(t, stageW, stageH, rest);
      // the interior (figure, rows, their serif font) joins layout only once the arch starts opening
      if (p > 0.2 !== house.hasAttribute("data-open")) house.toggleAttribute("data-open", p > 0.2);
      const foot = t >= 1 ? 0 : 3;
      house.style.clipPath = `inset(${a.top.toFixed(1)}px ${a.right.toFixed(1)}px ${a.bottom.toFixed(1)}px ${a.left.toFixed(1)}px round ${a.radius.toFixed(1)}px ${a.radius.toFixed(1)}px ${foot}px ${foot}px)`;
      runLens();
    };

    const writeCasting = (p: number) => {
      if (!castScene) return;
      const chips = qa(".us-cast__co", castScene);
      const n = callbacksAt(range(p, 0.12, 0.8), chips.length);
      if (n === lastCallbacks) return;
      lastCallbacks = n;
      chips.forEach((chip, i) => chip.toggleAttribute("data-on", i < n));
      castScene.toggleAttribute("data-full", n === chips.length);
      const digits = digitsOf(n, 2);
      qa(".us-odo__col", castScene).forEach((col, i) => col.style.setProperty("--d", String(digits[i])));
    };

    const update = () => {
      frame = 0;
      const y = scrollY;
      const span = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--us-page", (y / span).toFixed(4));
      root.toggleAttribute("data-us-scrolled", y > 30);
      const dock = toneAt(scenes, y, vh, 0.92);
      const top = toneAt(scenes, y, vh, 0.04);
      if (root.dataset.usDock !== dock) root.dataset.usDock = dock;
      if (root.dataset.usTop !== top) root.dataset.usTop = top;
      if (!live) return;
      for (const s of scenes) {
        const p = s.flow ? flowProgress(y, s.top, s.height, vh, s.line) : pinProgress(y, s.top, s.height, vh);
        if (Math.abs(p - s.p) < 1e-4) continue;
        s.p = p;
        s.el.style.setProperty("--p", p.toFixed(4));
        s.feeds?.style.setProperty("--fed", p.toFixed(4));
        if (s.name === "hero") writeHero(p);
        else if (s.name === "casting") writeCasting(p);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    // the lens rows drift only while the dark house is open and on screen
    const lensTick = (now: number) => {
      const dt = Math.min(0.05, (now - (lensLast || now)) / 1000);
      lensLast = now;
      lensOffset += dt * 26;
      const half = innerWidth / 2;
      const bend = range(heroP, 0.56, 0.82);
      const slotW = slot0();
      rows.forEach(({ items, dir }) => {
        const xs = rowLayout(items.length, slotW, dir * (lensOffset + scrollY * 0.18));
        items.forEach((item, i) => {
          const x = xs[i].x;
          const l = lensPlace(x, half, bend);
          item.style.transform = `translate3d(${x.toFixed(1)}px, ${l.y.toFixed(1)}px, 0) rotate(${l.rotate.toFixed(2)}deg) scale(${l.scale.toFixed(3)})`;
        });
      });
      lensFrame = shouldLens() ? requestAnimationFrame(lensTick) : 0;
      if (!lensFrame) lensLast = 0;
    };
    const shouldLens = () => live && !document.hidden && heroP > 0.45 && scrollY < heroBottom;
    function runLens() { if (!lensFrame && shouldLens()) lensFrame = requestAnimationFrame(lensTick); }

    const clear = () => {
      scenes.forEach((s) => { s.el.style.removeProperty("--p"); s.feeds?.style.removeProperty("--fed"); });
      house?.style.removeProperty("clip-path");
      house?.removeAttribute("data-open");
      rows.forEach(({ items }) => items.forEach((item) => item.style.removeProperty("transform")));
      qa(".us-cast__co").forEach((chip) => chip.setAttribute("data-on", ""));
      qa(".us-odo__col").forEach((col, i) => col.style.setProperty("--d", String(digitsOf(10, 2)[i])));
      castScene?.setAttribute("data-full", "");
    };

    const mode = () => {
      live = motion.matches;
      root.dataset.usMotion = live ? "live" : "static";
      if (!live) clear();
      measure();
      schedule();
    };

    // reveals: observe an unclipped ancestor (a fully clipped target never intersects)
    const targets = new Map<Element, Element[]>();
    qa("[data-reveal]").forEach((el) => {
      const target = el.dataset.reveal === "mask" || el.dataset.reveal === "wipe" ? el.parentElement ?? el : el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });
    const reveal = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true"));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((_, target) => reveal.observe(target));

    const ambient = new IntersectionObserver((entries) => entries.forEach((e) => e.target.setAttribute("data-active", String(e.isIntersecting))));
    qa("[data-ambient]").forEach((el) => ambient.observe(el));

    const visibility = () => { root.toggleAttribute("data-us-hidden", document.hidden); schedule(); runLens(); };
    const resize = () => { measure(); schedule(); };
    const sizes = new ResizeObserver(resize);
    sizes.observe(document.body);

    collect();
    mode();
    document.fonts?.ready.then(resize);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(lensFrame);
      reveal.disconnect(); ambient.disconnect(); sizes.disconnect();
      removeEventListener("scroll", schedule); removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", mode);
      clear();
      delete root.dataset.usMotion;
    };
  }, []);
  return null;
}
