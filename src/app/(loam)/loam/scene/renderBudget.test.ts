import { expect, test, vi } from 'vitest';
import { createRenderBudget, getRenderPixelRatio } from './renderBudget';

function fakeGL(software = false) {
  let busy = false;
  const gl = {
    RENDERER: 1, TIMEOUT_EXPIRED: 2,
    getExtension: () => null,
    getParameter: () => software ? 'SwiftShader' : 'Test GPU',
    isContextLost: () => false,
    clientWaitSync: vi.fn(() => busy ? 2 : 3),
    fenceSync: vi.fn(() => ({})),
    deleteSync: vi.fn(), flush: vi.fn(),
  };
  return { gl: gl as unknown as WebGL2RenderingContext, spies: gl, setBusy: (value: boolean) => { busy = value; } };
}

test('caps active scene submission at 60 fps and uses less work while idle', () => {
  const { gl } = fakeGL();
  for (const [active, expected] of [[true, 60], [false, 18]] as const) {
    const budget = createRenderBudget(gl);
    let count = 0;
    for (let t = 0; t < 1000; t += 1000 / 144) {
      if (budget.shouldRender(t, active)) { count++; budget.submitted(); }
    }
    expect(count).toBeLessThanOrEqual(expected + 1);
    expect(count).toBeGreaterThanOrEqual(expected - 2);
    budget.dispose();
  }
});

test('never queues a second draw while busy and reduces resolution only after completion', () => {
  const { gl, spies, setBusy } = fakeGL();
  const budget = createRenderBudget(gl);
  expect(budget.shouldRender(0, true)).toBe(true);
  budget.submitted();
  setBusy(true);
  for (let t = 20; t <= 100; t += 20) expect(budget.shouldRender(t, true)).toBe(false);
  expect(spies.fenceSync).toHaveBeenCalledTimes(1);
  expect(budget.resolutionScale).toBe(1);
  setBusy(false);
  expect(budget.shouldRender(120, true)).toBe(true);
  expect(budget.resolutionScale).toBe(0.85);
  budget.submitted();
  budget.dispose();
  expect(spies.deleteSync).toHaveBeenCalledTimes(2);
  expect(budget.shouldRender(1000, true)).toBe(false);
});

test('uses a conservative frame budget for software WebGL', () => {
  const { gl } = fakeGL(true);
  const budget = createRenderBudget(gl);
  let count = 0;
  for (let t = 0; t < 1000; t += 10) if (budget.shouldRender(t, true)) count++;
  expect(count).toBeLessThanOrEqual(12);
  budget.dispose();
});

test('lowers resolution after sustained missed frames, even when each frame eventually completes', () => {
  const { gl, setBusy } = fakeGL();
  const budget = createRenderBudget(gl);
  expect(budget.shouldRender(0, true)).toBe(true);
  budget.submitted();
  for (let i = 0; i < 4; i++) {
    setBusy(true);
    expect(budget.shouldRender(i * 40 + 20, true)).toBe(false);
    setBusy(false);
    expect(budget.shouldRender(i * 40 + 40, true)).toBe(true);
    budget.submitted();
  }
  expect(budget.resolutionScale).toBe(0.85);
  budget.dispose();
});

test('bounds 4K resolution without magnifying small canvases', () => {
  expect(getRenderPixelRatio(800, 600)).toBe(1);
  expect(3840 * 2160 * getRenderPixelRatio(3840, 2160) ** 2).toBeCloseTo(1_000_000);
  expect(getRenderPixelRatio(800, 600, 0.65)).toBe(0.65);
});
