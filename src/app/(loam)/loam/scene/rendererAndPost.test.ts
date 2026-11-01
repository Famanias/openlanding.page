import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import * as THREE from 'three';
import { createRendererAndPostStack } from './rendererAndPost';

const recorded = vi.hoisted(() => ({
  options: {} as THREE.WebGLRendererParameters,
  composerRatio: 1,
  composerDisposed: vi.fn(),
  contextReleased: vi.fn(),
}));

vi.mock('three', async () => {
  const actual = await vi.importActual<typeof import('three')>('three');
  return {
    ...actual,
    WebGLRenderer: class {
      domElement = { remove: vi.fn(), style: {} };
      shadowMap = { enabled: false, autoUpdate: true, needsUpdate: false };
      ratio = 1;
      constructor(options: THREE.WebGLRendererParameters) { recorded.options = options; }
      setPixelRatio(ratio: number) { this.ratio = ratio; }
      getPixelRatio() { return this.ratio; }
      setSize() {}
      getContext() { return { getExtension: () => null, getParameter: () => 'Test GPU', RENDERER: 1 }; }
      dispose() {}
      forceContextLoss = recorded.contextReleased;
    },
    PMREMGenerator: class {
      fromScene() { return new actual.WebGLRenderTarget(16, 16); }
      dispose() {}
    },
  };
});

vi.mock('three/addons/postprocessing/EffectComposer.js', () => ({
  EffectComposer: class {
    passes: { dispose: () => void; enabled: boolean }[] = [];
    constructor(renderer: THREE.WebGLRenderer) { recorded.composerRatio = renderer.getPixelRatio(); }
    addPass(pass: { dispose: () => void; enabled: boolean }) { this.passes.push(pass); }
    setPixelRatio(ratio: number) { recorded.composerRatio = ratio; }
    setSize() {}
    render() {}
    dispose = recorded.composerDisposed;
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('window', { innerWidth: 1920, innerHeight: 1080, devicePixelRatio: 2 });
});
afterEach(() => vi.unstubAllGlobals());

function makeStack() {
  const container = { clientWidth: 1920, clientHeight: 1080, appendChild() {}, innerHTML: '' };
  return createRendererAndPostStack(container as unknown as HTMLElement);
}

test('keeps high-DPI render targets within one million pixels and requests a low-power context', () => {
  const stack = makeStack();
  expect(recorded.options.powerPreference).toBe('low-power');
  expect(recorded.options.antialias).toBe(false);
  expect(1920 * 1080 * stack.renderer.getPixelRatio() ** 2).toBeLessThanOrEqual(1_000_001);
  stack.resize(3840, 2160);
  expect(3840 * 2160 * stack.renderer.getPixelRatio() ** 2).toBeLessThanOrEqual(1_000_001);
  expect(recorded.composerRatio).toBe(stack.renderer.getPixelRatio());
  stack.dispose();
});

test('skips the entire bloom pass when there is no glow, preserving it underground', () => {
  const stack = makeStack();
  stack.setAtmosphereAtProgress(0, 0, 0);
  expect(stack.bloomPass.enabled).toBe(false);
  stack.setAtmosphereAtProgress(1, 1, 1);
  expect(stack.bloomPass.enabled).toBe(true);
  stack.setAtmosphereAtProgress(1, 1, 2, 1, 0.75, 1);
  expect(stack.bloomPass.enabled).toBe(false);
  expect(stack.renderer.shadowMap.autoUpdate).toBe(false);
  stack.dispose();
});

test('releases scene allocations, postprocessing targets and the GL context on unmount', () => {
  const stack = makeStack();
  const texture = new THREE.Texture();
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ map: texture, bumpMap: texture });
  const instances = new THREE.InstancedMesh(geometry, material, 2);
  stack.scene.add(instances, new THREE.Mesh(geometry, material));
  const resources = [texture, geometry, material, instances, stack.bloomPass, stack.cinematicPass];
  const disposals = resources.map(resource => vi.spyOn(resource, 'dispose'));
  stack.dispose();
  disposals.forEach(dispose => expect(dispose).toHaveBeenCalledTimes(1));
  expect(recorded.composerDisposed).toHaveBeenCalledTimes(1);
  expect(recorded.contextReleased).toHaveBeenCalledTimes(1);
});
