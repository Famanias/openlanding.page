/** Keep scroll updates independent of scene submission and bound GPU work. */
export function getRenderPixelRatio(width: number, height: number, scale = 1): number {
  return Math.min(1, Math.sqrt(1_000_000 / Math.max(1, width * height))) * scale;
}

export function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  const info = gl.getExtension('WEBGL_debug_renderer_info');
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(
    String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER)),
  );
}

export function createRenderBudget(context: WebGLRenderingContext | WebGL2RenderingContext) {
  const gl = 'fenceSync' in context ? context : undefined;
  const software = isSoftwareRenderer(context);
  let pending: WebGLSync | null = null;
  let lastAttempt = -Infinity;
  let busyChecks = 0;
  let slowFrames = 0;
  let scale = 1;
  let disposed = false;

  return {
    get resolutionScale() { return scale; },
    shouldRender(now: number, active: boolean) {
      if (disposed || context.isContextLost()) return false;
      const fps = software ? (active ? 12 : 4) : (active ? 60 : 18);
      const interval = 1000 / fps;
      if (now - lastAttempt < interval) return false;
      // Preserve fractional time so a 144 Hz display doesn't fall to 48 fps.
      lastAttempt = Number.isFinite(lastAttempt) ? now - ((now - lastAttempt) % interval) : now;
      if (pending && gl) {
        const status = gl.clientWaitSync(pending, 0, 0);
        if (status === gl.TIMEOUT_EXPIRED) {
          if (active) busyChecks++;
          return false;
        }
        gl.deleteSync(pending);
        pending = null;
        // Lower resolution only after the previous frame has completed, avoiding
        // repeated reallocations or a quality oscillation during scrolling.
        slowFrames = busyChecks > 0 && active ? slowFrames + 1 : Math.max(0, slowFrames - 1);
        if (busyChecks >= 4 || slowFrames >= 4) {
          scale = Math.max(0.65, scale * 0.85);
          slowFrames = 0;
        }
        busyChecks = 0;
      }
      return true;
    },
    submitted() {
      if (!disposed && gl) {
        pending = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
      }
    },
    resetClock() {
      lastAttempt = -Infinity;
    },
    dispose() {
      disposed = true;
      if (pending && gl) gl.deleteSync(pending);
      pending = null;
    },
  };
}
