import { expect, test, type Page } from "@playwright/test";

type DrawKind = "webgl" | "2d";
type CanvasEvidence = {
  id: number;
  kind: DrawKind;
  draws: number;
  screenDraws: number;
  methods: Record<string, number>;
  visible: boolean;
  width: number;
  height: number;
  selector: string;
};
type Probe = { snapshot: (selector: string) => CanvasEvidence[] };
type ProbeWindow = Window & { __standaloneGraphicsProbe?: Probe };

/** Install BEFORE navigation. Observe native draws; never force a context, backend or renderer policy. */
export async function installGraphicsProbe(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const target = window as ProbeWindow;
    if (target.__standaloneGraphicsProbe) return;
    type Counts = Omit<CanvasEvidence, "visible" | "width" | "height" | "selector">;
    const canvases = new Map<HTMLCanvasElement, Counts>();
    const framebuffers = new WeakMap<object, unknown>();
    let nextId = 0;
    const record = (canvas: unknown, kind: DrawKind, method: string, screen: boolean) => {
      // Texture factories, context capability probes, and OffscreenCanvas cannot prove a visible scene.
      if (!(canvas instanceof HTMLCanvasElement)) return;
      let counts = canvases.get(canvas);
      if (!counts) {
        counts = { id: ++nextId, kind, draws: 0, screenDraws: 0, methods: {} };
        canvases.set(canvas, counts);
      }
      counts.draws++;
      if (screen) counts.screenDraws++;
      counts.methods[method] = (counts.methods[method] ?? 0) + 1;
    };
    // Preserve native return values, exceptions, descriptors and receiver identity. In particular,
    // do not call getContext/getError/readPixels or change preserveDrawingBuffer to gather evidence.
    const wrap = (prototype: object, name: string, after: (receiver: unknown, args: unknown[], result: unknown) => void) => {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
      if (!descriptor || typeof descriptor.value !== "function") return;
      const original = descriptor.value;
      Object.defineProperty(prototype, name, {
        ...descriptor,
        value: function (this: unknown, ...args: unknown[]) {
          const result = Reflect.apply(original, this, args);
          after(this, args, result);
          return result;
        },
      });
    };
    const validDraw = (name: string, args: unknown[]) => {
      const count = Number(args[name.includes("Elements") ? 1 : 2]);
      const instances = name.includes("Instanced") ? Number(args[name.includes("Elements") ? 4 : 3]) : 1;
      return count > 0 && instances > 0;
    };
    const extensions = new WeakSet<object>();
    for (const prototype of [
      typeof WebGLRenderingContext === "undefined" ? null : WebGLRenderingContext.prototype,
      typeof WebGL2RenderingContext === "undefined" ? null : WebGL2RenderingContext.prototype,
    ]) {
      if (!prototype) continue;
      wrap(prototype, "bindFramebuffer", (receiver, args) => {
        // READ_FRAMEBUFFER does not change the draw destination.
        if (args[0] === 0x8d40 || args[0] === 0x8ca9) framebuffers.set(receiver as object, args[1]);
      });
      for (const name of ["drawArrays", "drawElements", "drawArraysInstanced", "drawElementsInstanced"]) {
        wrap(prototype, name, (receiver, args) => {
          const context = receiver as WebGLRenderingContext;
          if (validDraw(name, args)) record(context.canvas, "webgl", name, framebuffers.get(context) == null);
        });
      }
      wrap(prototype, "getExtension", (receiver, args, result) => {
        if (args[0] !== "ANGLE_instanced_arrays" || !result || extensions.has(result as object)) return;
        extensions.add(result as object);
        const context = receiver as WebGLRenderingContext;
        for (const name of ["drawArraysInstancedANGLE", "drawElementsInstancedANGLE"]) {
          // Extension methods can live on the extension's prototype. Give this instance
          // its own forwarding descriptor so different contexts keep their own counters.
          if (!Object.hasOwn(result as object, name)) {
            const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(result), name);
            if (descriptor) Object.defineProperty(result, name, descriptor);
          }
          wrap(result as object, name, (_extension, drawArgs) => {
            if (validDraw(name, drawArgs)) record(context.canvas, "webgl", name, framebuffers.get(context) == null);
          });
        }
      });
    }
    for (const name of ["fill", "stroke", "fillRect", "strokeRect", "fillText", "strokeText", "drawImage", "putImageData"]) {
      wrap(CanvasRenderingContext2D.prototype, name, (receiver) => {
        record((receiver as CanvasRenderingContext2D).canvas, "2d", name, true);
      });
    }
    target.__standaloneGraphicsProbe = {
      snapshot(selector) {
        const matches = new Set(document.querySelectorAll(selector));
        return [...canvases].filter(([canvas]) => matches.has(canvas)).map(([canvas, counts]) => {
          let rect = canvas.getBoundingClientRect();
          let left = Math.max(0, rect.left), top = Math.max(0, rect.top);
          let right = Math.min(innerWidth, rect.right), bottom = Math.min(innerHeight, rect.bottom);
          let opacity = 1;
          let hidden = !canvas.isConnected || canvas.width < 1 || canvas.height < 1;
          for (let node: Element | null = canvas; node; node = node.parentElement) {
            const style = getComputedStyle(node);
            opacity *= Number(style.opacity);
            hidden ||= style.display === "none" || style.visibility !== "visible" || style.contentVisibility === "hidden";
            if (node !== canvas && /(hidden|clip|scroll|auto)/.test(`${style.overflowX} ${style.overflowY}`)) {
              rect = node.getBoundingClientRect();
              if (/(hidden|clip|scroll|auto)/.test(style.overflowX)) { left = Math.max(left, rect.left); right = Math.min(right, rect.right); }
              if (/(hidden|clip|scroll|auto)/.test(style.overflowY)) { top = Math.max(top, rect.top); bottom = Math.min(bottom, rect.bottom); }
            }
          }
          return { ...counts, methods: { ...counts.methods }, selector, width: canvas.width, height: canvas.height,
            visible: !hidden && opacity > 0.01 && right - left > 1 && bottom - top > 1 };
        });
      },
    };
  });
}

const scenes: Record<string, string> = {
  assemblage: ".as-studio--hero canvas",
  warpwander: '[data-testid="world-canvas-container"] canvas',
  nightline: "canvas.nli-webgl",
  kinetic: "canvas.journeyCanvas",
  vector: "canvas.vector-canvas",
  trace: "canvas.trace-scene",
  "volume-zero": "canvas.vz-chamber__canvas",
  lumen: '[data-testid="glassform-webgl-stage"][data-mode="live"] canvas',
  arcsignal: '[data-testid="hero-core-canvas"] canvas',
  savepoint: "canvas.archive-canvas",
  lenus: '[data-testid="lenus-canvas-container"] canvas',
  mercer: '[data-testid="mercer-canvas-container"] canvas',
  parallel: 'canvas[data-testid="parallel-webgl-canvas"]',
  morta: '[data-testid="reliquary-3d-viewport"] canvas',
  synapxe: '[data-testid="fabric-lab-3d-container"] canvas',
  xibalba: "#top canvas.fall",
  perigee: 'canvas[data-testid="black-hole-canvas"]',
  loam: '[data-testid="loam-webgl-canvas"] canvas',
  lowtide: "canvas.lt-canvas",
  cullet: "canvas.fc-hero__canvas",
  amaoto: ".am-canvas canvas",
  bathys: ".bat-sub canvas",
  iridia: '[aria-label="Interactive 3D Prism Light Dispersion Model"] canvas',
  noctiluca: "canvas.nl-light",
  koji: "#dish canvas",
};

// Dedicated renderer assertions are independent of export eligibility.
export const LIVE_GRAPHICS_SLUGS = [...Object.keys(scenes), "orrery"];

async function snapshot(page: Page, selector: string): Promise<CanvasEvidence[]> {
  return page.evaluate(selector => {
    const probe = (window as ProbeWindow).__standaloneGraphicsProbe;
    if (!probe) throw new Error("Graphics probe missing: installGraphicsProbe must run before navigation");
    return probe.snapshot(selector);
  }, selector);
}

async function proveDraws(page: Page, slug: string, selector: string, kind: DrawKind, timeout: number) {
  await expect(page.locator(selector).first(), `${slug}: actual scene canvas`).toBeAttached({ timeout });
  await expect.poll(async () => (await snapshot(page, selector)).some(c => c.kind === kind && c.visible && c.screenDraws > 0), {
    message: `${slug}: visible ${kind} scene must draw to its presentation canvas, not only a texture or fallback`, timeout,
  }).toBe(true);
  const before = await snapshot(page, selector);
  // These two scenes intentionally stop drawing when their state settles. Use their authored
  // inspection/navigation controls to request a changed frame instead of demanding an idle loop.
  if (slug === "morta") {
    const viewport = page.getByTestId("reliquary-3d-viewport");
    await viewport.press("ArrowRight");
    await expect(viewport, "MORTA keyboard inspection must change the camera").toHaveAttribute("data-view-modified", "true");
  } else if (slug === "amaoto") {
    const stage = page.locator(".am-canvas");
    const progress = Number(await stage.getAttribute("data-progress"));
    await page.getByRole("button", { name: "Next chapter rest", exact: true }).click();
    await expect.poll(async () => Number(await stage.getAttribute("data-progress")), {
      timeout, message: "AMAOTO chapter navigation must advance the camera story",
    }).toBeGreaterThan(progress);
  }
  // Require a subsequent real presentation draw from the same visible canvas. Mounted but failed,
  // context-lost, hidden fallback, and offscreen texture-only renderers cannot satisfy this.
  await expect.poll(async () => (await snapshot(page, selector)).some(c => c.kind === kind && c.visible &&
    before.some(previous => previous.id === c.id && c.screenDraws > previous.screenDraws)), {
    message: `${slug}: presentation must draw again after readiness or authored interaction`, timeout,
  }).toBe(true);
  await test.info().attach(`${slug}-graphics.json`, {
    body: JSON.stringify(await snapshot(page, selector), null, 2), contentType: "application/json",
  });
  await test.info().attach(`${slug}-graphics.png`, { body: await page.screenshot(), contentType: "image/png" });
}

async function scrollTo(page: Page, selector: string) {
  await page.locator(selector).first().scrollIntoViewIfNeeded();
}

/** Run at desktop size with reducedMotion=no-preference, before generic scroll/mobile smoke checks. */
export async function verifyGraphics(page: Page, slug: string): Promise<void> {
  const timeout = slug === "lowtide" ? 120_000 : 60_000;
  expect(page.viewportSize()?.width ?? 0, "Graphics verification requires the desktop viewport").toBeGreaterThanOrEqual(1200);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches), "Graphics verification requires motion enabled").toBe(false);
  if (slug === "orrery") {
    const counter = page.getByTestId("slide-counter");
    await expect(counter).toHaveText("01 / 10", { timeout });
    await page.keyboard.press("ArrowDown");
    await expect(counter).toHaveText("02 / 10");
    await page.getByRole("navigation", { name: "Chapters" }).getByRole("button", { name: /Pricing/ }).click();
    await expect(counter).toHaveText("08 / 10");
    await expect(page).toHaveURL(/#pricing$/);
    await page.getByRole("navigation", { name: "Chapters" }).getByRole("button", { name: "The orrery", exact: true }).click();
    await expect(page.locator('[data-orbit-step="4"]')).toBeAttached({ timeout });
    await test.info().attach("orrery-deck.png", { body: await page.screenshot(), contentType: "image/png" });
    return;
  }
  const selector = scenes[slug];
  if (!selector) throw new Error(`No graphics verification defined for ${slug}`);
  if (slug === "volume-zero") {
    await scrollTo(page, ".vz-chamber__canvas-wrap");
    // Three's WebGPURenderer may itself choose WebGLBackend. The draw probe proves the
    // actual software-WebGL path even when the component calls that renderer "webgpu".
    await expect(page.locator(selector)).toHaveAttribute("data-backend", /^(webgl2|webgpu)$/, { timeout });
  } else if (slug === "parallel") {
    await page.getByTestId("hero-explore-cta").click();
    await expect(page.locator("main")).toHaveAttribute("data-hero-mode", "explore", { timeout });
  } else if (slug === "morta") {
    await scrollTo(page, '[data-testid="reliquary-3d-viewport"]');
  } else if (slug === "synapxe") {
    await scrollTo(page, '[data-testid="fabric-lab-3d-container"]');
  } else if (slug === "iridia") {
    await scrollTo(page, '[aria-label="Interactive 3D Prism Light Dispersion Model"]');
  }
  const markers: Record<string, [string, string, string]> = {
    assemblage: [".as-studio--hero", "data-as-scene-ready", "true"],
    kinetic: ["[data-journey]", "data-journey", "live"],
    savepoint: [selector, "data-scene-ready", "true"],
    lenus: [".ln-stage", "data-state", "running"],
    mercer: [".jm-stage", "data-state", "running"],
    perigee: ["html", "data-perigee-mode", "experience"],
    loam: ["html", "data-loam-mode", "experience"],
    lowtide: ["html", "data-lt-mode", "experience"],
    cullet: [".fc-hero", "data-gl", "on"],
    amaoto: [".am-canvas", "data-ready", "true"],
    noctiluca: [selector, "data-ready", "true"],
    koji: [selector, "data-ready", "true"],
  };
  const marker = markers[slug];
  if (marker) await expect(page.locator(marker[0])).toHaveAttribute(marker[1], marker[2], { timeout });
  if (slug === "lowtide") await expect(page.locator(".lt-xp")).toHaveAttribute("data-ready", "true", { timeout });
  await proveDraws(page, slug, selector, ["xibalba", "warpwander"].includes(slug) ? "2d" : "webgl", timeout);
  if (slug === "lumen") {
    const footer = page.getByTestId("footer-glass");
    await footer.scrollIntoViewIfNeeded();
    await expect(footer, "LUMEN footer GLB must finish loading").toHaveAttribute("data-ready", "true", { timeout });
    await proveDraws(page, "lumen-footer", '[data-testid="footer-glass"] [data-mode="live"] canvas', "webgl", timeout);
  }
  if (slug === "koji") {
    await page.evaluate(() => {
      const flight = document.querySelector("#flight");
      if (!flight) throw new Error("KŌJI flight section missing");
      window.scrollTo({ top: flight.getBoundingClientRect().top + scrollY + innerHeight * 0.6, behavior: "instant" });
    });
    await expect(page.locator('#flight [data-flight="scrub"]'), "KŌJI must use its embedded clips").toBeAttached({ timeout });
    await expect.poll(() => page.locator("#flight video").evaluateAll(videos => videos.some(node => {
      const video = node as HTMLVideoElement;
      const rect = video.getBoundingClientRect();
      const scene = video.closest(".sw-scene.has-clip");
      return scene !== null && Number(getComputedStyle(scene).opacity) > 0.01 &&
        /^(data:|blob:)/.test(video.currentSrc || video.src) && video.readyState >= 2 && video.videoWidth > 0 &&
        video.currentTime > 0 && !video.seeking && getComputedStyle(video).opacity !== "0" &&
        rect.bottom > 0 && rect.top < innerHeight;
    })), { timeout, message: "KŌJI scroll flight must decode and seek an embedded video" }).toBe(true);
    await test.info().attach("koji-flight.json", {
      body: JSON.stringify(await page.locator("#flight video").evaluateAll(videos => videos.map(node => {
        const video = node as HTMLVideoElement;
        return { time: video.currentTime, readyState: video.readyState, width: video.videoWidth, height: video.videoHeight,
          embedded: /^(data:|blob:)/.test(video.currentSrc || video.src) };
      })), null, 2), contentType: "application/json",
    });
    await test.info().attach("koji-flight.png", { body: await page.screenshot(), contentType: "image/png" });
  }
}
