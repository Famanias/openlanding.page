"use client";

import React, { useEffect, useRef } from "react";
import { createHeroPaintSimulation } from "./hero/paintSpread";

function createFilmGrainPattern(ctx: CanvasRenderingContext2D): CanvasPattern | null {
  const size = 160;
  const tile = document.createElement("canvas");
  tile.width = size;
  tile.height = size;
  const tileCtx = tile.getContext("2d");
  if (!tileCtx) return null;

  const img = tileCtx.createImageData(size, size);
  const data = img.data;
  for (let i = 0; i < size * size; i++) {
    let n = Math.imul(i + 1, 374761393) ^ Math.imul(i + 7919, 668265263);
    n = (n ^ (n >>> 13)) * 1274126177;
    const v = ((n ^ (n >>> 16)) >>> 0) & 255;
    const idx = i * 4;
    data[idx] = v;
    data[idx + 1] = v;
    data[idx + 2] = v;
    data[idx + 3] = 28;
  }
  tileCtx.putImageData(img, 0, 0);
  return ctx.createPattern(tile, "repeat");
}

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sim = createHeroPaintSimulation({
      width: host.clientWidth || 1200,
      height: host.clientHeight || 520,
    });

    const bufWidth = 240;
    const bufHeight = 110;
    const fieldCanvas = document.createElement("canvas");
    fieldCanvas.width = bufWidth;
    fieldCanvas.height = bufHeight;
    const fieldCtx = fieldCanvas.getContext("2d");
    const fieldImage = fieldCtx ? fieldCtx.createImageData(bufWidth, bufHeight) : null;
    const grainPattern = createFilmGrainPattern(ctx);

    let dpr = 1;
    let frameId = 0;
    let lastTime = 0;

    const renderFrame = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (fieldCtx && fieldImage) {
        sim.renderFieldToBuffer(fieldImage.data, bufWidth, bufHeight);
        fieldCtx.putImageData(fieldImage, 0, 0);
        ctx.save();
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(fieldCanvas, 0, 0, width, height);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "screen";

      for (const smudge of sim.smudges) {
        const progress = Math.min(1, smudge.age / smudge.maxAge);
        const entry = Math.min(1, smudge.age / 0.18);
        const decay = smudge.persistent
          ? 0.65 + 0.35 * (1 - progress)
          : Math.pow(Math.max(0, 1 - progress), 1.65);
        const alpha = smudge.alpha * entry * decay;
        if (alpha <= 0.002) continue;

        const [r, g, b] = smudge.color;
        ctx.save();
        ctx.translate(smudge.x, smudge.y);
        ctx.rotate(smudge.angle);
        ctx.scale(smudge.radiusX, smudge.radiusY);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(4)})`);
        grad.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${(alpha * 0.62).toFixed(4)})`);
        grad.addColorStop(0.78, `rgba(${r}, ${g}, ${b}, ${(alpha * 0.22).toFixed(4)})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (grainPattern) {
        ctx.save();
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      ctx.globalCompositeOperation = "screen";

      for (const particle of sim.particles) {
        const progress = particle.age / particle.maxAge;
        const entry = Math.min(1, progress / 0.1);
        const decay = Math.pow(Math.max(0, 1 - progress), 1.35);
        const alpha = particle.alpha * entry * decay;
        if (alpha <= 0.005) continue;

        const [r, g, b] = particle.color;
        const glowRadius = particle.size * 3.4;
        const glow = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius
        );
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${(alpha * 0.95).toFixed(4)})`);
        glow.addColorStop(0.38, `rgba(${r}, ${g}, ${b}, ${(alpha * 0.42).toFixed(4)})`);
        glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sim.resize(width, height);
      if (!reducedMotion.matches) {
        host.dataset.ready = "true";
        renderFrame();
      } else {
        delete host.dataset.ready;
      }
    };

    const tick = (now: number) => {
      if (reducedMotion.matches || document.hidden) {
        frameId = 0;
        lastTime = 0;
        return;
      }
      const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
      lastTime = now;

      sim.step(dt);
      renderFrame();

      if (sim.isActive()) {
        frameId = requestAnimationFrame(tick);
      } else {
        frameId = 0;
        lastTime = 0;
      }
    };

    const ensureLoop = () => {
      if (!frameId && !reducedMotion.matches && !document.hidden) {
        frameId = requestAnimationFrame(tick);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion.matches) return;
      const rect = host.getBoundingClientRect();
      if (
        rect.width <= 0 ||
        rect.height <= 0 ||
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        sim.leavePointer();
        return;
      }

      sim.movePointer(event.clientX - rect.left, event.clientY - rect.top);
      renderFrame();
      ensureLoop();
    };

    const onPointerLeave = () => {
      sim.leavePointer();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeave);
    reducedMotion.addEventListener("change", resize);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
      reducedMotion.removeEventListener("change", resize);
      delete host.dataset.ready;
    };
  }, []);

  return (
    <div ref={hostRef} className="gradient-field" aria-hidden="true">
      <div className="gradient-ribbon" />
      <div className="gradient-ribbon gradient-ribbon-secondary" />
      <canvas ref={canvasRef} className="hero-paint-canvas" />
    </div>
  );
}
