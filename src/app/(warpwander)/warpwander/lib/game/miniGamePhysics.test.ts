import { describe, it, expect } from 'vitest';
import {
  createInitialMiniGameState,
  stepMiniGameSimulation,
  GAME_CONSTANTS,
} from './miniGamePhysics';

describe('miniGamePhysics', () => {
  it('initial state spawns Pip safely on wide platform with 3 uncollected shards', () => {
    const state = createInitialMiniGameState(true);
    expect(state.status).toBe('playing');
    expect(state.player.grounded).toBe(true);
    expect(state.totalShards).toBe(3);
    expect(state.collectedCount).toBe(0);
  });

  it('jump buffering and takeoff apply squash-and-stretch and upward velocity', () => {
    const state = createInitialMiniGameState(true);
    const res = stepMiniGameSimulation(
      state,
      {
        left: false,
        right: true,
        jumpHeld: true,
        jumpJustPressed: true,
        jumpJustReleased: false,
      },
      0.016
    );

    expect(res.jumped).toBe(true);
    expect(state.player.grounded).toBe(false);
    expect(state.player.vy).toBeLessThan(0);
    expect(state.player.vx).toBeGreaterThan(0);
  });

  it('variable jump height cuts upward velocity when jump is released early', () => {
    const state = createInitialMiniGameState(true);
    stepMiniGameSimulation(
      state,
      { left: false, right: false, jumpHeld: true, jumpJustPressed: true, jumpJustReleased: false },
      0.016
    );
    const vyBeforeRelease = state.player.vy;
    stepMiniGameSimulation(
      state,
      { left: false, right: false, jumpHeld: false, jumpJustPressed: false, jumpJustReleased: true },
      0.016
    );
    expect(state.player.vy).toBeGreaterThan(vyBeforeRelease * 0.6);
  });

  it('collecting all 3 compass shards triggers victory state and celebrate pose', () => {
    const state = createInitialMiniGameState(true);

    for (let i = 0; i < state.shards.length; i++) {
      const shard = state.shards[i];
      state.player.x = shard.x - state.player.width / 2;
      state.player.y = shard.y - state.player.height / 2;
      stepMiniGameSimulation(
        state,
        { left: false, right: false, jumpHeld: false, jumpJustPressed: false, jumpJustReleased: false },
        0.016
      );
    }

    expect(state.collectedCount).toBe(3);
    expect(state.status).toBe('victory');
    expect(state.player.animState).toBe('celebrate');
    expect(GAME_CONSTANTS.PARTICLE_POOL_SIZE).toBeGreaterThanOrEqual(32);
  });
});
