export type RenderMode = "webgpu" | "webgl2" | "poster";
export type RenderEnv = { reducedMotion: boolean; webgpu: boolean; webgl2: boolean };

/** Reduced motion or no GPU path → static poster; otherwise WebGPU, falling back to WebGL2. */
export function pickRenderMode(env: RenderEnv): RenderMode {
  if (env.reducedMotion) return "poster";
  if (env.webgpu) return "webgpu";
  if (env.webgl2) return "webgl2";
  return "poster";
}

/** Reads the browser's capabilities. WebGPU needs an adapter, not just `navigator.gpu`. */
export async function detectEnv(): Promise<RenderEnv> {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let webgpu = false;
  try {
    const gpu = (navigator as Navigator & { gpu?: { requestAdapter: () => Promise<unknown> } }).gpu;
    webgpu = Boolean(gpu && (await gpu.requestAdapter()));
  } catch {
    webgpu = false;
  }
  let webgl2 = false;
  try {
    webgl2 = Boolean(document.createElement("canvas").getContext("webgl2"));
  } catch {
    webgl2 = false;
  }
  return { reducedMotion, webgpu, webgl2 };
}
