"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { initShader, type ShaderContext } from "./gradient-shader";
import { spectralStore } from "./spectral-store";
import { SPECTRAL_PRESETS } from "./presets";

export function GradientCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shaderContextRef = useRef<ShaderContext | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);

  const storeState = useSyncExternalStore(
    spectralStore.subscribe,
    spectralStore.getSnapshot,
    spectralStore.getSnapshot
  );

  const activePreset = SPECTRAL_PRESETS[storeState.activePresetId] || SPECTRAL_PRESETS["solar-flare"];

  useEffect(() => {
    // Check reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    spectralStore.setReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      spectralStore.setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL2 context
    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      setHasWebGL(false);
      return;
    }

    const ctx = initShader(gl);
    if (!ctx) {
      setHasWebGL(false);
      return;
    }
    shaderContextRef.current = ctx;

    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let pointerVel = 0;

    const handleResize = () => {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(window.innerWidth * dpr);
      const height = Math.floor(window.innerHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = 1.0 - e.clientY / window.innerHeight; // WebGL UV convention
      const dx = nx - lastPointerX;
      const dy = ny - lastPointerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      pointerVel = Math.min(3.0, pointerVel * 0.8 + dist * 12.0);
      lastPointerX = nx;
      lastPointerY = ny;

      // Update store for 3D camera parallax
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      spectralStore.setPointer(normX, normY, dx, dy);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Pause rendering when canvas is off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Render loop
    const render = (now: number) => {
      if (isVisible && !storeState.reducedMotion) {
        const elapsed = (now - startTime) * 0.001;
        pointerVel *= 0.94; // Decay pointer turbulence

        const snap = spectralStore.getSnapshot();
        const preset = SPECTRAL_PRESETS[snap.activePresetId];

        gl.useProgram(ctx.program);
        gl.uniform1f(ctx.uniforms.time, elapsed);
        gl.uniform2f(ctx.uniforms.resolution, canvas.width, canvas.height);
        gl.uniform2f(ctx.uniforms.pointer, lastPointerX, lastPointerY);
        gl.uniform1f(ctx.uniforms.pointerVel, pointerVel);
        gl.uniform1f(ctx.uniforms.turbulence, snap.turbulence);
        gl.uniform1f(ctx.uniforms.flowVelocity, snap.flowVelocity);
        gl.uniform1f(ctx.uniforms.chromaticSpread, snap.chromaticSpread);
        gl.uniform1f(ctx.uniforms.dispersion, snap.dispersion);
        gl.uniform2f(ctx.uniforms.prismRot, snap.prismYaw, snap.prismPitch);

        const stops = preset.uniformStops;
        gl.uniform3fv(ctx.uniforms.stop0, stops[0]);
        gl.uniform3fv(ctx.uniforms.stop1, stops[1]);
        gl.uniform3fv(ctx.uniforms.stop2, stops[2]);
        gl.uniform3fv(ctx.uniforms.stop3, stops[3]);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [storeState.reducedMotion]);

  if (!hasWebGL || storeState.reducedMotion) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-0 transition-colors duration-700 ${className ?? ""}`}
        style={{
          background: activePreset.cssGradient,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 w-full h-full ${className ?? ""}`}
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    />
  );
}
