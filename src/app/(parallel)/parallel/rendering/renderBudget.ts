import * as THREE from 'three';

// Independent of monitor refresh rate and devicePixelRatio (including 4K displays).
export function getRenderPixelRatio(width: number, height: number): number {
  return Math.min(1, Math.sqrt(1_000_000 / Math.max(1, width * height)));
}

/** One pending frame at most; no polling or GPU work while hidden/offscreen. */
export function createBudgetedRenderLoop(
  container: HTMLElement,
  draw: (now: number, dt: number, reducedMotion: boolean) => boolean | void,
  software = false,
  isVisible: () => boolean = () => true,
  context?: WebGLRenderingContext | WebGL2RenderingContext,
) {
  const gl = context && 'fenceSync' in context ? context : undefined;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const interval = 1000 / (software ? 12 : 24);
  let inViewport = false;
  let disposed = false;
  let frame = 0;
  let timer = 0;
  let previous = 0;
  let lastDraw = -Infinity;
  let pendingDraw: WebGLSync | null = null;

  const active = () => !disposed && inViewport && !document.hidden && isVisible();
  const cancel = () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
    frame = timer = 0;
  };
  const schedule = () => {
    if (!active() || frame || timer) return;
    const delay = Math.max(0, interval - (performance.now() - lastDraw));
    timer = window.setTimeout(() => {
      timer = 0;
      if (!active()) return;
      frame = requestAnimationFrame(tick);
    }, delay);
  };
  const tick = (now: number) => {
    frame = 0;
    if (!active()) return;
    // Timer rounding must never bypass the frame cap on high refresh displays.
    if (now - lastDraw < interval) {
      schedule();
      return;
    }
    // Do not enqueue another scene while the GPU is still drawing the last one.
    if (pendingDraw && gl) {
      const status = gl.clientWaitSync(pendingDraw, 0, 0);
      if (status === gl.TIMEOUT_EXPIRED) {
        lastDraw = now;
        schedule();
        return;
      }
      gl.deleteSync(pendingDraw);
      pendingDraw = null;
    }
    if (gl?.isContextLost()) return;
    const dt = previous ? Math.min(0.1, (now - previous) / 1000) : interval / 1000;
    previous = lastDraw = now;
    const playing = draw(now, dt, motion.matches);
    if (!disposed && gl) {
      pendingDraw = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
    }
    if (!motion.matches || playing) schedule();
  };
  const requestRender = () => {
    if (!active()) {
      cancel();
      previous = 0;
      return;
    }
    schedule();
  };
  const onVisibility = () => {
    previous = 0;
    requestRender();
  };
  const observer = new IntersectionObserver(([entry]) => {
    inViewport = entry.isIntersecting;
    onVisibility();
  }, { threshold: 0 });
  observer.observe(container);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('scroll', requestRender, { passive: true });
  motion.addEventListener('change', requestRender);

  return {
    requestRender,
    dispose() {
      disposed = true;
      cancel();
      if (pendingDraw && gl) gl.deleteSync(pendingDraw);
      pendingDraw = null;
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('scroll', requestRender);
      motion.removeEventListener('change', requestRender);
    },
  };
}

/** Renderer.dispose alone does not release scene-owned GPU allocations. */
export function disposeSceneResources(scene: THREE.Scene, extraMaterials: THREE.Material[] = []) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set(extraMaterials);
  const textures = new Set<THREE.Texture>();
  scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
      geometries.add(object.geometry);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        materials.add(material);
      }
    }
    if (object instanceof THREE.InstancedMesh) object.dispose();
    if (object instanceof THREE.DirectionalLight) object.shadow.dispose();
  });
  for (const material of materials) {
    for (const value of Object.values(material)) {
      if (value instanceof THREE.Texture) textures.add(value);
    }
    material.dispose();
  }
  geometries.forEach((geometry) => geometry.dispose());
  textures.forEach((texture) => texture.dispose());
  scene.clear();
}
