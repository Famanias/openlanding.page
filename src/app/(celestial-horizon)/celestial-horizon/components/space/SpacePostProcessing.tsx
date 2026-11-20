'use client';
/* eslint-disable react-hooks/immutability */

import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { resolveBloomConfig, type BloomConfig } from '../../lib/spaceSceneMath';

const SanitizeHDRShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    float sanitizeChannel(float v) {
      if (!(v >= 0.0 && v <= 65504.0)) return 0.0;
      return min(v, 32.0);
    }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float a = (c.a >= 0.0 && c.a <= 1.0) ? c.a : 1.0;
      gl_FragColor = vec4(
        sanitizeChannel(c.r),
        sanitizeChannel(c.g),
        sanitizeChannel(c.b),
        a
      );
    }
  `,
};

export interface SpacePostProcessingProps {
  enabled: boolean;
  isSoftwareGl: boolean;
  bloomConfig?: Partial<BloomConfig>;
}

/**
 * Post-processing pipeline built on Three.js EffectComposer:
 *   RenderPass (HDR HalfFloat render target)
 *   -> UnrealBloomPass (ethereal soft bloom on bright stars, nebula cores & atmospheric limb)
 *   -> OutputPass (ACES Filmic tone mapping + sRGB output color space)
 *
 * Takes priority 1 in R3F's render loop so EffectComposer cleanly owns presentation,
 * while bypassing UnrealBloomPass cleanly when toggled off.
 */
export function SpacePostProcessing({
  enabled,
  isSoftwareGl,
  bloomConfig,
}: SpacePostProcessingProps) {
  const { gl, scene, camera, size, invalidate } = useThree();

  const resolved = useMemo(
    () =>
      resolveBloomConfig(bloomConfig, {
        width: size.width,
        height: size.height,
        isSoftwareGl,
      }),
    [bloomConfig, size.width, size.height, isSoftwareGl],
  );

  // Create HDR EffectComposer, RenderPass, UnrealBloomPass, and OutputPass once per renderer/scene/camera
  const pipeline = useMemo(() => {
    const pixelRatio = gl.getPixelRatio();
    const rtWidth = Math.max(1, Math.floor(size.width * pixelRatio));
    const rtHeight = Math.max(1, Math.floor(size.height * pixelRatio));

    const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
      type: THREE.HalfFloatType,
      samples: isSoftwareGl ? 0 : 4,
    });

    const composer = new EffectComposer(gl, renderTarget);
    composer.setPixelRatio(pixelRatio);
    composer.setSize(size.width, size.height);

    const renderPass = new RenderPass(scene, camera);
    const sanitizePass = new ShaderPass(SanitizeHDRShader);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(resolved.passWidth, resolved.passHeight),
      resolved.strength,
      resolved.radius,
      resolved.threshold,
    );
    const outputPass = new OutputPass();

    composer.addPass(renderPass);
    composer.addPass(sanitizePass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);

    return { composer, renderPass, sanitizePass, bloomPass, outputPass, renderTarget };
    // Intentionally construct once per renderer/scene/camera; resize & uniform updates handled in effects below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gl, scene, camera, isSoftwareGl]);

  // Keep composer & bloom pass dimensions synced on viewport resize
  useEffect(() => {
    const pixelRatio = gl.getPixelRatio();
    pipeline.composer.setPixelRatio(pixelRatio);
    pipeline.composer.setSize(size.width, size.height);
    pipeline.bloomPass.resolution.set(resolved.passWidth, resolved.passHeight);
    invalidate();
  }, [pipeline, gl, size.width, size.height, resolved.passWidth, resolved.passHeight, invalidate]);

  // Update bloom intensity/radius/threshold and enabled flag cleanly without reallocating targets
  useEffect(() => {
    pipeline.sanitizePass.enabled = enabled;
    pipeline.bloomPass.enabled = enabled;
    pipeline.bloomPass.strength = resolved.strength;
    pipeline.bloomPass.radius = resolved.radius;
    pipeline.bloomPass.threshold = resolved.threshold;
    invalidate();
  }, [pipeline, enabled, resolved.strength, resolved.radius, resolved.threshold, invalidate]);

  // Dispose GPU render targets & post-processing passes on unmount
  useEffect(() => {
    return () => {
      pipeline.sanitizePass.dispose();
      pipeline.bloomPass.dispose();
      pipeline.outputPass.dispose();
      pipeline.renderPass.dispose();
      pipeline.composer.dispose();
      pipeline.renderTarget.dispose();
    };
  }, [pipeline]);

  // Priority 1 takes over rendering from R3F's default renderer.render().
  // bloomPass.enabled toggles UnrealBloomPass cleanly while preserving identical
  // ACES Filmic tone mapping & sRGB OutputPass color consistency.
  useFrame(() => {
    pipeline.composer.render();
  }, 1);

  return null;
}
