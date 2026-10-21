import { LEAF_COUNT, clampSpread } from "./spreads";
import { bookPosition, settleTarget, stepProgress, type Direction } from "./turn";

export type EngineView = {
  spread: number;
  /** The leaf currently in the air, if any. `progress` is 0 untouched .. 1 finished. */
  turning: { leaf: number; dir: Direction; progress: number } | null;
  /** Continuous position through the book (3.25 = a quarter of the way from spread 3 to 4). */
  position: number;
};

export type EngineHooks = {
  render(view: EngineView): void;
  /** A turn ended (or a jump happened): `spread` is now the resting spread. */
  commit(spread: number): void;
  request(callback: (now: number) => void): number;
  cancel(id: number): void;
  now(): number;
};

type Turning = { leaf: number; dir: Direction; p: number; dragging: boolean };

/**
 * The page-turn state machine. It owns which leaf is in the air and how far it has gone, and talks to the
 * outside only through `hooks`, so it can be driven by a fake clock in tests. One leaf moves at a time;
 * progress is the single source of truth, so a turn can be grabbed, reversed or redirected at any frame.
 */
export class TurnEngine {
  private _spread = 0;
  private goal = 0;
  private turning: Turning | null = null;
  private raf = 0;
  private last = 0;
  private reduced = false;

  constructor(private readonly hooks: EngineHooks) {}

  get spread(): number {
    return this._spread;
  }

  setReduced(reduced: boolean): void {
    this.reduced = reduced;
  }

  /** Instant move with no animation: first paint from a hash, reduced motion, resets. */
  jumpTo(spread: number): void {
    this.stopLoop();
    this.turning = null;
    this._spread = this.goal = clampSpread(spread);
    this.emit();
    this.hooks.commit(this._spread);
  }

  /** Animate to a spread, turning one leaf at a time. */
  goTo(spread: number): void {
    if (this.turning?.dragging) return;
    const target = clampSpread(spread);
    if (this.reduced) return this.jumpTo(target);
    this.goal = target;
    this.schedule();
  }

  /** One page forward (1) or back (-1) from wherever the queue currently ends. */
  step(dir: Direction): void {
    this.goTo(this.goal + dir);
  }

  /**
   * The pointer takes hold of a leaf. Returns the direction and progress to continue from, or null when
   * there is nothing to turn that way. A leaf already in the air is taken over where it is.
   */
  grab(dir: Direction): { dir: Direction; progress: number } | null {
    if (this.reduced) return null;
    this.stopLoop();
    if (this.turning) {
      this.turning.dragging = true;
      this.goal = this._spread;
      return { dir: this.turning.dir, progress: this.turning.p };
    }
    if (dir === 1 ? this._spread >= LEAF_COUNT : this._spread <= 0) return null;
    this.goal = this._spread;
    this.turning = { leaf: dir === 1 ? this._spread : this._spread - 1, dir, p: 0, dragging: true };
    return { dir, progress: 0 };
  }

  drag(progress: number): void {
    if (!this.turning?.dragging) return;
    this.turning.p = Math.min(1, Math.max(0, progress));
    this.emit();
  }

  /** The pointer lets go. `velocity` is px/ms toward finishing the turn. */
  release(velocity: number): void {
    const t = this.turning;
    if (!t?.dragging) return;
    t.dragging = false;
    this.goal = settleTarget(t.p, velocity) === 1 ? this._spread + t.dir : this._spread;
    this.last = this.hooks.now();
    this.schedule();
  }

  dispose(): void {
    this.stopLoop();
  }

  private view(): EngineView {
    const t = this.turning;
    return {
      spread: this._spread,
      turning: t ? { leaf: t.leaf, dir: t.dir, progress: t.p } : null,
      position: t ? bookPosition(this._spread, t.dir, t.p) : this._spread,
    };
  }

  private emit(): void {
    this.hooks.render(this.view());
  }

  private schedule(): void {
    if (this.raf) return;
    this.last = this.hooks.now();
    this.raf = this.hooks.request(this.frame);
  }

  private stopLoop(): void {
    if (this.raf) this.hooks.cancel(this.raf);
    this.raf = 0;
  }

  private frame = (now: number): void => {
    this.raf = 0;
    const dt = Math.min(48, Math.max(0, now - this.last));
    this.last = now;

    if (!this.turning) {
      if (this.goal === this._spread) return;
      const dir: Direction = this.goal > this._spread ? 1 : -1;
      this.turning = { leaf: dir === 1 ? this._spread : this._spread - 1, dir, p: 0, dragging: false };
    }

    const t = this.turning;
    if (!t.dragging) {
      const finishing = t.dir === 1 ? this.goal > this._spread : this.goal < this._spread;
      const target: 0 | 1 = finishing ? 1 : 0;
      // Long jumps run faster so a contents link doesn't take seven full turns.
      const speed = Math.abs(this.goal - this._spread) > 1 ? 2.4 : 1;
      t.p = stepProgress(t.p, target, dt * speed);
      if (t.p === target) {
        if (target === 1) this._spread += t.dir;
        this.turning = null;
        this.emit();
        this.hooks.commit(this._spread);
        if (this.goal !== this._spread) this.schedule();
        return;
      }
    }

    this.emit();
    if (this.turning && !(this.turning as Turning).dragging) this.schedule();
  };
}
