/**
 * Deterministic PRNG (Mulberry32) so procedural scenery, petals, and trees
 * render consistently across sessions and verification runs.
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Detect software WebGL renderers (SwiftShader, llvmpipe, WARP) using
 * WEBGL_debug_renderer_info so rendering cost can be paced without altering
 * scene content, geometry, or layout.
 */
export function isSoftwareWebGLRendererString(rendererString: string): boolean {
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererString);
}

export function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return isSoftwareWebGLRendererString(gpu);
  } catch {
    return false;
  }
}
