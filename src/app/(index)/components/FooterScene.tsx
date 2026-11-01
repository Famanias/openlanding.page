"use client";

import { useEffect, useRef } from "react";

export interface FooterCameraBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface FooterPointerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  strength: number;
  phase: number;
}

export interface FooterPointerTarget {
  x: number;
  y: number;
  active: boolean;
}

export function createFooterPointerState(): FooterPointerState {
  return { x: 0, y: 0, vx: 0, vy: 0, strength: 0, phase: 0 };
}

export function pointInFooterScene(
  clientX: number,
  clientY: number,
  rect: Pick<DOMRectReadOnly, "left" | "right" | "top" | "bottom" | "width" | "height">,
  camera: FooterCameraBounds,
  rootScale: { x: number; y: number } = { x: 1, y: 1 }
): { x: number; y: number } | null {
  if (
    rect.width <= 0 ||
    rect.height <= 0 ||
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return null;
  }

  const nx = (clientX - rect.left) / rect.width;
  const ny = (clientY - rect.top) / rect.height;
  const worldX = camera.left + nx * (camera.right - camera.left);
  const worldY = camera.top - ny * (camera.top - camera.bottom);

  return {
    x: worldX / (rootScale.x || 1),
    y: worldY / (rootScale.y || 1),
  };
}

export function stepFooterPointer(
  state: FooterPointerState,
  target: FooterPointerTarget,
  dt: number
): void {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  if (safeDt === 0) return;

  const follow = 1 - Math.exp(-safeDt * 10);
  const prevX = state.x;
  const prevY = state.y;

  state.x += (target.x - state.x) * follow;
  state.y += (target.y - state.y) * follow;

  const dx = state.x - prevX;
  const dy = state.y - prevY;
  const velFollow = 1 - Math.exp(-safeDt * 12);
  state.vx += (dx / safeDt - state.vx) * velFollow;
  state.vy += (dy / safeDt - state.vy) * velFollow;
  state.phase += Math.hypot(dx, dy) * 1.65;

  const targetStrength = target.active ? 1 : 0;
  const strengthRate = target.active ? 7.5 : 3.2;
  state.strength += (targetStrength - state.strength) * (1 - Math.exp(-safeDt * strengthRate));
}

export function FooterScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let started = false;
    let stop: (() => void) | undefined;

    const loader = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || started) return;
        started = true;
        loader.disconnect();

        void Promise.all([import("three"), import("./footer/sculpture")])
          .then(([THREE, { createFooterSculpture }]) => {
            if (disposed) return;

            let renderer: import("three").WebGLRenderer;
            try {
              renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true,
                powerPreference: "low-power",
              });
            } catch {
              return;
            }

            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setClearColor(0x0c100b, 1);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.05;
            host.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-9, 9, 3, -3, 0.1, 50);
            camera.position.z = 14;

            const sculpture = createFooterSculpture();
            scene.add(sculpture.stage, sculpture.root);

            const keyLight = new THREE.DirectionalLight(0xd4e4d6, 1.85);
            keyLight.position.set(0.5, 5.2, 9.5);

            const fillLight = new THREE.HemisphereLight(0xa2baa6, 0x0a0d09, 0.72);

            const rimLight = new THREE.DirectionalLight(0x9ecbb2, 1.25);
            rimLight.position.set(5.5, 4.8, -3.0);

            const coralLight = new THREE.PointLight(0xf48b68, 6.4, 6.8, 1.9);
            coralLight.position.set(4.8, -0.95, 1.85);

            sculpture.root.add(coralLight);
            scene.add(keyLight, fillLight, rimLight);

            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
            const pointerState = createFooterPointerState();
            const pointerTarget: FooterPointerTarget = { x: 0, y: 0, active: false };
            let visible = false;
            let contextLostFlag = false;
            let frame = 0;
            let elapsed = 0;
            let lastTime = 0;

            const onPointerMove = (event: PointerEvent) => {
              const point = pointInFooterScene(
                event.clientX,
                event.clientY,
                host.getBoundingClientRect(),
                camera,
                sculpture.root.scale
              );
              if (point) {
                pointerTarget.x = point.x;
                pointerTarget.y = point.y;
                if (pointerState.strength < 0.01) {
                  pointerState.x = point.x;
                  pointerState.y = point.y;
                }
                pointerTarget.active = true;
              } else {
                pointerTarget.active = false;
              }
            };

            const onPointerEnd = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") {
                pointerTarget.active = false;
              }
            };

            const clearPointer = () => {
              pointerTarget.active = false;
            };

            const onPointerOut = (event: PointerEvent) => {
              if (!event.relatedTarget) {
                clearPointer();
              }
            };

            const draw = () => {
              if (!contextLostFlag) {
                renderer.render(scene, camera);
              }
            };

            const tick = (now: number) => {
              if (!visible || document.hidden || reducedMotion.matches || contextLostFlag) {
                frame = 0;
                lastTime = 0;
                return;
              }
              const dt = lastTime ? Math.min((now - lastTime) / 1000, 0.05) : 1 / 60;
              if (lastTime) {
                elapsed += dt;
              }
              lastTime = now;
              stepFooterPointer(pointerState, pointerTarget, dt);
              keyLight.position.set(
                0.5 + pointerState.x * 0.16 * pointerState.strength,
                5.2 + pointerState.y * 0.2 * pointerState.strength,
                9.5
              );
              coralLight.position.set(
                4.8 + pointerState.x * 0.12 * pointerState.strength,
                -0.95 + pointerState.y * 0.14 * pointerState.strength,
                1.85
              );
              sculpture.update(elapsed, pointerState);
              draw();
              frame = requestAnimationFrame(tick);
            };

            const updatePlayback = () => {
              cancelAnimationFrame(frame);
              frame = 0;
              lastTime = 0;
              if (contextLostFlag) return;
              if (visible && !document.hidden && !reducedMotion.matches) {
                frame = requestAnimationFrame(tick);
              } else if (visible) {
                draw();
              }
            };

            const resize = () => {
              const width = host.clientWidth;
              const height = host.clientHeight;
              if (!width || !height) return;
              const aspect = width / height;
              const baseAspect = 3;
              if (aspect > baseAspect) {
                const scale = aspect / baseAspect;
                sculpture.root.scale.set(scale, scale, scale);
                sculpture.stage.scale.set(scale, scale, 1);
                const halfWidth = 9 * scale;
                camera.left = -halfWidth;
                camera.right = halfWidth;
                camera.top = 3;
                camera.bottom = -3;
              } else {
                sculpture.root.scale.set(1, 1, 1);
                sculpture.stage.scale.set(1, 1, 1);
                const halfWidth = aspect * 3;
                camera.left = -halfWidth;
                camera.right = halfWidth;
                camera.top = 3;
                camera.bottom = -3;
              }
              camera.updateProjectionMatrix();
              renderer.setSize(width, height, false);
              draw();
            };

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(host);

            const visibilityObserver = new IntersectionObserver(([entry]) => {
              visible = entry.isIntersecting;
              updatePlayback();
            });
            visibilityObserver.observe(host);

            window.addEventListener("pointermove", onPointerMove, { passive: true });
            window.addEventListener("pointerdown", onPointerMove, { passive: true });
            window.addEventListener("pointerup", onPointerEnd, { passive: true });
            window.addEventListener("pointercancel", onPointerEnd, { passive: true });
            window.addEventListener("pointerout", onPointerOut, { passive: true });
            window.addEventListener("blur", clearPointer);
            reducedMotion.addEventListener("change", updatePlayback);
            document.addEventListener("visibilitychange", updatePlayback);

            const onContextLost = (event: Event) => {
              event.preventDefault();
              contextLostFlag = true;
              cancelAnimationFrame(frame);
              frame = 0;
              delete host.dataset.ready;
            };

            const onContextRestored = () => {
              contextLostFlag = false;
              host.dataset.ready = "true";
              resize();
              updatePlayback();
            };

            renderer.domElement.addEventListener("webglcontextlost", onContextLost);
            renderer.domElement.addEventListener("webglcontextrestored", onContextRestored);

            resize();
            host.dataset.ready = "true";

            const review = (event: Event) => {
              const detail = (
                event as CustomEvent<{ yaw?: number; pitch?: number; transparent?: boolean }>
              ).detail;
              const transparent = Boolean(detail?.transparent);
              sculpture.stage.visible = !transparent;
              renderer.setClearColor(0x0c100b, transparent ? 0 : 1);
              sculpture.root.rotation.set(detail?.pitch ?? 0, detail?.yaw ?? 0, 0);
              draw();
            };

            if (process.env.NODE_ENV !== "production") {
              host.addEventListener("footer-review", review);
            }

            stop = () => {
              cancelAnimationFrame(frame);
              resizeObserver.disconnect();
              visibilityObserver.disconnect();
              window.removeEventListener("pointermove", onPointerMove);
              window.removeEventListener("pointerdown", onPointerMove);
              window.removeEventListener("pointerup", onPointerEnd);
              window.removeEventListener("pointercancel", onPointerEnd);
              window.removeEventListener("pointerout", onPointerOut);
              window.removeEventListener("blur", clearPointer);
              reducedMotion.removeEventListener("change", updatePlayback);
              document.removeEventListener("visibilitychange", updatePlayback);
              host.removeEventListener("footer-review", review);
              renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
              renderer.domElement.removeEventListener("webglcontextrestored", onContextRestored);
              sculpture.dispose();
              renderer.dispose();
              renderer.domElement.remove();
              delete host.dataset.ready;
            };
          })
          .catch(() => {
            /* Retain the code-drawn SVG fallback if WebGL or module loading fails. */
          });
      },
      { rootMargin: "150px" }
    );

    loader.observe(host);
    return () => {
      disposed = true;
      loader.disconnect();
      stop?.();
    };
  }, []);

  return (
    <div ref={hostRef} className="footer-scene" aria-hidden="true">
      <svg
        className="footer-fallback"
        viewBox="0 0 1800 600"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="footer-bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#111510" />
            <stop offset="72%" stopColor="#090c08" />
            <stop offset="100%" stopColor="#181b17" />
          </linearGradient>
          <radialGradient id="footer-coral-pool" cx="77.5%" cy="82%" r="16%">
            <stop offset="0%" stopColor="#845644" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#462f25" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#111510" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="footer-front-grad" x1="0" y1="0.3" x2="1" y2="0.7">
            <stop offset="0%" stopColor="#2c312b" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#232822" stopOpacity="0.92" />
            <stop offset="78%" stopColor="#564138" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#151914" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="footer-sail-grad" x1="0.45" y1="0.7" x2="0.96" y2="0.06">
            <stop offset="0%" stopColor="#26312a" stopOpacity="0.38" />
            <stop offset="55%" stopColor="#52463f" stopOpacity="0.46" />
            <stop offset="100%" stopColor="#4a5d51" stopOpacity="0.58" />
          </linearGradient>
        </defs>
        <rect width="1800" height="600" fill="url(#footer-bg-grad)" />
        <ellipse cx="1395" cy="495" rx="220" ry="78" fill="url(#footer-coral-pool)" />
        <path
          d="M-54 321 Q198 284 504 318 T1062 280 Q1260 229 1458 267 T1773 441 L1773 445 Q1458 400 1062 381 T504 405 Q198 455 -54 469 Z"
          fill="#181e18"
          fillOpacity="0.82"
          stroke="#6b7c70"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="M-54 178 Q140 210 288 287 Q540 319 738 362 T1053 446 Q1368 385 1692 263 L1790 187 L1790 447 Q1530 400 1368 401 Q1179 473 1053 452 Q900 473 738 485 Q540 418 288 294 Q160 286 -54 324 Z"
          fill="url(#footer-front-grad)"
          stroke="#8fa396"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />
        <path
          d="M720 371 Q900 388 990 375 Q1224 261 1697 28 L1771 443 Q1584 407 1404 400 Q1296 427 1179 473 Q1044 450 882 412 Z"
          fill="url(#footer-sail-grad)"
          stroke="#9ec8b2"
          strokeOpacity="0.68"
          strokeWidth="1.75"
        />
        <path
          d="M1053 446 Q1368 385 1692 263"
          fill="none"
          stroke="#f3a287"
          strokeOpacity="0.72"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
