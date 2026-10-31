import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { WorkspacePlaybackController } from './workspacePlayback';

describe('WorkspacePlaybackController', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('runs full sequence and finishes on review status', () => {
    const onStepChange = vi.fn();
    const onComplete = vi.fn();

    const controller = new WorkspacePlaybackController();
    controller.startPlayback('emails', onStepChange, onComplete);

    expect(controller.isPlaying).toBe(true);

    // Advance to classify (540ms)
    vi.advanceTimersByTime(550);
    expect(onStepChange).toHaveBeenCalledWith('classify');

    // Advance to summarize (840ms)
    vi.advanceTimersByTime(300);
    expect(onStepChange).toHaveBeenCalledWith('summarize');

    // Advance to route (1040ms)
    vi.advanceTimersByTime(200);
    expect(onStepChange).toHaveBeenCalledWith('route');

    // Advance to end (1600ms)
    vi.advanceTimersByTime(600);
    expect(controller.isPlaying).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('cancels immediately on user action without firing stale callbacks', () => {
    const onStepChange = vi.fn();
    const onComplete = vi.fn();

    const controller = new WorkspacePlaybackController();
    controller.startPlayback('emails', onStepChange, onComplete);

    vi.advanceTimersByTime(600); // at classify
    expect(onStepChange).toHaveBeenCalledWith('classify');

    // User chooses a different scenario mid-flight
    controller.cancelPlayback('user-scenario-change', true);
    expect(controller.isPlaying).toBe(false);

    // Advance time past remaining steps
    vi.advanceTimersByTime(2000);
    expect(onStepChange).not.toHaveBeenCalledWith('summarize');
    expect(onStepChange).not.toHaveBeenCalledWith('route');
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('repeated start cancels the old sequence and retains only one active sequence', () => {
    const onComplete1 = vi.fn();
    const onComplete2 = vi.fn();

    const controller = new WorkspacePlaybackController();
    controller.startPlayback('emails', vi.fn(), onComplete1);

    vi.advanceTimersByTime(400);

    // Restart with docs scenario
    controller.startPlayback('docs', vi.fn(), onComplete2);

    vi.advanceTimersByTime(1700);
    expect(onComplete1).not.toHaveBeenCalled();
    expect(onComplete2).toHaveBeenCalledTimes(1);
  });

  it('handles React Strict Mode setup -> cleanup -> setup without consuming unstarted intro', () => {
    const introRef = { current: false };
    const controller = new WorkspacePlaybackController(introRef);

    // Initial mount setup
    expect(controller.shouldPlayIntro()).toBe(true);

    // Strict mode cleanup before playback starts
    controller.dispose(false);
    expect(introRef.current).toBe(false);

    // Second setup
    expect(controller.shouldPlayIntro()).toBe(true);

    // Consuming on completion
    controller.consumeIntro();
    expect(introRef.current).toBe(true);
    expect(controller.shouldPlayIntro()).toBe(false);
  });

  it('consumes intro on explicit studio interruption', () => {
    const introRef = { current: false };
    const controller = new WorkspacePlaybackController(introRef);

    controller.startPlayback('emails', vi.fn(), vi.fn());
    expect(controller.isPlaying).toBe(true);

    // User enters Studio while demo is playing
    controller.cancelPlayback('studio-opened', true);
    controller.consumeIntro();

    expect(introRef.current).toBe(true);
    expect(controller.isPlaying).toBe(false);
    expect(controller.shouldPlayIntro()).toBe(false);
  });
});
