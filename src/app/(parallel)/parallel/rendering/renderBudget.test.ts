import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import * as THREE from 'three';
import { createBudgetedRenderLoop, disposeSceneResources, getRenderPixelRatio } from './renderBudget';

let intersect: (entries: { isIntersecting: boolean }[]) => void;
let hidden: boolean;
let motion: EventTarget & { matches: boolean };
let page: EventTarget;
let viewport: EventTarget;

beforeEach(() => {
  vi.useFakeTimers();
  hidden = false;
  page = Object.defineProperty(new EventTarget(), 'hidden', { get: () => hidden });
  motion = Object.assign(new EventTarget(), { matches: false });
  viewport = Object.assign(new EventTarget(), { matchMedia: () => motion, setTimeout });
  vi.stubGlobal('document', page);
  vi.stubGlobal('window', viewport);
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) =>
    setTimeout(() => callback(performance.now()), 1000 / 144));
  vi.stubGlobal('cancelAnimationFrame', clearTimeout);
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: typeof intersect) { intersect = callback; }
    observe() {}
    disconnect() {}
  });
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

function start(draw = vi.fn(), software = false) {
  const loop = createBudgetedRenderLoop({} as HTMLElement, draw, software);
  intersect([{ isIntersecting: true }]);
  return { loop, draw };
}

test('caps 144 Hz displays at 24 fps (12 fps for software rendering)', () => {
  for (const [software, maxFrames] of [[false, 24], [true, 12]] as const) {
    const { loop, draw } = start(vi.fn(), software);
    vi.advanceTimersByTime(1000);
    expect(draw.mock.calls.length).toBeGreaterThan(maxFrames - 4);
    expect(draw.mock.calls.length).toBeLessThanOrEqual(maxFrames);
    loop.dispose();
  }
});

test('stops all scheduled work offscreen and in a hidden tab, then resumes without a time jump', () => {
  const { loop, draw } = start();
  vi.advanceTimersByTime(100);
  intersect([{ isIntersecting: false }]);
  const before = draw.mock.calls.length;
  vi.advanceTimersByTime(5000);
  expect(draw).toHaveBeenCalledTimes(before);
  expect(vi.getTimerCount()).toBe(0);
  intersect([{ isIntersecting: true }]);
  vi.advanceTimersByTime(100);
  expect(draw.mock.calls.length).toBeGreaterThan(before);
  hidden = true;
  page.dispatchEvent(new Event('visibilitychange'));
  const paused = draw.mock.calls.length;
  vi.advanceTimersByTime(5000);
  expect(draw).toHaveBeenCalledTimes(paused);
  expect(vi.getTimerCount()).toBe(0);
  hidden = false;
  page.dispatchEvent(new Event('visibilitychange'));
  vi.advanceTimersByTime(100);
  expect(draw.mock.calls.at(-1)?.[1]).toBeLessThanOrEqual(0.1);
  loop.dispose();
  expect(vi.getTimerCount()).toBe(0);
});

test('reduced motion renders on demand and coalesces repeated invalidations', () => {
  motion.matches = true;
  const { loop, draw } = start();
  vi.advanceTimersByTime(2000);
  expect(draw).toHaveBeenCalledTimes(1);
  expect(vi.getTimerCount()).toBe(0);
  for (let i = 0; i < 100; i++) loop.requestRender();
  vi.advanceTimersByTime(2000);
  expect(draw).toHaveBeenCalledTimes(2);
  loop.dispose();
});

test('never queues a second draw while the GPU is busy and deletes its fence on disposal', () => {
  let busy = true;
  const gl = {
    TIMEOUT_EXPIRED: 1,
    clientWaitSync: () => busy ? 1 : 2,
    fenceSync: vi.fn(() => ({})),
    deleteSync: vi.fn(),
    flush: vi.fn(),
    isContextLost: () => false,
  };
  const draw = vi.fn();
  const loop = createBudgetedRenderLoop({} as HTMLElement, draw, false, undefined, gl as unknown as WebGL2RenderingContext);
  intersect([{ isIntersecting: true }]);
  vi.advanceTimersByTime(1000);
  expect(draw).toHaveBeenCalledTimes(1);
  busy = false;
  vi.advanceTimersByTime(100);
  expect(draw.mock.calls.length).toBeGreaterThan(1);
  const deleted = gl.deleteSync.mock.calls.length;
  loop.dispose();
  expect(gl.deleteSync).toHaveBeenCalledTimes(deleted + 1);
  expect(vi.getTimerCount()).toBe(0);
});

test('explicit playback can advance with reduced motion, then returns to demand rendering', () => {
  motion.matches = true;
  let playing = true;
  const { loop, draw } = start(vi.fn(() => playing));
  vi.advanceTimersByTime(1000);
  expect(draw.mock.calls.length).toBeGreaterThan(1);
  playing = false;
  vi.advanceTimersByTime(100);
  const stopped = draw.mock.calls.length;
  vi.advanceTimersByTime(1000);
  expect(draw).toHaveBeenCalledTimes(stopped);
  expect(vi.getTimerCount()).toBe(0);
  loop.dispose();
});

test('bounds a 4K drawing buffer to one million pixels without upscaling smaller scenes', () => {
  expect(getRenderPixelRatio(800, 600)).toBe(1);
  expect(3840 * 2160 * getRenderPixelRatio(3840, 2160) ** 2).toBeCloseTo(1_000_000);
});

test('releases shared scene resources once, including instancing buffers', () => {
  const scene = new THREE.Scene();
  const texture = new THREE.Texture();
  const material = new THREE.MeshStandardMaterial({ map: texture, bumpMap: texture });
  const geometry = new THREE.BoxGeometry();
  const instances = new THREE.InstancedMesh(geometry, material, 2);
  scene.add(new THREE.Mesh(geometry, material), instances);
  const disposals = [texture, material, geometry, instances].map((resource) => vi.spyOn(resource, 'dispose'));
  disposeSceneResources(scene, [material]);
  disposals.forEach((dispose) => expect(dispose).toHaveBeenCalledTimes(1));
  expect(scene.children).toHaveLength(0);
});
