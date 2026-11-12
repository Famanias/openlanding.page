import type { InputState, SplatImpulse } from './effectTypes';
import {
  computeClampedVelocity,
  dampValue,
  normalizePointerToUv,
  stepSpring,
  type SpringState,
} from './math';

export class InputField {
  public state: InputState = {
    x: 0.62,
    y: 0.52,
    rawX: 0,
    rawY: 0,
    vx: 0,
    vy: 0,
    smoothVx: 0,
    smoothVy: 0,
    speed: 0,
    isPointerInside: false,
    isDown: false,
    isDragging: false,
    dragStartX: 0.62,
    dragStartY: 0.52,
    dragOffsetX: 0,
    dragOffsetY: 0,
    clickPulse: 0,
    clickX: 0.62,
    clickY: 0.52,
    clickCount: 0,
    wheelDelta: 0,
    splats: [],
    hasInteracted: false,
  };

  private targetElement: HTMLElement | null = null;
  private hasInitialSample = false;
  private prevU = 0.62;
  private prevV = 0.52;
  private targetU = 0.62;
  private targetV = 0.52;
  private rawDragX = 0;
  private rawDragY = 0;
  private dragSpringX: SpringState = { value: 0, velocity: 0 };
  private dragSpringY: SpringState = { value: 0, velocity: 0 };
  private colorCycle = 0;
  private onFirstInteraction?: () => void;

  constructor(onFirstInteraction?: () => void) {
    this.onFirstInteraction = onFirstInteraction;
  }

  public attach(element: HTMLElement): void {
    this.detach();
    this.targetElement = element;
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
    window.addEventListener('pointerup', this.handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', this.handlePointerUp, { passive: true });
    window.addEventListener('wheel', this.handleWheel, { passive: true });
    document.addEventListener('mouseleave', this.handlePointerLeave, { passive: true });
  }

  public detach(): void {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
    window.removeEventListener('wheel', this.handleWheel);
    document.removeEventListener('mouseleave', this.handlePointerLeave);
    this.targetElement = null;
  }

  public reset(): void {
    this.state.x = 0.62;
    this.state.y = 0.52;
    this.targetU = 0.62;
    this.targetV = 0.52;
    this.prevU = 0.62;
    this.prevV = 0.52;
    this.state.vx = 0;
    this.state.vy = 0;
    this.state.smoothVx = 0;
    this.state.smoothVy = 0;
    this.state.speed = 0;
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
    this.dragSpringX = { value: 0, velocity: 0 };
    this.dragSpringY = { value: 0, velocity: 0 };
    this.state.dragOffsetX = 0;
    this.state.dragOffsetY = 0;
    this.state.clickPulse = 0;
    this.state.wheelDelta = 0;
    this.state.splats = [];
    this.hasInitialSample = false;
  }

  public injectSplat(
    u: number,
    v: number,
    vx: number,
    vy: number,
    strength = 1.0,
    radius = 0.085,
    isClick = false
  ): void {
    this.colorCycle = (this.colorCycle + 1) % 4;
    const splat: SplatImpulse = {
      x: u,
      y: v,
      vx,
      vy,
      strength,
      radius,
      colorIndex: this.colorCycle,
      isClick,
    };
    this.state.splats.unshift(splat);
    if (this.state.splats.length > 8) {
      this.state.splats.length = 8;
    }
  }

  private markInteracted(): void {
    if (!this.state.hasInteracted) {
      this.state.hasInteracted = true;
      this.onFirstInteraction?.();
    }
  }

  private isInteractiveUiTarget(target: EventTarget | null): boolean {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest('button, a, input, select, textarea, [role="dialog"], [data-ui-interactive="true"]')
    );
  }

  private sampleEventUv(clientX: number, clientY: number): { u: number; v: number } {
    if (!this.targetElement) {
      return { u: 0.5, v: 0.5 };
    }
    const rect = this.targetElement.getBoundingClientRect();
    return normalizePointerToUv(clientX, clientY, rect);
  }

  private handlePointerMove = (e: PointerEvent): void => {
    const { u, v } = this.sampleEventUv(e.clientX, e.clientY);
    this.state.rawX = e.clientX;
    this.state.rawY = e.clientY;
    this.state.isPointerInside = true;

    if (!this.hasInitialSample) {
      this.hasInitialSample = true;
      this.prevU = u;
      this.prevV = v;
      this.targetU = u;
      this.targetV = v;
      this.state.x = u;
      this.state.y = v;
      return;
    }

    const du = u - this.targetU;
    const dv = v - this.targetV;
    const dist = Math.hypot(du, dv);
    if (dist > 0.0015) {
      this.markInteracted();
    }

    this.targetU = u;
    this.targetV = v;

    if (this.state.isDown) {
      this.state.isDragging = true;
      this.rawDragX = Math.max(-0.85, Math.min(0.85, (u - this.state.dragStartX) * 1.65));
      this.rawDragY = Math.max(-0.85, Math.min(0.85, (v - this.state.dragStartY) * 1.65));
    }

    if (dist > 0.004) {
      this.injectSplat(
        u,
        v,
        Math.max(-4, Math.min(4, du * 45)),
        Math.max(-4, Math.min(4, dv * 45)),
        Math.min(1.0, dist * 16.0 + (this.state.isDown ? 0.35 : 0.0)),
        this.state.isDown ? 0.1 : 0.07,
        false
      );
    }
  };

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.isInteractiveUiTarget(e.target)) {
      return;
    }
    const { u, v } = this.sampleEventUv(e.clientX, e.clientY);
    this.markInteracted();
    this.hasInitialSample = true;
    this.targetU = u;
    this.targetV = v;
    this.state.isDown = true;
    this.state.isDragging = false;
    this.state.dragStartX = u;
    this.state.dragStartY = v;
    this.state.clickX = u;
    this.state.clickY = v;
    this.state.clickPulse = 1.0;
    this.state.clickCount += 1;

    this.injectSplat(u, v, 0, 0, 1.35, 0.125, true);
  };

  private handlePointerUp = (): void => {
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
  };

  private handlePointerLeave = (): void => {
    this.state.isPointerInside = false;
    this.state.isDown = false;
    this.state.isDragging = false;
    this.rawDragX = 0;
    this.rawDragY = 0;
  };

  private handleWheel = (e: WheelEvent): void => {
    if (this.isInteractiveUiTarget(e.target)) return;
    const normalizedWheel = Math.max(-1, Math.min(1, e.deltaY * 0.0018));
    this.state.wheelDelta = Math.max(-1.5, Math.min(1.5, this.state.wheelDelta + normalizedWheel));
  };

  public update(dt: number, reducedMotion: boolean): InputState {
    const safeDt = Math.max(0.001, Math.min(dt, 0.05));

    // Smooth pointer position
    const nextX = dampValue(this.state.x, this.targetU, reducedMotion ? 24 : 16, safeDt);
    const nextY = dampValue(this.state.y, this.targetV, reducedMotion ? 24 : 16, safeDt);

    const { vx, vy } = computeClampedVelocity(this.prevU, this.prevV, nextX, nextY, safeDt, 5.5);
    this.prevU = nextX;
    this.prevV = nextY;

    this.state.x = nextX;
    this.state.y = nextY;
    this.state.vx = vx;
    this.state.vy = vy;
    this.state.smoothVx = dampValue(this.state.smoothVx, vx, 12, safeDt);
    this.state.smoothVy = dampValue(this.state.smoothVy, vy, 12, safeDt);
    this.state.speed = Math.hypot(this.state.smoothVx, this.state.smoothVy);

    // Second-order spring kinematics for drag release with damped overshoot
    if (reducedMotion) {
      this.state.dragOffsetX = this.rawDragX * 0.4;
      this.state.dragOffsetY = this.rawDragY * 0.4;
    } else {
      const stiffness = this.state.isDown ? 180 : 95;
      const damping = this.state.isDown ? 18 : 7.5;
      this.dragSpringX = stepSpring(this.dragSpringX, this.rawDragX, stiffness, damping, safeDt);
      this.dragSpringY = stepSpring(this.dragSpringY, this.rawDragY, stiffness, damping, safeDt);
      this.state.dragOffsetX = this.dragSpringX.value;
      this.state.dragOffsetY = this.dragSpringY.value;
    }

    // Decay click impulse and wheel offset
    this.state.clickPulse = dampValue(this.state.clickPulse, 0, 4.2, safeDt);
    if (this.state.clickPulse < 0.002) this.state.clickPulse = 0;

    this.state.wheelDelta = dampValue(this.state.wheelDelta, 0, 3.0, safeDt);

    // Decay recent splats
    for (let i = this.state.splats.length - 1; i >= 0; i--) {
      const s = this.state.splats[i];
      s.x += s.vx * safeDt * 0.14;
      s.y += s.vy * safeDt * 0.14;
      s.vx *= Math.exp(-3.5 * safeDt);
      s.vy *= Math.exp(-3.5 * safeDt);
      s.strength *= Math.exp(-2.6 * safeDt);
      s.radius += (s.isClick ? 0.18 : 0.04) * safeDt;
      if (s.strength < 0.015) {
        this.state.splats.splice(i, 1);
      }
    }

    return this.state;
  }
}
