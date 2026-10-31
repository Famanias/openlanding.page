import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import {
  GlassBackgroundProps,
  GlassPresetConfig,
  GLASS_PRESETS,
  computeResponsiveFraming,
} from '../glass/glassTypes';
import {
  createStudioEnvironmentTexture,
  STUDIO_BACKDROP_VERTEX_SHADER,
  STUDIO_BACKDROP_FRAGMENT_SHADER,
  updateGlassShaderUniforms,
} from '../glass/glassShaders';
import { buildPresetSculpture, BuiltGlassScene } from '../glass/glassGeometry';

export interface GlassBackgroundHandle {
  exportStillImage: (
    format: 'image/png' | 'image/webp',
    width: number,
    height: number,
    transparent: boolean
  ) => Promise<string>;
  getCanvasElement: () => HTMLCanvasElement | null;
  resetAnimationTime: () => void;
}

const detectSoftwareGl = (): boolean => {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
};

/**
 * Renders a deterministic single-frame optical glass composition to a 2D data URL
 * or static canvas for secondary sections / fallback when continuous WebGL is not needed.
 */
function drawStaticOpticalFallbackCanvas(
  canvas: HTMLCanvasElement,
  presetConfig: GlassPresetConfig
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // 1. Studio lighting base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#F8F9FC');
  bg.addColorStop(0.5, '#F2F5FC');
  bg.addColorStop(1, '#EDF1FA');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // 2. Subtle architectural light bands
  ctx.save();
  ctx.translate(w * 0.55, h * 0.5);
  ctx.rotate(-0.32);
  for (let x = -w; x <= w; x += 110) {
    const band = ctx.createLinearGradient(x, -h, x + 52, h);
    band.addColorStop(0, 'rgba(255,255,255,0)');
    band.addColorStop(0.5, 'rgba(255,255,255,0.68)');
    band.addColorStop(1, 'rgba(201,218,250,0.22)');
    ctx.fillStyle = band;
    ctx.fillRect(x, -h, 46, h * 2);
  }
  ctx.restore();

  // 3. Preset-specific optical glass silhouette with bevel highlights & refracted offset lines
  ctx.save();
  const cx = w * (0.52 + presetConfig.scene.positionX * 0.22);
  const cy = h * (0.5 - presetConfig.scene.positionY * 0.22);

  if (presetConfig.id === 'frosted-fold') {
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1) * 120, cy + (i - 1) * 28);
      ctx.rotate(-0.18 + i * 0.11);
      const g = ctx.createLinearGradient(-260, -160, 260, 160);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
      g.addColorStop(0.5, 'rgba(216, 208, 247, 0.34)');
      g.addColorStop(1, 'rgba(201, 218, 250, 0.42)');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-250, -145, 500, 290, 28);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else if (presetConfig.id === 'glass-strata') {
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1.5) * 95, cy + (i - 1.5) * 24);
      ctx.rotate(-0.12 + i * 0.05);
      const g = ctx.createLinearGradient(-220, -130, 220, 130);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.80)');
      g.addColorStop(0.6, 'rgba(201, 218, 250, 0.38)');
      g.addColorStop(1, 'rgba(246, 220, 202, 0.36)');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-210, -125, 420, 250, 24);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else if (presetConfig.id === 'refractive-halo') {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.22);
    const ringGrad = ctx.createLinearGradient(-280, -200, 280, 200);
    ringGrad.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
    ringGrad.addColorStop(0.45, 'rgba(216, 208, 247, 0.52)');
    ringGrad.addColorStop(1, 'rgba(246, 220, 202, 0.52)');
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 64;
    ctx.beginPath();
    ctx.ellipse(0, 0, 270, 185, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 302, 217, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else {
    // Caustic window / default optical louvers
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1.5) * 140, cy);
      ctx.rotate(0.32);
      const blade = ctx.createLinearGradient(-45, -260, 45, 260);
      blade.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      blade.addColorStop(0.5, 'rgba(201, 218, 250, 0.42)');
      blade.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
      ctx.fillStyle = blade;
      ctx.fillRect(-42, -260, 84, 520);
      ctx.restore();
    }
  }
  ctx.restore();
}

export const GlassBackground = forwardRef<
  GlassBackgroundHandle,
  GlassBackgroundProps & { paused?: boolean }
>(
  (
    {
      preset = 'opal-ribbon',
      configOverrides,
      speed,
      intensity,
      seed,
      interactive = true,
      quality = 'auto',
      renderMode = 'live',
      transparentExport = false,
      paused = false,
      className = '',
    },
    ref
  ) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const staticCanvasRef = useRef<HTMLCanvasElement>(null);
    const [webglFailed, setWebglFailed] = useState(false);

    // Merge preset config with any overrides or prop shortcuts
    const mergedConfig: GlassPresetConfig = useMemo(() => {
      const base = GLASS_PRESETS[preset] || GLASS_PRESETS['opal-ribbon'];
      return {
        ...base,
        material: {
          ...base.material,
          ...(configOverrides?.material || {}),
        },
        scene: {
          ...base.scene,
          ...(configOverrides?.scene || {}),
          motionSpeed: speed !== undefined ? speed : configOverrides?.scene?.motionSpeed ?? base.scene.motionSpeed,
          lightingIntensity:
            intensity !== undefined
              ? intensity
              : configOverrides?.scene?.lightingIntensity ?? base.scene.lightingIntensity,
          seed: seed !== undefined ? seed : configOverrides?.scene?.seed ?? base.scene.seed,
        },
      };
    }, [preset, configOverrides, speed, intensity, seed]);

    // Store mutable live config in a ref so slider adjustments update uniforms in real time without tearing down WebGLRenderer!
    const liveConfigRef = useRef<GlassPresetConfig>(mergedConfig);
    liveConfigRef.current = mergedConfig;

    const pausedRef = useRef<boolean>(paused);
    pausedRef.current = paused;

    const syncActivityRef = useRef<() => void>(() => {});
    useEffect(() => {
      syncActivityRef.current();
    }, [paused]);

    const transparentRef = useRef<boolean>(transparentExport);
    transparentRef.current = transparentExport;

    const interactiveRef = useRef<boolean>(interactive);
    interactiveRef.current = interactive;


    const engineRef = useRef<{
      renderer: THREE.WebGLRenderer;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      studioTexture: THREE.CanvasTexture;
      backdropMesh: THREE.Mesh;
      backdropMat: THREE.ShaderMaterial;
      builtSculpture: BuiltGlassScene | null;
      currentPresetId: string;
      currentSeed: number;
      currentDensity: number;
      elapsedTime: number;
      renderSingleFrame: (timeSec: number, transparent: boolean) => void;
    } | null>(null);

    // Expose imperative export methods for GLASSFORM Studio
    useImperativeHandle(ref, () => ({
      getCanvasElement: () => engineRef.current?.renderer.domElement || null,
      resetAnimationTime: () => {
        if (engineRef.current) {
          engineRef.current.elapsedTime = 0;
          engineRef.current.renderSingleFrame(0, transparentRef.current);
        }
      },
      exportStillImage: async (format, width, height, transparent) => {
        const eng = engineRef.current;
        if (!eng) return '';

        const prevSize = new THREE.Vector2();
        eng.renderer.getSize(prevSize);
        const prevPixelRatio = eng.renderer.getPixelRatio();
        const prevAspect = eng.camera.aspect;

        try {
          eng.renderer.setPixelRatio(1);
          eng.renderer.setSize(width, height, false);
          eng.camera.aspect = width / Math.max(1, height);
          eng.camera.updateProjectionMatrix();

          eng.renderSingleFrame(eng.elapsedTime, transparent);
          const dataUrl = eng.renderer.domElement.toDataURL(format, 0.95);
          return dataUrl;
        } finally {
          eng.renderer.setPixelRatio(prevPixelRatio);
          eng.renderer.setSize(prevSize.x, prevSize.y, false);
          eng.camera.aspect = prevAspect;
          eng.camera.updateProjectionMatrix();
          eng.renderSingleFrame(eng.elapsedTime, transparentRef.current);
        }
      },
    }));

    // Handle static mode canvas rendering
    useEffect(() => {
      if (renderMode !== 'static' && !webglFailed) return;
      const canvas = staticCanvasRef.current;
      if (!canvas) return;
      canvas.width = 1440;
      canvas.height = 810;
      drawStaticOpticalFallbackCanvas(canvas, mergedConfig);
    }, [renderMode, webglFailed, mergedConfig]);

    // Initialize single WebGLRenderer when in live mode
    useEffect(() => {
      if (renderMode === 'static') return;
      const container = mountRef.current;
      if (!container) return;

      const isSoftwareGl = detectSoftwareGl();
      let renderer: THREE.WebGLRenderer;

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !isSoftwareGl && quality !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        });
      } catch {
        setWebglFailed(true);
        return;
      }

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.06;

      const maxDpr =
        isSoftwareGl || quality === 'low' ? 1 : quality === 'medium' ? 1.25 : Math.min(window.devicePixelRatio, 1.75);
      renderer.setPixelRatio(maxDpr);

      const initialW = Math.max(320, container.clientWidth || 1280);
      const initialH = Math.max(240, container.clientHeight || 720);
      renderer.setSize(initialW, initialH, false);
      renderer.domElement.className = 'h-full w-full block pointer-events-none';

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 50);
      camera.position.set(0, 0, 5.2);

      // Studio environment texture for refraction & backdrop
      const studioTexture = createStudioEnvironmentTexture(renderer);

      // Backdrop full-screen quad
      const backdropGeo = new THREE.PlaneGeometry(2, 2);
      const backdropMat = new THREE.ShaderMaterial({
        uniforms: {
          uStudioMap: { value: studioTexture },
          uLightingIntensity: { value: liveConfigRef.current.scene.lightingIntensity },
          uCausticIntensity: { value: liveConfigRef.current.material.causticIntensity },
          uLoopPhase: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: STUDIO_BACKDROP_VERTEX_SHADER,
        fragmentShader: STUDIO_BACKDROP_FRAGMENT_SHADER,
        depthWrite: false,
        depthTest: false,
      });
      const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
      backdropMesh.renderOrder = -10;
      backdropMesh.frustumCulled = false;
      scene.add(backdropMesh);

      const cfg0 = liveConfigRef.current;
      const initialSculpture = buildPresetSculpture(
        cfg0.id,
        studioTexture,
        cfg0.material,
        cfg0.scene,
        transparentRef.current,
        isSoftwareGl
      );
      scene.add(initialSculpture.group);

      const targetPointer = { x: 0, y: 0 };
      const currentPointer = { x: 0, y: 0 };

      const renderSingleFrame = (timeSec: number, transparent: boolean) => {
        const cfg = liveConfigRef.current;
        const loopDur = Math.max(4, cfg.scene.loopDurationSec || 12);
        const loopPhase = ((timeSec * cfg.scene.motionSpeed) / loopDur) * Math.PI * 2;

        // Toggle studio backdrop visibility for transparent PNG/WebP exports
        backdropMesh.visible = !transparent;
        if (transparent) {
          renderer.setClearColor(0x000000, 0);
        } else {
          renderer.setClearColor(0xf8f9fc, 1);
        }

        backdropMat.uniforms.uLightingIntensity.value = cfg.scene.lightingIntensity;
        backdropMat.uniforms.uCausticIntensity.value = cfg.material.causticIntensity;
        backdropMat.uniforms.uLoopPhase.value = loopPhase;
        backdropMat.uniforms.uPointer.value.set(currentPointer.x, currentPointer.y);

        const activeSculpture = engineRef.current?.builtSculpture;
        if (activeSculpture) {
          const w = renderer.domElement.clientWidth || initialW;
          const h = renderer.domElement.clientHeight || initialH;
          const framing = computeResponsiveFraming(
            w,
            h,
            cfg.scene.positionX,
            cfg.scene.positionY,
            cfg.scene.scale
          );

          camera.position.z = framing.cameraZ;
          activeSculpture.group.position.set(framing.offsetX, framing.offsetY, 0);
          activeSculpture.group.scale.setScalar(framing.effectiveScale);

          activeSculpture.animate(loopPhase, currentPointer.x, currentPointer.y);

          for (const mat of activeSculpture.materials) {
            updateGlassShaderUniforms(
              mat,
              cfg.material,
              cfg.scene,
              loopPhase,
              currentPointer.x,
              currentPointer.y,
              transparent
            );
          }
        }

        renderer.render(scene, camera);
      };

      engineRef.current = {
        renderer,
        scene,
        camera,
        studioTexture,
        backdropMesh,
        backdropMat,
        builtSculpture: initialSculpture,
        currentPresetId: cfg0.id,
        currentSeed: cfg0.scene.seed,
        currentDensity: cfg0.scene.shapeDensity,
        elapsedTime: 0,
        renderSingleFrame,
      };

      // Pointer listener (non-blocking on window)
      const handlePointerMove = (e: PointerEvent) => {
        if (!interactiveRef.current) return;
        const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
        const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
        targetPointer.x = Math.max(-1, Math.min(1, nx));
        targetPointer.y = Math.max(-1, Math.min(1, ny));
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // Resize observer
      const handleResize = () => {
        if (!container || !engineRef.current) return;
        const w = Math.max(300, container.clientWidth);
        const h = Math.max(200, container.clientHeight);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
      };
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // IntersectionObserver to suspend loop when offscreen
      let isVisible = true;
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisible = entry.isIntersecting;
          }
        },
        { threshold: 0.02 }
      );
      intersectionObserver.observe(container);

      // WebGL context loss/restore listeners
      const handleContextLost = (e: Event) => {
        e.preventDefault();
      };
      const handleContextRestored = () => {
        if (engineRef.current) {
          renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
        }
      };
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

      // Paced animation loop (uses afterDraw on software WebGL per threejs skill)
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let isReducedMotion = reducedMotionQuery.matches;
      let frameId = 0;
      let timerId = 0;
      let disposed = false;
      let isRunning = false;
      let lastTimeMs = performance.now();

      function afterDraw(cb: () => void) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (!gl || typeof gl.fenceSync !== 'function') {
          timerId = window.setTimeout(cb, 80);
          return;
        }
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            timerId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            timerId = window.setTimeout(cb, 80);
          }
        };
        timerId = window.setTimeout(poll, 5);
      }

      // Draw initial frame immediately
      renderSingleFrame(0, transparentRef.current);

      function tick() {
        if (disposed) return;

        const shouldRun = isVisible && !pausedRef.current && !isReducedMotion && !document.hidden;
        if (!shouldRun) {
          isRunning = false;
          return;
        }

        const nowMs = performance.now();
        const dtSec = Math.min(0.1, (nowMs - lastTimeMs) / 1000);
        lastTimeMs = nowMs;

        const eng = engineRef.current;
        if (eng) {
          eng.elapsedTime += dtSec;
          currentPointer.x += (targetPointer.x - currentPointer.x) * Math.min(1, dtSec * 4.5);
          currentPointer.y += (targetPointer.y - currentPointer.y) * Math.min(1, dtSec * 4.5);
          eng.renderSingleFrame(eng.elapsedTime, transparentRef.current);
        }

        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }

      function syncActivity() {
        if (disposed) return;
        const shouldRun = isVisible && !pausedRef.current && !isReducedMotion && !document.hidden;
        if (shouldRun && !isRunning) {
          isRunning = true;
          lastTimeMs = performance.now();
          if (isSoftwareGl) {
            afterDraw(tick);
          } else {
            frameId = requestAnimationFrame(tick);
          }
        } else if (!shouldRun && isRunning) {
          isRunning = false;
          cancelAnimationFrame(frameId);
          clearTimeout(timerId);
          if (engineRef.current) {
            engineRef.current.renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
          }
        }
      }

      const handleVisibilityChange = () => {
        syncActivity();
      };
      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        isReducedMotion = e.matches;
        syncActivity();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
      syncActivityRef.current = syncActivity;
      syncActivity();

      return () => {
        disposed = true;
        syncActivityRef.current = () => {};
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
        cancelAnimationFrame(frameId);
        clearTimeout(timerId);
        window.removeEventListener('pointermove', handlePointerMove);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

        if (engineRef.current?.builtSculpture) {
          engineRef.current.builtSculpture.dispose();
        }
        backdropGeo.dispose();
        backdropMat.dispose();
        studioTexture.dispose();
        renderer.dispose();
        engineRef.current = null;
      };
    }, [renderMode, quality]);

    // Rebuild sculpture geometry ONLY when preset ID, seed, or shapeDensity changes;
    // for all material sliders, update uniforms directly in place!
    useEffect(() => {
      const eng = engineRef.current;
      if (!eng) return;

      const needsGeometryRebuild =
        eng.currentPresetId !== mergedConfig.id ||
        eng.currentSeed !== mergedConfig.scene.seed ||
        eng.currentDensity !== mergedConfig.scene.shapeDensity;

      if (needsGeometryRebuild) {
        if (eng.builtSculpture) {
          eng.scene.remove(eng.builtSculpture.group);
          eng.builtSculpture.dispose();
        }
        const isSoftwareGl = detectSoftwareGl();
        const nextSculpture = buildPresetSculpture(
          mergedConfig.id,
          eng.studioTexture,
          mergedConfig.material,
          mergedConfig.scene,
          transparentExport,
          isSoftwareGl
        );
        eng.scene.add(nextSculpture.group);
        eng.builtSculpture = nextSculpture;
        eng.currentPresetId = mergedConfig.id;
        eng.currentSeed = mergedConfig.scene.seed;
        eng.currentDensity = mergedConfig.scene.shapeDensity;
      }

      eng.renderSingleFrame(eng.elapsedTime, transparentExport);
    }, [mergedConfig, transparentExport]);

    if (renderMode === 'static' || webglFailed) {
      return (
        <div
          aria-hidden="true"
          data-preset={mergedConfig.id}
          data-mode="static"
          className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
          <canvas
            ref={staticCanvasRef}
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      );
    }

    return (
      <div
        ref={mountRef}
        aria-hidden="true"
        data-testid="glassform-webgl-stage"
        data-preset={mergedConfig.id}
        data-mode="live"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      />
    );
  }
);

GlassBackground.displayName = 'GlassBackground';
