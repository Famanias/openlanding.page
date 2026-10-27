import * as THREE from "three";
// @ts-expect-error troika-three-text ships without types
import { configureTextBuilder, Text } from "troika-three-text";
import { LANTERN } from "./glsl";
import type { WorldCtx } from "./types";

// A few dozen short lines typeset fine on the main thread; troika's blob-URL worker never reports its
// script request as finished, which keeps the page from ever reaching network idle.
configureTextBuilder({ useWorker: false });

/**
 * How a piece of in-world text appears:
 * - "lantern": only where the lantern shines (a faint ghost elsewhere so there is something to look for)
 * - "calm": only as stillness rises
 * - "always": plain, faded by its weight
 */
export type RevealMode = "lantern" | "calm" | "always";

export type WorldTextOptions = {
  text: string;
  font: string;
  fontSize: number;
  maxWidth?: number;
  color?: THREE.ColorRepresentation;
  anchorX?: "left" | "center" | "right";
  anchorY?: "top" | "middle" | "bottom" | "baseline";
  textAlign?: "left" | "center" | "right";
  lineHeight?: number;
  letterSpacing?: number;
  mode: RevealMode;
  /** How hard roughness tears the glyphs. */
  tear?: number;
};

export type WorldText = {
  mesh: THREE.Mesh;
  /** 0 hidden → 1 present; multiplied with the reveal mode. */
  uWeight: { value: number };
  /** Extra per-text fade (e.g. washed away by the tide). */
  uFade: { value: number };
  setText(text: string): void;
  dispose(): void;
};

const MODE = { lantern: 0, calm: 1, always: 2 } as const;

export function createWorldText(ctx: WorldCtx, o: WorldTextOptions): WorldText {
  const { shared } = ctx;
  const uWeight = { value: 0 };
  const uFade = { value: 1 };
  const uMode = { value: MODE[o.mode] };
  const uTear = { value: o.tear ?? 1 };
  const uSeed = { value: Math.random() * 100 };

  const base = new THREE.MeshBasicMaterial({ color: o.color ?? 0xeceff0, transparent: true, depthWrite: false, toneMapped: false });
  base.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, {
      uWeight, uFade, uMode, uTear, uSeed,
      uLantern: shared.uLantern, uResolution: shared.uResolution,
      uRoughness: shared.uRoughness, uCalm: shared.uCalm, uTimeLT: shared.uTime,
    });
    shader.vertexShader = shader.vertexShader
      .replace("void main() {", "uniform float uRoughness; uniform float uTimeLT; uniform float uTear; uniform float uSeed;\nvoid main() {")
      .replace(
        "#include <project_vertex>",
        /* glsl */ `
        // rough water tears the words: glyph rows slide apart along a travelling ripple
        float rip = sin(transformed.y * 2.2 + uTimeLT * 3.0 + uSeed) + 0.6 * sin(transformed.x * 0.9 - uTimeLT * 2.1);
        transformed.x += rip * uRoughness * uTear * 0.9;
        transformed.y += sin(transformed.x * 1.7 + uTimeLT * 2.4 + uSeed) * uRoughness * uTear * 0.35;
        #include <project_vertex>`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace("void main() {", `uniform float uWeight; uniform float uFade; uniform float uMode; uniform float uCalm; uniform float uRoughness;\n${LANTERN}\nvoid main() {`)
      .replace(
        "#include <dithering_fragment>",
        /* glsl */ `
        float lit = smoothstep(0.0, 1.0, lt_lantern());
        float reveal = uMode < 0.5 ? max(0.1, lit) : (uMode < 1.5 ? uCalm : 1.0);
        gl_FragColor.rgb *= uMode < 0.5 ? (0.85 + 0.35 * lit) : 1.0;
        gl_FragColor.a *= uWeight * uFade * reveal * (1.0 - 0.45 * uRoughness);
        #include <dithering_fragment>`,
      );
  };

  const text = new Text();
  Object.assign(text, {
    text: o.text,
    font: o.font,
    fontSize: o.fontSize,
    maxWidth: o.maxWidth ?? Infinity,
    anchorX: o.anchorX ?? "center",
    anchorY: o.anchorY ?? "bottom",
    textAlign: o.textAlign ?? "center",
    lineHeight: o.lineHeight ?? 1.05,
    letterSpacing: o.letterSpacing ?? 0,
    material: base,
    depthOffset: -1,
  });
  text.renderOrder = 5;
  text.sync();

  return {
    mesh: text as THREE.Mesh,
    uWeight,
    uFade,
    setText(t: string) {
      if (text.text === t) return;
      text.text = t;
      text.sync();
    },
    dispose() {
      text.dispose();
      base.dispose();
    },
  };
}
