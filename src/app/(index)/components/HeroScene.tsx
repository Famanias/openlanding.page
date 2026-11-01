"use client";

import React, { useEffect, useRef } from "react";
import { createHeroPaintSimulation } from "./hero/paintSpread";

export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primaryRibbonRef = useRef<HTMLDivElement>(null);
  const secondaryRibbonRef = useRef<HTMLDivElement>(null);

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

    let dpr = 1;
    let frameId = 0;
    let lastTime = 0;

    const resize = () => {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sim.resize(width, height);
    };

    const renderFrame = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (primaryRibbonRef.current) {
        const { x, y, scaleX } = sim.ribbonOffset;
        primaryRibbonRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(-12deg) scaleX(${scaleX.toFixed(3)})`;
      }
      if (secondaryRibbonRef.current) {
        const { x, y, scaleX } = sim.ribbonOffset;
        secondaryRibbonRef.current.style.transform = `translate3d(${(-x * 0.65).toFixed(1)}px, ${(y * 0.65).toFixed(1)}px, 0) rotate(-20deg) scaleX(${(1 + (scaleX - 1) * 0.7).toFixed(3)})`;
      }

      ctx.globalCompositeOperation = "screen";

      for (const smudge of sim.smudges) {
        const progress = smudge.age / smudge.maxAge;
        const entry = Math.min(1, progress / 0.12);
        const decay = Math.pow(Math.max(0, 1 - progress), 1.65);
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

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("blur", onPointerLeave);
    };
  }, []);

  return (
    <div ref={hostRef} className="gradient-field" aria-hidden="true">
      <div ref={primaryRibbonRef} className="gradient-ribbon" />
      <div ref={secondaryRibbonRef} className="gradient-ribbon gradient-ribbon-secondary" />
      <canvas ref={canvasRef} className="hero-paint-canvas" />
    </div>
  );
}
