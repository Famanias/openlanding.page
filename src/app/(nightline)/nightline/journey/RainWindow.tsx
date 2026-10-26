"use client";
import { useEffect, useRef } from "react";
import { useScrollProgress } from "../motion/useScrollProgress";
import { FRAGMENT, VERTEX } from "./shaders";
import { MAX_WIPES, createWipes, pushWipe } from "./wipes";

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

export function RainWindow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useScrollProgress();
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    // Reduced motion never acquires a context; the CSS surface carries the page.
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stop = () => {};
    let disposed = false;

    const start = () => {
      const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
      const vertex = gl && compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fragment = gl && compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      if (!gl || !vertex || !fragment) { canvas.dataset.fallback = "true"; return; }

      const program = gl.createProgram()!;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { canvas.dataset.fallback = "true"; return; }
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      const uniform = (name: string) => gl.getUniformLocation(program, name);
      const uResolution = uniform("resolution"), uTime = uniform("time"), uTravel = uniform("travel"), uProgress = uniform("progress");
      const uWipes = uniform("wipes[0]"), uEnds = uniform("ends[0]");

      const wipes = createWipes();
      const origin = performance.now();
      let raf = 0, travel = 0, eased = progressRef.current, last = origin;
      let previous: { x: number; y: number } | null = null;

      const resize = () => {
        const dpr = Math.min(devicePixelRatio, 1.5);
        canvas.width = innerWidth * dpr;
        canvas.height = innerHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      const point = (e: PointerEvent) => ({ x: e.clientX / innerWidth, y: 1 - e.clientY / innerHeight });
      const move = (e: PointerEvent) => {
        const next = point(e);
        if (previous) pushWipe(wipes, previous, next, (performance.now() - origin) / 1000);
        previous = next;
      };
      const release = () => { previous = null; };

      const frame = (now: number) => {
        const dt = Math.min(.05, (now - last) / 1000);
        last = now;
        // The window settles toward the page position, so fast scrolls blur into speed instead of snapping.
        eased += (progressRef.current - eased) * (1 - Math.exp(-dt * 5));
        travel += dt * .35 + Math.abs(progressRef.current - eased) * 60;
        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, (now - origin) / 1000);
        gl.uniform1f(uTravel, travel + eased * 24);
        gl.uniform1f(uProgress, eased);
        gl.uniform4fv(uWipes, wipes.starts, 0, MAX_WIPES * 4);
        gl.uniform2fv(uEnds, wipes.ends, 0, MAX_WIPES * 2);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        raf = requestAnimationFrame(frame);
      };

      addEventListener("resize", resize);
      addEventListener("pointermove", move, { passive: true });
      addEventListener("pointerup", release, { passive: true });
      addEventListener("pointercancel", release, { passive: true });
      resize();
      raf = requestAnimationFrame(frame);

      stop = () => {
        cancelAnimationFrame(raf);
        removeEventListener("resize", resize);
        removeEventListener("pointermove", move);
        removeEventListener("pointerup", release);
        removeEventListener("pointercancel", release);
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Touch screens start the window on an explicit tap so a phone never pays for the shader unprompted.
    if (matchMedia("(pointer: coarse)").matches) {
      const onTap = () => { if (!disposed) start(); };
      addEventListener("pointerdown", onTap, { once: true, passive: true });
      return () => { disposed = true; removeEventListener("pointerdown", onTap); stop(); };
    }

    start();
    return () => { disposed = true; stop(); };
  }, []);

  return <canvas ref={canvasRef} className="nli-webgl" aria-hidden="true" />;
}
