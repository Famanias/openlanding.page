import { ProcessingSubStep } from '../utils/workflowLogic';
import { HERO_DEMO_BEATS } from './timings';

export type PlaybackCancelReason =
  | 'user-scenario-change'
  | 'user-stage-select'
  | 'replay-restart'
  | 'unmount'
  | 'offscreen'
  | 'document-hidden'
  | 'reduced-motion'
  | 'studio-opened';

export interface IntroConsumedRef {
  current: boolean;
}

export class WorkspacePlaybackController {
  private activeTimers: ReturnType<typeof setTimeout>[] = [];
  public isPlaying = false;
  private introRef?: IntroConsumedRef;

  constructor(introRef?: IntroConsumedRef) {
    this.introRef = introRef;
  }

  public shouldPlayIntro(): boolean {
    return !this.introRef?.current;
  }

  public consumeIntro(): void {
    if (this.introRef) {
      this.introRef.current = true;
    }
  }

  public startPlayback(
    _scenarioId: string,
    onStepChange: (step: ProcessingSubStep) => void,
    onComplete?: () => void
  ): void {
    this.cancelPlayback('replay-restart', false);
    this.isPlaying = true;

    // Step 1: classify (540ms)
    const tClassify = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('classify');
    }, Math.round(HERO_DEMO_BEATS.classifyResolved * 1000));
    this.activeTimers.push(tClassify);

    // Step 2: summarize (840ms)
    const tSummarize = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('summarize');
    }, Math.round(HERO_DEMO_BEATS.summarizeResolved * 1000));
    this.activeTimers.push(tSummarize);

    // Step 3: route (1040ms)
    const tRoute = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('route');
    }, Math.round(HERO_DEMO_BEATS.routeResolved * 1000));
    this.activeTimers.push(tRoute);

    // Step 4: review and complete (1600ms)
    const tComplete = setTimeout(() => {
      if (!this.isPlaying) return;
      this.isPlaying = false;
      this.consumeIntro();
      onComplete?.();
    }, Math.round(HERO_DEMO_BEATS.total * 1000));
    this.activeTimers.push(tComplete);
  }

  public cancelPlayback(_reason?: PlaybackCancelReason | string, _isUserAction?: boolean): void {
    void _reason;
    void _isUserAction;
    this.clearAllTimers();
    this.isPlaying = false;
  }

  public dispose(consumeOnDispose = false): void {
    this.clearAllTimers();
    this.isPlaying = false;
    if (consumeOnDispose) {
      this.consumeIntro();
    }
  }

  private clearAllTimers(): void {
    for (const t of this.activeTimers) {
      clearTimeout(t);
    }
    this.activeTimers = [];
  }
}
