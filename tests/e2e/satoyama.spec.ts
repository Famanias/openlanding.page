import { expect, test } from "@playwright/test";

test("chapter slides preserve outgoing scenery and keep panel edges together", async ({ page }) => {
  await page.goto("/satoyama#the-landscape");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  // Finish initial positioning before inspecting a navigation transition.
  await page.waitForTimeout(1300);
  for (const forward of [true, false]) {
    const outgoing = forward ? "the-landscape" : "a-slower-rhythm";
    const incoming = forward ? "a-slower-rhythm" : "the-landscape";
    const frames = await page.evaluate(async ({ outgoing, incoming, forward }) => {
      const from = document.getElementById(outgoing)!;
      const to = document.getElementById(incoming)!;
      const stage = document.querySelector('.st-stage')!.getBoundingClientRect();
      const startX = to.getBoundingClientRect().left - stage.left;
      (document.querySelector(`[aria-label="${forward ? 'Next' : 'Previous'} chapter"]`) as HTMLButtonElement).click();
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      const transitions = [from, to].flatMap(panel => panel.getAnimations());
      transitions.forEach(animation => animation.pause());
      const samples = [80, 400, 720].map(time => {
        transitions.forEach(animation => { animation.currentTime = time; });
        return [from, to].map(panel => {
          const style = getComputedStyle(panel);
          const rect = panel.getBoundingClientRect();
          return {
            left: rect.left - stage.left, right: rect.right - stage.left,
            opacity: style.opacity, visibility: style.visibility, contentVisibility: style.contentVisibility,
            paint: Array.from(panel.querySelectorAll('.st-paint-timelapse .st-paint-layer')).map(layer => {
              const paint = getComputedStyle(layer);
              return { opacity: paint.opacity, clipPath: paint.clipPath };
            }),
          };
        });
      });
      transitions.forEach(animation => animation.finish());
      return { startX, width: stage.width, samples };
    }, { outgoing, incoming, forward });
    expect(frames.startX).toBeCloseTo(forward ? frames.width : -frames.width, 0);
    for (const [from, to] of frames.samples) {
      for (const panel of [from, to]) {
        expect(panel.opacity).toBe("1");
        expect(panel.visibility).toBe("visible");
        expect(panel.contentVisibility).toBe("visible");
        expect(panel.paint.length).toBeGreaterThan(0);

      }
      for (const paint of from.paint) {
        expect(paint.opacity).toBe("1");
        expect(paint.clipPath).toBe("none");
      }
      if (!forward) for (const paint of to.paint) {
        expect(paint.opacity).toBe("1");
        expect(paint.clipPath).toBe("none");
      }
      expect(Math.abs(forward ? from.right - to.left : to.right - from.left)).toBeLessThan(1);
      expect(forward ? from.left : to.left).toBeLessThan(0);
      expect(forward ? to.right : from.right).toBeGreaterThan(frames.width);
    }
  }
});

test("slide 1 paints, slide 2 paints, then slide 1 stays painted without replay", async ({ page }) => {
  // Record the opening paint before page loading and hydration finish.
  await page.addInitScript(() => {
    const samples: { near: number; names: string[]; base: number }[] = [];
    Object.assign(window, { openingPaintFrames: samples });
    const record = () => {
      const scene = document.querySelector('#welcome[data-state="active"] .st-scene');
      const layers = scene ? Array.from(scene.querySelectorAll('.st-paint-timelapse .st-paint-layer')) : [];
      if (layers.length && getComputedStyle(layers[0]).animationName.startsWith('st-wash-')) {
        const base = scene!.querySelector('.st-paint-underpainting');
        const near = Number(getComputedStyle(layers[layers.length - 1]).opacity);
        samples.push({ near, names: layers.map(layer => getComputedStyle(layer).animationName), base: base ? Number(getComputedStyle(base).opacity) : 0 });
        if (near === 1) return;
      }
      requestAnimationFrame(record);
    };
    requestAnimationFrame(record);
  });
  await page.goto('/satoyama', { waitUntil: 'commit' });
  await expect(page.locator('.st-book')).toHaveAttribute('data-ready', 'true');

  // Observe real rendered frames without seeking or restarting animations.
  const observe = async (id: string, button?: string) => page.evaluate(async ({ id, button }) => {
    if (button) {
      (document.querySelector(`[aria-label="${button} chapter"]`) as HTMLButtonElement).click();
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    }
    const scene = document.querySelector(`#${id} .st-scene`)!;
    const samples: { near: number; names: string[]; base: number }[] = [];
    const start = performance.now();
    do {
      const layers = Array.from(scene.querySelectorAll('.st-paint-timelapse .st-paint-layer'));
      const base = scene.querySelector('.st-paint-underpainting');
      samples.push({
        near: Number(getComputedStyle(layers[layers.length - 1]).opacity),
        names: layers.map(layer => getComputedStyle(layer).animationName),
        base: base ? Number(getComputedStyle(base).opacity) : 0,
      });
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    } while (performance.now() - start < 1500);
    return samples;
  }, { id, button });

  await observe('welcome');
  const opening = await page.evaluate(() => (window as Window & { openingPaintFrames?: { near: number; names: string[]; base: number }[] }).openingPaintFrames ?? []);
  expect(opening.length).toBeGreaterThan(0);
  for (const samples of [opening, await observe('the-landscape', 'Next')]) {
    expect(samples[0].near).toBe(0);
    expect(samples[0].names.every(name => name.startsWith('st-wash-'))).toBe(true);
    expect(samples.every(sample => sample.base === 0)).toBe(true);
    expect(samples.some(sample => sample.near > 0 && sample.near < 1)).toBe(true);
    expect(samples[samples.length - 1].near).toBe(1);
  }
  const revisited = await observe('welcome', 'Previous');
  expect(revisited.every(sample => sample.near === 1)).toBe(true);
  expect(revisited.every(sample => sample.names.every(name => name === 'none'))).toBe(true);
  // The same chapter remains painted when reached through browser history.
  await page.goBack();
  await expect(page.locator('#the-landscape')).toHaveAttribute('data-state', 'active');
  await expect(page.locator('#the-landscape .st-paint-timelapse .st-paint-layer[data-depth="near"]')).toHaveCSS('animation-name', 'none');
});

test("picture book turns chapters, follows direct links, and preserves browser history", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Let’s wander a while" }).click();
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.getByRole("button", { name: "Chapter 4: Little adventures", exact: true }).click();
  await expect(page).toHaveURL(/#little-adventures$/);
  await page.goBack();
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.goto("/satoyama#the-seasons");
  await expect(page.getByRole("tab", { name: /Spring/ })).toBeVisible();
});

test("keyboard navigation clamps book edges without stealing buttons", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await page.locator('main').focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
  await page.keyboard.press("End");
  await expect(page.getByRole("button", { name: "Next chapter", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Previous chapter", exact: true }).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator('#until-next-time')).toHaveAttribute("data-state", "active");
  await page.keyboard.press("Enter");
  await expect(page.locator('#the-seasons')).toHaveAttribute("data-state", "active");
});

test("mouse wheel scrolling turns chapters forward and backward", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await expect(page.locator('#welcome')).toHaveAttribute("data-state", "active");

  await page.mouse.wheel(0, 100);
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");

  await page.waitForTimeout(700);
  await page.mouse.wheel(0, 100);
  await expect(page.locator('#a-slower-rhythm')).toHaveAttribute("data-state", "active");

  await page.waitForTimeout(700);
  await page.mouse.wheel(0, -100);
  await expect(page.locator('#the-landscape')).toHaveAttribute("data-state", "active");
});

test("slide 4 forest paints after the panel arrives and does not replay", async ({ page }) => {
  await page.goto('/satoyama#a-slower-rhythm');
  await expect(page.locator('.st-book')).toHaveAttribute('data-ready', 'true');
  const frames = await page.evaluate(async () => {
    (document.querySelector('[aria-label="Next chapter"]') as HTMLButtonElement).click();
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    const panel = document.getElementById('little-adventures')!;
    const bamboo = panel.querySelector('.st-scene [data-depth="mid"]')!;
    const samples: { ms: number; x: number; opacity: number }[] = [];
    const start = performance.now();
    do {
      samples.push({ ms: performance.now() - start, x: new DOMMatrix(getComputedStyle(panel).transform).m41, opacity: Number(getComputedStyle(bamboo).opacity) });
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    } while (performance.now() - start < 2700);
    return samples;
  });
  const arriving = frames.find(frame => frame.ms >= 800)!;
  expect(Math.abs(arriving.x)).toBeLessThan(1);
  expect(arriving.opacity).toBe(0);
  expect(frames.some(frame => frame.ms > 1000 && frame.x === 0 && frame.opacity > 0 && frame.opacity < 1)).toBe(true);
  expect(frames[frames.length - 1].opacity).toBe(1);
  await page.getByRole('button', { name: 'Previous chapter', exact: true }).click();
  await page.getByRole('button', { name: 'Next chapter', exact: true }).click();
  const bamboo = page.locator('#little-adventures .st-scene [data-depth="mid"]');
  await expect(bamboo).toHaveCSS('animation-name', 'none');
  await expect(bamboo).toHaveCSS('opacity', '1');
});

test("slide 4 activity illustrations paint on first entry and stay painted on return", async ({ page }) => {
  await page.goto('/satoyama#a-slower-rhythm');
  await expect(page.locator('.st-book')).toHaveAttribute('data-ready', 'true');
  await page.getByRole('button', { name: 'Next chapter', exact: true }).click();
  const illustrations = page.locator('#little-adventures .st-activity-art');
  await expect(illustrations).toHaveCount(7);
  for (const art of await illustrations.all()) {
    await expect(art.locator('.st-paint-layer')).toHaveCount(4);
    await expect(art.locator('[data-depth="near"]')).toHaveCSS('animation-name', 'st-wash-brush-ltr');
  }
  const progress = await illustrations.first().evaluate(async art => {
    const near = art.querySelector('[data-depth="near"]')!;
    const samples: number[] = [];
    const start = performance.now();
    do {
      samples.push(Number(getComputedStyle(near).opacity));
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    } while (performance.now() - start < 2400);
    return samples;
  });
  expect(progress[0]).toBe(0);
  expect(progress.some(opacity => opacity > 0 && opacity < 1)).toBe(true);
  expect(progress[progress.length - 1]).toBe(1);
  await page.getByRole('button', { name: 'Previous chapter', exact: true }).click();
  await page.getByRole('button', { name: 'Next chapter', exact: true }).click();
  for (const art of await illustrations.all()) {
    for (const layer of await art.locator('.st-paint-layer').all()) {
      await expect(layer).toHaveCSS('animation-name', 'none');
      await expect(layer).toHaveCSS('opacity', '1');
    }
  }
});

test("activities animate in either direction and loop", async ({ page }) => {
  await page.goto("/satoyama#little-adventures");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await expect(page.locator('#little-adventures')).toHaveAttribute("data-state", "active");
  const carousel = page.locator('.st-carousel');
  await expect(carousel).toHaveAttribute("data-index", "0");
  await carousel.click();
  await page.keyboard.press("ArrowRight");
  await expect(carousel).toHaveAttribute("data-index", "1");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await expect(carousel).toHaveAttribute("data-index", "4");
  await expect(page.locator('.st-carousel-track')).toHaveCSS('transition-property', 'transform');
});

test("season tabs are keyboard operable and recolour the valley", async ({ page }) => {
  await page.goto("/satoyama#the-seasons");
  await page.getByRole("tab", { name: /Spring/ }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /Summer/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("song of cicadas");
  await page.keyboard.press("End");
  await expect(page.locator('.st-seasons')).toHaveAttribute("data-season", "3");
  await expect(page.getByRole("tabpanel")).toContainText("quiet has a season");
});

test("every chapter and every season is painted as its own scene", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  const labels = await page.locator(".st-scene").evaluateAll((scenes) => scenes.map((scene) => scene.getAttribute("aria-label")));
  expect(labels).toHaveLength(9);
  expect(new Set(labels).size).toBe(9);
  await page.goto("/satoyama#the-seasons");
  await expect(page.locator('#the-seasons')).toHaveAttribute("data-state", "active");
  await expect(page.locator('.st-season-layer[data-on="true"] .st-scene-spring')).toBeVisible();
  await page.getByRole("tab", { name: /Autumn/ }).click();
  await expect(page.locator('.st-season-layer[data-on="true"] .st-scene-autumn')).toBeVisible();
  await expect(page.locator('.st-season-layer[data-on="true"]')).toHaveCount(1);
});

test("painted layers remain attached on chapter and season visits without line sketches", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");

  const welcome = page.locator('#welcome');
  await expect(welcome.locator('.st-sketch-lines')).not.toBeAttached();
  await expect(welcome.locator('.st-paint-timelapse .st-paint-wash')).toBeAttached();
  await expect(welcome.locator('.st-paint-timelapse .st-paint-layer[data-depth="sky"]')).toBeAttached();
  await expect(welcome.locator('.st-paint-timelapse .st-paint-layer[data-depth="far"]')).toBeAttached();
  await expect(welcome.locator('.st-paint-timelapse .st-paint-layer[data-depth="mid"]')).toBeAttached();
  await expect(welcome.locator('.st-paint-timelapse .st-paint-layer[data-depth="near"]')).toBeAttached();

  // Navigate to slide 2
  await page.getByRole("button", { name: "Next chapter", exact: true }).click();
  const landscape = page.locator('#the-landscape');
  await expect(landscape).toHaveAttribute("data-state", "active");
  await expect(landscape.locator('.st-sketch-lines')).not.toBeAttached();
  await expect(landscape.locator('.st-paint-timelapse .st-paint-wash')).toBeAttached();
  await expect(landscape.locator('.st-paint-timelapse .st-paint-layer[data-depth="sky"]')).toBeAttached();

  // Navigate back to slide 1
  await page.getByRole("button", { name: "Previous chapter", exact: true }).click();
  await expect(welcome).toHaveAttribute("data-state", "active");

  // Four seasons slide has color wash for active season and no sketch lines
  await page.goto("/satoyama#the-seasons");
  await expect(page.locator('#the-seasons')).toHaveAttribute("data-state", "active");
  const spring = page.locator('.st-season-layer[data-on="true"]');
  await expect(spring.locator('.st-sketch-lines')).not.toBeAttached();
  await expect(spring.locator('.st-paint-timelapse .st-paint-wash')).toBeAttached();
  await expect(spring.locator('.st-paint-timelapse .st-paint-layer[data-depth="sky"]')).toBeAttached();
  await expect(spring.locator('.st-paint-timelapse .st-paint-layer[data-depth="near"]')).toBeAttached();

  // Tab change
  await page.getByRole("tab", { name: /Summer/ }).click();
  const summer = page.locator('.st-season-layer[data-on="true"]');
  await expect(summer.locator('.st-sketch-lines')).not.toBeAttached();
  await expect(summer.locator('.st-paint-timelapse .st-paint-wash')).toBeAttached();
  await expect(summer.locator('.st-paint-timelapse .st-paint-layer[data-depth="sky"]')).toBeAttached();
  await expect(summer.locator('.st-paint-timelapse .st-paint-layer[data-depth="near"]')).toBeAttached();
});

test("landscape animation pauses and reduced motion keeps content visible", async ({ page }) => {
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Pause landscape animation" }).click();
  await expect(page.locator('#welcome .st-paint-timelapse .st-clouds')).toHaveCSS("animation-play-state", "paused");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator('#welcome .st-paint-timelapse .st-clouds')).toHaveCSS("animation-name", "none");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Next chapter", exact: true }).click();
  await expect(page.locator('#the-landscape h2')).toBeVisible();
});

test("phone layout has no horizontal overflow across all chapters and supports swipe", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/satoyama");
  await expect(page.locator('.st-book')).toHaveAttribute("data-ready", "true");
  for (let i = 1; i <= 6; i++) {
    await page.getByRole("button", { name: new RegExp(`^Chapter ${i}:`) }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto("/satoyama#little-adventures");
  const carousel = page.locator('.st-carousel');
  await expect(carousel).toHaveAttribute("data-index", "0");
  await carousel.evaluate(element => {
    const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 400 });
    const end = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 400 });
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [end] }));
  });
  await expect(carousel).toHaveAttribute("data-index", "1");
  await expect(page.locator('#little-adventures')).toHaveAttribute("data-state", "active");
});

test("without JavaScript all chapters remain readable in document flow", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/satoyama");
  for (const id of ["welcome", "the-landscape", "a-slower-rhythm", "little-adventures", "the-seasons", "until-next-time"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
    await expect(page.locator(`#${id}`)).toHaveCSS("position", "relative");
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});
