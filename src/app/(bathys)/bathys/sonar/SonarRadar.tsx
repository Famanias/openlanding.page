"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "../descent/store";
import { useReducedMotion } from "../motion/useReducedMotion";

export function SonarRadar({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [pingPulse, setPingPulse] = useState(0);

  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const reduced = useReducedMotion();

  // Track visibility to pause rAF when out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Canvas radar animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Adjust sweep speed based on depth
      const speed = depth >= 6000 ? 1.8 : 1.2;
      angle = (angle + speed * dt) % (Math.PI * 2);

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) - 10;

      // Clear with slight trail retention
      ctx.fillStyle = "rgba(3, 7, 13, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Outer bounding ring
      ctx.strokeStyle = "#122338";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Range rings (25%, 50%, 75%)
      ctx.strokeStyle = "#122338";
      ctx.lineWidth = 1;
      [0.25, 0.5, 0.75].forEach((factor) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * factor, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshairs
      ctx.strokeStyle = "rgba(84, 110, 138, 0.3)";
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sweep gradient sector (trailing 40 degrees)
      const trailAngle = 0.6;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle - trailAngle, angle);
      ctx.closePath();

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(0, 229, 255, 0.4)");
      grad.addColorStop(0.7, "rgba(0, 229, 255, 0.15)");
      grad.addColorStop(1, "rgba(0, 229, 255, 0.0)");
      ctx.fillStyle = grad;
      ctx.fill();

      // Leading beam line
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
      ctx.stroke();
      ctx.restore();

      // Center emitter dot
      ctx.fillStyle = "#00E5FF";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // If depth >= 6000m, draw benthic trench echo targets
      if (depth >= 6000) {
        ctx.fillStyle = "#FF9E1B";
        // Fixed mock targets reflecting off trench wall
        const targets = [
          { r: 0.65, theta: 1.2 },
          { r: 0.82, theta: 3.4 },
          { r: 0.45, theta: 5.1 },
        ];
        targets.forEach((t) => {
          const tx = cx + Math.cos(t.theta) * (radius * t.r);
          const ty = cy + Math.sin(t.theta) * (radius * t.r);
          // Highlight when sweep beam is near
          const diff = Math.abs((angle % (Math.PI * 2)) - t.theta);
          const isHit = diff < 0.25 || diff > Math.PI * 2 - 0.25;

          ctx.beginPath();
          ctx.arc(tx, ty, isHit ? 5 : 3, 0, Math.PI * 2);
          ctx.fill();

          if (isHit) {
            ctx.strokeStyle = "rgba(255, 158, 27, 0.5)";
            ctx.strokeRect(tx - 8, ty - 8, 16, 16);
          }
        });
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [inView, reduced, depth]);

  const handlePing = () => {
    setPingPulse((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center bg-navy/90 border border-glass rounded-lg p-5 backdrop-blur-md ${className}`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
          <span className="bat-mono text-xs text-titanium uppercase tracking-wider font-bold">
            Multibeam Acoustic Radar
          </span>
        </div>
        <span className="bat-mono text-[11px] text-mist">
          {depth >= 6000 ? "120 kHz HADAL CHIRP" : "12 kHz WIDE BEAM"}
        </span>
      </div>

      <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] rounded-full overflow-hidden bg-trench border border-glass flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="w-full h-full"
          aria-label="Acoustic Sonar Radar Canvas"
        />

        {/* Pulse effect overlay */}
        {pingPulse > 0 && (
          <div
            key={pingPulse}
            className="absolute inset-0 rounded-full border-2 border-cyan animate-ping pointer-events-none"
            style={{ animationDuration: "1s" }}
          />
        )}
      </div>

      <div className="flex items-center justify-between w-full mt-4 gap-3">
        <button
          type="button"
          onClick={handlePing}
          className="bat-btn bat-btn-outline text-xs py-2 px-4 flex-1"
        >
          Transmit Ping
        </button>
        <div className="text-right bat-mono text-[11px] text-slate">
          <span>Range: {depth >= 6000 ? "5,000 M" : "12,000 M"}</span>
        </div>
      </div>
    </div>
  );
}
