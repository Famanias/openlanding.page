/**
 * Pure, deterministic 2D platformer physics engine for Act 4: Cloud City Interlude.
 * Implements clamped dt, coyote time, jump buffering, variable jump height cut,
 * squash-and-stretch damping, pooled particle ring buffer, and Compass Shard collection.
 */

export interface PlatformRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  kind: 'cloud' | 'stone' | 'wind-lift';
}

export interface CompassShard {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  collected: boolean;
  color: string;
}

export interface PooledParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export interface MiniGameInputState {
  left: boolean;
  right: boolean;
  jumpHeld: boolean;
  jumpJustPressed: boolean;
  jumpJustReleased: boolean;
}

export interface MiniGameWorldState {
  status: 'title' | 'playing' | 'paused' | 'victory';
  width: number;
  height: number;
  elapsedTime: number;
  player: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    grounded: boolean;
    facing: 'left' | 'right';
    coyoteTimer: number;
    jumpBufferTimer: number;
    scaleX: number;
    scaleY: number;
    walkDistance: number;
    animState: 'idle' | 'walk' | 'jump' | 'celebrate';
  };
  platforms: PlatformRect[];
  shards: CompassShard[];
  collectedCount: number;
  totalShards: number;
  particles: PooledParticle[];
  particleCursor: number;
}

export const GAME_CONSTANTS = {
  CANVAS_WIDTH: 760,
  CANVAS_HEIGHT: 380,
  GRAVITY: 980,
  MOVE_SPEED: 220,
  GROUND_ACCEL: 1800,
  AIR_ACCEL: 1300,
  FRICTION: 1600,
  JUMP_VELOCITY: -435,
  COYOTE_TIME: 0.11,
  JUMP_BUFFER_TIME: 0.13,
  JUMP_CUT_MULTIPLIER: 0.45,
  MAX_DT: 0.05,
  PARTICLE_POOL_SIZE: 48,
} as const;

export function createInitialMiniGameState(autostart = false): MiniGameWorldState {
  const platforms: PlatformRect[] = [
    // Starting wide stone sanctuary terrace (safe spawn >= 3 tiles wide)
    { id: 'plat-start', x: 30, y: 296, width: 170, height: 28, kind: 'stone' },
    // Low stepping cloud
    { id: 'plat-cloud-1', x: 230, y: 246, width: 120, height: 22, kind: 'cloud' },
    // Center sky bridge cloud
    { id: 'plat-cloud-2', x: 380, y: 196, width: 136, height: 22, kind: 'cloud' },
    // Lower wind-current platform
    { id: 'plat-wind', x: 320, y: 304, width: 130, height: 22, kind: 'wind-lift' },
    // Upper eastern terrace
    { id: 'plat-cloud-3', x: 548, y: 156, width: 164, height: 26, kind: 'stone' },
    // Eastern lower landing pad
    { id: 'plat-east-low', x: 540, y: 278, width: 170, height: 24, kind: 'cloud' },
  ];

  const shards: CompassShard[] = [
    {
      id: 'shard-dawn',
      name: 'Dawn Needle Shard',
      x: 290,
      y: 204,
      radius: 14,
      collected: false,
      color: '#FFD06A',
    },
    {
      id: 'shard-mist',
      name: 'Lagoon Horizon Shard',
      x: 448,
      y: 152,
      radius: 14,
      collected: false,
      color: '#6DDCC5',
    },
    {
      id: 'shard-coral',
      name: 'Starlight Crest Shard',
      x: 630,
      y: 112,
      radius: 14,
      collected: false,
      color: '#FF907A',
    },
  ];

  const particles: PooledParticle[] = Array.from(
    { length: GAME_CONSTANTS.PARTICLE_POOL_SIZE },
    () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      life: 0,
      maxLife: 0.5,
      size: 4,
      color: '#FFD06A',
    })
  );

  return {
    status: autostart ? 'playing' : 'title',
    width: GAME_CONSTANTS.CANVAS_WIDTH,
    height: GAME_CONSTANTS.CANVAS_HEIGHT,
    elapsedTime: 0,
    player: {
      x: 84,
      y: 296 - 36,
      vx: 0,
      vy: 0,
      width: 28,
      height: 36,
      grounded: true,
      facing: 'right',
      coyoteTimer: GAME_CONSTANTS.COYOTE_TIME,
      jumpBufferTimer: 0,
      scaleX: 1,
      scaleY: 1,
      walkDistance: 0,
      animState: 'idle',
    },
    platforms,
    shards,
    collectedCount: 0,
    totalShards: shards.length,
    particles,
    particleCursor: 0,
  };
}

/**
 * Spawn particles from the pre-allocated ring buffer (Zero GC inside RAF).
 */
export function emitPooledParticles(
  state: MiniGameWorldState,
  x: number,
  y: number,
  count: number,
  color: string,
  speedScale = 1
): void {
  for (let i = 0; i < count; i++) {
    const p = state.particles[state.particleCursor];
    state.particleCursor = (state.particleCursor + 1) % state.particles.length;

    const angle = (Math.PI * 2 * i) / count + (i % 2) * 0.25;
    const speed = (45 + (i % 4) * 28) * speedScale;
    p.active = true;
    p.x = x;
    p.y = y;
    p.vx = Math.cos(angle) * speed;
    p.vy = Math.sin(angle) * speed - 35;
    p.life = 0;
    p.maxLife = 0.35 + (i % 3) * 0.12;
    p.size = i % 2 === 0 ? 4 : 6;
    p.color = color;
  }
}

/**
 * Step the Cloud City platformer simulation forward by rawDt seconds.
 * Mutates state in-place for 60Hz zero-allocation performance and returns events triggered.
 */
export function stepMiniGameSimulation(
  state: MiniGameWorldState,
  input: MiniGameInputState,
  rawDt: number
): {
  jumped: boolean;
  landed: boolean;
  collectedShardIds: string[];
  justWon: boolean;
} {
  const events = {
    jumped: false,
    landed: false,
    collectedShardIds: [] as string[],
    justWon: false,
  };

  if (state.status !== 'playing') {
    return events;
  }

  // Clamp dt to <= 0.05s to prevent tunneling
  const dt = Math.min(Math.max(rawDt, 0), GAME_CONSTANTS.MAX_DT);
  state.elapsedTime += dt;

  const p = state.player;
  const wasGrounded = p.grounded;

  // Update coyote & jump buffer timers
  if (p.grounded) {
    p.coyoteTimer = GAME_CONSTANTS.COYOTE_TIME;
  } else {
    p.coyoteTimer = Math.max(0, p.coyoteTimer - dt);
  }

  if (input.jumpJustPressed) {
    p.jumpBufferTimer = GAME_CONSTANTS.JUMP_BUFFER_TIME;
  } else {
    p.jumpBufferTimer = Math.max(0, p.jumpBufferTimer - dt);
  }

  // Horizontal movement with acceleration & friction
  const moveDir = (input.right ? 1 : 0) - (input.left ? 1 : 0);
  const accel = p.grounded ? GAME_CONSTANTS.GROUND_ACCEL : GAME_CONSTANTS.AIR_ACCEL;

  if (moveDir !== 0) {
    p.vx += moveDir * accel * dt;
    if (p.vx > GAME_CONSTANTS.MOVE_SPEED) p.vx = GAME_CONSTANTS.MOVE_SPEED;
    if (p.vx < -GAME_CONSTANTS.MOVE_SPEED) p.vx = -GAME_CONSTANTS.MOVE_SPEED;
    p.facing = moveDir > 0 ? 'right' : 'left';
  } else {
    const decel = GAME_CONSTANTS.FRICTION * dt;
    if (Math.abs(p.vx) <= decel) {
      p.vx = 0;
    } else {
      p.vx -= Math.sign(p.vx) * decel;
    }
  }

  // Execute buffered jump if within coyote window
  if (p.jumpBufferTimer > 0 && p.coyoteTimer > 0) {
    p.vy = GAME_CONSTANTS.JUMP_VELOCITY;
    p.grounded = false;
    p.coyoteTimer = 0;
    p.jumpBufferTimer = 0;
    // Squash-and-stretch on takeoff
    p.scaleX = 0.85;
    p.scaleY = 1.18;
    events.jumped = true;
    emitPooledParticles(state, p.x + p.width / 2, p.y + p.height, 6, '#FFF1D3', 0.8);
  }

  // Variable jump height cut when releasing jump early while ascending
  if (input.jumpJustReleased && p.vy < 0) {
    p.vy *= GAME_CONSTANTS.JUMP_CUT_MULTIPLIER;
  }

  // Apply gravity
  p.vy += GAME_CONSTANTS.GRAVITY * dt;
  if (p.vy > 620) p.vy = 620;

  // Integrate position
  const prevBottom = p.y + p.height;
  p.x += p.vx * dt;
  p.y += p.vy * dt;

  // Horizontal screen boundary clamp
  if (p.x < 12) {
    p.x = 12;
    p.vx = 0;
  } else if (p.x + p.width > state.width - 12) {
    p.x = state.width - 12 - p.width;
    p.vx = 0;
  }

  // One-way platform landing collision check
  p.grounded = false;
  const newBottom = p.y + p.height;

  if (p.vy >= 0) {
    for (let i = 0; i < state.platforms.length; i++) {
      const plat = state.platforms[i];
      const overlapsX = p.x + p.width - 4 > plat.x && p.x + 4 < plat.x + plat.width;
      const crossedTop = prevBottom <= plat.y + 8 && newBottom >= plat.y;

      if (overlapsX && crossedTop) {
        p.y = plat.y - p.height;
        p.vy = 0;
        p.grounded = true;
        if (!wasGrounded) {
          events.landed = true;
          p.scaleX = 1.22;
          p.scaleY = 0.78;
          emitPooledParticles(state, p.x + p.width / 2, plat.y, 5, '#6DDCC5', 0.6);
        }
        break;
      }
    }
  }

  // Cozy safety updraft if Pip slips below the bottom of the cloud canvas
  if (p.y > state.height + 24) {
    p.x = 84;
    p.y = 296 - p.height;
    p.vx = 0;
    p.vy = 0;
    p.grounded = true;
    p.coyoteTimer = GAME_CONSTANTS.COYOTE_TIME;
    emitPooledParticles(state, p.x + p.width / 2, p.y + p.height, 8, '#FFD06A', 1);
  }

  // Smoothly damp squash-and-stretch back to (1, 1)
  const dampFactor = Math.min(1, dt * 14);
  p.scaleX += (1 - p.scaleX) * dampFactor;
  p.scaleY += (1 - p.scaleY) * dampFactor;

  // Gait sync to distance traveled
  if (p.grounded && Math.abs(p.vx) > 8) {
    p.walkDistance += Math.abs(p.vx) * dt;
    p.animState = 'walk';
  } else if (!p.grounded) {
    p.animState = 'jump';
  } else {
    p.animState = 'idle';
  }

  // Check Compass Shard collection
  const playerCenterX = p.x + p.width / 2;
  const playerCenterY = p.y + p.height / 2;

  for (let i = 0; i < state.shards.length; i++) {
    const shard = state.shards[i];
    if (shard.collected) continue;

    const dx = playerCenterX - shard.x;
    const dy = playerCenterY - shard.y;
    const distSq = dx * dx + dy * dy;
    const hitRadius = shard.radius + 18;

    if (distSq <= hitRadius * hitRadius) {
      shard.collected = true;
      state.collectedCount += 1;
      events.collectedShardIds.push(shard.id);
      emitPooledParticles(state, shard.x, shard.y, 14, shard.color, 1.25);
    }
  }

  // Check Victory condition (all 3 Compass Shards collected)
  if (state.collectedCount >= state.totalShards && state.status === 'playing') {
    state.status = 'victory';
    p.vx = 0;
    p.animState = 'celebrate';
    events.justWon = true;
    emitPooledParticles(state, playerCenterX, playerCenterY - 10, 24, '#FFD06A', 1.5);
  }

  // Update active particles in pool
  for (let i = 0; i < state.particles.length; i++) {
    const pt = state.particles[i];
    if (!pt.active) continue;
    pt.life += dt;
    if (pt.life >= pt.maxLife) {
      pt.active = false;
      continue;
    }
    pt.x += pt.vx * dt;
    pt.y += pt.vy * dt;
    pt.vy += 180 * dt;
  }

  return events;
}
