import type { BackgroundEffect, EffectId } from '../engine/effectTypes';

export interface ExportableEffectBundle {
  effectId: EffectId;
  componentName: string;
  integrationSnippet: string;
  standaloneComponentCode: string;
  readmeMarkdown: string;
  packageJson: string;
}

const COMPONENT_NAME_MAP: Record<EffectId, string> = {
  'chroma-fluid': 'ChromaFluidBackground',
  'fluted-light': 'FlutedLightBackground',
  'silk-atmosphere': 'SilkAtmosphereBackground',
  'glass-lens': 'GlassLensBackground',
  'aurora-field': 'AuroraFieldBackground',
  'chromatic-ribbons': 'ChromaticRibbonsBackground',
  'bokeh-reactor': 'BokehReactorBackground',
  'refraction-field': 'RefractionFieldBackground',
};

export function getExportBundleForEffect(
  effect: BackgroundEffect,
  interaction = 70,
  speed = 45,
  paletteIndex = 0
): ExportableEffectBundle {
  const componentName = COMPONENT_NAME_MAP[effect.id];
  const palette = effect.palettes[paletteIndex % effect.palettes.length] || effect.palettes[0];
  const intensityNum = Math.round(interaction) / 100;
  const speedNum = Math.round(speed) / 100;

  const integrationSnippet = `// Requires: npm install three @types/three
import { ${componentName} } from './components/${componentName}';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[${palette.bgHex}] text-white">
      <${componentName}
        intensity={${intensityNum.toFixed(2)}}
        speed={${speedNum.toFixed(2)}}
        palette="${palette.id}"
        swatches={${JSON.stringify(palette.swatches)}}
        bgHex="${palette.bgHex}"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-5xl font-bold tracking-tight">${effect.headlineAccent}</h1>
        <p className="mt-4 max-w-xl text-white/80">
          ${effect.shortDescription}
        </p>
      </div>
    </section>
  );
}`;

  const standaloneComponentCode = `'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface ${componentName}Props {
  intensity?: number; // 0.0 to 1.0 (default ${intensityNum.toFixed(2)})
  speed?: number;     // 0.0 to 1.0 (default ${speedNum.toFixed(2)})
  palette?: string;
  swatches?: [string, string, string, string];
  bgHex?: string;
  className?: string;
}

/**
 * SURFACE/08 Standalone Export — ${effect.indexNumber} ${effect.label}
 * ${effect.shortDescription}
 * Dependencies: three (^0.170.0 or compatible)
 */
export function ${componentName}({
  intensity = ${intensityNum.toFixed(2)},
  speed = ${speedNum.toFixed(2)},
  swatches = ${JSON.stringify(palette.swatches)},
  bgHex = '${palette.bgHex}',
  className = 'fixed inset-0 -z-10 h-full w-full pointer-events-none',
}: ${componentName}Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uInteraction: { value: intensity * 1.25 },
      uPointer: { value: new THREE.Vector2(0.62, 0.52) },
      uPointerVel: { value: new THREE.Vector2(0, 0) },
      uClickPulse: { value: 0 },
      uClickPos: { value: new THREE.Vector2(0.62, 0.52) },
      uAspect: { value: (container.clientWidth || window.innerWidth) / Math.max(1, container.clientHeight || window.innerHeight) },
      uColor0: { value: new THREE.Color(swatches[0]) },
      uColor1: { value: new THREE.Color(swatches[1]) },
      uColor2: { value: new THREE.Color(swatches[2]) },
      uColor3: { value: new THREE.Color(swatches[3]) },
      uBgColor: { value: new THREE.Color(bgHex) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      \`,
      fragmentShader: \`
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uSpeed;
        uniform float uInteraction;
        uniform vec2 uPointer;
        uniform vec2 uPointerVel;
        uniform float uClickPulse;
        uniform vec2 uClickPos;
        uniform float uAspect;
        uniform vec3 uColor0;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uBgColor;

        void main() {
          vec2 uv = vUv;
          vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
          float t = uTime * (0.32 + uSpeed * 0.65);

          vec2 dp = (uv - uPointer) * vec2(uAspect, 1.0);
          float dist = length(dp);
          float nearField = exp(-dist * dist * 7.0) * uInteraction;

          // Ribbed / optical surface modulation for ${effect.label}
          float ribFreq = ${effect.id === 'fluted-light' ? '34.0' : '12.0'};
          float xFlute = fract((uv.x + dp.x * nearField * 0.08) * ribFreq) * 2.0 - 1.0;
          float dHdx = -xFlute * 0.85;
          vec2 refractedUv = uv + vec2(dHdx * 0.045, sin(uv.y * 12.0 + t) * 0.015) * (0.7 + nearField * 0.5);

          vec2 rp = (refractedUv - 0.5) * vec2(uAspect, 1.0);
          float w1 = sin(rp.x * 2.4 + t * 0.7 + sin(rp.y * 2.8 - t * 0.5)) * 0.5 + 0.5;
          float w2 = cos(rp.y * 2.6 - t * 0.6 + cos(rp.x * 2.2 + t * 0.4)) * 0.5 + 0.5;

          vec3 col = uBgColor;
          col = mix(col, uColor0, smoothstep(0.2, 0.85, w1));
          col = mix(col, uColor1, smoothstep(0.25, 0.88, w2) * 0.78);
          col = mix(col, uColor2, smoothstep(0.4, 0.92, w1 * w2) * 0.7);
          col += uColor3 * nearField * 0.45;

          if (uClickPulse > 0.01) {
            float cDist = length((uv - uClickPos) * vec2(uAspect, 1.0));
            float wave = exp(-pow((cDist - (1.0 - uClickPulse) * 0.65) / 0.07, 2.0)) * uClickPulse;
            col += mix(uColor1, vec3(1.0), 0.5) * wave * 0.85;
          }

          gl_FragColor = vec4(col, 1.0);
        }
      \`,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetX = 0.62;
    let targetY = 0.52;
    const onPointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
      targetY = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height)));
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      uniforms.uClickPos.value.set(
        Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width))),
        Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / Math.max(1, rect.height)))
      );
      uniforms.uClickPulse.value = 1.0;
    };
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uAspect.value = w / Math.max(1, h);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('resize', onResize);

    let frameId = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      uniforms.uTime.value = clock.getElapsedTime();
      const prevX = uniforms.uPointer.value.x;
      const prevY = uniforms.uPointer.value.y;
      const nextX = prevX + (targetX - prevX) * (1 - Math.exp(-14 * dt));
      const nextY = prevY + (targetY - prevY) * (1 - Math.exp(-14 * dt));
      uniforms.uPointer.value.set(nextX, nextY);
      uniforms.uPointerVel.value.set((nextX - prevX) / Math.max(0.004, dt), (nextY - prevY) / Math.max(0.004, dt));
      uniforms.uClickPulse.value *= Math.exp(-4.0 * dt);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [intensity, speed, bgHex, swatches]);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
`;

  const readmeMarkdown = `# SURFACE/08 — ${effect.indexNumber} ${effect.label} Bundle

${effect.shortDescription}

## Quick Start

1. Install Three.js in your React + TypeScript project:

\`\`\`bash
npm install three
npm install -D @types/three
\`\`\`

2. Copy \`components/${componentName}.tsx\` into your project's \`src/components/\` folder.

3. Render \`<${componentName} />\` inside your hero container:

\`\`\`tsx
${integrationSnippet}
\`\`\`

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| \`intensity\` | \`number\` | \`${intensityNum.toFixed(2)}\` | Pointer force and refraction displacement multiplier (\`0.0\` to \`1.0\`) |
| \`speed\` | \`number\` | \`${speedNum.toFixed(2)}\` | Autonomous ambient evolution speed (\`0.0\` to \`1.0\`) |
| \`swatches\` | \`[string, string, string, string]\` | \`${JSON.stringify(palette.swatches)}\` | Four hex color stops for the active shader palette |
| \`bgHex\` | \`string\` | \`"${palette.bgHex}"\` | Base atmospheric background color |
`;

  const packageJson = JSON.stringify(
    {
      name: `surface-08-${effect.id}`,
      version: '1.0.0',
      private: true,
      peerDependencies: {
        react: '>=18.0.0',
        'react-dom': '>=18.0.0',
        three: '>=0.160.0',
      },
      devDependencies: {
        '@types/three': '>=0.160.0',
        typescript: '^5.0.0',
      },
    },
    null,
    2
  );

  return {
    effectId: effect.id,
    componentName,
    integrationSnippet,
    standaloneComponentCode,
    readmeMarkdown,
    packageJson,
  };
}
