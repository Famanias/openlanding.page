import * as THREE from 'three';
import type {
  BackgroundEffect,
  EffectContext,
  EffectControls,
  EffectId,
  InputState,
} from './effectTypes';
import { selectTransitionFamily } from './math';
import { TransitionPass } from './passes/TransitionPass';
import { ChromaFluidEffect } from '../effects/chroma-fluid/ChromaFluidEffect';
import { FlutedLightEffect } from '../effects/fluted-light/FlutedLightEffect';
import { SilkAtmosphereEffect } from '../effects/silk-atmosphere/SilkAtmosphereEffect';
import { GlassLensEffect } from '../effects/glass-lens/GlassLensEffect';
import { AuroraFieldEffect } from '../effects/aurora-field/AuroraFieldEffect';
import { ChromaticRibbonsEffect } from '../effects/chromatic-ribbons/ChromaticRibbonsEffect';
import { BokehReactorEffect } from '../effects/bokeh-reactor/BokehReactorEffect';
import { RefractionFieldEffect } from '../effects/refraction-field/RefractionFieldEffect';

export const EFFECT_ORDER: EffectId[] = [
  'chroma-fluid',
  'fluted-light',
  'silk-atmosphere',
  'glass-lens',
  'aurora-field',
  'chromatic-ribbons',
  'bokeh-reactor',
  'refraction-field',
];

export class EffectController {
  private effectsMap = new Map<EffectId, BackgroundEffect>();
  private initializedIds = new Set<EffectId>();
  private context!: EffectContext;

  private activeId: EffectId = 'fluted-light';
  private outgoingId: EffectId | null = null;
  private transitionProgress = 1.0;
  private transitionDuration = 0.85;
  private transitionFamilyId = 0;
  public transitionFamilyName = 'Viscous Fluted Wipe';

  private rtOutgoing!: THREE.WebGLRenderTarget;
  private rtIncoming!: THREE.WebGLRenderTarget;
  private transitionPass!: TransitionPass;

  constructor(initialEffectId: EffectId = 'fluted-light') {
    this.activeId = initialEffectId;
    const instances: BackgroundEffect[] = [
      new ChromaFluidEffect(),
      new FlutedLightEffect(),
      new SilkAtmosphereEffect(),
      new GlassLensEffect(),
      new AuroraFieldEffect(),
      new ChromaticRibbonsEffect(),
      new BokehReactorEffect(),
      new RefractionFieldEffect(),
    ];
    for (const effect of instances) {
      this.effectsMap.set(effect.id, effect);
    }
  }

  public getAllEffects(): BackgroundEffect[] {
    return EFFECT_ORDER.map((id) => this.effectsMap.get(id)!);
  }

  public getEffect(id: EffectId): BackgroundEffect {
    return this.effectsMap.get(id)!;
  }

  public getActiveEffect(): BackgroundEffect {
    return this.effectsMap.get(this.activeId)!;
  }

  public isInTransition(): boolean {
    return this.outgoingId !== null && this.transitionProgress < 1.0;
  }

  public init(context: EffectContext): void {
    this.context = context;
    const rtW = Math.max(64, Math.floor(context.width * context.pixelRatio));
    const rtH = Math.max(64, Math.floor(context.height * context.pixelRatio));

    const rtOptions: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      depthBuffer: true,
      stencilBuffer: false,
    };

    this.rtOutgoing = new THREE.WebGLRenderTarget(rtW, rtH, rtOptions);
    this.rtIncoming = new THREE.WebGLRenderTarget(rtW, rtH, rtOptions);
    this.transitionPass = new TransitionPass();
    this.transitionPass.resize(context.width, context.height);

    this.ensureEffectInitialized(this.activeId);
  }

  private ensureEffectInitialized(id: EffectId): BackgroundEffect {
    const effect = this.effectsMap.get(id)!;
    if (!this.initializedIds.has(id)) {
      effect.init(this.context);
      effect.resize(this.context.width, this.context.height, this.context.pixelRatio);
      this.initializedIds.add(id);
    }
    return effect;
  }

  public switchTo(nextId: EffectId, reducedMotion = false): void {
    if (nextId === this.activeId && !this.isInTransition()) return;
    if (nextId === this.activeId && this.isInTransition()) {
      this.outgoingId = null;
      this.transitionProgress = 1.0;
      return;
    }

    this.ensureEffectInitialized(nextId);

    if (reducedMotion) {
      this.activeId = nextId;
      this.outgoingId = null;
      this.transitionProgress = 1.0;
      return;
    }

    const spec = selectTransitionFamily(this.activeId, nextId);
    this.outgoingId = this.activeId;
    this.activeId = nextId;
    this.transitionProgress = 0.0;
    this.transitionDuration = spec.durationSec;
    this.transitionFamilyId = spec.id;
    this.transitionFamilyName = spec.name;
  }

  public resize(width: number, height: number, pixelRatio: number): void {
    this.context.width = width;
    this.context.height = height;
    this.context.pixelRatio = pixelRatio;

    const rtW = Math.max(64, Math.floor(width * pixelRatio));
    const rtH = Math.max(64, Math.floor(height * pixelRatio));
    this.rtOutgoing.setSize(rtW, rtH);
    this.rtIncoming.setSize(rtW, rtH);
    this.transitionPass.resize(width, height);

    for (const id of this.initializedIds) {
      this.effectsMap.get(id)?.resize(width, height, pixelRatio);
    }
  }

  public updateAndRender(
    renderer: THREE.WebGLRenderer,
    dt: number,
    elapsed: number,
    input: InputState,
    controls: EffectControls,
    wallDt = dt
  ): void {
    const activeEffect = this.ensureEffectInitialized(this.activeId);

    if (this.outgoingId && this.transitionProgress < 1.0) {
      const effectiveDuration = this.context.isSoftwareGl
        ? Math.min(0.45, this.transitionDuration * 0.55)
        : this.transitionDuration;
      this.transitionProgress = Math.min(
        1.0,
        this.transitionProgress + Math.max(dt, wallDt) / Math.max(0.15, effectiveDuration)
      );

      const outgoingEffect = this.ensureEffectInitialized(this.outgoingId);
      // Update both effects with their respective active palette bounds
      const outgoingControls: EffectControls = {
        ...controls,
        paletteIndex: controls.paletteIndex % outgoingEffect.palettes.length,
      };
      outgoingEffect.update(dt, elapsed, input, outgoingControls);
      activeEffect.update(dt, elapsed, input, controls);

      outgoingEffect.render(renderer, this.rtOutgoing);
      activeEffect.render(renderer, this.rtIncoming);

      this.transitionPass.render(
        renderer,
        this.rtOutgoing.texture,
        this.rtIncoming.texture,
        this.transitionProgress,
        this.transitionFamilyId,
        input.x,
        input.y,
        null
      );

      if (this.transitionProgress >= 1.0) {
        this.outgoingId = null;
      }
    } else {
      activeEffect.update(dt, elapsed, input, controls);
      activeEffect.render(renderer, null);
    }
  }

  public resetActive(): void {
    this.getActiveEffect().reset();
  }

  public dispose(): void {
    for (const id of this.initializedIds) {
      this.effectsMap.get(id)?.dispose();
    }
    this.initializedIds.clear();
    this.rtOutgoing?.dispose();
    this.rtIncoming?.dispose();
    this.transitionPass?.dispose();
  }
}
